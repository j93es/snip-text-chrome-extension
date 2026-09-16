import { EditorObserver } from "./editor-observer";

const GMAIL_EDITOR_SELECTOR = 'div[contenteditable="true"][g_editable="true"][role="textbox"][aria-multiline="true"]';

const gmailObserver = new EditorObserver(GMAIL_EDITOR_SELECTOR);
gmailObserver.start()

setInterval(() => {
    console.log(gmailObserver.getEditor());
}, 1000)