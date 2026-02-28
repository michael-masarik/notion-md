export interface ListItem {
  text: string;
  nestLevel: number;
}
export interface CheckListItem extends ListItem {
  isChecked: boolean;
}
export interface Media {
  url: URL;
  caption?: string;
  color?: BlockColor;
}
export interface BlockQuote {
  text: string;
  color?: BlockColor;
}
export interface Toggle {
  title: string;
  headingLevel?: number;
  children: string;
  color?: BlockColor;
}
export interface Headings {
  text: string;
  level: number;
  color?: BlockColor;
}
export interface Code {
  text: string;
  langauge: string;
}
export interface RichText {
  text: string;
  color?: BlockColor;
}

export type Color =
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";
export type BGColor =
  | "gray_bg"
  | "brown_bg"
  | "orange_bg"
  | "yellow_bg"
  | "green_bg"
  | "blue_bg"
  | "purple_bg"
  | "pink_bg"
  | "red_bg";
export type BlockColor = Color | BGColor;
