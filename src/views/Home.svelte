<script>
    import PPMcontroller from "comp//Home/PPMcontroller.svelte";
    import Sensors from "comp/Home/Sensors.svelte";
    import ws from '@/store/ws.js'

</script>

<main class="col container my-50 gap-40 grow">
    <Sensors state={$ws} />
    <PPMcontroller />
</main>


