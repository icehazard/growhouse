<script>
    import Icon from "@iconify/svelte";
    import { Pulse } from "svelte-loading-spinners";
    import ws from '@/store/ws'
    import _ from "lodash"

    export let state = {};
    export let avgDistance = [];
</script>

<div class="col gap-20 ">
    <h4 class="weight-300">Sensor Data</h4>
    <div class="row border pa-20 gap-50 curve w100 wrap">
        <div class="col align-center gap-10 grow space-between">
            <Icon icon="carbon:humidity" height="24" class="primary--text" />
            {#if state.humi}
                <span>{state.humi?.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20" />
            {/if}
            <span class="opacity-75 font-14">Humidity</span>
        </div>
        <div class="col align-center gap-10 grow space-between">
            <Icon icon="carbon:temperature-celsius" height="24" class="primary--text" />
            {#if state.tempC}
                <span>{state.tempC?.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20" />
            {/if}
            <span class="opacity-75 font-14">Room Temp</span>
        </div>
        <div class="col align-center gap-10 grow space-between">
            <Icon icon="carbon:temperature-celsius" height="24" class="primary--text" />
            {#if state.hasOwnProperty("waterTemp")}
                <span>{state.waterTemp?.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20" />
            {/if}
            <span class="opacity-75 font-14">Water Temp</span>
        </div>
        <div class="col align-center gap-10 grow space-between">
            <Icon icon="eos-icons:science-outlined" height="24" class="primary--text" />
            {#if state.currentPPM && state.currentPPM !== "N/A"}
                <span>{state.currentPPM?.toFixed(2)}</span>
            {:else if state.currentPPM && state.currentPPM === "N/A"}
                <span>0</span>
            {:else}
                <Pulse color="var(--primary)" size="20" />
            {/if}
            <span class="opacity-75 font-14">PPM</span>
        </div>

        <div class="col align-center gap-10 grow space-between">
            <Icon icon="eos-icons:science-outlined" height="24" class="primary--text" />
            {#if state.hasOwnProperty("probePPM")}
                <span>{state.probePPM?.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20" />
            {/if}
            <span class="opacity-75 font-14">Unmod PPM</span>
        </div>

        <div class="col align-center gap-10 grow space-between">
        <Icon icon="fa6-solid:glass-water-droplet" height="24" class="primary--text" />
        {#if avgDistance.length}
            <span>{(((66-_.mean(avgDistance)) / 66) * 100).toFixed(1)}%</span>
        {:else}
            <Pulse color="var(--primary)" size="20" />
        {/if}
        <span class="opacity-75 font-14">Water Tank</span>
        </div>

        <div class="col align-center gap-10 grow space-between">
            <Icon icon="carbon:humidity" height="24" class="primary--text" />
            {#if state.hasOwnProperty("waterSensorVal")}
                <span>{state.waterSensorVal?.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20" />
            {/if}
            <span class="opacity-75 font-14">Water Sens Val</span>
        </div>
    </div>
</div>
