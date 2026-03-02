const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { Worker } = require("worker_threads");
const Store = require("electron-store");

const store = new Store();
let llmWorker;
let win;

// 🔹 CHANGE THIS to your model URL
const MODEL_URL =
    "https://your-server/models/mistral-7b-instruct.Q4_K_M.gguf";

function getModelPath() {
    return path.join(app.getPath("userData"), "models", "model.gguf");
}

function ensureDir(filePath) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function modelExists() {
    return fs.existsSync(getModelPath());
}

function startWorker(modelPath) {
    llmWorker = new Worker(
        path.join(__dirname, "llmWorker.js")
    );

    llmWorker.postMessage({
        type: "init",
        modelPath,
    });
}

// ✅ download with progress
async function downloadModel(event) {
    const dest = getModelPath();
    ensureDir(dest);

    const response = await axios({
        method: "get",
        url: MODEL_URL,
        responseType: "stream",
    });

    const total = Number(response.headers["content-length"]);
    let received = 0;

    const writer = fs.createWriteStream(dest);

    response.data.on("data", (chunk) => {
        received += chunk.length;
        const percent = Math.round((received / total) * 100);
        event.sender.send("model-progress", percent);
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
}

function createWindow() {
    win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(createWindow);

// 🔥 ensure model
ipcMain.handle("ensure-model", async (event) => {
    if (!modelExists()) {
        await downloadModel(event);
    }

    const modelPath = getModelPath();
    startWorker(modelPath);

    return { ready: true };
});

ipcMain.handle("ask-llm", async (event, prompt) => {
    return new Promise((resolve) => {
        llmWorker.postMessage({
            type: "prompt",
            prompt,
        });

        llmWorker.on("message", (msg) => {
            event.sender.send("llm-stream", msg);
            if (msg.type === "done") resolve();
        });
    });
});

ipcMain.handle("load-chats", () => {
    return store.get("chats", []);
});

ipcMain.handle("save-chats", (_, chats) => {
    store.set("chats", chats);
});