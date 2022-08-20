<script>
	import Router from "svelte-spa-router";
	import routes from "./router/index";
	import { fade } from "svelte/transition";
	import { Modals, closeModal } from "svelte-modals";
	// import "@/store/ws.js";
	import { Notifications, acts } from "@tadashi/svelte-notification";
	import ConfirmPhChange from "comp/modals/ConfirmPhChange.svelte";
  import ConfirmPpmChange from "comp/modals/ConfirmPpmChange.svelte";
  import modal from '@/store/modal.js'

	function add(notification) {
		return () => {
			acts.add(notification);
		};
	}

	let triggers = [
		{ mode: "normal", message: "Nothing to say...", lifetime: 2 },
		{ mode: "success", message: "Nice!!" },
		{ mode: "info", message: "Leve a japona" },
		{ mode: "warn", message: "Piso escorregadio" },
		{ mode: "danger", message: "Alta tensão" },
	];
</script>

<section class="col vh100">
	<Router {routes} />
	<Modals>
		<div
			transition:fade={{ duration: 100 }}
			on:click={() => closeModal()}
			slot="backdrop"
			class="backdrop fixed p-center z-4 vh100 w100"
		/>
	</Modals>
	<Notifications />
	<ConfirmPhChange isOpen={$modal.editPH} />
	<ConfirmPpmChange isOpen={$modal.editPPM}/>
</section>

<style>
	.backdrop {
		background: rgba(0, 0, 0, 0.15);
		backdrop-filter: blur(5px);
	}
</style>
