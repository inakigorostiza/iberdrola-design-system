/* ==========================================================================
   Iberdrola — Knowledge Base for the "Aura" assistant (client-side retrieval)
   Mirror of knowledge-base.md. Prices are 2026 illustrative snapshots.
   window.IB_KB = { entries:[...], ideas:{persona:[...]}, welcome:{...} }
   ========================================================================== */
(function (g) {
  var E = [
    /* -------- Luz -------- */
    { id: "luz_overview", q: ["planes de luz", "tarifas de luz", "que tarifa de luz", "opciones de luz", "electricidad", "luz", "que plan me recomiendas"],
      a: "Para hogar tienes 3 planes de **luz**:\n• **Plan Estable** — precio fijo garantizado hasta **5 años**.\n• **Plan Online** — precio fijo 24 h, 100% online (+ ventaja de recarga VE).\n• **Plan Online 3 Periodos** — discriminación horaria: pagas menos en horas valle.\nTodos son **100% renovables** y sin permanencia (≤10 kW).",
      tags: ["hogares"], cta: { label: "Ver planes de luz", href: "#planes" }, chips: ["¿Cuánto cuesta el Plan Online?", "Plan Online 3 Periodos", "¿Tengo permanencia?"] },
    { id: "plan_estable", q: ["plan estable", "precio fijo", "precio garantizado", "5 años", "tranquilidad", "precio estable"],
      a: "**Plan Estable**: precio del kWh **fijo garantizado hasta 5 años**. Perfecto si quieres tranquilidad y cero sorpresas. Perfil medio ~**67 €/mes** (snapshot 2026). Energía 100% renovable.",
      tags: ["hogares"], cta: { label: "Contratar Plan Estable", href: "#planes" }, chips: ["Compáralo con Plan Online", "¿Tengo permanencia?"] },
    { id: "plan_online", q: ["plan online", "tarifa online", "precio online", "online barato", "cuanto cuesta el plan online"],
      a: "**Plan Online**: precio **fijo 24 h**, 100% online y sencillo. Perfil medio ~**62 €/mes** (snapshot 2026). Incluye ventaja de **recarga del coche eléctrico** (hasta **−40%** en tu saldo Mi Iberdrola). Sin permanencia (≤10 kW).",
      tags: ["hogares"], cta: { label: "Contratar Plan Online", href: "#planes" }, chips: ["Plan Online 3 Periodos", "Ventaja recarga VE"] },
    { id: "plan_online_3p", q: ["plan online 3 periodos", "3 periodos", "tres periodos", "discriminacion horaria", "tarifa noche", "horas valle", "punta llano valle", "consumo nocturno"],
      a: "**Plan Online 3 Periodos** (discriminación horaria): pagas según la hora.\n• **Punta** ~0,194 €/kWh\n• **Llano** ~0,136 €/kWh\n• **Valle** ~0,09999 €/kWh\nHoras valle: **00–08 h**, findes y festivos. Ideal si puedes mover tu consumo a la noche.",
      tags: ["hogares"], cta: { label: "Ver Plan Online 3P", href: "#planes" }, chips: ["¿Y si consumo de día?", "Placas solares"] },
    /* -------- Gas -------- */
    { id: "gas", q: ["gas", "plan gas hogar", "tarifa de gas", "precio del gas", "calefaccion gas"],
      a: "**Plan Gas Hogar**: precio fijo, **12 meses** bloqueado, **sin permanencia**, hasta 50.000 kWh/año.\n• **RL.1** (cocina + agua caliente): ~0,0957 €/kWh + ~6,25 €/mes de término fijo.\n• **RL.2** (con calefacción): ~0,0910 €/kWh + ~11,18 €/mes.\n(snapshots 2026)",
      tags: ["hogares"], cta: { label: "Ver Plan Gas Hogar", href: "#" }, chips: ["¿Puedo tener luz y gas juntos?"] },
    /* -------- Solar -------- */
    { id: "solar", q: ["solar", "placas solares", "paneles solares", "autoconsumo", "fotovoltaica", "smart solar", "instalar placas", "cuanto cuesta poner placas"],
      a: "Con **Smart Solar** te lo hacemos **llave en mano**: estudio y dimensionado a medida, instalación, permisos, **financiación 3–10 años** y **gestión de subvenciones**. Tú generas tu energía y ahorras; los excedentes van a tu **Nube Solar**.",
      tags: ["hogares", "negocios", "comunidades"], cta: { label: "Simular mi instalación", href: "#px-slot" }, chips: ["¿Qué es la Nube Solar?", "¿Cómo se pagan los excedentes?"] },
    { id: "nube_solar", q: ["nube solar", "bateria virtual", "solar cloud", "excedentes guardados", "monedero solar"],
      a: "**Nube Solar** es una **batería virtual**: guarda el **valor en €** de tus excedentes solares (no kWh) en un monedero y lo descuenta de tus próximas facturas — incluso de otra vivienda tuya. Es **gratis** y se activa sola al contratar una tarifa de autoconsumo.",
      tags: ["hogares", "comunidades"], cta: { label: "Ver Nube Solar", href: "#" }, chips: ["¿Cómo se pagan los excedentes?", "Plan Ahorro Solar"] },
    { id: "excedentes", q: ["excedentes", "compensacion excedentes", "vender energia", "plan ahorro solar", "cuanto pagan por excedentes"],
      a: "Con el **Plan Ahorro Solar** compensamos tus excedentes a **~0,04–0,06 €/kWh**. Lo que no se compensa en la factura se guarda como saldo en tu **Nube Solar** para futuras facturas.",
      tags: ["hogares"], cta: { label: "Ver Plan Ahorro Solar", href: "#" }, chips: ["¿Qué es la Nube Solar?"] },
    /* -------- Servicios hogar -------- */
    { id: "servicios_hogar", q: ["proteccion electrica", "urgencias electricas", "averia", "seguro hogar", "pack hogar", "mantenimiento", "reparacion", "electrodomesticos"],
      a: "Para el hogar:\n• **Protección Eléctrica Hogar Plus** — urgencias <3 h, hasta 550 €/año + electrodomésticos hasta 300 € + 1 visita manitas/año. ~**10,83 €/mes**.\n• **Pack Iberdrola Hogar** — ~**10,83 €/mes** (50% dto. 3 primeros meses): urgencias + electrodomésticos + protección de pagos + Asistente Smart.\n• **Urgencias Eléctricas** — **3,95 €/mes**.",
      tags: ["hogares"], cta: { label: "Ver servicios del hogar", href: "#" }, chips: ["¿Cubre electrodomésticos?"] },
    /* -------- Movilidad -------- */
    { id: "movilidad", q: ["coche electrico", "vehiculo electrico", "recarga", "cargar el coche", "movilidad", "punto de recarga", "recarga publica", "ve"],
      a: "Para tu **coche eléctrico**:\n• **Plan Recarga** — 2,99 €/mes, ~10% dto. en recarga pública.\n• **Plan Recarga+** — 9,99 €/mes, ~20% dto. (p. ej. 0,48 vs 0,60 €/kWh).\n• **App Movilidad Iberdrola**: +11.000 puntos, reserva de cargador y hasta **20% del gasto** en créditos.\nCon **Plan Online** ahorras hasta **−40%** cargando en casa por la noche.",
      tags: ["hogares", "negocios"], cta: { label: "Ver movilidad eléctrica", href: "#" }, chips: ["Ventaja recarga VE", "Placas solares + coche"] },
    /* -------- Negocios -------- */
    { id: "negocios_tarifas", q: ["negocio", "autonomo", "pyme", "empresa pequeña", "tarifa negocio", "plan noche", "plan comercio", "restaurante", "comercio", "2.0td", "3.0td"],
      a: "Para **negocios** (autónomos y pymes): tarifas por potencia — **2.0TD (<15 kW)** y **3.0TD (>15 kW)** — en tres formas:\n• **Plan Estable** (plano 24 h)\n• **Plan Noche** (más barato de noche)\n• **Plan Comercio** (más barato en horario comercial)\n**Precio 5 años**, **sin permanencia**. Lo ideal es casar la tarifa con **tus horas reales**.",
      tags: ["negocios"], cta: { label: "Ver Iberdrola Negocios", href: "#" }, chips: ["Servicios para negocios", "Placas para mi negocio"] },
    { id: "negocios_servicios", q: ["servicios negocio", "urgencias negocio", "proteccion de pagos", "metlife", "asistencia informatica", "asistente smart empresas", "impago"],
      a: "Servicios para tu negocio:\n• **Urgencias Eléctricas Negocios** — 6,95 €/mes (asistencia <3 h).\n• **Protección de Pagos Autónomos** — 3,95 €/mes, con **MetLife**, hasta **4.000 €** si un cliente no te paga.\n• **Asistencia Informática** — 2,95 €/mes.\n• **Asistente Smart Empresas** — 2,95 €/mes.",
      tags: ["negocios"], cta: { label: "Ver servicios de negocio", href: "#" }, chips: ["Cambiar a Plan Noche"] },
    /* -------- Comunidades -------- */
    { id: "comunidades", q: ["comunidad", "vecinos", "junta", "administrador de fincas", "subvencion solar", "autoconsumo colectivo", "garaje comun", "ascensor"],
      a: "Para **comunidades**: **Smart Solar colectivo** llave en mano para tu edificio, con **gestión de subvenciones** incluida y reparto del ahorro entre vecinos. También **recarga compartida** en el garaje común. Bajáis el gasto de zonas comunes (ascensor, garaje, luz).",
      tags: ["comunidades"], cta: { label: "Preparar propuesta para la junta", href: "#px-slot" }, chips: ["¿Cuánto ahorra cada vecino?", "Subvenciones"] },
    /* -------- Empresas -------- */
    { id: "empresas_ppa", q: ["ppa", "gran cliente", "gran empresa", "industrial", "re100", "scope 2", "precio a largo plazo", "electrificar", "corporativo"],
      a: "Para **grandes clientes**: **PPAs renovables a largo plazo** — 100% renovable a **precio estable a 10+ años**, ideal para tus objetivos **RE100 / Scope 2**. Iberdrola es **nº1 europeo** en venta de PPA a largo plazo (caso Mercadona: >300 MW). Incluye **Key Account Manager** dedicado.",
      tags: ["empresas"], cta: { label: "Hablar con tu KAM", href: "#px-slot" }, chips: ["Infraestructura de recarga", "Casos de éxito"] },
    { id: "empresas_ev", q: ["infraestructura de recarga", "flota", "puntos de recarga empresa", "recarga a gran escala"],
      a: "Desplegamos **infraestructura de recarga a gran escala** de extremo a extremo: suministro, instalación y operación. Caso **Mercadona**: hasta **3.500 puntos** en **800 tiendas** (ES+PT).",
      tags: ["empresas"], cta: { label: "Ver movilidad para empresas", href: "#" }, chips: ["PPA renovable"] },
    /* -------- Transversales / FAQs -------- */
    { id: "mi_iberdrola", q: ["mi iberdrola", "app", "aplicacion", "gestionar factura", "ver consumo", "descargar app"],
      a: "Con la app **Mi Iberdrola** consultas tus **facturas**, sigues tu **consumo** en tiempo real, cambias de plan, ves tu **saldo/Nube Solar** y accedes a **descuentos**. Disponible en App Store y Google Play.",
      tags: ["hogares", "negocios"], cta: { label: "Descargar la App", href: "#app" }, chips: ["Tarjeta Iberdrola"] },
    { id: "tarjeta", q: ["tarjeta iberdrola", "tarjeta", "saldo", "descuentos compras", "cashback"],
      a: "La **Tarjeta Iberdrola** acumula **saldo** en Mi Iberdrola con tus compras y lo usas para **ahorrar en tu factura de luz**. Sin comisiones y con ventajas exclusivas.",
      tags: ["hogares"], cta: { label: "Más sobre la Tarjeta", href: "#tarjeta" }, chips: ["Mi Iberdrola"] },
    { id: "contratar", q: ["contratar", "darme de alta", "cambiarme", "cambio de compañia", "como me cambio", "papeles", "documentacion", "cambiar de compañia"],
      a: "**Contratar o cambiarte** es fácil y 100% online: necesitas tu **DNI**, el **CUPS** (viene en tu factura) y una **cuenta bancaria**. Nosotros tramitamos el cambio con tu compañía anterior, **sin cortes de suministro**. Suele activarse en ~5–7 días (efectivo ~1–2 semanas).",
      tags: ["hogares", "negocios"], cta: { label: "Contratar online", href: "#planes" }, chips: ["¿Qué es el CUPS?", "¿Tengo permanencia?"] },
    { id: "permanencia", q: ["permanencia", "penalizacion", "compromiso", "atado", "me puedo ir", "darme de baja", "baja"],
      a: "**Sin permanencia** para potencia **≤ 10 kW**. Por encima de **10 kW** hay **12 meses** de permanencia. En **Negocios**, precio garantizado 5 años pero **sin permanencia**. Puedes darte de baja desde Mi Iberdrola o en el 900 225 235.",
      tags: ["hogares", "negocios"], chips: ["¿Cómo me cambio?"] },
    { id: "renovable", q: ["renovable", "verde", "sostenible", "energia limpia", "garantia de origen", "co2", "emisiones"],
      a: "Sí: la energía de nuestros planes es **100% renovable con garantía de origen**, reduciendo tus emisiones de CO₂ desde el primer día, **sin coste adicional**.",
      tags: ["hogares", "negocios", "comunidades", "empresas"], chips: ["Placas solares", "PPA renovable"] },
    { id: "precio_hoy", q: ["precio de la luz hoy", "precio luz hoy", "cuanto vale la luz", "precio kwh hoy", "pool"],
      a: "Puedes ver el **precio de la luz de hoy** en iberdrola.es y en la app **Mi Iberdrola**. Si prefieres estabilidad, el **Plan Estable** o **Plan Online** fijan tu precio y te evitan la volatilidad diaria.",
      tags: ["hogares"], chips: ["Plan Estable", "Plan Online"] },
    { id: "contacto", q: ["telefono", "atencion al cliente", "contacto", "llamar", "ayuda", "whatsapp", "hablar con alguien", "asesor"],
      a: "Estamos aquí para ayudarte:\n• **900 225 235** (atención al cliente)\n• **clientes@tuiberdrola.es**\n• WhatsApp y chat en **Mi Iberdrola**",
      tags: ["hogares", "negocios", "comunidades", "empresas"], cta: { label: "Llamar ahora", href: "tel:900225235" } },
    /* -------- Glosario -------- */
    { id: "cups", q: ["cups", "que es el cups", "codigo de suministro"],
      a: "El **CUPS** (Código Universal del Punto de Suministro) identifica tu punto de luz o gas. Lo encuentras en cualquier factura y lo necesitas para contratar o cambiarte.",
      tags: ["hogares"], chips: ["¿Cómo me cambio?"] },
    { id: "discriminacion", q: ["discriminacion horaria", "que es punta valle", "periodos horarios", "que es valle"],
      a: "La **discriminación horaria** significa pagar distinto según la hora: **punta** (caro), **llano** (medio) y **valle** (barato, de noche). Con el **Plan Online 3 Periodos** aprovechas las horas valle.",
      tags: ["hogares"], chips: ["Plan Online 3 Periodos"] }
  ];

  // Proactive ideas per logged-in persona (from audience §7.2)
  var IDEAS = {
    marta:  ["¿Qué pasa cuando acabe mi promoción?", "Bloquear precio con Plan Estable", "¿Me conviene el Plan Online 3 Periodos?"],
    javier: ["¿Cuánto puedo ahorrar con placas solares?", "¿Qué es la Nube Solar?", "Cargar mi coche por la noche"],
    diego:  ["¿Cómo funciona mi Nube Solar?", "Programar la carga del coche", "¿Cómo funciona recomendar y ganar?"],
    carmen: ["¿Me conviene el Plan Noche?", "Servicios para mi restaurante", "Protección de Pagos Autónomos"],
    ana:    ["¿Cuánto ahorra cada vecino con solar?", "¿Hay subvenciones para mi comunidad?", "Recarga compartida en el garaje"],
    cso:    ["¿Cómo funciona un PPA?", "PPA y mi objetivo Scope 2", "Infraestructura de recarga para mi flota"]
  };

  // English persona ideas — mirror of IDEAS (same keys)
  var IDEAS_EN = {
    marta:  ["What happens when my promotion ends?", "Lock in my price with Plan Estable", "Is Plan Online 3 Periodos right for me?"],
    javier: ["How much can I save with solar panels?", "What is Nube Solar?", "Charge my car at night"],
    diego:  ["How does my Nube Solar work?", "Schedule my car charging", "How does refer-and-earn work?"],
    carmen: ["Is Plan Noche right for me?", "Services for my restaurant", "Protección de Pagos Autónomos"],
    ana:    ["How much does each neighbour save with solar?", "Are there grants for my community?", "Shared charging in the garage"],
    cso:    ["How does a PPA work?", "PPAs and my Scope 2 target", "Charging infrastructure for my fleet"]
  };

  var WELCOME = {
    generic: "¡Hola! Soy **Aura**, tu asistente de Iberdrola. Puedo ayudarte con planes de luz y gas, solar, movilidad, servicios y más. ¿Qué necesitas?",
    generic_en: "Hi! I'm **Aura**, your Iberdrola assistant. I can help with electricity and gas plans, solar, mobility, services and more. What do you need?",
    chips: ["¿Qué tarifa de luz me conviene?", "Placas solares", "¿Tengo permanencia?", "Coche eléctrico"],
    chips_en: ["Which electricity plan suits me?", "Solar panels", "Do I have a lock-in?", "Electric car"]
  };

  g.IB_KB = { entries: E, ideas: IDEAS, ideas_en: IDEAS_EN, welcome: WELCOME };
})(window);
