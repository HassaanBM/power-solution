console.log("Styles.js loaded");

// Register GSAP plugins which is required.
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


// Create ScrollSmoother instance
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",         // Main wrapper element
  content: "#smooth-content",         // Content inside the smoother
  smooth: 1.75,                         // Smooth scroll duration
  effects: true,                      // Enable parallax-style effects
  smoothTouch: 0.1,                   // Lower smoothing for touch
  ignoreMobileResize: true           // Avoid resize recalculations on mobile
});


// Get reference to the video element
const video = document.querySelector(".scrubber-video");

// Optional: Wait until video metadata is ready
video.addEventListener("loadedmetadata", () => {
  ScrollTrigger.refresh(); // Ensures layout and trigger positions are accurate
});


// Smoothly update video currentTime during scroll
let scrubTime = 0; // Keeps track of video seekbar time


// This ticker runs on every animation frame (~60fps)
// For better videos smoothness we need to change our 30fps videos to 60fps.
gsap.ticker.add(() => {
  if (!video || !video.duration) return;

  const duration = video.duration;
  const scrollProgress = ScrollTrigger.getById("videoScrub")?.progress || 0;

  // Interpolate the video time for smoother updates
  scrubTime += (scrollProgress * duration - scrubTime) * 0.1;

  video.currentTime = scrubTime;
});


// Create ScrollTrigger for pinning and syncing video with scroll
ScrollTrigger.create({
  id: "videoScrub",                        // Unique ID for reference
  trigger: ".scrubber-container",         // Container that triggers scroll
  start: "top top",                        // When top of container hits top of viewport
  end: "bottom bottom",                    // Until the container bottom reaches bottom of viewport
  pin: ".scrubber-video-container",       // Pin the video container during scroll
  scrub: true,                             // Tie animation to scroll position
  markers: false                           // Set to true for debugging
});


// Create ScrollTrigger for pinning and syncing aside tag with scroll
ScrollTrigger.create({
  id: "stickyAside",                       // Unique ID for reference
  trigger: ".sticky-aside-container",      // Container that triggers scroll
  start: "top top",                 // When top of container hits top of viewport
  end: "bottom bottom",                    // Until the container bottom reaches bottom of viewport
  pin: ".substation-nav",                  // Pin the video container during scroll
  pinSpacing: false,                       // Disable spacing to avoid layout shifts
  toggleClass: "sticky-aside-active",      // Toggle class on pin
  toggleActions: "play none none reverse", // Play animation on pin, reverse on unpin
  scrub: true,                             // Tie animation to scroll position
  markers: false                           // Set to true for debugging
});



// Detect if a link's href goes to the current page
function getSamePageAnchor (link) {
  if (
    link.protocol !== window.location.protocol ||
    link.host !== window.location.host ||
    link.pathname !== window.location.pathname ||
    link.search !== window.location.search
  ) {
    return false;
  }
  return link.hash;
}
// Scroll to a given hash, preventing the event given if there is one
function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if(elem) {
    if(e) e.preventDefault();
    gsap.to(window, {scrollTo: elem});
  }
}
// If a link's href is within the current page, scroll to it instead
document.querySelectorAll('a[href]').forEach(a => {
  a.addEventListener('click', e => {
    scrollToHash(getSamePageAnchor(a), e);
  });
});

// Scroll to the element in the URL's hash on load
scrollToHash(window.location.hash);