<script>
    import Button from "comp/atoms/Button.svelte";
    import {closeModal} from "svelte-modals";   
 import {clickOutside} from './click-outside.js';

    import { scale } from "svelte/transition";
    import ws from "@/store/ws.js";

    export let isOpen;
    export let ph = 0;

    function save() {
        ws.setPh(ph);
        closeModal();
    }
</script>

{#if isOpen}
    <div
        role="dialog"
        class="modal center fixed p-center z-4 nopointer border"
        transition:scale={{ duration: 100, opacity: 0, start: 1.1 }}
    >
        <div class="shade3 curve  gap-5 col w-800 overflow-hidden autopointer">
            <div class="body pa-25 pt-30 gap-5 col">
                <div class="grow pa-20 shade1 curve center">
                    <iframe
                        class="w100"
                        title="iframe"
                        src="http://168.119.247.99:3000/d/OKDhg5iVz/water-reservoir?orgId=1&panelId=2"
                        height="420"
                        frameborder="0"
                    />
                </div>
            </div>
            <div class="actions row shade2 pa-25 gap-2.5 justify-end">
                <Button primary="true"  text="CLOSE" on:click={closeModal} />
            </div>
        </div>
    </div>
{/if}
