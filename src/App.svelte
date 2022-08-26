<script>
	import Router from "svelte-spa-router";
	import routes from "./router/index";
	import { fade } from "svelte/transition";
	import { Modals, closeModal } from "svelte-modals";
	import { Notifications, acts } from "@tadashi/svelte-notification";
	import MediaQuery from "@/assets/library/MediaQuery.svelte";

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
	<MediaQuery />
	<Modals>
		<div
			transition:fade={{ duration: 100 }}
			on:click={() => closeModal()}
			slot="backdrop"
			class="backdrop fixed p-center z-4 vh100 w100 nopointer"
		/>
	</Modals>
	<Router {routes} />

	<Notifications />
	<!-- <ConfirmPhChange isOpen={$modal.editPH} />
	<ConfirmPpmChange isOpen={$modal.editPPM}/> -->
</section>

<style>
	.backdrop {
		background: rgba(0, 0, 0, 0.15);
		backdrop-filter: blur(5px);
	}
</style>
