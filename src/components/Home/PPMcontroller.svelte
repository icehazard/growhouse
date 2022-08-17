<script>
  import Dial from "../atoms/Dial.svelte";
  import { openModal } from "svelte-modals";
  import ConfirmPhChange from "comp/modals/ConfirmPhChange.svelte";
  import ConfirmPpmChange from "comp/modals/ConfirmPpmChange.svelte";
  import ws from '@/store/ws.js'
  import modal from '@/store/modal.js'

  let ph = 580;
  let ppm = 580;

  function ppmEmit(val) {
    ppm = val.detail;
    $modal.editPPM = true;
  }
  function phEmit(val) {
    ph = val.detail;
    console.log("🚀 ~ ph", ph)
    //openModal(ConfirmPhChange, { ph });
    $modal.editPH = true
    
  }
  function test(cmd) {
    ws.cmd(cmd);
  }
</script>

<div class="col gap-20">
  <h4 class="weight-300">pH / PPM Controller</h4>
  <div class="row gap-50  border curve center wrap pa-20">
    <Dial text="PPM" number={ppm} on:tap={ppmEmit} />
    <Dial text="pH" number={ph} on:tap={phEmit} decimal="100" />
  </div>

<!--  dawg dont touch this below-->
<!--  <button class="shade5" value="RUN ON" on:click={() => test("on")}>RUN ON</button>-->
<!--  <button class="shade5" value="RUN OFF" on:click={() => test("off")}>RUN OFF</button>-->
<button class="shade5" value="RESTART" on:click={() => test("restart")}>RESTART</button>
  <button class="shade5" value="TEST NOTIF" on:click={() => test("notif")}>TEST NOTIF</button>

</div>


