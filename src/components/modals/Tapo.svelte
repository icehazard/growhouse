<script>
    import Button from "comp/atoms/Button.svelte";
    import {closeModal} from "svelte-modals";
    import {scale} from "svelte/transition";
    import ws from "@/store/ws.js";
    import Icon from "@iconify/svelte";
    import Toggle from "svelte-toggle";

    export let isOpen;

    let state = {}

    function toggler(tapo, state) {
       // console.log(val, state);
        ws.tapo(tapo, state, 0)
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
                    {#each Object.keys($ws.ws["TAPO_STATUS"]) as tapo}
                        <div class="row w100 px-20 gap-20">
                            <div class="center">
                                <Icon height="20" icon="mdi:plug-socket-us"/>
                            </div>
                            <div class="grow col gap-5">
                                <span class="font-14">{tapo}</span>
                                <span class="font-12 opacity-50">{$ws.ws.TAPO_STATUS[tapo] ? "Online" : "Offline"}</span>
                            </div>
                            <div class="center">
                                <Toggle
                                        bind:toggled={$ws.ws.TAPO_STATUS[tapo]}
                                        on:click={() => toggler(tapo, !$ws.ws.TAPO_STATUS[tapo])}
                                        hideLabel
                                        switchColor="#eee"
                                        toggledColor="#37C19B"
                                        untoggledColor="#fa4d56"
                                />
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="actions row shade2 pa-25 gap-10 justify-end">
                <Button primary="true" text="CLOSE" on:click={closeModal}/>
            </div>
        </div>
    </div>
{/if}
