import { TreeView, createTreeCollection } from "@ark-ui/solid/tree-view";
import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import FileIcon from "lucide-solid/icons/file";
import FolderIcon from "lucide-solid/icons/folder";
import LoaderIcon from "lucide-solid/icons/loader-2";
import { For, Show, onMount, createSignal } from "solid-js";
import { tree } from "../../../styled-system/recipes";

interface Node {
  id: string;
  name: string;
  children?: Node[];
  childrenCount?: number;
}

// Simple function to generate placeholder children
function loadChildren(
  details: TreeView.LoadChildrenDetails<Node>,
): Promise<Node[]> {
  const nodeName = details.valuePath[details.valuePath.length - 1];

  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate simple placeholder children
      const children: Node[] = [];
      const count = Math.floor(Math.random() * 4) + 2; // 2-5 children

      for (let i = 0; i < count; i++) {
        const isFolder = Math.random() > 0.6; // 40% chance of folder
        children.push({
          id: `${nodeName}-child-${i}`,
          name: isFolder ? `folder-${i}` : `file-${i}.txt`,
          childrenCount: isFolder
            ? Math.floor(Math.random() * 3) + 1
            : undefined,
        });
      }

      resolve(children);
    }, 800); // 800ms delay to show loading
  });
}

const initialCollection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      { id: "documents", name: "Documents", childrenCount: 5 },
      { id: "projects", name: "Projects", childrenCount: 3 },
      { id: "downloads", name: "Downloads", childrenCount: 8 },
      { id: "readme.md", name: "README.md" },
      { id: "package.json", name: "package.json" },
    ],
  },
});

// Define the keybindings type
type KeyBindings = {
  [nativeKey: string]: string[];
};

// Default keybindings
const DEFAULT_KEY_BINDINGS: KeyBindings = {
  ArrowDown: ["j", "n"],
  ArrowUp: ["k", "p"],
  ArrowRight: ["l", "f"],
  ArrowLeft: ["h", "b"],
  Enter: ["o"],
  Home: ["g"],
  End: ["G"],
};

// Key code mapping for creating synthetic events
const KEY_CODES: { [key: string]: number } = {
  ArrowDown: 40,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowLeft: 37,
  Enter: 13,
  Home: 36,
  End: 35,
};

interface TreeProps {
  keyBindings?: KeyBindings;
}

