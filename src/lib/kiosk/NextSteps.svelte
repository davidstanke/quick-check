<script>
    import StartOver from "./StartOver.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const reset = () => dispatch("reset");
</script>

<section class="nextSteps">
    <StartOver on:reset={reset} showLegendLink={true} on:toggleLegend />
    <div>
        <ul>
            <li>
                Read the <a href="https://dora.dev/report" target="_blank"
                    >DORA Report</a
                >
            </li>
            <li>
                <a href="https://dora.dev/capabilities" target="_blank"
                    >Discover capabilities</a
                > to help you improve
            </li>
            <li>
                Join the <a href="https://dora.community" target="_blank"
                    >DORA Community</a
                >
            </li>
        </ul>
    </div>
    <div class="qrcode">
        <a href="https://dora.dev/" target="_blank">dora.dev</a>
    </div>
</section>

<style lang="scss">
    section.nextSteps {
        border-top: 1px solid #eee;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        padding: 0 2rem;
        margin-top: 2rem;
        background-color: #fafaff;

        h1 {
            color: #999;
            text-transform: uppercase;
            font-size: 1rem;
        }

        ul {
            font-size: 1.5rem;
            line-height: 1.5;
            list-style: none;
            padding: 0;
            margin: 0;

            li::before {
                content: "»";
                color: var(--dora-blue);
                display: inline-block;
                width: 1em;
                margin-left: -1em;
            }

            a {
                text-decoration: underline;
                color: var(--dora-blue);
            }
        }

        div.qrcode {
            text-align: center;
            font-size: 1.5rem;
            color: var(--dora-blue);
            a {
                text-decoration: none;
                color: inherit;
            }

            img {
                width: 8rem;
                height: 8rem;
                display: block;
            }
        }
    }
</style>
