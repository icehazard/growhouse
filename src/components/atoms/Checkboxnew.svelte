<script>
import {createEventDispatcher} from "svelte";

export let checked;
export let label;
const dispatch = createEventDispatcher();

const handleChange = () => {
    checked = !checked;
    dispatch("change", checked);
};

</script>
<div class="row">
<label class="checkbox bounce">
    <input type="checkbox" checked={checked} on:change={handleChange}>
    <svg viewBox="0 0 21 21">
        <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
    </svg>

</label>

<div on:click={handleChange}>
    <div class=" pa-5 curve">{label}</div>
</div>
</div>
