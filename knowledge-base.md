# Iberdrola — Knowledge Base (chatbot "Aura")

> Human-readable knowledge base powering the demo assistant. Backbone: the verified
> `iberdola_audience.md` deep-research artifact, enriched with July 2026 web research
> (iberdrola.es/en pages + Spanish comparators — Selectra, tarifasgasluz, comparadorluz,
> kelisto, gestionluz, papernest, roams).
>
> ⚠️ **All € figures are 2026 illustrative snapshots** and drift. iberdrola.es bot-blocks
> automated fetch, so prices come from public comparators + the audience doc, not live scrapes.
> The machine-readable mirror the bot queries is `js/knowledge-base.js`.

---

## 0. The four customer segments
Iberdrola España structures its retail business in **four segments**, each with its own luz, gas,
movilidad, solar and eficiencia offering:

| Segment | Who | Site |
|---|---|---|
| **Hogares** | Households | `/hogar` |
| **Negocios** | SMEs & self-employed (autónomos) | `/negocios` |
| **Comunidades** | Communities of neighbours / HOAs | `/comunidades` |
| **Grandes Clientes / Empresas** | Large corporates & industrials | `/empresas` |

Cross-segment products: **Smart Solar**, **Solar Cloud (Nube Solar)**, **electric mobility (VE)**,
the **Mi Iberdrola** app and the **Tarjeta Iberdrola**.

---

## 1. Hogares — Electricity (Luz)

| Plan | What it is | Price snapshot (2026) | Best for |
|---|---|---|---|
| **Plan Estable** | Fixed €/kWh, **price guaranteed up to 5 años** | ~67 €/mes (perfil medio) | Máxima tranquilidad a largo plazo |
| **Plan Online** | Precio fijo 24 h, 100% online, incluye ventaja de recarga VE (hasta −40% saldo Mi Iberdrola) | ~62 €/mes (perfil medio) | Sencillez + gestión digital |
| **Plan Online 3 Periodos** | Discriminación horaria (punta/llano/valle) | **Punta ~0,194 · Llano ~0,136 · Valle ~0,09999 €/kWh** | Quien mueve consumo a la noche (00–08 h), findes y festivos |

- **100% renovable** con garantía de origen en los planes.
- **Sin permanencia** para potencia ≤ 10 kW.

## 1b. Hogares — Gas (Plan Gas Hogar)
- Precio fijo en mercado libre, **hasta 50.000 kWh/año**, **12 meses** de precio bloqueado, **sin permanencia**.
- **RL.1** (cocina + agua caliente): ~**0,0957 €/kWh** + término fijo ~**6,25 €/mes**.
- **RL.2** (con calefacción de gas): ~**0,0910 €/kWh** + término fijo ~**11,18 €/mes**.
- Media ~48,57 €/mes para ~4.000 kWh/año (varía mucho entre invierno y verano).

## 1c. Hogares — Solar / autoconsumo
- **Plan Ahorro Solar / Plan Solar** — tarifa para autoconsumo; **compensa excedentes ~0,04–0,06 €/kWh**.
- **Solar Cloud (Nube Solar)** — *batería virtual*: guarda el **valor económico** (no kWh) de tus
  excedentes en un monedero y lo descuenta de facturas futuras (incluso de otra vivienda del mismo
  titular). **Gratis** y se activa automáticamente con las tarifas de autoconsumo. Tope ~1.000 €/mes;
  validez hasta 24 meses.
- **Smart Solar** — instalación **llave en mano**: estudio, paneles, permisos, dimensionado a medida,
  **financiación 3–10 años**, y **tramitación de subvenciones**.
- **Smart Solar Pack Premium** (dic 2024) — microinversores Enphase + módulos AIKO, garantías 25 años,
  *afirma* 6–9% más generación el primer año (claim del fabricante).

