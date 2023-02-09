<script>
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import Toggle from "svelte-toggle";
    import ws from "@/store/ws";

    let el;

    $: $ws.ws.tankPerc, changeHeight($ws.ws.tankPerc);

    function changeHeight(height) {
        if (el) el.style.boxShadow = `0 -${height}px inset`;
    }

    onMount(() => {
        changeHeight($ws.ws.tankPerc);
    });
</script>

<div class="grow align-center col gap-50 h-500">
    <div class="col gap-40 align-center h-250">
        <span class="weight-300 font-26  opacity-75">Water</span>
        <div class="loader center" bind:this={el}>
            <span class="shade2 pa-7 center curve shadow white--text weight-300 font-24">
                {$ws.ws.tankPerc || 0}
            </span>
        </div>
        <div class="weight-300 font-12 opacity-75">Percent</div>
    </div>
    <div class="col w100 gap-10">
        <div class="row w100 px-20 gap-20">
            <button class="center pa-10 shade3 round shine">
                <Icon height="20" icon="clarity:cog-line" />
            </button>
            <div class="grow col gap-5">
                <span class="font-14">Feeding schedule</span>
                <span class="font-12 opacity-75"> Auto Feeding schedule </span>
            </div>
            <div class="center">
                <Toggle
                    hideLabel
                    switchColor="#eee"
                    toggledColor="#37C19B"
                    untoggledColor="#fa4d56"
                />
            </div>
        </div>
        <hr class="mx-10" />
        <div class="row w100 px-20 gap-20">
            <button class="center pa-10 shade3 round shine">
                <Icon height="20" icon="clarity:cog-line" />
            </button>
            <div class="grow col gap-5">
                <span class="font-14">Auto-adjust level</span>
                <span class="font-12 opacity-75">Maintain res water level at a fixed point</span>
            </div>
            <div class="center">
                <Toggle
                    hideLabel
                    switchColor="#eee"
                    toggledColor="#37C19B"
                    untoggledColor="#fa4d56"
                />
            </div>
        </div>
        <hr />
        <button class="row w100 px-20 gap-20 align-center">
            <button class="center pa-10 round shine">
                <Icon icon="lucide:pipette" />
            </button>
            <div class="grow col gap-5">
                <span class="font-14">Manual </span>
                <span class="font-12 opacity-75">Manual options</span>
            </div>
            <div class="center">
                <Icon icon="carbon:chevron-right" />
            </div>
        </button>
    </div>
</div>

<style>
    .loader {
        width: 80px;
        height: 120px;
        display: flex;
        position: relative;
        border: 2px solid var(--shade3);
        animation: fill 2s linear infinite alternate;
        color: var(--primary);
    }
</style>
