/*
JavaScript only required for spin interaction, not for rendering the component.
*/

function wheelOfFortune(selector) {
    const node = document.querySelector(selector);
    if (!node) return;

    const spin = node.querySelector("button");
    const wheel = node.querySelector("ul");
    let animation;

    let previousEndDegree = 0;
    let newEndDegree;

    let winners = [];
    let winner;

    const items = wheel.children.length;
    const segment = 360 / items;
    const offset = segment / 2; // to account for width of wedge/offset from center

    spin.addEventListener("click", () => {
        const getWinnerFromAngle = (angle) => {
            const finalAngle = angle % 360;
            const normalizedAngle = (360 - finalAngle + 90) % 360;
            const winner = Math.floor(
                ((normalizedAngle + offset) % 360) / segment
            );
            return winner;
        };

        spin.textContent = "SPIN";

        if (animation) {
            animation.cancel(); // Reset the animation if it already exists
        }

        if (winners.length) {
            // grey out previous winner - or don't (:
            const winner = winners[winners.length - 1]; // re-calculate here in case animation gets interrupted -- (block-scoped)
            // wheel.children[winner].style.textDecoration = "line-through";
            wheel.children[winner].style.fontStyle = "italic";
            wheel.children[winner].style.backgroundColor = "#fff3";
            wheel.children[winner].style.color = "#0002"; // "#0000" for fully transparent

            // wheel.children[winner].style.opacity = 0.15;

            // reset
            if (winners.length === items) {
                winners = [];
                Array.from(wheel.children).forEach((child) => {
                    child.style.backgroundColor = "";
                    child.style.textDecoration = "";
                    child.style.fontStyle = "";
                    child.style.color = "";
                    child.style.opacity = "";
                });
            }
        }

        let hasAlreadyWon = true;
        while (hasAlreadyWon) {
            // spin until we land on someone who hasn't gone
            const randomAdditionalDegrees = Math.random() * 360 + 1800;
            newEndDegree = previousEndDegree + randomAdditionalDegrees;
            winner = getWinnerFromAngle(newEndDegree);
            if (!winners.includes(winner)) {
                hasAlreadyWon = false;
            }
            console.log(newEndDegree, winner);
        }

        animation = wheel.animate(
            [
                { transform: `rotate(${previousEndDegree}deg)` },
                { transform: `rotate(${newEndDegree}deg)` },
            ],
            {
                duration: 4000,
                direction: "normal",
                easing: "cubic-bezier(0.440, -0.205, 0.000, 1.130)",
                fill: "forwards",
                iterations: 1,
            }
        );

        previousEndDegree = newEndDegree;

        // grab winner
        animation.onfinish = () => {
            // const winner = getWinnerFromAngle(newEndDegree);
            winners.push(winner);
            console.log(winners);
            const winnerText = wheel.children[winner].textContent;
            console.log(winnerText);
            spin.textContent = winnerText;
        };
    });
}

// Usage
wheelOfFortune(".ui-wheel-of-fortune");
