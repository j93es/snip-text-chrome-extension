import { useState } from "react";
import { useStatusNotifyListener } from "../customHook/messageListener";
import { sendMessage } from "../common/sendMessage";
import type { MessageRequest } from "../core/message-types";

function TestMessage() {
  const [responseData, setResponseData] = useState<unknown>(null);

  useStatusNotifyListener(async (req: MessageRequest) => {
    if (req.src !== "BACKGROUND" || req.dst !== "POPUP") {
      return;
    }

    setResponseData(req.data ?? { msg: "Invalid data field" });
  });

  const handleGetStatusClick = async () => {
    const response = await sendMessage({
      src: "POPUP",
      dst: "BACKGROUND",
      path: "/editor/status",
      method: "GET",
      data: { vendorName: "GOOGLE" },
    });

    setResponseData(response ?? { msg: "No response" });
  };

  const handleInsertTextClick = async () => {
    const response = await sendMessage({
      src: "POPUP",
      dst: "BACKGROUND",
      path: "/editor/insert-text",
      method: "PUT",
      data: { text: "hello" },
    });

    setResponseData(response ?? { msg: "No response" });
  };

  return (
    <div>
      <button onClick={handleGetStatusClick}>Get Status</button>
      <button onClick={handleInsertTextClick}>Insert Text</button>
      <pre>{JSON.stringify(responseData, null, 2)}</pre>
    </div>
  );
}

export default TestMessage;
