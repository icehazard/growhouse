<script>
    import Button from "comp/atoms/Button.svelte";
    import {closeModal} from "svelte-modals";   
 import {clickOutside} from './click-outside.js';

    import { scale } from "svelte/transition";
    import ws from "@/store/ws.js";

    export let isOpen;
    export let ph = 0;

    function save() {
        ws.setPh(ph)
        closeModal()
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
                <span class="font-24">Update pH</span>
                <span>Are you sure you want to change the pH to {ph}?</span>
            </div>
            <div class="actions row shade2 pa-25 gap-2.5">
                <Button block text="SAVE" primary="true" on:click={save} />
                <Button block text="CLOSE" on:click={closeModal} />
            </div>
        </div>
    </div>
{/if}
