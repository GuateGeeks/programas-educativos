## 1. Port the Liquid Glass base theme

- [x] 1.1 Replace `src/css/custom.css` with the GuateGeeks Liquid Glass system from `equipos-educativos/src/css/custom.css` (coral/sky/plum scales, `--ifm-color-primary-*` coral, `--glass-*` tokens, light + dark blocks)
- [x] 1.2 Include the Barlow / Barlow Condensed / JetBrains Mono `@import` and the `--ifm-font-family-base` / `--ifm-heading-font-family` wiring (also set `--ifm-font-family-monospace`)
- [x] 1.3 Port the glass utility classes (`glass-panel`, `glass-card`, `text-gradient-coral`, `text-gradient-multi`, `glow-coral`)
- [x] 1.4 Port the chrome overrides (navbar glass backdrop via `::before`, sidebar active/hover, button gradients, footer blur, focus ring, scrollbar, `prefers-reduced-motion` guard)

## 2. Config and swizzled theme components

- [x] 2.1 Copy `src/theme/DocRoot/Layout/Sidebar/ExpandButton/` and `src/theme/DocSidebar/Desktop/CollapseButton/` from `equipos-educativos` into the hub's `src/theme/`
- [x] 2.2 Reconcile the swizzled components against the hub's resolved Docusaurus version — hub resolves to **3.10.1**; both swizzle targets exist in `theme-classic` and Props signatures match exactly (`toggleSidebar`, `onClick`). No API drift, no changes needed.
- [x] 2.3 Set `themeConfig.docs.sidebar.hideable: true` in `docusaurus.config.ts` (colorMode/prism already matched the new system)

## 3. Re-skin CiudadBots components onto Liquid Glass tokens

- [x] 3.1 Rewrite `src/components/Module/styles.module.css` per the retired→Liquid Glass mapping (phases → coral/sky/plum/deep-terracotta; no inline colors in `index.tsx`)
- [x] 3.2 Rewrite `src/components/ProgressTracker/styles.module.css` onto the new tokens (progress bar → coral→sky gradient)
- [x] 3.3 Rewrite `src/components/BuildGuide/styles.module.css` onto the new tokens (gold buttons → coral gradient, teal badge → coral)
- [x] 3.4 Rewrite `src/components/CityBotsHero/styles.module.css` and reconcile the three.js color constants (teal → sky; coral kept)

## 4. Purge retired vocabulary

- [x] 4.1 Grepped `src/` for all retired tokens (`--gg-teal`, `--gg-ink(-2)`, `--gg-paper`, `--gg-card`, `--gg-gold`, `--gg-line`, `--gg-radius`, bare `--gg-coral`, `--gg-coral-dark`) → zero references. **Also re-skinned `src/pages/index.module.css` and `src/pages/estudiante/styles.module.css`**, which the original task scope missed but which referenced retired tokens.
- [x] 4.2 Confirmed the set of `--gg-*/--glass-*` tokens referenced across `src/` is exactly the set defined in `custom.css` (no undefined custom properties)

## 5. Verify

- [x] 5.1 `npm run build` **passes** (both `es` + `en` locales compile cleanly). `npm run typecheck` **fails on PRE-EXISTING issues unrelated to this change**: `@types/react@19` is installed against `react@18` (breaks every `JSX.Element` return type repo-wide, incl. untouched files), and the root `tsc` compiles the embedded `equipos-educativos/` project (missing `react-icons`). This change adds **zero** new type errors. → Follow-up: align `@types/react` to 18 (or upgrade React to 19) and add `equipos-educativos` to tsconfig `exclude`.
- [x] 5.2 Verified via compiled build output (light mode): coral `#ef8556` (46×), Barlow/Barlow Condensed, `--glass-*` tokens all present in `build/assets/css`. Recommend a visual pass with `npm run serve`.
- [x] 5.3 Dark mode block (`[data-theme='dark']`) compiled into the same stylesheet with coral/sky/plum + glass dark values. Recommend a visual pass with `npm run serve`.
- [x] 5.4 Swizzled ExpandButton/CollapseButton compiled into the JS bundle (strings "Abrir panel"/"Ocultar panel" present); `.navbar-sidebar` overlay z-index rules present in CSS. Recommend an interactive mobile check with `npm run serve`.
- [x] 5.5 `prefers-reduced-motion` guard present in compiled CSS.
