# Project Memory

## Core
- **Django Future-proofing**: Architecture must support future Django migration (CSRF, templates/static structure). Do NOT redesign from scratch.
- **Aesthetic**: Dark Mode tuned to Qiyaf logo — deep navy background `hsl(210 45% 8%)`, teal primary `hsl(188 75% 42%)`, amber accent `hsl(32 95% 58%)`.
- **Branding**: Qiyaf logo (transparent PNG at `src/assets/qiyaf-logo-dark.png`) used in Hero (top-center, no background) and Dashboard sidebar.
- **Localization**: Bilingual (English & Arabic) with RTL support via LanguageProvider.
- **Backend**: Supabase Auth/DB, Edge Functions, and Resend API for real emails.
- **Constraints**: No help icon in dashboard header. "Electrical Damage" & "Crack" defects removed from monitoring.

## Memories
- [Color Palette](mem://style/color-palette) — Primary brand colors and aesthetic details
- [Branding Elements](mem://style/branding-elements) — Visual identity and header design for auth pages
- [Intro Page](mem://features/intro-page) — Landing page design, copy, and layout
- [Localization Rules](mem://features/localization) — Bilingual and RTL setup details
- [Dashboard Layout](mem://features/dashboard-layout) — Sidebar tabs, header structure, and UI constraints
- [Dashboard Analytics & Upload](mem://features/analytics-and-upload-functionality) — Analytics year (2026) and drag-and-drop mechanics
- [Solar Panel Monitoring](mem://features/solar-panel-monitoring) — Live Feed defect types, bounding boxes, and data layout
- [Settings & Account](mem://features/settings-account-management) — Profile updates and granular notification configuration
- [Backend Integration](mem://infra/cloud-integration) — Supabase usage and email provider setup
- [Auth Flow](mem://features/auth-flow) — Auth rules, OAuth providers, and session management
- [Django Preparation](mem://constraints/django-preparation) — Strict constraints and rules for Django migration compatibility
