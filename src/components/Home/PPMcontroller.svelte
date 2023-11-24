<script>
  import Dial from "../atoms/Dial.svelte";
  import { openModal } from "svelte-modals";
  import ConfirmPhChange from "comp/modals/ConfirmPhChange.svelte";
  import ConfirmPpmChange from "comp/modals/ConfirmPpmChange.svelte";
  import ws from "@/store/ws";

  let ph = $ws.ws.ph * 100;
  let ppm = $ws.ws.currentPPM;

  function ppmEmit(val) {
    ppm = val.detail;
    openModal(ConfirmPpmChange, { ppm });
  }
  function phEmit(val) {
    ph = val.detail;
    openModal(ConfirmPhChange, { ph });
  }
</script>

<div class="row gap-10 shade1 border curve center wrap pa-20 grow">
  <Dial text="PPM" active={$ws.ws.ppmstate} number={ppm} on:click={ppmEmit} />
  <Dial text="pH" active={$ws.ws.phstate} number={ph} on:click={phEmit} decimal="100" />
</div>
