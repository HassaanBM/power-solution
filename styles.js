console.log("Styles.js loaded");

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Disable the trail warning
gsap.config({
  trialWarn: false,
  limitCallbacks: true,
  ignoreMobileResize: true,
});

const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5, // seconds it takes to "catch up"
  effects: true, // enables parallax effects
  smoothTouch: 0.1, // smoothness for touch devices
  ignoreMobileResize: true, // ignores resize on mobile devices
});

ScrollTrigger.create({
  pin: '.media-container',
  start: 'top top', // pining the media container's top to the top of the viewport.
  end: '+=150vh', // ends pinning after 150 viewport height.
  markers: true, // to see the start and end points.
})