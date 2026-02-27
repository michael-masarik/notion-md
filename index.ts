import { CheckListItem, ListItem } from "./types";

/**
 * Constructs a Checklist object from an array of `CheckListItem`
 * You pass the text and the checkbox status
 * @param items - list items and checkbox status
 * @returns string
 */
function checkList(items: Array<CheckListItem>) {
  var baseString = "";
  items.forEach((item) => {
    var checkBox;
    if (item.isChecked) {
      checkBox = "- [x]";
    } else {
      checkBox = "- [ ]";
    }
    baseString += "\t".repeat(item.nestLevel) + checkBox + item.text + "\n";
  });
  return baseString;
}

/**
 * Constructs a Bulleted
 * @param items - list items
 * @returns string
 */
function lists(items: Array<ListItem>) {
  var baseString = "";
  items.forEach((item) => {
    baseString += "\t".repeat(item.nestLevel) + "- " + item + "\n";
  });
  return baseString;
}
export { checkList, lists };
