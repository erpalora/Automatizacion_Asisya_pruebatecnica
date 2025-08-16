# Automatización Asisya – Prueba Técnica QA

Este repositorio contiene la solución a la prueba técnica para la vacante de Ingeniero QA.  
Incluye pruebas funcionales y automatizadas sobre API y Frontend, además de evidencias documentadas.

---

## 📂 Sección A – Diseño de Pruebas

En esta sección se documenta el diseño y planeación de pruebas para el endpoint `/api/asisya/solicitud-asistencia`.  

Se incluyeron:  
- ✅ Documento en PDF con **casos de prueba** (positivos, negativos, validaciones y rendimiento).  
- ✅ Archivo Excel con el **flujo completo de QA**:  
  - Casos de uso 
  - Épicas  
  - Historias de usuario  
  - Casos de prueba asociados  

📄Los archivos están disponibles en la carpeta `Seccion_a/` del repositorio y en el [Google Drive con evidencias](https://drive.google.com/drive/folders/1CKVlId6vyewQEQBs-4rY6n__CRgyzoJM).
---

## 📂 Sección B – Automatización de API y Frontend

### 1. Automatización de Frontend (Playwright)

Se entregó un fragmento de test defectuoso que debía corregirse.  

**Problema detectado:**
- Navegaba a `http://localhost:3000/mi-asistencia` sin aplicación disponible → `ERR_CONNECTION_REFUSED`.  
- Los selectores no encontraban elementos → timeouts y flakiness.  

**Solución aplicada:**
- Se creó un example HTML `example-app/mi-asistencia/index.html` con:
  - Título `<h1>Mi Asistencia</h1>`.
  - Estado en tiempo real (`data-testid="estado-asistencia"`).
  - Tarjeta de profesional asignado (`data-testid="profesional-card"`).
- Se corrigieron y estabilizaron los selectores en el test.
- Se sirvió el HTML con `http-server` en el puerto 3000.
- El test se ejecutó en Playwright y ahora **pasa estable** con fixtures, espera automática y grabación de evidencia.

**Ejecución paso a paso:**
```bash
# Instalar dependencias
npm install

# Servir el dummy HTML en localhost:3000
npx http-server example-app -p 3000

# Ejecutar las pruebas
npx playwright test

# Visualizar el reporte en HTML
npx playwright show-report
```
**Evidencias:**
- 🎥 Video de ejecución: 'https://drive.google.com/drive/u/2/folders/1Xeal4eHtq-yxkqB5oQjM4wh8hO-IoU1K'
- 📊 Reportes: 'https://drive.google.com/drive/u/2/folders/1y5tY5Azo3q52h-GQ_SUbtT3Z2XjA2xpe'

---

### 2. Automatización de API (Postman)

Se automatizó el endpoint /api/asisya/solicitud-asistencia con método POST.

Problema detectado:

El endpoint real devolvía errores (400/404), imposibilitando probar la lógica de negocio.

Solución aplicada:

Se creó un Mock Server en Postman con dos escenarios:

200 OK → JSON válido con idSolicitud, estado, mensaje.

400 Bad Request → JSON de error.

Se implementaron tests automáticos para validar:

✅ Código HTTP 200.

✅ Tiempo de respuesta < 2 segundos.

✅ Estructura del JSON (idSolicitud, estado, mensaje).

✅ Campos obligatorios no vacíos.

✅ Método POST.

Ejecución paso a paso:
```bash
Importar en Postman los archivos:

Seccion_b/Asisya.postman_collection.json

Seccion_b/Asisya.postman_environment.json

Seleccionar el environment Asisya.

Ejecutar la colección con Run Collection.

Verificar que todos los tests aparecen en verde (PASSED).
```
Evidencias:

📂 Archivos JSON (colección y environment) en el Repositorio GitHub: 'https://github.com/erpalora/Automatizacion_Asisya_pruebatecnica'

📸 Capturas de ejecución: 'https://drive.google.com/drive/u/2/folders/1DXw1sX3BFwiWuqMurSB1PYWn_WQTn79D'

---

## 📂 Sección C – Corrección de Test Automatizado (Playwright)

En esta sección se entregó un fragmento de test automatizado **defectuoso**, con errores intencionales que provocaban fallos o inestabilidad en la ejecución.  

### 📍 Problema detectado
- El test navegaba a `http://localhost:3000/mi-asistencia` cuando no había aplicación levantada → `ERR_CONNECTION_REFUSED`.  
- El selector usado para el título no encontraba elementos → `Timed out 5000ms waiting for expect(locator).toBeVisible()`.  
- Ausencia de datos de estado y profesional que el test esperaba validar.  

### 🔧 Solución aplicada
- Se creó un **HTML dummy** en `Seccion_c/example-app/mi-asistencia/index.html` con:
  - Título `<h1>Mi Asistencia</h1>`.  
  - Estado en tiempo real (`data-testid="estado-asistencia"`).  
  - Tarjeta de profesional asignado (`data-testid="profesional-card"` con nombre y especialidad).  
- Se corrigieron los **selectores** en el test para alinearlos con el HTML.  
- Se levantó el HTML en un servidor local con `http-server`.  
- El test se reejecutó en **Playwright** y pasó de forma **estable**.  

### ▶️ Ejecución paso a paso
```bash
# Instalar dependencias
npm install

# Levantar servidor local en el puerto 3000
npx http-server example-app -p 3000

# Ejecutar el test corregido
npx playwright test tests/test-asistencia-falla.spec.ts

# Visualizar reporte en HTML
npx playwright show-report
```
### 📄 Evidencias

📸 Screenshot de ejecución y videos: https://drive.google.com/drive/u/2/folders/1K-juGEAmwPZHZlyDVfTjGkVTHmRJQpQw

📊 Reporte HTML generado: https://drive.google.com/drive/u/2/folders/1K-juGEAmwPZHZlyDVfTjGkVTHmRJQpQw

📂 Archivos en el Repositorio GitHub: https://github.com/erpalora/Automatizacion_Asisya_pruebatecnica

---

## 📂 Sección D – Validación de Disponibilidad y Seguridad

### 1. Estrategia de Alta Disponibilidad (24/7)

El objetivo es garantizar que la plataforma de asistencia esté disponible y funcionando de forma continua.  
La estrategia propuesta incluye:

- 🔄 **Monitoreo proactivo y continuo** → herramientas como *UptimeRobot* o *NewRelic*.  
- 📈 **Pruebas de carga y estrés periódicas** → JMeter/Postman para validar picos de solicitudes.  
- 💥 **Pruebas de resiliencia (Chaos Engineering)** → simular caída de nodos y validar failover.  
- 🚀 **Automatización de despliegues y rollbacks** → CI/CD con pruebas automáticas.  
- 🛠 **Mantenimiento preventivo y actualizaciones** → ventanas programadas con mínimo impacto.  

📑 Evidencia: documento de estrategia en `PRUEBA TÉCNICA INGENIERO QA - ASISYASeccionD.pdf`.

---

### 2. Validación de SLA y Rendimiento – API `/api/asisya/seguimiento`

**Requerimiento:**  
Validar que el endpoint cumpla con un tiempo de respuesta promedio < **1.5 segundos** con una carga de **10 req/seg** durante **30s**.

#### 🔹 Opción A: Postman
- Se creó la colección `Asisya-Seguimiento.postman_collection.json`.  
- Configuración de ejecución:
  - 300 iteraciones.
  - Retraso entre iteraciones: 100 ms.
- Validaciones automáticas en Postman:
  - ✅ Código de estado 200.  
  - ✅ Tiempo de respuesta < 1500 ms.  
  - ✅ `idSolicitud` presente en el cuerpo de la respuesta.  

📄 Evidencia: captura de ejecución incluida en el PDF de la sección.

#### 🔹 Opción B: JMeter
- Test Plan → `Prueba_SLA_Asisya.jmx`.  
- Configuración:
  - Thread Group con 10 hilos, duración 30s.
  - HTTP Request → `POST /api/asisya/seguimiento`.
  - Listeners: Summary Report y View Results Tree.  

📄 Evidencia: reporte incluido en el PDF.

---

### 3. Validación de Seguridad – OWASP Top 10

Se probó el riesgo **A07:2021 – Security Misconfiguration** en el login.  
Objetivo: evitar que mensajes de error revelen si el usuario existe o no.

- **Prueba:**  
  - Escenario 1: usuario inexistente + contraseña cualquiera.  
  - Escenario 2: usuario válido + contraseña incorrecta.  
- **Resultado esperado:**  
  - El mensaje debe ser genérico: `"Usuario o contraseña incorrectos"`.  
  - No se debe revelar si el usuario existe.  

📄 Evidencia: pruebas documentadas en Postman y capturas en el PDF.

---

✅ Con esta sección se validó:  
- Disponibilidad 24/7 mediante estrategia proactiva.  
- SLA del endpoint `/seguimiento` bajo carga controlada.  
- Seguridad básica frente a errores de login, cumpliendo OWASP.


**Evidencia:**
- 📊 Archivos: pdf con PPT y JMeter 'https://drive.google.com/drive/u/2/folders/1WIwxqt4jlzVn0OS7Sd9Za1ly4P3fIfi0'

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
