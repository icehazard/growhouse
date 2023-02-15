<script>
    import Icon from "@iconify/svelte";
    import {Pulse} from "svelte-loading-spinners";
    import "@lottiefiles/lottie-player";
    import _ from "lodash"
    import glass from '@/assets/lottie/glass.json'

    export let state = {};
    export let tankPerc = 0;

    function vpd(tmp, hmd, airtemp) {
        const vpsat = (610.78 * Math.pow(10, (7.5 * tmp) / (tmp + 237.3))) / 1000
        const vpair = ((610.78 * Math.pow(10, (7.5 * airtemp) / (airtemp + 237.3))) / 1000) * (hmd / 100)
        const vpd = vpsat - vpair
        console.log(vpd)
        // const swv = (217 * vp) / (tmp + 273.15)
        // amount of saturated water vapor
        //const vpd = ((100 - hmd) * swv) / 100
    }

    const TEMP_DIFF = 2.8;

    function vpdt(tmp) {
        let res = {prop: [], eflv: [], flower: []}
        for (let i = 0; i <= 100; i += 1) {
            const vpsat = (610.78 * Math.pow(10, (7.5 * (tmp + TEMP_DIFF)) / ((tmp + TEMP_DIFF) + 237.3))) / 1000
            const vpair = ((610.78 * Math.pow(10, (7.5 * tmp) / (tmp + 237.3))) / 1000) * (i / 100)
            const vpd = vpsat - vpair

            if (vpd >= 0.4 && vpd < 0.8)
                res.prop.push(i)
            else if (vpd >= 0.8 && vpd < 1.2)
                res.eflv.push(i)
            else if (vpd >= 1.2 && vpd < 1.6)
                res.flower.push(i)
            //console.log({vpsat, vpair, vpd})
        }

        res.prop = [res.prop[0] ? res.prop[0] : 100, res.prop[res.prop.length - 1] ? res.prop[res.prop.length - 1] : 100]
        res.eflv = [res.eflv[0] ? res.eflv[0] : 100, res.eflv[res.eflv.length - 1] ? res.eflv[res.eflv.length - 1] : 100]
        res.flower = [res.flower[0] ? res.flower[0] : 100, res.flower[res.flower.length - 1] ? res.flower[res.flower.length - 1] : 100]

        return res
        // const swv = (217 * vp) / (tmp + 273.15)
        // amount of saturated water vapor
        //const vpd = ((100 - hmd) * swv) / 100
    }

    let info;
    //Veg/Early FL: {vpdt(state.tempC).eflv[0]} - {vpdt(state.tempC).eflv[1]}
    $: state.tempC, info = vpdt(state.tempC);

</script>
{#if state.tempC}
    <div class="col gap-20">
        <div class="row curve w100 wrap gap-10 text">
            <Icon icon="carbon:humidity" width="20"/>
            Ideal RH based on <b>{state.tempC}°C</b> air temp and <b>{state.tempC + TEMP_DIFF}°C</b> leaf temp
            <Icon icon="mdi:sprout" width="18" color="yellow" title="Seedling stage"/> {info.prop[0]}%-{info.prop[1]}%
            <Icon icon="mdi:cannabis" width="20" color="lightgreen" title="Late veg & Early flowering"/> {info.eflv[0]}%-{info.eflv[1]}%
            <Icon icon="fa6-solid:cannabis" color="green" title="Flowering stage" width="20"/>{info.flower[0]}%-{info.flower[1]}%
        </div>
    </div>
{/if}
<div class="col gap-20 text-center">
    <div class="row border pa-20 gap-50 curve w100 wrap shade1">
        <div class="col align-center gap-10 grow space-between">
            <Icon icon="carbon:humidity" height="24" class="primary--text"/>
            {#if state.hasOwnProperty("humi") && Number.isFinite(state.humi) && state.humi}
                <span>{state.humi.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20"/>
            {/if}
            <span class="opacity-75 font-14">Humidity</span>
        </div>
        <div class="col align-center gap-10 grow space-between">
            <Icon icon="carbon:temperature-celsius" height="24" class="primary--text"/>
            {#if state.hasOwnProperty("tempC") && state.tempC}
                <span>{state.tempC.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20"/>
            {/if}
            <span class="opacity-75 font-14">Room Temp</span>
        </div>
        <div class="col align-center gap-10 grow space-between">
            <Icon icon="carbon:temperature-celsius" height="24" class="primary--text"/>
            {#if state.hasOwnProperty("waterTempC")}
                <span>{state.waterTempC.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20"/>
            {/if}
            <span class="opacity-75 font-14">Water Temp</span>
        </div>
        <div class="col align-center gap-10 grow space-between">
            {#if state["ppmstate"] == 1}
                <lottie-player loop autoplay mode="normal"
                               src="https://assets4.lottiefiles.com/packages/lf20_9jXVOI.json" style="width: 80px"/>
            {:else }
                <Icon icon="eos-icons:science-outlined" height="24" class="primary--text"/>
            {/if}
            {#if state.hasOwnProperty("currentPPM")}
                <span>{state.currentPPM}</span>
            {:else}
                <Pulse color="var(--primary)" size="20"/>
            {/if}
            <span class="opacity-75 font-14">PPM</span>
        </div>


        <div class="col align-center gap-10 grow space-between">

            {#if state["TAPO_STATUS"] && state["TAPO_STATUS"]["RO"]}
                <lottie-player loop autoplay mode="normal" src={JSON.stringify(glass)} style="width: 50px"/>
            {:else }
                <Icon icon="fa6-solid:glass-water-droplet" height="24" class="primary--text"/>
            {/if}

            {#if tankPerc}
                <span>{tankPerc.toFixed(1)}%</span>
            {:else}
                <Pulse color="var(--primary)" size="20"/>
            {/if}
            <span class="opacity-75 font-14">Water Tank</span>
        </div>

        <div class="col align-center gap-10 grow space-between">
            <Icon icon="carbon:humidity" height="24" class="primary--text"/>
            {#if state.hasOwnProperty("waterSensorVal")}
                <span>{state.waterSensorVal.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20"/>
            {/if}
            <span class="opacity-75 font-14">Water Sens</span>
        </div>

        <div class="col align-center gap-10 grow space-between">
            <Icon icon="eos-icons:science-outlined" height="24" class="primary--text"/>
            {#if state.hasOwnProperty("ph") && state.ph}
                <span>{state.ph.toFixed(2)}</span>
            {:else}
                <Pulse color="var(--primary)" size="20"/>
            {/if}
            <span class="opacity-75 font-14">PH</span>
        </div>
    </div>
</div>
