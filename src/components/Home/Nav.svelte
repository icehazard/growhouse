<script>
    import Icon from "@iconify/svelte";
    import { openModal } from "svelte-modals";
    import Tapo from "comp/modals/Tapo.svelte";
</script>

<div class="row h-100 shade2 justify-end pa-30 gap-30">
    <button on:click={() => openModal(Tapo)}>
        <Icon height="20" icon="simple-icons:tplink" />
    </button>
    <button>
        <Icon height="20" icon="mdi:mixer-settings" />
    </button>
    <button>
        <Icon height="20" icon="clarity:cog-line" />
    </button>
    <button>
        <Icon height="20" icon="ic:twotone-restart-alt" />
    </button>
</div>
