const preview = document.getElementById("preview");
const playback = document.getElementById("playback");
const startCameraBtn = document.getElementById("startCameraBtn");
const startRecordBtn = document.getElementById("startRecordBtn");
const stopRecordBtn = document.getElementById("stopRecordBtn");
const downloadBtn = document.getElementById("downloadBtn");
const statusText = document.getElementById("status");

let mediaStream;
let mediaRecorder;
let recordedChunks = [];
let recordedBlob;

const updateStatus = (message) => {
  statusText.textContent = message;
};

startCameraBtn.addEventListener("click", async () => {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    preview.srcObject = mediaStream;
    startRecordBtn.disabled = false;
    updateStatus("カメラ起動中");
  } catch (error) {
    updateStatus(`カメラへのアクセスに失敗しました: ${error.message}`);
  }
});

startRecordBtn.addEventListener("click", () => {
  if (!mediaStream) {
    updateStatus("先にカメラを起動してください");
    return;
  }

  recordedChunks = [];

  mediaRecorder = new MediaRecorder(mediaStream, {
    mimeType: "video/webm;codecs=vp8,opus",
  });

  mediaRecorder.addEventListener("dataavailable", (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  });

  mediaRecorder.addEventListener("stop", () => {
    recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    const videoUrl = URL.createObjectURL(recordedBlob);
    playback.src = videoUrl;
    downloadBtn.disabled = false;
    updateStatus("録画完了。再生または保存できます");
  });

  mediaRecorder.start();
  startRecordBtn.disabled = true;
  stopRecordBtn.disabled = false;
  downloadBtn.disabled = true;
  updateStatus("録画中...");
});

stopRecordBtn.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    stopRecordBtn.disabled = true;
    startRecordBtn.disabled = false;
  }
});

downloadBtn.addEventListener("click", () => {
  if (!recordedBlob) {
    return;
  }

  const link = document.createElement("a");
  const url = URL.createObjectURL(recordedBlob);

  link.href = url;
  link.download = `recording-${Date.now()}.webm`;
  link.click();

  URL.revokeObjectURL(url);
  updateStatus("動画ファイルを保存しました");
});
