<script>
    import Button from "comp/atoms/Button.svelte";
    import { closeModal } from "svelte-modals";
    import { scale } from "svelte/transition";
    import ws from "@/store/ws.js";
    import Checkbox from "comp/atoms/Checkbox.svelte"

    export let isOpen;

    function run(val) {
        ws.diluteTo(val);
        closeModal()
    }

    function close() {
        closeModal()
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
                <span class="font-24">Water will be added and PPM reduced to the selected amount</span>
            </div>
            <div class="actions row wrap shade2 pa-25 gap-10">
                <Button block text="100PPM" primary="true" on:click={ () => run(100)} />
                <Button block text="200PPM" primary="true" on:click={ () => run(200)} />
                <Button block text="300PPM" primary="true" on:click={ () => run(300)} />
                <Button block text="400PPM" primary="true" on:click={ () => run(400)} />
                <Button block text="500PPM" primary="true" on:click={ () => run(500)} />
                <Button block text="600PPM" primary="true" on:click={ () => run(600)} />
                <Button block text="700PPM" primary="true" on:click={ () => run(700)} />

                <Button block text="CLOSE" on:click={close} />
            </div>
        </div>
    </div>
{/if}
