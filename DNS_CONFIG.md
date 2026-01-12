# DNS Configuration Guide: DMARC & SPF

This document provides the specific DNS TXT records required to enhance email security and deliverability for the domain (e.g., `royaleduhub.com`). These changes implement DMARC (Domain-based Message Authentication, Reporting, and Conformance) and SPF (Sender Policy Framework) protocols.

## 1. SPF Record (Sender Policy Framework)

The SPF record specifies which mail servers are authorized to send email on behalf of your domain.

**Record Type:** `TXT`
**Host/Name:** `@` (or blank)
**Value:**
```text
v=spf1 include:_spf.google.com ~all
```

### Breakdown:
*   `v=spf1`: Identifies the record as SPF version 1.
*   `include:_spf.google.com`: Authorizes Google's mail servers (Gmail, Google Workspace, Google Apps Script) to send email for your domain. This is critical since your contact form relies on Google services.
*   `~all`: "Soft fail". Specifies that any other senders should be accepted but marked as potentially suspicious. This is recommended for gradual enforcement and prevents legitimate emails from being rejected during the transition.
    *   *Note:* Once you confirm all legitimate mail flows are covered, you can switch to `-all` (hard fail) for stricter security.

### Compliance Checks:
*   **Authorized Senders:** Includes Google (primary service). If you use other services like Mailchimp or SendGrid, append their include mechanisms (e.g., `include:servers.mcsv.net`).
*   **Lookup Limit:** This record uses 1 lookup (Google), well within the 10-lookup limit.
*   **Fail Handling:** Uses `~all` for safe, gradual rollout.

---

## 2. DMARC Record

The DMARC record tells receiving mail servers what to do if an email fails SPF or DKIM checks.

**Record Type:** `TXT`
**Host/Name:** `_dmarc`
**Value:**
```text
v=DMARC1; p=none; pct=100; rua=mailto:royaleduhub24@gmail.com; ruf=mailto:royaleduhub24@gmail.com; sp=none; aspf=r;
```

### Breakdown:
*   `v=DMARC1`: Identifies the record as DMARC version 1.
*   `p=none`: **Policy.** "None" means monitoring mode. No action is taken against failing emails, but reports are generated. This allows you to gather data without risking email loss.
*   `pct=100`: **Percentage.** Applies the policy to 100% of emails.
*   `rua=mailto:royaleduhub24@gmail.com`: **Aggregate Reports.** Sends daily summary reports to your admin email.
*   `ruf=mailto:royaleduhub24@gmail.com`: **Forensic Reports.** Sends detailed failure reports to your admin email.
*   `sp=none`: **Subdomain Policy.** Explicitly sets the policy for subdomains to "none" (matching the main policy) to ensure consistent handling.
*   `aspf=r`: **SPF Alignment.** "Relaxed" mode. Allows the "From" header domain to match the organizational domain of the "Return-Path" (e.g., `news.royaleduhub.com` matches `royaleduhub.com`).

---

## 3. Validation & Testing Steps

After adding these records to your DNS provider (e.g., GoDaddy, Namecheap, Cloudflare), verify them using the following tools:

