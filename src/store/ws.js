import { persist } from '@/assets/library/CommonFunctions.js'
import { acts } from "@tadashi/svelte-notification";
export let ws = new WebSocket("ws://168.119.247.99:8000?token=Y2xpZW50OmxtYW8=");

const data = {
    ws: {},
    log: [],
    avgDistance: []
}

const context = persist('ws', data)

context.setPPMByPPM = function (ppm, TOTAL_MASK) {
    ws.send(JSON.stringify({ command: "setPPMByPPM", value: ppm, mask: TOTAL_MASK }));
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

    ws = new WebSocket("ws://168.119.247.99:8000?token=Y2xpZW50OmxtYW8=");

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
                let log = context.val('log');
                if (!avg) context.commit('avgDistance', [])
                if (!log) context.commit('log', [])
                let dist = Number(json.distance.toFixed(2))
                if (json.distance && dist > 0) context.commit('avgDistance', [...avg, dist])
                if (json.currentPPM < 0) json.currentPPM = "N/A";
                if (json.probePPM < 0) json.probePPM = "N/A";
                if (avg.length > 60) {
                    avg.shift()
                    context.commit('avgDistance', avg)
                }
                if (json.log)  log = [...log, json.log]
                if (log.length > 100)  log.shift()
                if (json.log)  context.commit('log', log)
            }
            else {
                context.commit('log', [...context.val('log'), json.log])
            }
        } catch (e) {
            console.log("Couldnt parse WS message");
        }
    });
}

start()
context.commit('avgDistance', [])

