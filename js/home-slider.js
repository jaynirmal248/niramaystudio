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

  // On mobile, observe which card is mostly visible and mark it active so
  // the visible card appears "expanded" by default when one-per-view is used.
  let observer = null;

  function setupMobileObserver() {
    if (observer) return;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          // pick the entry with highest intersectionRatio above 0.5
          let best = null;
          for (const e of entries) {
            if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
          }
          if (best && best.isIntersecting && best.intersectionRatio >= 0.5) {
            const idx = cards.indexOf(best.target);
            if (idx >= 0) activate(idx, false);
          }
        },
        {
          root: wrap, // track sits inside wrap; observe visibility within the viewport area
          threshold: [0.5, 0.75, 0.9],
        }
      );

      cards.forEach((c) => observer.observe(c));
    } catch (err) {
      // IntersectionObserver unavailable — fallback to default active 0
      observer = null;
    }
  }

  function teardownMobileObserver() {
    if (!observer) return;
    observer.disconnect();
    observer = null;
  }

  // initialize appropriate behavior based on current viewport
  if (isMobile()) {
    setupMobileObserver();
  }

  mqMobile.addEventListener("change", (ev) => {
    if (ev.matches) {
      // switched to mobile
      setupMobileObserver();
      // ensure first visible card is active
      toggleUI(current);
    } else {
      // left mobile
      teardownMobileObserver();
      // keep desktop centering rules consistent
      center(current, false);
    }
  });

  toggleUI(0);
  center(0, false);

  // --- Auto-scroll feature (desktop: center/advance, mobile: scrollIntoView) ---
  const AUTO_ENABLED = true;
  const AUTO_INTERVAL = 4000; // ms between auto-advances
  const LAST_EXTRA = 2000; // extra ms for the last slide
  let autoTimer = null;
  let autoPaused = false;

  function autoAdvance() {
    if (!AUTO_ENABLED || autoPaused) return;
    // Compute next index and wrap to the first slide after the last
    let next = current + 1;
    if (next >= cards.length) next = 0;
    // On mobile, scroll the track so the next card becomes centered/visible
    if (isMobile()) {
      // Compute the scroll position for the next card relative to the visible container
      // and scroll the inner container (wrap) instead of calling element.scrollIntoView().
      // scrollIntoView can cause the outer document to jump on some devices/browsers;
      // scrolling the container keeps the change local to the slider and avoids forcing
      // the page to move.
      // The scrollable element on mobile is the `.track` (it has overflow-x:auto)
      // so scroll the track directly to avoid affecting the document scroll.
      const target = clampOffset(cards[next].offsetLeft - (wrap.clientWidth / 2 - cards[next].clientWidth / 2));
      try {
        track.scrollTo({ left: target, behavior: "smooth" });
      } catch (e) {
        // fallback: set scrollLeft directly
        track.scrollLeft = target;
      }
      // IntersectionObserver will pick the active card when scroll completes
    } else {
      // desktop: advance and center immediately
      activate(next, true);
    }
  }

  // Use a variable timeout scheduler so we can extend the delay for the last slide.
  function scheduleAuto() {
    if (!AUTO_ENABLED || autoPaused) return;
    stopAuto();
    // Delay should be longer when the CURRENT slide is the last one (i.e., show it extra)
    const delay = current === cards.length - 1 ? AUTO_INTERVAL + LAST_EXTRA : AUTO_INTERVAL;
    autoTimer = setTimeout(() => {
      // advance then schedule next based on the new current index
      autoAdvance();
      // schedule the next tick after allowing current to update (IntersectionObserver may update on mobile)
      // use a small rAF to ensure state updates applied
      requestAnimationFrame(() => scheduleAuto());
    }, delay);
  }

  function startAuto() {
    if (!AUTO_ENABLED) return;
    scheduleAuto();
  }

  function stopAuto() {
    if (autoTimer) {
      clearTimeout(autoTimer);
      autoTimer = null;
    }
  }

  function pauseAutoTemporarily(delay = 6000) {
    // pause auto-scrolling for a period after user interaction
    autoPaused = true;
    stopAuto();
    clearTimeout(pauseAutoTemporarily._resumeTimer);
    pauseAutoTemporarily._resumeTimer = setTimeout(() => {
      autoPaused = false;
      startAuto();
    }, delay);
  }

  // Pause when user hovers/focuses the slider, or when touch interaction starts
  wrap.addEventListener("mouseenter", () => {
    autoPaused = true;
    stopAuto();
  });
  wrap.addEventListener("mouseleave", () => {
    autoPaused = false;
    startAuto();
  });
  wrap.addEventListener("focusin", () => {
    autoPaused = true;
    stopAuto();
  });
  wrap.addEventListener("focusout", () => {
    autoPaused = false;
    startAuto();
  });
  // Touch interactions should pause and then resume after a short delay
  track.addEventListener(
    "touchstart",
    () => {
      pauseAutoTemporarily();
    },
    { passive: true }
  );

  // Reset/pause auto on user click/activate
  cards.forEach((c) => c.addEventListener("click", () => pauseAutoTemporarily()));

  // Pause when page isn't visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAuto();
    else startAuto();
  });

  // Start auto when initialized
  startAuto();
})();