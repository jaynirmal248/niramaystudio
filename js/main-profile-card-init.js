// Initialize premium profile cards on the teams page
document.addEventListener('DOMContentLoaded', () => {
  const cardWrappers = document.querySelectorAll('.pc-card-wrapper');

  cardWrappers.forEach((wrapper) => {
    const shell = wrapper.querySelector('.pc-card-shell');
    if (!shell) return;

    // Apply CSS variables from data attributes
    const iconUrl = wrapper.dataset.iconUrl;
    const grainUrl = wrapper.dataset.grainUrl;
    
    if (iconUrl) {
      wrapper.style.setProperty('--icon', `url(${iconUrl})`);
    }
    if (grainUrl) {
      wrapper.style.setProperty('--grain', `url(${grainUrl})`);
    }

    let rafId = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
    const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
    const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

    const setVarsFromXY = (x, y) => {
      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`
      };

      for (const [k, v] of Object.entries(properties)) wrapper.style.setProperty(k, v);
    };

    const step = (ts) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    const setTarget = (x, y) => {
      targetX = x;
      targetY = y;
      start();
    };

    const toCenter = () => {
      setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
    };

    const getOffsets = (evt, el) => {
      const rect = el.getBoundingClientRect();
      return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    };

    let enterTimer = null;
    let leaveRaf = null;

    shell.addEventListener('pointerenter', (event) => {
      shell.classList.add('active');
      shell.classList.add('entering');
      if (enterTimer) clearTimeout(enterTimer);
      enterTimer = setTimeout(() => shell.classList.remove('entering'), 180);
      const { x, y } = getOffsets(event, shell);
      setTarget(x, y);
    });

    shell.addEventListener('pointermove', (event) => {
      const { x, y } = getOffsets(event, shell);
      setTarget(x, y);
    });

    shell.addEventListener('pointerleave', () => {
      toCenter();
      const checkSettle = () => {
        const settled = Math.hypot(targetX - currentX, targetY - currentY) < 0.6;
        if (settled) {
          shell.classList.remove('active');
          leaveRaf = null;
        } else {
          leaveRaf = requestAnimationFrame(checkSettle);
        }
      };
      if (leaveRaf) cancelAnimationFrame(leaveRaf);
      leaveRaf = requestAnimationFrame(checkSettle);
    });

    // Contact button click handler
    const contactBtn = wrapper.querySelector('.pc-contact-btn');
    if (contactBtn) {
      contactBtn.addEventListener('click', () => {
        const name = wrapper.dataset.name || 'this person';
        console.log(`Contact clicked for ${name}`);
        // You can add your contact logic here
      });
    }

    // Initialize with center position
    const initialX = (shell.clientWidth || 0) - 70;
    const initialY = 60;
    currentX = initialX;
    currentY = initialY;
    setVarsFromXY(currentX, currentY);
    toCenter();
    initialUntil = performance.now() + 1200;
    start();
  });
});
