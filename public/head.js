(() => {
  document.documentElement.classList.add("js");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const userAgent = window.navigator.userAgent;
  const aspectRatio = window.innerWidth / window.innerHeight;

  const isEnhanced =
    !reducedMotion.matches &&
    userAgent.indexOf("MSIE") < 0 &&
    aspectRatio < 2.49 &&
    document.documentElement.classList.contains("home") &&
    CSS &&
    CSS.supports &&
    CSS.supports("position", "sticky");

  if (isEnhanced) {
    window.enhancedExperience = true;
    document.documentElement.classList.add("enhanced");
  } else {
    window.enhancedExperience = false;
  }
})();
