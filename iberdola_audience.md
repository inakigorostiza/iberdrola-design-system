# Iberdrola España — Audience & Hyper-Personalization Playbook

> **Purpose.** A working reference for building a **live hyper-personalization demo** on top of Iberdrola España's four retail customer segments. For each cohort it defines: (1) the products & services Iberdrola offers, (2) the **profile/data fields** the platform should hold, (3) segment motivations & pain points, and (4) **buyer personas** with concrete personalization rules.
>
> **Grounding.** Product/segment facts come from a multi-source, adversarially-verified deep-research pass (21 confirmed findings, 4 refuted and excluded). Where facts were verified they are cited inline as `[V]`. Customer **data fields** and **personas** are *inferred* from the verified product/tariff structure and Spanish energy-market conventions (CUPS, 2.0TD/3.0TD tariffs, CNAE codes, self-consumption flags) — they are design artifacts for the demo, **not** claims about Iberdrola's actual CRM. See [§8 Sources & Confidence](#8-sources--confidence-notes).
>
> **Prices are snapshots (2025–2026).** All €/kWh and €/month figures drift; treat them as illustrative defaults for the demo, not guarantees.

---

## Table of Contents

1. [The four-segment model](#1-the-four-segment-model)
2. [Segment: Hogares (Households)](#2-segment-hogares-households)
3. [Segment: Negocios (SMEs & Self-employed)](#3-segment-negocios-smes--self-employed)
4. [Segment: Comunidades (Communities / HOAs)](#4-segment-comunidades-communities--hoas)
5. [Segment: Grandes Clientes / Empresas (Large Clients)](#5-segment-grandes-clientes--empresas-large-clients)
6. [Unified personalization data model](#6-unified-personalization-data-model)
7. [Live demo blueprint: personas → rules → surfaces](#7-live-demo-blueprint-personas--rules--surfaces)
8. [Sources & confidence notes](#8-sources--confidence-notes)

---

## 1. The four-segment model

Iberdrola España structures its retail energy business around **four confirmed customer segments**, each with dedicated electricity, gas, electric-mobility, solar and energy-efficiency offerings. `[V]`

| # | Segment | Site path | Who they are | Core commercial logic |
|---|---------|-----------|--------------|-----------------------|
| 1 | **Hogares** | `/hogar` | Residential households | High-volume, low-ARPU; tariff choice + service/insurance cross-sell + solar |
| 2 | **Negocios** | `/negocios` | SMEs & autónomos (self-employed) | Power-tiered tariffs (<15 kW / >15 kW) + business assistance services |
| 3 | **Comunidades** | `/comunidades` | Communities of neighbours / HOAs | Collective self-consumption (Smart Solar) + shared EV mobility |
| 4 | **Grandes Clientes / Empresas** | `/empresas` | Large corporates & industrials | Long-term renewable **PPAs** + large-scale EV infrastructure |

**Scale context** (illustrative distribution referenced during research): ~11M customers ≈ 10.6M domestic + ~280k SMEs + ~60k industrial. `[V]` This asymmetry matters for the demo: **Hogares** is where personalization volume lives; **Empresas** is where personalization *value-per-account* lives.

**Products that span segments:**
- **Smart Solar** — turnkey ("llave en mano") self-consumption: panel install, permits, custom sizing, financing (3–10 yr), subsidy applications. Serves **single-family homes, communities, and businesses**. `[V]`
- **Electric mobility (EV)** — segment-specific charging solutions for home, business and community. `[V]`

---

## 2. Segment: Hogares (Households)

### 2.1 Products & services `[V unless noted]`

**Electricity tariffs**
- **Plan Estable** — fixed kWh price, price guaranteed **up to 5 years**.
- **Plan Online 3 Periodos** — time-of-use (discriminación horaria): punta ~0.194 / llano ~0.136 / valle ~0.09999 €/kWh.
- **Plan Online** — includes an **EV-charging benefit**: recharge via the Iberdrola Public Charging app and save **up to 40%** in Mi Iberdrola Balance. `[V medium]`
- **100% renewable** energy plans.

**Solar / self-consumption**
- **Plan Ahorro Solar** — solar tariff that pays for surplus and accumulates its value in **Solar Cloud (Nube Solar)**, a *virtual battery* (money credit, not kWh) later discounted from the bill. Surplus ≈ 0.04–0.06 €/kWh; ~€1,000/month cap; up to 24-month validity.
- **Smart Solar** turnkey install (see §1).
- **Smart Solar Pack Premium** (launched Dec 2024; Enphase microinverters + AIKO modules; 25-yr guarantees) — claims **6–9% more generation** in year one. *(Manufacturer performance claim.)*

**Maintenance / insurance add-ons**
- **Protección Eléctrica Hogar Plus** — open to **any** household (even non-Iberdrola energy customers). Emergency electrical repair up to **€550/yr**, unlimited interventions, **3-hour** response; appliance protection up to **€300** per kitchen appliance/TV; **1 annual DIY/handyman visit** (3h labour).
- **Pack Iberdrola Hogar** — **€10.83/mo** (taxes in; €8.95 pre-tax), **50% off first 3 months**. Bundles electrical emergencies (3h, €550/yr), appliance protection, payment protection, and Asistente Smart. (~30-day waiting period.)
- **Urgencias Eléctricas** — standalone **€3.95/mo**, <3h assistance, €550/yr cap (requires an Iberdrola supply contract).

> ⚠️ **Do not use in the demo** (refuted in verification): standalone gas-maintenance prices "Protección Gas €7.95 / Asistencia Gas €3.57", and "Protección Electrodomésticos 10 €8.41". General gas-maintenance packs exist, but these specific names/prices did not survive fact-checking.

### 2.2 Profile fields the platform should hold *(inferred design schema)*

| Group | Field | Type / example | Personalization use |
|-------|-------|----------------|---------------------|
| **Identity** | `cups` | ES + 20–22 chars | Unique supply point key |
| | `contract_holder_age` | int | Life-stage messaging |
| | `household_size` | int | Consumption expectation |
| | `language` | `es` / `eu` / `ca` / `gl` / `en` | Locale of every surface |
| | `region_ccaa` | e.g. `Galicia` | Subsidy & climate context |
| **Property** | `dwelling_type` | `flat` / `single_family` | Solar eligibility |
| | `ownership` | `owner` / `tenant` | Solar & works eligibility |
| | `has_roof_rights` | bool | Solar qualification |
| **Contract** | `tariff_type` | `2.0TD` | Rate structure |
| | `plan` | `estable` / `online_3p` / `ahorro_solar` | Current product |
| | `contracted_power_kw` | e.g. `4.6` | Right-sizing offers |
| | `contract_start` / `promo_end_date` | date | **Price-rise churn trigger** |
| | `renewable_100_flag` | bool | Sustainability messaging |
| **Consumption** | `annual_kwh` | e.g. `3,200` | Savings simulations |
| | `load_curve_shape` | `day` / `night` / `flat` | Tariff-fit recommendation |
| | `peak_valle_ratio` | float | ToU upsell |
| | `gas_flag` | bool | Dual-fuel cross-sell |
| **Assets & behaviour** | `self_consumption_flag` | bool | Solar Cloud messaging |
| | `solar_cloud_balance_eur` | e.g. `18.40` | Balance-in-hero |
| | `ev_owner_flag` | bool | Charging offers |
| | `smart_meter_flag` | bool | Real-time features |
| | `services_owned[]` | `[urgencias_electricas]` | Bundle upsell gaps |
| **Engagement** | `mi_iberdrola_app_active` | bool | Channel routing |
| | `last_login_days` | int | Reactivation |
| | `paperless_flag` | bool | Nudge |
| | `nps_or_sentiment` | `promoter`/`passive`/`detractor` | Retention priority |
| | `open_complaints` | int | Suppress upsell |

### 2.3 Motivations & pain points
- **Motivations:** lower/predictable bills, understanding a confusing bill, "green" without hassle, comfort & convenience (services), independence via solar.
- **Pain points (verified):** **promotional prices that rise after the promised fixed period erodes trust** — e.g. a customer reported a ~€30 increase after 6 months despite a "one-year" offer. `[V]` → *This is the single highest-value personalization trigger in the whole demo.*
- Other pains: fear of solar upfront cost/complexity, appliance-breakdown anxiety, bill opacity.

### 2.4 Buyer personas

**H1 — "Precavida" Marta, 38 · price-sensitive family renter**
Flat, rents, 2.0TD Plan Estable, `promo_end_date` in 45 days, `annual_kwh` 3,400, night-heavy load, no solar (tenant), `sentiment=passive`.
*Goals:* avoid the post-promo bill jump; keep it simple. *Trigger:* promo expiry. *Hook:* proactive "your price is about to change — here's how to lock in / switch to Online 3P for your night usage."

**H2 — "Solar-curioso" Javier, 46 · homeowner, sustainability + savings**
Single-family, owner, `has_roof_rights=true`, `annual_kwh` 6,200, high daytime use, no self-consumption yet, EV owner.
*Goals:* cut bills, energy independence, use the EV cheaply. *Hook:* Smart Solar + Solar Cloud sizing simulation; bundle EV night charging.

**H3 — "Tranquilidad" Rosa, 67 · comfort & peace-of-mind**
Owner, older appliances, low digital engagement (`mi_iberdrola_app_active=false`), no services owned.
*Goals:* no surprises, human help when something breaks. *Hook:* Pack Iberdrola Hogar / Protección Hogar Plus; phone-first channel.

**H4 — "Optimizador" Diego, 33 · engaged, data-driven, already solar**
`self_consumption_flag=true`, Solar Cloud balance €22, app power-user, EV owner, promoter.
*Goals:* squeeze every kWh, track surplus. *Hook:* real-time surplus dashboard, EV smart-charging, referrals.

---

## 3. Segment: Negocios (SMEs & Self-employed)

### 3.1 Products & services `[V]`
**Electricity — structured by contracted power:**
- **<15 kW (2.0TD)** and **>15 kW (3.0TD)** tiers.
- Three tariff shapes, available for both tiers: **Plan Estable** (flat 24h), **Plan Noche** (cheaper nights/mornings), **Plan Comercio** (cheaper business hours).
- **Price guaranteed 5 years**, **no permanence** commitment ("sin permanencia").

**Business assistance / add-on services (fixed €/mo):**
- **Urgencias Eléctricas Negocios <15kW** — €6.95/mo
- **Asistente Smart Empresas** — €2.95/mo
- **Asistencia Eléctrica Negocios** — €3.95/mo
- **Asistencia Informática Negocios** (IT support) — €2.95/mo
- **Protección de Pagos Autónomos** — €3.95/mo, underwritten by **MetLife**, up to **€4,000** coverage

**Solar:** Smart Solar turnkey for businesses (see §1). **EV:** business Smart Charging (+10 kW at ~0.05 €/kWh). `[V]`

### 3.2 Profile fields *(inferred schema — adds firmographics)*

| Group | Field | Example | Use |
|-------|-------|---------|-----|
| **Firmographic** | `cnae_code` | `5610` (restaurant) | Sector-specific offers |
| | `business_type` | `autonomo` / `micro` / `sme` | Tone & product fit |
| | `employees` | int | Scale of assistance need |
| | `premises_count` | int | Multi-site opportunity |
| | `opening_hours_profile` | `daytime` / `evening` / `24h` | **Tariff-shape match** |
| **Contract** | `tariff_tier` | `2.0TD` / `3.0TD` | <15 vs >15 kW |
| | `plan_shape` | `estable`/`noche`/`comercio` | Fit vs usage |
| | `contracted_power_kw` | `22` | Right-sizing |
| **Consumption** | `annual_kwh` | `28,000` | Savings sim |
| | `load_curve_shape` | `daytime` | Plan Comercio fit |
| | `demand_seasonality` | `summer_peak` | Sector energy risk |
| **Services** | `services_owned[]` | `[proteccion_pagos]` | Upsell gaps |
| | `cashflow_sensitivity` | `high` | Payment-protection pitch |
| **Engagement** | `portal_active`, `advisor_assigned` | bool | Channel & touch model |

### 3.3 Motivations & pain points
- **Motivations:** predictable operating costs, uptime (a power cut = lost revenue), minimal admin, cashflow protection, matching tariff to *when the business actually runs*.
- **Pain points (inferred from product design):** electrical breakdowns halting trade → *Asistencia Eléctrica/Urgencias*; late-paying clients / cashflow gaps → *Protección de Pagos Autónomos*; IT downtime → *Asistencia Informática*; wrong tariff shape for their hours.

### 3.4 Buyer personas

**N1 — "Hostelero" Carmen, 44 · restaurant owner (CNAE 5610)**
3.0TD, `contracted_power_kw` 25, evening/night load, `opening_hours_profile=evening`, no payment protection.
*Hook:* Plan Noche fit + Urgencias Eléctricas Negocios (a fridge/oven failure = spoiled stock).

**N2 — "Autónomo" Pablo, 31 · freelance designer, home-office**
2.0TD micro, daytime load, cashflow-sensitive, IT-dependent.
*Hook:* Protección de Pagos Autónomos (MetLife) + Asistencia Informática; Plan Comercio for daytime hours.

**N3 — "Comercio" Lucía, 52 · retail shop, daytime hours**
2.0TD, `opening_hours_profile=daytime`, owns premises with roof.
*Hook:* Plan Comercio + Smart Solar (daytime generation matches daytime load perfectly).

---

## 4. Segment: Comunidades (Communities / HOAs)

### 4.1 Products & services `[V]`
- **Smart Solar for communities** — turnkey collective self-consumption for apartment buildings / comunidades de vecinos, incl. **subsidy-application assistance** (`/smart-solar/comunidades/subvenciones`).
- **Smart mobility for communities** — shared EV charging in common parking (`/homeowners-associations/smart-mobility`).
- Shares the Solar Cloud virtual-battery and surplus-compensation mechanics.

> **Open question (research gap):** what *else* distinguishes the Comunidades offer — dedicated community electricity tariff? common-area energy management? collective-self-consumption bill-splitting? Not source-confirmed. For the demo, model the **decision-maker dynamics** (administrator + president + neighbours) rather than inventing tariffs.

### 4.2 Profile fields *(inferred schema — B2B2C, multi-stakeholder)*

| Group | Field | Example | Use |
|-------|-------|---------|-----|
| **Community** | `community_id`, `num_dwellings` | `48` | Sizing & split logic |
| | `has_common_areas` | `garage`,`lift`,`pool` | Common-area consumption |
| | `roof_area_m2`, `roof_orientation` | `320`, `S` | Solar feasibility |
| | `parking_spaces`, `ev_interest_count` | int | EV-charging demand |
| **Decision** | `administrator_id` | admin firm | Primary contact |
| | `president_contact` | person | Approval path |
| | `vote_status` | `pending`/`approved` | Funnel stage |
| **Financial** | `subsidy_eligible`, `subsidy_zone` | bool | Grant assistance |
| | `financing_needed` | bool | 3–10 yr install financing |
| **Engagement** | `neighbour_optin_rate` | % | Collective-self-consumption viability |

### 4.3 Motivations & pain points
- **Motivations:** cut common-area bills (lift, garage, lighting), raise property value, access public subsidies, "green building" prestige — **with minimal friction** because decisions need a neighbour vote.
- **Pain points:** coordination/consensus among neighbours; who pays / how savings split; paperwork and subsidy bureaucracy; distrust of upfront cost. Iberdrola's turnkey + subsidy-handling directly targets these.

### 4.4 Buyer personas

**C1 — "Administrador de fincas" Fernando, 49 · property administrator (channel/decision-maker)**
Manages many communities, `vote_status` varies, wants low-hassle recurring wins.
*Hook:* portfolio view, "communities eligible for solar subsidy in your zone," done-for-you paperwork.

**C2 — "Presidente proactivo" Ana, 55 · HOA president, sustainability-minded**
48-dwelling block, garage + lift, `subsidy_eligible=true`, gathering neighbour buy-in.
*Hook:* savings-split simulator + subsidy amount + EV-charging interest poll to build the vote.

---

## 5. Segment: Grandes Clientes / Empresas (Large Clients)

### 5.1 Products & services `[V]`
- **Long-term renewable PPAs** — positioned as *"the ideal tool for customers who want to electrify, ensuring 100% renewable energy at a stable price over the long term"* (David Martínez, Director Clientes España). Iberdrola is the **#1 European long-term PPA seller three years running**.
- **Example — Mercadona:** >300 MW combined wind + solar, ~10-year term, supplying logistics centres & supermarkets (signed 2025).
- **Large-scale EV infrastructure** — supply, install, commission & operate up to **3,500 charging points across 800 Mercadona stores** (Spain + Portugal). *(Rollout target ceiling — ~2,000 live as of 2024.)*
- Named counterparties are large corporates/industrials: **Mercadona, Microsoft, Amazon, Apple, Telefónica, Renfe, Gestamp**.

### 5.2 Profile fields *(inferred schema — account-based, firmographic-heavy)*

| Group | Field | Example | Use |
|-------|-------|---------|-----|
| **Firmographic** | `industry`, `annual_gwh` | `retail`, `450` | Deal sizing |
| | `num_sites`, `countries` | `1,600`, `ES,PT` | Multi-site infra |
| | `credit_rating` | `A` | Contract terms |
| **Sustainability** | `esg_commitment` | `RE100` | PPA hook |
| | `scope2_target_year` | `2030` | Electrification urgency |
| | `public_climate_pledge` | bool | Messaging tone |
| **Contract** | `ppa_status`, `ppa_mw`, `ppa_term_years` | `active`,`300`,`10` | Renewal/expansion |
| | `ev_infra_sites` | int | Cross-sell mobility |
| **Relationship** | `key_account_manager`, `qbr_cadence` | person, quarterly | Human-led, not self-serve |
| | `decision_committee[]` | roles | Multi-threaded selling |

### 5.3 Motivations & pain points
- **Motivations:** price stability & hedging at scale, ESG/RE100 reporting, **electrification** of operations & fleets, security of long-term supply, reputational leadership.
- **Pain points:** budget predictability across volatile wholesale markets; proving 100%-renewable for reporting; deploying/operating charging infra without owning the capability; long procurement/committee cycles.

### 5.4 Buyer personas

**E1 — "Chief Sustainability Officer" (RE100 corporate)**
`esg_commitment=RE100`, `scope2_target_year=2030`, public pledge.
*Hook:* PPA as verifiable 100%-renewable at stable price; certificates of origin; case studies (Microsoft/Amazon).

**E2 — "Energy/Procurement Director" (multi-site retailer/industrial)**
`num_sites` high, `annual_gwh` large, budget-volatility pain.
*Hook:* long-term fixed-price hedge + bundled EV infrastructure operated end-to-end (Mercadona proof point).

---

## 6. Unified personalization data model

A single profile schema drives every surface. **Segment is one field**, not four separate systems — this is what lets one demo engine personalize across cohorts.

```json
{
  "customer_id": "IBD-7731204",
  "segment": "hogares",            // hogares | negocios | comunidades | empresas
  "locale": { "language": "gl", "region_ccaa": "Galicia" },
  "identity": {
    "life_stage": "family",
    "decision_role": "holder"      // holder | administrator | president | cso | procurement
  },
  "property": { "dwelling_type": "single_family", "ownership": "owner", "has_roof_rights": true },
  "contract": {
    "tariff_type": "2.0TD", "plan": "estable", "contracted_power_kw": 5.75,
    "promo_end_date": "2026-08-30", "renewable_100_flag": false, "gas_flag": true
  },
  "consumption": { "annual_kwh": 6200, "load_curve_shape": "day", "peak_valle_ratio": 1.9 },
  "assets": {
    "self_consumption_flag": false, "solar_cloud_balance_eur": 0,
    "ev_owner_flag": true, "smart_meter_flag": true
  },
  "services_owned": [],
  "engagement": {
    "app_active": true, "last_login_days": 3, "paperless": true,
    "sentiment": "passive", "open_complaints": 0
  },
  "derived": {                     // computed by the engine, drives rules
    "promo_expiring_soon": true,
    "solar_candidate": true,
    "ev_charging_gap": true,
    "service_bundle_gap": true,
    "churn_risk": "medium"
  }
}
```

**Derived flags (the personalization triggers):**

| Flag | Rule (illustrative) | Fires message |
|------|---------------------|---------------|
| `promo_expiring_soon` | `promo_end_date − today ≤ 60d` | Proactive price-change explainer (⭐ top trust play) |
| `solar_candidate` | `owner && has_roof_rights && annual_kwh > 4000 && load=day` | Smart Solar sizing sim |
| `ev_charging_gap` | `ev_owner && !ev_charging_service` | EV night-charging / Recarga app |
| `service_bundle_gap` | `sentiment≠detractor && services_owned=∅ && appliances_old` | Pack Iberdrola Hogar |
| `solar_surplus_active` | `self_consumption && solar_cloud_balance>0` | Surplus dashboard in hero |
| `tariff_shape_mismatch` (Negocios) | `plan_shape ≠ opening_hours_profile` | Switch to Noche/Comercio |
| `cashflow_risk` (Negocios) | `business_type=autonomo && cashflow_sensitivity=high` | Protección de Pagos (MetLife) |
| `subsidy_window` (Comunidades) | `subsidy_eligible && vote_status=pending` | Subsidy-amount + savings-split sim |
| `re100_electrify` (Empresas) | `esg_commitment=RE100 && ppa_status≠active` | PPA electrification pitch |

**Suppression rules (equally important for a credible demo):**
- `open_complaints > 0` → suppress all upsell, show support-first.
- `sentiment = detractor` → retention message, never cross-sell.
- Already-owned product → never re-pitch; show the *next* gap.

---

## 7. Live demo blueprint: personas → rules → surfaces

**Recommended demo flow:** a single web page (or Mi Iberdrola mock) whose hero, offer card, and channel nudge re-render as you switch the active profile from a dropdown. One engine, many faces.

### 7.1 Seed profiles (drop-in demo data)
Use **H1 Marta**, **H2 Javier**, **H4 Diego**, **N1 Carmen**, **C2 Ana**, **E1 CSO** — they light up the six most distinct rules and cover all four segments.

### 7.2 Rule → surface matrix

| Persona | Fired flag | Hero headline (demo copy) | Primary CTA | Channel |
|---------|-----------|---------------------------|-------------|---------|
| **H1 Marta** | `promo_expiring_soon` | "Tu precio cambia el 30 ago. Te explicamos tus opciones — sin sorpresas." | Ver mi nuevo precio | App push + email |
| **H2 Javier** | `solar_candidate` + `ev_charging_gap` | "Tu tejado podría generar ~6.200 kWh/año. Y cargar tu coche por la noche." | Simular mi instalación solar | Web + advisor callback |
| **H4 Diego** | `solar_surplus_active` | "Llevas 22 € en tu Nube Solar este mes." | Ver mi excedente en tiempo real | App dashboard |
| **N1 Carmen** | `tariff_shape_mismatch` + service gap | "Tu negocio consume de noche. Tu tarifa, no. Y una avería no puede parar tu cocina." | Cambiar a Plan Noche + Urgencias | Advisor + email |
| **C2 Ana** | `subsidy_window` | "Tu comunidad puede optar a subvención solar. Calcula el ahorro por vecino." | Preparar la propuesta para la junta | Administrator portal |
| **E1 CSO** | `re100_electrify` | "100% renovable, precio estable a 10 años. El PPA como palanca de tu Scope 2." | Hablar con tu Key Account Manager | KAM / QBR |

### 7.3 What makes it read as *hyper*-personalization (not just segmentation)
1. **Trigger on the pain, not the profile** — the promo-expiry play uses a *date field* to pre-empt the #1 verified trust problem. That's the demo's money moment.
2. **Combine ≥2 signals** — Javier gets solar *and* EV because two flags fired; show the rule stack in a debug panel.
3. **Respect suppression** — flip `open_complaints=1` on a persona live to show upsell disappear and support surface. Judges/clients love this.
4. **Cross-segment, one engine** — switching from Marta (Hogares) to the CSO (Empresas) changes tone, product, *and* channel from the same schema.

### 7.4 Suggested build (fits this repo's stack)
- Static `index.html` + a small `profiles.json` (the six seed profiles) + a `rules.js` engine (pure functions: `profile → firedFlags → surface`). No backend needed for a live demo.
- Optional: a **"Debug: why this message?"** toggle that prints the fired flags + rule — this sells the *hyper*-personalization story better than the copy itself.

---

## 8. Sources & confidence notes

**Method.** Deep-research pass: 5 search angles → 23 sources fetched → 62 claims → 25 adversarially verified (3-vote, need 2/3 to kill) → **21 confirmed, 4 refuted**. `[V]` marks a verified finding.

**Primary/verified sources (product & segment facts):**
- iberdrola.es product pages: `/luz/ofertas-plan-estable`, `/luz/ofertas-plan-online-tres-periodos`, `/luz/ofertas-plan-ahorro-solar`, `/companies/smart-solar`, `/smart-solar/comunidades/subvenciones`, `/en/homeowners-associations/smart-mobility`
- iberdrolaespana.com press room: Smart Solar Pack Premium launch (13 Dec 2024); Mercadona PPA agreement (2025)
- Independent Spanish comparators (mutually consistent): Selectra, papernest, hellowatt, comparadorluz, roams, rastreator, tarifasgasluz
- B2B/PPA: power-technology, renewablesnow, empresaexterior

**Confidence caveats:**
- **Prices are 2025–2026 snapshots** and drift; treat every € figure as an illustrative default.
- **Bot-blocking (HTTP 403):** most iberdrola.es primary pages blocked automated fetch, so verification leaned on search extractions + reputable comparator sites — high-quality but partly secondary.
- **Marketing vs field data:** the Smart Solar "6–9% more generation" and the PPA "stable price / electrification" framing are **Iberdrola's own claims**, not independently validated performance.
- **Rollout targets:** "3,500 charging points / 800 Mercadona stores" is a ceiling, not a completed count (~2,000 live as of 2024).

**Explicitly excluded (refuted in verification — do NOT put in the demo):**
- A business "smart" suite (Smart Clima Aerotermia, Control Clima Smart, Termostato Smart) — refuted 0-3.
- Standalone gas-maintenance prices "Protección Gas €7.95" / "Asistencia Gas €3.57" — refuted 0-3.
- "Protección Electrodomésticos 10 €8.41" standalone plan — refuted 1-2.
- A three-way "Residential / Commercial / Industrial" segmentation (blog-sourced) — refuted 0-3; the **four-segment** model is the correct one.

**Inferred, not source-confirmed (design artifacts for the demo):**
All **profile/data-field schemas** (§2.2, §3.2, §4.2, §5.2), all **buyer personas**, and all **personalization rules** are *inferred from the verified product/tariff structure* + Spanish energy-market conventions. They are realistic and demo-ready but are **not** claims about Iberdrola's actual CRM fields.

**Open questions worth a follow-up pass:**
1. Actual per-segment CRM fields Iberdrola captures (CUPS, contracted power, CNAE, self-consumption flag, app engagement).
2. Concrete gas tariff & gas-maintenance product names/prices per segment.
3. What distinguishes the **Comunidades** offer beyond shared Smart Solar + EV (dedicated tariff? common-area management? bill-split logic?).
4. B2B buyer-persona motivations for Negocios/Empresas (cost-control vs ESG-reporting vs electrification) — evidence was thinner here than for Hogares.

---

*Generated for hyper-personalization demo design. Verified facts current as of the 2025–2026 research window; prices and rollout figures are snapshots.*