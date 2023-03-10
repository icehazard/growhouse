import { persist } from '@/assets/library/CommonFunctions.js'
import { acts } from "@tadashi/svelte-notification";
import dayjs from 'dayjs'
import ReconnectingWebSocket from 'reconnecting-websocket';

export let ws;

const data = {
    ws: {},
    log: []
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
    ws.send(JSON.stringify({ command: "setPH", value: fmt, calib: true }));
}
context.runTest = function () {
    ws.send(JSON.stringify({ command: "test" }));
    console.log("SENDING TEST")
}
context.cmd = function (cmd) {
    ws.send(JSON.stringify({ command: cmd }));
    console.log("SENDING CMD", cmd)
}
context.tapo = function (tapo, state, duration) {
    ws.send(JSON.stringify({ command: "tapo", tapo, state, duration }));
    console.log("SENDING CMD", { command: "tapo", tapo, state, duration })
}
context.feed = function (duration) {
    ws.send(JSON.stringify({ command: "tapo", tapo: "FEED", state: 1, duration: duration }));
    ws.send(JSON.stringify({ command: "tapo", tapo: "OUT", state: 1, duration: duration*2 }));
    ws.send(JSON.stringify({ command: "tapo", tapo: "BUFFER", state: 1, duration: duration*2 }));

    console.log("SENDING FEED")
}
context.cmdMiddleman = function (cmd) {
    ws.send(JSON.stringify({ middleman: 1, command: cmd }));
    console.log("SENDING CMD", cmd)
}
context.diluteTo = function (val) {
    ws.send(JSON.stringify({ middleman: 1, command: "diluteTo", val }));
    console.log("Diluting to", val)
}
context.updateConfig = function (type, data) {
    ws.send(JSON.stringify({ middleman: 1, command: "updateConfig", type, data }));
    console.log("SENDING CMD updateConfig")
}
context.patchConfig = function (type, data) {
    ws.send(JSON.stringify({ middleman: 1, command: "patchConfig", type, data }));
    console.log("SENDING CMD patchConfig")
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

function parseBuffer(data) {
    let arr = []
    let json;
    for (let i of data)
        arr.push(String.fromCharCode(i))

    try {
        json = JSON.parse(arr.join(""))
    }
    catch(e) {
        console.log("Couldnt parse WS message", e, json);
    }
    return json;
}
function start() {
    ws = new ReconnectingWebSocket("ws://168.119.247.99:8000?token=Y2xpZW50OmxtYW8=");

    ws.addEventListener("open", function (event) {
        console.log("WS connected");
        context.cmdMiddleman("latestLogs");
    });

    ws.addEventListener("close", function (event) {
        console.log("Encountered close, trying to reconnect");
    });

    ws.addEventListener("error", function (event) {
        console.log("Encountered error, trying to reconnect");
    });

    ws.addEventListener("message", function (event, isBinary) {
        try {
            let json = JSON.parse(event.data);

            if (json.type == "Buffer") {
                let arr = []
                for (let i of json.data)
                    arr.push(String.fromCharCode(i))

                try {
                    json = JSON.parse(arr.join(""))
                }
                catch(e) {
                    console.log("Couldnt parse WS message", e, json);
                }
            }


            let log = context.val('log');
            if (!log) context.commit('log', [])

            if (json.latestLogs) {
                context.commit('log', [])

                for (let o of json.latestLogs) {
                    if (o.data) {
                        let l = parseBuffer(o.data);
                        if (!l.level)
                            l.level = "info";

                        if (log.length > 200) log.shift()

                        context.commit('log', [...context.val('log'), {
                            time: dayjs().format(),
                            data: {log: l.log, level: l.level}
                        }])
                    }
                    else { //else if not buffer
                        if (log.length > 200) log.shift()

                        context.commit('log', [...context.val('log'), {
                            time: dayjs().format(),
                            data: {log: o.log, level: o.level}
                        }])
                    }
                }
            }

            if (isBinary)
                console.log("Binary data logged!")

            if (json.notif) {
                context.sendNotif(json.notif)()
                // if (log.length)
                //     log = [...log, json.notif.message]
                // else
                //     log = [json.notif.message]

                context.commit('log', [...context.val('log'), {time: dayjs().format(), data: {log: json.notif.message, level: "info"}}])
            }

            if (log.length > 200)  log.shift()

            if (!json.log) {
                context.commit('ws', json)

                let dist = Number(json.distance)
                if (json.currentPPM < 0) json.currentPPM = "N/A";
                if (json.probePPM < 0) json.probePPM = "N/A";
                if (json.state) {
                    context.commit("state", json.state)
                }
            }
            else {
              //log = [...log, json.log]
                if (!json.level)
                    json.level = "info";

              context.commit('log', [...context.val('log'), {time: dayjs().format(), data: {log: json.log, level: json.level}}])
            }
        } catch (e) {
            console.log("Couldnt parse WS message", e, event.data);
        }
    });
}

start()
