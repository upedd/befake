<script>
  import { refreshToken } from "./bereal-api";
  import FriendsFeed from "./screens/FriendsFeed.svelte";
  import SendOtpScreen from "./screens/SendOtpScreen.svelte";
  import VerifyOtpScreen from "./screens/VerifyOtpScreen.svelte";
  import { screen } from "./stores";
  import TailwindCss from "./TailwindCSS.svelte";
  let currentScreen;

  const token = localStorage.getItem("idToken");
  const expiresAt = +localStorage.getItem("expiresAt");
  // #TODO refactor
  if (token && expiresAt) {
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime < expiresAt) {
      if (currentScreen != "feed/friends") {
        screen.update((_) => "feed/friends");
      }
    } else {
      console.log("trying to refresh token");
      const _refreshToken = localStorage.getItem("refreshToken");
      if (_refreshToken) {
        console.log("refresh token found");
        try {
          refreshToken();
          console.log("successfully refreshed token");
          screen.update((_) => "feed/friends");
        } catch (error) {
          console.error("refreshing token failed", error);

          if (currentScreen == "feed/friends") {
            screen.update((_) => "login/sendotp");
          }
        }
      } else {
        if (currentScreen == "feed/friends") {
          screen.update((_) => "login/sendotp");
        }
      }
    }
  } else {
    if (currentScreen == "feed/friends") {
      screen.update((_) => "login/sendotp");
    }
  }

  screen.subscribe((s) => {
    currentScreen = s;
  });
</script>

<TailwindCss />

<main class="w-screen min-h-screen bg-black text-white">
  <div class="container mx-auto flex items-center flex-col">
    {#if currentScreen == "login/sendotp"}
      <SendOtpScreen />
    {:else if currentScreen == "login/verifyotp"}
      <VerifyOtpScreen />
    {:else if currentScreen == "feed/friends"}
      <FriendsFeed />
    {/if}
  </div>
</main>
