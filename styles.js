console.log("Styles.js loaded")

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Disable the trail warning
gsap.config({trialWarn: false});


const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5, // seconds it takes to "catch up"
  effects: true // enables parallax effects
});