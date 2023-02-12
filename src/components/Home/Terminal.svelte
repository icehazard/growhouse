<script>
    import ws from "@/store/ws";
    import {onMount} from "svelte";
    import Icon from "@iconify/svelte";
    import {afterUpdate} from "svelte";
    import dayjs from "dayjs";

    let el;

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
        goBot();
    });

    const LEVELS = {
        debug: 2,
        info: 1,
        all: 3
    }
    const LEVEL_DEBUG = 2;
    const LEVEL_INFO = 1;
    const LEVEL_ALL = 3;

    let level = LEVEL_INFO;

    function levelDebug() {
        level = LEVEL_DEBUG;
    }

    function levelInfo() {
        level = LEVEL_INFO;
    }

    function levelAll() {
        level = LEVEL_ALL;
    }
</script>

<div class="shade2 overlay col pa-20 gap-7 curve border grow relative" bind:this={el}>
    <div class="sticky p-left p-top row justify-end gap-10">
        <button class="curve shade3 pa-7 shine center" data-tooltip="Scroll down"  on:click={goBot}>
            <Icon icon="bi:chevron-double-down"/>
        </button>
        <button class="curve shade3 pa-7 shine center" data-tooltip="Clear logs"  on:click={ws.clearLog}>
            <Icon icon="ant-design:close-outlined"/>
        </button>
        <button class="curve shade3 pa-7 shine center" data-tooltip="Level 'Debug' logs" on:click={levelDebug}>
            <Icon icon="carbon:debug"/>
        </button>
        <button class="curve shade3 pa-7 shine center" data-tooltip="Level 'Info' logs" on:click={levelInfo}>
            <Icon icon="material-symbols:info"/>
        </button>
        <button class="curve shade3 pa-7 shine center" data-tooltip="All logs" on:click={levelAll}>
            <Icon icon="mdi:eye-circle"/>
        </button>
    </div>
    {#each $ws.log as item}
        {#if LEVELS[item.data.level] <= level || level == LEVEL_ALL }
            <!--{item.data.level}-->
            <div class="row gap-10 align-end">
            <span class="font-10 opacity-75">
                {dayjs(item.time).format("D/M HH:mm")}
            </span>
                <span class="font-12 weight-300 opacity-90">{item.data.log}</span>
            </div>
        {/if}
    {/each}
</div>

