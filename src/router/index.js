import { wrap } from "svelte-spa-router/wrap";

const Home = () => import("@/views/Home.svelte");

export default {
    "/": wrap({ asyncComponent: Home }),
}
