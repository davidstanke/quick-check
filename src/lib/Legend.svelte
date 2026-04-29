<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let baselineText;
</script>

<div class="legend-overlay" on:click|self={() => dispatch('close')}>
    <div class="legend-content">
        <button class="close-button" on:click={() => dispatch('close')}>&times;</button>
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

<style lang="scss">
    .legend-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .legend-content {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        position: relative;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .close-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        border: none;
        background: none;
        font-size: 2rem;
        cursor: pointer;
        color: #999;
        line-height: 1;
    }

    .close-button:hover {
        color: #333;
    }

    .legend {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1rem;
        color: #666;

        .legend-header {
            margin-bottom: 1.5rem;
            font-weight: bold;
            text-align: center;
        }

        .legend-item {
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            width: 100%;
        }

        span {
            display: inline-block;
            height: 1.5rem;
            vertical-align: middle;

            &.your {
                width: 4px;
                height: 1.25rem;
                background-color: var(--dora-blue);
                border-radius: 2px;
                margin-right: 1rem;
            }

            &.industry {
                background-color: var(--metric-background) !important;
                width: 1px;
                height: 1.25rem;
                margin-right: 1rem;
            }

            &.std {
                background-color: var(--std-background);
                width: 32px;
                height: 1.25rem;
                border-radius: 0.25rem;
                margin-right: 1rem;
            }
        }
    }
</style>
