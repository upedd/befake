<script>
    import { screen } from "../stores";
    import { verifyotp } from "../bereal-api";
    import Button from "../components/Button.svelte";
    import Input from "../components/Input.svelte";
    let code = "";
    let isLoading = false;
    let phoneNumber = localStorage.getItem("phoneNumber") ?? "Unknown";  
    let errorMessage;

    async function handleClick() {
        isLoading = true;
        errorMessage = null;
        try {
            await verifyotp(code);
            screen.update(_ => "feed/friends")
        } catch (error) {
            errorMessage = error.message;
        } finally {
            isLoading = false;
        }
    }
</script>

<h1 class="font-bold text-8xl block pt-16 pb-12">BeFake.</h1>
<div>
    <label for="code" class="text-gray-200 text-md block pb-1"
        >Enter code sent to {phoneNumber}:
    </label>
    <div class="flex items-center">
        <Input
            id="code"
            placeholder="123456"
            disabled={isLoading}
            type="text"
            bind:value={code}
        />
        <Button {isLoading} label="DONE" class="ml-2" on:click={handleClick} />
    </div>
    {#if errorMessage}
        <span class="text-pink-500 text-md block pt-1">{errorMessage}</span>
    {/if}
</div>
