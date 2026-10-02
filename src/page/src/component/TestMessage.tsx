import { useState } from "react";
import { useStatusNotifyListener } from "../customHook/messageListener";
import { sendMessage } from "../common/sendMessage";
import type { MessageRequest } from "../core/message-types";

function TestMessage({ vendorName }: { vendorName: string }) {
  const [responseData, setResponseData] = useState<unknown>(null);
  if (!vendorName) {
    return <></>;
  }

  useStatusNotifyListener(async (req: MessageRequest) => {
    if (req?.data.vendorName === vendorName) {
      setResponseData(req.data ?? { msg: "No response" });
    }
  });

  const handleGetStatusClick = async () => {
    const res = await sendMessage({
      src: "PAGE",
      dst: "BACKGROUND",
      path: "/editor/status",
      method: "GET",
      data: { vendorName },
    });

    if (res?.data.vendorName === vendorName) {
      setResponseData(res.data ?? { msg: "No response" });
    }
  };

  const handleInsertTextClick = async () => {
    await sendMessage({
      src: "PAGE",
      dst: "BACKGROUND",
      path: "/editor/insert-text",
      method: "PUT",
      data: { text: "hello" },
    });
  };

  return (
    <div>
      <text>{vendorName}</text>
      <button onClick={handleGetStatusClick}>Get Status</button>
      <button onClick={handleInsertTextClick}>Insert Text</button>
      <pre>{JSON.stringify(responseData, null, 2)}</pre>
    </div>
  );
}

export default TestMessage;
