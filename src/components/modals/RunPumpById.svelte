<script>
    import Button from "comp/atoms/Button.svelte";
    import { closeModal } from "svelte-modals";
    import { clickOutside } from "./click-outside.js";

    import { scale } from "svelte/transition";
    import ws from "@/store/ws.js";
    import Checkbox from "comp/atoms/Checkbox.svelte";

    export let isOpen;

    function save() {
        ws.runPumpByMask(TOTAL_MASK, duration);
        closeModal();
    }

    function run(ms) {
        ws.runPumpByMask(TOTAL_MASK, ms);
        closeModal();
    }

    function close() {
        closeModal();
    }

    export let A = false;
    export let B = false;
    export let SILICA = false;
    export let CALMAG = false;
    export let PHUP = false;
    export let PHDOWN = false;
    let duration = 5000;

    let MASK_SILICA = 1;
    let MASK_A = 2;
    let MASK_B = 4;
    let MASK_CALMAG = 8;
    let MASK_PHUP = 16;
    let MASK_PHDOWN = 32;

    let TOTAL_MASK = 0;

    function calcMask() {
        TOTAL_MASK = 0;

        if (A) TOTAL_MASK |= MASK_A;
        if (B) TOTAL_MASK |= MASK_B;
        if (SILICA) TOTAL_MASK |= MASK_SILICA;
        if (CALMAG) TOTAL_MASK |= MASK_CALMAG;
        if (PHUP) TOTAL_MASK |= MASK_PHUP;
        if (PHDOWN) TOTAL_MASK |= MASK_PHDOWN;

        console.log("New mask is", TOTAL_MASK);
    }

    $: {
        A, B, CALMAG, SILICA, PHUP, PHDOWN, calcMask();
    }
</script>

{#if isOpen}
    <div
        role="dialog"
        class="flex modal center fixed p-center z-50 nopointer border w-8/12 lg:w-2/4 lg:top-2/4 rounded border-gray-600"
        style="height: 70vh"
        transition:scale={{ duration: 100, opacity: 0, start: 1.1 }}
        use:clickOutside
        on:click_outside={closeModal}
    >
        <div
            class="flex shade3 curve col w-full overflow-hidden autopointer h-full"
        >
            <div
                class="flex body pa-15 pt-25 gap-5 col h-full"
                style="min-height:0;"
            >
                <span class="font-24 font-bold">Run pump manually</span>
                <div
                    class="grow pa-20 shade1 curve gap-2.5 max-h-[85%] w-full overflow-y-scroll overflow-x-hidden col"
                >
                    <button class="row">
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


                <input
                type="value"
                name="duration"
                placeholder="duration"
                bind:value={duration}
                style="border-bottom: 1px solid #fff;"
                />

                <div class="actions row wrap shade2 pa-25 gap-2.5">
                    <Button block class="w-1/4" text="500MS" primary="true" on:click={ () => run("500")} />
                    <Button block text="750MS" primary="true" on:click={ () => run("750")} />
                    <Button block text="1S" primary="true" on:click={ () => run("1000")} />
                    <Button block text="2S" primary="true" on:click={ () => run("2000")} />
                    <Button block text="15S" primary="true" on:click={ () => run("15000")} />
                    <Button block text="30S" primary="true" on:click={ () => run("30000")} />
                    <Button block text="1M" primary="true" on:click={ () => run("60000")} />
                    <Button block text="2M" primary="true" on:click={ () => run(120e3)} />
    
                    <Button block text="RUN PUMP(S)" class="grow-[5]" primary="true" on:click={save} />
                    <Button block text="CLOSE" class="grow-[2]" on:click={close} />
                </div>

                <span
                    class="ml-auto underline cursor-pointer"
                    on:click={closeModal}>Cancel</span
                >
            </div>
            <!-- <div class="actions flex flex-row shadex1 pa-25 gap-10">
                <Button block text="CLOSE" on:click={closeModal} />
            </div> -->
        </div>
    </div>
{/if}
