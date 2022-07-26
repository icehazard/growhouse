<script>
    let startPos = 0;

    function drag(e) {
       
  
    }
    function start(event) {
        startPos = event.clientY;
        let dragged = event.target;
        event.dataTransfer.setDragImage(dragged, 11111110, 10);
    }
</script>

<div class="row h-300 border center">
    <div class="round border h-200 w-200 relative overflow-hidden">
        <div class="absolute border round p-center shade2 h-150 w-150 z-3 shadow" />
        <div class="absolute p-center z-3 weight-300 text-center">
            <div class="col gap-10">
                <span class="font-28">240</span>
                <span class="font-14 opacity-75">PPM</span>
            </div>
        </div>
        <button
            draggable="true"
            on:dragstart={start}
            on:drag={drag}
            class="triangle p-center"
        />
    </div>
</div>

<style>
    .triangle {
        position: absolute;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 100px solid var(--primary);
        transform-origin: center top;
        transform: translate(-50%, 0%) rotate(180deg);
    }
</style>
