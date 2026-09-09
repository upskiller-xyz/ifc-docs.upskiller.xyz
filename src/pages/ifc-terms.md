---
title: IFC Daylight Factor — Terms of Use
description: Terms of Use for the free IFC Daylight Factor web tool provided by BIMTech Innovations AB.
---

# IFC Daylight Factor — Terms of Use

:::warning[Draft — legal review required]

This document is a draft. It is published for review and does not yet bind BIMTech Innovations AB or its users.

:::

**Product:** IFC Daylight Factor (free online tool, formerly "LUX Web")<br />
**Provider:** BIMTech Innovations AB ("Upskiller")<br />
**Version:** 0.1 · **Effective date:** 2026-09-01 · **Last updated:** 2026-09-09<br />
**Companion document:** [IFC Daylight Factor — Privacy Policy](/ifc-privacy)

---

## 1. Who we are

The IFC Daylight Factor tool (the "Service") is provided by **BIMTech Innovations AB**, org. nr 559518-2881, a Swedish limited company with its registered office at Jungfrudansen 6, 171 56 Solna, Sweden ("Upskiller", "we", "us").

Contact: [alejandro.pacheco@upskiller.xyz](mailto:alejandro.pacheco@upskiller.xyz)

The Service is available at https://dfifc.upskiller.xyz (or such other address as we may designate).

## 2. What the Service is

IFC Daylight Factor is a **free, browser-based tool** that lets you:

- load an IFC model in your browser,
- select rooms (IfcSpace),
- request an **approximate, machine-learning-based prediction** of daylight metrics (Daylight Factor and related metrics) for those rooms, and
- view the predicted results as an overlay on the model geometry.

The Service was developed with funding from Belysningsstiftelsen (the Swedish Lighting Foundation) and is made available openly for educational and design-exploration purposes.

## 3. Acceptance of these Terms

By accessing or using the Service you agree to these Terms of Use. If you do not agree, do not use the Service. If you use the Service on behalf of an organisation, you confirm that you are authorised to accept these Terms on its behalf.

## 4. Free of charge — provided in exchange for research data

**4.1** The Service is provided **free of charge**. In return, it is a condition of use that you allow Upskiller to use your email address and the project data you submit to **improve its daylight prediction models** and for related research, as described in 4.2 and in the [Privacy Policy](/ifc-privacy). This is the basis on which the open tool is made available; if you are not willing to allow this use, please do not use the Service and instead contact us about the commercial **LUX** products, which are intended for confidential project work.

**4.2** Specifically, by using the Service you agree that Upskiller may:

- collect the **email address** you provide in order to give you access to predictions and to contact you about the Service and about research based on it; and
- retain and use the **structured geometric data** extracted from your model and the corresponding predicted/simulated results, in order to train, evaluate and improve its machine-learning models and for academic research and publications.

**4.3** Geometric data used for model improvement and research is **stripped of your email address and of any project or client identifiers** before it is added to a training or research dataset. Nothing that identifies you, your project or your client is published.

**4.4 Fair-use limit.** The Service is subject to a fair-use limit of **10 prediction requests per user per calendar day** (identified by the email address you provide), to protect the availability and stability of the shared infrastructure. We may change this limit, apply it per email address, IP address or device, or introduce other usage limits or optional paid features, at any time and without notice. Attempting to circumvent the limit (for example by using multiple email addresses or automated requests) is a breach of Section 7.

**4.5 Future paid features.** Any optional paid features introduced later will be governed by separate terms presented to you before purchase. These Terms otherwise continue to apply to the free Service.

**4.6 Your email address.** Provide a valid email address that you are entitled to use. Do not use another person's email address, or a disposable or shared address, to obtain access or to exceed the fair-use limit. You are responsible for prediction requests made using your email address.

## 5. Your content and how it is processed

**5.1 IFC files stay in your browser.** IFC files that you load are parsed locally in your browser. The full IFC file is **not uploaded** to our servers.

**5.2 What is sent to our servers.** To generate a prediction, the Service extracts a limited, structured geometric description of the selected room(s) and their surroundings — for example room outline, window size and position, and the angles of nearby obstructions — and sends that structured payload, together with your email address, to our prediction API hosted in the European Union. This payload contains building geometry only. It is not intended to, and should not, contain personal data other than your email address.

