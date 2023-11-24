import { persist } from '@/assets/library/CommonFunctions.js'
import { acts } from "@tadashi/svelte-notification";
import dayjs from 'dayjs'
import ReconnectingWebSocket from 'reconnecting-websocket';

export let ws;

const data = {
    ws: {},
    log: [],
    "log-info": [],
    "log-debug": [],
    "log-error": [],
    "log-trace": [],
}

const LOG_LIMIT = 500;

const context = persist('ws', data)

context.setPPMByPPM = function (ppm, TOTAL_MASK) {
    ws.send(JSON.stringify({ command: "setPPMByPPM", value: ppm, mask: TOTAL_MASK }));
}
context.runPumpByMask = function (mask, duration) {
    ws.send(JSON.stringify({ command: "runpumpbymask", mask, duration }));
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
    ws.send(JSON.stringify({ command: "feed", middleman: 1, duration: duration }));
    console.log("SENDING FEED")
}
context.cmdMiddleman = function (cmd, val) {
    ws.send(JSON.stringify({ middleman: 1, command: cmd, val }));
    console.log("SENDING CMD", cmd, val)
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
    context.commit('log-info', [])
    context.commit('log-error', [])
    context.commit('log-debug', [])
    context.commit('log-trace', [])

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
    catch (e) {
        console.log("Couldnt parse WS message", e, json);
    }
    return json;
}
function start() {
    ws = new ReconnectingWebSocket("ws://49.13.112.112:8000?token=Y2xpZW50OmxtYW8=");

    ws.addEventListener("open", function (event) {
        console.log("WS connected");
        context.cmdMiddleman("latestLogs");
    });

    ws.addEventListener("close", function (event) {
        console.log("Encountered close, trying to reconnect", event);
    });

    ws.addEventListener("error", function (event) {
        console.log("Encountered error, trying to reconnect", event);
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
                catch (e) {
                    console.log("Couldnt parse WS message", e, json);
                }
            }

            if (json.log)
                console.log("Received log", json)

            if (!context.val('log-info')) context.commit('log-info', [])
            if (!context.val('log-debug')) context.commit('log-debug', [])
            if (!context.val('log-error')) context.commit('log-error', [])
            if (!context.val('log-trace')) context.commit('log-trace', [])

            if (json.latestLogs) {
                context.commit('log-info', [])
                context.commit('log-error', [])
                context.commit('log-debug', [])
                context.commit('log-trace', [])
                for (let d of Object.keys(json.latestLogs)) {
                    let o = json.latestLogs[d]
                    if (o.data) {
                        let parsed = parseBuffer(o.data);
                        if (!l.level)
                            l.level = "info";

                        if (context.val('log-' + l.level).length > LOG_LIMIT) context.val('log-' + l.level).shift()

                        let keyName = 'log-' + l.level;
                        context.commit(keyName, [...context.val(keyName), {
                            time: new Date(l.d),
                            data: { log: l.log, level: l.level }
                        }])

                    }
                    else { //else if not buffer
                        for (let i of o) {
                            if (!i.level)
                                i.level = "info";

                            if (context.val('log-' + i.level).length > LOG_LIMIT) context.val('log-' + i.level).shift()

                            let keyName = 'log-' + i.level;

                            context.commit(keyName, [...context.val(keyName), {
                                time: new Date(i.d),
                                data: { log: i.log, level: i.level }
                            }])
                        }
                    }

                }

                let scrollConsole = context.val('scrollConsole');
                if (!scrollConsole) context.commit('scrollConsole', true)

            }

            if (isBinary)
                console.log("Binary data logged!")

            if (json.notif) {
                context.sendNotif(json.notif)()
                // if (log.length)
                //     log = [...log, json.notif.message]
                // else
                //     log = [json.notif.message]
                let keyName = 'log-info';
                context.commit(keyName, [...context.val('log-info'), { time: new Date(), data: { log: json.notif.message, level: "info" } }])
            }

            if (json.log) {
                //log = [...log, json.log]
                if (!json.level)
                    json.level = "info";

                let keyName = `log-${json.level}`

                if (context.val(keyName).length > LOG_LIMIT) context.val(keyName).shift()

                context.commit(keyName, [...context.val(keyName), { time: new Date(), data: { log: json.log, level: json.level } }])
                console.log("Context size", context.val(keyName).length)
            }
            else {
                context.commit('ws', json)

                let dist = Number(json.distance)
                if (json.currentPPM < 0) json.currentPPM = "N/A";
                if (json.probePPM < 0) json.probePPM = "N/A";
                if (json.state) {
                    context.commit("state", json.state)
                }
            }
        } catch (e) {
            console.log("Couldnt parse WS message", e, event.data);
        }
    });
}

start()
