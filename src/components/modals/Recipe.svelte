<script>
    import Button from "comp/atoms/Button.svelte";
    import {closeModal} from "svelte-modals";
    import {scale} from "svelte/transition";
    import ws from "@/store/ws.js";
    import Checkbox from "comp/atoms/Checkbox.svelte"
    import Checkboxnew from "comp/atoms/Checkboxnew.svelte"

    import {onMount} from 'svelte';

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

    onMount(async () => {
        let m = $ws.ws.state.PPM_MASK
        console.log(m)
        if (m & MASK_SILICA)
            SILICA = true
        if (m & MASK_A)
            A = true
        if (m & MASK_B)
            B = true
        if (m & MASK_CALMAG)
            CALMAG = true
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
                <Checkboxnew bind:checked={SILICA} label="Silica"></Checkboxnew>
                <Checkboxnew bind:checked={A} label="A"></Checkboxnew>
                <Checkboxnew bind:checked={B} label="B"></Checkboxnew>
                <Checkboxnew bind:checked={CALMAG} label="Calmag"></Checkboxnew>
            </div>
            <div class="actions row shade2 pa-25 gap-10">
                <Button block text="SAVE" primary="true" on:click={save}/>
                <Button block text="CLOSE" on:click={close}/>
            </div>
        </div>
    </div>
{/if}
