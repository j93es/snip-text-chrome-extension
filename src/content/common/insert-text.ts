export function insertTextToEditor(
  editor: HTMLElement | undefined | null,
  text: string,
): { prevText: string; isInserted: boolean } {
  if (!(editor instanceof HTMLElement)) {
    return {
      prevText: "",
      isInserted: false,
    };
  }

  const prevText = editor.textContent === "," ? "" : editor.textContent ?? "";
  const safeText = String(text ?? "");

  if (!safeText) {
    return {
      prevText,
      isInserted: false,
    };
  }

  try {
    editor.focus();
    editor.textContent = "";

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(true);

    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    const textNode = document.createTextNode(safeText);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);

    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    return {
      prevText,
      isInserted: true,
    };
  } catch (error) {
    console.warn("Failed to insert text into editor:", error);
  }

  editor.textContent = safeText;

  return {
    prevText,
    isInserted: true,
  };
}
