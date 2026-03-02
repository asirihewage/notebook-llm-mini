# Notebook LLM Mini - Offline AI Notekeeper

This application is an **offline, desktop AI assistant** built with **Electron** and **node-llama-cpp**, designed for domain-specific knowledge management, incident triage, and downstream service memorization.

It allows users to maintain persistent chat history, interact with a local AI model, and have a professional ChatGPT-like experience **fully offline**, with token streaming and worker-thread inference for smooth performance.

---

## Features

- **Fully offline AI** – No internet or API required after the first model download.
- **Professional Chat UI** – ChatGPT-style interface with left-panel chat history.
- **Persistent chat history** – All conversations are saved locally using `electron-store`.
- **Token streaming / typewriter effect** – Responses appear live as the model generates them.
- **Worker-thread inference** – Inference runs in the background, keeping the app responsive.
- **Cross-platform** – Supports Windows, macOS, and Linux.
- **Domain knowledge integration** – Can be extended to use your KB for memorization and incident notes.

---

## Installation

1. Download the installer for your platform (Windows/macOS/Linux).
2. Run the installer.
3. On first launch, the app will download the AI model (~4–6 GB recommended for full performance).
4. Wait for the progress bar to complete – this ensures the model is ready for offline use.

---

## Usage

1. Launch the app.
2. Click **“New Chat”** to start a conversation.
3. Type your question or note in the input box.
4. The AI will respond in real-time with a typewriter-style effect.
5. All chat sessions are saved automatically and appear in the left sidebar for easy reference.

---

## Technical Details

- **Frontend:** Electron (HTML/CSS/JS)
- **Backend:** node-llama-cpp (local LLM inference)
- **Persistence:** electron-store (local JSON database for chat history)
- **Worker Threads:** Inference runs in worker threads for performance
- **Model Format:** GGUF (quantized LLM for offline use)
- **Cross-platform Support:** Windows, macOS, Linux

---

## Recommended Models

| Model | Approx. Size | Notes |
|-------|-------------|-------|
| Mistral 7B Instruct Q4_K_M | 4–5 GB | Balanced performance, good for offline use |
| Llama 3 8B Q4_K_M | 5–6 GB | Slightly larger, higher-quality responses |
| Phi-3 Mini Q4 | ~2 GB | Fast, lightweight, lower-quality responses |

---

## Use Cases

- Domain-specific knowledge memorization
- Incident triage and note keeping
- AI-assisted documentation for downstream services
- Offline brainstorming and conversation
- Personal knowledge base querying

---

## Future Enhancements

- Markdown formatting and code block rendering
- Multi-model selection
- RAG (retrieval-augmented generation) from external knowledge bases
- GPU acceleration support for faster inference

---

## License

This project is **for internal domain and enterprise use**. Redistribution of models or binaries is subject to the license of the underlying LLM models used.  