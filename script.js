async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

getCurrentTab().then((tabInfo) => {
  try {
    chrome.scripting.
      executeScript({
        target: {tabId: tabInfo.id, allFrames: true},
        func: main,
      })
      .then(() => console.log("injected a function"))
  } catch (e) {
    return;
  }
});

function main() {
  let selectedText = "";
  document.addEventListener("selectionchange", event=>{
    sel = document.getSelection()
    if(sel.toString() !== selectedText){
      selectedText = sel.toString();
      if (sel.rangeCount) {
        var range = sel.getRangeAt(0);
        let span = document.createElement("span");

        span.style.backgroundColor = "yellow";
        span.appendChild(range.extractContents());
        range.insertNode(span);
        range.detach();
      }
    }
  });
}