<script>
	import Router from "svelte-spa-router";
	import routes from "./router/index";
	import { fade } from "svelte/transition";
	import { Modals, closeModal } from "svelte-modals";
	import "@/store/ws.js";
	
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
</section>

<style>
	.backdrop {
		background: rgba(0, 0, 0, 0.15);
		backdrop-filter: blur(5px);
	}
</style>
