<script>
    function startWs() {
        const ws = new WebSocket('ws://127.0.0.1:8000?token=Y2xpZW50OmxtYW8=');

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
            console.log(Buffer.from(JSON.parse(event.data)).toString())

        ws.send(JSON.stringify({ping: "back"}), {binary: false})

        });
    }
    startWs()
</script>

<main class="row container my-50 gap-40 grow">GROW HOSUE</main>