### A. Syntax & Propagation Check
1.  **MXToolbox:**
    *   Go to [mxtoolbox.com](https://mxtoolbox.com/)
    *   Search for `spf:royaleduhub.com` and `dmarc:royaleduhub.com`.
    *   Verify the status is "Green" and records match the values above.

### B. DMARC Analyzer
1.  **DMARC Analyzer (e.g., Postmark / Valimail):**
    *   Use a free DMARC monitoring tool to visualize the XML reports sent to the `rua` address.
    *   Check if legitimate emails (from Google/Gmail) are passing SPF/DKIM.

### C. Email Header Analysis
1.  **Send a Test Email:**
    *   Send an email from your domain (e.g., via the contact form or Gmail alias) to a generic Gmail account (`user@gmail.com`).
    *   Open the email in Gmail Web > Click "Three Dots" > "Show Original".
    *   Look for `PASS` next to **SPF** and **DMARC**.

## 4. Provider-Specific Instructions: Namecheap

Since you are using Namecheap, follow these exact steps to add the records:

1.  **Log In:**
    *   Go to [namecheap.com](https://www.namecheap.com/) and log in.
    *   Click on **"Domain List"** in the left sidebar.

2.  **Manage Domain:**
    *   Find `royaleduhub.com` in the list.
    *   Click the **"Manage"** button on the far right.

3.  **Advanced DNS:**
    *   Click the **"Advanced DNS"** tab at the top of the page.
    *   Scroll down to the **"Host Records"** section.

4.  **Add SPF Record:**
    *   Click the red **"Add New Record"** button.
    *   **Type:** Select `TXT Record`.
    *   **Host:** Enter `@`
    *   **Value:** Paste: `v=spf1 include:_spf.google.com ~all`
    *   **TTL:** Leave as `Automatic`.
    *   Click the green **Checkmark** (Save Changes) icon.

5.  **Add DMARC Record:**
    *   Click **"Add New Record"** again.
    *   **Type:** Select `TXT Record`.
    *   **Host:** Enter `_dmarc`
    *   **Value:** Paste: `v=DMARC1; p=none; pct=100; rua=mailto:royaleduhub24@gmail.com; ruf=mailto:royaleduhub24@gmail.com; sp=none; aspf=r;`
    *   **TTL:** Leave as `Automatic`.
    *   Click the green **Checkmark** icon.

6.  **Verify:**
    *   Wait about 30 minutes.
    *   Use [MXToolbox](https://mxtoolbox.com/) to verify propagation.

## 5. Troubleshooting: Unable to Add Records?

**Problem:** You try to add records in Namecheap, but the button is missing, or you get redirected.

**Cause:** This happens if you are using **Custom Nameservers**.
*   If you connected your domain to **Vercel**, **Cloudflare**, or another host by changing your Nameservers (e.g., to `ns1.vercel-dns.com`), **Namecheap stops managing your DNS.**
*   You must add these records **in your hosting provider's dashboard**, not Namecheap.

### Solution: Check Your Nameservers
1.  In Namecheap, go to the **"Domain"** tab (next to "Advanced DNS").
2.  Look at the **"Nameservers"** section.
3.  **If it says "Namecheap BasicDNS":** You *should* be able to edit records in Advanced DNS.
4.  **If it says "Custom DNS":** You **MUST** add the records at the provider listed there (e.g., Vercel).

---

## 6. Option B: Vercel DNS (If using Custom Nameservers)

If your domain is pointing to Vercel (using Vercel Nameservers), follow these steps in the **DNS Records** section (as shown in your screenshot):

1.  **Log In:** Go to [vercel.com](https://vercel.com) and log in.
2.  **Select Project:** Click on your project (`royal-edu-hub`).
3.  **Settings:** Go to **Settings** > **Domains**.
4.  **Edit DNS:** Click on your domain to view records.

### Adding the SPF Record
*   **Name:** Enter `@` (This represents the root domain `royaleduhub.com`).
*   **Type:** Select `TXT` from the dropdown.
*   **Value:** Paste this exactly:
    ```text
    v=spf1 include:_spf.google.com ~all
    ```
*   **TTL:** Leave as `60` (default).
*   **Action:** Click **Add**.

### Adding the DMARC Record
*   **Name:** Enter `_dmarc` (Do **not** add the domain name, Vercel appends it automatically).
*   **Type:** Select `TXT` from the dropdown.
*   **Value:** Paste this exactly:
    ```text
    v=DMARC1; p=none; pct=100; rua=mailto:royaleduhub24@gmail.com; ruf=mailto:royaleduhub24@gmail.com; sp=none; aspf=r;
    ```
*   **TTL:** Leave as `60` (default).
*   **Action:** Click **Add**.

> **Note on the "Invalid request" error:** If you see an error saying `'value' should match format "ipv4"`, it means the "Type" was momentarily set to **A** instead of **TXT**. Ensure **TXT** is selected *before* pasting the value.

## 7. Gradual Enforcement Plan

1.  **Phase 1 (Current):** `p=none`, `~all`. Monitor reports for 2-4 weeks. Identify unauthorized senders.
2.  **Phase 2 (Quarantine):** Change DMARC to `p=quarantine`. Suspicious emails go to spam.
3.  **Phase 3 (Reject):** Change DMARC to `p=reject` and SPF to `-all`. Unauthorized emails are blocked completely.
