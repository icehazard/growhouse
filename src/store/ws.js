import { persist } from '@/assets/library/CommonFunctions.js'

export let ws = new WebSocket("ws://168.119.247.99:8000?token=Y2xpZW50OmxtYW8=");

const data = {
    ws: {},
}

const context = persist('ws', data)

context.setPPMByPPM = function (ppm) {
    ws.send(JSON.stringify({ command: "setPPMByPPM", value: ppm }));
}
context.setPh = function (ph) {
    ws.send(JSON.stringify({ command: "setPH", value: ph }));
}
context.runTest = function () {
    ws.send(JSON.stringify({ command: "test"}));
    console.log("SENDING TEST")
}
context.cmd = function (cmd) {
    ws.send(JSON.stringify({ command: cmd}));
    console.log("SENDING CMD", cmd)
}
export default context;

function start() {


    ws.addEventListener("open", function (event) {
        console.log("WS connected");
    });

    ws.addEventListener("close", function (event) {
        console.log("Encountered close, trying to reconnect");
        setTimeout(start, 5e3);
    });

    ws.addEventListener("error", function (event) {
        console.log("Encountered error, trying to reconnect");
        setTimeout(start, 5e3);
    });

    ws.addEventListener("message", function (event) {
        try {
            let json = JSON.parse(event.data);
            //ws.send(JSON.stringify({ ping: "back" }), { binary: false });
            context.commit('ws', json)
        } catch (e) {
            console.log("Couldnt parse WS message");
        }
    });
}

start()

