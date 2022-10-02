<script>
  import { onMount } from "svelte";
  import { getAuthToken } from "./bereal-api";
  import FriendsFeed from "./screens/FriendsFeed.svelte";
  import SendOtpScreen from "./screens/SendOtpScreen.svelte";
  import VerifyOtpScreen from "./screens/VerifyOtpScreen.svelte";
  import { screen } from "./stores";
  import TailwindCss from "./TailwindCSS.svelte";
  let currentScreen;

  onMount(async () => {
    const token = getAuthToken();
    if (token && currentScreen != "feed/friends") {
      screen.set("feed/friends");
    } else if (!token && currentScreen == "feed/friends") {
      screen.set("login/otp");
    }
  });

  screen.subscribe((s) => {
    currentScreen = s;
  });
</script>

<TailwindCss />

<main class="w-screen min-h-screen bg-black text-white">
  <div class="container mx-auto">
    {#if currentScreen == "login/sendotp"}
      <SendOtpScreen />
    {:else if currentScreen == "login/verifyotp"}
      <VerifyOtpScreen />
    {:else if currentScreen == "feed/friends"}
      <FriendsFeed />
    {/if}
  </div>
</main>
