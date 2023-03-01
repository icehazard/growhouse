<script>
    import Button from "comp/atoms/Button.svelte";
    import {closeModal} from "svelte-modals";
    import {scale} from "svelte/transition";
    import ws from "@/store/ws.js";
    import Checkbox from "comp/atoms/Checkbox.svelte"
    import Checkboxnew from "comp/atoms/Checkboxnew.svelte"
    export let isOpen;
    let _feederState = [];

    $:  if ($ws.ws.state) {
        let arr = [];
        for (let i of Object.keys($ws.ws.state))
            arr.push(i)
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
        let payload = {skipByHour: []}
        for (let f of _feederState) {
            if (f == "skipByHour")
                continue;

            let e = document.getElementById(f);
            payload[f] = isInteger(e.value) ? parseInt(e.value) : (isFloat(e.value) ? parseFloat(e.value) : e.value);
            console.log(`${f}:${e.value}`)
        }

        ws.updateConfig("feeder", payload);
    }

    function saveConfig(field) {
        let payload = {skipByHour: []}
        for (let f of _feederState) {
            if (typeof _feederState[f] === 'object' || Array.isArray(_feederState[f]))
                continue;

            let e = document.getElementById(f);
            payload[f] = isInteger(e.value) ? parseInt(e.value) : (isFloat(e.value) ? parseFloat(e.value) : e.value);
            console.log(`${f}:${e.value}`)
        }
        ws.updateConfig("config", payload);
    }

    function patchState(event) {
        let field = event.currentTarget.getAttribute('id')
        console.log("Patching feederstate field",)
        let e = document.getElementById(field);
        let res = isNumeric(e.value) ? parseInt(e.value) : (isFloat(e.value) ? parseFloat(e.value) : e.value);

        let payload = {}
        payload[field] = res;
        ws.patchConfig("feeder", payload);
    }

    function patchConfig(event) {
        let field = event.currentTarget.getAttribute('id')
        console.log("Patching config", field)
        let e = document.getElementById(field);
        let res = isNumeric(e.value) ? parseInt(e.value) : (isFloat(e.value) ? parseFloat(e.value) : e.value);

        let payload = {}
        payload[field] = res;
        ws.patchConfig("config", payload);
    }

    function close() {
        closeModal()
    }
</script>

{#if isOpen}
    <div
            role="dialog"
            class="modal center fixed p-center z-4 nopointer border"
            transition:scale={{ duration: 100, opacity: 0, start: 1.1 }}
    >
        <div class="shade3 curve  gap-20 col w-400 overflow-hidden autopointer">

            <div class="body pa-25 pt-30 gap-20 col h-600 overflow-auto">
                <div class="body col">
                    <span class="font-20">Feeder Config</span>
                </div>
                <div class="col align-start center gap-10 font-10">
                    {#if $ws.ws.state}
                        {#each Object.entries($ws.ws.state) as [name, val]}
                            <div class="row align-center w100"><div class="config-label w50 font-11"> {name}: </div><input type="text" id={name} class="config-input" value={val}
                                                            on:change={patchState}/></div>
                        {/each}
                    {/if}
                </div>
                <div class="body col">
                    <span class="font-20">Chip Config</span>
                </div>
                <div class="col align-start center gap-10 font-10">
                    {#if $ws.ws.config}
                        {#each Object.entries($ws.ws.config) as [fname, val]}
                            {#if typeof val !== 'object'}
                                <div class="row align-center w100"> <div class="config-label w50 font-11">{fname}:</div><input type="text" class="config-input" id={fname} value={val}
                                                                 on:change={patchConfig}/></div>
                            {/if}
                        {/each}
                    {/if}
                </div>
            </div>
            <div class="actions row wrap shade2 pa-25 gap-10">
                <Button block text="CLOSE" on:click={close} />
            </div>
        </div>
    </div>
{/if}
