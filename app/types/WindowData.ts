export interface WindowData {
  id: string;
  title: string;
  contentType: "markdown" | "text" | "html";
  x: number;
  y: number;
  w: number;
  h: number;
  content: string;
}
