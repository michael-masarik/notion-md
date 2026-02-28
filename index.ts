import { BlockColor, CheckListItem, ListItem, Media } from "./types";

/**
 * Constructs a Checklist object from an array of `CheckListItem`
 * You pass the text and the checkbox status
 * @param items - list items and checkbox status
 * @returns string
 */
export function checkList(items: Array<CheckListItem>) {
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
export function lists(items: Array<ListItem>) {
  var baseString = "";
  items.forEach((item) => {
    baseString += "\t".repeat(item.nestLevel) + "- " + item + "\n";
  });
  return baseString;
}

export function bold(text: string) {
  return `**${text}**`;
}
export function itallic(text: string) {
  return `*${text}*`;
}
export function underline(text: string) {
  return `<span underline="true">${text}</span>`;
}
export function strikeThrough(text: string) {
  return `~~${text}~~`;
}
export function inlineCode(text: string) {
  return `\`${text}\``;
}

export function math(text: string) {
  return `$${text}$`;
}
export function color(text: string, color: BlockColor) {
  return `<span color="${color}">${text}</span>`;
}
export function toc(color?: BlockColor) {
  if (color) {
    return `<table_of_contents color="${color}"/>`;
  }
  return "<table_of_contents />";
}
export function link(data: Media) {
  // Vaildate URL
  var vaildURL = new URL(data.url).href;
  var colorScheme: string = "";
  if (data.color) {
    colorScheme = ` {color="${data.color}"}`;
  }
  return `![${data.caption}](${vaildURL})` + colorScheme;
}
export function audio(data: Media) {
  // Vaildate URL
  var vaildURL = new URL(data.url).href;

  if (data.color) {
    return `<audio src=${vaildURL} color="${data.color}">${data.caption}</audio>`;
  }
  return `<audio src=${vaildURL}>${data.caption}</audio>`;
}
