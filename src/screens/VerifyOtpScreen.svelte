<script>
    import { screen } from "../stores";
    import { verifyotp } from "../bereal-api";
    import Button from "../components/Button.svelte";
    import Input from "../components/Input.svelte";
    import LoginScreenTemplate from "../components/LoginScreenTemplate.svelte";
    let code = "";
    let isLoading = false;
    let phoneNumber = localStorage.getItem("phoneNumber") ?? "Unknown";
    let errorMessage;

    async function handleClick() {
        isLoading = true;
        errorMessage = null;
        try {
            await verifyotp(code);
            screen.update((_) => "feed/friends");
        } catch (error) {
            errorMessage = error.message;
        } finally {
            isLoading = false;
        }
    }
</script>

<LoginScreenTemplate>
    <label for="code" class="text-gray-200 text-md block pb-1"
        >Enter code sent to {phoneNumber}:
    </label>
    <div class="flex items-center flex-col sm:flex-row w-full">
        <Input
            id="code"
            placeholder="123456"
            disabled={isLoading}
            type="text"
            class="w-full sm:min-w-[300px]"
            bind:value={code}
        />
        <Button
            {isLoading}
            label="DONE"
            on:click={handleClick}
            class="mt-4 sm:ml-2 sm:mt-0 w-full"
        />
    </div>
    {#if errorMessage}
        <span class="text-pink-500 text-md block pt-1">{errorMessage}</span>
    {/if}
</LoginScreenTemplate>
