# Website Color Scheme Inventory

## 1. Global Theme Colors
Defined in `tailwind.config.js` and `src/styles/globals.css`.

### Primary Palette (Brand Colors)
| Color Name | Hex Value | Usage Context | Contrast Ratio (vs #0F0F0F) |
| :--- | :--- | :--- | :--- |
| **Primary 50** | `#fff7ed` | Lightest tint, backgrounds | 19.4:1 (AAA) |
| **Primary 500** | `#f97316` | Base brand orange | 6.8:1 (AA) |
| **Primary 600** | `#ea580c` | Hover states | 5.0:1 (AA) |
| **Primary 900** | `#7c2d12` | Darkest shade | 1.8:1 (Fail) |
| **Gradient Start** | `#FF4500` | Primary Gradient (Orange Red) | 4.8:1 (AA) |
| **Gradient End** | `#FF6B35` | Primary Gradient (Bittersweet) | 5.9:1 (AA) |

### Dark Palette (Backgrounds)
| Color Name | Hex Value | Usage Context |
| :--- | :--- | :--- |
| **Dark 50** | `#f8fafc` | Lightest grey |
| **Dark 950** | `#020617` | Deepest background |
| **Base Background** | `#0F0F0F` | Main body background |
| **Surface** | `#1A1A1A` | Card/Section background |

### Text Colors
| Color Name | Hex Value | Usage Context | Contrast Ratio (vs #0F0F0F) |
| :--- | :--- | :--- | :--- |
| **Body Text** | `#FFFFFF` | Main content text | 21:1 (AAA) |
| **Muted Text** | `white/70` | Secondary text | ~14.7:1 (AAA) |

---

## 2. Component-Specific Inline Colors
Colors defined directly in component files (`src/components/**/*.js`).

### Footer (`src/components/layout/Footer.js`)
| Hex Value | Usage | Location | Notes |
| :--- | :--- | :--- | :--- |
| `#FF6A00` | Gradient Start | Line 13 | Footer Heading Text |
| `#B02000` | Gradient End | Line 13 | Footer Heading Text |

### Testimonials (`src/components/sections/Testimonials.js`)
Used for reviewer profile avatars/accents.
| Hex Value | Color Name | Contrast (vs #0F0F0F) | Accessibility Status |
| :--- | :--- | :--- | :--- |
| `#4F46E5` | Indigo | 3.8:1 | ⚠️ Fail (Text) / Pass (UI) |
| `#059669` | Emerald | 5.2:1 | ✅ AA |
| `#DC2626` | Red | 3.4:1 | ⚠️ Fail (Text) / Pass (UI) |
| `#7C3AED` | Violet | 4.3:1 | ⚠️ Fail (Small Text) |
| `#EA580C` | Orange | 5.0:1 | ✅ AA |
| `#0891B2` | Cyan | 5.9:1 | ✅ AA |
| `#16A34A` | Green | 5.7:1 | ✅ AA |
| `#BE185D` | Pink | 3.6:1 | ⚠️ Fail (Text) / Pass (UI) |

### About Section (`src/components/sections/About.js`)
| Value | Usage | Notes |
| :--- | :--- | :--- |
| `white/10` | Card Background | `bg-gradient-to-br from-white/10 to-white/5` |
| `white/5` | Card Background | `to-white/5` |
| `white/20` | Border | `border-white/20` |
| `orange-500/50` | Border Hover | `hover:border-orange-500/50` |

---

## 3. Accessibility Analysis (WCAG 2.1)

### Summary
*   **High Compliance**: The core text (`#FFFFFF`) against the dark background (`#0F0F0F`) offers excellent contrast (21:1), far exceeding AAA requirements.
*   **Brand Colors**: The primary orange gradients (`#FF4500` - `#FF6B35`) generally pass AA standards for large text and UI components against the dark background.
*   **Areas for Improvement**:
    *   Some **Testimonial Profile Colors** (Red, Indigo, Pink) fall below the 4.5:1 ratio required for normal text. If these are used for text, consider lightening them. If used for graphical objects (avatars), the 3:1 requirement is met.
    *   **Darkest Primary Shades** (e.g., `#7c2d12`) should not be used for text on dark backgrounds due to low contrast.

### Recommendations
1.  **Standardize Gradients**: Consolidate the footer gradient (`#FF6A00` -> `#B02000`) with the global primary gradient (`#FF4500` -> `#FF6B35`) to reduce inconsistency.
2.  **Testimonial Accents**: If the profile colors are used for text names, map them to a lighter palette (e.g., Tailwind 400/300 shades) to ensure readability on dark backgrounds.
3.  **Variable Usage**: Move inline hex codes from `Testimonials.js` and `Footer.js` into `tailwind.config.js` to maintain a single source of truth.
