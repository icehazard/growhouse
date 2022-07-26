<script>
    import Icon from "@iconify/svelte";
    import { Pulse } from "svelte-loading-spinners";
    let state = {};
    let ws = null;

    function startWs() {
        ws = new WebSocket("ws://168.119.247.99:8000?token=Y2xpZW50OmxtYW8=");

        ws.addEventListener("open", function (event) {
            console.log("It's open");
        });

        ws.addEventListener("close", function (event) {
            console.log("Encountered close, trying to reconnect");
            //ws.removeAllListeners()
            setTimeout(startWs, 5e3);
        });

        ws.addEventListener("error", function (event) {
            console.log("Encountered error, trying to reconnect");
            //ws.removeAllListeners()
            setTimeout(startWs, 5e3);
        });

        // Listen for messagess
        ws.addEventListener("message", function (event) {
            //console.log('Got', event.data)
            //let d = JSON.parse(event.data)
            try {
                let json = JSON.parse(event.data);
                //console.log(x.humi)
                state = json;
                ws.send(JSON.stringify({ ping: "back" }), { binary: false });
            } catch (e) {
                console.log("Couldnt parse WS message");
            }
        });
    }
    startWs();

    function setPPM(val) {
        console.log("Setting ppm to", val);
        ws.send(JSON.stringify({ command: "setPPM", value: 700 }));
    }
</script>

<main class="col container my-50 gap-40 grow">
    <div class="row ">
        <div class="row border pa-20 gap-50 curve w100 h-130">
            <div class="col align-center gap-10 grow space-between">
                <Icon icon="carbon:humidity" height="24" class="primary--text" />
                {#if state.humi}
                    <span>{state.humi?.toFixed(2)}</span>
                {:else}
                    <Pulse color="var(--primary)" size="20" />
                {/if}
                <span class="opacity-75 font-14">Humidity</span>
            </div>
            <div class="col align-center gap-10 grow space-between">
                <Icon icon="carbon:temperature-celsius" height="24" class="primary--text" />
                {#if state.tempC}
                    <span>{state.tempC?.toFixed(2)}</span>
                {:else}
                    <Pulse color="var(--primary)" size="20" />
                {/if}
                <span class="opacity-75 font-14">Temperature</span>
            </div>
            <div class="col align-center gap-10 grow space-between">
                <Icon icon="eos-icons:science-outlined" height="24" class="primary--text" />
                {#if state.currentPPM}
                    <span>{state.currentPPM?.toFixed(2)}</span>
                {:else}
                    <Pulse color="var(--primary)" size="20" />
                {/if}
                <span class="opacity-75 font-14">PPM</span>
            </div>
        </div>
    </div>
    <div class="row align-center gap-20">
        <button class='border curve pa-10' on:click={setPPM}>SET</button>
        <span>Set PPM</span>
    </div>
</main>
