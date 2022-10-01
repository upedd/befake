<script>
    let clazz = '';
    export let value = '';
    export {clazz as class};
</script>

<input
        {...$$restProps}
        bind:value
          class={`bg-gray-800 rounded-lg text-2xl text-gray-50 py-2 px-3  placeholder:text-gray-600 border border-gray-800 shadow-sm
        focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600
        disabled:bg-gray-900 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-800
        invalid:border-pink-500 invalid:text-pink-600
         focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${clazz}`}
        />