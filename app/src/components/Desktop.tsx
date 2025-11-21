"use client";
import React, { useState } from "react";
import Window from "./Window";
import { Icon } from "@/app/types/Icon";
import { WindowData } from "@/app/types/WindowData";
import { icons } from "@/app/constants/icons";
import { Taskbar } from "./Taskbar";
import { DraggableIcon } from "./DraggableIcon";

export const Desktop = () => {
  const homeIcon = icons.find((i) => i.id === "home");
  const initialWindows: WindowData[] = homeIcon
    ? [{ ...homeIcon.window, x: 160, y: 80 }]
    : [];
  const [windows, setWindows] = useState<WindowData[]>(initialWindows);

  const initialIconPositions = icons.map((icon, idx) => ({
    ...icon,
    gridX: 40,
    gridY: 40 + idx * 100,
  }));
  const [iconPositions, setIconPositions] = useState(initialIconPositions);

  const openWindow = (icon: Icon) => {
    setWindows((ws) => {
      if (ws.some((w) => w.id === icon.window.id)) return ws;
      // Center window in viewport
      const winW = icon.window.w || 400;
      const winH = icon.window.h || 300;
      const centerX = Math.round(window.innerWidth / 2 - winW / 2);
      const centerY = Math.round(window.innerHeight / 2 - winH / 2);
      return [
        ...ws,
        {
          ...icon.window,
          x: centerX,
          y: centerY,
        },
      ];
    });
  };

  const handleDrag = (id: string, x: number, y: number) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x: x, y: y } : w)));
  };

  const closeWindow = (id: string) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  };

  const snapToGrid = (val: number) => Math.round(val / 20) * 20;

  const handleIconDrag = (id: string, x: number, y: number) => {
    setIconPositions((icons) =>
      icons.map((icon) =>
        icon.id === id
          ? { ...icon, gridX: snapToGrid(x), gridY: snapToGrid(y) }
          : icon,
      ),
    );
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <div
        className="absolute inset-0 w-full h-full"
        aria-label="Desktop background"
        style={{
          backgroundImage: "url(/desktop.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.18)",
          mixBlendMode: "lighten",
        }}
      />
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        {iconPositions.map((icon) => (
          <DraggableIcon
            key={icon.id}
            icon={icon}
            onOpen={() => openWindow(icon)}
            onDrag={handleIconDrag}
          />
        ))}
      </div>
      <Taskbar />
      {windows.map((w) => (
        <Window
          key={w.id}
          {...w}
          onClose={() => closeWindow(w.id)}
          onDrag={handleDrag}
        />
      ))}
    </div>
  );
};