## 1d. Hogares — Servicios / seguros del hogar
- **Protección Eléctrica Hogar Plus** — abierta a **cualquier** hogar (incluso sin luz de Iberdrola):
  urgencias eléctricas **< 3 h**, hasta **550 €/año**, intervenciones ilimitadas; electrodomésticos
  hasta **300 €**; **1 visita manitas/año** (3 h). ~**10,83 €/mes** (imp. incl.; 8,95 € sin IVA).
- **Pack Iberdrola Hogar** — **~10,83 €/mes** (imp. incl.), **50% dto. primeros 3 meses**: urgencias
  eléctricas (3 h, 550 €/año), protección de electrodomésticos, protección de pagos y Asistente Smart.
  (~30 días de carencia.)
- **Urgencias Eléctricas** — **3,95 €/mes**, asistencia < 3 h, 550 €/año (requiere suministro Iberdrola).

## 1e. Hogares — Movilidad eléctrica (VE)
- **Plan Recarga** — **2,99 €/mes**, ~10% de descuento en recarga pública.
- **Plan Recarga+** — **9,99 €/mes**, ~20% de descuento (p. ej. 0,48 vs 0,60 €/kWh en 60–200 kW).
- **App Movilidad Iberdrola** (antes "Recarga Pública"): **+11.000 puntos** públicos, geolocalización,
  reserva de cargador, seguimiento en tiempo real, y **hasta 20% del gasto** devuelto en créditos.
- Ventaja del **Plan Online**: recarga y acumula **hasta −40%** en tu saldo Mi Iberdrola.

---

## 2. Negocios (autónomos y pymes)

- **Estructura por potencia:** **2.0TD (< 15 kW)** y **3.0TD (> 15 kW)**.
- **Tres formas de tarifa** (en ambos tramos): **Plan Estable** (plano 24 h), **Plan Noche** (más
  barato de noche/madrugada), **Plan Comercio** (más barato en horario comercial).
- **Precio garantizado 5 años**, **sin permanencia**.
- **Servicios de negocio (€/mes):**
  - **Urgencias Eléctricas Negocios (<15 kW)** — **6,95 €/mes**
  - **Asistencia Eléctrica Negocios** — **3,95 €/mes**
  - **Asistente Smart Empresas** — **2,95 €/mes**
  - **Asistencia Informática Negocios** — **2,95 €/mes**
  - **Protección de Pagos Autónomos** — **3,95 €/mes**, con **MetLife**, cobertura hasta **4.000 €**
- **Solar:** Smart Solar llave en mano para negocios. **VE:** Smart Charging (+10 kW ~0,05 €/kWh).
- **Idea clave:** casar la **forma de tarifa con el horario real** del negocio (un restaurante de
  noche → Plan Noche; un comercio diurno → Plan Comercio + Smart Solar).

---

## 3. Comunidades (vecinos / administradores)

- **Smart Solar para comunidades** — autoconsumo colectivo llave en mano para edificios/comunidades de
  vecinos, con **gestión de subvenciones** incluida.
- **Movilidad compartida** — puntos de recarga en el garaje común.
- Comparte la **Nube Solar** y la compensación de excedentes.
- **Motivaciones:** bajar el gasto de zonas comunes (ascensor, garaje, iluminación), revalorizar el
  edificio, acceder a subvenciones — con mínima fricción (requiere voto en junta).
- **Dinámica de decisión:** administrador de fincas + presidente + vecinos.

---

## 4. Grandes Clientes / Empresas

- **PPAs renovables a largo plazo** — 100% renovable a precio estable a 10+ años; palanca de
  electrificación y de objetivos **Scope 2 / RE100**. Iberdrola es **nº1 europeo en venta de PPA a
  largo plazo** (3 años seguidos).
- **Ejemplo Mercadona:** >300 MW eólica+solar, ~10 años (2025).
- **Infraestructura de recarga a gran escala** — suministro, instalación y operación (caso Mercadona:
  hasta **3.500 puntos** en **800 tiendas** ES+PT; ~2.000 operativos en 2024).
