<script>
    import { createEventDispatcher } from 'svelte';
    export let baselineText;
    const dispatch = createEventDispatcher();
    const close = () => dispatch('close');
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-container" on:click={close}>
    <div class="modal" on:click|stopPropagation>
        <div class="modal-header">
            <h2>Legend</h2>
            <button class="modal-close-x" on:click={close} aria-label="Close modal">X</button>
        </div>
        <div class="capability-content">
            <section class="legend">
                <div class="legend-header">
                    <span>
                    {baselineText}
                    </span>
                </div>
                <div class="legend-item">
                    <span class="industry">&nbsp;</span> Average
                </div>
                <div class="legend-item">
                    <span class="std">&nbsp;</span> Standard deviation
                </div>
                <div class="legend-item">
                    <span class="your">&nbsp;</span> Your performance
                </div>
            </section>
        </div>
    </div>
</div>

<style lang="scss">
    .legend {
        display: flex;
        flex-direction: column; /* Stack items vertically */
        align-items: center; /* Center align items vertically */
        font-size: 0.75rem;
        color: #666;
        justify-content: center;

        div {
            text-align: center;
            margin-bottom: 1rem;
        }

        .legend-header {
            margin-right: 1.5rem; /* Add spacing between header and items */
            margin-bottom: 1rem; /* Add spacing below the header */
        }

        .legend-item {
            margin-right: 1.5rem; /* Add spacing between legend items */
            margin-bottom: 0.5rem; /* Add spacing between legend items */
            display: flex;
            align-items: center;
        }

        span {
            display: inline-block;
            height: 1.5rem;
            vertical-align: middle;
            margin-left: 0.5rem;

            &.your {
                width: 4px;
                height: 1rem;
                background-color: var(--dora-blue);
                border-radius: 2px;
                margin-right: 0.5rem;
            }

            &.industry {
                background-color: var(--metric-background) !important;
                width: 1px;
                height: 1rem;
                margin-right: 0.5rem;
            }

            &.std {
                background-color: var(--std-background);
                width: 32px;
                height: 1rem;
                border-radius: 0.25rem;
                margin-right: 0.5rem;
            }
        }
    }

    @media (max-width: 800px) {
        .legend {
            flex-direction: column;

            .legend-header {
                display: block;
            }
                display: block;
            }
        }
    }
</style>