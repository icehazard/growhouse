<script>
    import Button from "comp/atoms/Button.svelte";
    import { closeModal } from "svelte-modals";
    import { clickOutside } from "./click-outside.js";

    import { scale } from "svelte/transition";
    import ws from "@/store/ws.js";
    import Icon from "@iconify/svelte";
    import Toggle from "svelte-toggle";
    import { onMount } from "svelte";

    let tapos = {};
    onMount(async () => {
        tapos = $ws.ws.TAPO_STATUS;
    });

    export let isOpen;

    let state = {};

    function toggler(tapo, state) {
        // console.log(val, state);
        ws.tapo(tapo, state, 0);
    }
</script>

{#if isOpen}
    <div
        role="dialog"
        class="flex modal center fixed p-center z-50 nopointer border w-[90%] lg:w-2/4 lg:top-2/4 rounded border-gray-600"
        style="height: 70vh"
        transition:scale={{ duration: 100, opacity: 0, start: 1.1 }}
        use:clickOutside
        on:click_outside={closeModal}
    >
        <div
            class="flex shade3 curve col w-full overflow-hidden autopointer h-full"
        >
            <div
                class="flex body pa-15 pt-25 gap-5 col h-full items-center"
                style="min-height:0;"
            >
                <span class="font-24 font-bold">Tapos</span>
                <div
                    class="grow pa-20 shade1 curve center gap-2.5 max-h-[85%] overflow-y-scroll overflow-x-hidden"
                >
                    {#each Object.keys(tapos) as tapo}
                        <div
                            class="row w100 px-20 gap-5"
                            class:opacity-50={tapos[tapo] <= 0}
                        >
                            <div class="center">
                                <Icon height="20" icon="mdi:plug-socket-us" />
                            </div>
                            <div class="grow row gap-5">
                                <span class="font-14 basis-3/4">{tapo}</span>
                                <span
                                    class="font-12 opacity-70 basis-1/4"
                                    class:green--text={tapos[tapo] &&
                                        tapos[tapo] > 0}
                                    class:red--text={tapos[tapo] &&
                                        tapos[tapo] < 0}
                                    >{tapos[tapo]
                                        ? tapos[tapo] < 0
                                            ? "UNREACHABLE"
                                            : "ACTIVE"
                                        : "OFF"}</span
                                >
                            </div>
                            <div class="center">
                                {#if tapos[tapo] >= 0}
                                    <Toggle
                                        bind:toggled={tapos[tapo]}
                                        on:click={() =>
                                            toggler(tapo, !tapos[tapo])}
                                        hideLabel
                                        switchColor="#eee"
                                        toggledColor="#37C19B"
                                        untoggledColor="#fa4d56"
                                    />
                                {:else}
                                    <Toggle
                                        toggled={false}
                                        on:click={() =>
                                            toggler(tapo, !tapos[tapo])}
                                        hideLabel
                                        switchColor="#eee"
                                        toggledColor="#37C19B"
                                        untoggledColor="#fa4d56"
                                    />
                                {/if}
                            </div>
                        </div>
                    {/each}
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
