export function formatMXN(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0 MXN';
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(amount) + ' MXN';
}

export function formatDate(isoString) {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d);
  } catch {
    return isoString;
  }
}

export const STATUS_MAP = {
  SUBMITTED: {
    label: 'En Revisión Preliminar',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Solicitud recibida. El equipo de compras está analizando tus artículos y fotos.'
  },
  INFO_REQUESTED: {
    label: 'Información Solicitada',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Requerimos fotos o detalles adicionales de tus artículos.'
  },
  PRELIMINARY_OFFER_SENT: {
    label: 'Oferta Preliminar Emitida',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Hemos preparado una oferta preliminar. Requiere tu confirmación.'
  },
  OFFER_ACCEPTED: {
    label: 'Oferta Aceptada por Cliente',
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Aceptaste la oferta preliminar. En espera de aprobación formal de envío.'
  },
  OFFER_DECLINED: {
    label: 'Oferta Declinada',
    color: 'bg-gray-100 text-gray-800 border-gray-300',
    description: 'Declinaste la oferta preliminar.'
  },
  SHIPPING_APPROVED: {
    label: 'Envío Aprobado (Guía Emitida)',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: '¡Envío formalmente autorizado! Consulta tu guía de paquetería e instrucciones.'
  },
  RECEIVED: {
    label: 'Recibido en Bodega',
    color: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    description: 'Tu paquete ha arribado físicamente a nuestras instalaciones centrales.'
  },
  INSPECTION_IN_PROGRESS: {
    label: 'En Inspección Física',
    color: 'bg-orange-100 text-orange-800 border-orange-300',
    description: 'Técnicos especializados están probando hardware, número de serie y cosmética.'
  },
  OFFER_CONFIRMED: {
    label: 'Inspección Aprobada - Oferta Confirmada',
    color: 'bg-green-100 text-green-800 border-green-300',
    description: '¡Tus artículos pasaron todas las pruebas! Oferta original confirmada.'
  },
  REVISED_OFFER_SENT: {
    label: 'Oferta Revisada Emitida',
    color: 'bg-amber-200 text-amber-900 border-amber-400 font-semibold',
    description: 'La inspección detectó discrepancias. Revisa la nueva oferta y decide aceptarla o recibir tus productos de vuelta.'
  },
  FINAL_ACCEPTED: {
    label: 'Oferta Final Aceptada',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Aceptaste la oferta final. Trámite concluido exitosamente.'
  },
  FINAL_REJECTED: {
    label: 'Oferta Rechazada (Retorno Requerido)',
    color: 'bg-red-100 text-red-800 border-red-300',
    description: 'Rechazaste la oferta revisada. Se tramitará el retorno seguro de tus artículos.'
  },
  RETURN_ARRANGED: {
    label: 'Devolución Programada',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Guía de retorno generada para entrega a tu domicilio.'
  },
  REJECTED: {
    label: 'Solicitud No Aceptada',
    color: 'bg-red-100 text-red-800 border-red-300',
    description: 'Artículos no cumplen con los lineamientos de compra.'
  }
};
