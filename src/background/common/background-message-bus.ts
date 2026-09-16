import { tryCatch } from "../../common/wrapper";

export class BackgroundMessageBus {
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
            const namespace = this.namespace;

            chrome.runtime.onConnect.addListener(function(port) {
                if (port.name !== namespace) {
                    return;
                }
                port.onMessage.addListener(function(msg) {
                    callback(msg);
                });
            });
        });
    }
}