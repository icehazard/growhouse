<script>
    import Button from "comp/atoms/Button.svelte";
    import {closeModal} from "svelte-modals";   
 import {clickOutside} from './click-outside.js';

    import { scale } from "svelte/transition";
    import ws from "@/store/ws.js";
    import Checkbox from "comp/atoms/Checkbox.svelte"

    export let isOpen;
    export let ppm = 0;

    function save() {
        ws.setPPMByPPM(ppm, TOTAL_MASK);
        closeModal()
    }

    function close() {
        closeModal()
    }

    export let A = true
    export let B = true
    export let SILICA = true
    export let CALMAG = true

    let MASK_SILICA = 1;
    let MASK_A = 2;
    let MASK_B = 4;
    let MASK_CALMAG = 8;

    let TOTAL_MASK = 0;

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
        <div class="shade3 curve  gap-5 col w-400 overflow-hidden autopointer">
            <div class="body pa-25 pt-30 gap-5 col">
                <span class="font-24">Update PPM</span>
                <span>Are you sure you want to change the PPM to {ppm}?</span>
            </div>
            <div class="body pa-25 pt-30 gap-5 col">
                <button class="row align-center">

                <Checkbox
                        secondaryColor="var(--shade5)"
                        primaryColor="var(--primary)"
                        duration="150"
                        size="2rem"
                        bind:checked={SILICA}
                        label="Silica"
                        mask="true"
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
                />
                </button>
<!--                <span>SILICA<input type="checkbox" bind:checked={SILICA}></span>-->
<!--                <span>A<input type="checkbox" bind:checked={A}></span>-->
<!--                <span>B<input type="checkbox" bind:checked={B}></span>-->
<!--                <span>CALMAG<input type="checkbox" bind:checked={CALMAG}></span>-->
            </div>
            <div class="actions row shade2 pa-25 gap-2.5">
                <Button block text="SAVE" primary="true" on:click={save} />
                <Button block text="CLOSE" on:click={close} />
            </div>
        </div>
    </div>
{/if}
