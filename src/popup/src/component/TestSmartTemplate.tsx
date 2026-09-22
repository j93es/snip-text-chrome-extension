import { useMemo, useState } from "react";
import { sendMessage } from "../common/sendMessage";

function TestSmartTemplate() {
  const smartTemplateExample = `
    안녕하세요?

    {{이름}}의 문의사항이 잘 접수되었습니다.

    {{특이 사항}}

    좋은 하루 보내시길 바라겠습니다.

    {{년도}} {{월}} {{일}}
    `;

  const templateFields = useMemo(
    () => [
      ...new Set(
        [...smartTemplateExample.matchAll(/\{\{\s*([^{}]+?)\s*\}\}/g)]
          .map((match) => match[1].trim())
          .filter(Boolean),
      ),
    ],
    [smartTemplateExample],
  );

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(templateFields.map((field) => [field, ""])),
  );
  const [renderedText, setRenderedText] = useState("");
  const [responseData, setResponseData] = useState<unknown>(null);

  const handleChange = (field: string, nextValue: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: nextValue,
    }));
  };

  const renderTemplate = () =>
    smartTemplateExample.replace(
      /\{\{\s*([^{}]+?)\s*\}\}/g,
      (_, field: string) => {
        const key = field.trim();
        return values[key] ?? "";
      },
    );

  const handleRender = () => {
    const nextText = renderTemplate();
    setRenderedText(nextText);
  };

  const handleSendTemplate = async () => {
    const nextText = renderTemplate();
    setRenderedText(nextText);

    const response = await sendMessage({
      src: "POPUP",
      dst: "BACKGROUND",
      path: "/editor/insert-text",
      method: "PUT",
      data: { text: nextText },
    });

    setResponseData(response ?? { msg: "No response" });
  };

  const handleCopy = async () => {
    if (!renderedText) return;

    try {
      await navigator.clipboard.writeText(renderedText);
    } catch (error) {
      console.error("복사 실패:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "16px",
      }}>
      <h3>Smart Template</h3>

      {templateFields.length === 0 ? (
        <p>템플릿 변수가 없습니다.</p>
      ) : (
        <div style={{ display: "grid", gap: "8px" }}>
          {templateFields.map((field) => (
            <label key={field} style={{ display: "grid", gap: "4px" }}>
              <span>{field}</span>
              <input
                type="text"
                value={values[field] ?? ""}
                onChange={(event) => handleChange(field, event.target.value)}
                placeholder={field}
                style={{ padding: "8px" }}
              />
            </label>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={handleRender}
          style={{ padding: "10px 12px", cursor: "pointer", flex: 1 }}>
          텍스트 생성
        </button>

        <button
          type="button"
          onClick={handleSendTemplate}
          style={{ padding: "10px 12px", cursor: "pointer", flex: 1 }}>
          생성 후 전송
        </button>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!renderedText}
          style={{
            padding: "10px 12px",
            cursor: renderedText ? "pointer" : "not-allowed",
          }}>
          복사하기
        </button>
      </div>

      <div>
        <h4>전송 결과</h4>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
          {JSON.stringify(responseData, null, 2)}
        </pre>
      </div>

      <div>
        <h4>결과 텍스트</h4>
        <textarea
          value={renderedText}
          readOnly
          rows={12}
          style={{ width: "100%", padding: "8px", resize: "vertical" }}
        />
      </div>
    </div>
  );
}

export default TestSmartTemplate;
