function elva_location_shortcode() {
    ob_start();
    ?>

    <div class="elva-location-box">

        <h3>📍موقعیت فروشگاه الوا کالا</h3>

        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3215.3732748350226!2d50.007762611345946!3d36.30325397227784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ff4ab001a089e97%3A0x65c5a68f6db4d7ac!2z2YbZhdin24zZhtiv2Ycg2YXYrdi12YjZhNin2Kog2Ygg2YLYt9i52KfYqiDYqNmI2KrYp9mGINiM2KfbjNix2KfZhiDYsdin2K_bjNin2KrZiNixINmIINiq2KzZh9uM2LIg2KfYs9iq2K7YsQ!5e0!3m2!1sen!2s!4v1785229183566!5m2!1sen!2s"
            width="100%"
            height="350"
            style="border:0;border-radius:12px;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin">
        </iframe>

        <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:20px;">

            <a href="https://maps.app.goo.gl/cxUnpGGbMZHa5xVj8"
               target="_blank"
               rel="noopener"
               style="padding:10px 18px;background:#034A73;color:#fff;border-radius:8px;text-decoration:none;">
                Google Maps
            </a>

            <a href="https://neshan.org/maps/iframe/places/e14cf81f60acc645011065f29c45cc36#c36.303-50.011-18z-0p/36.30324581632471/50.01046422065025"
               target="_blank"
               rel="noopener"
               style="padding:10px 18px;background:#1BA84A;color:#fff;border-radius:8px;text-decoration:none;">
                نشان
            </a>

            <a href="https://balad.ir/maps/qazvin#18.03/36.303367/50.011231"
               target="_blank"
               rel="noopener"
               style="padding:10px 18px;background:#F28C00;color:#fff;border-radius:8px;text-decoration:none;">
                بلد
            </a>

        </div>

    </div>

    <?php
    return ob_get_clean();
}

add_shortcode('elva_location', 'elva_location_shortcode');
