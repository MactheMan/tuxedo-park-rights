# Tuxedo Park Rights

Static public-information site for `tuxedoparkrights.org`, concerning Chapter 51, private-property rights, municipal procedure, and the supporting public record.

The deployable site is contained in `dist/`.

## Legacy 301 redirects

Permanent redirects are configured in `vercel.json`. That file is the source of
truth for production routing and must remain synchronized with this
documentation.

The former Taxes and Infrastructure page, including its common misspelling,
permanently redirects to the consolidated September 2026 meeting page:

| Legacy URL | Canonical destination | Status |
| --- | --- | --- |
| `/taxesandinfrastructure` | `/meetings/september-2026` | 301 |
| `/taxesandinfrastructure/` | `/meetings/september-2026` | 301 |
| `/taxesandinfrastructure/index` | `/meetings/september-2026` | 301 |
| `/taxesandinfrastructure/index.html` | `/meetings/september-2026` | 301 |
| `/taxesandinfrastrucure` | `/meetings/september-2026` | 301 |
| `/taxesandinfrastrucure/` | `/meetings/september-2026` | 301 |
| `/taxesandinfrastrucure/index` | `/meetings/september-2026` | 301 |
| `/taxesandinfrastrucure/index.html` | `/meetings/september-2026` | 301 |

The canonical destination is:

`https://tuxedoparkrights.org/meetings/september-2026`

These must remain direct 301 redirects. Do not replace them with a client-side
redirect, meta refresh, or a redirect chain.
