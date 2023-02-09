<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    export let value = 0;
    export let max = value;
    let el;

    $: value, rotate(Math.round((value / max) * 545));

    function rotate(deg) {
        if (el) el.style.transform = `translate(-50%, 0%) rotate(${deg / 3}deg)`;
    }
    onMount(() => {
        rotate(Math.round((value / max) * 545));
    });
</script>

<div class="h-80 overflow-hidden frame">
    <div class="round border h-170 w-170 relative overflow-hidden bg">
        <div class="absolute border round p-center shade2 h-120 w-120 z-3 shadow" />
        <div class="absolute p-center z-3 weight-300 text-center nopointer">
            <div class="col gap-10">
                <span class="font-24 text-center pb-50" in:fly={{ y: -20 }}>
                    {value || 0}
                </span>
            </div>
        </div>
        <button class="triangle p-center pointer" bind:this={el} />
    </div>
</div>

<style>
    .triangle {
        min-height: 200px;
        min-width: 200px;
        background-color: var(--primary);
        position: absolute;
        transform-origin: center top;
        transform: translate(-50%, 0%) rotate(0deg);
        transition: all 0.3s ease-out;
    }

    .frame {
        border-bottom: 1px solid var(--shade3);
    }
</style>
