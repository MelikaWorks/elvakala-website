<?php

/**
 * Elvakala – Homepage Brands Toggle
 *
 * Adds an expandable/collapsible brands section to the Elvakala homepage.
 *
 * Includes:
 * - Displays only the first three brand items per column by default
 * - Shows all brands when expanded
 * - Dynamically creates the "Show All Brands" button
 * - Toggles between "Show All Brands" and "Show Less"
 * - Smoothly scrolls back to the brands section when collapsed
 * - Includes opening animation for hidden brand rows
 * - Includes responsive mobile button styling
 * - Avoids duplicate button creation
 * - Includes delayed initialization support for Elementor-rendered content
 */
/**
 * نمایش بیشتر برندهای صفحه اصلی الوا کالا
 * شامل CSS + ساخت دکمه + JavaScript
 */

add_action( 'wp_footer', function () {

	if ( class_exists( '\Elementor\Plugin' ) &&
	     \Elementor\Plugin::$instance->editor->is_edit_mode() ) {
		return;
	}

	?>
	
	<style id="elva-brands-toggle-style">

		/* سکشن برندها */
    /* Brands section */
    
		.elementor-element-95ccca0 {
			position: relative;
	padding-bottom: 0 !important;
	margin-bottom: 0 !important;
		}

		/*
		 * حالت بسته:
		 * فقط سه لوگوی اول هر ستون نمایش داده شود
		 * مجموعاً 18 برند در دسکتاپ
		 */
    /*
     * Collapsed state:
     * Display only the first three logos in each column.
     * A total of 18 brands are shown on desktop.
     */
    
		.elementor-element-95ccca0:not(.elva-brands-expanded)
		> .elementor-container
		> .elementor-column
		> .elementor-widget-wrap
		> .elementor-element:nth-child(n+4) {
			display: none !important;
		}

		/* حالت باز: نمایش تمام برندها */
    /* Expanded state: display all brands */
    
		.elementor-element-95ccca0.elva-brands-expanded
		> .elementor-container
		> .elementor-column
		> .elementor-widget-wrap
		> .elementor-element {
			display: block;
		}

		/* انیمیشن ردیف‌های بازشده */
   /* Animation for newly revealed brand rows */
    
		.elementor-element-95ccca0.elva-brands-expanded
		> .elementor-container
		> .elementor-column
		> .elementor-widget-wrap
		> .elementor-element:nth-child(n+4) {
			animation: elvaBrandsOpen 0.35s ease both;
		}

		@keyframes elvaBrandsOpen {
			from {
				opacity: 0;
				transform: translateY(-8px);
			}

			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

	/* محفظه دکمه */
  /* Button container */
    
.elva-brands-toggle-wrap {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	/*margin-top: -28px;*/
	padding: 0 15px 0;
	background: transparent;
}

/* دکمه */
/* Toggle button */
    
.elva-brands-toggle-btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 150px;
	min-height: 38px;
	padding: 8px 18px;
	border: 1px solid #034A73 !important;
	border-radius: 7px;
	background: #034A73 !important;
	color: #ffffff !important;
	font-family: inherit;
	font-size: 13px;
	font-weight: 700;
	line-height: 1.4;
	cursor: pointer;
	box-shadow: none !important;
	position: relative;
z-index: 1000;
pointer-events: auto;
touch-action: manipulation;
-webkit-tap-highlight-color: transparent;
-webkit-user-select: none;
user-select: none;
	transition:
		background-color 0.2s ease,
		border-color 0.2s ease,
		transform 0.2s ease;
}

.elva-brands-toggle-btn:hover,
.elva-brands-toggle-btn:focus {
	background: #023A5A !important;
	border-color: #023A5A !important;
	color: #ffffff !important;
	box-shadow: none !important;
	transform: translateY(-1px);
	outline: none;
}

/* فلش حذف شود */
/* Hide the arrow */
    
.elva-brands-toggle-arrow {
	display: none !important;
}

/* موبایل */
/* Mobile */
    
@media (max-width: 767px) {
	.elva-brands-toggle-wrap {
		margin-top: -12px;
		padding: 0 12px 16px;
		position: relative;
		z-index: 999;
		pointer-events: auto;
	}

	.elva-brands-toggle-btn {
		min-width: 145px;
		min-height: 36px;
		padding: 7px 16px;
		font-size: 12.5px;
	}
}

	</style>

	<script id="elva-brands-toggle-script">
	(function () {
		'use strict';

		function initElvaBrandsToggle() {

			const brandsSection = document.querySelector(
				'.elementor-element-95ccca0'
			);

			if (!brandsSection) {
				return false;
			}

			/* جلوگیری از ساخت چندباره دکمه */
      /* Prevent duplicate button creation */
      
			if (
				document.querySelector('.elva-brands-toggle-wrap')
			) {
				return true;
			}

			const buttonWrap = document.createElement('div');
			buttonWrap.className = 'elva-brands-toggle-wrap';

			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'elva-brands-toggle-btn';
			button.setAttribute('aria-expanded', 'false');
			button.setAttribute(
				'aria-controls',
				'elva-brands-section'
			);

			brandsSection.id = 'elva-brands-section';

			const buttonText = document.createElement('span');
			buttonText.className = 'elva-brands-toggle-text';
			buttonText.textContent = 'نمایش همه برندها';

			const arrow = document.createElement('span');
			arrow.className = 'elva-brands-toggle-arrow';
			arrow.setAttribute('aria-hidden', 'true');
			arrow.textContent = '⌄';

			button.appendChild(buttonText);
			button.appendChild(arrow);
			buttonWrap.appendChild(button);

			/*
			 * قرار گرفتن دکمه دقیقاً بعد از سکشن برندها
			 */
      /*
      * Insert the button immediately after the brands section.
      */
      
			brandsSection.insertAdjacentElement(
				'afterend',
				buttonWrap
			);

function toggleElvaBrands(event) {
	event.preventDefault();
	event.stopPropagation();

	const isExpanded = brandsSection.classList.toggle(
		'elva-brands-expanded'
	);

	button.setAttribute(
		'aria-expanded',
		isExpanded ? 'true' : 'false'
	);

	buttonText.textContent = isExpanded
		? 'نمایش کمتر'
		: 'نمایش همه برندها';

	if (!isExpanded) {
		const sectionTop =
			brandsSection.getBoundingClientRect().top +
			window.pageYOffset -
			80;

		window.scrollTo({
			top: sectionTop,
			behavior: 'smooth'
		});
	}
}

button.addEventListener('click', toggleElvaBrands);

			return true;
		}

		/* اجرای عادی */
    /* Standard initialization */
    
		if (document.readyState === 'loading') {
			document.addEventListener(
				'DOMContentLoaded',
				initElvaBrandsToggle
			);
		} else {
			initElvaBrandsToggle();
		}

		/*
		 * پشتیبان برای حالتی که المنتور محتوا را
		 * با کمی تأخیر وارد صفحه کند
		 */
    /*
     * Fallback for cases where Elementor
     * renders the content with a slight delay.
    */
    
		let attempts = 0;

		const elvaBrandsInterval = setInterval(function () {
			attempts++;

			if (
				initElvaBrandsToggle() ||
				attempts >= 20
			) {
				clearInterval(elvaBrandsInterval);
			}
		}, 300);

	})();
	</script>

	<?php
}, 99 );
