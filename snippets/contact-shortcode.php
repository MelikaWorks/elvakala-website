<?php
/**
 * Elvakala – Contact Information Shortcode
 *
 * Shortcode: [elva_contact]
 *
 * Displays Elvakala store contact information,
 * including the address, phone number, and mobile number.
 */
function elva_contact_shortcode() {
    ob_start();
    ?>
   <div class="elva-contact-section">
    <h3 class="elva-contact-title">
        اطلاعات تماس فروشگاه الوا کالا
    </h3>

    <div class="elva-contact-box">
        <p><strong>📍 آدرس:</strong> قزوین، خیابان نوروزیان، نبش حکمت ۴۵</p>
        <p><strong>☎️ تلفن:</strong> 028-33790105</p>
        <p><strong>📱 همراه:</strong> 09944550512</p>
    </div>
</div>
    <?php

    return ob_get_clean();
}

add_shortcode('elva_contact', 'elva_contact_shortcode');
