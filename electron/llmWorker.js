const { parentPort } = require("worker_threads");
const { LlamaModel, LlamaContext } = require("node-llama-cpp");

let context;

parentPort.on("message", async (msg) => {
    if (msg.type === "init") {
        const model = new LlamaModel({
            modelPath: msg.modelPath,
        });

        context = new LlamaContext({ model });
        parentPort.postMessage({ type: "ready" });
    }

    if (msg.type === "prompt") {
        try {
            const stream = await context.prompt(msg.prompt, {
                stream: true,
                maxTokens: 512,
            });

            for await (const chunk of stream) {
                parentPort.postMessage({
                    type: "token",
                    token: chunk.token,
                });
            }

            parentPort.postMessage({ type: "done" });
        } catch (err) {
            parentPort.postMessage({
                type: "error",
                error: err.message,
            });
        }
    }
});