import { onCleanup, onMount } from "solid-js";

export interface KeybindingOptions {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  preventDefault?: boolean;
}

export interface KeybindingHandler {
  (event: KeyboardEvent): void;
}

/**
 * Hook for registering global keyboard shortcuts
 * @param options - Key combination options
 * @param handler - Function to call when keybinding is triggered
 */
export function useKeybinding(
  options: KeybindingOptions,
  handler: KeybindingHandler,
) {
  const handleKeydown = (event: KeyboardEvent) => {
    // Check if the key matches
    if (event.key.toLowerCase() !== options.key.toLowerCase()) {
      return;
    }

    // Check modifier keys
    if (options.ctrlKey && !event.ctrlKey) return;
    if (options.altKey && !event.altKey) return;
    if (options.shiftKey && !event.shiftKey) return;
    if (options.metaKey && !event.metaKey) return;

    // Check if modifier keys that aren't required are pressed
    if (!options.ctrlKey && event.ctrlKey) return;
    if (!options.altKey && event.altKey) return;
    if (!options.shiftKey && event.shiftKey) return;
    if (!options.metaKey && event.metaKey) return;

    // Prevent default behavior if specified
    if (options.preventDefault !== false) {
      event.preventDefault();
    }

    handler(event);
  };

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);

    onCleanup(() => {
      document.removeEventListener("keydown", handleKeydown);
    });
  });
}

/**
 * Hook for registering multiple global keyboard shortcuts
 * @param bindings - Array of keybinding configurations
 */
export function useKeybindings(
  bindings: Array<KeybindingOptions & { handler: KeybindingHandler }>,
) {
  const handleKeydown = (event: KeyboardEvent) => {
    for (const binding of bindings) {
      // Check if the key matches
      if (event.key.toLowerCase() !== binding.key.toLowerCase()) {
        continue;
      }

      // Check modifier keys
      if (binding.ctrlKey && !event.ctrlKey) continue;
      if (binding.altKey && !event.altKey) continue;
      if (binding.shiftKey && !event.shiftKey) continue;
      if (binding.metaKey && !event.metaKey) continue;

      // Check if modifier keys that aren't required are pressed
      if (!binding.ctrlKey && event.ctrlKey) continue;
      if (!binding.altKey && event.altKey) continue;
      if (!binding.shiftKey && event.shiftKey) continue;
      if (!binding.metaKey && event.metaKey) continue;

      // Prevent default behavior if specified
      if (binding.preventDefault !== false) {
        event.preventDefault();
      }

      binding.handler(event);
      break; // Stop after first match
    }
  };

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);
  });

  onCleanup(() => {
    document.removeEventListener("keydown", handleKeydown);
  });
}

/**
 * Utility function to create keybinding option objects
 */
export const createKeybinding = (
  key: string,
  modifiers: Partial<
    Pick<KeybindingOptions, "ctrlKey" | "altKey" | "shiftKey" | "metaKey">
  > = {},
  preventDefault = true,
): KeybindingOptions => ({
  key,
  preventDefault,
  ...modifiers,
});
