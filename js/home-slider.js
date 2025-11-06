(() => {
  const track = document.getElementById("track");
  if (!track) return; // nothing to init
  const wrap = track.parentElement;
  const cards = Array.from(track.children);

  const mqMobile = matchMedia("(max-width:767px)");
  const isMobile = () => mqMobile.matches;

  let current = 0;

  function clampOffset(value) {
    const max = Math.max(0, track.scrollWidth - wrap.clientWidth);
    return Math.min(Math.max(value, 0), max);
  }

  function center(i, animate = true) {
    if (!cards[i]) return;
    if (isMobile()) {
      track.style.transition = "";
      track.style.transform = "";
      return;
    }

    const card = cards[i];
    const wrapWidth = wrap.clientWidth;
    const cardWidth = card.clientWidth;
    const start = card.offsetLeft;
    let target = start - (wrapWidth / 2 - cardWidth / 2);
    target = clampOffset(target);

    if (!animate) track.style.transition = "none";
    track.style.transform = `translate3d(${-target}px,0,0)`;
    if (!animate) requestAnimationFrame(() => (track.style.transition = ""));
  }

  function toggleUI(i) {
    cards.forEach((c, k) => c.toggleAttribute("active", k === i));
  }

  function activate(i, shouldAnimate = true) {
    if (i === current) return;
    current = i;
    toggleUI(i);
    center(i, shouldAnimate);
  }

  function go(step) {
    activate(Math.min(Math.max(current + step, 0), cards.length - 1), true);
  }

  // interactions: debounce hover (desktop) to avoid rapid activations; click activates immediately
  cards.forEach((card, i) => {
    let hoverTimer = null;
    card.addEventListener("mouseenter", () => {
      if (!matchMedia("(hover:hover)").matches) return;
      hoverTimer = setTimeout(() => activate(i, true), 80);
    });
    card.addEventListener("mouseleave", () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
    });
    card.addEventListener("click", () => activate(i, true));
  });

  // simple swipe detection
  let sx = 0,
    sy = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60)
        go((isMobile() ? dy : dx) > 0 ? -1 : 1);
    },
    { passive: true }
  );

  // Throttle resize centering using rAF
  let resizeScheduled = false;
  addEventListener("resize", () => {
    if (resizeScheduled) return;
    resizeScheduled = true;
    requestAnimationFrame(() => {
      center(current, false);
      resizeScheduled = false;
    });
  });

  mqMobile.addEventListener("change", () => {
    center(current, false);
  });

  toggleUI(0);
  center(0, false);
})();