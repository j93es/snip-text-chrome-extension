testButton.addEventListener("click", () => {
    if (gmailObserver.currentEditor) {
        insertText.insertText(gmailObserver.currentEditor, "abc")
    }
    result.textContent = "TEST 클릭 완료!";
});

