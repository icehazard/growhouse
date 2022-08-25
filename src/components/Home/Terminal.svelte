<script>
    import ws from "@/store/ws";
    import { onMount } from "svelte";
    import Icon from "@iconify/svelte";
    import { beforeUpdate, afterUpdate } from "svelte";
    let el;
    // $: $ws.log, scroll();

    function scroll() {
        if (!el) return;
        let dif = el.scrollTop + 500 - el.scrollHeight;
        if (dif < -50) return;
        if (el.lastChild.nodeName == "#text") return;
        el.scrollTop = el.scrollHeight;
    }

    function goBot() {
        el.scrollTop = el.scrollHeight;
    }

    afterUpdate(() => {
        scroll();
    });
    onMount(() => {
        el.scrollTop = el.scrollHeight;
        scroll();
    });
</script>

<div class="h-500 shade1 overlay col pa-20 gap-10 curve border grow" bind:this={el}>
    <div class="sticky p-left p-top row justify-end ">
        <button class="curve shade3 pa-7 shine center" on:click={ws.clearLog}>
            <Icon icon="ant-design:close-outlined" />
        </button>
    </div>
    {#each $ws.log as item}
        <span> {item}</span>
    {/each}
</div>

<style>
    .h-500 {
        min-height: 500px;
    }
</style>
