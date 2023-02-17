<script>
    import Button from "comp/atoms/Button.svelte";
    import { closeModal } from "svelte-modals";
    import { scale } from "svelte/transition";
    import ws from "@/store/ws.js";
    import Checkbox from "comp/atoms/Checkbox.svelte"
    import { onMount } from 'svelte';

    export let isOpen;

    function save() {
        ws.patchConfig("feeder", {PPM_MASK: TOTAL_MASK});
        closeModal()
    }

    function close() {
        closeModal()
    }


     let A = false
     let B = false
     let SILICA = false
     let CALMAG = false


    let TOTAL_MASK = 0;

    onMount(async() => {
        console.log("On mount called")
        let m = $ws.ws.state.PPM_MASK
        console.log(m)
        // setTimeout(() => {
        //     if (m & MASK_SILICA)
        //         SILICA = true
        //     if (m & MASK_A)
        //         A = true
        //     if (m & MASK_B)
        //         B = true
        //     if (m & MASK_CALMAG)
        //         CALMAG = true
        // }, 10)

        //
        // TOTAL_MASK = m;
    });

    let MASK_SILICA = 1;
    let MASK_A = 2;
    let MASK_B = 4;
    let MASK_CALMAG = 8;


    function calcMask() {
        TOTAL_MASK = 0;

        if (A)
            TOTAL_MASK |= MASK_A;
        if (B)
            TOTAL_MASK |= MASK_B;
        if (SILICA)
            TOTAL_MASK |= MASK_SILICA;
        if (CALMAG)
            TOTAL_MASK |= MASK_CALMAG;

        console.log("New mask is", TOTAL_MASK);
    }
    //
    // $: {
    //     let m = $ws.ws.state.PPM_MASK
    //     if (m & MASK_SILICA)
    //         SILICA = true
    //     if (m & MASK_A)
    //         A = true
    //     if (m & MASK_B)
    //         B = true
    //     if (m & MASK_CALMAG)
    //         CALMAG = true
    // };

    $:
    {
        A, B, CALMAG, SILICA, calcMask();
    }
</script>

{#if isOpen}
    <div
        role="dialog"
        class="modal center fixed p-center z-4 nopointer border"
        transition:scale={{ duration: 100, opacity: 0, start: 1.1 }}
    >
        <div class="shade3 curve  gap-20 col w-400 overflow-hidden autopointer">
            <div class="body pa-25 pt-30 gap-20 col">
                <span class="font-24">Nutrient Solution Recipe</span>
                <span>When tank is auto-dosed, following nutes will be used:</span>
            </div>
            <div class="body pa-25 pt-30 gap-20 col">
                <button class="row align-center">

                <Checkbox
                        secondaryColor="var(--shade5)"
                        primaryColor="var(--primary)"
                        duration="150"
                        size="2rem"
                        bind:checked={SILICA}
                        label="Silica"
                        mask="true"
                        id="Silica"
                />
                </button>

                <button class="row align-center">
                <Checkbox
                        secondaryColor="var(--shade5)"
                        primaryColor="var(--primary)"
                        duration="150"
                        size="2rem"
                        bind:checked={A}
                        label="A"
                        mask="true"
                        id="A"

                />
                </button>
                <button class="row align-center">

                <Checkbox
                        secondaryColor="var(--shade5)"
                        primaryColor="var(--primary)"
                        duration="150"
                        size="2rem"
                        bind:checked={B}
                        label="B"
                        mask="true"
                        id="B"

                />
                </button>
                <button class="row align-center">
                <Checkbox
                        secondaryColor="var(--shade5)"
                        primaryColor="var(--primary)"
                        duration="150"
                        size="2rem"
                        bind:checked={CALMAG}
                        label="Calmag"
                        mask="true"
                        id="CALMAG"

                />
                </button>
<!--                <span>SILICA<input type="checkbox" bind:checked={SILICA}></span>-->
<!--                <span>A<input type="checkbox" bind:checked={A}></span>-->
<!--                <span>B<input type="checkbox" bind:checked={B}></span>-->
<!--                <span>CALMAG<input type="checkbox" bind:checked={CALMAG}></span>-->
            </div>
            <div class="actions row shade2 pa-25 gap-10">
                <Button block text="SAVE" primary="true" on:click={save} />
                <Button block text="CLOSE" on:click={close} />
            </div>
        </div>
    </div>
{/if}
