<script>
    import Footer from "./Footer.svelte";
</script>

<div
    class="flex flex-col items-center h-screen justify-between w-full sm:w-fit mx-auto"
>
    <div class="w-full">
        <h1
            class="text-center font-bold text-7xl sm:text-8xl block pt-16 pb-12"
        >
            BeFake.
        </h1>
        <div class="w-full px-4">
            <slot />
        </div>
    </div>

    <Footer class="justify-self-end block" />
</div>
