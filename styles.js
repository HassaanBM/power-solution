console.log("Styles.js loaded")


const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  smartphone: {
    smooth: false
  },
  tablet: {
    smooth: false
  }
});