import { Ref } from "vue";
import type { Action } from "./actionFolders";

export const executeAction = (action: Action, content: HTMLElement | null) => {
  const id = action.exec;

  content.value?.focus();

  switch (id) {
    case "formatBlock":
      document.execCommand("formatBlock", false, action?.wrap);
      break;
    default:
      document.execCommand(action.exec as string, false);
  }
};
