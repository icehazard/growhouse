<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import Hammer from "hammerjs";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let text = "";
    export let decimal = 1;
    export let number = 0;
    export let active = false;
    let value = 0;

    let el, dial;
    let startPos = 0;
    let startPPM = 0;

    function drag(event) {
        if (event.center.x === 0) return;
        let diff = startPos - event.center.x;
        let rounded = Math.ceil(diff + startPPM);
        if (rounded < 0) return (value = 0);
        if (rounded > 1100) return (value = 1100);
        if (rounded % 10 == 0) navigator.vibrate(1);
        value = Math.ceil(rounded / 10) * 10;
        rotate(value);
    }
    function start(event) {
        navigator.vibrate(10);
        startPos = event.center.x;
        startPPM = value;
    }
    function tap() {
        navigator.vibrate(50);
        dispatch("click", value / decimal);
    }
    function rotate(deg) {
        el.style.transform = `translate(-50%, 0%) rotate(${deg / 3}deg)`;
    }
    function round() {
        let round = Math.ceil(value);
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
        mc.on("press", start);
        // mc.on("tap", tap);
        mc.on("panend", round);
    }

    onMount(() => {
        value = Math.round(number);
        rotate(value);
        gestures();
    });
</script>

<div class="round border h-200 w-200 relative overflow-hidden" bind:this={dial}>
    <button
        class="absolute border round p-center shade2 h-150 w-150 z-3 shadow fast"
        on:click={tap}
        class:borderPrimary={active}
    />
    <div class="absolute p-center z-3 weight-300 text-center nopointer">
        <div class="col gap-10">
            <span class="font-28 text-center" in:fly={{ y: -20 }}
                >{Math.round(value) / decimal}</span
            >
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
        transition: all 0.3s ease-out;
    }

    button:active {
        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
    }
</style>
