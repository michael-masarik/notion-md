interface ListItem {
  text: string;
  nestLevel: number;
}
interface CheckListItem extends ListItem {
  isChecked: boolean;
}

export { CheckListItem, ListItem };
