import { expect, test, type Page } from '@playwright/test';
import iconGlyphs from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';

// Controleer ook het echte teken uit het icoonfont, niet alleen de tekst ernaast.
const glyphs: Record<string, number> = iconGlyphs;

async function expectIcon(page: Page, label: string, name: string) {
  const icon = page.getByRole('img', { name: label, exact: true });
  await expect(icon).toBeVisible();
  await expect(icon).toHaveText(String.fromCodePoint(glyphs[name]));
  await expect.poll(() => icon.evaluate((element) => {
    const font = getComputedStyle(element).fontFamily;
    return font.includes('material-community') && document.fonts.check(`64px ${font}`);
  })).toBe(true);
}

test('menu, dropdown en alle vier enum-iconen werken', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Weer kiezen', exact: true }).click();
  await expect(page).toHaveURL(/\/enum_example$/);

  const cases = [
    ['Sunny', 'weather-sunny'],
    ['Cloudy', 'weather-cloudy'],
    ['Rainy', 'weather-rainy'],
    ['Snowy', 'weather-snowy'],
  ];
  for (const [weather, icon] of cases) {
    await page.getByRole('combobox', { name: 'Kies het weer' }).selectOption(weather);
    await expect(page.getByText(`Het huidige weer is: ${weather}`, { exact: true })).toBeVisible();
    await expectIcon(page, `Het huidige weer is: ${weather}`, icon);
  }
  await page.screenshot({ path: 'test-results/enum-mobile.png', fullPage: true });
  await page.getByRole('button', { name: 'Terug naar menu' }).click();
  await expect(page.getByRole('heading', { name: 'Jouw weeratelier.' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('schakelaars tonen alle vier ternary-combinaties', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Dag & temperatuur', exact: true }).click();
  await expect(page).toHaveURL(/\/ternary_example$/);
  const day = page.getByRole('switch', { name: 'Dagmodus', exact: true });
  const sunny = page.getByRole('switch', { name: 'Zonnig of helder', exact: true });

  await expect(day).toBeChecked();
  await expect(sunny).toBeChecked();
  await expectIcon(page, 'Het is dag', 'weather-sunny');
  await expectIcon(page, 'Dag + zonnig', 'weather-sunny');
  await sunny.uncheck();
  await expectIcon(page, 'Dag + bewolkt', 'weather-cloudy');
  await day.uncheck();
  await expectIcon(page, 'Het is nacht', 'weather-night');
  await expectIcon(page, 'Nacht + bewolkt', 'weather-night-partly-cloudy');
  await sunny.check();
  await expectIcon(page, 'Nacht + helder', 'weather-night');
  await page.screenshot({ path: 'test-results/ternary-mobile.png', fullPage: true });
  await page.getByRole('button', { name: 'Terug naar menu' }).click();
  await expect(page.getByRole('heading', { name: 'Jouw weeratelier.' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('situaties, reset, code-uitleg en wisselen tussen opdrachten', async ({ page }) => {
  await page.goto('/ternary_example');
  await page.getByRole('button', { name: 'Vorst · 0°', exact: true }).click();
  await expectIcon(page, 'Zeer koud · overdag', 'snowflake');
  await page.getByRole('button', { name: 'Hitte · 30°', exact: true }).click();
  await expectIcon(page, 'Zeer warm · overdag', 'thermometer-high');
  await page.getByRole('button', { name: 'Lentedag · 20°', exact: true }).click();
  await expect(page.getByText('Temperatuur: 20°C', { exact: true })).toBeVisible();
  await page.getByRole('switch', { name: 'Dagmodus', exact: true }).uncheck();
  await page.getByRole('switch', { name: 'Zonnig of helder', exact: true }).uncheck();
  await page.getByRole('button', { name: 'Begin opnieuw', exact: true }).click();
  await expect(page.getByRole('switch', { name: 'Dagmodus', exact: true })).toBeChecked();
  await expect(page.getByRole('switch', { name: 'Zonnig of helder', exact: true })).toBeChecked();
  await expectIcon(page, 'Dag + zonnig', 'weather-sunny');

  const explanation = page.getByRole('button', { name: 'Hoe werkt dit? Deel 1 · isDayTime', exact: true });
  await explanation.click();
  await expect(explanation).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText(/Een ternary kiest tussen twee mogelijkheden/)).toBeVisible();
  await explanation.click();
  await expect(explanation).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: 'Naar weer kiezen', exact: true }).click();
  await expect(page).toHaveURL(/\/enum_example$/);
  await page.getByRole('button', { name: 'Hoe werkt dit? Enum & switch statement', exact: true }).click();
  await expect(page.getByText(/De Weather-enum bevat vier vaste waarden/)).toBeVisible();
  await page.getByRole('button', { name: 'Verder naar dag & temperatuur', exact: true }).click();
  await expect(page).toHaveURL(/\/ternary_example$/);
});

test('het menu past op een klein scherm en een breed scherm', async ({ page }) => {
  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Weer kiezen', exact: true })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    expect(overflow).toBe(false);
    await page.screenshot({ path: `test-results/menu-${width}.png`, fullPage: true });
  }
});

test('temperatuurknoppen en grenzen reageren bij dag en nacht', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/ternary_example');
  const plus = page.getByRole('button', { name: 'Temperatuur verhogen' });
  const minus = page.getByRole('button', { name: 'Temperatuur verlagen' });
  const day = page.getByRole('switch', { name: 'Dagmodus', exact: true });
  await expect(page.getByText('Temperatuur: 20°C', { exact: true })).toBeVisible();

  for (const isDay of [true, false]) {
    await day.setChecked(isDay);
    const time = isDay ? 'overdag' : "'s nachts";
    await expectIcon(page, `Normale temperatuur · ${time}`, isDay ? 'weather-sunny' : 'weather-night');
    for (let step = 0; step < 9; step++) await plus.click();
    await expect(page.getByText('Temperatuur: 29°C', { exact: true })).toBeVisible();
    await expectIcon(page, `Normale temperatuur · ${time}`, isDay ? 'weather-sunny' : 'weather-night');
    await plus.click();
    await expect(page.getByText('Temperatuur: 30°C', { exact: true })).toBeVisible();
    await expectIcon(page, `Zeer warm · ${time}`, 'thermometer-high');
    for (let step = 0; step < 29; step++) await minus.click();
    await expect(page.getByText('Temperatuur: 1°C', { exact: true })).toBeVisible();
    await expectIcon(page, `Normale temperatuur · ${time}`, isDay ? 'weather-sunny' : 'weather-night');
    await minus.click();
    await expect(page.getByText('Temperatuur: 0°C', { exact: true })).toBeVisible();
    await expectIcon(page, `Zeer koud · ${time}`, 'snowflake');
    await minus.click();
    await expect(page.getByText('Temperatuur: -1°C', { exact: true })).toBeVisible();
    await expectIcon(page, `Zeer koud · ${time}`, 'snowflake');
    for (let step = 0; step < 21; step++) await plus.click();
  }
  expect(errors).toEqual([]);
});
