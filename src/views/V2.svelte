<script>
    import Terminal from "@/components/Home/Terminal.svelte";
    import Nutrient from "@/components/Home/Nutrient.svelte";
    import PH from "@/components/Home/pH.svelte";
    import Water from "@/components/Home/Water.svelte";
    import HumidityTemp from "@/components/Home/HumidityTemp.svelte";
    import Nav from "@/components/Home/Nav.svelte";
</script>

<div class="col h100 vh100 shade1">
    <Nav />
    <div class="row grow border curve align-center">
        <Nutrient />
        <hr class="h100" />
        <PH />
        <hr class="h100" />
        <Water />
    </div>
    <div class="row h-200 shade2">
        <Terminal />
        <HumidityTemp />
    </div>
</div>

<!-- <div class="col gap-10">
    <div class="row enter gap-10"  >
        <Icon icon="material-symbols:humidity-percentage-outline"  height="24" class="primary--text" />
        <h1 class="weight-300 opacity-75">Humidity</h1>
    </div>
    <hr class="w100 border">
    <div class="row align-center gap-10">
        <Icon icon="mdi:sprout" height="24" class="primary--text" />
        <span class="opacity-75 font-14 w-80">Seedling</span>
        <span>82%-92%</span>
    </div>
    <div class="row align-center gap-10">
        <Icon icon="mdi:cannabis" height="24" class="primary--text" />
        <span class="opacity-75 font-14 w-80">Vegetative</span>
        <span>71%-81%</span>
    </div>

    <div class="row align-center gap-10">
        <Icon icon="majesticons:flower-2-line" height="24" class="primary--text" />
        <span class="opacity-75 font-14 w-80">Flowering</span>
        <span>60%-70%</span>
    </div>
</div> -->
