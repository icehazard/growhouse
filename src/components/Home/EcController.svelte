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

<div class="col shade1 border curve wrap pa-20 grow gap-30">
    <div class="row opacity-75 ">EC Controller</div>
    <div class="row grow space-between">
        <div class="grow center col gap-2.5">
            <span class="weight-300 font-24">2323</span>
            <span class="weight-300 opacity-75">Actual</span>
            <Icon height="30" icon="fluent:live-20-regular" />
        </div>
        <hr />
        <div class="grow center col gap-2.5 ">
            <span class="weight-300 font-24">1212</span>
            <span class="weight-300 opacity-75"> Required</span>
            <Icon height="30" icon="ph:target" />
        </div>
    </div>
    <div class="row gap-10">
        <div class="col center gap-5 weight-300 font-14">
            <span>Grow A</span>
            <Dial text="PPM" active={$ws.ws.ppmstate} number={ppm} on:click={ppmEmit} />
            <span class="opacity-75">30 %</span>
        </div>
        <div class="col center gap-5 weight-300 font-14">
            <span>Grow B</span>
            <Dial text="PPM" active={$ws.ws.ppmstate} number={ppm} on:click={ppmEmit} />
            <span class="opacity-75">30 %</span>
        </div>
        <div class="col center gap-5 weight-300 font-14">
            <span>Cal-Mag</span>
            <Dial text="PPM" active={$ws.ws.ppmstate} number={ppm} on:click={ppmEmit} />
            <span class="opacity-75">20 %</span>
        </div>
        <div class="col center gap-5 weight-300 font-14">
            <span>Silicon</span>
            <Dial text="PPM" active={$ws.ws.ppmstate} number={ppm} on:click={ppmEmit} />
            <span class="opacity-75">20 %</span>
        </div>
    </div>
    <hr />
    <div class="row space-between">
        <div class="col center">
            <Toggle
                label="Fix PPM"
                switchColor="#eee"
                toggledColor="#37C19B"
                untoggledColor="#fa4d56"
                on="On"
                off="Off"
            />
        </div>
        <div class="col center">
            <Toggle
                label="Synchronize Lock"
                switchColor="#eee"
                toggledColor="#37C19B"
                untoggledColor="#fa4d56"
                on="On"
                off="Off"
            />
        </div>
        <div class="col center gap-5">
            <span class="font-12">Preset</span>
            <div class="row gap-2.5">
                <button class="pa-5 shade3 shine">X</button>
                <button class="pa-5 shade3 shine">1</button>
                <button class="pa-5 shade3 shine">2</button>
            </div>
        </div>
    </div>
</div>
