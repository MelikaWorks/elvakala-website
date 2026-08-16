/**
 * ELVA KALA — CTA Shortcode
 *
 * استفاده:
 * [elva_cta]
 */


/* ==================================================
 * CSS CTA
 * مستقل از اجرای shortcode
 * تا در تمام صفحات pagination نیز لود شود
 * ================================================== */

add_action( 'wp_head', function () {

	if (
		is_admin() ||
		( ! is_product_category() && ! is_product_taxonomy() )
	) {
		return;
	}
	?>

	<style id="elva-category-cta-style">

	/* ==================================================
	   ELVA KALA — CTA داخل توضیحات دسته‌بندی
	   جلوگیری از تداخل با گرید برندها
	================================================== */

	.term-description-wrap .term-description > .elva-category-cta {
		grid-column: 1 / -1 !important;
		width: 100% !important;
		max-width: 100% !important;
		margin: 10px 0 0 !important;
		box-sizing: border-box;
	}

	/* خود باکس CTA */
	.term-description-wrap .elva-category-cta {
		display: flex !important;
		align-items: center;
		justify-content: space-between;
		gap: 22px;
		width: 100% !important;
		max-width: 100% !important;
		padding: 22px 24px;
		box-sizing: border-box;
		direction: rtl;
		background: #f7f9fb;
		border: 1px solid #dce6ec;
		border-right: 5px solid #034A73;
		border-radius: 13px;
	}

	/* بخش متن */
	.term-description-wrap .elva-category-cta__content {
		flex: 1 1 auto;
		min-width: 0;
	}

	/* عنوان CTA */
	.term-description-wrap .elva-category-cta__title {
		margin: 0 0 7px !important;
		padding: 0 !important;
		color: #034A73;
		font-size: 19px;
		font-weight: 800;
		line-height: 1.7;
	}

	/* جلوگیری از گرفتن خط تزئینی عنوان‌های برند */
	.term-description-wrap .elva-category-cta__title::before,
	.term-description-wrap .elva-category-cta__title::after {
		display: none !important;
		content: none !important;
	}

	/* متن CTA */
	.term-description-wrap .elva-category-cta__text {
		margin: 0 !important;
		color: #475569;
		font-size: 14px;
		line-height: 1.9;
		text-align: right;
	}

	/* دکمه‌ها */
	.term-description-wrap .elva-category-cta__actions {
		display: flex;
		flex: 0 0 auto;
		flex-wrap: wrap;
		justify-content: flex-end;
		align-items: center;
		gap: 9px;
	}

	.term-description-wrap .elva-category-cta__button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 42px;
		padding: 9px 17px;
		border: 1px solid #034A73;
		border-radius: 8px;
		font-family: inherit;
		font-size: 13px;
		font-weight: 700;
		line-height: 1.5;
		text-decoration: none !important;
		white-space: nowrap;
	}

	.term-description-wrap .elva-category-cta__button--call {
		background: #034A73;
		color: #fff !important;
	}

	.term-description-wrap .elva-category-cta__button--whatsapp {
		background: #fff;
		color: #034A73 !important;
	}

	.term-description-wrap .elva-category-cta__button:hover {
		background: #023A5A;
		border-color: #023A5A;
		color: #fff !important;
	}

	.term-description-wrap .elva-category-cta__button--rubika {
		background: #fff;
		color: #034A73 !important;
	}


	/* موبایل */
	@media (max-width: 767px) {

		.term-description-wrap .elva-category-cta {
			flex-direction: column;
			align-items: stretch;
			gap: 16px;
			padding: 19px 16px;
			border-right-width: 4px;
		}

		.term-description-wrap .elva-category-cta__title {
			font-size: 17px;
		}

		.term-description-wrap .elva-category-cta__text {
			font-size: 13.5px;
			line-height: 1.85;
		}

		.term-description-wrap .elva-category-cta__actions {
			display: grid;
			grid-template-columns: 1fr 1fr;
			width: 100%;
		}

		.term-description-wrap .elva-category-cta__button {
			width: 100%;
			padding-right: 10px;
			padding-left: 10px;
		}
	}


	@media (max-width: 420px) {

		.term-description-wrap .elva-category-cta__actions {
			grid-template-columns: 1fr;
		}

	}

	</style>

	<?php
}, 100 );


/* ==================================================
 * Shortcode
 * ================================================== */

add_shortcode( 'elva_cta', function ( $atts ) {

	$default_phone    = '02833790105';
	$default_whatsapp = '989900412006';
	$default_rubika   = '09900412006';

	$atts = shortcode_atts(
		array(
			'title'          => 'برای انتخاب محصول مناسب نیاز به راهنمایی دارید؟',
			'text'           => 'کارشناسان الوا کالا آماده‌اند تا برای انتخاب تجهیزات متناسب با نیاز، بودجه و فضای شما راهنمایی‌تان کنند.',
			'phone'          => $default_phone,
			'whatsapp'       => $default_whatsapp,
			'call_text'      => 'تماس با کارشناسان',
			'whatsapp_text'  => 'مشاوره در واتساپ',
			'rubika'         => $default_rubika,
			'rubika_text'    => 'مشاوره در روبیکا',
		),
		$atts,
		'elva_cta'
	);

	$phone_display = preg_replace(
		'/[^0-9۰-۹+]/u',
		'',
		$atts['phone']
	);

	$phone_link = preg_replace(
		'/[^0-9+]/',
		'',
		$atts['phone']
	);

	$whatsapp_number = preg_replace(
		'/[^0-9]/',
		'',
		$atts['whatsapp']
	);

	$rubika_number = preg_replace(
		'/[^0-9]/',
		'',
		$atts['rubika']
	);

	ob_start();
	?>

	<div class="elva-category-cta">

		<div class="elva-category-cta__content">

			<h3 class="elva-category-cta__title">
				<?php echo esc_html( $atts['title'] ); ?>
			</h3>

			<p class="elva-category-cta__text">
				<?php echo esc_html( $atts['text'] ); ?>
			</p>

		</div>

		<div class="elva-category-cta__actions">

			<a
				class="elva-category-cta__button elva-category-cta__button--call"
				href="<?php echo esc_url( 'tel:' . $phone_link ); ?>"
				aria-label="<?php echo esc_attr( 'تماس با شماره ' . $phone_display ); ?>"
			>
				<?php echo esc_html( $atts['call_text'] ); ?>
			</a>

			<a
				class="elva-category-cta__button elva-category-cta__button--whatsapp"
				href="<?php echo esc_url( 'https://wa.me/' . $whatsapp_number ); ?>"
				target="_blank"
				rel="noopener noreferrer"
			>
				<?php echo esc_html( $atts['whatsapp_text'] ); ?>
			</a>

			<a
				class="elva-category-cta__button elva-category-cta__button--rubika"
				href="<?php echo esc_url( 'https://rubika.ir/' . $rubika_number ); ?>"
				target="_blank"
				rel="noopener noreferrer"
			>
				<?php echo esc_html( $atts['rubika_text'] ); ?>
			</a>

		</div>

	</div>

	<?php

	return ob_get_clean();

} );
