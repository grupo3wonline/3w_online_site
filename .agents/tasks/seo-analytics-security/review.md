# Review — SEO/Analytics/Security Commit `1c4655a`

## Evidence Summary

### Commit message verification (REQ-7)
```
Verification: vue-tsc=PASS, vitest=236 passing, vite build=PASS
```
All three required verification commands are recorded as passing. ✓

---

### REQ-1 — `src/views/ferramentas/ToolWrapper.vue`

**a) injectJsonLd triggered by onMounted AND watch(route.path)**
`setupToolTracking()` is defined and registered via both hooks:
```ts
onMounted(setupToolTracking)
watch(() => route.path, setupToolTracking)
```
`injectJsonLd(...)` is the first call inside `setupToolTracking()`. ✓

**b) Schema shape**
```ts
injectJsonLd({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  ...
  applicationCategory: 'UtilityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
}, 'tool-webapp')
```
All required fields present. ✓

**c) trackToolUsage(toolTitle, 'view')**
Called inside `setupToolTracking()` immediately after `injectJsonLd`. ✓

**d) executeRecaptcha('tool_view') with .catch()**
```ts
executeRecaptcha('tool_view').catch(() => { /* silent background score */ })
```
✓

**e) No AppTurnstile or visible Turnstile widget**
Grep confirms zero matches for `Turnstile` / `AppTurnstile` in ToolWrapper.vue. ✓

**f) TypeScript validity**
Commit records `vue-tsc=PASS`. ✓

---

### REQ-2 — `src/views/ferramentas/Tools.vue`

**a) trackButtonClick(toolName, 'tools_listing') on tool card interaction**
Appears on `@click` in three places (filtered grid, tools grouped grid, apps grouped grid):
- line 156: `@click="trackButtonClick(item.name, 'tools_listing')"`
- line 224: `@click="trackButtonClick(tool.name, 'tools_listing')"`
- line 271: `@click="trackButtonClick(app.name, 'tools_listing')"`
✓

**b) trackSearch with 400 ms debounce**
```ts
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null
watch(searchQuery, (val) => {
  if (searchDebounceTimer) clearTimeout(searchDebounceTimer)
  if (val && val.trim()) {
    searchDebounceTimer = setTimeout(() => trackSearch(val.trim()), 400)
  }
})
```
Correct manual debounce at 400 ms. ✓

---

### REQ-3 — `src/views/ferramentas/AppWrapper.vue` (new file)

**a) SEO setup with title, description, keywords based on slug**
`applySeo()` (the actual export name in `useSeo`) called inside `setupAppTracking()`:
```ts
applySeo({
  title: appName + ' | Aplicacao Online Gratuita | 3W Online',
  description: 'Use ' + appName + ' online gratuitamente...',
  path: route.path,
  keywords: appName.toLowerCase() + ', aplicacao online, ferramenta gratuita, 3w online, curitiba',
})
```
All three fields are derived from `slug.value`. ✓

**b) trackToolUsage(appName, 'view') on mount and slug change**
```ts
onMounted(setupAppTracking)
watch(() => slug.value, setupAppTracking)
```
✓

**c) executeRecaptcha('app_view')**
```ts
executeRecaptcha('app_view').catch(() => { /* silent */ })
```
✓

---

### REQ-4 — `index.html`

**a) GSC comment placeholder**
```html
<!-- Google Search Console: substitua pelo codigo de verificacao em https://search.google.com/search-console -->
```
✓

**b) Meta tag commented out (not live)**
```html
<!-- <meta name="google-site-verification" content="SEU_CODIGO_AQUI" /> -->
```
✓

---

### REQ-5 — `src/views/services/*.vue`

All 13 files verified with grep:

| File | serviceType | FAQ count |
|------|-------------|-----------|
| WebDevelopment.vue | WebsiteCreation | 8 |
| SystemDevelopment.vue | WebSystemDevelopment | 8 |
| AutomacaoIA.vue | AIAutomation | 7 |
| AdsManagement.vue | AdvertisingManagement | 7 |
| SocialMediaManagement.vue | SocialMediaManagement | 7 |
| MarketingDigital.vue | DigitalMarketing | 7 |
| AppDevelopment.vue | MobileAppDevelopment | 7 |
| CampaignPlanning.vue | CampaignPlanning | 7 |
| GraphicDesign.vue | GraphicDesign | 7 |
| BusinessOrganization.vue | BusinessOrganization | 7 |
| MarketingConsulting.vue | MarketingConsulting | 7 |
| PublicRelations.vue | PublicRelations | 7 |
| Advertising.vue | Advertising | 7 |

All ≥ 3 FAQs. All have `serviceType`. TypeScript valid per commit. ✓

---

### REQ-6 — `public/sitemap.xml`

**a) 13 `/servicos/*` URLs**
Confirmed from diff:
1. `/servicos/criacao-sites`
2. `/servicos/criacao-sistemas`
3. `/servicos/automacao-ia`
4. `/servicos/gestao-anuncios`
5. `/servicos/gestao-redes-sociais`
6. `/servicos/marketing-digital`
7. `/servicos/desenvolvimento-apps`
8. `/servicos/planejamento-campanhas`
9. `/servicos/design-grafico`
10. `/servicos/consultoria-marketing`
11. `/servicos/publicidade`
12. `/servicos/organizacao-comercial`
13. `/servicos/relacoes-publicas`

13 of 13 present. ✓

**b) ≥ 15 `/ferramentas/*` tool URLs**
Exactly 20 added under `<!-- Top 20 Ferramentas -->` block. ✓

---

## Verdict

No blockers. All 7 requirements are fully satisfied.
