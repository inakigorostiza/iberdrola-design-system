/* ==========================================================================
   Iberdrola — Área Cliente demo profiles + credentials
   Client-side DEMO ONLY (no real auth). Grounded in iberdola_audience.md
   (§6 schema, §7.2 persona→surface matrix). Prices are illustrative snapshots.
   Shared by login.html and js/personalize.js.
   ========================================================================== */
(function (global) {
  var IMG = "?w=1600&q=80&auto=format&fit=crop";

  var PROFILES = {
    /* ---------------- HOGARES ---------------- */
    marta: {
      key: "marta", segment: "hogares", segmentLabel: "Hogares",
      name: "Marta", fullName: "Marta Ruiz", initials: "MR", email: "marta@example.com",
      hero: {
        eyebrow: "Tu plan de luz",
        headline: "Tu precio cambia pronto. Te lo explicamos, sin sorpresas.",
        sub: "Tu promoción termina en unos días. Mira tus opciones y elige con tranquilidad — sin permanencia.",
        cta: { label: "Ver mi nuevo precio", href: "#px-slot" },
        cta2: { label: "Hablar con un asesor", href: "#" },
        media: { type: "video", src: "https://videos.pexels.com/video-files/3769966/3769966-hd_1920_1080_25fps.mp4",
                 poster: "https://images.unsplash.com/photo-1484154218962-a197022b5858" + IMG }
      },
      profile: {
        contract: { plan: "estable", tariff_type: "2.0TD", contracted_power_kw: 4.6, promo_end_date: "2026-08-30", renewable_100_flag: true },
        property: { dwelling_type: "flat", ownership: "tenant", has_roof_rights: false },
        consumption: { annual_kwh: 3400, load_curve_shape: "night", peak_valle_ratio: 1.4 },
        assets: { self_consumption_flag: false, solar_cloud_balance_eur: 0, ev_owner_flag: false },
        services_owned: [], engagement: { sentiment: "passive", open_complaints: 0, app_active: true }
      },
      tariffDefault: 0
    },
    javier: {
      key: "javier", segment: "hogares", segmentLabel: "Hogares",
      name: "Javier", fullName: "Javier Soler", initials: "JS", email: "javier@example.com",
      hero: {
        eyebrow: "Autoconsumo solar",
        headline: "Tu tejado podría generar ~6.200 kWh al año.",
        sub: "Y cargar tu coche eléctrico por la noche a mitad de precio. Calcula tu instalación solar a medida.",
        cta: { label: "Simular mi instalación solar", href: "#px-slot" },
        cta2: { label: "Ver Smart Solar", href: "#" },
        media: { type: "image", src: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d" + IMG, kenburns: true }
      },
      profile: {
        contract: { plan: "estable", tariff_type: "2.0TD", contracted_power_kw: 5.75, promo_end_date: "2027-03-01", renewable_100_flag: true },
        property: { dwelling_type: "single_family", ownership: "owner", has_roof_rights: true },
        consumption: { annual_kwh: 6200, load_curve_shape: "day", peak_valle_ratio: 1.9 },
        assets: { self_consumption_flag: false, solar_cloud_balance_eur: 0, ev_owner_flag: true },
        services_owned: [], engagement: { sentiment: "passive", open_complaints: 0, app_active: true }
      },
      tariffDefault: 0
    },
    diego: {
      key: "diego", segment: "hogares", segmentLabel: "Hogares",
      name: "Diego", fullName: "Diego Márquez", initials: "DM", email: "diego@example.com",
      hero: {
        eyebrow: "Tu Nube Solar",
        headline: "Llevas 22 € acumulados en tu Nube Solar este mes.",
        sub: "Tu excedente solar trabaja para ti. Sigue tu generación en tiempo real y optimiza cada kWh.",
        cta: { label: "Ver mi excedente en tiempo real", href: "#px-slot" },
        cta2: { label: "Programar carga del coche", href: "#" },
        media: { type: "video", src: "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4",
                 poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa" + IMG }
      },
      profile: {
        contract: { plan: "ahorro_solar", tariff_type: "2.0TD", contracted_power_kw: 6.9, promo_end_date: "2027-01-15", renewable_100_flag: true },
        property: { dwelling_type: "single_family", ownership: "owner", has_roof_rights: true },
        consumption: { annual_kwh: 5200, load_curve_shape: "day", peak_valle_ratio: 2.1 },
        assets: { self_consumption_flag: true, solar_cloud_balance_eur: 22, ev_owner_flag: true },
        services_owned: ["urgencias_electricas"], engagement: { sentiment: "promoter", open_complaints: 0, app_active: true }
      },
      tariffDefault: 2
    },
    /* ---------------- NEGOCIOS ---------------- */
    carmen: {
      key: "carmen", segment: "negocios", segmentLabel: "Negocios",
      name: "Carmen", fullName: "Carmen Vidal", initials: "CV", email: "carmen@example.com", business: "Restaurante Carmen",
      hero: {
        eyebrow: "Iberdrola Negocios",
        headline: "Tu negocio consume de noche. Tu tarifa, no.",
        sub: "Ajusta tu plan a tus horas reales y protege tu cocina: una avería no puede pararte el servicio.",
        cta: { label: "Ver mi plan a medida", href: "#px-slot" },
        cta2: { label: "Llamar a un asesor", href: "tel:911981068" },
        media: { type: "image", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0" + IMG, kenburns: true }
      },
      profile: {
        firmographic: { cnae_code: "5610", business_type: "sme", opening_hours_profile: "evening" },
        contract: { tariff_tier: "3.0TD", plan_shape: "estable", contracted_power_kw: 25 },
        consumption: { annual_kwh: 28000, load_curve_shape: "evening" },
        services_owned: [], engagement: { sentiment: "passive", open_complaints: 0 }
      },
      tariffDefault: 0
    },
    /* ---------------- COMUNIDADES ---------------- */
    ana: {
      key: "ana", segment: "comunidades", segmentLabel: "Comunidades",
      name: "Ana", fullName: "Ana Torres", initials: "AT", email: "ana@example.com", role: "Presidenta · C/ Mayor 12",
      hero: {
        eyebrow: "Comunidades",
        headline: "Tu comunidad puede optar a subvención solar.",
        sub: "Calcula el ahorro por vecino, prepara la propuesta para la junta y nosotros gestionamos las ayudas.",
        cta: { label: "Calcular ahorro por vecino", href: "#px-slot" },
        cta2: { label: "Preparar propuesta para la junta", href: "#" },
        media: { type: "image", src: "https://images.unsplash.com/photo-1460317442991-0ec209397118" + IMG, kenburns: true }
      },
      profile: {
        community: { num_dwellings: 48, has_common_areas: ["garaje", "ascensor"], roof_area_m2: 320, roof_orientation: "S",
                     parking_spaces: 30, subsidy_eligible: true, subsidy_zone: "Comunidad de Madrid", vote_status: "pending" },
        engagement: { sentiment: "passive", open_complaints: 0 }
      },
      tariffDefault: 0
    },
    /* ---------------- EMPRESAS ---------------- */
    cso: {
      key: "cso", segment: "empresas", segmentLabel: "Grandes Clientes",
      name: "Elena", fullName: "Elena Navarro", initials: "EN", email: "cso@example.com", role: "Chief Sustainability Officer · RetailCo",
      hero: {
        eyebrow: "Grandes Clientes · PPA",
        headline: "100% renovable, precio estable a 10 años.",
        sub: "El PPA como palanca de tu Scope 2: electrifica tus operaciones con energía verde certificada y a precio fijo.",
        cta: { label: "Hablar con tu Key Account Manager", href: "#px-slot" },
        cta2: { label: "Ver casos (Mercadona, Microsoft)", href: "#" },
        media: { type: "image", src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7" + IMG, kenburns: true }
      },
      profile: {
        firmographic: { industry: "retail", annual_gwh: 450, num_sites: 1600, countries: ["ES", "PT"], credit_rating: "A" },
        sustainability: { esg_commitment: "RE100", scope2_target_year: 2030, public_climate_pledge: true },
        contract: { ppa_status: "none", ppa_mw: 0, ppa_term_years: 0, ev_infra_sites: 0 },
        engagement: { sentiment: "passive", open_complaints: 0 }
      },
      tariffDefault: 1
    }
  };

  // ---- English variants (bilingual). Merged onto each profile as *_en. ----
  var EN = {
    marta: {
      segmentLabel: "Home",
      hero: {
        eyebrow: "Your electricity plan",
        headline: "Your price is changing soon. We'll explain it — no surprises.",
        sub: "Your promotion ends in a few days. Review your options and choose with peace of mind — no lock-in.",
        cta: { label: "See my new price" }, cta2: { label: "Talk to an advisor" }
      }
    },
    javier: {
      segmentLabel: "Home",
      hero: {
        eyebrow: "Solar self-consumption",
        headline: "Your roof could generate ~6,200 kWh a year.",
        sub: "And charge your electric car overnight at half price. Design your tailored solar installation.",
        cta: { label: "Simulate my solar installation" }, cta2: { label: "See Smart Solar" }
      }
    },
    diego: {
      segmentLabel: "Home",
      hero: {
        eyebrow: "Your Solar Cloud",
        headline: "You've saved 22 € in your Solar Cloud this month.",
        sub: "Your solar surplus works for you. Track your generation in real time and optimize every kWh.",
        cta: { label: "See my surplus in real time" }, cta2: { label: "Schedule car charging" }
      }
    },
    carmen: {
      segmentLabel: "Business", business: "Carmen's Restaurant",
      hero: {
        eyebrow: "Iberdrola Business",
        headline: "Your business runs at night. Your tariff doesn't.",
        sub: "Match your plan to your real hours and protect your kitchen: a breakdown can't stop your service.",
        cta: { label: "See my tailored plan" }, cta2: { label: "Call an advisor" }
      }
    },
    ana: {
      segmentLabel: "Communities", role: "Chair · 12 Mayor St.",
      hero: {
        eyebrow: "Communities",
        headline: "Your building may qualify for a solar grant.",
        sub: "Estimate the savings per resident, prepare the proposal for the board, and we'll handle the grants.",
        cta: { label: "Calculate savings per resident" }, cta2: { label: "Prepare the board proposal" }
      }
    },
    cso: {
      segmentLabel: "Large Clients", role: "Chief Sustainability Officer · RetailCo",
      hero: {
        eyebrow: "Large Clients · PPA",
        headline: "100% renewable, stable price for 10 years.",
        sub: "The PPA as a lever for your Scope 2: electrify your operations with certified green energy at a fixed price.",
        cta: { label: "Talk to your Key Account Manager" }, cta2: { label: "See case studies (Mercadona, Microsoft)" }
      }
    }
  };
  Object.keys(EN).forEach(function (k) {
    if (!PROFILES[k]) return;
    PROFILES[k].segmentLabel_en = EN[k].segmentLabel;
    PROFILES[k].hero_en = EN[k].hero;
    if (EN[k].role) PROFILES[k].role_en = EN[k].role;
    if (EN[k].business) PROFILES[k].business_en = EN[k].business;
  });

  var CREDENTIALS = {
    "marta":  { pass: "hogar26",     key: "marta" },
    "javier": { pass: "solar26",     key: "javier" },
    "diego":  { pass: "nube26",      key: "diego" },
    "carmen": { pass: "negocio26",   key: "carmen" },
    "ana":    { pass: "comunidad26", key: "ana" },
    "cso":    { pass: "empresa26",   key: "cso" }
  };

  // For the login page hint list
  var DEMO_HINTS = [
    { user: "marta",  pass: "hogar26",     who: "Hogares · promoción a punto de vencer", who_en: "Home · promotion about to expire" },
    { user: "javier", pass: "solar26",     who: "Hogares · candidato a solar + VE",      who_en: "Home · solar + EV candidate" },
    { user: "diego",  pass: "nube26",      who: "Hogares · autoconsumo activo",           who_en: "Home · active self-consumption" },
    { user: "carmen", pass: "negocio26",   who: "Negocios · restaurante",                 who_en: "Business · restaurant" },
    { user: "ana",    pass: "comunidad26", who: "Comunidades · subvención solar",         who_en: "Communities · solar grant" },
    { user: "cso",    pass: "empresa26",   who: "Grandes Clientes · PPA / RE100",         who_en: "Large Clients · PPA / RE100" }
  ];

  // Build PostHog person properties (identity + curated key attributes) from a profile.
  function personProps(p) {
    var pr = p.profile || {}, c = pr.contract || {}, cons = pr.consumption || {}, as = pr.assets || {},
        fm = pr.firmographic || {}, comm = pr.community || {}, su = pr.sustainability || {};
    var props = {
      email: p.email, name: p.fullName, segment: p.segment, segmentLabel: p.segmentLabel,
      plan: c.plan || c.plan_shape, tariff_type: c.tariff_type || c.tariff_tier,
      contracted_power_kw: c.contracted_power_kw, annual_kwh: cons.annual_kwh,
      self_consumption: as.self_consumption_flag, ev_owner: as.ev_owner_flag,
      solar_cloud_balance_eur: as.solar_cloud_balance_eur,
      business_type: fm.business_type, industry: fm.industry, annual_gwh: fm.annual_gwh,
      esg_commitment: su.esg_commitment, num_dwellings: comm.num_dwellings,
      subsidy_eligible: comm.subsidy_eligible
    };
    Object.keys(props).forEach(function (k) { if (props[k] === undefined) delete props[k]; });
    return props;
  }
  // Identify the logged-in demo user in PostHog (distinct_id = profile key). No-op if PostHog absent.
  global.IB_identify = function (p) {
    if (!window.posthog || !p || !p.key) return;
    window.posthog.identify(p.key, personProps(p));
  };

  global.IB_PROFILES = PROFILES;
  global.IB_CREDENTIALS = CREDENTIALS;
  global.IB_DEMO_HINTS = DEMO_HINTS;
})(window);
