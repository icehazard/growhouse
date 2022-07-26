<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import Hammer from "hammerjs";

    export let text = "PPM";
    let value = 0;
    export let number = 0;
    let el, dial;
    let startPos = 0;
    let startPPM = 0;

    function drag(event) {
        if (event.center.y === 0) return;
        let diff = startPos - event.center.y;
        let rounded = Math.round(diff + startPPM);
        if (rounded < 0) return (value = 0);
        if (rounded > 1100) return (value = 1100);
        value = rounded;
        rotate(value);
    }
    function start(event) {
        startPos = event.center.y;
        startPPM = value;
    }
    function rotate(deg) {
        el.style.transform = `translate(-50%, 0%) rotate(${deg / 3}deg)`;
    }
    function round() {
        let round = Math.round(value / 10) * 10;
        if (round < 0) round = 0;
        if (round > 1100) return (value = 1100);
        rotate(round);
        value = round;
    }
    function gestures() {
        let mc = new Hammer(dial);
        mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
        mc.get("press").set({ time: 1 });
        mc.on("panleft panright panup pandown", drag);
        mc.on("tap press", start);
        mc.on("panend", round);
    }

    onMount(() => {
        value = Math.round(number);
        rotate(value);
        gestures();
    });
</script>

<div class="round border h-200 w-200 relative overflow-hidden" bind:this={dial}>
    <div class="absolute border round p-center shade2 h-150 w-150 z-3 shadow" />
    <div class="absolute p-center z-3 weight-300 text-center">
        <div class="col gap-10">
            <span class="font-28 text-center" in:fly={{ y: -20 }}>{Math.round(value)}</span>
            <span class="font-14 opacity-75">{text}</span>
        </div>
    </div>
    <button class="triangle p-center pointer" bind:this={el} />
</div>

<style>
    .triangle {
        position: absolute;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 100px solid var(--primary);
        transform-origin: center top;
        transform: translate(-50%, 0%) rotate(0deg);
        transition: all 0.3s linear;
    }
</style>
