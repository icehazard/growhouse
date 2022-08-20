<script>
    import PPMcontroller from "comp//Home/PPMcontroller.svelte";
    import Sensors from "comp/Home/Sensors.svelte";
    import { Notifications, acts } from "@tadashi/svelte-notification";
    import ws from '@/store/ws'
</script>

<main class="col container my-50 gap-40 grow">
    <Sensors state={$ws.ws} avgDistance={$ws.avgDistance} />
    <PPMcontroller />
    <Notifications />
    <div class="col gap-20">
    <iframe title='iframe' src="http://168.119.247.99:3000/d/OKDhg5iVz/water-reservoir?orgId=1&panelId=2" height="450" frameborder="0"></iframe>
    </div>
</main>


