---
title: IFC Daylight Factor — Privacy Policy
description: How BIMTech Innovations AB processes personal data in the free IFC Daylight Factor web tool.
---

# IFC Daylight Factor — Privacy Policy (GDPR)

:::warning[Draft — legal review required]

This document is a draft. It is published for review and does not yet bind BIMTech Innovations AB or its users.

:::

**Product:** IFC Daylight Factor (free online tool, formerly "LUX Web")<br />
**Controller:** BIMTech Innovations AB ("Upskiller")<br />
**Version:** 0.1 · **Effective date:** 2026-09-01 · **Last updated:** 2026-09-09<br />
**Companion document:** [IFC Daylight Factor — Terms of Use](/ifc-terms)

---

## 1. Controller and contact

The data controller for personal data processed through the IFC Daylight Factor tool (the "Service") is:

**BIMTech Innovations AB**, org. nr 559518-2881<br />
Jungfrudansen 6, 171 56 Solna, Sweden<br />
Privacy contact: [alejandro.pacheco@upskiller.xyz](mailto:alejandro.pacheco@upskiller.xyz)

We have not appointed a statutory Data Protection Officer, as we are not required to. The person responsible for data protection questions is the CEO.

## 2. Summary

IFC Daylight Factor is a lightweight, free tool offered **in exchange for research data**. **IFC files you load are processed in your browser and are not uploaded** to us. The personal data we process is:

- the **email address** you provide to use the tool;
- the **structured building geometry** extracted from your model and sent for a prediction (de-identified before it is used to improve our models);
- limited technical data automatically generated when your browser contacts our servers (IP address, request logs); and
- **privacy-friendly analytics data** (aggregate usage statistics), collected through an EU-hosted analytics tool.

By using the tool you accept that we use your email and your project geometry to **improve our daylight prediction models** and for related research (see the [Terms of Use](/ifc-terms), Section 4). We do **not** sell personal data, use it for advertising, or carry out automated decision-making that produces legal or similarly significant effects on you.

## 3. What we process, why, and on what legal basis

| Data | Purpose | Legal basis (GDPR Art. 6) |
|---|---|---|
| **Email address** you enter to use the tool | Give you access to predictions; enforce the fair-use limit of 10 requests/user/day and detect circumvention; contact you about the Service, about material changes, and about research based on the tool | Art. 6(1)(b) — processing necessary to provide the free service on its stated terms; and Art. 6(1)(f) legitimate interest in protecting infrastructure availability and communicating with users of a research-funded tool |
| **Structured room/window/obstruction geometry payload** sent to our prediction API (linked to your email at the point of the request) | Generate the daylight prediction you requested and return it to you | Art. 6(1)(b) — necessary to deliver the prediction you asked for |
| **De-identified geometry inputs and prediction results** retained after the request | Train, evaluate and improve the prediction models; academic research and publications | Art. 6(1)(f) legitimate interest in improving a daylight-research tool, **and** it is a stated condition of using this free Service (Terms §4). Email and any project/client identifiers are removed before the data enters a training/research dataset; from that point it is anonymised and outside the scope of the GDPR. |
| **IP address, timestamp, request URL, user-agent, error logs** (server logs) | Deliver the Service; protect against abuse, attacks and overload; diagnose faults; security | Art. 6(1)(f) legitimate interest |
| **Analytics data** — aggregated page views, approximate country, device/browser type, collected through a privacy-friendly, EU-hosted analytics tool (no advertising or cross-site tracking) | Understand usage to prioritise improvements | Art. 6(1)(f) legitimate interest where the tool is cookieless and strictly aggregate; Art. 6(1)(a) consent where it sets non-essential cookies or similar identifiers |
| **Your email address and message content** if you contact us for support | Respond to your enquiry | Art. 6(1)(f) legitimate interest; Art. 6(1)(b) where pre-contractual |

**Note on choice.** Because model-improvement use is a condition of this free tool, we do not rely on "consent" for it (consent must be freely given and separately withdrawable). Instead we are transparent that the tool exists to gather research data, we de-identify that data before using it for model training, and we offer paid **LUX** products for anyone who needs to keep their project data out of our datasets. You always retain the right to **object** under Art. 21 GDPR and to have your email and any still-identifiable request data erased (Section 8).

