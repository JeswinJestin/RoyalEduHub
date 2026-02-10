# Social Media Preview Image Guidelines

## 1. Optimal Dimensions & Formats

### **Universal Standard (Recommended)**
*   **Dimensions**: **1200 x 630 px** (1.91:1 Aspect Ratio)
*   **File Format**: PNG (best for text/logos) or JPG (best for photos)
*   **File Size**: < 1 MB (Recommended), Max 5 MB
*   **Safe Zone**: Keep critical text/logos within the center **1000 x 520 px** area.

### **Platform Specifics**

| Platform | Dimensions | Aspect Ratio | Notes |
| :--- | :--- | :--- | :--- |
| **Facebook** | 1200 x 630 px | 1.91:1 | The "Gold Standard". Used as fallback for most platforms. |
| **Twitter** | 1200 x 675 px | 16:9 | Supports 1.91:1 (1200x630) perfectly. Use "Summary Card with Large Image". |
| **LinkedIn** | 1200 x 627 px | 1.91:1 | Identical usage to Facebook. |
| **Pinterest** | 1000 x 1500 px | 2:3 | Vertical preferred. 1200x630 works but is small in feed. |
| **Instagram**| 1080 x 1080 px | 1:1 | For posts. OG images are not used for internal Instagram posts, only for external links shared in DMs. |

---

## 2. Responsive Design & Safe Zones

Different devices and contexts (e.g., WhatsApp, iMessage, Slack) may crop images differently.

*   **Center Gravity**: Always center the main subject and text.
*   **The "Safe Zone"**:
    *   Avoid placing text within **50px** of any edge.
    *   Assume the outer **10%** might be cropped on some mobile apps or square thumbnails.
    *   **Square Fallback**: Ensure the center **630x630** area still makes sense, as some platforms (like generic chat apps) generate square thumbnails.

---

## 3. Implementation Guide

### **A. Open Graph (Facebook, LinkedIn, Pinterest)**
Add these tags to the `<head>` of your HTML:

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.yoursite.com/" />
<meta property="og:title" content="Your Engaging Headline" />
<meta property="og:description" content="A brief, catchy description of your content (2-4 sentences)." />
<meta property="og:image" content="https://www.yoursite.com/Social_Preview_RoyalEduHub.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Description of image for accessibility" />
```

### **B. Twitter Cards**
Twitter requires its own specific markup but falls back to OG if missing. Explicit tags are safer.

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@YourHandle" />
<meta name="twitter:creator" content="@YourHandle" />
<meta name="twitter:title" content="Your Engaging Headline" />
<meta name="twitter:description" content="A brief, catchy description of your content." />
<meta name="twitter:image" content="https://www.yoursite.com/Social_Preview_RoyalEduHub.png" />
```

---

## 4. Testing & Validation Checklist

Before deploying, verify your preview images using these tools:

### **Validation Tools**
1.  **Facebook Sharing Debugger**: [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
    *   *Action*: "Scrape Again" to clear cache.
2.  **Twitter Card Validator**: [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)
3.  **LinkedIn Post Inspector**: [www.linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/)
4.  **Opengraph.xyz**: [opengraph.xyz](https://www.opengraph.xyz/) (Checks multiple platforms at once).

### **Manual Checklist**
- [ ] **Dimensions**: Is the image exactly 1200x630px?
- [ ] **File Size**: Is it under 1MB?
- [ ] **Legibility**: Is text readable on a mobile screen?
- [ ] **Centering**: Is critical content safe from edge cropping?
- [ ] **Protocol**: Are URLs absolute (starting with `https://`)? Relative paths often fail in OG tags.
- [ ] **Cache**: Have you cleared the platform cache (using the debuggers above)?

---

## 5. Troubleshooting Common Issues

*   **Wrong Image Showing**: Platforms cache aggressively. Use the "Scrape Again" button in debuggers.
*   **Image Cropped Awkwardly**: Ensure important content is centered and not near edges.
*   **No Image**: Check that `og:image` URL is **absolute** (e.g., `https://...` not `/img/...`).
*   **WhatsApp Issues**: WhatsApp is picky. Ensure image is < 300KB and strictly JPG/PNG. 1200x630 works, but 400x400 square is often used for small link previews.
