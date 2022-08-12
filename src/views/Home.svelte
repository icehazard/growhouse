<script>
    import PPMcontroller from "comp//Home/PPMcontroller.svelte";
    import Sensors from "comp/Home/Sensors.svelte";

    let state = {};
    let ws = null;
    let avgDistance = [];
    let ppm = 700;

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
                if (!json.log) {
                    state = json;
                    if (json.distance)
                        avgDistance.push(json.distance);

                    if (state.currentPPM < 0)
                        state.currentPPM = "N/A";
                    if (state.probePPM < 0)
                        state.probePPM = "N/A";
                }
                else {
                    console.log(json.log)
                }

                //ws.send(JSON.stringify({ ping: "back" }), { binary: false });
            } catch (e) {
                console.log("Couldnt parse WS message");
            }
        });
    }

    setInterval(_ => {
        const COUNT = 5;
        let idx = avgDistance.length-COUNT;

        if (idx < 0)
            idx = 0;

        avgDistance = avgDistance.splice(idx, COUNT);
        console.log(avgDistance)
    }, 10e3) //dont let array grow too big

    startWs();

    function setPPM(val) {
        console.log("Setting ppm to", val);
        ws.send(JSON.stringify({ command: "setPPM", value: ppm }));
    }
</script>

<main class="col container my-50 gap-40 grow">
    <Sensors {state} {avgDistance} />
    <!-- <div class="row align-center gap-20">
        <button class="border curve pa-10" on:click={setPPM}>SET</button>
        <input bind:value={ppm} type="text" class="border pa-10 w-70 text-center curve row" />
        <span>Set PPM</span>
    </div>
    {ppm} -->
    <PPMcontroller />

    <iframe src="http://168.119.247.99:3000/d/OKDhg5iVz/water-reservoir?orgId=1&panelId=2" width="650" height="450" frameborder="0"></iframe>

</main>


