import { persist } from '@/assets/library/CommonFunctions.js'

const data = {
    ws: {},
}

const context = persist('ws', data)

context.setPPM = function (ppm) {
    ws.send(JSON.stringify({ command: "setPPM", value: ppm }));
}
context.setPh = function (ph) {
    ws.send(JSON.stringify({ command: "setPH", value: ph }));
}

export default context

let ws = new WebSocket("ws://168.119.247.99:8000?token=Y2xpZW50OmxtYW8=");

ws.addEventListener("open", function (event) {
    console.log("WS connected");
});

ws.addEventListener("close", function (event) {
    console.log("Encountered close, trying to reconnect");
    setTimeout(startWs, 5e3);
});

ws.addEventListener("error", function (event) {
    console.log("Encountered error, trying to reconnect");
    setTimeout(startWs, 5e3);
});

ws.addEventListener("message", function (event) {
    try {
        let json = JSON.parse(event.data);
        ws.send(JSON.stringify({ ping: "back" }), { binary: false });
        context.commit('ws', json)
    } catch (e) {
        console.log("Couldnt parse WS message");
    }
});