<script>
  import Dial from "../atoms/Dial.svelte";
  import { openModal } from "svelte-modals";
  import ConfirmPhChange from "../modals/ConfirmPhChange.svelte";
  import ConfirmPpmChange from "../modals/ConfirmPpmChange.svelte";
  import ws from '@/store/ws.js'

  let ph = 50;
  let ppm = 500;

  function ppmEmit(val) {
    ppm = val.detail;
    openModal(ConfirmPpmChange, { ppm });
  }
  function phEmit(val) {
    ph = val.detail;
    openModal(ConfirmPhChange, { ph });
    
  }
</script>

<div class="col gap-20">
  <h4 class="weight-300">pH / PPM Controller</h4>
  <div class="row gap-50  border curve center wrap pa-20">
    <Dial text="PPM" number={ppm} on:tap={ppmEmit} />
    <Dial text="pH" number={ph} on:tap={phEmit} decimal="100" />
  </div>
  <button class="shade5" value="RUN TEST" on:click={ws.runTest}>RUN TEST</button>
</div>


