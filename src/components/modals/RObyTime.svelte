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

    let duration

    function runRO(dur) {
        let finalDur

        if (dur == "custom")
            finalDur = duration
        else if (dur == 999)
            finalDur = 0
        else finalDur = dur

        console.log("Running RO for duration", finalDur)
        //ws.tapo("DEHUMIDIFIER", 1, finalDur);
        ws.tapo("RO", 1, finalDur);
        closeModal();
    }
    
</script>

{#if isOpen}
    <div
        role="dialog"
        class="modal center fixed p-center z-4 nopointer border"
        use:clickOutside
        on:click_outside={closeModal}

        transition:scale={{ duration: 100, opacity: 0, start: 1.1 }}
    >
        <div class="shade3 curve  pb-3 gap-5 col w-400 overflow-hidden autopointer items-center">
            <div class="body pa-25 pt-30 gap-5 col">
                <span class="font-24">Refill tank by duration</span>
            </div>

            <input
            type="value"
            name="duration"
            placeholder="enter duration here (in millisecond)"
            bind:value={duration}
            class="flex w-3/4 justify-center"
            style="border-bottom: 1px solid #fff;"
            />

            <Button block text="RUN RO" class="grow-[5] p-2" primary="true" on:click={() => runRO("custom")} />


            <div class="text-sm text-[#787474] bold">OR</div>

            <div class="actions row wrap shade2 pa-25 gap-2.5 w-full">
                <Button block text="10S" primary="true" on:click={ () => runRO(10e3)} />
                <Button block text="10M" primary="true" on:click={ () => runRO(600e3)} />
                <Button block text="30M" primary="true" on:click={ () => runRO(1800e3)} />
                <Button block text="1H" primary="true" on:click={ () => runRO(3600e3)} />
                <Button block text="1H30M" primary="true" on:click={ () => runRO(5400e3)} />
            </div>
            <div class="text-sm text-[#787474] bold">OR</div>

            <Button block text="UNTIL I TURN IT OFF" class="p-2" primary="true" on:click={ () => runRO(999)} />

        </div>

    </div>
{/if}
