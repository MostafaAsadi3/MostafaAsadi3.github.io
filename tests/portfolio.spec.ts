import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('SEO metadata, crawler files, and structured data describe the live site', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Mostafa Asadi | Senior Frontend Engineer, React & Next.js');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://mostafaasadi3.github.io/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://mostafaasadi3.github.io/social-card.png');
  const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText())['@graph'];
  expect(graph.find((entity: { '@type': string }) => entity['@type'] === 'Person')).toMatchObject({ name: 'Mostafa Asadi', jobTitle: 'Senior Frontend Engineer', sameAs: ['https://github.com/MostafaAsadi3', 'https://www.linkedin.com/in/mostafa-asadi-78a597271/'] });
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain('<loc>https://mostafaasadi3.github.io/resume/</loc>');
  expect(await sitemap.text()).not.toContain('404');
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('Sitemap: https://mostafaasadi3.github.io/sitemap.xml');
  await page.goto('/resume/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://mostafaasadi3.github.io/resume/');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /resume: senior frontend engineering/);
  await page.goto('/404.html');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});

test('engineering layers support pointer and keyboard selection and pause offscreen', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const scene = page.locator('.architecture-scene');
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveClass(/is-in-view/);
  const components = page.getByRole('button', { name: '02 Components' });
  await components.click();
  await expect(components).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.scene-description')).toContainText('Reusable building blocks');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: '03 Architecture' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.scene-description')).toContainText('Maintainable systems');
  const topLayer = await page.locator('[data-scene-layer="ui"]').boundingBox();
  expect(topLayer).not.toBeNull();
  await page.mouse.click(topLayer!.x + topLayer!.width / 2, topLayer!.y + topLayer!.height / 2);
  await expect(page.getByRole('button', { name: '01 UI' })).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(scene).not.toHaveClass(/is-in-view/);
  await expect(page.locator('.layer-top')).toHaveCSS('animation-play-state', 'paused');
});

test('sections visibly fade in as they enter the viewport', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const firstPillar = page.locator('.expertise-pillar').first();
  await expect(firstPillar).toHaveCSS('opacity', '0');
  await firstPillar.scrollIntoViewIfNeeded();
  await expect(firstPillar).toHaveCSS('opacity', '1');
  const workCard = page.locator('.work-card').first();
  await expect(workCard).toHaveCSS('opacity', '0');
  await workCard.scrollIntoViewIfNeeded();
  await expect(workCard).toHaveCSS('opacity', '1');
});

test('reduced motion keeps every section readable immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.expertise-pillar').first()).toHaveCSS('opacity', '1');
  await expect(page.locator('.work-card').first()).toHaveCSS('opacity', '1');
});

test.describe('server-rendered content', () => {
  test.use({ javaScriptEnabled: false });
  test('content is readable before client-side JavaScript', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Thoughtful interfaces\s*Solid engineering/);
    await expect(page.getByRole('heading', { name: /Clear boundaries\s*Room to evolve/ })).toBeVisible();
    await page.locator('.work-card summary').first().click();
    await expect(page.getByText('A banking client management and monitoring application', { exact: false })).toBeVisible();
  });
});

test('expertise supports selection and keyboard navigation', async ({ page }) => {
  await page.goto('/');
  await page.locator('.expertise-explorer').scrollIntoViewIfNeeded();
  const tabs = page.getByRole('tab');
  await expect(tabs).toHaveCount(9);
  await tabs.nth(4).click();
  await expect(tabs.nth(4)).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('Make every byte count');
  await tabs.nth(4).press('ArrowDown');
  await expect(tabs.nth(5)).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('Protect the essentials');
  await tabs.nth(5).press('End');
  await expect(tabs.nth(8)).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('Ship with confidence');
  await tabs.nth(8).press('ArrowDown');
  await expect(tabs.first()).toBeFocused();
});

test('navigation, contact, and resume lead to working destinations', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.work-card h3')).toHaveText(['Bank Sepah', 'Tosan SCF', 'Banking identity & access', 'Enterprise operations']);
  await expect(page.locator('#work')).not.toContainText(/medical imaging/i);
  await page.getByText('Contact me', { exact: true }).click();
  await expect(page.getByRole('link', { name: 'Phone +98 936 165 8930' })).toHaveAttribute('href', 'tel:+989361658930');
  await expect(page.getByRole('link', { name: 'Email icetruckkiller3@gmail.com' })).toHaveAttribute('href', 'mailto:icetruckkiller3@gmail.com');
  await page.keyboard.press('Escape');
  await expect(page.locator('.contact-dropdown')).not.toHaveAttribute('open');
  await page.getByText('Contact me', { exact: true }).click();
  await page.locator('#hero-title').click();
  await expect(page.locator('.contact-dropdown')).not.toHaveAttribute('open');
  await expect(page.locator('#contact').getByRole('link', { name: 'icetruckkiller3@gmail.com' })).toHaveAttribute('href', 'mailto:icetruckkiller3@gmail.com');
  await expect(page.locator('#contact').getByRole('link', { name: '+98 936 165 8930' })).toHaveAttribute('href', 'tel:+989361658930');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (value: string) => { (window as Window & { copiedEmail?: string }).copiedEmail = value; } } });
  });
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.locator('.copy-feedback')).toHaveText('Email copied');
  expect(await page.evaluate(() => (window as Window & { copiedEmail?: string }).copiedEmail)).toBe('icetruckkiller3@gmail.com');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Resume', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Mostafa Asadi');
  await expect(page.getByRole('heading', { name: 'Bank Sepah — Internet banking', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tosan SCF — Electronic promissory notes & bills of exchange', exact: true })).toBeVisible();
  await expect(page.locator('main')).not.toContainText(/medical imaging/i);
  await expect(page.getByRole('button', { name: 'Print / Save as PDF' })).toBeVisible();
});

test('layouts fit narrow screens and long expertise labels', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('.expertise-explorer').scrollIntoViewIfNeeded();
    await page.getByRole('tab', { name: 'Frontend security' }).click();
    await expect(page.getByRole('tabpanel')).toContainText('Handle trust');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow, `horizontal overflow at ${width}px`).toBe(false);
  }
});

test('pages pass automated accessibility checks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('.expertise-explorer').scrollIntoViewIfNeeded();
  await expect(page.getByRole('tab').first()).toBeVisible();
  const home = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(home.violations).toEqual([]);
  await page.goto('/resume/');
  const resume = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(resume.violations).toEqual([]);
});
