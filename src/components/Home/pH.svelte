<script>
    import Icon from "@iconify/svelte";
    import Gauge from "comp/atoms/Gauge.svelte";
    import Toggle from "svelte-toggle";
    import ws from "@/store/ws";
</script>

<div class="grow align-center col gap-50 h-500">
    <div class="col gap-50 align-center h-250">
        <span class="weight-300 font-26  opacity-75">pH</span>
        <Gauge value={$ws.ws.ph} max='12'/>
        <div class="weight-300 font-12 opacity-75">pH scale</div>
    </div>
    <div class="col w100 gap-10">
        <div class="row w100 px-20 gap-20">
            <button class="center pa-10 shade3 round shine">
                <Icon height="20" icon="clarity:cog-line" />
            </button>
            <div class="grow col gap-5">
                <span class="font-14">Smart Dosing</span>
                <span class="font-12 opacity-75"> Monitor and correct pH level </span>
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
        <button class="row w100 px-20 gap-20 align-center">
            <button class="center pa-10 round shine">
                <Icon icon="lucide:pipette" />
            </button>
            <div class="grow col gap-5">
                <span class="font-14">Manual Dosing</span>
                <span class="font-12 opacity-75">Dose pH manually</span>
            </div>
            <div class="center">
                <Icon icon="carbon:chevron-right" />
            </div>
        </button>
    </div>
</div>