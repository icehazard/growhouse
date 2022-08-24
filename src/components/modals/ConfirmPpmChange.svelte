<script>
    import Button from "comp/atoms/Button.svelte";
    import { closeModal } from "svelte-modals";
    import { scale } from "svelte/transition";
    import ws from "@/store/ws.js";
    import modal from "@/store/modal.js";
    import Checkbox from "svelte-checkbox";

    export let isOpen;
    export let ppm = 0;

    function save() {
        ws.setPPMByPPM(ppm);
        closeModal()
    }

    function close() {
        closeModal()
    }

    let A, B, SILICA, CALMAG = true;
</script>

{#if isOpen}
    <div
        role="dialog"
        class="modal center fixed p-center z-4 nopointer border"
        transition:scale={{ duration: 100, opacity: 0, start: 1.1 }}
    >
        <div class="shade3 curve  gap-20 col w-400 overflow-hidden autopointer">
            <div class="body pa-25 pt-30 gap-20 col">
                <span class="font-24">Update PPM</span>
                <span>Are you sure you want to change the PPM to {ppm}?</span>
            </div>
            <div class="body pa-25 pt-30 gap-20 col">
                <span>SILICA<input type="checkbox" checked={SILICA}></span>
                <span>A<input type="checkbox" checked={A}></span>
                <span>B<input type="checkbox" checked={B}></span>
                <span>CALMAG<input type="checkbox" checked={CALMAG}></span>
            </div>
            <div class="actions row shade2 pa-25 gap-10">
                <Button block text="SAVE" primary="true" on:click={save} />
                <Button block text="CLOSE" on:click={close} />
            </div>
        </div>
    </div>
{/if}
