// playwright.config.js - Configuración de Playwright
// Este archivo configura el entorno de pruebas, incluyendo el uso de un reportero HTML
// y la captura de video en caso de fallos.

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Directorio donde se encuentran los tests
  timeout: 30 * 1000, // Tiempo de espera máximo para cada test (30 segundos)
  expect: {
    timeout: 5000 // Tiempo de espera para las aserciones
  },
  reporter: 'html', // Genera un reporte HTML de los resultados
  use: {
    actionTimeout: 0, // Tiempo de espera para acciones como clics o rellenos
    trace: 'on-first-retry', // Captura un trace de la ejecución para depuración
    video: 'on-first-retry', // Graba un video del test si falla en el primer intento
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...require('@playwright/test').devices['Desktop Chrome'],
      },
    },
  ],
});


// tests/asistencia.spec.js - Scripts de pruebas automatizadas
// Este archivo contiene el código de los tests que automatizan el módulo "Mi Asistencia"
// de la aplicación Asisya.

const { test, expect } = require('@playwright/test');

// Se define una "fixture" para la URL de la aplicación, facilitando su manejo.
test.use({
  baseURL: 'https://app.asisya.com' // Usamos la URL base de la aplicación
});

test.describe('Módulo "Mi Asistencia" - Visualización de Estado', () => {

  // Test Case 1: Ingreso al módulo "Mi Asistencia" y visualización del estado
  test('TC01: Ingreso al módulo y validación de estado en tiempo real', async ({ page }) => {
    // Escenario: El usuario navega a la página de login y accede al módulo de asistencia.
    // Precondiciones: El usuario tiene credenciales válidas.
    
    await test.step('Navegar a la página de inicio', async () => {
      await page.goto('/login');
    });

    await test.step('Ingresar credenciales', async () => {
      // Ingresar credenciales de prueba
      await page.fill('input#username', 'usuario_qa');
      await page.fill('input#password', 'QaP@ssw0rd!');
      await page.click('button#login');
      // Espera automática a que la navegación termine
    });

    await test.step('Navegar al módulo "Mi Asistencia"', async () => {
      // Simular la navegación al módulo después del login
      await page.goto('/mi-asistencia');
      // El framework tiene "espera automática" para que los elementos carguen.
    });
    
    await test.step('Validar el estado de la asistencia', async () => {
      // Asegurarse de que el elemento que muestra el estado existe y es visible.
      // Suponemos que hay un elemento con un ID 'estado-asistencia'.
      const estadoElement = page.locator('#estado-asistencia');
      await expect(estadoElement).toBeVisible();

      // Validar que el texto del estado sea uno de los esperados
      const textoEstado = await estadoElement.textContent();
      console.log(`Estado de asistencia: ${textoEstado}`);
      expect(textoEstado).toMatch(/^(En curso|Finalizada|Pendiente|Asignada)$/);
    });
  });

  // Test Case 2: Validación de datos del profesional asignado
  test('TC02: Validar datos del profesional asignado', async ({ page }) => {
    // Escenario: El usuario visualiza la información del profesional asignado en el módulo.
    // Precondiciones: Una asistencia ha sido asignada a un profesional.

    await test.step('Navegar al módulo "Mi Asistencia"', async () => {
      // Simular la navegación directa al módulo para este test.
      // En una suite completa, esto se haría después de un login exitoso.
      await page.goto('/mi-asistencia');
    });

    await test.step('Validar la información del profesional', async () => {
      // Validar que los campos del profesional (nombre, especialidad, etc.) sean visibles.
      const profesionalNombre = page.locator('#profesional-nombre');
      const profesionalEspecialidad = page.locator('#profesional-especialidad');
      const profesionalTelefono = page.locator('#profesional-telefono');

      await expect(profesionalNombre).toBeVisible();
      await expect(profesionalEspecialidad).toBeVisible();
      await expect(profesionalTelefono).toBeVisible();

      // Validar que la información no esté vacía
      await expect(profesionalNombre).not.toBeEmpty();
      await expect(profesionalEspecialidad).not.toBeEmpty();
      await expect(profesionalTelefono).not.toBeEmpty();

      // Opcional: Validar el formato del teléfono
      const telefonoTexto = await profesionalTelefono.textContent();
      expect(telefonoTexto).toMatch(/^\d{10}$/); // Ejemplo de formato numérico de 10 dígitos
    });
  });

});