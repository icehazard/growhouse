<script>
    import Button from "comp/atoms/Button.svelte";
    import { closeModal } from "svelte-modals";
    import { scale } from "svelte/transition";
    import ws from "@/store/ws.js";
    import Icon from "@iconify/svelte";
    import Toggle from "svelte-toggle";

    export let isOpen;

    let tapo1 = false;
    let tapo2 = false;
    let tapo3 = false;
    let tapo4 = false;
    let tapo5 = false;

    function toggler(val, state) {
        console.log(val, state);
    }
</script>

{#if isOpen}
    <div
        role="dialog"
        class="modal center fixed p-center z-4 nopointer border"
        transition:scale={{ duration: 100, opacity: 0, start: 1.1 }}
    >
        <div class="shade3 curve  gap-20 col w-600 overflow-hidden autopointer">
            <div class="body pa-25 pt-30 gap-20 col">
                <div class="grow pa-20 shade1 curve center gap-10">
                    <div class="row w100 px-20 gap-20">
                        <div class="center">
                            <Icon height="20" icon="mdi:plug-socket-us" />
                        </div>
                        <div class="grow col gap-5">
                            <span class="font-14">RO</span>
                            <span class="font-12 opacity-50">Online</span>
                        </div>
                        <div class="center">
                            <Toggle
                                bind:toggled={tapo1}
                                on:click={() => toggler("tapo1", !tapo1)}
                                hideLabel
                                switchColor="#eee"
                                toggledColor="#37C19B"
                                untoggledColor="#fa4d56"
                            />
                        </div>
                    </div>
                    <hr class="w100" />
                    <div class="row w100 px-20 gap-20">
                        <div class="center">
                            <Icon height="20" icon="mdi:plug-socket-us" />
                        </div>
                        <div class="grow col gap-5">
                            <span class="font-14">Out</span>
                            <span class="font-12 opacity-50">Online</span>
                        </div>
                        <div class="center">
                            <Toggle
                                bind:toggled={tapo2}
                                on:click={() => toggler("tapo2", !tapo2)}
                                hideLabel
                                switchColor="#eee"
                                toggledColor="#37C19B"
                                untoggledColor="#fa4d56"
                            />
                        </div>
                    </div>
                    <hr class="w100" />
                    <div class="row w100 px-20 gap-20">
                        <div class="center">
                            <Icon height="20" icon="mdi:plug-socket-us" />
                        </div>
                        <div class="grow col gap-5">
                            <span class="font-14">Feed Pump</span>
                            <span class="font-12 opacity-50">Online</span>
                        </div>
                        <div class="center">
                            <Toggle
                                bind:toggled={tapo3}
                                on:click={() => toggler("tapo3", !tapo3)}
                                hideLabel
                                switchColor="#eee"
                                toggledColor="#37C19B"
                                untoggledColor="#fa4d56"
                            />
                        </div>
                    </div>
                    <hr class="w100" />
                    <div class="row w100 px-20 gap-20">
                        <div class="center">
                            <Icon height="20" icon="material-symbols:light-mode-outline-sharp" />
                        </div>
                        <div class="grow col gap-5">
                            <span class="font-14">650w light</span>
                            <span class="font-12 opacity-50">Online</span>
                        </div>
                        <div class="center">
                            <Toggle
                                bind:toggled={tapo4}
                                on:click={() => toggler("tapo4", !tapo4)}
                                hideLabel
                                switchColor="#eee"
                                toggledColor="#37C19B"
                                untoggledColor="#fa4d56"
                            />
                        </div>
                    </div>
                    <hr class="w100" />
                    <div class="row w100 px-20 gap-20">
                        <div class="center">
                            <Icon height="20" icon="mdi:plug-socket-us" />
                        </div>
                        <div class="grow col gap-5">
                            <span class="font-14">Buffer tank</span>
                            <span class="font-12 opacity-75"> Monitor and correct pH level </span>
                        </div>
                        <div class="center">
                            <Toggle
                                bind:toggled={tapo5}
                                on:click={() => toggler("tapo5", !tapo5)}
                                hideLabel
                                switchColor="#eee"
                                toggledColor="#37C19B"
                                untoggledColor="#fa4d56"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="actions row shade2 pa-25 gap-10 justify-end">
                <Button primary="true" text="CLOSE" on:click={closeModal} />
            </div>
        </div>
    </div>
{/if}
