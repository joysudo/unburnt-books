document.addEventListener("scroll", function () {
  var scrollPosition = window.pageYOffset;
  document.querySelector(".parallax-image").style.transform =
    "translateY(" + scrollPosition * 0.5 + "px)";
});
