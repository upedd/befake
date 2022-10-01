<script>
    import BeRealImage from "../components/BeRealImage.svelte";
    import { getFriendFeed } from "../bereal-api";
    import { formatSeconds, timeFromTimestamp } from "../util";
    import BeRealSkeleton from "../components/BeRealSkeleton.svelte";

    let feedRequest = getFriendFeed();
</script>

<h1 class="font-bold text-4xl pt-4 block">BeFake.</h1>

<div class="max-w-xl pl-2 pr-2 pb-2 min-h-screen">
    {#await feedRequest}
        <BeRealSkeleton />
    {:then feedItems}
        {#each feedItems as item}
            <div>
                <div class="flex px-2 py-4 items-center">
                    {#if item.user.profilePicture}
                        <img
                            src={item.user.profilePicture.url}
                            alt={item.userName}
                            class="w-10 h-10 rounded-full"
                        />
                    {:else}
                        <div class="w-10 h-10 rounded-full bg-gray-800" />
                    {/if}
                    <div class="ml-2">
                        <h5 class="text-sm font-bold">{item.userName}</h5>
                        <h6 class="text-sm text-gray-400">
                            {#if item.lateInSeconds > 0}
                                {formatSeconds(item.lateInSeconds)} Late
                            {:else}
                                {timeFromTimestamp(item.takenAt._seconds)}
                            {/if}

                            {#if item.retakeCounter == 1}
                                · {item.retakeCounter} retake
                            {:else if item.retakeCounter > 1}
                                · {item.retakeCounter} retakes
                            {/if}
                            {#if item.location}
                                · {item.location._latitude}° {item.location
                                    ._longitude}°
                            {/if}
                        </h6>
                    </div>
                </div>
                <BeRealImage
                    primaryImageUrl={item.photoURL}
                    secondaryImageUrl={item.secondaryPhotoURL}
                />
            </div>
        {/each}
    {:catch error}
        <span class="text-pink-500 text-md block pt-1">{error.message}</span>
    {/await}
</div>
