import { persist } from '@/assets/library/CommonFunctions.js'
import { acts } from "@tadashi/svelte-notification";
import dayjs from 'dayjs'
import ReconnectingWebSocket from 'reconnecting-websocket';

export let ws;

const data = {
    ws: {},
    log: [],
    avgDistance: []
}

const context = persist('ws', data)

context.setPPMByPPM = function (ppm, TOTAL_MASK) {
    ws.send(JSON.stringify({ command: "setPPMByPPM", value: ppm, mask: TOTAL_MASK }));
}
context.runPumpByMask = function (mask, duration) {
    ws.send(JSON.stringify({ command: "runpumpbymask", mask, duration}));
}
context.setPh = function (ph) {
    let fmt = ph * 10
    ws.send(JSON.stringify({ command: "setPH", value: fmt }));
}
context.runTest = function () {
    ws.send(JSON.stringify({ command: "test" }));
    console.log("SENDING TEST")
}
context.cmd = function (cmd) {
    ws.send(JSON.stringify({ command: cmd }));
    console.log("SENDING CMD", cmd)
}
context.cmdMiddleman = function (cmd) {
    ws.send(JSON.stringify({ middleman: 1, command: cmd }));
    console.log("SENDING CMD", cmd)
}
context.clearLog = function () {
    context.commit('log', [])
}
context.sendNotif = function (notification) {
    notification.lifetime = 5
    return () => {
        acts.add(notification);
    };
}
export default context;

function start() {

    context.commit('avgDistance', [])

    ws = new ReconnectingWebSocket("ws://168.119.247.99:8000?token=Y2xpZW50OmxtYW8=");

    ws.addEventListener("open", function (event) {
        console.log("WS connected");
    });

    ws.addEventListener("close", function (event) {
        console.log("Encountered close, trying to reconnect");
    });

    ws.addEventListener("error", function (event) {
        console.log("Encountered error, trying to reconnect");
    });

    ws.addEventListener("message", function (event) {
        try {
            let json = JSON.parse(event.data);

            if (json.notif) {
                context.sendNotif(json.notif)()
                return
            }

            if (!json.log) {
                context.commit('ws', json)
                let avg = context.val('avgDistance');
                let log = context.val('log');
                if (!avg) context.commit('avgDistance', [])
                if (!log) context.commit('log', [])
                let dist = Number(json.distance)
                if (json.distance && dist > 0 && dist < 150) context.commit('avgDistance', [...avg, dist])
                if (json.currentPPM < 0) json.currentPPM = "N/A";
                if (json.probePPM < 0) json.probePPM = "N/A";
                if (json.state) {
                    context.commit("state", json.state)
                }

                avg = context.val('avgDistance');
                if (avg.length > 60) {
                    avg.shift()
                    context.commit('avgDistance', avg)
                }
    
                if (json.log)  log = [...log, json.log]
                // if (log.length > 100)  log.shift()
                 if (json.log)  context.commit('log', {time: dayjs().format(), data: log})
            }
            else {
              context.commit('log', [...context.val('log'), {time: dayjs().format(), data: json.log}])
            }
        } catch (e) {
            console.log("Couldnt parse WS message");
        }
    });
}

start()
