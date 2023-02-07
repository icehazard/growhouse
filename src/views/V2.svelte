<script>
    import Icon from "@iconify/svelte";
    import Gauge from "comp/atoms/Gauge.svelte";
    import Toggle from "svelte-toggle";
    import Terminal from "@/components/Home/Terminal.svelte";
    import Graph from "@/components/Home/Graph.svelte";
</script>

<div class="col h100 vh100 shade1">
    <div class="row h-100 shade2 " />
    <div class="row grow border curve align-center">
        <div class="grow align-center col gap-50 h-500">
            <div class="col gap-50 align-center h-250">
                <span class="weight-300 font-26 opacity-75">Nutrients</span>
                <Gauge />
                <div class="weight-300 font-12 opacity-75">ppm</div>
            </div>
            <div class="col w100 gap-10">
                <button class="row w100 px-20 gap-20 align-center">
                    <button class="center pa-10 shade3 round shine">
                        <Icon height="20" icon="clarity:cog-line" />
                    </button>
                    <div class="grow col gap-5">
                        <span class="font-14">Smart Dosing</span>
                        <span class="font-12 opacity-75"> Monitor and correct nutrient </span>
                    </div>
                    <div class="center">
                        <Toggle
                            hideLabel
                            switchColor="#eee"
                            toggledColor="#37C19B"
                            untoggledColor="#fa4d56"
                        />
                    </div>
                </button>
                <hr class="mx-10"/>
                <button class="row w100 px-20 gap-20 align-center">
                    <button class="center pa-10 round shine">
                        <Icon icon="lucide:pipette" />
                    </button>
                    <div class="grow col gap-5">
                        <span class="font-14">Manual Dosing</span>
                        <span class="font-12 opacity-75">Dose nutrient manually</span>
                    </div>
                    <div class="center">
                        <Icon icon="carbon:chevron-right" />
                    </div>
                </button>
            </div>
        </div>
        <hr class=" h100 " />
        <div class="grow align-center col gap-50 h-500">
            <div class="col gap-50 align-center h-250">
                <span class="weight-300 font-26  opacity-75">pH</span>
                <Gauge />
                <div class="weight-300 font-12 opacity-75">pH scale</div>
            </div>
            <div class="col w100 gap-10">
                <div class="row w100 px-20 gap-20">
                    <button class="center pa-10 shade3 round shine">
                        <Icon height="20" icon="clarity:cog-line" />
                    </button>
                    <div class="grow col gap-5">
                        <span class="font-14">Smart Dosing</span>
                        <span class="font-12 opacity-75"> Monitor and correct pH level </span>
                    </div>
                    <div class="center">
                        <Toggle
                            hideLabel
                            switchColor="#eee"
                            toggledColor="#37C19B"
                            untoggledColor="#fa4d56"
                        />
                    </div>
                </div>
                <hr class="mx-10"/>
                <button class="row w100 px-20 gap-20 align-center">
                    <button class="center pa-10 round shine">
                        <Icon icon="lucide:pipette" />
                    </button>
                    <div class="grow col gap-5">
                        <span class="font-14">Manual Dosing</span>
                        <span class="font-12 opacity-75">Dose pH manually</span>
                    </div>
                    <div class="center">
                        <Icon icon="carbon:chevron-right" />
                    </div>
                </button>
            </div>
        </div>
        <hr class=" h100 " />
        <!-- <div class="grow align-center col gap-50 h-500">
            <span class="weight-300 font-22 opacity-75">VPD</span>
            <Gauge />
            <div class="weight-300 font-12 opacity-75">Percent</div>
        </div>
        <hr class="border my-50" /> -->
        <div class="grow align-center col gap-50 h-500">
            <div class="col gap-40 align-center h-250">
                <span class="weight-300 font-26  opacity-75">Water</span>
                <section><span class="loader" /></section>
                <div class="weight-300 font-12 opacity-75">Percent</div>
            </div>
            <div class="col w100 gap-10">
                <div class="row w100 px-20 gap-20">
                    <button class="center pa-10 shade3 round shine">
                        <Icon height="20" icon="clarity:cog-line" />
                    </button>
                    <div class="grow col gap-5">
                        <span class="font-14">Feeding schedule</span>
                        <span class="font-12 opacity-75"> Auto Feeding schedule </span>
                    </div>
                    <div class="center">
                        <Toggle
                            hideLabel
                            switchColor="#eee"
                            toggledColor="#37C19B"
                            untoggledColor="#fa4d56"
                        />
                    </div>
                </div>
                <hr class="mx-10" />
                <div class="row w100 px-20 gap-20">
                    <button class="center pa-10 shade3 round shine">
                        <Icon height="20" icon="clarity:cog-line" />
                    </button>
                    <div class="grow col gap-5">
                        <span class="font-14">Auto-adjust level</span>
                        <span class="font-12 opacity-75">Maintain res water level at a fixed point</span>
                    </div>
                    <div class="center">
                        <Toggle
                            hideLabel
                            switchColor="#eee"
                            toggledColor="#37C19B"
                            untoggledColor="#fa4d56"
                        />
                    </div>
                </div>
                <hr />
                <button class="row w100 px-20 gap-20 align-center">
                    <button class="center pa-10 round shine">
                        <Icon icon="lucide:pipette" />
                    </button>
                    <div class="grow col gap-5">
                        <span class="font-14">Manual </span>
                        <span class="font-12 opacity-75">Manual options</span>
                    </div>
                    <div class="center">
                        <Icon icon="carbon:chevron-right" />
                    </div>
                </button>
            </div>
        </div>
        <hr class="border my-50" />
    </div>
    <div class="row h-200 shade2 overflow-hidden">
        <div class="grow row ">
            <Terminal />
        </div>
        <div class="grow">
            <!-- <Graph /> -->
        </div>
    </div>
</div>

<style>
    .loader {
        width: 50px;
        height: 100px;
        display: inline-block;
        position: relative;
        border: 2px solid var(--shade3);
        animation: fill 2s linear infinite alternate;
        color: #37c19b;
    }

    @keyframes fill {
        0% {
            box-shadow: 0 0 inset;
        }

        100% {
            box-shadow: 0 -100px inset;
        }
    }
</style>
