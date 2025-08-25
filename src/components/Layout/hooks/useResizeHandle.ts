import { createSignal, onCleanup } from "solid-js";
import { isServer } from "solid-js/web";
import { SidebarWidthPx } from "../Layout";

export interface UseResizeHandleOptions {
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
  onResize?: (width: number) => void;
}

export function useResizeHandle(options: UseResizeHandleOptions = {}) {
  const {
    initialWidth = SidebarWidthPx,
    minWidth = 200,
    maxWidth = 600,
    onResizeStart,
    onResizeEnd,
    onResize,
  } = options;

  const [width, setWidth] = createSignal(initialWidth);
  const [isResizing, setIsResizing] = createSignal(false);

  let startX = 0;
  let startWidth = 0;

  const handleMouseDown = (e: MouseEvent) => {
    if (isServer) return;
    
    e.preventDefault();
    setIsResizing(true);
    startX = e.clientX;
    startWidth = width();

    onResizeStart?.();

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing()) return;

    const deltaX = e.clientX - startX;
    const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));

    setWidth(newWidth);
    onResize?.(newWidth);
  };

  const handleMouseUp = () => {
    if (isServer) return;
    
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";

    onResizeEnd?.();
  };

  // Cleanup on component unmount
  onCleanup(() => {
    if (isServer) return;
    
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  });

  return {
    width,
    isResizing,
    handleMouseDown,
    setWidth,
  };
}
