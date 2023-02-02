<script>
    import ws from "@/store/ws.js";
    import Icon from "@iconify/svelte";
    import Toggle from "svelte-toggle";
    import dayjs from "dayjs"
    import {openModal} from "svelte-modals";

    import RunPumpById from "comp/modals/RunPumpById.svelte";

    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    let adjustPPMOn, adjustPHOn, adjustWaterOn, feedScheduleOn = false;
    let col = "var(--primary)";
    let hoursArray = []
    let nextFeeds = []
    let nextFeed = "";
    let _feederState = [];
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

            if (!nextFeed || !nextFeed.length) {
                //let first = nextFeeds[0]
                let next = dayjs().startOf('day').add(1, 'day').add($ws.ws.state.START_HOUR, 'hour')
                nextFeed = next.fromNow()
            }
        }
    }

    $:  if ($ws.ws.state) {
        let arr = [];
        for (let i of Object.keys($ws.ws.state))
            arr.push(i)
        _feederState = arr;
        //console.log(_feederState)
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

    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }

    function isInteger(x) {
        return typeof x === "number" && isFinite(x) && Math.floor(x) === x;
    }

    function isFloat(x) {
        return !!(x % 1);
    }

    function saveFeederState() {
        let payload = {skipByHour: []}
        for (let f of _feederState) {
            if (f == "skipByHour")
                continue;

            let e = document.getElementById(f);
            payload[f] = isInteger(e.value) ? parseInt(e.value) : (isFloat(e.value) ? parseFloat(e.value) : e.value);
            console.log(`${f}:${e.value}`)
        }

        ws.updateConfig("feeder", payload);
    }

    function saveConfig(field) {
        let payload = {skipByHour: []}
        for (let f of _feederState) {
            if (typeof _feederState[f] === 'object' || Array.isArray(_feederState[f]))
                continue;

            let e = document.getElementById(f);
            payload[f] = isInteger(e.value) ? parseInt(e.value) : (isFloat(e.value) ? parseFloat(e.value) : e.value);
            console.log(`${f}:${e.value}`)
        }
        ws.updateConfig("config", payload);
    }

    function patchState(event) {
        let field = event.currentTarget.getAttribute('id')
        console.log("Patching feederstate field", )
        let e = document.getElementById(field);
        let res = isNumeric(e.value) ? parseInt(e.value) : (isFloat(e.value) ? parseFloat(e.value) : e.value);

        let payload = {}
        payload[field] = res;
        ws.patchConfig("feeder", payload);
    }

    function patchConfig(event) {
        let field = event.currentTarget.getAttribute('id')
        console.log("Patching config", field)
        let e = document.getElementById(field);
        let res = isNumeric(e.value) ? parseInt(e.value) : (isFloat(e.value) ? parseFloat(e.value) : e.value);

        let payload = {}
        payload[field] = res;
        ws.patchConfig("config", payload);
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
                class:borderPrimary={$ws.ws['TAPO_STATUS'] ? $ws.ws['TAPO_STATUS']['RO'] : false}>
            <Icon color={col} icon="mdi:water-plus-outline" width="30"/>
        </button>
        <span class="font-14 opacity-75">Add water</span>
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
        <span class="font-14 opacity-75">Fix Tank PH/EC</span>
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
        <div class="col align-start center gap-10 font-10">
            {#if $ws.ws.state}
                {#each Object.entries($ws.ws.state) as [name, val]}
                    <div class="row"> {name}:<input type="text" id={name} value={val}
                                                    on:change={patchState}/></div>
                {/each}
            {/if}
        </div>
        <div class="col align-start center gap-10 font-10">
            {#if $ws.ws.config}
                {#each Object.entries($ws.ws.config) as [fname, val]}
                    {#if typeof val !== 'object'}
                        <div class="row"> {fname}:<input type="text" id={fname} value={val}
                                                         on:change={() => patchConfig(fname)}/></div>
                    {/if}
                {/each}
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
