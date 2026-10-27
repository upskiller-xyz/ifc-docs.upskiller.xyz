---
title: IFC Daylight Factor — Privacy Policy
description: How BIMTech Innovations AB processes personal data in the free IFC Daylight Factor web tool.
---

# IFC Daylight Factor — Privacy Policy (GDPR)

**Product:** IFC Daylight Factor (free online tool, formerly "LUX Web")<br />
**Controller:** BIMTech Innovations AB ("Upskiller")<br />
**Version:** 1.1 · **Effective date:** 2026-11-01 · **Last updated:** 2026-10-27<br />
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
- **privacy-friendly analytics data** (aggregate usage statistics), collected through PostHog on its EU Cloud, without cookies, personal profiles or screen recording.

By using the tool you accept that we use your email and your project geometry to **improve our daylight prediction models** and for related research (see the [Terms of Use](/ifc-terms), Section 4). We do **not** sell personal data, use it for advertising, or carry out automated decision-making that produces legal or similarly significant effects on you.

## 3. What we process, why, and on what legal basis

| Data                                                                                                                                                                                                                                                                                                                                                                                                                                | Purpose                                                                                                                                                                                                  | Legal basis (GDPR Art. 6)                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Email address** you enter to use the tool                                                                                                                                                                                                                                                                                                                                                                                         | Give you access to predictions; enforce the fair-use limit of 10 requests/user/day and detect circumvention; contact you about the Service, about material changes, and about research based on the tool | Art. 6(1)(b) — processing necessary to provide the free service on its stated terms; and Art. 6(1)(f) legitimate interest in protecting infrastructure availability and communicating with users of a research-funded tool                                                                                                   |
| **Structured room/window/obstruction geometry payload** sent to our prediction API (linked to your email at the point of the request)                                                                                                                                                                                                                                                                                               | Generate the daylight prediction you requested and return it to you                                                                                                                                      | Art. 6(1)(b) — necessary to deliver the prediction you asked for                                                                                                                                                                                                                                                             |
| **De-identified geometry inputs and prediction results** retained after the request                                                                                                                                                                                                                                                                                                                                                 | Train, evaluate and improve the prediction models; academic research and publications                                                                                                                    | Art. 6(1)(f) legitimate interest in improving a daylight-research tool, **and** it is a stated condition of using this free Service (Terms §4). Email and any project/client identifiers are removed before the data enters a training/research dataset; from that point it is anonymised and outside the scope of the GDPR. |
| **IP address, timestamp, request URL, user-agent, error logs** (server logs)                                                                                                                                                                                                                                                                                                                                                        | Deliver the Service; protect against abuse, attacks and overload; diagnose faults; security                                                                                                              | Art. 6(1)(f) legitimate interest                                                                                                                                                                                                                                                                                             |
| **Analytics data** — page views, clicks and feature usage, approximate country, device/browser type, collected through PostHog (EU Cloud, Frankfurt). The client is cookieless (no cookie or local-storage identifier; a page reload starts a new anonymous session), never links events to your email or account, masks room and file names, does not record your screen, and is switched off when your browser sends Do Not Track | Understand usage to prioritise improvements                                                                                                                                                              | Art. 6(1)(f) legitimate interest; the data is anonymous and no identifier is stored on your device                                                                                                                                                                                                                           |
| **Your email address and message content** if you contact us for support                                                                                                                                                                                                                                                                                                                                                            | Respond to your enquiry                                                                                                                                                                                  | Art. 6(1)(f) legitimate interest; Art. 6(1)(b) where pre-contractual                                                                                                                                                                                                                                                         |

**Note on choice.** Because model-improvement use is a condition of this free tool, we do not rely on "consent" for it (consent must be freely given and separately withdrawable). Instead we are transparent that the tool exists to gather research data, we de-identify that data before using it for model training, and we offer paid **LUX** products for anyone who needs to keep their project data out of our datasets. You always retain the right to **object** under Art. 21 GDPR and to have your email and any still-identifiable request data erased (Section 8).

If we cannot rely on legitimate interest, or where the law requires consent (for example for non-essential cookies), we will ask for your consent and you may withdraw it at any time.

## 4. Cookies and local storage

The Service uses only strictly necessary browser `localStorage` to remember your chosen backend/API configuration and your sign-in session on your own device. This is not used for tracking. The analytics client (Section 3) sets no cookie and stores no identifier on your device, which is why no cookie banner is shown. If non-essential cookies are ever added, a cookie banner with prior opt-in consent will be shown and this section updated with a cookie list (name, purpose, duration, provider).

## 5. Who we share data with (processors and recipients)

We use the following categories of service providers, who process data on our instructions under data processing agreements:

| Recipient                        | Role                                                                                                                                                | Location                      |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Scaleway SAS                     | Cloud hosting of the prediction API, back-end microservices, storage and serving of the front-end web application (same back end as the LUX plugin) | France (EU)                   |
| Modal (serverless GPU)           | On-demand machine-learning inference for predictions                                                                                                | EU region (`region="eu"`)     |
| Okta, Inc. (Auth0)               | Sign-in to the Service: your email, name, a pseudonymous user id and login logs                                                                     | EU tenant (Ireland / Germany) |
| PostHog, Inc. (PostHog Cloud EU) | Anonymous usage analytics (Section 3)                                                                                                               | EU (Frankfurt, Germany)       |

We do not otherwise disclose personal data, except where required by law or to establish, exercise or defend legal claims.

## 6. International transfers

All hosting and storage for the Service takes place within the **European Union / EEA**: Scaleway in France, Modal on its EU region, the Auth0 tenant in Ireland/Germany, PostHog in Frankfurt. Three of these providers, Modal Labs, Inc., Okta, Inc. and PostHog, Inc., are established in the United States, and their personnel may access EU-hosted data from outside the EEA for support or incident handling. That access is a transfer under Chapter V GDPR and is covered by the European Commission's Standard Contractual Clauses (2021/914) incorporated in our data processing agreement with each provider, together with the supplementary measures described there (encryption in transit and at rest, access limited to support cases). Any new transfer would be put in place under the same conditions before it starts, and this Policy updated.

## 7. Retention

| Data                                                                                 | Retention                                                                                                                                                              |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Email address** you provide to use the tool                                        | Until you ask us to delete it, or 24 months after your last prediction request, whichever comes first                                                                  |
| **Identifiable geometry payload** (linked to your email at the point of the request) | De-identified promptly after the prediction is returned; the identifiable form is not kept beyond what is needed to return the result and short-lived operational logs |
| **De-identified geometry inputs and results**                                        | Kept indefinitely for model improvement and research; no longer personal data                                                                                          |
| **Server / API logs** (IP, timestamp, request URL, user-agent, errors)               | 90 days, then deleted or aggregated — longer only for an active security investigation or legal claim                                                                  |
| **Support correspondence**                                                           | Duration of the matter, then up to 24 months                                                                                                                           |
| **Analytics**                                                                        | Aggregate only; any raw/event data no longer than 14 months                                                                                                            |

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
