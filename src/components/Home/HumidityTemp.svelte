<script>
    import Icon from "@iconify/svelte";
    import { openModal } from "svelte-modals";
    import Graph from "comp/modals/Graph";
    import ws from "@/store/ws";
    
    const TEMP_DIFF = 5;
    
    function humidityRangeFinder(tmp, humi) {
        humi = Math.round(humi)
        let res = {prop: [], eflv: [], flower: []}
        for (let i = 0; i <= 100; i += 1) {
            const vpsat = (610.78 * Math.pow(10, (7.5 * (tmp + TEMP_DIFF)) / ((tmp + TEMP_DIFF) + 237.3))) / 1000
            const vpair = ((610.78 * Math.pow(10, (7.5 * tmp) / (tmp + 237.3))) / 1000) * (i / 100)
            const vpd = vpsat - vpair

            if (vpd >= 0.4 && vpd < 0.8) res.prop.push(i)
            else if (vpd >= 0.8 && vpd < 1.2) res.eflv.push(i)
            else if (vpd >= 1.2 && vpd < 1.6) res.flower.push(i)
        }
        if ( res.prop[0] <= humi  && humi <= res.prop[res.prop.length - 1]) return ['Seedling', res.prop[0], res.prop[res.prop.length - 1]  ]
        if ( res.eflv[0] <= humi  && humi <= res.eflv[res.eflv.length - 1]) return ['Vegetative', res.eflv[0], res.eflv[res.eflv.length - 1]  ]
        if ( res.flower[0] <= humi  && humi <= res.flower[res.flower.length - 1]) return  ['Flowering', res.flower[0], res.flower[res.flower.length - 1]  ]
        return ['-', 0, 0]
    }

    let info;
    $: $ws.ws.tempC, info = humidityRangeFinder($ws.ws.tempC, $ws.ws.humi)
</script>

<div class="grow row ">
    <div class="row grow pa-20 gap-10">
        <div class="col gap-2.5">
            <div class="row center gap-2.5">
                <Icon icon="carbon:temperature-celsius" height="24" class="primary--text" />
                <h1 class="weight-300 opacity-75">Temperature</h1>
            </div>
            <hr class="w100 border" />
            <div class="row align-center gap-2.5">
                <Icon
                    icon="material-symbols:nest-multi-room-outline"
                    height="24"
                    class="primary--text"
                />
                <span class="opacity-75 font-14 w-80">Room</span>
                <span>{$ws.ws.tempC?.toFixed(2) || 0} °C </span>
            </div>
            <div class="row align-center gap-2.5">
                <Icon icon="ph:leaf" height="24" class="primary--text" />
                <span class="opacity-75 font-14 w-80">Leaf</span>
                <span>{$ws.ws.tempC + 0.5 || 0} °C</span>
            </div>
            <div class="row align-center gap-2.5">
                <Icon icon="mdi:water-outline" height="24" class="primary--text" />
                <span class="opacity-75 font-14 w-80">Water</span>
                <span>{$ws.ws.waterTempC?.toFixed(2) || 0} °C</span>
            </div>
        </div>
        <hr class="h100 border" />
        <div class="col gap-2.5">
            <div class="row enter gap-2.5">
                <Icon
                    icon="material-symbols:humidity-percentage-outline"
                    height="24"
                    class="primary--text"
                />
                <h1 class="weight-300 opacity-75">Humidity</h1>
            </div>
            <hr class="w100 border" />
            <div class="row align-center gap-2.5">
                <Icon
                    icon="material-symbols:nest-multi-room-outline"
                    height="24"
                    class="primary--text"
                />
                <span class="opacity-75 font-14 w-80">Room</span>
                <span>{$ws.ws.humi?.toFixed(2) || 0} %</span>
            </div>
            <div class="row align-center gap-2.5">
                <Icon icon="fluent:target-24-regular" height="24" class="primary--text" />
                <span class="opacity-75 font-14 w-80">Optimal</span>
                <span>{info[0]}</span>
            </div>
            <div class="row align-center gap-2.5">
                <Icon icon="uil:slider-h-range" height="24" class="primary--text" />
                <span class="opacity-75 font-14 w-80">Range</span>
                <span>{info[1]}%-{info[2]}%</span>
            </div>
        </div>
    </div>
    <button
        class="h100 ratio-1-1 col gap-5 shade3 center shadow shine"
        on:click={() => openModal(Graph)}
    >
        <Icon class="opacity-75" color="var(--primary)" icon="bi:graph-up" width="50" />
        <span class="weight-300 primary--text font-20 opacity-75">Graph</span>
    </button>
</div>
