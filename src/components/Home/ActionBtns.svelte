<script>
    import ws from "@/store/ws.js";
    import Icon from "@iconify/svelte";
    import Toggle from "svelte-toggle";
    import dayjs from "dayjs";
    import { openModal } from "svelte-modals";

    import RunPumpById from "comp/modals/RunPumpById.svelte";
    import Config from "comp/modals/Config";
    import Tapos from "comp/modals/Tapo";
    import Recipe from "comp/modals/Recipe";
    import Feed from "comp/modals/Feed";
    import RObyTime from "comp/modals/RObyTime";

    import DiluteTo from "comp/modals/DiluteTo";

    var relativeTime = require("dayjs/plugin/relativeTime");
    dayjs.extend(relativeTime);

    let adjustPPMOn,
        adjustPHOn,
        adjustWaterOn,
        feedScheduleOn,
        autoDosing = false;
    let col = "var(--primary)";
    let hoursArray = [];
    let nextFeeds = [];
    let nextFeed = "";
    $: {
        if ($ws.ws.hasOwnProperty("state")) {
            feedScheduleOn = $ws.ws.state ? $ws.ws.state.FEED_STATE : false;
            adjustPPMOn = $ws.ws.state ? $ws.ws.state.ADJUST_PPM : false;
            adjustPHOn = $ws.ws.state ? $ws.ws.state.ADJUST_PH : false;
            adjustWaterOn = $ws.ws.state ? $ws.ws.state.ADJUST_WATER : false;
            autoDosing = $ws.ws.state ? $ws.ws.state.AUTO_DOSING : false;

            hoursArray = [];

            let start = dayjs().startOf("day");
            for (
                let i = $ws.ws.state.FTG_START_HOUR;
                i < $ws.ws.state.FTG_END_HOUR;
                i += $ws.ws.state.FEED_EVERY_X_HOURS
            ) {
                hoursArray.push(i);

                let next = start.add(i + 3, "hour");
                nextFeeds.push(next.fromNow());
                //console.log(next.fromNow())
            }

            nextFeed = nextFeeds.filter((i) => i.indexOf("ago") === -1)[0];

            if (!nextFeed || !nextFeed.length) {
                //let first = nextFeeds[0]
                let next = dayjs()
                    .startOf("day")
                    .add(1, "day")
                    .add($ws.ws.state.FGN_START_HOUR, "hour");
                nextFeed = next.fromNow();
            }
        }
    }

    function runCommand(cmd) {
        ws.cmd(cmd);
    }

    function runCommandMiddleman(cmd) {
        ws.cmdMiddleman(cmd);
    }

    function flipSchedule() {
        //feedScheduleOn = !feedScheduleOn;
    }

    // $: {
    //     feedScheduleOn, al()
    // }
    function adjustSchedule() {
        ws.cmdMiddleman(feedScheduleOn ? "feedScheduleOff" : "feedScheduleOn");
    }

    function autoDosingSchedule() {
        ws.cmdMiddleman(autoDosing ? "autoDosingOff" : "autoDosingOn");
    }

    function adjustPH() {
        ws.cmdMiddleman(adjustPHOn ? "adjustPHOff" : "adjustPHOn");
    }

    function adjustPPM() {
        ws.cmdMiddleman(adjustPPMOn ? "adjustPPMOff" : "adjustPPMOn");
    }

    function adjustWater() {
        ws.cmdMiddleman(adjustWaterOn ? "adjustWaterOff" : "adjustWaterOn");
    }
</script>

