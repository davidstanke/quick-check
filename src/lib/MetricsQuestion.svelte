<script>
  //@ts-nocheck
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  export let metrics;
  export let metric_name = "METRIC",
    metric_position = 1,
    current_metric = 0;
  import metrics_question_responses from "./data/metrics_question_responses.json";
  import metrics_images from "./data/metrics_images.json";
  const metrics_details = {
    leadtime: {
      friendly_name: "Lead time",
      description:
        "For the primary application or service you work on, what is your <b>lead time for changes</b> (that is, how long does it take to go from code committed to code successfully running in production)?",
    },
    deployfreq: {
      friendly_name: "Deploy frequency",
      description:
        "For the primary application or service you work on, <b>how often does your organization deploy code</b> to production or release it to end users?",
    },
    changefailure: {
      friendly_name: "Change fail percentage",
      description:
        "For the primary application or service you work on, <b>what percentage of changes to production or released to users result in degraded service</b> (for example, lead to service impairment or service outage) and subsequently require remediation (for example, require a hotfix, rollback, fix forward or patch)?",
    },
    failurerecovery: {
      friendly_name: "Failed deployment recovery time",
      description:
        "For the primary application or service you work on, <b>how long does it generally take to restore service</b> after a change to production or release to users results in degraded service (for example, lead to service impairment or service outage) and subsequently requires remediation (for example, require a hotfix, rollback, fix forward, or patch)?",
    },
  };

  let metric_friendly_name = metrics_details[metric_name]["friendly_name"];
  let metric_question_text = metrics_details[metric_name].description;

  const dispatch = createEventDispatcher();

  const nextMetric = () => dispatch("nextMetric");
</script>

<div
  in:fade={{ delay: 250, duration: 100 }}
  out:fade={{ delay: 150, duration: 100 }}
  class="question-container"
>
  <section class="question">
    <aside>
      <h5>
        Question {metric_position + 1} of 4<span class="friendly_name"
          >: {metric_friendly_name}</span
        >
      </h5>
    </aside>
    <fieldset>
      <legend>
        <div class="description">{@html metric_question_text}</div>
      </legend>
      <div class="inputs">
        {#if metric_name === "changefailure"}
          {#each { length: 11 } as _, value}
            <label
              ><input
                name="changefailure"
                type="radio"
                bind:group={metrics["changefailure"]}
                on:change={nextMetric}
                value={value * 10}
              />{value * 10}%</label
            >
          {/each}
        {:else}
          {#each Object.entries(metrics_question_responses[metric_name]) as [value, text]}
            <label
              ><input
                name={metric_name}
                type="radio"
                bind:group={metrics[metric_name]}
                on:change={nextMetric}
                {value}
              />{text}</label
            >
          {/each}
        {/if}
      </div>
    </fieldset>
  </section>
</div>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  label {
    display: block;
  }

  section.question {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    border-bottom: none;
    position: absolute;
    top: 0;
    left: 40vw;
    background-color: transparent;

    aside {
      padding: 1rem;
      margin-right: 1rem;
      max-width: 320px;
      width: 35vw;
      background-color: transparent !important;

      h5 {
        color: var(--dora-primary-dark);
      }
    }

    .description {
      font-size: calc(clamp(16px, 1.25vw, 20px));
      line-height: 1.4;
      font-weight: 400;
      padding-top: 0;
      font-size: 1.5rem;
    }

    fieldset {
      padding: 12px;
      width: calc(100% - 1rem);
    }

    span.friendly_name {
      display: inline;
    }

    legend {
      margin-bottom: 0.5em;
    }

    label {
      margin-bottom: 6px;
      padding-inline: 0.5rem;
      font-size: 1.65rem;
      background-color: #eef;
      border-radius: 0.5rem;
      border: 1px solid #e9e9f0;
      padding: 0.5rem 1rem;
      user-select: none;

      &:active,
      &:has(:checked) {
        background-color: var(--dora-blue);
        color: white;
      }

      &:has(input[type="radio"][name="changefailure"]) {
        display: inline-block;
        font-size: 2rem;
        border-radius: 50%;
        width: 6rem;
        height: 6rem;
        text-align: center;
        line-height: 6rem;
        padding: 0;
        margin: 0.5rem;
      }
    }

    // show radio options as buttons
    input[type="radio"] {
      display: none;
    }

    div.inputs:has(input[type="radio"][name="changefailure"]) {
      text-align: center;
    }
  }

  /* There's no elegant way to use global variables for media queries (css variables aren't supported for this purpose, 
    and SCSS vars are cumbersome to propagate between different svelte components).
    So we'll use a "magic number" of 800px, in each file */
  @media (max-width: 800px) {
    section.question {
      flex-direction: column;
      aside {
        width: 100%;
        padding: 0.5rem;
        background-color: transparent !important;
      }
      p.description {
        padding-top: 0;
      }

      fieldset {
        width: calc(100% - 1rem);
        padding: 0.5rem;
        label {
          padding-left: 0.5rem;
        }
      }
    }
  }
</style>
