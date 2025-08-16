# Automatización Asisya – Prueba Técnica QA

Este repositorio contiene la solución a la prueba técnica para la vacante de Ingeniero QA.  
Incluye pruebas funcionales y automatizadas sobre API y Frontend, además de evidencias documentadas.

---

## 📂 Sección A – Diseño de Pruebas
Se documentó el análisis de requerimientos y la creación de **casos de prueba** para el endpoint `/api/asisya/solicitud-asistencia`.  
Se incluyeron casos positivos, negativos y de validación de campos obligatorios.  

📄 Los casos están disponibles en la carpeta `Seccion_a/` como documento detallado.

---

## 📂 Sección B – Automatización de API y Frontend

### 1. Automatización de Frontend (Playwright)
Se entregó un fragmento de test defectuoso que debía corregirse.  

**Problema detectado:**
- Navegaba a `http://localhost:3000/mi-asistencia` sin aplicación disponible → `ERR_CONNECTION_REFUSED`.
- Los selectores no encontraban elementos → timeouts y flakiness.

**Solución aplicada:**
- Se creó un dummy HTML `example-app/mi-asistencia/index.html` con:
  - Título `<h1>Mi Asistencia</h1>`.
  - Estado en tiempo real (`data-testid="estado-asistencia"`).
  - Tarjeta de profesional asignado (`data-testid="profesional-card"`).
- Se corrigieron los selectores en el test.
- Se sirvió el HTML con `http-server` en el puerto 3000.
- El test se ejecutó en Playwright y ahora **pasa estable**.

**Evidencia:**
- 📸 Screenshot: `Seccion_b/evidencia/mi-asistencia-ok.png`
- 🎥 Video de ejecución: `Seccion_b/test-results/.../video.webm`
- 📊 Reporte HTML: `Seccion_b/playwright-report/index.html`

---

### 2. Automatización de API (Postman)
Se construyó una colección en Postman con pruebas sobre el endpoint `/api/asisya/solicitud-asistencia`.  

**Flujo desarrollado:**
1. Se configuró un **Mock Server en Postman** para simular la API.  
2. Se implementaron requests de:
   - Solicitud válida → responde 200 con JSON correcto.  
   - Solicitud inválida → responde 400 con mensaje de error.  
3. Se programaron tests automáticos en Postman para validar:
   - Código de estado esperado.  
   - Tiempo de respuesta < 2 segundos.  
   - Estructura del JSON de respuesta.  
   - Presencia y contenido de campos obligatorios (`idSolicitud`, `estado`, `mensaje`).  

**Evidencia:**
- 📄 Colección: `Seccion_b/Asisya_API_Tests.postman_collection.json`  
- 🌍 Environment: `Seccion_b/Asisya-Prod.postman_environment.json`  
- 📑 Readme con instrucciones de ejecución paso a paso.  

**Nota:** Inicialmente se recibieron errores `400` y `404` al apuntar al endpoint real, por lo cual se resolvió implementando un Mock Server. Esto permitió validar el flujo y los tests de manera controlada.  

---

## 📂 Sección C – Test Automatizado (Playwright)

**Objetivo:** Corregir un test defectuoso e identificar causa de fallo.

**Fallas originales:**
- Conexión a `localhost:3000` sin app levantada.  
- Selectores frágiles que no encontraban elementos.  

**Solución:**
- Se creó dummy HTML `mi-asistencia/index.html`.  
- Se corrigieron selectores y esperas en el test.  
- Se ejecutó contra un servidor estático local.  

**Resultado:**  
✔ Todos los assertions pasan.  
✔ Se adjunta evidencia (screenshot, video, logs, reporte HTML).  

---

## 📂 Sección D – Pruebas de Rendimiento (JMeter + Power BI)

**Objetivo:** Medir desempeño del endpoint `/solicitud-asistencia`.  

**Ejecución:**
- Se configuró un plan de pruebas en JMeter con Thread Group y HTTP Request.  
- Al apuntar al endpoint real, se obtuvieron errores 400/404.  
- Para resolverlo, se usó el **Mock Server de Postman** como backend simulado.  

**Resultados:**
- Se recolectaron métricas de latencia, throughput y errores con **Summary Report** y **Aggregate Report**.  
- Los resultados se exportaron a CSV y se visualizaron en Power BI.  

**Evidencia:**
- 📊 Archivo JMeter `.jmx`.  
- 📄 CSV con métricas.  
- 📑 Dashboard en Power BI (`Dashboard Asisya.pbix` + `Dashboard Asisya.pdf`).  

---

## 📂 Bonus – Dashboard Power BI

Se construyó un dashboard en Power BI para visualizar resultados de rendimiento:  

- **Latencia promedio** (ms).  
- **Throughput por tipo de petición**.  
- **Tiempos de respuesta comparativos**.  
- **% de error y total de solicitudes**.  

📄 Entregables:  
- `Dashboard Asisya.pbix` (editable en Power BI Desktop).  
- `Dashboard Asisya.pdf` (versión exportada).  

**Valor agregado:**  
Este dashboard facilita comunicar hallazgos técnicos a perfiles no técnicos, mostrando indicadores clave de desempeño en forma clara y visual.  

---

## 📌 Recomendaciones de mejora (CI/CD y monitoreo)

- **Paralelización de pruebas:**  
  Ejecutar tests de Playwright con `--workers` y usar Thread Groups de JMeter para simular carga concurrente.  

- **Monitoreo de ejecución:**  
  Centralizar logs de Postman y JMeter en un repositorio de resultados. Usar Power BI para visualizarlos.  

- **Integración CI/CD:**  
  Propuesta de integrar Playwright y Postman en un pipeline de GitHub Actions, con métricas de % de éxito, tiempos y errores.  

---

## 👤 Contacto
**Nombre:** Erica Paola Lozano  
**Email:** ing.ericalozano.0310@gmail.com  
**GitHub:** [https://github.com/erpalora/Automatizacion_Asisya_pruebatecnica](https://github.com/erpalora/Automatizacion_Asisya_pruebatecnica)