<div class="row gap-5 shade1 border curve wrap pa-20 grow center">
    <div class="row align-center wrap gap-2.5">
        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                value="RESTART"
                on:click={() => runCommand("restart")}
            >
                <Icon color={col} icon="ic:twotone-restart-alt" height="45" />
            </button>
            <span class="font-14 opacity-75">Restart</span>
        </div>
        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                value="FEED"
                on:click={() => openModal(Feed)}
            >
                <Icon color={col} icon="mdi:food-apple-outline" width="45" />
            </button>
            <span class="font-14 opacity-75">FEED</span>
        </div>
        <div class="col center gap-2.5">
            <button
            class="h-100 shade3 w-100 center curve shadow fast shine"
            value="ROBYTIME"
            on:click={() => openModal(RObyTime)}
            class:borderPrimary={$ws.ws["TAPO_STATUS"]
            ? $ws.ws["TAPO_STATUS"]["RO"] == 1
            : false}
        >
                <Icon color={col} icon="mdi:water-plus-outline" width="45" />
            </button>
            <span class="font-14 opacity-75">Add water</span>
        </div>
        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => runCommandMiddleman("restart")}
            >
                <Icon
                    color={col}
                    icon="ant-design:info-circle-outlined"
                    width="45"
                />
            </button>
            <span class="font-14 opacity-75">Restart Web</span>
        </div>
        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => runCommand("fetchConfig")}
            >
                <Icon color={col} icon="ion:cog-sharp" width="45" />
            </button>
            <span class="font-14 opacity-75">FETCH CONF</span>
        </div>

        <!-- <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => runCommandMiddleman("fixtank")}
            >
                <Icon color={col} icon="game-icons:auto-repair" width="45" />
            </button>
            <span class="font-14 opacity-75">Fix Tank PH/EC</span>
        </div> -->
        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => runCommandMiddleman("bottle")}
            >
                <Icon
                    color={col}
                    icon="fluent:drink-bottle-32-regular"
                    width="45"
                />
            </button>
            <span class="font-14 opacity-75">REF 2L BOTTLE</span>
        </div>
        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => runCommandMiddleman("bottle", 120e3)}
            >
                <Icon
                    color={col}
                    icon="fluent:drink-bottle-32-regular"
                    width="45"
                />
            </button>
            <span class="font-14 opacity-75">REF 1L BOTTLE</span>
        </div>

        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => runCommandMiddleman("bottle", 120e3 * 10)}
            >
                <Icon
                    color={col}
                    icon="fluent:drink-bottle-32-regular"
                    width="45"
                />
            </button>
            <span class="font-14 opacity-75">REF 10L BOTTLE</span>
        </div>

        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => runCommandMiddleman("bottle", 120e3 * 20)}
            >
                <Icon
                    color={col}
                    icon="fluent:drink-bottle-32-regular"
                    width="45"
                />
            </button>
            <span class="font-14 opacity-75">REF 20L BOTTLE</span>
        </div>

        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => runCommand("romoff")}
            >
                <Icon color={col} icon="mdi:pump-off" width="45" />
            </button>
            <span class="font-14 opacity-75">ROMOFF</span>
        </div>
        
        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => openModal(RunPumpById)}
            >
                <Icon color={col} icon="game-icons:fizzing-flask" width="45" />
            </button>
            <span class="font-14 opacity-75">RUN SPEC PUMP</span>
        </div>

        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => openModal(Config)}
            >
                <Icon
                    color="gray"
                    icon="icon-park-twotone:setting-two"
                    width="45"
                />
            </button>
            <span class="font-14 opacity-75">Config</span>
        </div>

        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => openModal(Tapos)}
            >
                <Icon color="white" icon="mdi:plug-socket-us" width="45" />
            </button>
            <span class="font-14 opacity-75">Tapos</span>
        </div>

        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => openModal(Recipe)}
            >
                <Icon color={col} icon="twemoji:scroll" width="45" />
            </button>
            <span class="font-14 opacity-75">Auto-dosing Recipe</span>
        </div>

        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                on:click={() => ws.cmd("update")}
            >
                <Icon color={col} icon="icon-park:update-rotation" width="45" />
            </button>
            <span class="font-14 opacity-75">Update</span>
        </div>

        <div class="col center gap-2.5">
            <button
                class="h-100 shade3 w-100 center curve shadow fast shine"
                value="Dilute"
                on:click={() => openModal(DiluteTo)}
            >
                <Icon color={col} icon="emojione-v1:divide" width="45" />
            </button>
            <span class="font-14 opacity-75">Dilute</span>
        </div>
    </div>

    <div class="row gap-5 shade1 border curve wrap pa-20 grow w-full">
        <!--        <div class="col center gap-2.5">-->
        <!--            {#if $ws.ws && $ws.ws.state && $ws.ws.state.hasOwnProperty("ADJUST_PPM")}-->
        <!--                <Toggle-->
        <!--                        label="Fix PPM"-->
        <!--                        switchColor="#eee"-->
        <!--                        toggledColor="#24a148"-->
        <!--                        untoggledColor="#fa4d56"-->
        <!--                        on="On"-->
        <!--                        off="Off"-->
        <!--                        bind:toggled={adjustPPMOn}-->
        <!--                        on:click={adjustPPM}-->
        <!--                />-->
        <!--            {/if}-->
        <!--        </div>-->
        <!--        <div class="col center gap-2.5">-->
        <!--            {#if $ws.ws && $ws.ws.state && $ws.ws.state.hasOwnProperty("ADJUST_PH")}-->
        <!--                <Toggle-->
        <!--                        label="Fix PH"-->
        <!--                        switchColor="#eee"-->
        <!--                        toggledColor="#24a148"-->
        <!--                        untoggledColor="#fa4d56"-->
        <!--                        on="On"-->
        <!--                        off="Off"-->
        <!--                        bind:toggled={adjustPHOn}-->
        <!--                        on:click={adjustPH}-->
        <!--                />-->
        <!--            {/if}-->
        <!--        </div>-->
        <!--        <div class="col center gap-2.5">-->
        <!--            {#if $ws.ws && $ws.ws.state && $ws.ws.state.hasOwnProperty("ADJUST_WATER")}-->
        <!--                <Toggle-->
        <!--                        label="Add Water"-->
        <!--                        switchColor="#eee"-->
        <!--                        toggledColor="#24a148"-->
        <!--                        untoggledColor="#fa4d56"-->
        <!--                        on="On"-->
        <!--                        off="Off"-->
        <!--                        bind:toggled={adjustWaterOn}-->
        <!--                        on:click={adjustWater}-->
        <!--                />-->
        <!--            {/if}-->
        <!--        </div>-->
        <div class="col center gap-2.5">
            {#if $ws.ws && $ws.ws.state && $ws.ws.state.hasOwnProperty("AUTO_DOSING")}
                <Toggle
                    label="Auto Dosing"
                    switchColor="#eee"
                    toggledColor="#24a148"
                    untoggledColor="#fa4d56"
                    on="On"
                    off="Off"
                    bind:toggled={autoDosing}
                    on:click={autoDosingSchedule}
                />
            {/if}
        </div>
        <div class="col center gap-2.5">
            {#if $ws.ws && $ws.ws.state && $ws.ws.state.hasOwnProperty("FEED_STATE")}
                <Toggle
                    label="Feeding schedule"
                    switchColor="#eee"
                    toggledColor="#24a148"
                    untoggledColor="#fa4d56"
                    on="On"
                    off="Off"
                    bind:toggled={feedScheduleOn}
                    on:click={adjustSchedule}
                />
            {/if}
        </div>
        <div class="col center gap-2.5 w-full">
            {#if $ws.ws && $ws.ws.state && $ws.ws.state.hasOwnProperty("FEED_STATE")}
                <div class="w-full break-words">
                    Feeding hours are: {hoursArray}
                </div>
                <br />
                Feed duration is set to {$ws.ws.state.RUN_DURATION / 1000} secs
                <br />
                <!-- Next feed in: {$ws.ws.state.FEED_STATE > 0 ? nextFeed : "automatic feeding is off"} -->
            {/if}
        </div>
    </div>
</div>

<style>
    button:focus-visible {
        filter: brightness(1.2);
    }

    button:active {
        box-shadow: none;
        filter: brightness(0.98);
    }
</style>
