<?php

/**
 * Elvakala – Move Term Description Below Products
 *
 * Moves the current WooCommerce category or product taxonomy description
 * below the product listing.
 *
 * Also restores the term description on paginated archive pages where
 * the theme does not render it by default.
 *
 * Includes:
 * - Product category and product taxonomy archive support
 * - Reuse of the existing term description when available
 * - Dynamic generation of the description on paginated archive pages
 * - Placement after pagination when pagination exists
 * - Placement after the product grid when pagination is not present
 * - Protection against moving the description more than once
 */
/**
 * ELVA - انتقال توضیحات دسته و برند به پایین محصولات
 * نمایش توضیحات در تمام صفحات صفحه‌بندی
 */

add_action( 'wp_footer', function () {

	// فقط آرشیوهای محصولات / Product archives only
  
	if (
		is_admin() ||
		( ! is_product_category() && ! is_product_taxonomy() )
	) {
		return;
	}

	$term = get_queried_object();

	if (
		! $term ||
		empty( $term->term_id ) ||
		empty( $term->taxonomy )
	) {
		return;
	}

	// توضیحات همان دسته / برند فعلی
  // Description of the current category or product taxonomy term
  
	$term_description = term_description(
		$term->term_id,
		$term->taxonomy
	);

	if ( empty( trim( wp_strip_all_tags( $term_description ) ) ) ) {
		return;
	}
	?>

	<script id="elva-move-term-description">
	document.addEventListener('DOMContentLoaded', function () {

		const contentWrap = document.querySelector('.content-wrap');

		if (!contentWrap) {
			return;
		}

		/*
		 * اگر قالب توضیحات را در همین صفحه ساخته باشد،
		 * همان را پیدا می‌کنیم.
		 */

     /*
    * If the theme has already rendered the term description
   * on the current page, reuse the existing element.
   */  

    
		let description = contentWrap.querySelector(
			':scope > .term-description-wrap'
		);

		/*
		 * در صفحات 2 به بعد ممکن است قالب
		 * توضیحات را اصلاً تولید نکرده باشد.
		 */
    /*
 * On page 2 and later, the theme may not render
 * the term description at all.
 */
    
		if (!description) {

			const descriptionHTML =
				<?php echo wp_json_encode( $term_description ); ?>;

			if (!descriptionHTML.trim()) {
				return;
			}

			description = document.createElement('div');

			description.className =
				'term-description-wrap elva-generated-description';

			const descriptionInner =
				document.createElement('div');

			descriptionInner.className =
				'term-description';

			descriptionInner.innerHTML =
				descriptionHTML;

			description.appendChild(
				descriptionInner
			);
		}

		if (description.dataset.elvaMoved === '1') {
			return;
		}

		/*
		 * اگر صفحه‌بندی وجود داشت:
		 * توضیحات بعد از صفحه‌بندی
		 *
		 * اگر نبود:
		 * بعد از محصولات
		 */

    /*
 * If pagination exists:
 * place the description after pagination.
 *
 * Otherwise:
 * place it after the product grid.
 */
   
		const pagination = contentWrap.querySelector(
			'.woocommerce-pagination'
		);

		const products = contentWrap.querySelector(
			'ul.products'
		);

		const target =
			pagination || products;

		if (!target) {
			return;
		}

		target.insertAdjacentElement(
			'afterend',
			description
		);

		description.dataset.elvaMoved = '1';

		description.classList.add(
			'elva-description-moved'
		);

	});
	</script>

	<?php
}, 100 );
