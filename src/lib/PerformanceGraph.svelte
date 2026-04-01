<script>
    export let user_score,
        industry_score,
        std = 0,
        tickmarks = [];
    export let featured = false;

    let user_score_position = "0%";

    $: user_score_position = `${user_score * 10}%`;
</script>

<div class="graph" class:featured>
    <div class="axis"></div>
    <div
        class="std"
        style:left="{Math.max((industry_score - std) * 10, 0)}%"
        style:right="{Math.max(100 - (industry_score + std) * 10, 0)}%"
    ></div>
    <div class="metric industry" style:left="{industry_score * 10}%"></div>
    <div class="metric user" style:left={user_score_position}></div>
    <div class="user_score" style:left={user_score_position}>{user_score}</div>
</div>

<style lang="scss">
    .graph {
        position: relative;
        height: 5.5rem;

        .axis {
            background-color: #eee;
            height: 0.3rem;
            position: absolute;
            left: -0.25rem;
            right: -0.25rem;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 0.15rem;
        }

        .std {
            background-color: var(--std-background);
            height: 2rem;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 0.15rem;
        }

        .metric {
            position: absolute;
            height: 3rem;
            width: 2px;
            top: 50%;
            transform: translateY(-50%);

            &.industry {
                background-color: var(--metric-background);
            }

            &.user {
                background-color: var(--dora-blue);
            }
        }

        .user_score {
            position: absolute;
            top: 50%;
            transform: translateX(-50%) translateY(calc(-50% - 2rem));
            background-color: var(--dora-blue);
            padding: 0.2rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            color: white;
            transition: left 250ms ease-out;
        }

        &.featured {
            height: 7.5rem;
            .axis {
                height: 0.5rem;
            }

            .std {
                height: 4rem;
            }

            .metric {
                height: 5rem;

                &.user {
                    width: 0.4rem;
                    height: 5rem;
                    border-radius: 0.4rem;
                }
            }

            .user_score {
                transform: translateX(-50%) translateY(calc(-50% - 3rem));
                background-color: var(--dora-blue);
                font-size: 1rem;
                font-weight: 700;
                color: white;
            }
        }
    }
</style>
