# Causa probable del fallo

1. Selectores frágiles: el test usaba selectores CSS genéricos (.card:first-child, nth-child) que cambian con mínimos ajustes de UI.

2. Esperas explícitas: se usaban waitForTimeout y tiempo fijo; con datos asíncronos esto genera flakiness.

3. Aserciones poco precisas: se validaba visibilidad sin verificar contenido mínimo (nombre/telefono).

4. Sin evidencia en éxito: no se guardaba evidencia al pasar el test.

# Correcciones aplicadas

- Reemplacé selectores por accesibilidad y data-testid: getByRole, getByTestId.

- Eliminé esperas fijas y usé auto-esperas de Playwright con expect(...).

- Aserciones atómicas y legibles (regex de estados, formato de teléfono).

- Genero screenshot en éxito y reporte HTML para adjuntar como evidencia.