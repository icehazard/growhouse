<script>
  import ws from "@/store/ws";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { afterUpdate } from "svelte";
  import _ from "lodash";
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
    if ($ws.scrollConsole) {
      goBot();
      console.log("SCROLLED!");
      $ws.scrollConsole = false;
    }

    scroll();
  });

  onMount(() => {
    goBot();
  });

  const LEVELS = {
    debug: 2,
    info: 1,
    trace: 0,
    all: 3,
  };
  const LEVEL_DEBUG = 2;
  const LEVEL_INFO = 1;
  const LEVEL_TRACE = 0;
  const LEVEL_ALL = 3;

  let level = LEVEL_DEBUG;

  function levelDebug() {
    level = LEVEL_DEBUG;
    setTimeout(goBot, 1);
  }

  function levelInfo() {
    level = LEVEL_INFO;
    setTimeout(goBot, 1);
  }

  function levelAll() {
    level = LEVEL_ALL;
    setTimeout(goBot, 1);
  }

  let allLogs = [];

  $: {
  }

  setInterval(() => {
    if (ws) {
      allLogs = [];
      for (let lvl of Object.keys(LEVELS)) {
        if (ws.val("log-" + lvl))
          for (let item of ws.val("log-" + lvl)) {
            //console.log("pushed log", item)
            allLogs.push(item);
          }
      }
      allLogs = _.orderBy(allLogs, ["time"], ["asc"]);
      console.log("Ordered logs");
    }
  }, 1e3);
</script>

<div
  class="shade2 col gap-7 curve grow relative pa-15 overflow-y h100"
  bind:this={el}
>
  <div class="sticky p-right p-top row justify-end gap-2.5 z-2">
    <button
      class="curve shade3 pa-7 shine center borderPrimary"
      data-tooltip="Scroll down"
      on:click={goBot}
    >
      <Icon icon="bi:chevron-double-down" />
    </button>
    <button
      class="curve shade3 pa-7 shine center borderPrimary"
      data-tooltip="Clear logs"
      on:click={ws.clearLog}
    >
      <Icon icon="ant-design:close-outlined" />
    </button>
    <button
      class="curve shade3 pa-7 shine center borderPrimary"
      data-tooltip="Level 'Debug' logs"
      on:click={levelDebug}
    >
      <Icon icon="carbon:debug" />
    </button>
    <button
      class="curve shade3 pa-7 shine center borderPrimary"
      data-tooltip="Level 'Info' logs"
      on:click={levelInfo}
    >
      <Icon icon="material-symbols:info" />
    </button>
    <button
      class="curve shade3 pa-7 shine center borderPrimary"
      data-tooltip="All logs"
      on:click={levelAll}
    >
      <Icon icon="mdi:eye-circle" />
    </button>
  </div>
  <div class="col overflow-y absolute">
    {#each allLogs as item}
      {#if LEVELS[item.data.level] <= level || level == LEVEL_ALL}
        <!--{item.data.level}-->
        <div class="row gap-2.5 align-end">
          <span class="font-10 opacity-75">
            {dayjs(item.time).format("D/M HH:mm")}
          </span>
          <span class="font-12 weight-300 opacity-90">{item.data.log}</span>
        </div>
      {/if}
    {/each}
  </div>
</div>
