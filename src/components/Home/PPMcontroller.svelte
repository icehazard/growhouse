<script>
  import Dial from "../atoms/Dial.svelte";
  import { openModal } from "svelte-modals";
  import ConfirmPhChange from "comp/modals/ConfirmPhChange.svelte";
  import ConfirmPpmChange from "comp/modals/ConfirmPpmChange.svelte";

  let ph = 580;
  let ppm = 580;

  function ppmEmit(val) {
    ppm = val.detail;
    openModal(ConfirmPpmChange, { ppm });
  }
  function phEmit(val) {
    ph = val.detail;
    openModal(ConfirmPhChange, { ph });
  }
</script>

<div class="row gap-50 shade1 border curve center wrap pa-20 grow">
  <Dial text="PPM" number={ppm} on:click={ppmEmit} />
  <Dial text="pH" number={ph} on:click={phEmit} decimal="100" />
</div>
