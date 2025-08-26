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

  const handleStart = (e: MouseEvent | TouchEvent) => {
    if (isServer) return;
    
    e.preventDefault();
    setIsResizing(true);
    
    // Get the X coordinate from either mouse or touch event
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startX = clientX;
    startWidth = width();

    onResizeStart?.();

    // Add both mouse and touch listeners
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleEnd);
    
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    // Prevent iOS bounce and text selection on mobile
    document.body.style.webkitUserSelect = "none";
    document.body.style.touchAction = "none";
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isResizing()) return;

    // Get the X coordinate from either mouse or touch event
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;
    const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));

    setWidth(newWidth);
    onResize?.(newWidth);
  };

  const handleEnd = () => {
    if (isServer) return;
    
    setIsResizing(false);
    
    // Remove both mouse and touch listeners
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleEnd);
    document.removeEventListener("touchmove", handleMove);
    document.removeEventListener("touchend", handleEnd);
    
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";
    document.body.style.touchAction = "";

    onResizeEnd?.();
  };

  // Cleanup on component unmount
  onCleanup(() => {
    if (isServer) return;
    
    // Clean up all event listeners
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleEnd);
    document.removeEventListener("touchmove", handleMove);
    document.removeEventListener("touchend", handleEnd);
    
    // Reset all styles
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";
    document.body.style.touchAction = "";
  });

  return {
    width,
    isResizing,
    handleMouseDown: handleStart,
    setWidth,
  };
}
