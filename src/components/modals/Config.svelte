<script>
  import Button from "comp/atoms/Button.svelte";
  import { closeModal } from "svelte-modals";
  import { clickOutside } from "./click-outside.js";

  import { scale } from "svelte/transition";
  import ws from "@/store/ws.js";
  import Checkbox from "comp/atoms/Checkbox.svelte";
  import Checkboxnew from "comp/atoms/Checkboxnew.svelte";
  export let isOpen;
  let _feederState = [];

  $: if ($ws.ws.state) {
    let arr = [];
    for (let i of Object.keys($ws.ws.state)) arr.push(i);
    _feederState = arr;
    //console.log(_feederState)
  }

  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  function isInteger(x) {
    return typeof x === "number" && isFinite(x) && Math.floor(x) === x;
  }

  function isFloat(x) {
    return !!(x % 1);
  }

  function saveFeederState() {
    let payload = { skipByHour: [] };
    for (let f of _feederState) {
      if (f == "skipByHour") continue;

      let e = document.getElementById(f);
      payload[f] = isInteger(e.value)
        ? parseInt(e.value)
        : isFloat(e.value)
          ? parseFloat(e.value)
          : e.value;
      console.log(`${f}:${e.value}`);
    }

    ws.updateConfig("feeder", payload);
  }

  function saveConfig(field) {
    let payload = { skipByHour: [] };
    for (let f of _feederState) {
      if (typeof _feederState[f] === "object" || Array.isArray(_feederState[f]))
        continue;

      let e = document.getElementById(f);
      payload[f] = isInteger(e.value)
        ? parseInt(e.value)
        : isFloat(e.value)
          ? parseFloat(e.value)
          : e.value;
      console.log(`${f}:${e.value}`);
    }
    ws.updateConfig("config", payload);
  }

  function patchState(event) {
    let field = event.currentTarget.getAttribute("id");
    console.log("Patching feederstate field");
    let e = document.getElementById(field);
    let res = isNumeric(e.value)
      ? parseInt(e.value)
      : isFloat(e.value)
        ? parseFloat(e.value)
        : e.value;

    let payload = {};
    payload[field] = res;
    ws.patchConfig("feeder", payload);
  }

  function patchConfig(event) {
    let field = event.currentTarget.getAttribute("id");
    console.log("Patching config", field);
    let e = document.getElementById(field);
    let res = isNumeric(e.value)
      ? parseInt(e.value)
      : isFloat(e.value)
        ? parseFloat(e.value)
        : e.value;

    let payload = {};
    payload[field] = res;
    ws.patchConfig("config", payload);
  }

  function findTapoIndexByName(nameToFind) {
    let tapos = $ws.ws.config.TAPOS
    const index = tapos.findIndex(tapo => tapo.name.toUpperCase() === nameToFind.toUpperCase());
    return index;
}

  function patchTapos(event) {
    let tapoName = event.currentTarget.getAttribute("id");
    console.log("Patching config", tapoName);
    let e = document.getElementById(tapoName);
    let res = isNumeric(e.value)
      ? parseInt(e.value)
      : isFloat(e.value)
        ? parseFloat(e.value)
        : e.value;

    let payload = { TAPOS: $ws.ws.config.TAPOS };
    let tapoIndex = payload.TAPOS.indexOf()
    payload.TAPOS[findTapoIndexByName(tapoName)] = {name: tapoName, IP: res};
    ws.patchConfig("config", payload);
    console.log("PatchTapos:", payload)
  }

  function close() {
    closeModal();
  }
</script>

{#if isOpen}
  <div
    role="dialog"
    class="flex modal center fixed p-center z-50 nopointer border w-8/12 lg:w-2/4 lg:top-2/4 rounded border-gray-600"
    style="height: 70vh"
    transition:scale={{ duration: 100, opacity: 0, start: 1.1 }}
    use:clickOutside
    on:click_outside={closeModal}
  >
    <div
      class="flex shade3 curve col w-full overflow-hidden autopointer h-full pa-15 gap-10"
    >
      <div
        class="flex body pa-15 pt-25 gap-5 col h-full overflow-y-scroll w-full"
        style="min-height:0;"
      >
        <div class="body row uppercase bold header-pretty items-center">
          <span class="font-20">Feeder Config</span>
        </div>
        <div class="col align-start center gap-2.5 font-10 pa-10 w-full">
          {#if $ws.ws.state}
            {#each Object.entries($ws.ws.state) as [name, val]}
              <div class="row align-center w-full break-words">
                <div
                  class="config-label w50 text-[0.5rem] lg:text-xs min-w-[50%]"
                >
                  {name}:
                </div>
                <input
                  type="text"
                  id={name}
                  class="config-input text-xs w-full lg:w-1/3"
                  value={val}
                  on:change={patchState}
                />
              </div>
            {/each}
          {/if}
        </div>
        <div class="body row uppercase bold header-pretty items-center">
          <span class="font-20">Chip Config</span>
        </div>
        <div class="col align-start center gap-2.5 font-10 pa-10">
          {#if $ws.ws.config}
            {#each Object.entries($ws.ws.config) as [fname, val]}
              {#if typeof val !== "object"}
                <div class="row align-center w-full break-words">
                  <div
                    class="config-label w50 text-[0.5rem] lg:text-xs min-w-[50%]"
                  >
                    {fname}:
                  </div>
                  <input
                    type="text"
                    class="config-input text-xs w-full lg:w-1/3"
                    id={fname}
                    value={val}
                    on:change={patchConfig}
                  />
                </div>
              {/if}
            {/each}
          {/if}
        </div>

        <div class="body row uppercase bold header-pretty items-center">
          <span class="font-20">Tapo IP Config</span>
        </div>
        <div class="col align-start center gap-2.5 font-10 pa-10">
          {#if $ws.ws.config}
            {#each $ws.ws.config.TAPOS as tapo}
              <div class="row align-center w-full break-words">
                <div
                  class="config-label w50 text-[0.5rem] lg:text-xs min-w-[50%]"
                >
                  {tapo.name}:
                </div>
                <input
                  type="text"
                  class="config-input text-xs w-full lg:w-1/3"
                  id={tapo.name}
                  value={tapo.IP}
                  on:change={patchTapos}
                />
              </div>
            {/each}
          {/if}
        </div>
      </div>

      <span class="ml-auto underline cursor-pointer" on:click={closeModal}
        >Cancel</span
      >
      <!-- <div class="actions flex flex-row shadex1 pa-25 gap-10">
                <Button block text="CLOSE" on:click={closeModal} />
            </div> -->
    </div>
  </div>
{/if}
