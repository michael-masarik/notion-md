interface ListItem {
  text: string;
  nestLevel: number;
}
interface CheckListItem extends ListItem {
  isChecked: boolean;
}
interface Media {
  url: URL;
  caption?: string;
  color?: BlockColor;
}

type Color =
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";
type BGColor =
  | "gray_bg"
  | "brown_bg"
  | "orange_bg"
  | "yellow_bg"
  | "green_bg"
  | "blue_bg"
  | "purple_bg"
  | "pink_bg"
  | "red_bg";
type BlockColor = Color | BGColor;
export type { BlockColor, CheckListItem, ListItem, Media };
