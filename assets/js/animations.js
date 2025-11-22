/* jshint esversion: 6, jquery: true */
/* global gsap */

export function runIntroAnimations() {
    if (typeof gsap === "undefined") {
        return;
    }

    gsap.from(".app-title", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out"
    });

    gsap.from(".weather-card", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.1,
        ease: "power2.out"
    });

    gsap.from(".city-btn", {
        opacity: 0,
        y: 10,
        duration: 0.4,
        delay: 0.3,
        stagger: 0.05,
        ease: "power2.out"
    });
}

export function animateWeatherInfo() {
    if (typeof gsap === "undefined") {
        return;
    }

    gsap.fromTo(
        "#weather-info",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    gsap.fromTo(
        "#weather-icon",
        { scale: 0.8, rotation: -10 },
        { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.7)" }
    );
}

/**
 * Attach hover shake animation to city buttons
 */
export function attachButtonHoverAnimations() {
    if (typeof gsap === "undefined") {
        return;
    }

    $(".city-btn").on("mouseenter", function () {
        // Stop any existing tweens on this button so shakes don't stack
        gsap.killTweensOf(this);

        gsap.fromTo(
            this,
            { x: -2 },
            {
                x: 2,
                duration: 0.08,
                repeat: 5,
                yoyo: true,
                ease: "power1.inOut",
                onComplete: () => {
                    // Ensure it ends back in place
                    gsap.set(this, { x: 0 });
                }
            }
        );
    });
}