export default function Tree(props: TreeProps) {
  const [isFocused, setIsFocused] = createSignal(false);
  const [collection, setCollection] = createSignal(initialCollection);
  const [focusedElementId, setFocusedElementId] = createSignal<string | null>(
    null,
  );

  // Get tree styles
  const treeStyles = tree({ focused: isFocused() });

  // Merge default keybindings with any provided keybindings
  const keyBindings = () => ({
    ...DEFAULT_KEY_BINDINGS,
    ...(props.keyBindings || {}),
  });

  // Create a reverse mapping for quick lookup
  const getTargetKey = (pressedKey: string) => {
    const bindings = keyBindings();
    for (const [nativeKey, aliases] of Object.entries(bindings)) {
      if (aliases.includes(pressedKey)) {
        return nativeKey;
      }
    }
    return null;
  };

  // Store current focused element before lazy loading
  const storeFocusedElement = () => {
    const activeElement = document.activeElement;
    if (activeElement && activeElement.getAttribute("data-node-id")) {
      setFocusedElementId(activeElement.getAttribute("data-node-id"));
    }
  };

  // Restore focus after collection update
  const restoreFocus = () => {
    const elementId = focusedElementId();
    if (elementId) {
      setTimeout(() => {
        const element = document.querySelector(
          `[data-node-id="${elementId}"]`,
        ) as HTMLElement;
        if (element) {
          element.focus();
        }
        setFocusedElementId(null);
      }, 0);
    }
  };

  onMount(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the event target is within the tree view
      const treeView = document.querySelector(`.${treeStyles.container}`);
      const isWithinTreeView =
        treeView &&
        (treeView.contains(event.target as Node) || treeView === event.target);

      if (!isWithinTreeView) return;

      const targetKey = getTargetKey(event.key);
      if (targetKey) {
        // Prevent the original key event from doing anything else
        event.preventDefault();

        // Find the appropriate target element within the tree view
        // First try the active element, then fallback to the first focusable element
        let targetElement = document.activeElement;

        // If active element is outside the tree or is the body, find a better target
        if (
          !targetElement ||
          !treeView.contains(targetElement) ||
          targetElement === document.body
        ) {
          // Find the first focusable element in the tree
          const focusableElements = treeView.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          targetElement = (focusableElements[0] as HTMLElement) || treeView;
        }

        // Create a synthetic keyboard event
        const syntheticEvent = new KeyboardEvent("keydown", {
          key: targetKey,
          code: targetKey,
          keyCode: KEY_CODES[targetKey] || 0,
          which: KEY_CODES[targetKey] || 0,
          bubbles: true,
          cancelable: true,
          composed: true,
        });

        // Dispatch the event to the target element
        targetElement?.dispatchEvent(syntheticEvent);
      }
    };

    // Add focus and blur event listeners to track focus state
    const handleFocus = (event: FocusEvent) => {
      const treeView = document.querySelector(`.${treeStyles.container}`);
      if (
        treeView &&
        (treeView.contains(event.target as Node) || treeView === event.target)
      ) {
        setIsFocused(true);
      }
    };

    const handleBlur = (event: FocusEvent) => {
      // Only set to unfocused if focus moved outside the tree view
      const treeView = document.querySelector(`.${treeStyles.container}`);
      if (treeView && !treeView.contains(event.relatedTarget as Node)) {
        setIsFocused(false);
      }
    };

    // Set up event listeners - use document for focus tracking to catch all elements
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);
    document.addEventListener("keydown", handleKeyDown);

    // Clean up event listeners when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  });

  return (
    <div class={treeStyles.container}>
      <TreeView.Root
        collection={collection()}
        loadChildren={(details) => {
          storeFocusedElement();
          return loadChildren(details);
        }}
        onLoadChildrenComplete={(e) => {
          setCollection(e.collection);
          restoreFocus();
        }}
        lazyMount
        unmountOnExit
      >
        <TreeView.Label class={treeStyles.label}>Explorer</TreeView.Label>
        <TreeView.Tree>
          <For each={collection().rootNode.children}>
            {(node, index) => (
              <TreeNode
                node={node}
                indexPath={[index()]}
                treeStyles={treeStyles}
              />
            )}
          </For>
        </TreeView.Tree>
      </TreeView.Root>
    </div>
  );
}

function TreeNodeIndicator({ treeStyles }: { treeStyles: any }) {
  return (
    <TreeView.NodeContext>
      {(nodeApi) => (
        <span class={`${treeStyles.icon} ${treeStyles.folderIcon}`}>
          <Show when={nodeApi().loading} fallback={<FolderIcon size={16} />}>
            <LoaderIcon size={16} class={treeStyles.loadingSpinner} />
          </Show>
        </span>
      )}
    </TreeView.NodeContext>
  );
}

const TreeNode = (
  props: TreeView.NodeProviderProps<Node> & { treeStyles: any },
) => {
  const { node, indexPath, treeStyles } = props;
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <Show
        when={node.children || node.childrenCount}
        fallback={
          <TreeView.Item
            class={treeStyles.interactiveElement}
            data-node-id={node.id}
          >
            <TreeView.ItemText class={treeStyles.itemContent}>
              <span class={`${treeStyles.icon} ${treeStyles.fileIcon}`}>
                <FileIcon size={16} />
              </span>
              <span class={treeStyles.itemText}>{node.name}</span>
            </TreeView.ItemText>
          </TreeView.Item>
        }
      >
        <div class={treeStyles.branchWrapper}>
          <TreeView.Branch>
            <TreeView.BranchControl
              class={treeStyles.interactiveElement}
              data-node-id={node.id}
            >
              <TreeView.BranchIndicator class={treeStyles.branchIndicator}>
                <ChevronRightIcon size={16} />
              </TreeView.BranchIndicator>
              <TreeView.BranchText class={treeStyles.itemContent}>
                <TreeNodeIndicator treeStyles={treeStyles} />
                <span class={treeStyles.itemText}>{node.name}</span>
              </TreeView.BranchText>
            </TreeView.BranchControl>

            <TreeView.BranchContent class={treeStyles.branchContent}>
              <TreeView.BranchIndentGuide class={treeStyles.indentGuide} />
              <For each={node.children}>
                {(child, index) => (
                  <TreeNode
                    node={child}
                    indexPath={[...indexPath, index()]}
                    treeStyles={treeStyles}
                  />
                )}
              </For>
            </TreeView.BranchContent>
          </TreeView.Branch>
        </div>
      </Show>
    </TreeView.NodeProvider>
  );
};
