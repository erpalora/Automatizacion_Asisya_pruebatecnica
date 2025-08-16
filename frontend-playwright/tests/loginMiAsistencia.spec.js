// tests/loginMiAsistencia.spec.js
const { test, expect } = require('@playwright/test');

// UI simulada (no necesitas servidor real)
const APP_HTML = `
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Asisya - Login</title>
  <style>
    body { font-family: sans-serif; margin: 24px; }
    .card { border: 1px solid #ddd; padding: 16px; max-width: 420px; border-radius: 12px; }
    label { display:block; margin-top: 8px; }
    input { width:100%; padding:8px; margin-top:4px; }
    button { margin-top: 12px; padding: 10px 16px; cursor: pointer; }
    #error { color: #b00020; margin-top: 8px; min-height: 22px; }
    .muted { color:#666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Ingreso</h1>
    <label for="username">Usuario</label>
    <input id="username" autocomplete="off" />
    <label for="password">Contraseña</label>
    <input id="password" type="password" />
    <button id="loginButton">Iniciar sesión</button>
    <div id="error" role="alert" aria-live="polite"></div>
    <p class="muted">* Los errores deben ser genéricos (A07:2021).</p>
  </div>

  <script>
    const USERS = { 'eri_prueba': 'ContraseñaSegura123' };

    function renderMiAsistencia() {
      document.body.innerHTML = \`
        <div class="card">
          <h1>Mi Asistencia</h1>
          <p><strong>Estado:</strong> <span id="estadoAsistencia">pendiente</span></p>
          <p><strong>Asignado a:</strong> <span id="profesionalAsignado">Juan Pérez – SERV123 – (+57) 3001234567</span></p>
          <p class="muted">El estado cambia automáticamente para simular "tiempo real".</p>
        </div>
      \`;
      setTimeout(() => {
        const el = document.getElementById('estadoAsistencia');
        if (el) el.textContent = 'en camino';
      }, 600);
    }

    function showGenericError() {
      const msg = 'Usuario o contraseña incorrectos';
      document.getElementById('error').textContent = msg;
      return msg;
    }

    document.getElementById('loginButton').addEventListener('click', () => {
      const u = document.getElementById('username').value.trim();
      const p = document.getElementById('password').value;

      if (!USERS[u] || USERS[u] !== p) {
        showGenericError(); // Mensaje genérico (mitiga enumeración de usuarios)
      } else {
        renderMiAsistencia();
      }
    });

    window.__helpers = { showGenericError, renderMiAsistencia };
  </script>
</body>
</html>
`;

// 1) Seguridad: mensajes genéricos (A07:2021)
test('Login: error genérico en usuario inexistente y clave incorrecta', async ({ page }) => {
  await page.setContent(APP_HTML);

  // Caso A: usuario inexistente
  await page.locator('#username').fill('no_existe');
  await page.locator('#password').fill('cualquiera');
  await page.locator('#loginButton').click();
  const errorA = await page.locator('#error').innerText();
  await expect(page.locator('#error')).toHaveText('Usuario o contraseña incorrectos');

  // Reset
  await page.locator('#username').fill('');
  await page.locator('#password').fill('');
  await page.locator('#error').evaluate(el => el.textContent = '');

  // Caso B: usuario válido + clave incorrecta
  await page.locator('#username').fill('eri_prueba');
  await page.locator('#password').fill('mal');
  await page.locator('#loginButton').click();
  const errorB = await page.locator('#error').innerText();
  await expect(page.locator('#error')).toHaveText('Usuario o contraseña incorrectos');

  // Deben ser idénticos
  expect(errorA).toBe(errorB);
});

// 2) Flujo: Mi Asistencia (estado en "tiempo real" + profesional)
test('Mi Asistencia: estado y profesional asignado', async ({ page }) => {
  await page.setContent(APP_HTML);

  // Login correcto
  await page.locator('#username').fill('eri_prueba');
  await page.locator('#password').fill('ContraseñaSegura123');
  await page.locator('#loginButton').click();

  // Entró al módulo
  await expect(page.locator('h1')).toHaveText('Mi Asistencia');

  // Estado cambia a "en camino"
  await expect(page.locator('#estadoAsistencia')).toHaveText('en camino', { timeout: 3000 });

  // Profesional asignado presente
  await expect(page.locator('#profesionalAsignado')).not.toHaveText('');
});