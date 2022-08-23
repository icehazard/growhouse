<script>
  import Dial from "../atoms/Dial.svelte";
  import { openModal } from "svelte-modals";
  import ConfirmPhChange from "comp/modals/ConfirmPhChange.svelte";
  import ConfirmPpmChange from "comp/modals/ConfirmPpmChange.svelte";
  import ws from "@/store/ws.js";
  import modal from "@/store/modal.js";
  import Icon from "@iconify/svelte";
  import { mq } from "@/assets/library/MediaQuery.svelte";

  let ph = 580;
  let ppm = 580;

  function ppmEmit(val) {
    ppm = val.detail;
    openModal(ConfirmPpmChange, { ppm });
  }
  function phEmit(val) {
    ph = val.detail;
    console.log("🚀 ~ ph", ph);
    openModal(ConfirmPhChange, { ph });
    //$modal.editPH = true
  }
  function runCommand(cmd) {
    ws.cmd(cmd);
  }
</script>
<div class="col gap-50" class:row={$mq.xl_}  >
    <div class="row gap-50 shade1 border curve center wrap pa-20 grow">
      <Dial text="PPM" number={ppm} on:click={ppmEmit} />
      <Dial text="pH" number={ph} on:click={phEmit} decimal="100" />
  </div>
  
  <div class="row gap-20 shade1 border curve wrap pa-20 grow center">
    <div class="col center gap-10">
      <button class="h-100 shade3 w-100 center curve" value="RESTART" on:click={() => runCommand("restart")}>
        <Icon icon="ic:twotone-restart-alt" height="30" />
      </button>
      <span class="font-14 opacity-75">Restart</span>
    </div>
    <div class="col center gap-10">
      <button class="h-100 shade3 w-100 center curve" value="TEST NOTIF" on:click={() => runCommand("notif")}>
        <Icon icon="akar-icons:bell" width="25" />
      </button>
      <span class="font-14 opacity-75">Test Notification</span>
    </div>
    <div class="col center gap-10">
      <button class="h-100 shade3 w-100 center curve" on:click={() => runCommand("on")}>
        <Icon icon="mdi:water-plus-outline" width="30" />
      </button>
      <span class="font-14 opacity-75">Refill Tank</span>
    </div>
    <div class="col center gap-10">
      <button class="h-100 shade3 w-100 center curve" on:click={() => runCommand("dinfo")}>
        <Icon icon="mdi:water-plus-outline" width="30" />
      </button>
      <span class="font-14 opacity-75">DINFO</span>
    </div>
  </div>
</div>
