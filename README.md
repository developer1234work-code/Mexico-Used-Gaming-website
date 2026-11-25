# Lion Games & TVs — Reverse E-Commerce Buyback Platform

Plataforma completa de comercio electrónico inverso (Customer-to-Business) desarrollada bajo el stack **MERN (MongoDB, Express.js, React.js, Node.js)** para el mercado de **México (MXN)**.

Diseñada e implementada con estricto apego al documento de requerimientos (**Software Requirements Specification - SRS Versión 1.1**) y con el diseño idéntico al entregable visual (**LION GAMES & TVs**).

---

## 🌟 Características Principales

### 1. Frontend & Experiencia de Usuario (UI/UX)
- **Diseño Idéntico a la Especificación Visual**:
  - Encabezado con logotipo dorado oficial **LION GAMES & TVs**, navegación completa y botón *Get a Quote*.
  - Hero Section: *"Turn Your Old Games Into Something Valuable"* con ambientación gamer y pilares de confianza (*Safe & Secure*, *Fast Process*, *Fair Offers*).
  - Categorías oficiales: **Gaming Consoles**, **Video Games**, **Controllers & Accessories**, **Retro CRT TVs**.
  - Flujo explicativo: *"Simple 3-Step Process"*.
  - Sección de autoridad: *"Trusted by Gamers Across Mexico"*.
  - Barra de 4 pilares de confianza (*Safe & Secure*, *Fair Offers*, *Fast Process*, *Human Support*).
  - Carrusel de testimonios reales: *"Real Feedback. Real Gamers."*.
  - Acordeón interactivo de preguntas frecuentes y tarjeta de contacto oficial con WhatsApp.
  - Formulario de suscripción *"Stay in the Game"*.
  - Pie de página completo en tema oscuro con enlaces legales y corporativos.

### 2. Calculadora de Estimación en Servidor (SRS 4.3 & AC-03)
- Validación de precios en backend para evitar alteraciones en el navegador.
- Multiplicadores de condición técnica:
  - Consolas/Accesorios: Excelente / Como nuevo (100%), Buen estado (85%), Desgaste cosmético (70%), Dañado (40%), Para piezas (20%).
  - Videojuegos: Nuevo / Sellado (+25%), Completo en caja (CIB), Con caja / sin manual, Disco/cartucho suelto.
  - CRT Retro: Verificación de entradas por componentes, control remoto original y estado de cinescopio sin desgaste o quemaduras (burn-in).

### 3. Carrito de Venta Múltiple (AC-04)
- Panel lateral deslizable para acumular varios artículos en una sola solicitud.
- Cambio dinámico de condiciones y recálculo instantáneo en tiempo real en Pesos Mexicanos (MXN).
- Aviso de estimado preliminar no vinculante conforme a los lineamientos del SRS.

### 4. Cotización Personalizada para Artículos No Listados (SRS 4.2)
- Formulario especial para registrar títulos raros, consolas retro importadas o modelos CRT fuera de catálogo para valuación manual.

### 5. Envío y Formulario de Registro (SRS 5.2, AC-05, AC-06)
- Recopilación de datos del propietario (Nombre completo, correo, teléfono, WhatsApp).
- Origen de recolección en los 32 estados de la República Mexicana y código postal de 5 dígitos.
- Subida de fotografías reales del artículo, etiquetas de número de serie, accesorios y detalles cosméticos.
- Aceptación formal de Términos y Condiciones (Versión 1.1-MEX-2026) con registro de marca de tiempo (timestamp).
- Generación de folio único con formato `REQ-2026-XXXX` y celebración con confeti.

### 6. Portal de Rastreo para Clientes (AC-09, AC-11)
- Consulta pública por número de folio y correo electrónico.
- Línea de tiempo interactiva con historial y auditoría de cambios de estatus.
- **Aprobación de Envío (AC-09)**: Instrucciones de paquetería y número de guía mostrados únicamente cuando un agente de compras la aprueba de forma explícita.
- **Decisión sobre Oferta Revisada (AC-11)**: Cuando la inspección física detecta discrepancias, el cliente visualiza el motivo y la evidencia fotográfica, con botones para **Aceptar la Nueva Oferta** o **Rechazar y Solicitar Devolución**.

