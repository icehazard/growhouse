import { persist } from '@/assets/library/CommonFunctions.js'
import { Notifications, acts } from "@tadashi/svelte-notification";
export let ws = new WebSocket("ws://168.119.247.99:8000?token=Y2xpZW50OmxtYW8=");

const data = {
    ws: {},
    log: {},
    avgDistance: []
}

const context = persist('ws', data)

context.setPPMByPPM = function (ppm) {
    ws.send(JSON.stringify({ command: "setPPMByPPM", value: ppm }));
}
context.setPh = function (ph) {
    ws.send(JSON.stringify({ command: "setPH", value: ph }));
}
context.runTest = function () {
    ws.send(JSON.stringify({ command: "test" }));
    console.log("SENDING TEST")
}
context.cmd = function (cmd) {
    ws.send(JSON.stringify({ command: cmd }));
    console.log("SENDING CMD", cmd)
}
context.sendNotif = function (notification) {
    return () => {
        acts.add(notification);
    };
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

            if (json.notif) {
                console.log(json.notif)
                console.log(typeof json.notif)
                context.sendNotif(json.notif)()
                return
            }

            if (!json.log) {
                context.commit('ws', json)
                let avg = context.val('avgDistance');
                if (!avg) context.commit('avgDistance', [])
                if (json.distance) context.commit('avgDistance', [...avg, json.distance])
                if (json.currentPPM < 0) json.currentPPM = "N/A";
                if (json.probePPM < 0) json.probePPM = "N/A";
                if (avg.length > 30) {
                    avg.shift()
                    context.commit('avgDistance', avg)
                }
            }
            else {
                context.commit('log', json.log)

            }
        } catch (e) {
            console.log("Couldnt parse WS message");
        }
    });
}

start()

