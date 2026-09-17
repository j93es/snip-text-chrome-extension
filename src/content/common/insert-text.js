export class InsertText {
  constructer(head, body, footer) {
    this.template = "abc hello"; // api로 가져오거나 편집
  }

  insertText(editor, text) {
    editor.focus();

    const selection = window.getSelection();

    if (!selection) return;

    const range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);

    const success = document.execCommand("insertText", false, text);

    if (!success) {
      editor.textContent = text;

      editor.dispatchEvent(
        new InputEvent("input", {
          bubbles: true,
          inputType: "insertText",
          data: text,
        }),
      );
    }
  }
}