**5.3 Licence to process.** You grant Upskiller a worldwide, royalty-free, perpetual and irrevocable licence to use the geometric payload described in 5.2 — and derived, de-identified data — to operate and secure the Service and to develop, train, evaluate and improve Upskiller's prediction models and datasets, and for academic research and publications. This licence to the **de-identified geometric data survives** deletion of your account/email and termination of these Terms. Your email address is processed as described in the Privacy Policy and is not part of the research datasets.

**5.4 Your responsibilities.** You are responsible for ensuring that you have the right to upload and process any model you use with the Service, and to allow the model-improvement use described in Section 4. Remove or anonymise any personal data in the model before use. **Do not use this free Service for confidential, secret or security-sensitive projects** — use the commercial LUX products, which are intended for confidential and sensitive project work. Do not upload models containing personal data, third-party confidential information, or classified/security-sensitive facilities.

## 6. Predictions are approximate — not a compliance verification

**6.1** The Service returns **approximate predictions** produced by a statistical model. They are intended to support early design exploration and learning.

**6.2** The predictions are **not** a validated daylight simulation and are **not suitable** for demonstrating compliance with building regulations (e.g. BBR, TEK), for building-permit applications, or for certification schemes (e.g. Miljöbyggnad, BREEAM, LEED, Svanen). For those purposes a validated simulation method (e.g. Radiance) must be used — for example through Upskiller's separate **LUX Certify** service.

**6.3** You are solely responsible for any decision taken on the basis of output from the Service.

## 7. Acceptable use

You agree not to:

- use the Service in violation of any applicable law;
- upload malicious code or attempt to disrupt, overload, probe or gain unauthorised access to the Service or its infrastructure;
- circumvent or place automated/bulk load on the API beyond ordinary interactive use, or resell or redistribute access to the API;
- reverse engineer, extract or attempt to reconstruct the underlying models, weights or datasets;
- remove or obscure any proprietary notices.

We may rate-limit, suspend or block access that in our reasonable assessment threatens the availability, security or integrity of the Service.

## 8. Intellectual property

The Service, its software, user interface, documentation, and the underlying machine-learning models and datasets are owned by Upskiller and/or its licensors and are protected by intellectual property law. These Terms grant you a limited, non-exclusive, non-transferable, revocable right to use the Service in its intended manner. No other rights are granted. You retain all rights in your own IFC models. Predicted results returned to you may be used freely for your own design and educational purposes, subject to Section 6.

## 9. Availability and changes

The Service is provided "as is" and "as available", and depends on third-party hosting and infrastructure. We may modify, suspend or discontinue the Service, in whole or in part, at any time and without liability, including because grant funding for the open tool ends. We will make reasonable efforts to give notice of a permanent discontinuation.

## 10. Disclaimer of warranties

To the maximum extent permitted by law, the Service is provided without warranties of any kind, whether express or implied, including as to accuracy, fitness for a particular purpose, availability, or non-infringement. We do not warrant that predictions are accurate or that the Service will be uninterrupted or error-free.

## 11. Limitation of liability

To the maximum extent permitted by law, Upskiller shall not be liable for any indirect, incidental, special or consequential damages, loss of profit, loss of data, or costs of substitute services arising out of or in connection with the Service. Nothing in these Terms excludes or limits liability that cannot be excluded or limited under mandatory law (including liability for intent or gross negligence, or for death or personal injury caused by negligence). Because the Service is provided free of charge, Upskiller's total aggregate liability arising out of or in connection with the Service is limited to the lower of (a) the amount you have paid for the Service or (b) SEK 1,000. Where you are a consumer, your mandatory statutory rights are not affected.

## 12. Privacy

Our processing of personal data in connection with the Service (for example server logs and any analytics) is described in the [IFC Daylight Factor — Privacy Policy](/ifc-privacy).

## 13. Changes to these Terms

We may update these Terms from time to time. The current version is always published at https://dfifc.upskiller.xyz/docs/ifc-terms. Material changes will be indicated by updating the "Last updated" date and, where appropriate, by a notice in the Service. Your continued use after changes take effect constitutes acceptance.

## 14. Governing law and disputes

These Terms are governed by the laws of Sweden, without regard to conflict-of-law rules. Disputes shall be settled by the Swedish courts, with Stockholm District Court (Stockholms tingsrätt) as court of first instance. If you are a consumer resident in the EU, you may also rely on the mandatory consumer-protection rules of your country of residence and bring proceedings there, and you may use the EU Online Dispute Resolution platform.

## 15. Contact

BIMTech Innovations AB — Jungfrudansen 6, 171 56 Solna, Sweden<br />
[alejandro.pacheco@upskiller.xyz](mailto:alejandro.pacheco@upskiller.xyz)
