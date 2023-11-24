<script>
    import Button from "comp/atoms/Button.svelte";
    import {closeModal} from "svelte-modals";   
 import {clickOutside} from './click-outside.js';

    import { scale } from "svelte/transition";
    import ws from "@/store/ws.js";
    import Checkbox from "comp/atoms/Checkbox.svelte"

    export let isOpen;

    function close() {
        closeModal()
    }

    function run(duration) {
        ws.feed(duration)
        close()
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
                <span class="font-24">Feed the plants by duration</span>
            </div>
            <div class="actions row wrap shade2 pa-25 gap-2.5">
                <Button block text="10S" primary="true" on:click={ () => run("10000")} />
                <Button block text="15S" primary="true" on:click={ () => run("15000")} />
                <Button block text="30S" primary="true" on:click={ () => run("30000")} />
                <Button block text="40S" primary="true" on:click={ () => run("40000")} />
                <Button block text="50S" primary="true" on:click={ () => run("50000")} />

                <Button block text="1M" primary="true" on:click={ () => run("60000")} />
                <Button block text="2M" primary="true" on:click={ () => run("120000")} />
                <Button block text="5M" primary="true" on:click={ () => run("600000")} />

                <Button block text="CLOSE" on:click={close} />
            </div>
        </div>
    </div>
{/if}
