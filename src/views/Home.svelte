<script>
    import PPMcontroller from "comp//Home/PPMcontroller.svelte";
    import Sensors from "comp/Home/Sensors.svelte";
    import Terminal from "@/components/Home/Terminal.svelte";
    import Graph from "@/components/Home/Graph.svelte";
    import ActionBtns from "@/components/Home/ActionBtns.svelte";
    import { Notifications } from "@tadashi/svelte-notification";
    import ws from "@/store/ws";
    import { mq } from "@/assets/library/MediaQuery.svelte";
</script>

<main class="col container my-50 gap-40 grow">
    <div class="absolute italic p-top pa-10 font-12">Firmware version {$ws.ws.v}</div>
    <Sensors state={$ws.ws} tankPerc={$ws.ws.tankPerc} />
    <div class="col gap-50 h-650" class:row={$mq.xl_}>
        <Terminal />
        <ActionBtns />
    </div>
    <div class="col gap-50" class:row={$mq.xl_}>
        <PPMcontroller />
        <Graph />
    </div>
    <Notifications />

</main>
