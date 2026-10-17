const media = window.matchMedia('(prefers-reduced-motion: reduce)');

const contactDropdown = document.querySelector<HTMLDetailsElement>('.contact-dropdown');
document.addEventListener('click', event => {
  if (event.target instanceof Node && !contactDropdown?.contains(event.target)) contactDropdown?.removeAttribute('open');
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !contactDropdown?.open) return;
  contactDropdown.open = false;
  contactDropdown.querySelector('summary')?.focus();
});

// Start from readable HTML; opt in to motion only when it can be observed.
if (!media.matches && 'IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -64px 0px' });
  document.querySelectorAll('[data-reveal-group]').forEach(group => {
    group.querySelectorAll<HTMLElement>(':scope > [data-reveal]').forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 80}ms`);
    });
  });
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) return;
    element.classList.add('will-reveal');
    reveal.observe(element);
  });
  media.addEventListener('change', event => {
    if (!event.matches) return;
    document.querySelectorAll('.will-reveal').forEach(element => element.classList.add('is-visible'));
    reveal.disconnect();
  });
  document.addEventListener('focusin', event => {
    if (!(event.target instanceof HTMLElement)) return;
    const target = event.target.closest<HTMLElement>('.will-reveal');
    if (!target) return;
    target.style.setProperty('--reveal-delay', '0ms');
    target.classList.add('is-visible');
    reveal.unobserve(target);
  });
}

const progress = document.querySelector<HTMLElement>('.reading-progress > span');
let scrollFrame = 0;
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress?.style.setProperty('transform', `scaleX(${distance > 0 ? Math.min(1, window.scrollY / distance) : 0})`);
  document.querySelector('.site-header')?.classList.toggle('is-scrolled', window.scrollY > 24);
  scrollFrame = 0;
}
window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

const sections = document.querySelectorAll<HTMLElement>('main > section[id]');
const links = document.querySelectorAll<HTMLAnchorElement>('.site-header nav a, .chapter-rail a');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
}

const copy = document.querySelector<HTMLButtonElement>('[data-copy-email]');
let feedbackTimer: ReturnType<typeof setTimeout>;
copy?.addEventListener('click', async () => {
  const email = copy.dataset.copyEmail;
  const feedback = copy.querySelector<HTMLElement>('.copy-feedback');
  if (!email || !feedback) return;
  try {
    await navigator.clipboard.writeText(email);
    feedback.textContent = 'Email copied';
  } catch {
    feedback.textContent = email;
  }
  copy.classList.add('has-feedback');
  clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => copy.classList.remove('has-feedback'), 4000);
});

const scene = document.querySelector<HTMLElement>('[data-tilt]');
if (scene) {
  const choices = scene.querySelectorAll<HTMLButtonElement>('[data-layer-choice]');
  scene.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest('[data-layer-choice], [data-scene-layer]');
    const id = target?.getAttribute('data-layer-choice') ?? target?.getAttribute('data-scene-layer');
    const selected = Array.from(choices).find(choice => choice.dataset.layerChoice === id);
    if (!selected) return;
    choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === selected)));
    scene.querySelectorAll<SVGGElement>('[data-scene-layer]').forEach(layer => layer.classList.toggle('is-active', layer.dataset.sceneLayer === id));
    scene.querySelector('.scene-description')!.textContent = selected.dataset.description!;
    scene.querySelector('.scene-tools')!.textContent = selected.dataset.tools!;
  });
  if ('IntersectionObserver' in window) {
    const visibility = new IntersectionObserver(entries => {
      scene.classList.toggle('is-in-view', entries[0].isIntersecting);
    }, { threshold: .1 });
    visibility.observe(scene);
  }
}
if (scene && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  scene.addEventListener('pointermove', event => {
    if (media.matches) return;
    const box = scene.getBoundingClientRect();
    scene.style.setProperty('--tilt-x', `${((event.clientY - box.top) / box.height - 0.5) * -5}deg`);
    scene.style.setProperty('--tilt-y', `${((event.clientX - box.left) / box.width - 0.5) * 5}deg`);
  });
  scene.addEventListener('pointerleave', () => {
    scene.style.setProperty('--tilt-x', '0deg');
    scene.style.setProperty('--tilt-y', '0deg');
  });
}
