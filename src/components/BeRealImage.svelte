<script>
    import { clamp } from "../util";
    import { spring } from "svelte/motion";
    export let primaryImageUrl;
    export let secondaryImageUrl;
    let bigPhotoUrl = primaryImageUrl;
    let smallPhotoUrl = secondaryImageUrl;

    let showSmallPhoto = true;

    let containerW;
    let containerH;
    let moving = false;
    let position = spring({ left: 16, top: 16 });
    let moved = false;

    function onMouseDown(e) {
        e.preventDefault();
        moving = true;
        moved = false;
    }

    function _moveImage(movementX, movementY) {
        console.log(`_moveImage(movementX: ${movementX}, movementY: ${movementY}) [moving: ${moving}]`)
        if (moving) {
            moved = true;
            position.update((oldValue) => ({
                left: clamp(
                    oldValue.left + movementX,
                    0,
                    containerW - containerW / 4
                ),
                top: clamp(
                    oldValue.top + movementY,
                    0,
                    containerH - containerH / 4
                ),
            }));
        }
    }

    function onMouseMove(e) {
        _moveImage(e.movementX, e.movementY)
    }

    let lastX = 0;
    let lastY = 0;

    function onTouchMove(e) {
        const touch = e.targetTouches[0]
        
        if (touch) {
            if (lastX == 0 && lastY == 0) {
                lastX = touch.screenX;
                lastY = touch.screenY;
            }
            _moveImage(touch.screenX - lastX, touch.screenY - lastY);
            lastX = touch.screenX;
            lastY = touch.screenY;
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
    // Mobile fixes for holding on big image
    function onTouchStart() {
        showSmallPhoto = false;
    }
    function onTouchEnd() {
        showSmallPhoto = true
    }
</script>

<div
    class="relative"
    bind:clientWidth={containerW}
    bind:clientHeight={containerH}
    on:touchmove={onTouchMove}
>
    <img
        style="-webkit-user-select: none; -webkit-touch-callout: none;"
        class="rounded-xl"
        src={bigPhotoUrl}
        alt="primary"
        on:mousedown={(_) => (showSmallPhoto = false)}
        on:mouseup={(_) => (showSmallPhoto = true)}
        on:touchstart={onTouchStart}
        on:touchend={onTouchEnd}
    />
    <img
        class={`${
            showSmallPhoto ? "opacity-100" : "opacity-0"
        } transition duration-300 absolute rounded-lg border border-black w-1/4 h-1/4 select-none`}
        src={smallPhotoUrl}
        alt="secondary"
        draggable="false"
        on:mousedown={onMouseDown}
        on:touchstart={onMouseDown}
        style={`-webkit-user-select: none; -webkit-touch-callout: none; left: ${$position.left}px; top: ${$position.top}px;`}
        on:mouseup={onMouseUpLocal}
        on:touchend={onMouseUpLocal}
    />
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} on:touchend={onMouseUp}  />
