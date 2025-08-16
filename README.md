# Automatización Asisya - Prueba Técnica sección D

## 1. Frontend Web

Este proyecto contiene pruebas automatizadas para el módulo "Mi Asistencia" de la aplicación web Asisya, utilizando Playwright.

## Descripción
Las pruebas verifican funcionalidades clave como:
- Ingreso al módulo y visualización del estado de asistencia.
- Validación de los datos del profesional asignado.

## Estructura del proyecto
- `tests/`: Contiene los scripts de pruebas automatizadas.
- `playwright.config.js`: Configuración de Playwright para la ejecución de pruebas.
- `playwright-report/`: Reportes HTML generados tras la ejecución de pruebas.
- `test-results/`: Videos y resultados de las ejecuciones.

## Instalación
1. Clona el repositorio.
2. Instala las dependencias:
   ```powershell
   npm install
   ```

## Ejecución de pruebas
Para ejecutar las pruebas y generar el reporte HTML:
```powershell
npm run test
```
El reporte se genera en la carpeta `playwright-report`.

## Dependencias principales
- [Playwright](https://playwright.dev/)

## Notas
- Las credenciales de prueba están definidas en los scripts.
- Los videos y traces se generan automáticamente en caso de fallos.



## 2. Ejecución de pruebas con Postman

1. Importar colección y environment

- Abre Postman.

- En la parte superior izquierda, haz clic en Import.

- Selecciona el archivo:

- Asisya_API_Tests.postman_collection.json

- Asisya-Prod.postman_environment.json

- Confirma la importación. Verás la colección y el environment en tu workspace.

2. Configurar el environment

- En la parte superior derecha de Postman, selecciona el environment Asisya-Prod.

- Verifica que la variable base_url tenga el valor del Mock Server activo (ejemplo):

https://97b356bc-21b1-4720-9fcc-0dface8fc6cb.mock.pstmn.io

3. Ejecutar los requests

- Dentro de la colección Asisya – API Tests encontrarás dos requests principales:

- Solicitud de asistencia (válida) → responde con 200 OK y cuerpo exitoso.

- Solicitud de asistencia (inválida) → responde con 400 Bad Request y mensaje de error.

4. Revisar los resultados

- Envía cada request con el botón Send.

- Ve a la pestaña Test Results debajo de la respuesta.

- Allí podrás validar:

Código de estado esperado (200 o 400).

Tiempo de respuesta < 2 segundos.

Estructura del JSON devuelto.

Presencia y contenido de los campos obligatorios (idSolicitud, estado, mensaje) en el caso válido.

Mensaje de error en el caso inválido.

5. Ejecución automática (opcional)

Si quieres ejecutar todas las pruebas en lote:

- Abre la colección Asisya – API Tests.

- Haz clic en el botón Run Collection.

- Selecciona el environment Asisya-Prod.

- Ejecuta: se mostrarán los resultados de todos los casos en la consola de Postman.


# Sección C – Debug y Mejora

Se corrigieron selectores frágiles y esperas manuales.
Ahora se usan `getByRole` y `expect()` para esperas inteligentes.


## Contacto
Para dudas o soporte, contactar al responsable del repositorio.
Nombre: Erica Paola Lozano
Email: ing.ericalozano.0310@gmail.com
GitHub: [https://github.com/erpalora/Automatizacion_Asisya_pruebatecnica]
