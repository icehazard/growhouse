<script>
    import PPMcontroller from "comp//Home/PPMcontroller.svelte";
    import Sensors from "comp/Home/Sensors.svelte";
    import Terminal from "@/components/Home/Terminal.svelte";
    import Graph from "@/components/Home/Graph.svelte";
    import ActionBtns from "@/components/Home/ActionBtns.svelte";
    import {Notifications} from "@tadashi/svelte-notification";
    import ws from "@/store/ws";
    import {mq} from "@/assets/library/MediaQuery.svelte";
    import prettyMilliseconds from 'pretty-ms';
    import ProgressBar from 'svelte-progress-bar'
    let progress
    $: {
        if ($ws.ws.sketchSize != $ws.ws.ogSketchSize) {
            let ratio = ($ws.ws.ogSketchSize - $ws.ws.sketchSize) / $ws.ws.ogSketchSize
            if (progress)
            progress.setWidthRatio(ratio);
        }
        else if (progress)
            progress.setWidthRatio(0);
    }
</script>
<ProgressBar bind:this={progress} color="var(--primary)" />

<main class="col container my-50 gap-40 grow">
    <div class="absolute italic p-top pt-10 font-12">Firmware version {$ws.ws.v}</div>
    <div class="absolute italic p-top pt-30 font-12" on:click={() => progress.setWidthRatio(0.4)}>
        Uptime: {$ws.ws.uptime ? prettyMilliseconds($ws.ws.uptime) : "N/A"}</div>
    {#if $ws.ws.sketchSize != $ws.ws.ogSketchSize}
        <div class="absolute italic p-top p-right pt-10 mr-100 pl-30 font-12">
            OTA Update: {((($ws.ws.ogSketchSize - $ws.ws.sketchSize ) / $ws.ws.ogSketchSize) * 100).toFixed(2)}% done
        </div>
    {/if}

    <Sensors state={$ws.ws} tankPerc={$ws.ws.tankPerc}/>
    <div class="col gap-50 " class:row={$mq.xl_}>
        <div class="grow h-500">
            <Terminal/>
        </div>
        <div class="grow">
            <ActionBtns/>
        </div>
    </div>
    <div class="col gap-50" class:row={$mq.xl_}>
        <PPMcontroller/>
        <Graph/>
    </div>
    <Notifications/>

</main>

<style>
    .h-500 {
        min-height: 400px;
    }
</style>
