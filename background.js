// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "startScreenShare") {
//     // Request screen sharing
//     navigator.mediaDevices.getDisplayMedia({
//       video: {
//         cursor: "always",
//       },
//       audio: false,
//     })
//     .then((stream) => {
//       console.log("Screen sharing started: ", stream);

//       // You can handle the stream here, e.g., send it to a video element
//       sendResponse({ success: true });

//       // Listen for when the screen sharing stops
//       stream.getVideoTracks()[0].addEventListener("ended", () => {
//         console.log("Screen sharing stopped");
//       });
//     })
//     .catch((error) => {
//       console.error("Error: ", error);
//       sendResponse({ error: error.message });
//     });

//     // Return true to keep the message channel open for async response
//     return true;
//   }
// });
// // Function to create a custom cursor
// function createCustomCursor(stream) {
//   const video = document.createElement('video');
//   video.srcObject = stream;
//   video.play();

//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');

//   function drawCustomCursor() {
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Draw custom cursor
//     ctx.beginPath();
//     ctx.arc(50, 50, 10, 0, 2 * Math.PI);
//     ctx.fillStyle = 'red';
//     ctx.fill();

//     requestAnimationFrame(drawCustomCursor);
//   }

//   video.addEventListener('loadedmetadata', drawCustomCursor);

//   return canvas.captureStream();
// }

// // Modify the existing screen sharing code to use the custom cursor
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "startScreenShare") {
//     navigator.mediaDevices.getDisplayMedia({
//       video: {
//         cursor: "never", // Hide the default cursor
//       },
//       audio: false,
//     })
//     .then((stream) => {
//       console.log("Screen sharing started: ", stream);

//       // Create custom cursor stream
//       const customCursorStream = createCustomCursor(stream);

//       // You can now use customCursorStream for your screen sharing
//       sendResponse({ success: true });

//       // Listen for when the screen sharing stops
//       customCursorStream.getVideoTracks()[0].addEventListener("ended", () => {
//         console.log("Screen sharing stopped");
//       });
//     })
//     .catch((error) => {
//       console.error("Error: ", error);
//       sendResponse({ error: error.message });
//     });

//     return true;
//   }
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "requestScreenShare") {
//     chrome.desktopCapture.chooseDesktopMedia(
//       ["screen", "window", "tab"],
//       sender.tab,
//       (streamId) => {
//         if (streamId) {
//           sendResponse({stream: streamId});
//         } else {
//           sendResponse({error: "Failed to get stream ID"});
//         }
//       }
//     );
//     return true; // Indicates that the response will be sent asynchronously
//   }
// });
