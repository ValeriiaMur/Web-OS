import { Icon } from "@/app/types/Icon";
import React from "react";

interface DraggableIconProps {
  icon: Icon & { gridX: number; gridY: number };
  onOpen: (icon: Icon, x: number, y: number) => void;
  onDrag: (id: string, x: number, y: number) => void;
}

export const DraggableIcon: React.FC<DraggableIconProps> = ({
  icon,
  onOpen,
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
      x: e.clientX - icon.gridX,
      y: e.clientY - icon.gridY,
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;
    onDrag(icon.id, newX, newY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={dragRef}
      className="flex flex-col items-center cursor-pointer select-none pointer-events-auto"
      style={{
        position: "absolute",
        left: icon.gridX,
        top: icon.gridY,
        width: 80,
        touchAction: "none",
        zIndex: 10,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={() => onOpen(icon, icon.gridX + 100, icon.gridY)}
    >
      <div className="text-4xl mb-2">{icon.icon}</div>
      <div className="text-white text-sm bg-slate-700 rounded px-2 py-1 shadow">
        {icon.label}
      </div>
    </div>
  );
};
