<script>
    import { screen } from "../stores";


    export let showLogout = false;

    function handleClick() {
        localStorage.clear()
        screen.set("login/sendotp")
    }

    // css passthrought
    let clazz = "";
    export {clazz as class}
</script>

<footer class={`text-sm text-gray-500 w-full text-center py-4 ${clazz}`}>
    made with 🖤 by <a
        class="text-gray-400 underline hover:no-underline"
        href="https://github.com/upedd">@upedd</a
    >
    · 
    {#if showLogout}
    <button on:click={handleClick} class="text-gray-400 underline hover:no-underline">logout</button>
    {/if}
</footer>
