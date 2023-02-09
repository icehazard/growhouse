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
</script>

<div class="shade2 overlay col pa-20 gap-7 curve border grow relative" bind:this={el}>
    <div class="sticky p-left p-top row justify-end gap-10">
        <button class="curve shade3 pa-7 shine center" on:click={goBot}>
            <Icon icon="bi:chevron-double-down"/>
        </button>
        <button class="curve shade3 pa-7 shine center" on:click={ws.clearLog}>
            <Icon icon="ant-design:close-outlined"/>
        </button>
    </div>
        {#each $ws.log as item}
            <div class="row gap-10 align-end">
            <span class="font-10 opacity-75">
                {dayjs(item.time).format("D/M HH:mm")}
            </span>
                <span class="font-12 weight-300 opacity-90">{item.data}</span>
            </div>
        {/each}
</div>

