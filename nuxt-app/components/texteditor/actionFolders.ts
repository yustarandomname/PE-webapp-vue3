export interface ActionFolder {
  title: string;
  icon: string;
  actions: Action[];
}

export interface Action {
  title: string;
  icon: string;
  exec: string;
  wrap?: string;
  class?: string;
}

export const actionFolders: ActionFolder[] = [
  {
    title: "header",
    icon: "format_size",
    actions: [
      {
        title: "Header 1",
        exec: "formatBlock",
        wrap: "<h1>",
        icon: "title",
      },
      {
        title: "Header 2",
        exec: "formatBlock",
        wrap: "<h2>",
        class: "h2",
        icon: "title",
      },
      {
        title: "Header 3",
        exec: "formatBlock",
        wrap: "<h3>",
        class: "h3",
        icon: "title",
      },
      { title: "Quote", exec: "formatBlock", icon: "format_quote" },
    ],
  },
  {
    title: "Format",
    icon: "brush",
    actions: [
      { title: "Bold", exec: "bold", icon: "format_bold" },
      { title: "Italic", exec: "italic", icon: "format_italic" },
      { title: "Underline", exec: "underline", icon: "format_underlined" },
    ],
  },
  {
    title: "List",
    icon: "list",
    actions: [
      {
        title: "Bulleted list",
        exec: "insertUnorderedList",
        icon: "format_list_bulleted",
      },
      {
        title: "Numbered list",
        exec: "insertOrderedList",
        icon: "format_list_numbered",
      },
    ],
  },
  {
    title: "Indent",
    icon: "compare_arrows",
    actions: [
      { title: "Indent", exec: "indent", icon: "format_indent_increase" },
      { title: "Outdent", exec: "outdent", icon: "format_indent_decrease" },
    ],
  },
  // {
  //   title: "Image",
  //   icon: "image",
  //   actions: [
  //     { title: "Upload image", exec: "insertImageByFile", icon: "folder_open" },
  //     { title: "Url image", exec: "insertImageByUrl", icon: "image" },
  //   ],
  // },
];

export const specialActions: Action[] = [
  { title: "Clear format", exec: "removeFormat", icon: "format_clear" },
  { title: "Undo", exec: "undo", icon: "undo" },
  { title: "Redo", exec: "redo", icon: "redo" },
];
