# Custom Shortcodes

This directory contains custom WordPress shortcodes created for the ElvaKala website.

These shortcodes are used across product category and brand pages to provide reusable call-to-action, contact, and store location components without duplicating the same content and markup across multiple pages.

## Shortcodes

### `[elva_cta]`

**File:** `cta-shortcode.php`

Displays a responsive consultation and contact call-to-action inside product category descriptions.

The shortcode includes:

- Customizable CTA title
- Customizable guidance text
- Phone contact button
- WhatsApp consultation button
- Rubika consultation button
- Responsive desktop and mobile styling

The shortcode also includes its own CSS to ensure that the CTA integrates correctly with the product category description layout and does not conflict with the existing brand grid.

**Usage:**

```text
[elva_cta]
```

**Used in:**

- Product category pages
- Category descriptions
- SEO content added to product category archives

The shortcode provides a consistent consultation CTA across category pages while allowing its text and contact parameters to be customized when necessary.

---

### `[elva_location]`

**File:** `location-shortcode.php`

Displays the physical location of the ElvaKala store.

The shortcode includes:

- Embedded Google Maps location
- Google Maps navigation link
- Neshan map link
- Balad map link

**Usage:**

```text
[elva_location]
```

**Used in:**

- Brand pages
- Brand description sections

The shortcode allows the same store location component to be reused across brand pages without duplicating the Google Maps embed and navigation links in every brand description.

---

### `[elva_contact]`

**File:** `contact-shortcode.php`

Displays the main ElvaKala store contact information.

The shortcode includes:

- Store address
- Landline phone number
- Mobile phone number

**Usage:**

```text
[elva_contact]
```

**Used in:**

- Brand pages
- Brand description sections

The shortcode is used alongside `[elva_location]` in brand content to provide consistent contact information across multiple brand pages.

---

## Usage Summary

| Shortcode | Purpose | Used In |
|---|---|---|
| `[elva_cta]` | Consultation and contact CTA | Product category pages |
| `[elva_location]` | Store location and map links | Brand pages |
| `[elva_contact]` | Store contact information | Brand pages |

## Repository Structure

```text
custom-shortcodes/
├── README.md
├── cta-shortcode.php
├── location-shortcode.php
└── contact-shortcode.php
```

## Maintenance Notes

These shortcodes provide reusable functionality that is actively used across the ElvaKala website.

Before removing, disabling, or modifying any shortcode, its usage across the relevant category or brand pages should be checked first.

The `[elva_cta]` shortcode contains its own responsive CSS because its layout is specifically designed for the product category description area.

The `[elva_location]` and `[elva_contact]` shortcodes centralize repeated store information used on brand pages. This makes future updates easier because contact or location information can be changed from the shortcode implementation instead of manually editing multiple brand pages.
