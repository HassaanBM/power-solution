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

// Target the video
const video = document.querySelector(".scrubber-video");

// ScrollTrigger for scrubbing video
ScrollTrigger.create({
  trigger: ".scrubber-container",
  start: "top top",
  end: "bottom bottom", // Adjust based on how long you want the scroll to last
  pin: ".scrubber-video-container",
  scrub: true,
  markers: true,
  onUpdate: (self) => {
    if (video.readyState >= 2) {
      const duration = video.duration || 1;
      video.currentTime = self.progress * duration;
    }
  }
});