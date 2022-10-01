<script>
    import { clamp } from "../util";
    import { spring } from "svelte/motion";
    export let primaryImageUrl;
    export let secondaryImageUrl;
    let bigPhotoUrl = primaryImageUrl;
    let smallPhotoUrl = secondaryImageUrl;

    let showSmallPhoto = true;

    // #TODO mobile fixes
    let containerW;
    let containerH;
    let moving = false;
    let position = spring({ left: 16, top: 16 });
    let moved = false;

    function onMouseDown() {
        moving = true;
        moved = false;
    }

    function onMouseMove(e) {
        if (moving) {
            moved = true;
            position.update((oldValue) => ({
                left: clamp(
                    oldValue.left + e.movementX,
                    0,
                    containerW - containerW / 4
                ),
                top: clamp(
                    oldValue.top + e.movementY,
                    0,
                    containerH - containerH / 4
                ),
            }));
        }
    }

    function onMouseUp() {
        position.set({ left: 16, top: 16 });
        moving = false;
    }

    function onMouseUpLocal() {
        if (!moved) {
            const temp = bigPhotoUrl;
            bigPhotoUrl = smallPhotoUrl;
            smallPhotoUrl = temp;
        }
        moved = false;
    }
</script>

<div
    class="relative"
    bind:clientWidth={containerW}
    bind:clientHeight={containerH}
>
    <img
        class="rounded-xl"
        src={bigPhotoUrl}
        alt="primary"
        on:mousedown={(_) => (showSmallPhoto = false)}
        on:mouseup={(_) => (showSmallPhoto = true)}
    />
    <img
        class={`${
            showSmallPhoto ? "opacity-100" : "opacity-0"
        } transition duration-300 absolute rounded-lg border border-black w-1/4 h-1/4 select-none`}
        src={smallPhotoUrl}
        alt="secondary"
        draggable="false"
        on:mousedown={onMouseDown}
        style={`left: ${$position.left}px; top: ${$position.top}px;`}
        on:mouseup={onMouseUpLocal}
    />
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} on:t />
