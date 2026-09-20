import { sendToActiveTab } from "../common/message-bus";

document?.getElementById("sendButton")?.addEventListener("click", async () => {
  const response = await sendToActiveTab({
    src: "BACKGROUND",
    dst: "CONTENT",
    path: "/editor/insert-text",
    method: "PUT",
    data: { text: "hello" },
  });

  const elem = document.getElementById("console");
  if (elem) {
    elem.textContent = JSON.stringify(response);
  }
});
