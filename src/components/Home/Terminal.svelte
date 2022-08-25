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
        //goBot();
        el.scroll({
            top: el.scrollHeight,
            behavior: "smooth",
        });
    }

    function goBot() {
        el.scroll({
            top: el.scrollHeight,
            behavior: "smooth",
        });
    }

    afterUpdate(() => {
        scroll();
    });

    onMount(() => {
        goBot();
   
    });
</script>

<div class="h-500 shade1 overlay col pa-20 gap-10 curve border grow relative" bind:this={el}>
    <div class="sticky p-left p-top row justify-end gap-10">
        <button class="curve shade3 pa-7 shine center" on:click={goBot}>
            <Icon icon="bi:chevron-double-down" />
        </button>
        <button class="curve shade3 pa-7 shine center" on:click={ws.clearLog}>
            <Icon icon="ant-design:close-outlined" />
        </button>
    </div>
    {#each $ws.log as item}
        <span> {item}</span>
    {/each}

    <div class="fixed p-right p-bottom row justify-end ">
        <button class="curve shade3 pa-7 shine center" on:click={ws.clearLog}>
            <Icon icon="ant-design:close-outlined" />
        </button>
    </div>
</div>

<style>
    .h-500 {
        min-height: 500px;
    }
</style>
