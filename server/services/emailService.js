const nodemailer = require('nodemailer');
const db = require('./dbAdapter');

// Setup transporter (falls back to mock logger if no SMTP env configured)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER || 'demo@liongamestv.mx',
    pass: process.env.SMTP_PASS || 'secret'
  }
});

const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'adquisiciones@liongamestv.mx';

function formatMXN(amount) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount);
}

const templates = {
  // 1. Alert to Business (New Request)
  NEW_REQUEST_ALERT_TO_BUSINESS: (data) => ({
    subject: `[NUEVA SOLICITUD DE VENTA] ${data.requestId} - ${data.customer.fullName} ($${data.totalEstimatedAmount} MXN)`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0b0f19; color: #f8fafc; padding: 24px; border-radius: 8px;">
        <h2 style="color: #f59e0b; margin-top: 0;">🦁 Lion Games & TVs - Sistema Interno de Compras</h2>
        <p>Se ha recibido una nueva solicitud de venta desde <strong>${data.customer.city}, ${data.customer.state}</strong>.</p>
        <div style="background-color: #1e293b; padding: 16px; border-radius: 6px; margin: 16px 0;">
          <p><strong>ID de Solicitud:</strong> ${data.requestId}</p>
          <p><strong>Cliente:</strong> ${data.customer.fullName} (${data.customer.phone})</p>
          <p><strong>Email:</strong> ${data.customer.email}</p>
          <p><strong>Artículos (${data.items.length}):</strong></p>
          <ul>
            ${data.items.map(i => `<li>${i.productName} - ${i.conditionLabel} (Est. ${formatMXN(i.calculatedEstimate)})</li>`).join('')}
          </ul>
          <p style="font-size: 18px; color: #f59e0b;"><strong>Total Estimado: ${formatMXN(data.totalEstimatedAmount)} MXN</strong></p>
        </div>
        <p>Por favor ingrese al panel de administración para revisar fotos, notas y autorizar la oferta preliminar.</p>
      </div>
    `
  }),

  // 2. Customer Submission Confirmation
  CUSTOMER_SUBMISSION_CONFIRMATION: (data) => ({
    subject: `¡Hemos recibido tu solicitud de venta! - Folio: ${data.requestId} | Lion Games & TVs`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f8fafc; color: #1e293b; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #b45309; margin: 0;">🦁 LION GAMES & TVs</h1>
          <p style="color: #64748b; font-size: 14px;">Especialistas en videojuegos, consolas y CRT retro en México</p>
        </div>
        <h3>¡Hola ${data.customer.fullName}!</h3>
        <p>Gracias por iniciar tu proceso de venta con Lion Games & TVs. Hemos registrado tu solicitud exitosamente.</p>
        
        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 14px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold; color: #92400e;">FOLIO DE SEGUIMIENTO: ${data.requestId}</p>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #78350f;">Monto estimado preliminar: <strong>${formatMXN(data.totalEstimatedAmount)} MXN</strong></p>
        </div>

        <h4>Resumen de tus artículos:</h4>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <thead>
            <tr style="background-color: #e2e8f0; text-align: left;">
              <th style="padding: 8px;">Artículo</th>
              <th style="padding: 8px;">Estado</th>
              <th style="padding: 8px; text-align: right;">Estimado</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map(i => `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 8px;">${i.productName}</td>
                <td style="padding: 8px;">${i.conditionLabel}</td>
                <td style="padding: 8px; text-align: right;">${formatMXN(i.calculatedEstimate)} MXN</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 12px; margin: 20px 0; color: #991b1b; font-size: 13px;">
          <strong>AVISO IMPORTANTE:</strong> Los precios mostrados son estimaciones no vinculantes. 
          <strong>NO ENVÍES TUS ARTÍCULOS</strong> hasta que nuestro equipo revise tus fotos y emita una aprobación formal de envío con su correspondiente guía de transporte.
        </div>

        <p>Puedes consultar el estado de tu trámite en cualquier momento en nuestro portal con tu folio y correo electrónico.</p>
        <p>Atentamente,<br><strong>Equipo de Valuaciones de Lion Games & TVs México</strong></p>
      </div>
    `
  }),

  // 3. Request For More Information
  REQUEST_MORE_INFO: (data) => ({
    subject: `Requerimos información adicional sobre tu solicitud ${data.requestId} | Lion Games & TVs`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 24px;">
        <h2>🦁 Lion Games & TVs - Solicitud de Información</h2>
        <p>Estimado/a ${data.customer.fullName}:</p>
        <p>Nuestro equipo revisó tu solicitud <strong>${data.requestId}</strong> y necesita algunos datos o fotografías adicionales antes de autorizar la oferta preliminar:</p>
        <div style="background: #f1f5f9; padding: 16px; border-radius: 6px; margin: 16px 0;">
          <p><strong>Mensaje del valuador:</strong></p>
          <p style="font-style: italic;">"${data.notes || 'Por favor proporciona fotos más claras de la etiqueta con número de serie y pantalla encendida.'}"</p>
        </div>
        <p>Por favor responde a este correo o escríbenos a nuestro WhatsApp oficial: <strong>+52 55 8765 4321</strong> citando tu folio.</p>
      </div>
    `
  }),

  // 4. Preliminary Offer
  PRELIMINARY_OFFER: (data) => ({
    subject: `¡Oferta Preliminar Aprobada para tu solicitud ${data.requestId}! | Lion Games & TVs`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 24px;">
        <h2>🦁 Oferta Preliminar Autorizada</h2>
        <p>Hola ${data.customer.fullName}, nuestro equipo ha revisado tus artículos y ha emitido una oferta preliminar por:</p>
        <h1 style="color: #16a34a; margin: 12px 0;">${formatMXN(data.preliminaryOffer.amount)} MXN</h1>
        <p>Ingresa al portal para aceptar o rechazar esta oferta preliminar y proceder con la coordinación de la logística de envío.</p>
      </div>
    `
  }),

  // 5. Shipping Approval (AC-09: Explicit shipping approval instructions)
  SHIPPING_APPROVAL: (data) => ({
    subject: `¡Envío Aprobado! Instrucciones y Guía para ${data.requestId} | Lion Games & TVs`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0284c7; margin-top: 0;">📦 Envío Autorizado por Lion Games & TVs</h2>
        <p>Estimado/a ${data.customer.fullName}:</p>
        <p>Un miembro autorizado de nuestro equipo ha validado tu solicitud y ha aprobado formalmente el envío de tus artículos.</p>
        
        <div style="background: #e0f2fe; padding: 16px; border-radius: 6px; margin: 16px 0;">
          <p><strong>Paquetería asignada:</strong> ${data.shippingApproval.carrier}</p>
          <p><strong>Número de Guía / Rastreo:</strong> ${data.shippingApproval.trackingNumber}</p>
          <p><strong>Referencia de Etiqueta:</strong> ${data.shippingApproval.labelReference || 'N/A'}</p>
          <p><strong>Instrucciones especiales de empaque:</strong></p>
          <p style="margin: 0; color: #0369a1;">${data.shippingApproval.instructions || 'Empacar con abundante plástico de burbujas en caja de cartón corrugado rígida.'}</p>
        </div>

        <p><strong>Dirección de entrega de la bodega central:</strong><br>
        Lion Games & TVs - Centro de Recepción e Inspección<br>
        Av. Cuitláhuac 240, Nave 4, Col. San Salvador Xochimanca, Azcapotzalco, CDMX, C.P. 02870, México.<br>
        Tel: +52 55 8765 4321
        </p>

        <p>Una vez entregado el paquete a la paquetería, te notificaremos en cuanto arribe a nuestras instalaciones para dar inicio a la inspección física.</p>
      </div>
    `
  }),

  // 6. Item Received / Inspection Update
  ITEM_RECEIVED: (data) => ({
    subject: `Paquete Recibido - Inspección Física Iniciada (${data.requestId}) | Lion Games & TVs`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 24px;">
        <h2>🔍 Paquete recibido en bodega Lion Games & TVs</h2>
        <p>Hola ${data.customer.fullName}, te informamos que hemos recibido tu paquete con folio <strong>${data.requestId}</strong>.</p>
        <p>Nuestros técnicos especialistas de hardware están realizando las pruebas de funcionamiento, autenticidad cosmética y verificación de números de serie.</p>
        <p>Te enviaremos el dictamen final en un plazo de 24 a 48 horas hábiles.</p>
      </div>
    `
  }),

  // 7. Revised Offer (AC-11: Explicit Acceptance/Rejection required)
  REVISED_OFFER: (data) => ({
    subject: `[ACCIÓN REQUERIDA] Oferta Revisada tras inspección para ${data.requestId} | Lion Games & TVs`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 24px; border: 2px solid #f59e0b; border-radius: 8px;">
        <h2 style="color: #d97706; margin-top: 0;">⚠️ Oferta Revisada tras Inspección Física</h2>
        <p>Estimado/a ${data.customer.fullName}:</p>
        <p>Nuestros técnicos concluyeron la inspección de tu solicitud <strong>${data.requestId}</strong>. Durante las pruebas encontramos algunas discrepancias con la declaración inicial:</p>
        
        <div style="background: #fffbeb; padding: 16px; border-radius: 6px; margin: 16px 0; border: 1px solid #fcd34d;">
          <p><strong>Estimado inicial:</strong> <strike>${formatMXN(data.revisedOffer.originalAmount)} MXN</strike></p>
          <p style="font-size: 20px; color: #b45309;"><strong>Nueva Oferta Revisada: ${formatMXN(data.revisedOffer.revisedAmount)} MXN</strong></p>
          <p><strong>Motivo del ajuste:</strong> ${data.revisedOffer.reason}</p>
        </div>

        <p><strong>REQUERIMOS TU DECISIÓN:</strong></p>
        <p>De acuerdo con nuestras políticas, ninguna oferta revisada se aplica sin tu consentimiento explícito. Por favor ingresa a tu portal de seguimiento para <strong>Aceptar</strong> la nueva oferta o <strong>Rechazar</strong> y solicitar la devolución de tus artículos.</p>
      </div>
    `
  }),

  // 8. Return Arranged
  RETURN_STATUS: (data) => ({
    subject: `Devolución de Artículos en Trámite (${data.requestId}) | Lion Games & TVs`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 24px;">
        <h2>🔄 Devolución Programada</h2>
        <p>Hola ${data.customer.fullName}, de acuerdo con tu instrucción para el folio <strong>${data.requestId}</strong>, hemos programado el retorno seguro de tus artículos a tu domicilio en <strong>${data.customer.city}, ${data.customer.state}</strong>.</p>
        <p>Te compartiremos el número de guía de devolución en cuanto sea recolectado por el transportista.</p>
      </div>
    `
  })
};

async function sendNotification(eventType, data) {
  try {
    const templateFn = templates[eventType];
    if (!templateFn) {
      console.warn(`Template no encontrado para el evento ${eventType}`);
      return;
    }

    const { subject, html } = templateFn(data);
    const to = eventType === 'NEW_REQUEST_ALERT_TO_BUSINESS' ? BUSINESS_EMAIL : data.customer.email;

    // Record in emailLogs collection
    const emailLogEntry = db.insertOne('emailLogs', {
      id: `eml-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      to,
      subject,
      eventType,
      requestId: data.requestId || data.id,
      customerName: data.customer?.fullName || 'N/A',
      bodyHtml: html,
      sentAt: new Date().toISOString(),
      status: 'SENT'
    });

    // In background or production, attempt actual SMTP dispatch
    if (process.env.SMTP_HOST) {
      try {
        await transporter.sendMail({
          from: `"Lion Games & TVs México" <${process.env.SMTP_FROM || 'notificaciones@liongamestv.mx'}>`,
          to,
          subject,
          html
        });
      } catch (smtpErr) {
        console.warn('SMTP Dispatch note (logged locally):', smtpErr.message);
      }
    }

    return emailLogEntry;
  } catch (error) {
    console.error('Error generating notification email:', error);
  }
}

module.exports = {
  sendNotification,
  templates
};
