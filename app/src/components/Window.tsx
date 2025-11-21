import React from "react";

interface WindowProps {
  id: string;
  title: string;
  contentType: "markdown" | "text" | "html";
  content: string;
  x: number;
  y: number;
  w: number;
  h: number;
  onClose: () => void;
  onDrag?: (id: string, x: number, y: number) => void;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  contentType,
  content,
  x,
  y,
  w,
  h,
  onClose,
  onDrag,
}) => {
  const dragRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [offset, setOffset] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setOffset({
      x: e.clientX - x,
      y: e.clientY - y,
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;
    if (onDrag) onDrag(id, newX, newY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={dragRef}
      className="absolute bg-white rounded shadow-lg border border-slate-300"
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        zIndex: 100,
        touchAction: "none",
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        className="flex justify-between items-center bg-slate-800 text-white px-3 py-2 rounded-t cursor-move select-none"
        onPointerDown={handlePointerDown}
      >
        <span>{title}</span>
        <button
          onClick={onClose}
          className="ml-2 px-2 py-1 bg-red-500 rounded hover:bg-red-600"
        >
          ✕
        </button>
      </div>
      <div className="p-4 overflow-auto h-[calc(100%-40px)] text-slate-800">
        {contentType === "markdown" ? (
          <div>{content}</div>
        ) : (
          <pre>{content}</pre>
        )}
      </div>
    </div>
  );
};

export default Window;
