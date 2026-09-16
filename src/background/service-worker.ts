// import { MessageBus } from "../common/message-bus";
import { DOM_CHANGED } from "../core/bus-tab-id";
import { BackgroundMessageBus } from "./common/background-message-bus";

// const bus = new MessageBus(DOM_CHANGED);

const bus = new BackgroundMessageBus(DOM_CHANGED);

bus.on((msg: string) => {
    console.log("Received message from content script:", msg);
});