<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import MetricsQuestion from "$lib/MetricsQuestion.svelte";
    import YourPerformance from "$lib/YourPerformance.svelte";
    import { sendAnalyticsEvent } from "$lib/utils.js";
    import FullScreenButton from "$lib/kiosk/FullScreenButton.svelte";
    import NextSteps from "$lib/kiosk/NextSteps.svelte";
    import StartOver from "$lib/kiosk/StartOver.svelte";

    let metrics = {
        leadtime: -1,
        deployfreq: -1,
        changefailure: -1,
        failurerecovery: -1,
    };

    let step = "input";
    let industry = "all";
    let showLegend = false;
    let metric_names = Object.keys(metrics);
    let current_metric = 0; // metrics questions are presented one at a time

    onMount(() => {
        const searchParams = new URLSearchParams(window.location.search);

        // if the metric values are passed on the URL, save them to local vars and advance to results
        if (metric_names.every((metric) => searchParams.has(metric))) {
            metric_names.forEach((metric) => {
                metrics[metric] = searchParams.get(metric);
            });
            step = "results";
        }

        if (searchParams.has("industry")) {
            industry = searchParams.get("industry");
        }

        sendAnalyticsEvent("quick_check_start");

        // TODO: add error handling w/r/t URL params (e.g. if step == "results" but metrics values not present, bounce to input)
    });

    function nextMetric() {
        if (current_metric < 3) {
            current_metric++;
        } else {
            // user automatially advances to results after last answer
            showResults();
        }
    }

    function showResults() {
        step = "results";
    }

    function reset() {
        metric_names.forEach((metric) => {
            metrics[metric] = -1;
        });
        step = "input";
        industry = "all";
        showLegend = false;
        current_metric = 0;
    }
</script>

<FullScreenButton />

<div class="quickcheck">
    {#if step === "input"}
        <div class="kioskMetricsQuestions">
            <aside>
                Take the
                <h1>DORA Quick Check</h1>
                {#if current_metric > 0}
                    {#key step} <!-- re initialize this widget on every change of step or current_metric -->
                        {#key current_metric}
                            <StartOver on:reset={reset} />
                        {/key}
                    {/key}
                {/if}
            </aside>
            {#key current_metric}
                <MetricsQuestion
                    bind:metrics
                    bind:current_metric
                    metric_name={metric_names[current_metric]}
                    metric_position={current_metric}
                    on:nextMetric={nextMetric}
                />
            {/key}
        </div>
    {:else if step === "results"}
        <div class="yourPerformance">
            <YourPerformance {metrics} bind:industry bind:showLegend />
            <NextSteps on:reset={reset} on:toggleLegend={() => (showLegend = !showLegend)} />
        </div>
    {/if}
</div>

<style lang="scss">
    /* override page-level styles for padding b/c it causes graphs to be mispositioned */
    :global(body div.quickcheck) {
        padding-left: 0;
        padding-right: 0;
        position: relative;
    }

    .kioskMetricsQuestions {
        display: flex;
        flex-direction: row;

        aside {
            margin: 0rem 2rem;
            border-right: 1px solid #ccd;
            padding-right: 2rem;
        }

        h1 {
            font-size: 7.5rem;
        }
    }

    aside {
        width: 30%;
        font-size: 2rem;
    }

    .yourPerformance {
        margin: 0 2rem 0.5rem 0;
    }
</style>
