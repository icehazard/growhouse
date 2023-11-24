<script>
    import Dial from "../atoms/Dial.svelte";
    import Icon from "@iconify/svelte";
    import { openModal } from "svelte-modals";
    import ConfirmPhChange from "comp/modals/ConfirmPhChange.svelte";
    import ConfirmPpmChange from "comp/modals/ConfirmPpmChange.svelte";
    import Toggle from "svelte-toggle";
    import ws from "@/store/ws";

    let ph = $ws.ws.ph * 100;
    let ppm = $ws.ws.currentPPM;

    function ppmEmit(val) {
        ppm = val.detail;
        openModal(ConfirmPpmChange, { ppm });
    }
    function phEmit(val) {
        ph = val.detail;
        openModal(ConfirmPhChange, { ph });
    }
</script>

<div class="col shade1 border curve  pa-20 grow gap-30">
    <div class="row opacity-75 ">Water Controller</div>
    <div class="row grow space-between">
        <div class="grow center col gap-2.5">
            <span class="weight-300 font-24">74%</span>
            <span class="weight-300 opacity-75">Water Level</span>
            <Icon height="30" icon="fluent:live-20-regular" />
        </div>
        <hr />
        <div class="grow center col gap-2.5 ">
            <section><span class="loader" /></section>
            <span>Res tank</span>
        </div>
    </div>
    <div class="row gap-10 space-between">
        <div class="row center gap-5 weight-300 font-14 grow">
            <div class="col center gap-2.5">
                <button class="h-80 shade3 w-80 center curve shadow fast shine">
                    <Icon icon="mdi:cup-water" width="30" />
                </button>
                <span class="font-14 opacity-75">Fill Tank</span>
            </div>
            <div class="col center gap-2.5">
                <button class="h-80 shade3 w-80 center curve shadow fast shine">
                    <Icon icon="game-icons:watering-can" width="30" />
                </button>
                <span class="font-14 opacity-75">Irrigate</span>
            </div>
            <div class="col center gap-2.5">
                <button class="h-80 shade3 w-80 center curve shadow fast shine">
                    <Icon icon="mdi:pump" width="30" />
                </button>
                <span class="font-14 opacity-75">Extractor</span>
            </div>
        </div>
        <div class="col grow gap-5">
            <div class="row space-between ">
                <div class="opacity-75">Maintain water level</div>
                <div class="row center gap-5">
                    <Toggle
                        hideLabel
                        switchColor="#eee"
                        toggledColor="#37C19B"
                        untoggledColor="#fa4d56"
                    />
                    <Icon height="20" icon="clarity:cog-line" />
                </div>
            </div>
            <div class="row space-between ">
                <button class="row align-center gap-2.5">
                    <div class="opacity-75">Watering Schedule</div>
                </button>
                <div class="row center gap-5">
                    <Toggle
                        hideLabel
                        switchColor="#eee"
                        toggledColor="#37C19B"
                        untoggledColor="#fa4d56"
                    />
                    <Icon height="20" icon="clarity:cog-line" />
                </div>
            </div>
            <div class="row space-between ">
                <div class="opacity-75">Maximum Height</div>
                <div class="row center gap-5">
                    <Toggle
                        hideLabel
                        switchColor="#eee"
                        toggledColor="#37C19B"
                        untoggledColor="#fa4d56"
                    />
                    <Icon height="20" icon="clarity:cog-line" />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .loader {
        width: 50px;
        height: 100px;
        display: inline-block;
        position: relative;
        border: 2px solid #37c19b;
        animation: fill 2s linear infinite alternate;
        color: #37c19b;
    }
</style>
