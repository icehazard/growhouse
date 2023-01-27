<script>
    import Icon from "@iconify/svelte";
    import { Pulse } from "svelte-loading-spinners";
    import "@lottiefiles/lottie-player";
    import _ from "lodash"
    import glass from '@/assets/lottie/glass.json'

    export let state = {};
    export let tankPerc = 0;
</script>
<div class="col gap-20 text-center">
    <div class="row border pa-20 gap-50 curve w100 wrap shade1">
        <div class="col align-center gap-10 grow space-between">
            <Icon icon="carbon:humidity" height="24" class="primary--text" />
            {#if state.hasOwnProperty("humi") && Number.isFinite(state.humi) && state.humi}
                <span>{state.humi.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20" />
            {/if}
            <span class="opacity-75 font-14">Humidity</span>
        </div>
        <div class="col align-center gap-10 grow space-between">
            <Icon icon="carbon:temperature-celsius" height="24" class="primary--text" />
            {#if state.hasOwnProperty("tempC") && state.tempC}
                <span>{state.tempC.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20" />
            {/if}
            <span class="opacity-75 font-14">Room Temp</span>
        </div>
        <div class="col align-center gap-10 grow space-between">
            <Icon icon="carbon:temperature-celsius" height="24" class="primary--text" />
            {#if state.hasOwnProperty("waterTempC")}
                <span>{state.waterTempC.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20" />
            {/if}
            <span class="opacity-75 font-14">Water Temp</span>
        </div>
        <div class="col align-center gap-10 grow space-between">
            {#if state["ppmstate"] == 1}
                <lottie-player loop autoplay mode="normal" src="https://assets4.lottiefiles.com/packages/lf20_9jXVOI.json" style="width: 80px" />
            {:else }
            <Icon icon="eos-icons:science-outlined" height="24" class="primary--text" />
            {/if}
            {#if state.hasOwnProperty("currentPPM")}
                <span>{state.currentPPM}</span>
            {:else}
                <Pulse color="var(--primary)" size="20" />
            {/if}
            <span class="opacity-75 font-14">PPM</span>
        </div>


        <div class="col align-center gap-10 grow space-between">

        {#if state["TAPO_STATUS"] && state["TAPO_STATUS"]["RO"]}
            <lottie-player loop autoplay mode="normal" src={JSON.stringify(glass)} style="width: 50px" />
        {:else }
            <Icon icon="fa6-solid:glass-water-droplet" height="24" class="primary--text" />
        {/if}

        {#if tankPerc}
            <span>{tankPerc}%</span>
        {:else}
            <Pulse color="var(--primary)" size="20" />
        {/if}
        <span class="opacity-75 font-14">Water Tank</span>
        </div>

        <div class="col align-center gap-10 grow space-between">
            <Icon icon="carbon:humidity" height="24" class="primary--text" />
            {#if state.hasOwnProperty("waterSensorVal")}
                <span>{state.waterSensorVal.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20" />
            {/if}
            <span class="opacity-75 font-14">Water Sens</span>
        </div>

        <div class="col align-center gap-10 grow space-between">
            <Icon icon="eos-icons:science-outlined" height="24" class="primary--text" />
            {#if state.hasOwnProperty("ph") && state.ph}
                <span>{state.ph.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20" />
            {/if}
            <span class="opacity-75 font-14">PH</span>
        </div>
    </div>
</div>
