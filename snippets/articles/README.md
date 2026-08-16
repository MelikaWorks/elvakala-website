# ELVA KALA — Blog Customizations

Custom CSS used for the ELVA KALA blog archive and individual article pages.

These styles replace the original theme layout with a cleaner, wider and more consistent article design while keeping the existing WordPress, Elementor and theme structure.

## Files

### `blog-archive.css`

Custom styling for the main blog archive and article listing pages.

It changes the default archive layout by removing the unused sidebar and allowing the article list to use the full available width.

The file also redesigns the article cards, including:

- Full-width blog archive layout
- Removal of the empty archive sidebar
- Article card borders, spacing and hover effects
- Article title and header styling
- Featured image sizing and cropping
- Article excerpt typography
- Comment count styling
- Author/date metadata styling
- Custom Read More button
- Pagination styling
- Responsive mobile adjustments

The goal of this file is to make the article archive visually consistent with the rest of the ELVA KALA storefront and improve readability on both desktop and mobile devices.

### `single-post.css`

Custom layout and styling for individual WordPress article pages.

The original single-post structure was redesigned into a two-column desktop layout:

- Product category navigation in a left sidebar
- Main article content in the larger right column

The product category sidebar remains sticky while the user reads the article.

The file also handles:

- Desktop article grid layout
- Sticky product-category sidebar
- Article title and featured image card
- Main article content container
- Paragraph typography and spacing
- H2, H3 and H4 article headings
- Images and captions inside article content
- Lists and links
- Product category navigation menu
- Sidebar submenu alignment
- Tablet layout
- Mobile layout

On tablet and mobile devices, the desktop grid is disabled and the article returns to a single-column responsive layout.

## Screenshots

### Blog Archive

#### Before

<img src="blog-archive-before(2).png" width="300">

#### After

<img src="blog-archive-after(2).png" width="300">

### Single Post

#### Before

<img src="single-post-before(2).png" width="300">

#### After

<img src="single-post-after(1).png" width="300">

## Scope

These files only modify the presentation of the blog archive and single article pages.

They do not replace WordPress post functionality, article content, WooCommerce functionality or Elementor templates.

Some selectors depend on the current ELVA KALA theme and Elementor element structure, so they should be reviewed if the theme or related Elementor templates are significantly changed.