If we cannot rely on legitimate interest, or where the law requires consent (for example for non-essential cookies), we will ask for your consent and you may withdraw it at any time.

## 4. Cookies and local storage

The Service uses only strictly necessary browser `localStorage` to remember your chosen backend/API configuration on your own device. This is not shared with us and is not used for tracking. If analytics or other non-essential cookies are added, a cookie banner with prior opt-in consent will be shown and this section updated with a cookie list (name, purpose, duration, provider).

## 5. Who we share data with (processors and recipients)

We use the following categories of service providers, who process data on our instructions under data processing agreements:

| Recipient | Role | Location |
|---|---|---|
| Scaleway SAS | Cloud hosting of the prediction API, back-end microservices, storage and serving of the front-end web application (same back end as the LUX plugin) | France (EU) |
| Modal (serverless GPU) | On-demand machine-learning inference for predictions | EU region (`region="eu"`) |
| Sentry | Application error and crash reporting | EU region (`de.sentry.io`) — data in Germany |
| Analytics provider (privacy-friendly, EU-hosted — to be confirmed on selection) | Aggregate usage analytics | EU |

We do not otherwise disclose personal data, except where required by law or to establish, exercise or defend legal claims.

## 6. International transfers

Our infrastructure for the Service is located in the **European Union / EEA**, and our sub-processors are contracted to keep the relevant personal data in the EU/EEA. If in future any sub-processor were to process personal data outside the EEA, we would first put in place an appropriate safeguard under Chapter V GDPR — normally the European Commission's Standard Contractual Clauses together with any necessary supplementary measures — and update this Policy.

## 7. Retention

| Data | Retention |
|---|---|
| **Email address** you provide to use the tool | Until you ask us to delete it, or 24 months after your last prediction request, whichever comes first |
| **Identifiable geometry payload** (linked to your email at the point of the request) | De-identified promptly after the prediction is returned; the identifiable form is not kept beyond what is needed to return the result and short-lived operational logs |
| **De-identified geometry inputs and results** | Kept indefinitely for model improvement and research; no longer personal data |
| **Server / API logs** (IP, timestamp, request URL, user-agent, errors) | 90 days, then deleted or aggregated — longer only for an active security investigation or legal claim |
| **Support correspondence** | Duration of the matter, then up to 24 months |
| **Analytics** | Aggregate only; any raw/event data no longer than 14 months |

## 8. Your rights

Under the GDPR you have the right to: access your personal data; rectification; erasure ("right to be forgotten"); restriction of processing; data portability (where applicable); and to **object** to processing based on legitimate interest. Where processing is based on consent, you may withdraw consent at any time without affecting prior processing.

To exercise your rights, contact [alejandro.pacheco@upskiller.xyz](mailto:alejandro.pacheco@upskiller.xyz). We may need to verify your identity. We respond within one month of receiving your request. Where a request is complex or you have made several requests, we may extend this by up to two further months and will tell you within the first month. Handling your request is free of charge unless it is manifestly unfounded or excessive.

Because the Service has no accounts and we hold very little identifiable data, we may be unable to identify data relating to you (Art. 11 GDPR); in that case we will tell you so, unless you provide additional information enabling identification.

You also have the right to lodge a complaint with a supervisory authority, in particular the Swedish Authority for Privacy Protection (**Integritetsskyddsmyndigheten, IMY**, [imy.se](https://www.imy.se/)), or the authority in your country of residence or work.

## 9. Security

We use industry-standard technical and organisational measures, including transport encryption (HTTPS/TLS), access controls, EU-based hosting, and logging. No method of transmission or storage is completely secure; we cannot guarantee absolute security.

## 10. Children

The Service is intended for professional and educational use and is not directed at children under 16.

## 11. Changes to this Policy

We may update this Policy. The current version is published at https://dfifc.upskiller.xyz/docs/ifc-privacy. Material changes will be signalled by updating the "Last updated" date and, where appropriate, a notice in the Service.

## 12. Contact

BIMTech Innovations AB — Jungfrudansen 6, 171 56 Solna, Sweden<br />
[alejandro.pacheco@upskiller.xyz](mailto:alejandro.pacheco@upskiller.xyz)
