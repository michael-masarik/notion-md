import type {
  BlockColor,
  BlockQuote,
  CheckListItem,
  Code,
  Headings,
  ListItem,
  Media,
  RichText,
  Toggle,
} from "./types.ts";

export function escape(text: string) {
  return text
    .replaceAll("\\", "\\\\")
    .replaceAll("\*", "\\\*")
    .replaceAll("\~", "\\\~")
    .replaceAll("`", "\\`")
    .replaceAll("\$", "\\\$")
    .replaceAll("\[", "\\\[")
    .replaceAll("\]", "\\\]")
    .replaceAll("\<", "\\\<")
    .replaceAll("\>", "\\\>")
    .replaceAll("\{", "\\\{")
    .replaceAll("\}", "\\\}")
    .replaceAll("\|", "\\\|")
    .replaceAll("\^", "\\\^");
}

/**
 * Constructs a Checklist object from an array of `CheckListItem`
 * You pass the text and the checkbox status
 * @param items - list items and checkbox status
 * @returns string
 */
export function checkList(items: Array<CheckListItem>) {
  var baseString = "";
  items.forEach((item) => {
    item.text = escape(item.text);
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
    item.text = escape(item.text);
    baseString += "\t".repeat(item.nestLevel) + "- " + item.text + "\n";
  });
  return baseString;
}

export function bold(content: RichText) {
  content.text = escape(content.text);
  var color = "";
  if (content.color) {
    color = ` {color="${content.color}}`;
  }
  return `**${content.text}${color}**`;
}
export function itallic(content: RichText) {
  content.text = escape(content.text);
  var color = "";
  if (content.color) {
    color = ` {color="${content.color}}`;
  }
  return `*${content.text}${color}*`;
}
export function underline(content: RichText) {
  content.text = escape(content.text);
  var color = "";
  if (content.color) {
    color = ` color="${content.color}`;
  }
  return `<span underline="true"${color}>${content.text}</span>`;
}
export function strikeThrough(content: RichText) {
  content.text = escape(content.text);
  var color = "";
  if (content.color) {
    color = ` {color="${content.color}}`;
  }
  return `~~${content.text}${color}~~`;
}
export function inlineCode(content: RichText) {
  content.text = escape(content.text);
  var color = "";
  if (content.color) {
    color = ` {color="${content.color}}`;
  }
  return `\`${content.text}${color}\``;
}

export function math(content: RichText) {
  content.text = escape(content.text);
  var color = "";
  if (content.color) {
    color = ` {color="${content.color}}`;
  }
  return `$${content.text}${color}$`;
}
export function color(text: string, color: BlockColor) {
  text = escape(text);
  return `<span color="${color}">${text}</span>`;
}
export function toc(color?: BlockColor) {
  if (color) {
    return `<table_of_contents color="${color}"/>`;
  }
  return "<table_of_contents />";
}
export function link(data: Media) {
  data.caption = escape(data.caption ?? "");
  // Vaildate URL
  var vaildURL = new URL(data.url).href;
  var colorScheme: string = "";
  if (data.color) {
    colorScheme = ` {color="${data.color}"}`;
  }
  return `![${data.caption}](${vaildURL})` + colorScheme;
}
export function audio(data: Media) {
  data.caption = escape(data.caption ?? "");
  // Vaildate URL
  var vaildURL = new URL(data.url).href;

  if (data.color) {
    return `<audio src=${vaildURL} color="${data.color}">${data.caption}</audio>`;
  }
  return `<audio src=${vaildURL}>${data.caption}</audio>`;
}
export function blockQuote(content: BlockQuote) {
  // TODO: Figure out how to escape this without breaking newlines
  // Notion requires newlines inside of block quotes to be replaced with <br/>
  const validText = content.text.replaceAll("\n", "<br/>");
  const color = content.color ? ` {color="${content.color}"}` : "";
  return `> ${validText}` + color;
}
export function toggle(content: Toggle) {
  content.title = escape(content.title);
  var colorAttr = "";
  if (content.color) {
    colorAttr = " ${content.color}";
  }
  if (content.headingLevel) {
    var titleMD = "";
    switch (content.headingLevel) {
      case 1:
        titleMD = "# ";
        break;
      case 2:
        titleMD = "## ";
        break;
      case 3:
        titleMD = "### ";
        break;
      default:
        throw new Error(
          `@michael-masarik/notion-md: Invaild heading level (${content.headingLevel})`,
        );
    }
    return (
      titleMD +
      content.title +
      `{toggle="true"${colorAttr}}\n\t` +
      content.children
    );
  }
  var details = "<details>\n";
  if (content.color) {
    details = `<details color="${content.color}">\n`;
  }
  return (
    details +
    `<summary>${content.title}</summary>\n\t${content.children}\n</details>`
  );
}
export function heading(content: Headings) {
  content.text = escape(content.text);
  var titleMD = "";
  var colorAttr = "";
  switch (content.level) {
    case 1:
      titleMD = "# ";
      break;
    case 2:
      titleMD = "## ";
      break;
    case 3:
      titleMD = "### ";
      break;
    default:
      throw new Error(
        `@michael-masarik/notion-md: Invaild heading level (${content.level})`,
      );
  }
  if (content.color) {
    colorAttr = ` {color="${content.color}"}`;
  }
  return titleMD + content.text + colorAttr;
}
export function blankLine() {
  return "<empty-block/>";
}
export function div() {
  return "---";
}
export function equation(equation: string) {
  return `$$\n${equation}\n$$`;
}
export function code(code: Code) {
  return `\`\`\`${code.langauge}\n${code.text}\n\`\`\``;
}
