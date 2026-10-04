# Reconstruct

A product-store coursework project by **Tan Xue Wen**, originally presented in March 2020.

This repository preserves the original ASP.NET Web Forms application and includes a refreshed, interactive browser demo for a portfolio. Original product images are retained from the supplied project archive.

## Repository structure

- `original-aspnet/` — original C#, ASPX, master pages, CSS, JavaScript and product assets.
- `docs/` — responsive HTML/CSS/JavaScript demo, ready for GitHub Pages.

## What the original project demonstrates

- Registration and login with ASP.NET Identity and a local SQL Server database.
- ASP.NET master pages and access restrictions for anonymous visitors.
- Product pages, an image slideshow and policy pages.
- Order validation: required fields, matching emails, country-specific telephone lengths, quantities and a number between 1 and 100.
- Price calculation: $78.95 per item, plus a $0, $1 or $5 shipping option.
- Contact-form validation and an on-page confirmation.

The original order and contact handlers display a confirmation. They do not process payments, fulfil orders or send email. The public demo retains that distinction.

## Public demo

The refreshed version recreates the product browsing and form interactions in the browser. It does not run the ASP.NET backend. Demo account mode stores only a display name in sessionStorage, with a memory fallback; there are no passwords or genuine user accounts. Order and contact entries are not transmitted or persisted. Sample contact values use the reserved `example.com` domain.

The demo is a coursework showcase, not a real store, and its policy pages are examples. No purchases, deliveries, messages or subscriptions occur. Product descriptions are not medical advice, and original product photographs are included as coursework reference material. The underlying third-party brand and imagery are not claimed as original artwork.

Run locally from this directory:

```sh
python -m http.server 8782 --directory docs
```

Then open http://localhost:8782.

## GitHub Pages

In Settings → Pages, select **Deploy from a branch**, then **main /docs** and Save. GitHub Pages serves the demo in `docs/`, rather than the original server application.

## Original ASP.NET application

Open `original-aspnet/PROJECT BACK.sln` as a Web Site project in Visual Studio on Windows. It targets .NET Framework 4.6.1. Restore the packages in `packages.config`, provide a supported local development runtime and configure `DefaultConnection` for your own SQL Server instance. The local account database has been deliberately excluded. Review and update the legacy dependencies before running a production service.

The original ASP.NET application has been preserved as source and has not been compiled or server-tested in this environment. The browser demo is a separate implementation, not proof of the original server's production readiness.

## Publishing exclusions

The supplied archive's Visual Studio caches, restored NuGet packages, compiled DLLs, database files and local credentials are omitted. No license is granted for third-party images or branding.
