import { WindowData } from "./WindowData";

export interface Icon {
  id: string;
  label: string;
  icon: string; // emoji or url
  window: Omit<WindowData, "x" | "y">;
}
