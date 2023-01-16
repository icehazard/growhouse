<script>
    import ws from "@/store/ws.js";
    import Icon from "@iconify/svelte";
    import Toggle from "svelte-toggle";
    import dayjs from "dayjs"
    import { openModal } from "svelte-modals";

    import RunPumpById from "comp/modals/RunPumpById.svelte";

    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    let adjustPPMOn, adjustPHOn, adjustWaterOn, feedScheduleOn = false;
    let col = "var(--primary)";
    let hoursArray = []
    let nextFeeds = []
    let nextFeed = "";
    $: {
        if ($ws.ws.hasOwnProperty("state")) {

            feedScheduleOn = $ws.ws.state ? $ws.ws.state.FEED_STATE : false
            adjustPPMOn = $ws.ws.state ? $ws.ws.state.ADJUST_PPM : false
            adjustPHOn = $ws.ws.state ? $ws.ws.state.ADJUST_PH : false
            adjustWaterOn = $ws.ws.state ? $ws.ws.state.ADJUST_WATER : false

            hoursArray = []

            let start = dayjs().startOf('day')
            for (let i = $ws.ws.state.START_HOUR; i < $ws.ws.state.END_HOUR; i += $ws.ws.state.FEED_EVERY_X_HOURS) {
                hoursArray.push(i)

                let next = start.add(i + 3, 'hour')
                nextFeeds.push(next.fromNow())
                //console.log(next.fromNow())
            }

            nextFeed = nextFeeds.filter(i => i.indexOf("ago") === -1)[0]
        }
    }

    function runCommand(cmd) {
        ws.cmd(cmd);
    }

    function runCommandMiddleman(cmd) {
        ws.cmdMiddleman(cmd);
    }

    function flipSchedule() {
        //feedScheduleOn = !feedScheduleOn;
    }

    // $: {
    //     feedScheduleOn, al()
    // }
    function adjustSchedule() {
        ws.cmdMiddleman(feedScheduleOn ? "feedScheduleOff" : "feedScheduleOn");
    }

    function adjustPH() {
        ws.cmdMiddleman(adjustPHOn ? "adjustPHOff" : "adjustPHOn");
    }

    function adjustPPM() {
        ws.cmdMiddleman(adjustPPMOn ? "adjustPPMOff" : "adjustPPMOn");
    }
    function adjustWater() {
        ws.cmdMiddleman(adjustWaterOn ? "adjustWaterOff" : "adjustWaterOn");
    }
</script>

<div class="row gap-20 shade1 border curve wrap pa-20 grow center">
    <div class="col center gap-10">
        <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                value="RESTART"
                on:click={() => runCommand("restart")}
        >
            <Icon color={col} icon="ic:twotone-restart-alt" height="30"/>
        </button>
        <span class="font-14 opacity-75">Restart</span>
    </div>
    <div class="col center gap-10">
        <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                value="1MIN FEED"
                on:click={() => runCommandMiddleman("minfeed")}
        >
            <Icon color={col} icon="akar-icons:bell" width="25"/>
        </button>
        <span class="font-14 opacity-75">1MIN FEED</span>
    </div>
    <div class="col center gap-10">
        <button class="h-100 shade3 w-100 center curve shadow fast shine" on:click={() => runCommand("on") }
                class:borderPrimary={$ws.ws.RO_ON}>
            <Icon color={col} icon="mdi:water-plus-outline" width="30"/>
        </button>
        <span class="font-14 opacity-75">Refill Tank</span>
    </div>
    <div class="col center gap-10">
        <button class="h-100 shade3 w-100 center curve shadow fast shine" on:click={() => runCommand("feedon")}>
            <Icon color={col} icon="ant-design:info-circle-outlined" width="30"/>
        </button>
        <span class="font-14 opacity-75">FEEDON</span>
    </div>
    <div class="col center gap-10">
        <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => runCommand("fetchConfig")}
        >
            <Icon color={col} icon="ion:cog-sharp" width="30"/>
        </button>
        <span class="font-14 opacity-75">FETCH CONF</span>
    </div>
    <div class="col center gap-10">
        <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => runCommand("romoff")}
        >
            <Icon color={col} icon="healthicons:running-water-outline" width="30"/>
        </button>
        <span class="font-14 opacity-75">ROMOFF</span>
    </div>
    <div class="col center gap-10">
        <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => runCommandMiddleman("refill")}
        >
            <Icon color={col} icon="fluent:food-20-regular" width="30"/>
        </button>
        <span class="font-14 opacity-75">REFILL</span>
    </div>
    <div class="col center gap-10">
        <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => runCommandMiddleman("bottle")}
        >
            <Icon color={col} icon="fluent:food-20-regular" width="30"/>
        </button>
        <span class="font-14 opacity-75">REF BOTTLE</span>
    </div>

    <div class="col center gap-10">
        <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() =>     openModal(RunPumpById)}
        >
            <Icon color={col} icon="fluent:food-20-regular" width="30"/>
        </button>
        <span class="font-14 opacity-75">RUN SPEC PUMP</span>
    </div>

    <div class="row gap-20 shade1 border curve wrap pa-20 grow center">
        <div class="col center gap-10">
            {#if $ws.ws && $ws.ws.state && $ws.ws.state.hasOwnProperty("ADJUST_PPM")}
                <Toggle
                        label="Auto-adjust PPM"
                        switchColor="#eee"
                        toggledColor="#24a148"
                        untoggledColor="#fa4d56"
                        on="On"
                        off="Off"
                        bind:toggled={adjustPPMOn}
                        on:click={adjustPPM}
                />
            {/if}
        </div>
        <div class="col center gap-10">
            {#if $ws.ws && $ws.ws.state && $ws.ws.state.hasOwnProperty("ADJUST_PH")}
                <Toggle
                        label="Auto-adjust PH"
                        switchColor="#eee"
                        toggledColor="#24a148"
                        untoggledColor="#fa4d56"
                        on="On"
                        off="Off"
                        bind:toggled={adjustPHOn}
                        on:click={adjustPH}
                />
            {/if}
        </div>
        <div class="col center gap-10">
            {#if $ws.ws && $ws.ws.state && $ws.ws.state.hasOwnProperty("ADJUST_WATER")}
                <Toggle
                        label="Auto-adjust Water"
                        switchColor="#eee"
                        toggledColor="#24a148"
                        untoggledColor="#fa4d56"
                        on="On"
                        off="Off"
                        bind:toggled={adjustWaterOn}
                        on:click={adjustWater}
                />
            {/if}
        </div>
        <div class="col center gap-10">
            {#if $ws.ws && $ws.ws.state && $ws.ws.state.hasOwnProperty("FEED_STATE")}
                <Toggle
                        label="Feeding schedule"
                        switchColor="#eee"
                        toggledColor="#24a148"
                        untoggledColor="#fa4d56"
                        on="On"
                        off="Off"
                        bind:toggled={feedScheduleOn}
                        on:click={adjustSchedule}
                />
                Feeding hours are: {hoursArray} <br/>
                Feed duration is set to {$ws.ws.state.RUN_DURATION / 1000} secs <br/>
                Next feed ~{nextFeed}
            {/if}
        </div>
    </div>
</div>

<style>


    button:focus-visible {
        filter: brightness(1.2);
    }

    button:active {
        box-shadow: none;
        filter: brightness(0.98);

    }


</style>
