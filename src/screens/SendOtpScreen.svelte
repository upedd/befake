<script>
    import { screen } from "../stores";
    import { sendotp } from "../bereal-api";
    import Button from "../components/Button.svelte";
    import Input from "../components/Input.svelte";
    import LoginScreenTemplate from "../components/LoginScreenTemplate.svelte";
    let phoneNumber = "";
    let isLoading = false;
    let errorMessage;

    async function handleClick() {
        isLoading = true;
        errorMessage = null;
        try {
            await sendotp(phoneNumber);
            localStorage.setItem("phoneNumber", phoneNumber);
            screen.update((_) => "login/verifyotp");
        } catch (error) {
            errorMessage = error.message;
        } finally {
            isLoading = false;
        }
    }
</script>

<LoginScreenTemplate>
    <label for="phoneNumber" class="text-gray-200 text-md mb-1 block"
        >Enter your phone number:
    </label>
    <div class="flex items-center flex-col sm:flex-row w-full">
        <Input
            id="phoneNumber"
            placeholder="+00123456789"
            disabled={isLoading}
            type="tel"
            class="w-full sm:min-w-[300px]"
            bind:value={phoneNumber}
        />
        <Button
            {isLoading}
            label="SEND"
            class="mt-4 sm:ml-2 sm:mt-0 w-full"
            on:click={handleClick}
        />
    </div>
    {#if errorMessage}
        <span class="text-pink-500 text-md block pt-1">{errorMessage}</span>
    {/if}
</LoginScreenTemplate>
