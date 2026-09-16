import { tryCatch } from "../../common/wrapper";

export class ContentMessageBus {
    private namespace!: string;
    private port!: chrome.runtime.Port;

    constructor(namespace: string) {
        this.namespace = namespace;
        this.connect();
    }

    connect(): void {
        tryCatch(() => {
            this.port = chrome.runtime.connect({name: this.namespace});
        });
    }

    disconnect(): void {
        tryCatch(() => {
            this.port.disconnect();
        });
    }

    send(data?: unknown): void {
        tryCatch(() => {
            this.port.postMessage(data);
        });
    }

    on(callback: (msg: string) => void): void {
        tryCatch(() => {
            this.port.onMessage.addListener(function(msg: string) {
                callback(msg);
            });
        });
    }
}