- **Clientes:** Mercadona, Microsoft, Amazon, Apple, Telefónica, Renfe, Gestamp.
- **Modelo:** **Key Account Manager** dedicado + revisiones trimestrales (QBR) + reporting ESG.

---

## 5. Productos transversales
- **Mi Iberdrola (app):** facturas, consumo, gestión de planes, saldo/Nube Solar, descuentos.
- **Tarjeta Iberdrola:** acumula saldo en Mi Iberdrola y ahorra en la factura de luz.

---

## 6. FAQs
- **¿Cómo contrato / me cambio a Iberdrola?** Necesitas DNI, **CUPS**, y cuenta bancaria. Iberdrola
  tramita el cambio con tu compañía anterior; **sin cortes de suministro**. Activación ~5–7 días
  hábiles (cambio efectivo ~1–2 semanas). Se puede hacer 100% online.
- **¿Tengo permanencia?** Potencia **≤ 10 kW: sin permanencia**. **> 10 kW: 12 meses**. Negocios:
  precio 5 años, **sin permanencia**.
- **¿Es energía verde?** Sí, planes **100% renovable** con garantía de origen.
- **¿Qué es la Nube Solar?** Batería virtual que guarda el **valor en €** de tus excedentes para
  descontarlo de futuras facturas. Gratis con tarifas de autoconsumo.
- **¿Cómo se pagan los excedentes solares?** Compensación **~0,04–0,06 €/kWh**; lo que no se compensa
  en la factura va a tu Nube Solar.
- **¿Cuánto cuesta poner placas solares?** Con Smart Solar es llave en mano, con estudio a medida,
  financiación 3–10 años y gestión de subvenciones; el precio depende del dimensionado.
- **¿Dónde veo el precio de la luz hoy?** En iberdrola.es y en Mi Iberdrola.
- **¿Cómo doy de baja un servicio?** Desde Mi Iberdrola o atención al cliente **900 225 235**.
- **Atención al cliente:** **900 225 235** · clientes@tuiberdrola.es · WhatsApp · Mi Iberdrola.

---

## 7. Glosario
- **CUPS** — Código Universal del Punto de Suministro (identifica tu punto de luz/gas).
- **2.0TD** — peaje de acceso para potencia ≤ 15 kW (hogares y pequeños negocios).
- **3.0TD** — peaje para potencia > 15 kW (negocios grandes).
- **Punta / Llano / Valle** — periodos horarios de precio (caro / medio / barato).
- **Discriminación horaria** — pagar distinto según la hora de consumo.
- **PPA** (Power Purchase Agreement) — contrato de compra de energía renovable a largo plazo.
- **Nube Solar** — batería virtual de excedentes (en €).
- **Autoconsumo** — generar tu propia energía (p. ej. con placas solares).

---

## 8. Persona-aware "ideas" (proactive suggestions)
From `iberdola_audience.md` §7.2 — the assistant proposes these to logged-in users:

| Persona (segment) | Proactive idea |
|---|---|
| **Marta** (Hogares · promo vence) | Tu precio va a cambiar — bloquea Plan Estable o pásate a Online 3P (consumo nocturno). |
| **Javier** (Hogares · solar+VE) | Simula tu instalación Smart Solar (~6.200 kWh/año) + recarga tu VE por la noche. |
| **Diego** (Hogares · autoconsumo) | Revisa tu saldo Nube Solar y programa la carga del coche con tu excedente. |
| **Carmen** (Negocios · restaurante) | Cámbiate a Plan Noche (consumes de tarde/noche) + Urgencias Eléctricas Negocios. |
| **Ana** (Comunidades) | Calcula la subvención solar y el ahorro por vecino para la junta. |
| **CSO** (Empresas · RE100) | Un PPA a 10 años como palanca de tu Scope 2 + infraestructura de recarga. |

---

*Sources: `iberdola_audience.md` (verified backbone) + July 2026 web research (iberdrola.es/en,
Selectra, tarifasgasluz, comparadorluz, kelisto, gestionluz, papernest, roams). Prices are snapshots.*
