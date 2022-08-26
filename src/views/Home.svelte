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
    <Sensors state={$ws.ws} avgDistance={$ws.avgDistance} />
    <div class="col gap-50" class:row={$mq.xl_}>
        <PPMcontroller />
        <ActionBtns />
    </div>
    <Notifications />
    <div class="col gap-50" class:row={$mq.xl_}>
        <Graph />
        <Terminal />
    </div>
</main>
