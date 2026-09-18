import { sendMessage } from "../common/message-bus";

document?.getElementById("sendButton")?.addEventListener("click", async () => {
  const response = await sendMessage({
    src: "POPUP",
    dst: "BACKGROUND",
    path: "/editor/insert-text",
    method: "PUT",
    data: { text: "hello" },
  });

  const elem = document.getElementById("console");
  if (elem) {
    elem.textContent = JSON.stringify(response);
  }
});
