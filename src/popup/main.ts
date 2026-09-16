interface ChromeTabs {
    query(
        queryInfo: { active: boolean; lastFocusedWindow: boolean },
        callback: (tabs: Array<{ id?: number }>) => void
    ): void;
    sendMessage(
        tabId: number,
        message: { type: string; text: string },
        callback: (response?: { ok: boolean; message?: string }) => void
    ): void;
}

declare const chrome: { tabs: ChromeTabs };

const testButton = document.querySelector<HTMLButtonElement>("#testButton");
const result = document.querySelector<HTMLParagraphElement>("#result");

if (!testButton || !result) {
    throw new Error("Popup elements were not found.");
}

testButton.addEventListener("click", () => {
    chrome.tabs.query(
        { active: true, lastFocusedWindow: true },
        ([activeTab]) => {
            if (activeTab?.id === undefined) {
                result.textContent = "활성 탭을 찾을 수 없습니다.";
                return;
            }

            chrome.tabs.sendMessage(
                activeTab.id,
                { type: "insert-text", text: "abc" },
                response => {
                    result.textContent = response?.ok
                        ? "텍스트를 입력했습니다."
                        : response?.message ?? "Gmail 편집기를 찾을 수 없습니다.";
                }
            );
        }
    );
});

