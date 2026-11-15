/* Funciones compartidas por el catálogo (propiedades.html) y el mapa (mapa.html). */
(function(){
  const WHATSAPP = '528140297419';
  const lista = (window.PROPIEDADES || []).map((p, i) => ({...p, _i:i}));

  const pesos = new Intl.NumberFormat('es-MX', {style:'currency', currency:'MXN', maximumFractionDigits:0});
  const decimal = n => n.toLocaleString('es-MX', {maximumFractionDigits:2});

  // Precio corto para las etiquetas del mapa: "$3.45 M", "$950 mil", "$24 mil/mes"
  function precioCorto(p){
    const v = p.precio;
    let t;
    if (v >= 1e6) t = '$' + decimal(Math.round(v / 1e4) / 100) + ' M';
    else t = '$' + decimal(Math.round(v / 100) / 10) + ' mil';
    return p.operacion === 'renta' ? t + '/mes' : t;
  }
  function precioLargo(p){
    return pesos.format(p.precio) + (p.operacion === 'renta' ? ' al mes' : '');
  }

  function titulo(p){ return `${p.tipo} en ${p.colonia}`; }

  // "3 rec. · 2.5 baños · 185 m²"
  function resumen(p){
    const partes = [];
    if (p.recamaras) partes.push(p.recamaras + (p.recamaras === 1 ? ' recámara' : ' recámaras'));
    if (p.banos) partes.push(decimal(p.banos) + (p.banos === 1 ? ' baño' : ' baños'));
    const m2 = p.construccion || p.terreno;
    if (m2) partes.push(m2 + ' m²' + (!p.construccion ? ' de terreno' : ''));
    return partes.map(t => t.replace(/ /g, '\u00A0')).join(' · ');
  }

  const escapar = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  /* ---------- Ilustración de fachada (cuando no hay foto) ---------- */
  function azar(semilla){
    let h = 2166136261;
    for (const c of semilla) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
  }
  const MUROS = ['#E9E2D3','#D9CBB0','#F4F1EA','#C9D6E3','#E7D2C4','#D7DCCF','#EFE6D2','#BFCBD9'];
  const ACENTOS = ['#4C74A8','#14233F','#8A5A3B','#5E6E52','#A8322B','#36598A'];
  const CIELOS = [['#B9CDE6','#E8EFF7'],['#C8D8EA','#F1F2EE'],['#D4DFEC','#F6F3EA']];

  function ventanas(x, y, w, h, cols, filas, color, marco){
    let s = '';
    const gx = w / cols, gy = h / filas;
    for (let f = 0; f < filas; f++) for (let c = 0; c < cols; c++){
      const vx = x + c * gx + gx * .2, vy = y + f * gy + gy * .18;
      s += `<rect x="${vx.toFixed(1)}" y="${vy.toFixed(1)}" width="${(gx*.6).toFixed(1)}" height="${(gy*.6).toFixed(1)}" fill="${color}" stroke="${marco}" stroke-width="2"/>`;
    }
    return s;
  }

  function fachada(p){
    const r = azar(p.clave);
    const pick = a => a[Math.floor(r() * a.length)];
    const muro = pick(MUROS), acento = pick(ACENTOS), cielo = pick(CIELOS);
    const vidrio = '#9DB6D3', marco = '#14233F';
    const id = 'c' + p.clave.replace(/\W/g, '');
    let s = `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración: ${escapar(titulo(p))}" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${cielo[0]}"/><stop offset="1" stop-color="${cielo[1]}"/></linearGradient></defs>
      <rect width="400" height="260" fill="url(#${id})"/>
      <path d="M0 176 L60 150 L110 160 L170 122 L196 98 L208 112 L222 96 L250 128 L320 146 L400 136 V260 H0Z" fill="#9FB4CF" opacity=".55"/>
      <rect y="214" width="400" height="46" fill="#C8C2B1"/><rect y="214" width="400" height="6" fill="#B3AC99"/>`;
    const arbol = (x, t) => `<rect x="${x-3}" y="${214-t*.55}" width="6" height="${t*.55}" fill="#6B5A44"/><circle cx="${x}" cy="${214-t*.7}" r="${t*.32}" fill="#5E7A55"/><circle cx="${x+t*.14}" cy="${214-t*.82}" r="${t*.22}" fill="#6E8C62"/>`;

    if (p.tipo === 'Casa'){
      const pisos = p.construccion > 160 || r() > .5 ? 2 : 1;
      const w = 210 + Math.round(r() * 40), h = pisos === 2 ? 128 : 78;
      const x = 200 - w / 2 + (r() - .5) * 30, y = 214 - h;
      const dosAguas = r() > .55;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${muro}" stroke="${marco}" stroke-width="2.5"/>`;
      if (dosAguas) s += `<path d="M${x-12} ${y} L${x+w/2} ${y-46} L${x+w+12} ${y}Z" fill="${acento}" stroke="${marco}" stroke-width="2.5" stroke-linejoin="round"/>`;
      else s += `<rect x="${x-6}" y="${y-10}" width="${w+12}" height="12" fill="${acento}" stroke="${marco}" stroke-width="2.5"/>`;
      // cochera
      const cw = w * .38;
      s += `<rect x="${x+w-cw-12}" y="${214-58}" width="${cw}" height="58" fill="#E6E3DA" stroke="${marco}" stroke-width="2"/>`;
      for (let i = 1; i < 5; i++) s += `<line x1="${x+w-cw-12}" x2="${x+w-12}" y1="${214-58+i*11.6}" y2="${214-58+i*11.6}" stroke="#B9B4A6" stroke-width="2"/>`;
      // puerta
      s += `<rect x="${x+20}" y="${214-56}" width="28" height="56" fill="${acento}" stroke="${marco}" stroke-width="2"/><circle cx="${x+42}" cy="${214-28}" r="2.2" fill="#F1F2EE"/>`;
      s += ventanas(x + 56, 214 - 60, w - cw - 80, 44, 1, 1, vidrio, marco);
      if (pisos === 2) s += ventanas(x + 10, y + 10, w - 20, 50, 3, 1, vidrio, marco);
      s += arbol(x - 26 > 20 ? x - 26 : 24, 70 + r() * 30);
    } else if (p.tipo === 'Departamento'){
      const w = 140, h = 186, x = 130 + (r() - .5) * 40, y = 214 - h;
      s += `<rect x="${x+w-10}" y="${y+44}" width="90" height="${h-44}" fill="#C9D3DE" stroke="${marco}" stroke-width="2.5"/>`;
      s += ventanas(x + w - 4, y + 52, 80, h - 60, 2, 5, '#AFC3DA', marco);
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${muro}" stroke="${marco}" stroke-width="2.5"/>`;
      s += `<rect x="${x-4}" y="${y-8}" width="${w+8}" height="10" fill="${acento}" stroke="${marco}" stroke-width="2"/>`;
      s += ventanas(x + 6, y + 10, w - 12, h - 52, 3, 6, vidrio, marco);
      s += `<rect x="${x+w/2-18}" y="${214-36}" width="36" height="36" fill="${vidrio}" stroke="${marco}" stroke-width="2"/>`;
      s += arbol(x - 30, 80) + arbol(x + w + 120, 66);
    } else if (p.tipo === 'Local'){
      const w = 250, h = 112, x = 75, y = 214 - h;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${muro}" stroke="${marco}" stroke-width="2.5"/>`;
      s += `<rect x="${x+16}" y="${y+12}" width="${w-32}" height="22" fill="#F1F2EE" stroke="${marco}" stroke-width="2"/>`;
      // toldo a rayas
      for (let i = 0; i < 10; i++) s += `<path d="M${x+i*25} ${y+44} h25 v18 q-12.5 8 -25 0Z" fill="${i % 2 ? '#F1F2EE' : acento}" stroke="${marco}" stroke-width="1.5"/>`;
      s += `<rect x="${x+16}" y="${y+66}" width="${w-90}" height="46" fill="${vidrio}" stroke="${marco}" stroke-width="2"/>`;
      s += `<rect x="${x+w-62}" y="${y+66}" width="46" height="46" fill="#E6E3DA" stroke="${marco}" stroke-width="2"/>`;
      s += arbol(40, 74) + arbol(360, 62);
    } else { // Terreno
      s += `<rect y="178" width="400" height="40" fill="#CDBB8E"/><rect y="214" width="400" height="46" fill="#C8C2B1"/>`;
      for (let i = 0; i < 12; i++){ const fx = 30 + i * 31; s += `<rect x="${fx}" y="176" width="5" height="40" fill="#8C7A5B"/>`; }
      s += `<line x1="30" x2="376" y1="186" y2="186" stroke="#8C7A5B" stroke-width="2"/><line x1="30" x2="376" y1="200" y2="200" stroke="#8C7A5B" stroke-width="2"/>`;
      s += `<rect x="236" y="120" width="96" height="46" rx="3" fill="#F1F2EE" stroke="${marco}" stroke-width="2.5"/><rect x="281" y="166" width="6" height="48" fill="${marco}"/>`;
      s += `<text x="284" y="149" text-anchor="middle" font-family="Archivo,sans-serif" font-weight="800" font-size="17" fill="${acento}">${p.operacion === 'renta' ? 'SE RENTA' : 'SE VENDE'}</text>`;
      s += arbol(70, 90) + arbol(120, 64);
    }
    return s + '</svg>';
  }

  function imagen(p, cls){
    if (p.foto) return `<img class="${cls||''}" src="${escapar(p.foto)}" alt="${escapar(titulo(p))}" loading="lazy">`;
    return fachada(p);
  }

  /* ---------- Tarjeta y ficha ---------- */
  function tarjeta(p){
    return `<article class="tarjeta" data-clave="${escapar(p.clave)}">
      <button class="tarjeta-abrir" type="button" data-abrir="${escapar(p.clave)}" aria-label="Ver ficha: ${escapar(titulo(p))}, ${escapar(precioLargo(p))}"></button>
      <div class="tarjeta-img">${imagen(p)}<span class="etiqueta ${p.operacion}">${p.operacion === 'venta' ? 'Venta' : 'Renta'}</span></div>
      <div class="tarjeta-texto">
        <h3>${escapar(titulo(p))}</h3>
        <p class="lugar">${escapar(p.municipio)}</p>
        <p class="resumen">${escapar(resumen(p))}</p>
        <p class="precio">${escapar(pesos.format(p.precio))}${p.operacion === 'renta' ? '<small> al mes</small>' : ''}</p>
      </div>
    </article>`;
  }

  function enlaceWhatsApp(p){
    const texto = `Hola, me interesa la propiedad ${p.clave}: ${titulo(p)}, ${p.municipio} (${precioLargo(p)}).`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
  }

  let dialogo;
  function abrirFicha(clave, opciones = {}){
    const p = lista.find(x => x.clave === clave);
    if (!p) return;
    if (!dialogo){
      dialogo = document.createElement('dialog');
      dialogo.className = 'ficha';
      document.body.appendChild(dialogo);
      dialogo.addEventListener('click', e => { if (e.target === dialogo || e.target.closest('[data-cerrar]')) dialogo.close(); });
      dialogo.addEventListener('close', () => { if (location.hash) history.replaceState(null, '', location.pathname + location.search); });
    }
    const datos = [
      ['Clave', p.clave],
      ['Operación', p.operacion === 'venta' ? 'Venta' : 'Renta'],
      ['Recámaras', p.recamaras],
      ['Baños', p.banos && decimal(p.banos)],
      ['Estacionamientos', p.estacionamientos],
      ['Construcción', p.construccion && p.construccion + ' m²'],
      ['Terreno', p.terreno && p.terreno + ' m²'],
    ].filter(d => d[1]);
    const verEnMapa = opciones.enMapa
      ? `<button class="boton secundario" type="button" data-centrar="${escapar(p.clave)}" data-cerrar>Ver en el mapa</button>`
      : `<a class="boton secundario" href="mapa.html${location.search}#${encodeURIComponent(p.clave)}">Ver en el mapa</a>`;
    dialogo.innerHTML = `
      <button class="cerrar" type="button" data-cerrar aria-label="Cerrar">×</button>
      <div class="ficha-img">${imagen(p)}</div>
      <div class="ficha-texto">
        <p class="lugar">${escapar(p.colonia)}, ${escapar(p.municipio)}</p>
        <h2>${escapar(titulo(p))}</h2>
        <p class="precio">${escapar(precioLargo(p))}</p>
        <dl class="datos">${datos.map(d => `<div><dt>${d[0]}</dt><dd>${escapar(d[1])}</dd></div>`).join('')}</dl>
        <p>${escapar(p.descripcion)}</p>
        <div class="ficha-acciones">
          <a class="boton" href="${enlaceWhatsApp(p)}" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#wa"/></svg>Preguntar por esta propiedad</a>
          ${verEnMapa}
        </div>
      </div>`;
    history.replaceState(null, '', '#' + encodeURIComponent(p.clave));
    if (!dialogo.open) dialogo.showModal();
    dialogo.scrollTop = 0;
  }

  /* ---------- Filtros (se guardan en la dirección para pasar entre catálogo y mapa) ---------- */
  const CAMPOS = ['operacion', 'tipo', 'recamaras', 'precio', 'orden'];
  function leerFiltros(form){
    const q = new URLSearchParams(location.search);
    if (q.has('operacion')) form.elements.operacion.value = q.get('operacion');
    opcionesPrecio(form);
    CAMPOS.forEach(c => { if (form.elements[c] && q.has(c)) form.elements[c].value = q.get(c); });
  }
  function guardarFiltros(form){
    const q = new URLSearchParams();
    CAMPOS.forEach(c => {
      const el = form.elements[c];
      if (el && el.value && el.value !== ((el.dataset && el.dataset.defecto) || '')) q.set(c, el.value);
    });
    const s = q.toString();
    history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + location.hash);
    document.querySelectorAll('[data-conservar-filtros]').forEach(a => { a.search = s; });
  }
  function filtrar(form){
    const f = Object.fromEntries(CAMPOS.map(c => [c, form.elements[c] ? form.elements[c].value : '']));
    const max = Number(f.precio) || Infinity;
    let r = lista.filter(p =>
      (!f.operacion || p.operacion === f.operacion) &&
      (!f.tipo || p.tipo === f.tipo) &&
      (!f.recamaras || p.recamaras >= Number(f.recamaras)) &&
      p.precio <= max);
    const orden = {
      recientes: (a, b) => b.publicada.localeCompare(a.publicada),
      'precio-asc': (a, b) => a.precio - b.precio,
      'precio-desc': (a, b) => b.precio - a.precio,
      tamano: (a, b) => (b.construccion || b.terreno) - (a.construccion || a.terreno),
    }[f.orden || 'recientes'];
    return r.sort(orden);
  }
  // Opciones de "precio hasta" según venta o renta
  function opcionesPrecio(form){
    const sel = form.elements.precio, op = form.elements.operacion.value, actual = sel.value;
    const venta = [1500000, 2500000, 4000000, 6000000, 10000000], renta = [10000, 15000, 20000, 30000, 45000];
    const valores = op === 'renta' ? renta : op === 'venta' ? venta : [];
    sel.innerHTML = '<option value="">Cualquier precio</option>' +
      valores.map(v => `<option value="${v}">Hasta ${pesos.format(v)}${op === 'renta' ? ' al mes' : ''}</option>`).join('');
    sel.disabled = !valores.length;
    sel.title = valores.length ? '' : 'Elija venta o renta para filtrar por precio';
    if (valores.includes(Number(actual))) sel.value = actual;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const anio = document.getElementById('anio');
    if (anio) anio.textContent = new Date().getFullYear();
  });

  window.Propiedades = {lista, precioCorto, precioLargo, titulo, resumen, tarjeta, imagen, abrirFicha, leerFiltros, guardarFiltros, filtrar, opcionesPrecio, escapar};
})();
