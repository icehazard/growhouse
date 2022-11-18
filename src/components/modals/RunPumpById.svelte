<script>
    import Button from "comp/atoms/Button.svelte";
    import { closeModal } from "svelte-modals";
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
    export let PHUP = true
    export let PHDOWN = true

    let MASK_SILICA = 1;
    let MASK_A = 2;
    let MASK_B = 4;
    let MASK_CALMAG = 8;
    let MASK_PHUP = 16;
    let MASK_PHDOWN = 32;

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
        if (PHUP)
            TOTAL_MASK |= MASK_PHUP;
        if (PHDOWN)
            TOTAL_MASK |= MASK_PHDOWN;

        console.log("New mask is", TOTAL_MASK);
    }

    $:
    {
        A, B, CALMAG, SILICA, PHUP, PHDOWN, calcMask();
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
                <span class="font-24">Run Pump By ID</span>
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

                <button class="row align-center">
                    <Checkbox
                            secondaryColor="var(--shade5)"
                            primaryColor="var(--primary)"
                            duration="150"
                            size="2rem"
                            bind:checked={PHUP}
                            label="PH UP"
                            mask="true"
                    />
                </button>

                <button class="row align-center">
                    <Checkbox
                            secondaryColor="var(--shade5)"
                            primaryColor="var(--primary)"
                            duration="150"
                            size="2rem"
                            bind:checked={PHDOWN}
                            label="PH DOWN"
                            mask="true"
                    />
                </button>
            </div>
            <div class="actions row shade2 pa-25 gap-10">
                <Button block text="RUN PUMP(S)" primary="true" on:click={save} />
                <Button block text="CLOSE" on:click={close} />
            </div>
        </div>
    </div>
{/if}