### 7. Panel de Administración y Control de Acceso RBAC (SRS 6.1, AC-08, AC-10)
- Acceso protegido por JWT con 4 roles operativos:
  1. **Administrator / Owner**: Control total de usuarios, catálogo, precios, aprobaciones y logs.
  2. **Purchasing Staff**: Revisión de solicitudes, solicitud de datos adicionales y emisión de ofertas preliminares.
  3. **Receiving / Inspection Staff**: Registro de llegada de paquetes, pruebas de funcionalidad, número de serie, discrepancias y emisión de ofertas revisadas (AC-10).
  4. **Customer Service**: Seguimiento y atención al cliente.
- Modal de Aprobación Formal de Envío con transportistas en México (Estafeta, DHL, FedEx, Castores Tarima) y protocolo especial de seguridad para televisores CRT (SRS 6.3).
- Gestión de catálogo con **Exportación e Importación de archivos CSV** con validación de columnas (SRS 4.2).
- Visor de correos electrónicos transaccionales simulados con plantillas HTML en español mexicano.
- Registro cronológico inmutable de auditoría (Audit Trail).

---

## 🔒 Exclusión Explícita de Alcance (SRS 1.2 & AC-12)

Conforme a la sección 1.2 del SRS:
> *La funcionalidad de pagos no está incluida en esta fase inicial. No se desarrolló pasarela de pago, recolección de CLABE/tarjetas ni transferencias SPEI.*

---

## 🚀 Puesta en Marcha

### Prerrequisitos
- Node.js versión 18+ o superior.

### Instalación Rápida

1. **Instalar dependencias del servidor y cliente**:
```bash
# Servidor
cd server
npm install

# Cliente
cd ../client
npm install
```

2. **Iniciar el servidor completo (Producción / Unificado en Puerto 5000)**:
```bash
cd server
node index.js
```
Abre en tu navegador: [http://localhost:5000](http://localhost:5000)

3. **Modo Desarrollo (Vite HMR en Puerto 3000 con Proxy a Backend en Puerto 5000)**:
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```
Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

---

## 👥 Credenciales de Prueba (RBAC)

Para probar los diferentes roles en `/admin`, utiliza las siguientes credenciales o los botones de acceso rápido integrados:

| Rol | Correo Electrónico | Contraseña | Permisos Principales |
|---|---|---|---|
| **Administrador / Dueño** | `admin@liongamestv.mx` | `Admin123!` | Acceso total, catálogo, usuarios, auditoría |
| **Equipo de Compras** | `purchasing@liongamestv.mx` | `Purchasing123!` | Valuación, ofertas preliminares, aprobación de envío |
| **Recepción e Inspección** | `inspection@liongamestv.mx` | `Inspection123!` | Recepción física, QA, número de serie, ofertas revisadas |
| **Atención a Clientes** | `support@liongamestv.mx` | `Support123!` | Consulta y notas de atención |

---

## 📦 Folios de Prueba Pre-cargados para Verificación Inmediata

| Folio ID | Estado | Descripción del Escenario |
|---|---|---|
| `REQ-2026-8801` | `SUBMITTED` | Solicitud recién enviada por el cliente pendiente de revisión inicial. |
| `REQ-2026-8802` | `SHIPPING_APPROVED` | Envío aprobado formalmente con guía de Estafeta México (`EST-MX-9823419082`). |
| `REQ-2026-8803` | `REVISED_OFFER_SENT` | Televisor Sony Trinitron CRT con dictamen de inspección y oferta revisada pendiente de aceptación por el cliente (**AC-11**). |

---

## 🧪 Pruebas Automatizadas End-to-End

Se incluye un script de prueba que valida automáticamente los 10 criterios de aceptación del SRS:

```bash
cd server
node test-api.js
```

Resultados de verificación:
- Health Check: **PASS ✓**
- Navegación de Catálogo: **PASS ✓**
- Calculadora de Precios en Servidor: **PASS ✓**
- Creación de Solicitud de Venta: **PASS ✓**
- Portal de Seguimiento al Cliente: **PASS ✓**
- Autenticación JWT y RBAC de Personal: **PASS ✓**
- Aprobación Explícita de Envío (AC-09): **PASS ✓**
- Inspección Física y Dictamen (AC-10): **PASS ✓**
- Decisión Explícita de Oferta Revisada (AC-11): **PASS ✓**
- Notificaciones y Plantillas por Correo: **PASS ✓**

---

© 2026 Lion Games & TVs México. Todos los derechos reservados.
