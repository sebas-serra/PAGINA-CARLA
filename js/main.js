// Número de WhatsApp: prefijo de país + número, sin "+" ni espacios
const WHATSAPP = '34600000000';

const MENSAJE_GENERAL = 'Hola, me gustaría pedir un ramo.';

function enlaceWhatsApp(texto) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

function formatearTelefono(numero) {
  // 34600000000 -> +34 600 00 00 00
  const [, pais, a, b, c, d] = numero.match(/^(\d{2})(\d{3})(\d{2})(\d{2})(\d{2})$/) || [];
  return pais ? `+${pais} ${a} ${b} ${c} ${d}` : `+${numero}`;
}

// Todos los botones con data-wa abren WhatsApp con un mensaje ya escrito
document.querySelectorAll('[data-wa]').forEach((enlace) => {
  const ramo = enlace.dataset.wa;
  const texto = ramo ? `Hola, me interesa el ramo ${ramo}. ¿Tenéis disponibilidad?` : MENSAJE_GENERAL;
  enlace.href = enlaceWhatsApp(texto);
  enlace.target = '_blank';
  enlace.rel = 'noopener';
});

document.querySelectorAll('[data-telefono]').forEach((el) => {
  el.textContent = formatearTelefono(WHATSAPP);
});

document.querySelector('[data-anio]').textContent = new Date().getFullYear();

// Cambiar entre las fotos de un mismo ramo
document.querySelectorAll('.ramo').forEach((ramo) => {
  const foto = ramo.querySelector('.ampliar img');
  const miniaturas = ramo.querySelectorAll('.miniatura');

  miniaturas.forEach((miniatura) => {
    miniatura.addEventListener('click', () => {
      foto.src = miniatura.dataset.src;
      miniaturas.forEach((m) => m.setAttribute('aria-pressed', m === miniatura));
    });
  });
});

// Visor para ver las fotos en grande
const visor = document.querySelector('.visor');
const visorFoto = visor.querySelector('img');

document.querySelectorAll('.ampliar').forEach((boton) => {
  boton.addEventListener('click', () => {
    const foto = boton.querySelector('img');
    visorFoto.src = foto.src;
    visorFoto.alt = foto.alt;
    visor.showModal();
  });
});

visor.querySelector('.visor-cerrar').addEventListener('click', () => visor.close());

// Cerrar al pulsar fuera de la foto
visor.addEventListener('click', (e) => {
  if (e.target === visor) visor.close();
});
