<script>
    import Icon from "@iconify/svelte";
    import { Pulse } from "svelte-loading-spinners";
    import ws from '@/store/ws'
    export let state = {};
</script>

<div class="col gap-20 ">
    <h4 class="weight-300">Sensor Data</h4>
    <div class="row border pa-20 gap-50 curve w100 h-130">
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
            <span class="opacity-75 font-14">Temperature</span>
        </div>
        <div class="col align-center gap-10 grow space-between">
            <Icon icon="eos-icons:science-outlined" height="24" class="primary--text" />
            {#if state.currentPPM}
                <span>{state.currentPPM?.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20" />
            {/if}
            <span class="opacity-75 font-14">PPM</span>
        </div>

        <div class="col align-center gap-10 grow space-between">
        <Icon icon="eos-icons:science-outlined" height="24" class="primary--text" />
        {#if state.distance}
            <span>{state.distance?.toFixed(2)}</span>
        {:else}
            <Pulse color="var(--primary)" size="20" />
        {/if}
        <span class="opacity-75 font-14">Distance</span>
    </div>
    </div>
</div>
