let customCursor;
let isCustomCursorActive = false;

function createCustomCursor() {
  customCursor = document.createElement("div");
  customCursor.id = "custom-cursor";
  document.body.appendChild(customCursor);
}

function updateCustomCursorPosition(e) {
  if (isCustomCursorActive) {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  }
}

function toggleCustomCursor() {
  isCustomCursorActive = !isCustomCursorActive;
  if (isCustomCursorActive) {
    document.body.style.cursor = "none";
    customCursor.style.display = "block";
  } else {
    document.body.style.cursor = "auto";
    customCursor.style.display = "none";
  }
}

createCustomCursor();
document.addEventListener("mousemove", updateCustomCursorPosition);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleCustomCursor") {
    toggleCustomCursor();
    sendResponse({ success: true });
  }
  return true; // Indicates that the response is sent asynchronously
});

console.log("Content script loaded and running");
