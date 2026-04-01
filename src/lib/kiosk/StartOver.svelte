<script>
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    import { onDestroy } from "svelte";

    const TIMER_DURATION_IN_SEC = 90;
    const TIMER_HIDDEN_FOR_SEC = 60;

    let seconds_remaining = TIMER_DURATION_IN_SEC;

    export let showLegendLink = false;

    const dispatch = createEventDispatcher();

    let countDownTimer;

    const reset = () => {
        seconds_remaining = TIMER_DURATION_IN_SEC;
        dispatch("reset");
    };

    const toggleLegend = () => {
        dispatch("toggleLegend");
    };
</script>

<div class="container">
    <div class="buttons">
        <a href="." on:click|preventDefault={reset} class="reset">start over</a>
        {#if showLegendLink}
            <a href="." on:click|preventDefault={toggleLegend} class="legend-link">legend</a>
        {/if}
    </div>
    <div class="auto-reset"> 
        {#if seconds_remaining <= TIMER_DURATION_IN_SEC - TIMER_HIDDEN_FOR_SEC}
            starting over in {seconds_remaining}s
        {/if}
    </div>
</div>

<style>
    div.container {
        text-align: center;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    a.reset, a.legend-link {
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        padding: 0.25rem 0.5rem;
        color: #999;
        text-decoration: none;
        font-size: 1.5rem;
    }

    a.reset {
        margin: 0 1rem;
    }

    a.legend-link {
        border-color: var(--dora-blue, #0044cc);
        color: var(--dora-blue, #0044cc);
    }
</style>
