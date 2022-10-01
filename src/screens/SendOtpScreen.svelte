<script>
    import { screen } from "../stores";
    import { sendotp } from "../bereal-api";
    import Button from "../components/Button.svelte";
    import Input from "../components/Input.svelte";
    let phoneNumber = "";
    let isLoading = false;
    let errorMessage;

    async function handleClick() {
        isLoading = true;
        errorMessage = null;
        try {
            await sendotp(phoneNumber);
            localStorage.setItem("phoneNumber", phoneNumber)
            screen.update(_ => "login/verifyotp")
        } catch (error) {
            errorMessage = error.message;
        } finally {
            isLoading = false;
        }
    }
</script>

<h1 class="font-bold text-8xl block pt-16 pb-12">BeFake.</h1>
<div>
    <label for="phoneNumber" class="text-gray-200 text-md block pb-1"
        >Enter your phone number:
    </label>
    <div class="flex items-center">
        <Input
            id="phoneNumber"
            placeholder="+00123456789"
            disabled={isLoading}
            type="tel"
            bind:value={phoneNumber}
        />
        <!-- <button class="ml-2 text-black font-bold text-lg py-2 px-3 rounded-lg bg-white hover:bg-gray-100 active:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-400 border border-white focus:border-gray-400">SEND</button> -->
        <Button {isLoading} label="SEND" class="ml-2" on:click={handleClick} />
    </div>
    {#if errorMessage}
        <span class="text-pink-500 text-md block pt-1">{errorMessage}</span>
    {/if}
</div>
