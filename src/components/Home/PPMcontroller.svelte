<script>
  import Dial from "../atoms/Dial.svelte";

  function ppmEmit(val) {
    console.log("ppm", val.detail);
  }
  function phEmit(val) {
    console.log("pH", val.detail);
  }
</script>

<div class="col gap-20">
  <h4 class="weight-300">pH / PPM Controller</h4>
  <div class="row gap-50  border curve center wrap pa-20">
    <Dial text="PPM" number="500" on:tap={ppmEmit} />
    <Dial text="pH" number="570" on:tap={phEmit} decimal="100" />
  </div>
</div>

<style>
</style>
