const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ai", {
    ensureModel: () => ipcRenderer.invoke("ensure-model"),
    ask: (prompt) => ipcRenderer.invoke("ask-llm", prompt),

    onProgress: (cb) =>
        ipcRenderer.on("model-progress", (_, p) => cb(p)),

    onStream: (cb) =>
        ipcRenderer.on("llm-stream", (_, data) => cb(data)),

    loadChats: () => ipcRenderer.invoke("load-chats"),
    saveChats: (chats) => ipcRenderer.invoke("save-chats", chats),
});