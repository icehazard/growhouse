<script>
    import PPMcontroller from "comp//Home/PPMcontroller.svelte";
    import Sensors from "comp/Home/Sensors.svelte";
    import { Notifications, acts } from "@tadashi/svelte-notification";
    import ws from "@/store/ws";
    import { mq } from "@/assets/library/MediaQuery.svelte";

    let el;

    $: $ws.log, () => (el.scrollTop = el.scrollHeight);
</script>

<main class="col container my-50 gap-40 grow">
    <Sensors state={$ws.ws} avgDistance={$ws.avgDistance} />
    <PPMcontroller />
    <Notifications />
    <div class="col gap-50" class:row={$mq.xl_} >
        <div class="grow pa-20 shade1 curve center">
            <iframe
                class="w100"
                title="iframe"
                src="http://168.119.247.99:3000/d/OKDhg5iVz/water-reservoir?orgId=1&panelId=2"
                height="450"
                frameborder="0"
            />
        </div>
        <div class="h-500 shade1 overlay col pa-20 gap-10 curve border grow" bind:this={el}>
            {#each $ws.log as item}
                {item}<br>
            {/each}
        </div>
    </div>
</main>


<style>
    .h-500{
        min-height: 500px;
    }
</style>
