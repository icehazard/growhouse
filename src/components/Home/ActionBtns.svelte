<script>
    import ws from "@/store/ws.js";
    import Icon from "@iconify/svelte";
    import Toggle from "svelte-toggle";

    let feedScheduleOn = false;
    let col = "var(--primary)";

    function runCommand(cmd) {
        ws.cmd(cmd);
    }
    function runCommandMiddleman(cmd) {
        ws.cmdMiddleman(cmd);
    }
    function flipSchedule() {
        console.log("Flipping schedule")
        ws.cmdMiddleman($ws.ws.state.FEED_STATE == "feedScheduleOn" ? "feedScheduleOff" : "feedScheduleOn");
    }
</script>

<div class="row gap-20 shade1 border curve wrap pa-20 grow center">
    <div class="col center gap-10">
        <button
            class="h-100 shade3 w-100 center curve shadow fast shine"
            value="RESTART"
            on:click={() => runCommand("restart")}
        >
            <Icon color={col} icon="ic:twotone-restart-alt" height="30" />
        </button>
        <span class="font-14 opacity-75">Restart</span>
    </div>
    <div class="col center gap-10">
        <button
            class="h-100 shade3 w-100 center curve shadow fast shine"
            value="TEST NOTIF"
            on:click={() => runCommand("notif")}
        >
            <Icon color={col} icon="akar-icons:bell" width="25" />
        </button>
        <span class="font-14 opacity-75">Test Notification</span>
    </div>
    <div class="col center gap-10">
        <button class="h-100 shade3 w-100 center curve shadow fast shine" on:click={() => runCommand("on") } class:borderPrimary={$ws.ws.RO_ON}>
            <Icon color={col} icon="mdi:water-plus-outline" width="30" />
        </button>
        <span class="font-14 opacity-75">Refill Tank</span>
    </div>
    <div class="col center gap-10">
        <button class="h-100 shade3 w-100 center curve shadow fast shine" on:click={() => runCommand("dinfo")}>
            <Icon color={col} icon="ant-design:info-circle-outlined" width="30" />
        </button>
        <span class="font-14 opacity-75">DINFO</span>
    </div>
    <div class="col center gap-10">
        <button
            class="h-100 shade3 w-100 center curve shadow fast shine"
            on:click={() => runCommand("fetchConfig")}
        >
            <Icon color={col} icon="ion:cog-sharp" width="30" />
        </button>
        <span class="font-14 opacity-75">FETCH CONF</span>
    </div>
    <div class="col center gap-10">
        <button
            class="h-100 shade3 w-100 center curve shadow fast shine"
            on:click={() => runCommand("romoff")}
        >
            <Icon color={col} icon="healthicons:running-water-outline" width="30" />
        </button>
        <span class="font-14 opacity-75">ROMOFF</span>
    </div>
    <div class="col center gap-10">
        <button
            class="h-100 shade3 w-100 center curve shadow fast shine"
            on:click={() => runCommand("feedinfo")}
        >
            <Icon color={col} icon="fluent:food-20-regular" width="30" />
        </button>
        <span class="font-14 opacity-75">FEEDINFO</span>
    </div>
    <div class="col center gap-10">
        {#if $ws.ws.state.FEED_STATE}
            <Toggle
                    label="Feeding schedule"
                    switchColor="#eee"
                    toggledColor="#24a148"
                    untoggledColor="#fa4d56"
                    on="On"
                    off="Off"
                    bind:toggled={$ws.ws.state.FEED_STATE}
                    on:toggle={flipSchedule}
            />
        {/if}
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
