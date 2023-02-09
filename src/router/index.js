import { wrap } from "svelte-spa-router/wrap";

const Home = () => import("@/views/Home.svelte");
const V2 = () => import("@/views/V2.svelte");

export default {
    "/": wrap({ asyncComponent: Home }),
    "/v2": wrap({ asyncComponent: V2 }),
}
