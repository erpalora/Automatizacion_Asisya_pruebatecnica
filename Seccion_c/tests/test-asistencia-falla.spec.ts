import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Mi Asistencia – flujo estable', async ({ page, browserName }) => {
  const base = process.env.BASE_URL || 'http://localhost:3000';

  // 1) Navegar a la pantalla objetivo
  await page.goto(`${base}/mi-asistencia`, { waitUntil: 'domcontentloaded' });

  // 2) Título visible
  await expect(page.getByRole('heading', { name: /mi asistencia/i })).toBeVisible();

  // 3) Estado en tiempo real
  const estado = page.getByTestId('estado-asistencia');
  await expect(estado).toBeVisible();
  await expect(estado).toHaveText(/EN PROCESO|ASIGNADO|PENDIENTE|EN RUTA|COMPLETADO/);

  // 4) Datos del profesional asignado
  const card = page.getByTestId('profesional-card');
  await expect(card).toBeVisible();

  const nombre = card.getByTestId('profesional-nombre');
  const telefono = card.getByTestId('profesional-telefono');

  await expect(nombre).toBeVisible();
  await expect(nombre).not.toHaveText(/^\s*$/);

  await expect(telefono).toBeVisible();
  const telText = (await telefono.textContent())?.trim() || '';
  expect.soft(telText).toMatch(/^[+()\-\s0-9]{7,}$/); // formato simple válido

  // 5) Evidencia (si el test pasa)
  fs.mkdirSync('evidencia', { recursive: true });
  await page.screenshot({
    path: `evidencia/mi-asistencia-ok-${browserName}.png`,
    fullPage: true,
  });
});