document.getElementById("toggleCursor").addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found");
      return;
    }
    
    // First, check if the content script is running
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'typeof toggleCustomCursor === "function";'
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error("Error checking content script:", chrome.runtime.lastError.message);
        return;
      }

      if (results && results[0]) {
        // Content script is running, send the message
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleCustomCursor"}, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError.message);
          } else if (response && response.success) {
            console.log("Custom cursor toggled");
          } else {
            console.error("Unexpected response:", response);
          }
        });
      } else {
        console.error("Content script not running in the current tab");
        // Optionally, you could inject the content script here if it's not running
      }
    });
  });
});

document.getElementById("shareScreen").addEventListener("click", async () => {
  const videoElement = document.getElementById("screenVideo");

  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false
    });

    if (videoElement) {
      videoElement.srcObject = stream;
      videoElement.style.display = "block";
      videoElement.play();
    } else {
      console.error("Video element not found");
    }

    console.log("Screen sharing started");

    stream.getVideoTracks()[0].addEventListener("ended", () => {
      console.log("Screen sharing stopped");
      videoElement.srcObject = null;
      videoElement.style.display = "none";
    });
  } catch (error) {
    console.error("Error starting screen share:", error);
  }
});
