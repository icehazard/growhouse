<script>
    let state = {}
    let ws = null;

    function startWs() {
        ws = new WebSocket('ws://168.119.247.99:8000?token=Y2xpZW50OmxtYW8=');

        ws.addEventListener('open', function (event) {
            console.log("It's open");
        });

        ws.addEventListener('close', function (event) {
            console.log("Encountered close, trying to reconnect");
            //ws.removeAllListeners()
            setTimeout(startWs, 5e3)
        });

        ws.addEventListener('error', function (event) {
            console.log("Encountered error, trying to reconnect");
            //ws.removeAllListeners()
            setTimeout(startWs, 5e3)
        });

// Listen for messagess
        ws.addEventListener('message', function (event) {
            //console.log('Got', event.data)
            //let d = JSON.parse(event.data)
            try {
                let json = JSON.parse(event.data);
                //console.log(x.humi)
                state = json;
                ws.send(JSON.stringify({ping: "back"}), {binary: false})
            }
            catch (e) { console.log("Couldnt parse WS message")}

        });
    }
    startWs()

    function setPPM(val) {
        console.log("Setting ppm to", val)
        ws.send(JSON.stringify({command: "setPPM", value: 700}))
    }
</script>

<main class="row container my-50 gap-40 grow">
    GROW HOUSE

    {#if state.humi}
        <div>Humidity: {state.humi.toFixed(2)}</div>
        <div>Temperature (C): {state.tempC.toFixed(2)}</div>
        <div>Current PPM {state.currentPPM.toFixed(2)}</div>
        <div on:click={setPPM}>Set PPM</div>
    {/if}
</main>
