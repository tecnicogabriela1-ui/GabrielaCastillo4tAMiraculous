/* =============================================
   MIRACULOUS.PORTAL — tienda.js
   Carrito de compras + productos
   ============================================= */

const PRODUCTOS = [
  { id: 1,  nombre: 'Yoyo de Ladybug',            categoria: 'Juguetes',    precio: 29.99,  imagen: 'img/productos/yoyo.jpg' },
  { id: 2,  nombre: 'Bastón de Cat Noir',          categoria: 'Juguetes',    precio: 24.99,  imagen: 'img/productos/bastonchatnoir.jpg' },
  { id: 3,  nombre: 'Miraculous de Ladybug',       categoria: 'Accesorios',  precio: 19.99,  imagen: 'img/productos/aretesladybug.png' },
  { id: 4,  nombre: 'Miraculous del Pavo Real',    categoria: 'Accesorios',  precio: 22.99,  imagen: 'img/productos/miraculouspavoreal.png' },
  { id: 5,  nombre: 'Miraculous de la Mariposa',   categoria: 'Accesorios',  precio: 18.99,  imagen: 'img/productos/mariposon.png' },
  { id: 7,  nombre: 'Mochila Ladybug',             categoria: 'Ropa',        precio: 39.99,  imagen: 'img/productos/mochilamarinette.jpg' },
  { id: 8,  nombre: 'Camiseta Adrien Agreste',     categoria: 'Ropa',        precio: 22.99,  imagen: 'img/productos/camisa.jpg' },
  { id: 9,  nombre: 'Figura Ladybug 15cm',         categoria: 'Figuras',     precio: 14.99,  imagen: 'img/productos/ladybuggchibi.png'},
  { id: 10, nombre: 'Figura Cat Noir 15cm',        categoria: 'Figuras',     precio: 14.99,  imagen: 'img/productos/chatblancfigure.png' },
  { id: 12, nombre: 'Cuaderno Miraculous',         categoria: 'Papelería',   precio: 8.99,   imagen: 'img/productos/micuaderno.png' },
  { id: 13, nombre: 'Taza Tikki 20cm',            categoria: 'Juguetes',    precio: 16.99,  imagen: 'img/productos/tazatikki.png' },
  { id: 14, nombre: 'Taza Plagg 20cm',            categoria: 'Juguetes',    precio: 16.99,  imagen: 'img/productos/tazaplagg.png' },
  { id: 15, nombre: 'Poster Oficial T5',           categoria: 'Papelería',   precio: 12.99,  imagen: 'img/temporadas/temp5.png' },
  { id: 16, nombre: 'Taza Miraculous',             categoria: 'Accesorios',  precio: 11.99,  imagen: 'img/productos/taza.png' }
];

let carrito = [];
let filtroCategoria = 'Todos';

document.addEventListener('DOMContentLoaded', () => {
  renderProductos();
  renderCarrito();
  iniciarFiltrosTienda();
});

// ── Filtros de categoría ─────────────────────
function iniciarFiltrosTienda() {
  const categorias = ['Todos', ...new Set(PRODUCTOS.map(p => p.categoria))];
  const filtrosEl  = document.getElementById('filtros-tienda');
  if (!filtrosEl) return;

  filtrosEl.innerHTML = categorias.map(c => `
    <button class="filtro-btn ${c === 'Todos' ? 'activo' : ''}"
            onclick="filtrarCategoria('${c}', this)">
      ${c}
    </button>`).join('');
}

function filtrarCategoria(cat, btn) {
  document.querySelectorAll('#filtros-tienda .filtro-btn').forEach(b => b.classList.remove('activo'));
  btn.classList.add('activo');
  filtroCategoria = cat;
  renderProductos();
}

// ── Render productos ─────────────────────────
function renderProductos() {
  const grid = document.getElementById('productos-grid');
  if (!grid) return;

  const lista = filtroCategoria === 'Todos'
    ? PRODUCTOS
    : PRODUCTOS.filter(p => p.categoria === filtroCategoria);

  grid.innerHTML = lista.map(p => `
    <div class="producto-card">
      <img src="${p.imagen}" alt="${p.nombre}" class="producto-card__img"
           onerror="this.style.background='#1a1a1a';this.style.minHeight='200px'">
      <div class="producto-card__info">
        <div class="producto-card__nombre">${p.nombre}</div>
        <div class="producto-card__categoria">${p.categoria}</div>
        <div class="producto-card__precio">$${p.precio.toFixed(2)}</div>
        <button class="producto-card__btn" onclick="agregarAlCarrito(${p.id})">
          + Añadir al carrito
        </button>
      </div>
    </div>`).join('');
}

// ── Carrito ──────────────────────────────────
function agregarAlCarrito(id) {
  const producto = PRODUCTOS.find(p => p.id === id);
  if (!producto) return;

  const existe = carrito.find(c => c.id === id);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  renderCarrito();
  animarBotonCarrito();
}

function quitarDelCarrito(id) {
  carrito = carrito.filter(c => c.id !== id);
  renderCarrito();
}

function renderCarrito() {
  const itemsEl = document.getElementById('carrito-items');
  const totalEl = document.getElementById('carrito-total');
  const countEl = document.getElementById('carrito-count');
  if (!itemsEl) return;

  if (carrito.length === 0) {
    itemsEl.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío 🐞</p>';
  } else {
    itemsEl.innerHTML = carrito.map(item => `
      <div class="carrito-item">
        <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item__img"
             onerror="this.style.background='#222'">
        <div class="carrito-item__nombre">${item.nombre} ${item.cantidad > 1 ? `×${item.cantidad}` : ''}</div>
        <div class="carrito-item__precio">$${(item.precio * item.cantidad).toFixed(2)}</div>
        <button class="carrito-item__quitar" onclick="quitarDelCarrito(${item.id})" title="Quitar">✕</button>
      </div>`).join('');
  }

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  if (countEl) {
    const count = carrito.reduce((s, i) => s + i.cantidad, 0);
    countEl.textContent = count > 0 ? count : '';
    countEl.style.display = count > 0 ? 'inline' : 'none';
  }
}

function animarBotonCarrito() {
  const panel = document.querySelector('.carrito-panel');
  if (!panel) return;
  panel.style.borderColor = 'var(--rojo)';
  panel.style.boxShadow   = 'var(--sombra-roja)';
  setTimeout(() => {
    panel.style.borderColor = '';
    panel.style.boxShadow   = '';
  }, 600);
}

function confirmarCompra() {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío. Agrega productos antes de continuar.');
    return;
  }
  const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
  alert(`¡Gracias por tu compra! 🐞\nTotal: $${total.toFixed(2)}\n\nEsta es una tienda de demostración del portal.`);
  carrito = [];
  renderCarrito();
}

window.agregarAlCarrito  = agregarAlCarrito;
window.quitarDelCarrito  = quitarDelCarrito;
window.filtrarCategoria  = filtrarCategoria;
window.confirmarCompra   = confirmarCompra;
