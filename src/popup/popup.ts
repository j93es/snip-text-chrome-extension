document?.getElementById("sendButton")
  ?.addEventListener("click", async () => {

    const response = await chrome.runtime.sendMessage({
      type: "FROM_POPUP",
      message: "Popup에서 보낸 메시지입니다."
    });

    console.log("Background 응답:", response);
  });