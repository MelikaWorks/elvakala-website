var Mweb_Main_Js = (function (Module, $) {
	'use strict';

	Module.initParams = function () {
		this._window = $(window);
		this.html = $('html, body');
		this._document = $(document);
		this._body = $('body');
		this.direction = '';
		this.is_mobile = $('body').hasClass('body_ismobile');
		this.site_mask = $('.mweb-site-mask');
		this.lazyload_instance = '';
		this.ajax_filter_item_last_width = [];
		this.ajax = {};
		this.cart_ajax = null;
		this.resize_timer = '';

	}
	
	Module.init = function () {
		
		this.initParams();
		
		this.neededOnLoad();
		
		this.block_dropdown_filter();
		this.ajax_data_term();
		this.ajax_header_search();
		this.ajax_discount_filter();
		this.ajax_dropdown_filter();
		this.ajax_pagination();
		this.ajax_loadmore();
		this.ajax_infiniteScroll();
		this.ajax_mega_cat_sub();
		this.ajax_tabico_filter();
		this.ajax_comments();
		this.ajax_like_dislike();
		this.ajax_post_like();
		this.ajax_order_opr();
		this.ajax_product_notification();
		this.ajax_product_price_survey();
		this.ajax_compare_product();
		this.ajax_quick_view_product();
		this.ajax_get_price_chart_product();
		this.ajax_wishlist();
		this.ajax_delivery_estimate();
		this.ajax_cart_operation();
		this.ajax_remindme_product();
		this.ajax_report_product();
		this.ajax_notify_actions();
		
		this.ajax_single_add_to_cart_override();
		
		this.categories_list_more();
		
		this.init_buy_later();

		this.init_single_product( '.single_p_gallery' );
		this.init_gallery_new_v();
		this.init_variation_form();
		this.init_sticky_add_to_cart();
		
		
		//this.init_swiper_slider();
		//this.init_swiper_vtabs();
		this.init_realtime_slider();
		
		this.init_slider_action($('.sw_slider_related'));	
		this.init_slider_action($('.sw_slider_upsell'));	
		this.init_slider_action($('.sw_slider_cross_sell'));	
		this.init_slider_action($('.sw_slider_recent_view'));	
		this.init_slider_action($('.sw_slider_namad'));	
		this.init_slider_action($('.sw_slider_realtime'));	

		
		this.instagram_popup_widget();
		this.init_countdown();
		this.init_qty();
		//this.shop_carousel_filter();
		this.select_to_list_ordering();
		
		this.init_header_function();
		this.init_footer_function();
		this.init_single_function();
		this.init_sidebar_function();
		this.init_cart_function();
		this.init_element_function();
		
		this.init_order_review();
		
		this.init_tickets();
		this.init_login_and_register();
		
	}
	
	
	Module.neededReloadFuncs = function () {
		this._window.trigger('load');
	}

	Module.neededOnLoad = function () {
		var self = this;
		this._window.on('load', function(){
			//self._window.trigger('load');
			self._body.addClass('mweb-js-loaded');
					
			
			self.init_content_more();
			
			
			if(self.is_mobile == true){
				self.categories_list_responsive();
			}

			if( self._body.hasClass('single-product') && $('ol.commentlist').length )
				$('li[data-filter="newest"]').trigger('click');
			
			var notify_warp = $('.notify_warp');
			if (notify_warp.length > 0){
				var hash  = window.location.hash;
				var url   = window.location.href;
				var arr   = [ 'all', 'me', 'order' ];
				if ( $.inArray(hash, arr) ) {
					$("li[data-filter='" + hash.substr(1) +"']").click();
				}
			}
		
		});	
		
		if( 'undefined' !== typeof mweb_popup_pic ){
			if( mweb_popup_pic ){
				self.init_popup(mweb_popup_pic, mweb_popup_link);
				self.mweb_setCookie('run_popup', true, mweb_popup_day);
			}
		}
		
		self.init_wc_tabs();
		
		self.init_console_bio();
	
	}


	/* Module.initElementor = function () {
		
		Mweb_Main_Js.init_swiper_slider();
		Mweb_Main_Js.init_swiper_vtabs();
		Mweb_Main_Js.init_realtime_slider();
		
	} */
	
	/** resize */
	Module.browserResize = function () {
		var self = this;
		self._window.on('resize', function () {
			self.calc_small_menu();
			clearTimeout(self.resize_timer);
			self.block_dropdown_filter();
			self.categories_list_responsive();
		})
	}



	
	/* document_reload: function() {
		if(mweb_theme.ajax_filter_item_last_width.length > 0 ){
			ajax_filter_item_last_width: []
		}
		//mweb_theme.ajax_view_add();
		//mweb_theme.ajax_view_count();
	
	}, */
	

 
	Module.get_width = function(item) {
		return item.width();
	}


	Module.validate_email_address = function(email) {
		var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		return pattern.test(email);
	}
	
	
	Module.update_query_string = function (uri, key, value) {
		var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
		var separator = uri.indexOf('?') !== -1 ? "&" : "?";
		if (uri.match(re)) {
			if ( value == '' ) {
				return uri.includes('?') ? uri.replace(re, '?') : uri.replace(re, '');
			} else {
				return uri.replace(re, '$1' + key + "=" + value + '$2');
			}
		} else if ( value != '' ) {
			return uri + separator + key + "=" + value;
		}
	}


	Module.categories_list_responsive = function() {
		var bk_category = $('.bk_category_inner');
		if( bk_category.hasClass('cat_box_grid') ){
			return false;
		}
		if ( bk_category.length > 0 ) {
			//console.log($('.bk_cat_item').outerWidth());
			if( $('.bk_cat_item').outerWidth() < 104 || $('.bk_cat_item').outerWidth() > 114 ){
				
				var width = parseInt( bk_category.outerWidth() / 104 );
				var has_more = $('.bk_cat_more').length > 0 ? true : false;
				var offset = has_more == true ? 2 : 1;
				if( ! bk_category.hasClass('horizontal_scroll_css') ){
					bk_category.children().css({ 'width': 'calc((100% - '+ (width * 7) * 2 +'px)/ '+ width +')' });
				}
				if( has_more == true ){
					bk_category.children().each(function(i, obj) {
						if(i > width - offset){
							if(!$(this).hasClass('is_hidden')){
								$(this).addClass('is_hidden');
							}else{
								return false;
							}
						}else{
							if($(this).hasClass('is_hidden'))
								$(this).removeClass('is_hidden');
						}
					});
				}
			}
		}
	}
	
	
	Module.categories_list_more = function() {
		$('.bk_cat_more').on('click', function(e){
			$('.bk_category_inner').children().removeClass('is_hidden');
			$(this).remove();
		});
	}


	Module.calc_small_menu = function() {
		var small_menu = $('#mweb-small-menu');
		if ( small_menu.length > 0 ) {
			var num_el = small_menu.find('.small-menu-inner').children().length;
			var menu_wrapper = small_menu.parents('.navbar-inner');
			if (menu_wrapper.length > 0) {
				var wrapper_width = menu_wrapper.width();
				if (parseInt(wrapper_width) < ( parseInt(num_el) + 1) * 215) {
					small_menu.addClass('is-fw-small');
					small_menu.css('width', wrapper_width);
				} else {
					small_menu.removeClass('is-fw-small');
					small_menu.css('width', 'auto');
				}
			}
		}
	}


	Module.block_dropdown_filter = function() {
		
		var self = this;
		var block_ajax_filter_wrap = $('.block-ajax-filter-wrap');
		
		if (block_ajax_filter_wrap.length > 0) {
			block_ajax_filter_wrap.each(function() {

				var block_ajax_filter = $(this);
				var block_ajax_filter_id = block_ajax_filter.attr('id');
				var dropdown_counter = 1;
				var list_counter = 1;
				var header_inner = block_ajax_filter.parent('.block-title');
				var block_ajax_filter_max_width = self.get_width(header_inner);
				var block_ajax_filter_width = self.get_width(block_ajax_filter) + 170;

				if (block_ajax_filter_width > block_ajax_filter_max_width * 0.5) {

					while ((block_ajax_filter_width > block_ajax_filter_max_width * 0.5) && (dropdown_counter < 200)) {
						var dropdown_flag = self.block_dropdown_filter_add_el(block_ajax_filter);

						if (0 == dropdown_flag) {
							break;
						}
						block_ajax_filter_width = self.get_width(block_ajax_filter);
						dropdown_counter++;
					}
				} else {

					if ('undefined' == typeof self.ajax_filter_item_last_width[block_ajax_filter_id]) {
						self.block_filter_hide_more(block_ajax_filter);
					} else {

						var ajax_filter_el_last_width = self.ajax_filter_item_last_width[block_ajax_filter_id];
						while ((block_ajax_filter_width + ajax_filter_el_last_width < block_ajax_filter_max_width * 0.6) && (list_counter < 200)) {
							var list_flag = self.block_list_filter_add_el(block_ajax_filter);

							if (0 == list_flag) {
								break;
							}

							block_ajax_filter_width = self.get_width(block_ajax_filter);
							list_counter++;
						}
					}
				}

				//touch action
				self.block_filter_touch_toggle(block_ajax_filter);
			})
		}
	}


	Module.block_dropdown_filter_add_el = function(block_ajax_filter) {
		
		var self = this;
		
		var block_ajax_filter_id = block_ajax_filter.attr('id');
		var list_ajax_filter = block_ajax_filter.find('.ajax-filter-list');
		var dropdown_ajax_filter = block_ajax_filter.find('.ajax-filter-dropdown-list');
		var list_ajax_filter_last_el = list_ajax_filter.children().last();

		if (list_ajax_filter_last_el.length > 0) {

			self.ajax_filter_item_last_width[block_ajax_filter_id] = list_ajax_filter_last_el.width();
			self.block_filter_show_more(block_ajax_filter);
			list_ajax_filter_last_el.detach().prependTo(dropdown_ajax_filter);
			return 1;
		} else {
			return 0;
		}
	}


	Module.block_list_filter_add_el = function(block_ajax_filter) {
		
		var self = this;
		
		var block_ajax_filter_id = block_ajax_filter.attr('id');
		var list_ajax_filter = block_ajax_filter.find('.ajax-filter-list');
		var dropdown_ajax_filter = block_ajax_filter.find('.ajax-filter-dropdown-list');
		var dropdown_ajax_filter_first_el = dropdown_ajax_filter.children().first();

		//add to list
		if (dropdown_ajax_filter_first_el.length > 0) {
			dropdown_ajax_filter_first_el.css('opacity', '.1');
			dropdown_ajax_filter_first_el.detach().appendTo(list_ajax_filter);

			setTimeout(function() {
				if (dropdown_ajax_filter.children().length == 0) {
					self.block_filter_hide_more(block_ajax_filter)
				}
				dropdown_ajax_filter_first_el.css('opacity', '1');
			}, 50);

			self.ajax_filter_item_last_width[block_ajax_filter_id] = dropdown_ajax_filter_first_el.width();

			return 1;
		} else {
			return 0;
		}
	}


	Module.block_filter_hide_more = function(block_ajax_filter) {
		var block_ajax_filter_btn = block_ajax_filter.find('.ajax-filter-dropdown');
		if (block_ajax_filter_btn.css('display') == 'inline-block') {
			block_ajax_filter_btn.hide();
		}
	}


	Module.block_filter_show_more = function(block_ajax_filter) {
		var block_ajax_filter_btn = block_ajax_filter.find('.ajax-filter-dropdown');
		if (block_ajax_filter_btn.css('display') == 'none') {
			block_ajax_filter_btn.show(350);
		}
	},


	Module.block_filter_touch_toggle = function(block_ajax_filter) {
		if (true === this.touch) {
			var dropdown = block_ajax_filter.find('.ajax-filter-dropdown');
			dropdown.addClass('is-touch');
			dropdown.on('click touch', function() {
				dropdown.toggleClass('touch-active');
			});
		}
	};


	Module.ajax_cache = {
			
		//set data
		data: {},

		get: function(id) {
			return this.data[id];
		},
		set: function(id, data) {
			this.remove(id);
			this.data[id] = data;
		},
		remove: function(id) {
			delete this.data[id];
		},
		exist: function(id) {
			return this.data.hasOwnProperty(id) && this.data[id] !== null;
		}
	}


	Module.ajax_data_term = function() {
		var self = this;
		$('.mweb-block-wrap').each(function() {
			var block = $(this);
			var block_id = block.attr('id');

			if ('undefined' != typeof block_id) {
				self.ajax[block_id + '_category_id'] = block.data('category_id');
				self.ajax[block_id + '_category_ids'] = block.data('category_ids');
				self.ajax[block_id + '_tags'] = block.data('tags');
				self.ajax[block_id + '_orderby'] = block.data('orderby');
			}

			self.ajax_pagination_check(block);
			self.ajax_loadmore_check(block);
			self.ajax_infinite_scroll_check(block);
		})
	}


	Module.ajax_reinitiate_function = function() {

		this._html.off();
		this._window.off();
		this._window.trigger('load');
		//this.document_reload();
	}
	
	
	Module.add_notice = function ($message, $content, className){ 
	
		if ( typeof $.fn.notify === 'undefined' ) {
			return false;
		}
		
		$.notify.addStyle('mweb', {
			html: '<div>' + $message + '</div>'
		});
		$.notify($content, {
			autoHideDelay: 5000,
			className: className,
			style: 'mweb',
			showAnimation: 'fadeIn',
			hideAnimation: 'fadeOut',
			position: 'left',
			globalPosition: 'bottom center',
		});

	}
	
	 Module.mweb_FarsitoEnglishNumber = function( strNum ) {
		var pn = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
		var en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

		var temp = strNum;
		for (var i = 0; i < 10; i++) {
			var regex_fa = new RegExp(pn[i], 'g');
			temp = temp.replace(regex_fa, en[i]);
		}
		return temp;
	}

	Module.ajax_header_search = function() {
		var self = this;
		var delay = (function() {
			var timer = 0;
			return function(callback, ms) {
				clearTimeout(timer);
				timer = setTimeout(callback, ms);
			};
		})();

		var search_result_wrapper = $('#ajax-search-result');
		var search_input = $('#search-form-text');
		var search_clear = $('#ajax-form-search').find('.search_clear');
		var category = $('#search_cat_id');
		
		search_input.keyup(function() {
			var param = self.mweb_FarsitoEnglishNumber($(this).val());

			delay(function() {
				if (param.length > 1) {
					search_clear.addClass('go_in');
					search_result_wrapper.fadeIn(100).html('<div class="ajax-loader"></div>');
					if(search_input.closest('.search_overlay').length < 1)
						self._body.addClass('search_mask');
					var my_data = {
						action: 'mweb_theme_ajax_search',
						cat_id: category.val(),
						s: param
					};
					/* $.post(mweb_object.ajax_url, data, function(data_response) {
						search_result_wrapper.hide().empty().html(data_response).fadeIn(300);		
					}); */
					$.ajax({
						type: 'POST',
						url: mweb_object.ajax_url,
						dataType: 'html',
						data: my_data,
						success: function(response) {
							search_result_wrapper.hide().empty().html(response).fadeIn(100);	
							self.add_search_history(param);
						}
					});
		
				} else{
					search_clear.removeClass('go_in');
					search_result_wrapper.fadeOut(300, function() {
						$(this).empty();
						self._body.removeClass('search_mask');
					});
				}  

			}, 1000);
		});
		
		search_clear.click(function() {
			$(this).removeClass('go_in');
			search_input.val('');
			search_result_wrapper.fadeOut(300, function() {
				$(this).empty();
				self._body.removeClass('search_mask');
			});
		});
		
		$( ".more_search_btn" ).click(function() {
			$( "#ajax-form-search" ).submit();
		});
		
		$( ".btn_search_cat" ).click(function() {
			$(this).parent('.search_category').addClass('active');
		});
		
		self._window.on('click', function (e) {
			if (!$(e.target).is('.btn_search_cat') && !$(e.target).is('.pack-theme') && !$(e.target).is('.search_category ul') && $('.search_category ul').length > 0) {
				$('.search_category').removeClass('active');
			}
		});
		
		$( ".search_category li" ).click(function() {
			$( ".search_category li" ).removeClass('current');
			$(this).addClass('current');
			$('#search_cat_id').val($(this).data('id'));
			if($('.el_cat_title').length > 0){
				$('.el_cat_title').text($(this).text());
			}
			$(this).parent('.search_category').removeClass('active');
		});
		
		$( ".mweb-site-mask" ).click(function() {
			if(self._body.hasClass('search_mask')){
				search_input.val('');
				search_clear.removeClass('go_in');
				self._body.removeClass('search_mask');
				search_result_wrapper.empty().fadeOut(100);
			}
		});
		
		search_input.on('click', function () {
		 
			var search_form = $(this).closest('#ajax-form-search');
			var searchresults = search_form.find('.ajax_search_list');
			if ( searchresults.find('.post_with_thumb').length < 1 && mweb_search_history ) {
				
				var histories = self.get_search_history( '', false ),
					history_length = ( typeof histories == 'undefined' ) ? 0 : ( histories.length >= 4 ? 4 : histories.length );                    
				if ( history_length != 0 && search_result_wrapper.find( '.search_history' ).length < 1  ) {
					if(search_input.closest('.search_overlay').length < 1)
						self._body.addClass('search_mask');
					search_result_wrapper.fadeIn(300);	
					search_result_wrapper.append('<div class="search_history"><span><svg class="pack-theme" viewBox="0 0 24 24"><use xlink:href="'+iconp+'#receipt-search"></use></svg>تاریخچه جستجوهای شما</span><div class="history_list"></div></div>');
					var histories_link = '',
						hostname = search_form.attr('action'),
						post_type = $(this).parents('form').find("input[name='post_type']").val();

					for ( var i=0; i < history_length; ++i ) {
						var url = self.update_query_string( hostname, 's', histories[i] );
						url = self.update_query_string( url, 'post_type', post_type);
						histories_link += '<a href="' + url +'">' + histories[i] + '</a>';
					}
					
					if ( search_result_wrapper.find( '.search_history' ).length > 0 ) {
						search_result_wrapper.find('.history_list').html( histories_link );
					}
				}
			}

		});

	}
	
	
	Module.add_search_history = function( search ) {
		if ( search == 'undefined' ) {
			return;
		}
		var history = Cookies.get('search-history');
		if ( history != '' ) {
			if ( ! this.get_search_history( search, true ) ) {
				history = history + '|' + search;
			}
		} else {
			history = search;
		}
		Cookies.set( 'search-history', history, { expires: 30 } );
		return;
	}
	
	
	Module.get_search_history = function ( search, same = false ) {
  
		var history = Cookies.get('search-history');
			var result = [];
			if( history == '' || typeof history == 'undefined' ) {
				return;
			}

			var histories = history.split('|');
			// if search is empty return latest 4 history
			if ( search == '' ) {
				var loop_num = histories.length >= 4 ? ( histories.length - 4 ) : 0; 
				for ( var i = histories.length - 1; i >= loop_num; --i ) {
					if ( histories[i] != 'undefined' ) {
						result.push( histories[i] );
					}
				} 
			} else {
				if ( same == true ) {
					for(var i = 0; i < histories.length; ++i){
						if ( histories[i] == search ) {
							return true;
						} 
					}
					return false;
				}
				for(var i = 0; i < histories.length; i++){
					if ( histories[i].includes(search) ) {
						if ( histories[i] != 'undefined' ) {
							result.push(histories[i]);
						}
					}
				}
			}

			return result;
	}
	
	
	Module.ajax_block_data = function(block) {
		var param = {};
		param.block_id = block.data('block_id');
		param.block_name = block.data('block_name');
		param.post_type = block.data('post_type');
		param.posts_per_page = block.data('posts_per_page');
		param.ajax_dropdown = block.data('ajax_dropdown');
		param.block_page_max = block.data('block_page_max');
		param.block_page_current = block.data('block_page_current');
		param.category_id = block.data('category_id');
		param.category_ids = block.data('category_ids');
		param.orderby = block.data('orderby');
		param.authors = block.data('authors');
		param.tags = block.data('tags');
		param.post_format = block.data('post_format');
		param.offset = block.data('offset');
		param.excerpt = block.data('excerpt');
		param.excerpt_classic = block.data('excerpt_classic');
		param.block_style = block.data('block_style');
		param.thumb_position = block.data('thumb_position');
		param.summary_type = block.data('summary_type');
		param.array_range = block.data('array_range');
		param.cat_info = block.data('cat_info');
		param.meta_info = block.data('meta_info');
		param.column_in_row = block.data('column_in_row');
		param.slider = JSON.stringify(block.data('slider'));
		param.other = JSON.stringify(block.data('other'));

		return param;
	}


	Module.ajax_discount_filter = function() {
		var self = this;
		var elm_moff = $('.discount_title').length > 0 ? 9 : 7;
		
		
		function move_marker(){
			var elm_active = $('.elm_off_point.active').next();
			var elementPosition = elm_active.position();
			var elementOffset = elm_active.offset();
			var elementWidth = elm_active.parents('.elementor-section').outerWidth();
			var elementWidth2 = elm_active.parents('.block-title').outerWidth();
			var elmX = elementPosition.left - ((elementWidth - elementWidth2) / 2) - elm_moff;
			var elmY = elementPosition.top - elementOffset.top + Math.round(elm_active.attr('y')) - 46;

			$('.elm_off_picker').css({top: elmY, left: elmX });
		}
		if( $('.elm_off_picker').length ){
			move_marker();
			
			$(".elm_off_svg").on("scroll", function (e) {
				move_marker();
			});
		}
		
		
		
		$('.elm_off_text').off('click').on('click', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var filter_link = $(this);
			var block = filter_link.parents('.mweb-block-wrap');
			var block_id = block.attr('id');
			var var_option = $('.discount_num').find('option:selected');
			var block_perpage = var_option.val();

			if (true == self.ajax[block_id + '_processing']) {
				return;
			}

			var elementPosition = filter_link.position();
			var elementOffset = filter_link.offset();
			var elementWidth = filter_link.parents('.elementor-section').outerWidth();
			var elementWidth2 = block.outerWidth();
			
			var elmX = elementPosition.left - ((elementWidth - elementWidth2) / 2) - elm_moff;
			var elmY = elementPosition.top - elementOffset.top + Math.round(filter_link.attr('y')) - 46;

			$('.elm_off_picker').css({top: elmY, left: elmX });
			
			var filter_link_val = filter_link.attr('id');
			self.ajax[block_id + '_processing'] = true;

			//disable other link
			block.find('.elm_off_point').removeClass('active');
			block.find('.elm_off_text').not(this).addClass('disable');
			filter_link.prev('.elm_off_point').addClass('active');


			self.ajax_animation_start(block);

			var param = self.ajax_block_data(block);

			param.array_range = filter_link_val;
			block.data('array_range', filter_link_val);
			param.posts_per_page = block_perpage;
			block.data('posts_per_page', block_perpage);

			
			setTimeout(function() {
				self.ajax_discount_filter_process(block, param);
			}, 500);

		});
	}
	

	Module.ajax_discount_filter_process = function(block, param) {
		var self = this;
		var param_cache = param;
		delete param_cache.block_page_max;
		var cache_id = JSON.stringify(param_cache);

		if (self.ajax_cache.exist(cache_id)) {
			var data = self.ajax_cache.get(cache_id);
			if ('undefined' != data.block_page_max) {
				block.data('block_page_max', data.block_page_max);
			}

			self.ajax_animation_end(block, data.content);
			return false;
		}

		$.ajax({
			type: 'POST',
			url: mweb_object.ajax_url,
			data: {
				action: 'mweb_ajax_discount',
				data: param
			},
			success: function(data) {
				data = $.parseJSON(data);
				if ('undefined' != data.block_page_max) {
					block.data('block_page_max', data.block_page_max);
				}
				self.ajax_cache.set(cache_id, data);
				self.ajax_animation_end(block, data.content);
			}
		});
	}


	Module.ajax_tabico_filter = function() {
		var self = this;
		$('.tab_box li a').off('click').on('click', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var filter_link = $(this);
			var block = filter_link.parents('.mweb-block-wrap');
			var block_id = block.attr('id');

			if (true == self.ajax[block_id + '_processing']) {
				return;
			}

			var filter_link_val = filter_link.data('ajax_filter_val');
			self.ajax[block_id + '_processing'] = true;

			//disable other link
			block.find('.tab_box li').removeClass('active');
			//block.find('.tab_box li a').not(this).addClass('disable');
			filter_link.parent().addClass('active');

			self.ajax_animation_start(block);

			var param = self.ajax_block_data(block);
			self.ajax_dropdown_reset_param(block, param, filter_link_val);
		   
		   //setTimeout(function() {
		   //    mweb_theme.ajax_dropdown_filter_process(block, param);
		   //}, 500);
			
			var param_cache = param;
			delete param_cache.block_page_max;
			var cache_id = JSON.stringify(param_cache);

			/* if (mweb_theme.ajax_cache.exist(cache_id)) {
				var data = mweb_theme.ajax_cache.get(cache_id);
				if ('undefined' != data.block_page_max) {
					block.data('block_page_max', data.block_page_max);
				}

				mweb_theme.ajax_animation_end(block, data.content);
				return false;
			} */

			$.ajax({
				type: 'POST',
				url: mweb_object.ajax_url,
				data: {
					action: 'mweb_theme_ajax_filter_data',
					data: param
				},
				success: function(data) {
					data = $.parseJSON(data);
					if ('undefined' != data.block_page_max) {
						block.data('block_page_max', data.block_page_max);
					}
					self.ajax_cache.set(cache_id, data);
					self.ajax_animation_end(block, data.content);
				},
				complete: function (data) {
					setTimeout(function() {
						if( filter_link.parent().hasClass('v_tab') ){
							self.init_swiper_vtabs();
						}else{
							self.ajax_quick_view_product();
						}
					}, 1000);
				},
			});
		
			
			 /* setTimeout(function() {
				if( filter_link.parent().hasClass('v_tab') ){
					var swiper_c = block.find('.swiper-container');
					if(swiper_c.length > 0){
						var configs = swiper_c.data('slider');
						if( mweb_theme.is_mobile == true ){
							configs.slidesPerView = 'auto';
							configs.freeMode = true;
							configs.watchSlidesVisibility = false;
							configs.centeredSlides = false;
							configs.autoplay = false;
							delete(configs.breakpoints);
						}
						configs.observer = true;
						configs.observeParents = true;
						var myswiper = new Swiper(swiper_c, configs );
						configs = undefined;
					}
				}
			}, 2000); */

		});
	}
	
	Module.ajax_dropdown_filter = function() {
		var self = this;
		$('.ajax-filter-link').off('click').on('click', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var filter_link = $(this);
			var block = filter_link.parents('.mweb-block-wrap');
			var block_id = block.attr('id');

			if (true == self.ajax[block_id + '_processing']) {
				return;
			}

			var filter_link_val = filter_link.data('ajax_filter_val');
			self.ajax[block_id + '_processing'] = true;

			//disable other link
			block.find('.ajax-link').removeClass('is-active');
			block.find('.ajax-link').not(this).addClass('is-disable');
			filter_link.addClass('is-active');

			if (true === self.touch) {
				var dropdown = filter_link.parents('.ajax-filter-dropdown');
				dropdown.removeClass('touch-active');
			}

			self.ajax_animation_start(block);

			var param = self.ajax_block_data(block);
			self.ajax_dropdown_reset_param(block, param, filter_link_val);
			setTimeout(function() {
				self.ajax_dropdown_filter_process(block, param);
			}, 500);

		});
	}


	Module.ajax_dropdown_reset_param = function(block, param, filter_link_val) {
		var self = this;
		param.block_page_current = 1;

		block.data('block_page_current', 1);
		var block_id = block.attr('id');

		if ('category' == param.ajax_dropdown) {

			if ('undefined' == typeof (self.ajax[block_id + '_category_id'])) {
				self.ajax[block_id + '_category_id'] = 0;
			}

			if (0 == filter_link_val) {
				param.category_id = self.ajax[block_id + '_category_id'];
				param.category_ids = self.ajax[block_id + '_category_ids'];

				block.data('category_id', self.ajax[block_id + '_category_id']);
				block.data('category_ids', self.ajax[block_id + '_category_ids']);

			} else {

				param.category_id = filter_link_val;
				param.category_ids = 0;

				block.data('category_id', filter_link_val);
				block.data('category_ids', 0);
			}
		}

		if ('tag' == param.ajax_dropdown) {
			param.tags = filter_link_val;
			block.data('tags', filter_link_val);
		}

		if ('author' == param.ajax_dropdown) {
			param.authors = filter_link_val;
			block.data('authors', filter_link_val);
		}

		if ('popular' == param.ajax_dropdown) {

			block.data('orderby_term', block.data('orderby'));

			if ('featured' == filter_link_val) {
				param.tags = null;
				param.orderby = 'featured_product';
				block.data('tags', '');
				block.data('orderby', 'featured_product');
			}

			if ('best_selling' == filter_link_val) {
				param.tags = null;
				param.orderby = 'best_selling';
				block.data('orderby', 'best_selling');
				block.data('tags', '');
			}

			if ('top_rate' == filter_link_val) {
				param.tags = null;
				param.orderby = 'top_rate';
				block.data('orderby', 'top_rate');
				block.data('tags', '');
			}
			
			if ('on_sale' == filter_link_val) {
				param.tags = null;
				param.orderby = 'on_sale';
				block.data('orderby', 'on_sale');
				block.data('tags', '');
			}
			
			if (0 == filter_link_val) {
				param.tags = self.ajax[block_id + '_tags'];
				param.orderby = self.ajax[block_id + '_orderby'];
				if ('undefined' == typeof self.ajax[block_id + '_tags']) {
					block.data('tags', '');
				} else {
					block.data('tags', self.ajax[block_id + '_tags']);
				}
				block.data('orderby', self.ajax[block_id + '_orderby']);
			}
		}
	},


	Module.ajax_dropdown_filter_process = function(block, param) {
		var self = this;
		var param_cache = param;
		delete param_cache.block_page_max;
		var cache_id = JSON.stringify(param_cache);

		if (self.ajax_cache.exist(cache_id)) {
			var data = self.ajax_cache.get(cache_id);
			if ('undefined' != data.block_page_max) {
				block.data('block_page_max', data.block_page_max);
			}

			self.ajax_animation_end(block, data.content);
			return false;
		}

		$.ajax({
			type: 'POST',
			url: mweb_object.ajax_url,
			data: {
				action: 'mweb_theme_ajax_filter_data',
				data: param
			},
			success: function(data) {
				data = $.parseJSON(data);
				if ('undefined' != data.block_page_max) {
					block.data('block_page_max', data.block_page_max);
				}
				self.ajax_cache.set(cache_id, data);
				self.ajax_animation_end(block, data.content);
			}
		});
	}


	Module.ajax_animation_start = function(block) {

		var content_wrap = block.find('.block-content-wrap');
		var content_inner = content_wrap.find('.block-content-inner');
		var content_inner_height = content_inner.outerHeight();

		//add height for ajax
		content_inner.css('height', content_inner_height);

		//hide content
		content_inner.stop();
		$('.ajax-loader').remove();
		content_wrap.prepend('<div class="ajax-loader">');
		content_inner.addClass('is-overflow');
		//content_inner.fadeOut('500');
	}


	Module.ajax_animation_end = function(block, content) {
		var self = this;
		block.delay(100).queue(function() {

			block.find('.ajax-link').removeClass('is-disable');
			block.find('.ajax-filter-more').removeClass('is-disable');

			var block_id = block.attr('id');
			var content_wrap = block.find('.block-content-wrap');
			var content_inner = content_wrap.find('.block-content-inner');

			content_wrap.find('.ajax-loader').remove();
			content_inner.stop();
			content_inner.html(content);

			content_inner.fadeIn(500, function() {
			});

			content_inner.removeClass('is-overflow');

			if (block.hasClass('block-mega-menu')) {
				setTimeout(function() {
					content_inner.css('height', 'auto');
				}, 250);
			} else {
				setTimeout(function() {
					content_inner.css('height', 'auto');
				}, 100);
			}

			self.ajax[block_id + '_processing'] = false;
			self.ajax_pagination_check(block);
			self.ajax_loadmore_check(block);
			self.ajax_infinite_scroll_check(block);
			
			$("img.lazy").each(function() {
				var el_img = $(this);
				if(!el_img.hasClass('loaded')){
					el_img.addClass('loaded');
				}
			});

			block.dequeue();
		});
	}


	Module.ajax_pagination = function() {
		var self = this;
		$('.ajax-pagination-link').off('click').on('click', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var link = $(this);
			var block = link.parents('.mweb-block-wrap');
			var block_id = block.attr('id');

			if (true == self.ajax[block_id + '_processing']) {
				return;
			}
			self.ajax[block_id + '_processing'] = true;

			block.find('.ajax-link').addClass('is-disable');
			block.find('.ajax-filter-more').addClass('is-disable');

			var pagination_link_val = link.data('ajax_pagination_link');
			var param = self.ajax_block_data(block);
			self.ajax_animation_start(block);
			setTimeout(function() {
				self.ajax_pagination_process(block, param, pagination_link_val);
			}, 200);
		});
	},


	Module.ajax_pagination_process = function(block, param, pagination_link_val) {
		var self = this;
		var page_current = param.block_page_current;
		if ('prev' == pagination_link_val) {
			--page_current;
		} else {
			++page_current
		}

		param.block_page_next = page_current;

		var param_cache = param;
		delete param_cache.block_page_max;
		param_cache.block_page_current = page_current;

		var cache_id = JSON.stringify(param_cache);
		if (self.ajax_cache.exist(cache_id)) {
			var data = self.ajax_cache.get(cache_id);
			if ('undefined' != data.block_page_current) {
				block.data('block_page_current', data.block_page_current);
			}
			self.ajax_animation_end(block, data.content);
			return false;
		}

		$.ajax({
			type: 'POST',
			url: mweb_object.ajax_url,
			data: {
				action: 'mweb_theme_pagination_data',
				data: param
			},

			success: function(data) {
				data = $.parseJSON(data);
				if ('undefined' != data.block_page_current) {
					block.data('block_page_current', data.block_page_current);
				}
				self.ajax_cache.set(cache_id, data);
				self.ajax_animation_end(block, data.content);
			}
		});
	}


	Module.ajax_pagination_check = function(block) {

		var param = this.ajax_block_data(block);

		if (param.block_page_max < 2) {
			block.find('.ajax-pagination-link').addClass('is-disable');
		}

		if (param.block_page_current >= param.block_page_max) {
			block.find('.ajax-next').addClass('is-disable');
		}

		if (param.block_page_current <= 1) {
			block.find('.ajax-prev').addClass('is-disable');
		}
	}
	
	
	Module.ajax_infiniteScroll = function() {
		var self = this;
		
		if( typeof infiniteScroll == 'undefined' ){
			return;
		}
		
		if( infiniteScroll.enable && $('ul.products').length ){

			let isLoading = false;
			const currentURL = window.location.href;
			let currentPage = parseInt(infiniteScroll.current_page); 
			const maxScrollPage = 5; 
			
			if (currentPage <= maxScrollPage && !currentURL.includes('page') ) {
				$('.woocommerce-pagination').hide();
			}
			
			function isElementInViewport(el) {
				if (!el.length) return false; 
				const rect = el[0].getBoundingClientRect();
				return (
					rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
				);
			}

			$(window).on('scroll', function() {
				const $products = $('.products');
				if ($products.length && isElementInViewport($products) && !isLoading && !currentURL.includes('page')) {
					loadNextPage();
				}
			});
						

			function loadNextPage() {
				const nextLink = $('.woocommerce-pagination a.next').attr('href');
				
				if (nextLink && !isLoading && currentPage < maxScrollPage) {
					isLoading = true;

					$.ajax({
						url: nextLink,
						type: 'GET',
						beforeSend: function (xhr) {
							$('ul.products').addClass('mweb-loader_down');
						},
						success: function(response) {
							const newProducts = $(response).find('ul.products').html();
							const newPagination = $(response).find('.woocommerce-pagination').html();

							$('ul.products').append(newProducts);

							$('.woocommerce-pagination').html(newPagination);
							$('ul.products').removeClass('mweb-loader_down');

							isLoading = false; 
							currentPage++; 
							
							if (currentPage >= maxScrollPage) {
								$('.woocommerce-pagination').show();
							}


						},
						error: function() {
							isLoading = false; 
							$('ul.products').removeClass('mweb-loader_down');
						}
					});
				}
			}
			
			$('.woocommerce-pagination').on('click', 'a.next', function(event) {
				event.preventDefault();
				if (currentPage < maxScrollPage) {
					loadNextPage();
				}
			});
			
		}

		
	}
	


	Module.ajax_loadmore = function() {
		var self = this;
		
		$('.ajax-loadmore-link').off('click').on('click', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var link = $(this);
			var block = link.parents('.mweb-block-wrap');
			var block_id = block.attr('id');
			if (true == self.ajax[block_id + '_processing']) {
				return;
			}
			var param = self.ajax_block_data(block);
			if (param.block_page_current >= param.block_page_max) {
				return;
			}
			self.ajax[block_id + '_processing'] = true;
			var animation = link.next('.ajax-animation');
			link.animate({ opacity: 0 }, 200);
			setTimeout(function() {
				animation.css({ 'display': 'block' });
				animation.css({ 'visibility': 'visible' });
				animation.delay(200).animate({ opacity: 1 }, 200);
			}, 100);
			setTimeout(function() {
				self.ajax_loadmore_process(block, param);
			}, 200);
		})
	}
	


	Module.ajax_loadmore_process = function(block, param) {
		var self = this;
		var block_id = block.attr('id');
		var page_current = param.block_page_current;
		var page_next = ++page_current;

		param.block_page_next = page_next;
		if (page_next <= param.block_page_max) {

			$.ajax({
				type: 'POST',
				url: mweb_object.ajax_url,
				data: {
					action: 'mweb_theme_pagination_data',
					data: param
				},

				success: function(data) {

					data = $.parseJSON(data);

					if ('undefined' != data.block_page_current) {
						block.data('block_page_current', data.block_page_current);
					}

					block.find('.block-content-inner').append(data.content);
					self.ajax[block_id + '_processing'] = false;

					setTimeout(function() {
						self.ajax_reinitiate_function();
					}, 50);

					if (data.block_page_current < param.block_page_max) {
						var animation = block.find('.ajax-animation');
						animation.css({ 'display': 'none' });
						animation.css({ 'visibility': 'hidden' });
						animation.css({ 'opacity': 0 });
						block.find('.ajax-loadmore-link').delay(100).animate({ opacity: 1 }, 200);
					} else {
						block.find('.ajax-loadmore-link').hide();
						block.find('.ajax-animation').hide();
					}
				}
			});
		}
	}


	Module.ajax_loadmore_check = function(block) {

		var param = this.ajax_block_data(block);
		if (param.block_page_current >= param.block_page_max || param.block_page_max <= 1) {
			block.find('.ajax-loadmore-link').hide();
			block.find('.ajax-animation').hide();
		} else {
			block.find('.ajax-loadmore-link').css('opacity', 1);
			block.find('.ajax-loadmore-link').show();
		}
	}


	Module.ajax_infinite_scroll = function() {
		var self = this;
		var infinite_scroll = $('.ajax-infinite-scroll');
		if (infinite_scroll.length > 0) {

			infinite_scroll.each(function() {
				var infinite_scroll_el = $(this);

				if (!infinite_scroll_el.hasClass('is-disable')) {

					var animation = infinite_scroll_el.find('.ajax-animation');
					var block = infinite_scroll_el.parents('.mweb-block-wrap');
					var block_id = block.attr('id');

					if (infinite_scroll_el.length > 0) {
						self.waypoint_item['infinite_scroll'] = new Waypoint({
							element: infinite_scroll_el,
							handler: function(direction) {
								if ('down' == direction) {

									var param = self.ajax_block_data(block);

									if (param.block_page_current >= param.block_page_max) {
										infinite_scroll_el.addClass('is-disable');
										return;
									}

									if (true == self.ajax[block_id + '_processing']) {
										return;
									}

									self.ajax[block_id + '_processing'] = true;

									setTimeout(function() {
										animation.css({ 'display': 'block' });
										animation.css({ 'visibility': 'visible' });
										animation.animate({ opacity: 1 }, 200);
									}, 100);

									setTimeout(function() {
										self.ajax_loadmore_process(block, param);
										self.waypoint_item['infinite_scroll'].destroy();
									}, 200);
								}
							},
							offset: '99%'
						})
					}
				}
			});
		}
	}


	Module.ajax_infinite_scroll_check = function(block) {
		var param = this.ajax_block_data(block);
		if (param.block_page_current >= param.block_page_max || param.block_page_max <= 1) {
			block.find('.ajax-infinite-scroll').addClass('is-disable');
		} else {
			block.find('.ajax-infinite-scroll').removeClass('is-disable');
		}
	}


	Module.ajax_mega_cat_sub = function() {
		var self = this;
		var hover_timer;
		var cat_sub = $('.mega-category-menu .menu-item');

		cat_sub.hover(function(event) {
			event.stopPropagation();
			cat_sub = $(this);
			cat_sub.addClass('is-current-sub').siblings().removeClass('is-current-sub current-menu-item');
			var wrapper = cat_sub.parents('.mega-category-menu');
			var block = wrapper.find('.block-mega-menu-sub');
			hover_timer = setTimeout(function() {
				self.ajax_cat_sub_process(cat_sub, block);
			}, 200);
		}, function() {
			clearTimeout(hover_timer);
		});
	}


	Module.ajax_cat_sub_process = function(cat_sub, block) {
		var self = this;
		var block_id = block.attr('id');
		if (true == self.ajax[block_id + '_processing']) {
			return;
		}
		self.ajax[block_id + '_processing'] = true;

		var param = self.ajax_block_data(block);
		param.category_id = cat_sub.data('mega_sub_filter');
		param.block_page_current = 1;
		param.block_name = 'mweb_theme_mega_block_cat_sub';
		param.posts_per_page = 4;

		block.data('category_id', param.category_id);
		block.data('block_page_current', param.block_page_current);

		self.ajax_animation_start(block);
		setTimeout(function() {
			self.ajax_dropdown_filter_process(block, param);
		}, 200);
	}


	Module.ajax_view_count = function() {
		if (this._body.hasClass('is-ajax-view')) {
			var ajax_view = $('.mweb-ajax-view');
			if (ajax_view.length > 0) {
				ajax_view.each(function() {
					var ajax_view_el = $(this);
					var post_id = ajax_view_el.data('post_id');
					ajax_view_el.css('width', ajax_view_el.width());
					$.ajax({
						type: 'POST',
						url: mweb_object.ajax_url ,
						data: {
							action: 'mweb_theme_ajax_view_get',
							post_id: post_id
						},
						success: function(data) {
							data = $.parseJSON(data);
							ajax_view_el.html(data);
							ajax_view_el.css('width', 'auto');
							ajax_view_el.removeClass('is-invisible');
						}
					});
				})
			}
		}
	}


	Module.ajax_view_add = function() {
		if (this._body.hasClass('is-ajax-view')) {
			var ajax_view = $('.mweb-ajax-view-add');
			if (ajax_view.length > 0) {
				ajax_view.each(function() {
					var ajax_view_el = $(this);
					var post_id = ajax_view_el.data('post_id');
					$.ajax({
						type: 'POST',
						url: mweb_object.ajax_url ,
						data: {
							action: 'mweb_theme_ajax_view_add',
							post_id: post_id
						},
						success: function(data) {
							ajax_view_el.removeClass('mweb-ajax-view-add');
						}
					});
				})
			}
		}
	}
	
	
	Module.mweb_setCookie = function(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}


	Module.mweb_getCookie = function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(name) == 0)
					return c.substring(name.length,c.length);

		}
		return null;
	}
	
	Module.init_wcc_media_popup = function() {
		
		$('.wcc_media_link').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: true,
			removalDelay: 500,
			mainClass: 'mfp-fade',
			zoom: {
				enabled: true,
				duration: 500, 
				easing: 'ease', 
				opener: function (element) {
					return element.find('img');
				}
			},
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1]
			}
		});
	}
	
	Module.ajax_comments = function() {
		var self = this;
		self.init_wcc_media_popup();

		$('.wcc_comments_filter li').off('click').on('click', function(e) {
			e.preventDefault();
			
			var el_this = $(this);
			
			if( el_this.hasClass('is_active') )
				return false;
			
			var wc_list = $('ol.wc_cmAjax');
			$('.wcc_comments_filter li').removeClass('is_active');	
			el_this.addClass('is_active');	
			
			
			$.ajax({
				type: 'post',
				url: mweb_object.ajax_url,
				data: {
					action: 'mweb_comment_list',
					post_id: el_this.parent().data('post_id'),
					sortby: el_this.data('filter'),
					_wpnonce: mweb_object.nonce
				},
				beforeSend: function (xhr) {
					$('.wcc_pagination').remove();
					wc_list.html('<div class="custom-loader"></div>');
				},
				success: function (res) {
					if ( res.success ) {
						wc_list.empty().html(res.data.comments);
						$('.wcc_pagination').remove();
						if( res.data.pagination )
							wc_list.after(res.data.pagination);
						self.init_wcc_media_popup();
						
						self._body.trigger('load_previews');
					}
				},
				error: function(response){	
					wc_list.find('.custom-loader').remove();
					wc_list.html('<p class="mweb-error">خطا در اجرای دستور ! </p>');
				}
			});
		});
		
		
		self._document.on('click', '.wcc_pagination .page-numbers', function(e){
			
			
			e.preventDefault();
			
			var el_this = $(this);
							
			if( el_this.hasClass('current') )
				return false;
			
			var wc_list = $('ol.wc_cmAjax');
			console.log(el_this);
			//$('.wcc_pagination .page-numbers').removeClass('current');	
			//el_this.addClass('current');	

			$.ajax({
				type: 'post',
				url: mweb_object.ajax_url,
				data: {
					action: 'mweb_comment_list',
					post_id: el_this.parent().data('post_id'),
					sortby: el_this.parent().data('filter'),
					page_num: el_this.data('page_num'),
					_wpnonce: mweb_object.nonce
				},
				beforeSend: function (xhr) {
					el_this.parent().addClass('paginate_progress');
				},
				success: function (res) {
					if ( res.success ) {
						wc_list.find('.custom-loader').remove();
						wc_list.empty().html(res.data.comments);
					}
					$('.wcc_pagination').remove();
					if( res.data.pagination )
						wc_list.after(res.data.pagination);
					
					self.html.animate({scrollTop:wc_list.offset().top}, 'slow');
					self.init_wcc_media_popup();

				},
				error: function(response){	
					wc_list.find('.custom-loader').remove();
					wc_list.html('<p class="mweb-error">خطا در اجرای دستور ! </p>');
				}
			});
		});
		
		
		self._body.on('load_previews', function() {
			if ($("body").hasClass("body_ismobile")) {
				if ($(".comments-preview").length === 0) {
					let allReviews = $("#comments .commentlist .review");
					let first3 = $("#comments .commentlist .review").slice(0, 3).clone();

					let previewHtml = `<div class="comments-preview horizontal_scroll_css"><ul class="commentlist">`;
					first3.each(function() {
						previewHtml += `<li class="review">${$(this).html()}</li>`;
					});

					//if (allReviews.length > 3) {
						previewHtml += `<li class="wcitem_last"><span class="wcm_show-all"><svg class="pack-theme" viewBox="0 0 24 24"><use xlink:href="${iconp}#message-notif"></use></svg>مشاهده همه</span></li></ul></div>`;
					//}
					
					$(".woocommerce-Reviews").prepend(previewHtml);
				}

				if ($("#productcomments").length === 0) {
					let fullBox = `
					<div class="full_box" id="productcomments">
					  <div class="full_box_header">
						<h5>دیدگاه ها</h5>
						<span class="close_full_box"><svg class="pack-theme" viewBox="0 0 24 24"><use xlink:href="${iconp}#close-square"></use></svg></span>
					  </div>
					  <div class="full_box_body"></div>
					</div>
				  `;
					$(".woocommerce-Reviews").append(fullBox);

					$("#productcomments .full_box_body").append($("#comments"));
					$("#productcomments .full_box_header h5").append($(".woocommerce-Reviews-title span"));
				}

				$(document).on("click", ".wcm_show-all", function() {
					$("#productcomments").addClass("active");
					$("body").addClass("noscroll");
				});

				$(document).on("click", ".close_full_box", function() {
					$("#productcomments").removeClass("active");
					$("body").removeClass("noscroll");
				});
			}
		});

		
		
	}
	
	
	Module.ajax_like_dislike = function() {
		var self = this;
		var ajax_flag = 0;
		this._body.on('click', '.like_dislike_btn', function(e) {
		e.preventDefault();
			if (ajax_flag == 0) {
				var restriction = $(this).data('restriction');
				var comment_id = $(this).data('comment-id');
				var trigger_type = $(this).data('trigger-type');
				var selector = $(this);
				var mweb_cookie = self.mweb_getCookie('mweb_' + comment_id);
				var current_count = $(this).data('counter');
				var new_count = parseInt(current_count) + 1;
				var ip_check = $(this).attr('data-ip-check');
				var user_check = $(this).attr('data-user-check');
				
				
				var like_dislike_flag = 1;
				if (restriction == 'cookie' && mweb_cookie !== null ) {
					like_dislike_flag = 0;

				}
				if (restriction == 'ip' && ip_check == '1') {
					like_dislike_flag = 0;

				}
				if(restriction == 'user' && user_check == '1'){
					like_dislike_flag = 0;
				}
				if (like_dislike_flag == 1) {
					$.ajax({
						type: 'post',
						url: mweb_object.ajax_url,
						data: {
							comment_id: comment_id,
							action: 'like_dislike_comment',
							type: trigger_type,
							_wpnonce: mweb_object.nonce
						},
						beforeSend: function (xhr) {
							ajax_flag = 1;
							selector.attr('data-counter',new_count);
						},
						success: function (res) {
							ajax_flag = 0;
							res = $.parseJSON(res);
							if (res.success) {
								if (restriction == 'ip') {
									selector.attr('data-ip-check', 1);
								}
								if (restriction == 'user') {
									selector.parent('.like_dislike_wrap').find('a').attr('data-user-check', 1);
								}
								var cookie_name = 'mweb_' + comment_id;
								self.mweb_setCookie(cookie_name, 1, 365);
								var latest_count = res.latest_count;
								selector.attr('data-counter',latest_count);
							}
						}

					});
				}
			}
			
		});
	}
	
	
	
	Module.ajax_post_like = function() {
		var self = this;
		var ajax_flag = 0;
		$('.btn_like').off('click').on('click', function(e) {				
			e.preventDefault();
			if ( ajax_flag == 0 ) {
				var mweb_this = $(this);
				var mweb_id = mweb_this.data('id');
				var mweb_cookie = self.mweb_getCookie('mweb_' + mweb_id);

				if ( mweb_cookie == null ) {
					$.ajax({
						type: 'post',
						url: mweb_object.ajax_url,
						dataType: "json",
						data: {
							post_id: mweb_id,
							action: 'post_like',
							_wpnonce: mweb_object.nonce
						},
						beforeSend: function (xhr) {
							ajax_flag = 1;
							mweb_this.addClass('loading');
						},
						success: function (res) {
							ajax_flag = 0;
							if (res.success) {
								var cookie_name = 'mweb_' + mweb_id;
								self.mweb_setCookie(cookie_name, 1, 7);
								mweb_this.find('.count').text(res.data.count);
							}
							mweb_this.removeClass('loading');
						},
						error: function() {
							mweb_this.removeClass('loading');
						}

					});
				}
			}
			
		});
	}
	
	
	
	Module.ajax_product_notification = function() {
		
		$('input[name="status[]"]:checked').click(function(){
			$('input[name="notification_type[]"]:checked').prop( "checked", false );
		});
		 
		 
		$( "#remindme_form" ).submit(function(e) {
			e.preventDefault();
			var remind_form = $(this);
			var msg_box = $('p.a_msg');
			
			var status_ischecked = $('input[name="status[]"]:checked').length > 0;
			var type_ischecked = $('input[name="notification_type[]"]:checked').length > 0;
			var data_action = remind_form.attr('data-action');
			var flag = false;
			
			if( data_action == 'modify' && status_ischecked == false ){
				flag = true;
				data_action = 'delete';
			}else if( data_action == 'modify' && status_ischecked && type_ischecked ){
				flag = true;
				data_action = 'edit';
			}else if( data_action == 'new' && status_ischecked && type_ischecked ){
				flag = true;
				//data_action = 'new';
			}
			
			
			if(flag){
				
				var data_id = remind_form.attr('data-product-id');
				var data_type = $('input[name="notification_type[]"]:checked').map(function(){
					return $(this).val();
				});
				var data_when = $('input[name="status[]"]:checked').map(function(){
					return $(this).val();
				});
				
				$.ajax({
					type: 'post',
					url: mweb_object.ajax_url,
					data: {
						action: 'product_subscriber',
						product_id : data_id,
						type: data_type.get(),
						_action : data_action,
						_when : data_when.get(),
						_wpnonce: mweb_object.nonce
					},
					beforeSend: function (xhr) {
						remind_form.addClass('req');
					},
					success: function (res) {
						remind_form.removeClass('req');
						if(res.success){
							msg_box.addClass('success');
							if(res.data.msg){msg_box.html(res.data.msg);}
						}else{
							msg_box.addClass('error').html(res.data.message);
						}
						
					}

				});
				
			}else{
				$('input[name="status[]"]').focus();
			}
					
		});
	}
	
	
	Module.ajax_compare_product = function() {
		
		var self = this;
		
		$('a.compare:not(.added) ,.mweb-remove-compare ,.mweb-compare-clear-all').on('click', function(e) {
			
			
			var btn = $(this);
			if( btn.hasClass('added') ){
				window.location.href = btn.attr('href');
				return false;
			}
			e.preventDefault();
			var compare_wrap = $('.mweb-compare-list-bottom');
			var ac_type = btn.data('action');
			var prd_id = btn.data('pid');
			var tb_compare = false;
			
			if( $('.compare_list_table').length > 0 ){
				tb_compare = true;
			}
			
			$.ajax({
				type: 'post',
				url: mweb_object.ajax_url,
				data: {
					product_id: prd_id,
					action: 'mweb_theme_compare',
					type:ac_type,
					compare_table:tb_compare 	
				},
				beforeSend: function (xhr) {
					btn.addClass('waiting');
					compare_wrap.addClass('active');
					compare_wrap.append('<div class="custom-loader"></div>');
					self._body.addClass('body_compare');
				},
				success: function (res) {
					
					btn.removeClass('waiting').addClass('added');
					compare_wrap.find('.custom-loader').remove();
					if(res.result_compare == 'success'){
						if(res.mini_compare){
							compare_wrap.html(res.mini_compare);
						}
						compare_wrap.append('<p class="mweb-compare-mess mweb-compare-success">'+ res.mess_compare +'</p>');
						if($('.compare_sticky').length > 0){
							$('.compare_sticky').find('span').text(res.count_compare);
						}
						
						if(ac_type == "add")
							btn.attr('href', res.compare_page);
						
						if(tb_compare)
							$('.compare_list_table').html(res.result_table)
						
						if($('.compare_search_wrap').length > 0){
							$.modal.close();
						}
			
						self.ajax_compare_product();		
					}else{
						compare_wrap.append('<p class="mweb-compare-mess mweb-compare-error">'+ res.mess_compare +'</p>');
					}
					
					setTimeout(function(){
						compare_wrap.find('.mweb-compare-mess').fadeOut();
						
					}, 3000);
					
					var fade_time = tb_compare == true ? 100 : 6000;
					setTimeout(function(){
						compare_wrap.removeClass('active');
						self._body.removeClass('body_compare');
					}, fade_time); 
									
				}

			});
		});
		
		$('a.mweb-close-mini-compare').off('click').on('click', function(e) {
			$('.mweb-compare-list-bottom').removeClass('active');
			self._body.removeClass('body_compare');
		});
		
		$('.compare_sticky').off('click').on('click', function(e) {
			$('.mweb-compare-list-bottom').addClass('active');
			self._body.addClass('body_compare');
			return false;
		});
		
		var delay = (function() {
			var timer = 0;
			return function(callback, ms) {
				clearTimeout(timer);
				timer = setTimeout(callback, ms);
			};
		})();

		var cm_result_wrapper = $('#compare_product_list');
		var cm_input = $('#search-cmp');
		var cm_clear = $('#compare_search_product').find('.search_clear');
		
		cm_input.keyup(function() {
			var param = $(this).val();
			var category = $(this).data('category');
			delay(function() {
				if (param) {
					cm_clear.addClass('go_in');
					cm_result_wrapper.html('<div class="ajax-loader"></div>');
					var data = {
						action: 'mweb_compare_search',
						product: param,
						cat_id: category
					};
					$.post(mweb_object.ajax_url, data, function(data_response) {
						data_response = $.parseJSON(data_response);
						cm_result_wrapper.empty().html(data_response).fadeIn(300);		
						self.ajax_compare_product();		
					});
				} else{
					cm_clear.removeClass('go_in');
				}  

			}, 2000);
		});
		
		cm_result_wrapper.rollbar({
			scroll: 'vertical',
			autoHide: true,	
			pathPadding: '5px',
			sliderOpacity: 0.2
		});
		
		cm_clear.click(function() {
			$(this).removeClass('go_in');
			cm_input.val('');
		});
		
		if($('.compare_list_table').length > 0){
			var tb_sticky = $('.compare_list_table').offset().top;
			if(mweb_header_sticky){
				$('.table-compare').addClass('tb_sticky_over');
			}
			$(window).scroll(function(event){
				var tb_current = $(this).scrollTop();
				if (tb_current > tb_sticky){
					$('.table-compare').addClass('tb_sticky');
				} else {
					$('.table-compare').removeClass('tb_sticky');
				}
			});
		}			
	}
	
	
	Module.ajax_notify_actions = function() {
		var self = this;
		
		
		var notify_warp = $('.notify_warp');
		$('.notify_filter li').off('click').on('click', function(e) {
			e.preventDefault();
			
			var btn = $(this);
			if( btn.hasClass('is_active') )
				return false;
			
			$('.notify_filter li').removeClass('is_active');
				
			$.ajax({
				type: 'post',
				url: mweb_object.ajax_url,
				data: {
					action: 'notify_filter',
					filter: btn.data('filter'),
					security_nonce : mweb_object.nonce 
				},
				beforeSend: function (xhr) {
					btn.addClass('is_active');
					notify_warp.html('<div class="ajax-loader"></div>');
				},
				success: function (res) {
					if(res.data.html){
						notify_warp.html(res.data.html);
					}
					if(res.data.message){
						self.add_notice( res.data.message, '&nbsp', 'error' );
					}
				}

			});
		});

		self._body.on('click', '.notify_item .el_more', function() {
			var btn = $(this);
			btn.parents('.meta_notify').next().slideToggle();
			if( btn.next('.el_rstatus').hasClass('read') )
				return false;
			
			var data = {
				'action': 'notify_detail',
				'nid': btn.closest('.notify_item').data('id'),
				'security_nonce' : mweb_object.nonce  
			};
			jQuery.post(mweb_object.ajax_url, data, function(response) {
				if (response.success){
					btn.next('.el_rstatus').removeClass('unread').addClass('read').text('خوانده شده');
				}
			});
		});
		
	}
	
	
	Module.ajax_order_opr = function() {
		$( "#order_opr" ).submit(function( e ) {
			var e_form = $("#order_opr");
			e.preventDefault();

			$.ajax({
				type: 'post',
				url: mweb_object.ajax_url,
				data: $(this).serialize(),
				beforeSend: function (xhr) {
					e_form.prepend('<div class="ajax-loader">');
					$("input[type=submit]", e_form).val('در حال ارسال اطلاعات ...'); 
				},
				success: function (res) {
					if (res.success) {
						$("input[type=submit]",e_form).val(res.data.message); 
						setTimeout(function(){
							location.href = res.data.href;
						},3000);
						e_form.find('.ajax-loader').remove();							
						
					}else{
						$("input[type=submit]",e_form).val(res.data.message); 
						setTimeout(function(){
							$("input[type=submit]",e_form).val('ارسال مجدد'); 
							e_form.find('.ajax-loader').remove();
						},3000);
					}
				}

			});				
		});
	}
	
	
	Module.ajax_product_price_survey = function() {
		
		$('.check_store_online').delegate('input[name="unfair_pricing[is_claimed_store_online]"]', 'change', function () {
			// From the other examples
			if (!this.checked) {
				$('.unfair_pricing_onlinestore').hide();
				$('.unfair_pricing_store').show();
			}else{
				$('.unfair_pricing_store').hide();
				$('.unfair_pricing_onlinestore').show();
			}
		});
		
		$('.user_can_ps').on('click', function (e) {
			
			e.preventDefault();
			$('#pricing_observed_price').val($('.price_survey_question').data('observed-price'));

			if ($(this).data('value') === 'no') {
				$('#is_price_competitive').val(0);
				$('#unfair_pricing_form').validate().resetForm();
				$("#unfair_pricing").modal({
					showClose: false,       
				});
			} else {
				$('#is_price_competitive').val(1);
				$('#unfair_pricing_form').trigger('submit');
			}
		});
		
		$('.close_unfair_pricing').on('click', function(){
			$.modal.close();
		});
		
		$( "#unfair_pricing_form" ).submit(function( e ) {
			e.preventDefault();
			var e_form = $("#unfair_pricing");
			e_form.append('<div class="res_msg">');
			$.ajax({
				type: 'post',
				url: mweb_object.ajax_url,
				data: $(this).serialize(),
				beforeSend: function (xhr) {
					$("input[type=submit]",e_form).hide(); 
					$(".res_msg", e_form).text('در حال ارسال اطلاعات ...'); 
				},
				success: function (res) {
					if (res.success) {
						$(".res_msg", e_form).addClass('res_success').text(res.data.message); 
						setTimeout(function(){
							//$(".close_unfair_pricing",e_form).trigger('click');
							$.modal.close();
							$('.price_survey_question').remove();
						},2000);
						
					}else{
						$(".res_msg",e_form).addClass('res_error').text(res.data.message);
						setTimeout(function(){
							$(".res_msg",e_form).text();
							$("input[type=submit]",e_form).show(); 
						},3000);
					}
				}

			});
			
		});
	}
	
	
	Module.ajax_wishlist = function() {
		
		var self = this;
		
		$('.add_to_wishlist').off('click').on('click', function(e) {				
			var el_btn = $(this);
			if(el_btn.hasClass('user_logged') && !el_btn.parent().hasClass('added')){
				e.preventDefault();
				
				var p_id = el_btn.data('product-id');
				var p_action = el_btn.data('action');
				$.ajax({
					type: 'post',
					url: mweb_object.ajax_url,
					data: {
						action: 'mweb_wishlist_action',
						type: p_action,
						post_id : p_id,
						security_nonce : mweb_object.nonce 
					}, 
					beforeSend: function (xhr) {
						el_btn.parent().addClass('loading');
					},
					success: function (res) {
						if ( res.success ) {
							if( p_action == 'wl_add' ){
								el_btn.parent().removeClass('loading').addClass('added');
								el_btn.attr('data-original-title', 'مشاهده علاقه مندی ها');
								if(el_btn.hasClass('single_add_to_wishlist') && el_btn.find('b').length)
									el_btn.find('b').text('مشاهده علاقه مندی ها');
								el_btn.attr('href', res.data.url);
								if($('#wl_count').length > 0){
									$('#wl_count').text(parseInt(res.data.count));
								}
							}else if( p_action == 'wl_remove' ){
								el_btn.closest( ".item" ).remove();
								self.add_notice( res.data.message, '&nbsp', 'success' );

							}
							
						}else{
							el_btn.parent().removeClass('loading');
							if( p_action == 'wl_add' ){
								el_btn.attr('data-original-title', 'خطا در عملیات');
							}else if(p_action == 'wl_remove'){
								el_btn.text('خطا');
								setTimeout(function() {
									el_btn.text('تلاش دوباره');
								}, 200);
							}
						}
					}

				});
				
			}else{
				$('html,body').animate({scrollTop:0},'slow');
				el_btn.attr('data-original-title', 'ابتدا ورود کنید');
				self.add_notice( 'ابتدا وارد سایت شوید', '&nbsp', 'error' );
				//$('.login_user_btn').trigger( "click" )
			}				
		});
		
		
		$('.btn_add2wishlist').off('click').on('click', function(e) {				
			var el_btn = $(this);
			var org_title = el_btn.find('p').text();
			if(el_btn.hasClass('user_logged') && !el_btn.hasClass('added')){
				e.preventDefault();
				
				var p_id = el_btn.data('post-id');
				var p_action = el_btn.data('action');
				
				$.ajax({
					type: 'post',
					url: mweb_object.ajax_url,
					data: {
						action: 'mweb_wishlist_action',
						type: p_action,
						post_id : p_id,
						security_nonce : mweb_object.nonce 
					}, 
					beforeSend: function (xhr) {
						el_btn.addClass('loading');
					},
					success: function (res) {
						if ( res.success ) {
							if( p_action == 'wl_add' ){
								el_btn.removeClass('loading').addClass('added');
								el_btn.find('p').text('مشاهده علاقه مندی ها');
								el_btn.attr('href', res.data.url);
							}else if( p_action == 'wl_remove' ){
								el_btn.closest( ".item" ).remove();
							}
							
						}else{
							el_btn.removeClass('loading');
							if( p_action == 'wl_add' ){
								el_btn.find('p').text('خطا در عملیات');
								setTimeout(function() {
									el_btn.find('p').text(org_title);
								}, 2000);
							}else if(p_action == 'wl_remove'){
								el_btn.text('خطا');
								setTimeout(function() {
									el_btn.text('تلاش دوباره');
								}, 200);
							}
						}
					}

				});
				
			}else{
				el_btn.find('p').text('ابتدا وارد سایت شوید');
				self.add_notice( 'ابتدا وارد سایت شوید', '&nbsp', 'error' );
				setTimeout(function() {
					el_btn.find('p').text(org_title);
				}, 2000);
			}				
		});
		
		
		
	}
	
	
	Module.init_buy_later = function() {
		
		var self = this;
		
		$('.cart_tabs li').on('click', function(e) {	
			$('.cart_tabs li').removeClass('is_active');
			$('.cart_tabs_content').addClass('hide');
			$(this).addClass('is_active');
			$($(this).data('target')).removeClass('hide');
		});
		
		this._body.on('click', '.buy_later', function(e) {				
			var el_btn = $(this);
			e.preventDefault();
			
			var p_id = el_btn.data('product_id');
			var v_id = el_btn.data('variation_id');
			var p_action = el_btn.data('action');
			
			$.ajax({
				type: 'post',
				url: mweb_object.ajax_url,
				data: {
					action: 'buy_later_list',
					type: p_action,
					product_id : v_id > 0 ? v_id : p_id,
					security_nonce : mweb_object.nonce 
				}, 
				beforeSend: function (xhr) {
					el_btn.addClass('is_active');
				},
				success: function (res) {

					if ( res.success ) {
						el_btn.removeClass('is_active');
						if( res.data.state == 'added' ){
							el_btn.closest( 'tr' ).find('.remove').trigger('click');	
						}
						$('#buy_later_wrap').html( res.data.html );
						//if( res.data.count )
							$('.buy_later_count').text(res.data.count);
						
						if( res.data.state == 'deleted' ){
							//if( el_btn.hasClass('product_type_simple') ){
								if( !el_btn.hasClass('remove_buy_later') ){
									window.location = el_btn.attr('href');
									return;
								}
							//}else if( el_btn.hasClass('product_type_variable') ){
								//window.open(el_btn.attr('href'), '_blank');
							//}
						}
						
					}else{
						if( res.data.state == 'repetitive' )
							el_btn.closest( 'tr' ).find('.remove').trigger('click');	
						
						if( res.data.state == 'must_be_login' ){
							el_btn.attr('data-original-title', 'ابتدا ورود کنید');
							el_btn.attr('data-toggle', 'tooltip');
							self.add_notice( 'ابتدا وارد سایت شوید', '&nbsp', 'error' );
						}
					
						el_btn.removeClass('is_active');
						el_btn.addClass('has_error');
						setTimeout(function() {
							el_btn.removeClass('has_error');
						}, 500);
					}
				}

			});
		});
			
	}
	
	
	Module.ajax_report_product = function() {
		
		$( "#report_product_form" ).submit(function( e ) {
			e.preventDefault();
			var e_this = $(this);
			var e_parent = $("#report_product_wrap");
			e_parent.append('<div class="res_msg">');
			$.ajax({
				type: 'post',
				url: mweb_object.ajax_url,
				data: $(this).serialize(),
				beforeSend: function (xhr) {
					e_parent.prepend('<div class="ajax-loader">');
					e_this.addClass('is_blur_2');
					$(".res_msg", e_parent).text('در حال ارسال اطلاعات ...'); 
				},
				success: function (res) {
					if (res.success) {
						$(".res_msg", e_parent).addClass('res_success').text(res.data.message); 
						e_this.hide();		
					}else{
						$(".res_msg", e_parent).addClass('res_error').text(res.data.message);
						setTimeout(function(){
							$(".res_msg", e_parent).remove(); 
						},3000);
					}
					
					e_parent.find('.ajax-loader').remove(); 
					e_this.removeClass('is_blur_2');
						
				}

			});
			
		});
	}
	
	
	Module.ajax_quick_view_product = function() {
		var self = this;
		var quick_view_wrap = $('#quick_view');
		$('.quickview-btn').on('click', function(e) {
			e.preventDefault();
			
			var btn = $(this);
			var product_id = btn.data('product_id');

			$.ajax({
				type: 'post',
				url: mweb_object.ajax_url,
				data: {
					action: 'mweb_quick_view',
					product_id: product_id,
				},
				beforeSend: function (xhr) {
					btn.addClass('waiting');
				},
				success: function (res) {
					if(res.success){
						if(res.data.html){
							quick_view_wrap.html(res.data.html);
							self.ajax_single_add_to_cart();
							self.init_single_product( '.single_p_gallery' );
							self.init_variation_form();
						}
					}else{
						quick_view_wrap.html(res.data.html);
					}
					quick_view_wrap.find(".quickview_summary").rollbar({
						scroll: 'vertical',
						autoHide: true,	
						pathPadding: '10px',
						sliderOpacity: 0.2
					});
					quick_view_wrap.addClass('is_active');
					btn.removeClass('waiting');
					// Variation Form
					var form_variation = quick_view_wrap.find('.variations_form');
					form_variation.each( function() {
						$( this ).wc_variation_form();
					});
					form_variation.trigger( 'check_variations' );
					form_variation.trigger( 'reset_image' );
			
				}

			});
		});
		
		this._body.on('click', '.close_quickview', function() {
			quick_view_wrap.removeClass('is_active');
			quick_view_wrap.empty();
		});
		
	}
	
	
	Module.convertToFaDigit = function (a) {
		var b = '' + a;
		for (var c = 48; c <= 57; c++) {
			var d = String.fromCharCode(c);
			var e = String.fromCharCode(c + 1728);
			b = b.replace(new RegExp(d.toString(), "g"), e.toString())
		}
		return b;
	}
	
	
	Module.formatCurrency = function (num, isRial, symbol) {
		num = num.toString().replace(/\$|\,/g, "");
		if (isNaN(num)) num = "0";
		var sign = (num == (num = Math.abs(num)));
		num = Math.round(num * 100 + 0.50000000001);
		num = Math.round(num / (isRial ? 1000 : 100)).toString();
		for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
			num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
		return (((sign) ? "" : "-") + num + " " + symbol);
	},
	
	
	Module.initPriceChart = function (chart_data, elm_wrap = '') {
		var self = this;		
		if(typeof Highcharts == 'undefined')
			return false;
		
		if (!chart_data || chart_data.Series.length < 1) {
			return;
		}

		createProductPriceChart(chart_data, elm_wrap);

		function convertToPersianDate(date) {
			var months = {
				1: 'فروردین',
				2: 'اردیبهشت',
				3: 'خرداد',
				4: 'تیر',
				5: 'مرداد',
				6: 'شهریور',
				7: 'مهر',
				8: 'آبان',
				9: 'آذر',
				10: 'دی',
				11: 'بهمن',
				12: 'اسفند'
			}
			var units = (date || '1397/1/1').split('/');
			var year = units[0].substr(-2),
				month = parseInt(units[1]),
				day = parseInt(units[2]);
			return self.convertToFaDigit(day + ' ' + months[month] + ' ' + year);

		}

		function createProductPriceChart(data, elm_wrap) {
			
			
			var price_chart_content = elm_wrap.length > 0 ? elm_wrap : $('.price_chart_content');
			
			Highcharts.setOptions({
				lang: {
					numericSymbols: null,
					thousandsSep: ",",
					decimalPoint: ""
				}
			});

			var maxCount = (data.Series || []).reduce(function (acc, item) {
				return Math.max(acc, (item || {data: []}).data.length);
			}, 0) || 1;
			
			var legend_flag = data.Series.length;
			
			//price_chart_content.empty();
			var priceChart = price_chart_content.highcharts({
				chart: {
					//type: 'line',
					//height: 400,
					style: {
						fontFamily: 'inherit',
					}
				},
				credits: {
					enabled: false
				},
				title: false,
				xAxis: {
					categories: data.Categories,
					title: {
						text: null
					},
					tickInterval: Math.ceil(maxCount / 6.),
					labels: {
						align: 'bottom',
						style: {
							color: '#979797',
							fontSize: '11px',
							fontFamily: "inherit",
							whiteSpace: 'nowrap'
						},
						formatter: function () {
							return convertToPersianDate('' + this.value);
						}
					}
				},
				yAxis: {
					title: {
							enabled: false
						},
					gridLineDashStyle: "Dot",
					
					labels: {
						//x: -60,
						align: "center",
						style: {
							color: '#555555',
							fontSize: '13px',
							fontWeight: "normal",
							fontFamily: "inherit"
						},
						formatter: function () {
							return self.convertToFaDigit(self.formatCurrency(this.value , false, ''));
						}
					},
					plotLines: [{
						value: 0,
						width: 1,
						color: "#808080"
					}]
				},
				tooltip: {
					valueSuffix: ' تومان',
					rtl: true,
					crosshairs: {
						width: 1,
						color: 'wheat',
						dashStyle: 'Dot'
					},
					style: {
						fontFamily: "inherit",
						fontWeight: "normal",
						padding: '20px',
						textAlign: 'right'
					},
					backgroundColor: "#FFF",
					borderColor: "#ccc",
					borderRadius: 7,
					borderWidth: 1,
					shadow: false,
					followPointer: false,
					shared: false,
					useHTML: true,

				},
				legend: {
					enabled: legend_flag > 1 ? true : false,
					backgroundColor: "#FFF",
					align: "right",
					verticalAlign: "bottom",
					rtl: true,
					useHTML: true,
					margin: 20,
					padding: 10,
					width: '100%',
					itemDistance: 50,
					itemMarginTop: 5,
					itemMarginBottom: 5,
					borderColor: "#F5F6F8",
					borderRadius: 7,
					borderWidth: 1,
					itemStyle: {
						fontWeight: "normal",
						fontFamily: "inherit",
						fontSize: "11px",
						color: "#777"
					},
					labelFormatter: function (a, b) {
						return self.convertToFaDigit(this.name);
					}
				},
				plotOptions: {
					line: {
						marker: {
							enabled: true,
							fillColor: '#FFFFFF',
							lineWidth: 2,
							lineColor: null, // inherit from series
							radius: 4,
							symbol: "circle",
							states: {
								hover: {
									enabled: false
								}
							}
						}
					}
				},

				series: data.Series.map(function (item, index) {
					item.data = item.data.map(function (it, ind) {
						if (it && it.length === 2)
							return [it[0], it[1]];
						return [it[1]];
					});
					return item;
				})
			});
			
			$('#price_chart_wrap').on($.modal.BEFORE_CLOSE, function(event, modal) {
				$(this).remove();
			});

		}
	}
	
	
	
	Module.ajax_get_price_chart_product = function() {
		var self = this;
		self._body.on('click', '.btn_price_chart', function (e) {
			e.preventDefault();
			var btn = $(this);
			var product_id = btn.data('product_id');
			var def_html = '<div class="modal" id="price_chart_wrap"><div class="price_chart_content"><div class="ajax-loader"></div></div></div>';

			$.ajax({
				type: 'post',
				url: mweb_object.ajax_url,
				data: {
					action: 'get_price_chart_data',
					product_id: product_id,
				},
				beforeSend: function (xhr) {
					$(def_html).appendTo('body').modal();
				},
				success: function (res) {
					if(res.success){
						if(res.data){
							$('<div class="price_chart_title">تخفیف ها و قیمت جشنواره ها در قیمت فروش در نظر گرفته نمی شود</div>').insertBefore('.price_chart_content');
							if (res.data && res.data.Series.length > 1) 
								$('<div class="price_chart_note">توجه : برای فیلتر کردن نمایش ها در نمودار بر روی عنوان هریک کلیک کنید .</div>').insertAfter('.price_chart_content');
							self.initPriceChart(res.data);
						}
					}else{
						$('.price_chart_content').empty();
						$('.price_chart_content').html(res.data);
					}
				}
			});
		});
		
		
		$('.dynamic_price_chart').each(function() {

			var this_chart = $(this);
			var product_id = this_chart.data('product_id');

			$.ajax({
				type: 'post',
				url: mweb_object.ajax_url,
				data: {
					action: 'get_price_chart_data',
					product_id: product_id,
				},
				beforeSend: function (xhr) {
					this_chart.html('<div class="ajax-loader"></div>');
				},
				success: function (res) {
					if(res.success){
						if(res.data){
							self.initPriceChart(res.data, this_chart);
							if (res.data && res.data.Series.length > 1) {
								$('<div class="price_chart_note">توجه : برای فیلتر کردن نمایش ها در نمودار بر روی عنوان هریک کلیک کنید .</div>').insertAfter(this_chart);
							}
						}
					}else{
						this_chart.empty();
						this_chart.html(res.data);
					}
				}
			});
			
		});
		
		
	}
	
	
	Module.ajax_delivery_estimate = function() {
		var self = this;
		function get_times(this_state){
			
			if( typeof this_state == 'undefined' )
				return false;
			
			var delivery_list = $('.order_dtime_list');

			setTimeout(function() {
				if ( typeof this_state.val() != 'undefined' ){
					$.ajax({
						type: 'post',
						url: mweb_object.ajax_url,
						data: {
							action: 'delivery_time',
							city : this_state.val(),
							delivery : JSON.stringify(delivery_list.data('times')),
							_wpnonce: mweb_object.nonce
						},
						beforeSend: function (xhr) {
							delivery_list.addClass('mweb-loader');
							$( "#place_order" ).prop( "disabled", true );
						},
						success: function (res) {
							delivery_list.removeClass('mweb-loader');
							if(res.success){
								if(res.data.html){
									delivery_list.html(res.data.html);
								}
							}else{
								delivery_list.html('');
							}
							$( "#place_order" ).prop( "disabled", false );
						}

					});
				}
				
			}, 1500);
		}
		
		if( $('.order_dtime_list').length > 0 ){
			
			var billing_c = $('#billing_city');
			if(billing_c.length > 0){
				if(billing_c.val()){
					get_times(billing_c);
				}
			}
			
			self._body.on('change', '#billing_city, #shipping_city', function () {
				get_times($(this));
			});
			
			self._body.on('change', 'select.shipping_method, input[name^="shipping_method"]', function () {
				if ( $( '#ship-to-different-address input' ).is( ':checked' ) ) {
					$( '#shipping_city' ).trigger( 'change' );
				}else{
					$( '#billing_city' ).trigger( 'change' );
				}
			});
			
		}
		
		if( mweb_peyk == true ){
			self._body.on('click', 'input[name="delivery_times"]', function () {
				
				var elm_this = $(this);
				var elm_wrap = $('.order_dtime_list');
				
				$.ajax({
					type: 'post',
					url: mweb_object.ajax_url,
					data: {
						action: 'delivery_capacity',
						time_str : elm_this.val(),
						_wpnonce: mweb_object.nonce
					},
					beforeSend: function (xhr) {
						elm_wrap.addClass('mweb-loader');
						$( "#place_order" ).prop( "disabled", true );
					},
					success: function (res) {
						elm_wrap.removeClass('mweb-loader');
						
						if( res.success ){
							$( "#place_order" ).prop( "disabled", false );
							
						}else{
							if( res.data.available != true ){
								elm_this.prop( 'checked', false );
								elm_this.prop( 'disabled', true );
							}
							self.add_notice( res.data.message, '&nbsp', 'error' );
						}
					}

				});
				
			});
		}

		
	}
	
	
	Module.ajax_cart_operation = function() {
		
		
		
		var self = this;
		
		if( (typeof mweb_loop_quantity !== 'undefined' && !mweb_loop_quantity) || self._body.hasClass('elementor-editor-active') ){
			return false;
		}

		$('.add-to-cart-wrap').on('click', '.reduced_quantity_btn', function(e) {				
			e.preventDefault();
			var el_btn = $(this);
			var el_parent = $(this).parent();
			var p_id = el_parent.find('.add_to_cart_button').data('product_id');
			
			$.ajax({
				type: 'post',
				url: mweb_object.ajax_url,
				data: {
					action: 'remove_cart_loop',
					product_id : p_id,
					security_nonce : mweb_object.nonce 
				}, 
				beforeSend: function (xhr) {
					el_parent.addClass('loading');
				},
				success: function (res) {
					if (res.success) {
						if (res.data.message) 
							self.add_notice( res.data.message, '&nbsp', 'info' );
						el_parent.removeClass('loading');
						var el_quantity = el_parent.find('.quantity_loop');
						el_quantity.text(res.data.new_qty);
						self._body.trigger('wc_fragment_refresh');
						if(res.data.new_qty > 1){
							el_btn.addClass('more');
						}else{
							el_parent.find('.add_to_cart_button').removeClass('hide').removeClass('added');
							el_parent.removeClass('has_quantity');
						}
					}else{
						//this._body.trigger('wc_fragments_ajax_error');
					}
				}

			});
			
		});
		
		$('.add-to-cart-wrap').on('click', '.increase_quantity_btn' , function(e) {				
			e.preventDefault();
			$(this).parent().find('.add_to_cart_button').trigger('click');
		});
		
		
		self._body.on('adding_to_cart', function (event, $button) {
			if(!$button.parent().hasClass('has_quantity') && $button.hasClass('ajax_add_to_cart')){
				$button.parent().append('<span class="quantity_loop">0</span><span class="reduced_quantity_btn"><svg class="pack-theme" viewBox="0 0 24 24"><use xlink:href="'+iconp+'#minus"></use></svg></span><span class="increase_quantity_btn"><svg class="pack-theme" viewBox="0 0 24 24"><use xlink:href="'+iconp+'#add"></use></svg></span>');
				$button.parent().addClass('loading');
			}
		});
		
		self._body.on('added_to_cart', function(event, fragments, cart_hash, $button) {
			
			if( $button.hasClass('ajax_add_to_cart') ){
				$button.addClass('hide');
				setTimeout(function () {
					$button.parent().addClass('has_quantity').removeClass('loading');
					$('a.added_to_cart').addClass('hide');
					var el_quantity = $button.parent().find('.quantity_loop');
					el_quantity.html(parseInt(el_quantity.text()) + 1);
					if( parseInt(el_quantity.text()) > 1 ){
						$button.parent().find('.reduced_quantity_btn').addClass('more');
					}
					
				}, 500);
				
				if( typeof fragments.notices_html !== 'undefined' ){
					var className = 'success',
					result = fragments.notices_html;
					
					if ($(result).hasClass('woocommerce-error'))
						className = 'error';
					
					if ($(result).hasClass('woocommerce-info'))
						className = 'info';
					
					var $message = $(result).html();
					
					if ($message) 
						self.add_notice( $message, '&nbsp', className );
				}
			}
		});	

		$('.add-to-cart-wrap').on('click', '.quantity_loop' , function(e) {				
			e.preventDefault();	
			var el_parent = $(this).parent();
			el_parent.addClass('is_open');
			setTimeout(function () {
				el_parent.removeClass('is_open');
			}, 3000);
		});	
		
	}
	
	
	
	Module.ajax_single_add_to_cart = function() {
		
		var self = this;
		
		self._document.on('click', '.single_add_to_cart_button:not(.disabled)', function (e) {

			var $thisbutton = $(this),
					$form = $thisbutton.closest('form.cart'),
					//quantity = $form.find('input[name=quantity]').val() || 1,
					//product_id = $form.find('input[name=variation_id]').val() || $thisbutton.val(),
					data = $form.find('input:not([name="product_id"]), select, button, textarea').serializeArrayAll() || 0;

			$.each(data, function (i, item) {
				if (item.name == 'add-to-cart') {
					item.name = 'product_id';
					item.value = $form.find('input[name=variation_id]').val() || $thisbutton.val();
				}
			});
			

			e.preventDefault();

			self._body.trigger('adding_to_cart', [$thisbutton, data]);

			$.ajax({
				type: 'POST',
				url: woocommerce_params.wc_ajax_url.toString().replace('%%endpoint%%', 'add_to_cart'),
				data: data,
				beforeSend: function (response) {
					$thisbutton.removeClass('added').addClass('loading');
				},
				complete: function (response) {
					$thisbutton.addClass('added').removeClass('loading');
				},
				success: function (response) {

					if (response.error && response.product_url) {
						window.location = response.product_url;
						return;
					}
				self._body.trigger('adding_to_cart', [$thisbutton, data]);
					self._body.trigger('added_to_cart', [response.fragments, response.cart_hash, $thisbutton]);
				},
			});

			return false;

		});
	  
	}
	
	
	
	Module.ajax_single_add_to_cart_override = function() {
		
		$('form.cart').on('submit', function(){
			var form = $(this);
			var selectedWarranty = $('#pextra_option').find(':selected').val();

			if(selectedWarranty){
				var warrantyField = form.find('input[name="warranty_option"]');
				if(warrantyField.length){
					warrantyField.val(selectedWarranty);
				} else {
					form.append('<input type="hidden" name="warranty_option" value="'+selectedWarranty+'">');
				}
			}
		});
	
		if( !mweb_ajax_single && !this._body.hasClass('.single-product') )
			return false;
		var self = this;
		
		$('form.cart').on('submit', function(e) {
			e.preventDefault();

			var form = $(this);
			form.block({ message: null, overlayCSS: { background: '#fff', opacity: 0.6 } });

			var formData = new FormData(form[0]);
			formData.append('add-to-cart', form.find('[name=add-to-cart]').val() );
			
			/* if( $('#pextra_option').length ){
				formData.append('warranty_option', $('#pextra_option').find(":selected").val());
			} */

			$.ajax({
				url: wc_add_to_cart_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'mweb_add_to_cart' ),
				data: formData,
				type: 'POST',
				processData: false,
				contentType: false,
				complete: function( response ) {
					response = response.responseJSON;

					if ( ! response ) {
						return;
					}

					if ( response.error && response.product_url ) {
						window.location = response.product_url;
						return;
					}

					// Redirect to cart option
					if ( wc_add_to_cart_params.cart_redirect_after_add === 'yes' ) {
						window.location = wc_add_to_cart_params.cart_url;
						return;
					}

					var $thisbutton = form.find('.single_add_to_cart_button'); //
//						var $thisbutton = null; // uncomment this if you don't want the 'View cart' button

					// Trigger event so themes can refresh other areas.
					self._body.trigger( 'added_to_cart', [ response.fragments, response.cart_hash, $thisbutton ] );

					// Remove existing notices
					$( '.woocommerce-error, .woocommerce-message, .woocommerce-info' ).remove();

					
					if( typeof response.fragments.notices_html !== 'undefined' ){
						
						var className = 'success',
						result = response.fragments.notices_html;
						
						if ($(result).hasClass('woocommerce-error'))
							className = 'error';
						
						if ($(result).hasClass('woocommerce-info'))
							className = 'info';
						
						var $message = $(result).html();
						
						if ($message) 
							self.add_notice( $message, '&nbsp', className );
					
					}

					form.unblock();
				}
			});
			
			
		});

	}

	
	
	Module.ajax_remindme_product = function() {
		var self = this;
		/* $(".remindme_icon").click(function (e) {	
			if($(this).prev().hasClass('fadeout')) {
				$("#remindme_form").removeClass("fadeout").addClass("fadein");
			}else{
				$("#remindme_form").removeClass("fadein").addClass("fadeout");
			}	
		});
		
		$(".close_remindme").click(function(e) {
			$("#remindme_form").removeClass("fadein").addClass("fadeout");
		}); */

		$("#remindme_button").click(function(e) {
					
			if($("#remindme_email").val() == '') {
				var incorrect_entry = $("#incorrect_entry").html();
				$("#remindme_email").focus();
				$("#remindme_email").attr('placeholder', incorrect_entry );
				$("#remindme_email").css('border','1px solid #f20');
				
			}else{	
				var email = $("#remindme_email").val();
				var target = $(".remindme_icon").attr('id');
				var product_id = $("#product_id").html();
				var product_price = $("#product_price").html();
				
				if( !self.validate_email_address( email ) ) { 
					$("#remindme_email").focus();
					$("#remindme_email").css('border','1px solid #f20');
				}else {
					$.ajax({
						type: "POST",
						url: mweb_object.ajax_url ,
						datatype: "html",
						data: {'action': 'remindme_addemail', 'email': email, 'target': target, 'product_id': product_id, 'product_price': product_price},
						success: function(response) {
							$("#description").hide();
							$("#remindme_form").html(response);
							$(".remindme_icon").addClass("remindme_on");

						},error:function(response){
							$("#description").hide();
							$("#remindme_form").html(response);
						}
					});
				}
			}
		});
	
	}
	
	
	Module.init_single_product = function( wrap ) {
		
		var self = this, flag_switch = false , var_zoom = true , var_zoomtype = mweb_zoomtype , var_popup = true , var_lenssize = 200 , var_lensshape = 'round';
		if( mweb_zoomtype == 'none' )
			var_zoom = false;
		
		if ( var_zoom == '1' && ( !('ontouchstart' in document) || ( ('ontouchstart' in document) ) ) ) {
			var zoomcfg = {
				responsive: false, zoomType: var_zoomtype, cursor: 'grab'
			}
			if ( var_zoomtype == 'inner' ) {
				zoomcfg.borderSize = 0;
			}else if ( var_zoomtype == 'lens' ) {
				zoomcfg.lensSize = var_lenssize; zoomcfg.lensShape = var_lensshape;
			}
		}
		
		var elm_direction = $(wrap).data('direction'), centeredslides = false;
		if( !$(wrap).length ){
			return false;
		}		
		
		var el_product = $('.product'),
			el_product_thumbs = $('.product-thumbs'),
			el_product_images = $('.product-images');

		var has_thumb = el_product_thumbs.length > 0 ? true : false;
				
		var gallery_cog = {
			spaceBetween: 5,
		};						
					
		if( el_product_thumbs.length > 0){							
			
			var thumbnailSlides = el_product_thumbs.find('.swiper-slide'),
				el_productThumbWraper = el_product_thumbs.find(".swiper-wrapper");
				
			var	slidesNum = thumbnailSlides.length;
			var	visibleNum = 4;
			
			if (elm_direction == 'vertical') {
				var productImageHeight = $('.single_p_gallery .inner .images .woocommerce-main-image').height();
				//if (el_product_thumbs.length > 0) {
					$('.product-thumbs').height((productImageHeight));
				//}
				centeredslides = true; 
			}
				 
			var galleryThumbs = new Swiper('.product-thumbs', {
				direction: elm_direction,
				spaceBetween: 8,
				slidesPerView: 5,
				//freeMode: true,
				centeredSlides: centeredslides,
				/* watchSlidesVisibility: true,
				watchSlidesProgress: true, */
				speed: 700,
				longSwipesMs: 800,
				touchAngle: 90,
				grabCursor: true,
				touchRatio: 3,
				preventClicks: false,
				slideToClickedSlide: true,
				on: {
					init: function () {
						if (slidesNum > visibleNum) {
							el_product_thumbs.addClass('initial-slides-position');
						}
						
					},
					setTranslate: function () {
						if(centeredslides)
						if (this.clickedIndex < visibleNum - 1 || this.activeIndex < visibleNum - 1){
							el_productThumbWraper.css("transform", "translate3d(0px, 0px, 0px)");
							el_productThumbWraper.css("-webkit-transform", "translate3d(0px, 0px, 0px)");
						}
					},
					transitionEnd: function () {
						if(centeredslides)
						if (this.clickedIndex < visibleNum - 1 || this.activeIndex < visibleNum - 1){
							/* el_productThumbWraper.css("transform", "translate3d(0px, 0px, 0px)");
							el_productThumbWraper.css("-webkit-transform", "translate3d(0px, 0px, 0px)"); */
						}
					},
					
				}, 
			});
			
			$.extend( gallery_cog, {
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				thumbs: {
					swiper: galleryThumbs
				}, 
				on: {
					slideChangeTransitionStart: function () {
						//if (self.windowWidth > 979 && !self.isTouchDevice && !fixed_style) {
							//if (!this.isBeginning) {
								galleryThumbs.slideTo(this.activeIndex);
							//}
						//}
					},
					/* reachBeginning: function () {
						//if (self.windowWidth > 979 && !self.isTouchDevice && !fixed_style) {
							galleryThumbs.slideTo(0);
						//}
					}, */
				},
			});
										
		}else{
			
			//var gallery_single = $(".product-images");
			if( el_product_images.data('slider') != '' ){
				var gallery_cog = el_product_images.data('slider');
			}
		
			$.extend( gallery_cog, {
				navigation: {
					nextEl: '.mweb_gallery_next',
					prevEl: '.mweb_gallery_prev',
				},
			}); 
							
		}

		var imgsrc = [];
		var $popup_btn = el_product.find('#btn_popup_images');
		var $embed_video_btn = el_product.find('.embed_video');
		var $direct_video_btn = el_product.find('.direct_video');
		el_product_images.find('img').each(function() {
			imgsrc.push({src: this.src});
		});

	   if (typeof $.magnificPopup !== 'undefined') {
			$($popup_btn).off('click').on('click', function(e) {
				e.preventDefault();
				$.magnificPopup.open({items: imgsrc , gallery: { enabled: true}, type: 'image'});
			});
			$embed_video_btn.magnificPopup({ type: 'iframe',	mainClass: 'mfp-fade',  removalDelay: 160,	preloader: false,	fixedContentPos: false	});
			$direct_video_btn.magnificPopup({ 
				type: 'inline',	
				mainClass: 'popup_inline',  
				removalDelay: 160,	
				preloader: false,	
				fixedContentPos: false,
				callbacks: {
					open: function () {
						$(this.content).find('video')[0].play();

					},
					close: function () {
						$(this.content).find('video')[0].pause();
					}
				}
			});
			$('.woocommerce-product-gallery__image').magnificPopup({
				type:'image',
				gallery: { enabled: true},
				removalDelay: 500,
				delegate: 'a',
				zoom: {
					enabled: true,
					duration: 500, 
					easing: 'ease', 
					opener: function (element) {
						return element.find('img');
					}
				}
			});
		} 
						
		if ( var_zoom == '1' && ( !('ontouchstart' in document) || ( ('ontouchstart' in document) ) ) && $(window).width()>768 ) {
			el_product_images.find('img').each(function() {
				//var $this = $(this);
				zoomcfg.zoomContainer = $(this).parent();
				$(this).elevateZoom(zoomcfg);
			});
		}
				

		if( el_product_images.length > 0 ){
			var galleryTop = new Swiper( '.product-images', gallery_cog );
		}

		if ( !$('form.variations_form').length ) {
			return;
		}else{
			var $product       = $('.variations_form').closest( '.product' ),
				$product_img   = $product.find('div.images .woocommerce-main-image');
			$product.data('img-src', $product_img.attr('src'));
			$product.data('img-datasrc', $product_img.attr('data-src'));
			$product.data('img-title', $product_img.attr('title'));
			$product.data('img-alt', $product_img.attr('alt'));
			$(document).on( 'reset_image', '.variations_form', function(event) {
				event.preventDefault(); 
				var $product_images = $product.find('.product-images'),
					$product_thumbs = $product.find('.product-thumbs');
				if ($product_images.length) {
					if( $product.find('.gallery_type_h').length ){
						galleryTop.slideTo( 0 );
					}else if( $product.find('.gallery_type_v').length ){
						//$product_images.slick('slickGoTo', 0);
					}
					$product_img.each(function() {
						$(this).attr( 'src', $product.data('img-src') )
							   .attr( 'data-src', $product.data('img-datasrc') )
							   .attr( 'alt', $product.data('img-alt') )
							   .attr( 'srcset', '' );
						var elevateZoom = $(this).data('elevateZoom');
						if (typeof elevateZoom != 'undefined') {
							elevateZoom.swaptheimage($(this).attr( 'src' ), $(this).attr( 'data-src' ));
						}
						
					}); 
					var imgsrc = $product_images.data('imgsrc'), imgtitle = $product_images.data('imgtitle');
					if (typeof imgsrc != 'undefined' && typeof imgtitle != 'undefined') {
						imgsrc.unshift({src: $product.data('img-src')});   imgtitle[0] = $product.data('img-title');
					}
					$product_images.data('imgsrc', imgsrc); $product_images.data('imgtitle', imgtitle);
				}
				if (has_thumb) {
						galleryTop.slideTo( 0 );
						galleryThumbs.slideTo( 0 );
					var $thumb_img      = $product.find('.woocommerce-main-thumb');
					if ( $thumb_img.parents('.img').attr('data-thumb') ) {
						$thumb_img.attr( 'src', $thumb_img.parents('.img').attr('data-thumb') ).attr( 'srcset', '' );
					} 
				}
			});
			
			// Found variation
			$(document).on( 'found_variation', '.variations_form', function(event, variation) {
				
				if (typeof variation == 'undefined') {
					return;
				}
				
				var $product_images = $product.find('.product-images'),
					$product_thumbs = $product.find('.product-thumbs');
				if ($product_images.length) {							
					try {
						galleryTop.slideTo( 0 );
					}catch(error) {
						//
					}
				}
				var imgsrc 		= $product_images.data('imgsrc'),
					imgtitle 	= $product_images.data('imgtitle');
				if ( has_thumb ) {
					galleryTop.slideTo( 0 );
					//$product_thumbs.find('.owl-item:eq(0)').click();
					galleryThumbs.slideTo( 0 );
				}
				
				var $thumb_img 		  = $product.find('.woocommerce-main-thumb'),
					variation_fullsrc = variation.image.full_src,
					variation_src 	  = variation.image.src,
					variation_title   = variation.image.caption,
					variation_thumb   = ( typeof variation.image.thumb_src != 'undefined' ) ? variation.image.thumb_src : variation.image.src;
				if ( variation_src ) { 
					$product_img.attr( 'src', variation_src ).attr( 'data-src', variation_fullsrc ).attr( 'alt', variation_title ).attr( 'srcset', '' ).attr('data-zoom-image', variation_fullsrc);
					$thumb_img.attr( 'src', variation_thumb ).attr( 'srcset', '' );
					if (typeof imgsrc != 'undefined' && typeof imgtitle != 'undefined') {
						imgsrc.unshift({src: variation_fullsrc}); imgtitle[0] = variation_title;
					}
				} else { 
					$product_img.attr( 'src', $product.data('img-src') ).attr( 'data-src', $product.data('img-datasrc') ).attr( 'alt', $product.data('img-alt') ).attr( 'srcset', '' ).attr('data-zoom-image', $product.data('img-datasrc'));
					$thumb_img.attr( 'src', $thumb_img.parents('.img').attr('data-thumb') ).attr( 'srcset', '' );    
					if (typeof imgsrc != 'undefined' && typeof imgtitle != 'undefined') {
						imgsrc.unshift({src: src});  imgtitle[0] = o_title;
					}
				}
				$product_images.data('imgsrc', imgsrc); $product_images.data('imgtitle', imgtitle);
			
				// Swap Image Zoom
				$product_img.each(function() {
					var elevateZoom = $(this).data('elevateZoom');
					if (typeof elevateZoom != 'undefined') {
						elevateZoom.swaptheimage($(this).attr( 'src' ), $(this).attr( 'data-src' ));
					}
				}); 
			}); 
			
			 
		
			
		}
		
		
		$(document.body).on('woocommerce_variation_has_changed', function () {
			const $form = $('.variations_form'); 
			const $quantityInput = $form.find('input.qty');
			const $selectedVariation = $form.find('.variation_id').val(); 

			if ($selectedVariation) {
				const variationData = $form.data('product_variations') || [];
				const variation = variationData.find(v => v.variation_id == $selectedVariation);

				if (variation) {
					$quantityInput.attr({
						min: variation.min_qty || 1,
						max: variation.max_qty || '',
						step: variation.step_qty || 1,
					});

					$quantityInput.val(variation.min_qty || 1);
				}
			}
		});

	}


	Module.init_gallery_new_v = function( ) {
		var gimages = $('.product-images-static');
		if( gimages.length <= 0 )
			return false;
		
		gimages.attr( 'data-srcx', gimages.find('.woocommerce-main-image').attr( 'src') ).attr( 'data-srcxx', gimages.find('.woocommerce-main-image').attr( 'src') );
		$(document).on( 'found_variation', '.variations_form', function(event, variation) {
			
			if (typeof variation == 'undefined') {
				return;
			}
			
			var imgsrc 		= gimages.data('imgsrc'),
				imgtitle 	= gimages.data('imgtitle');
				
			var $thumb_img 		  = gimages.find('.woocommerce-main-image'),
				variation_fullsrc = variation.image.full_src,
				variation_src 	  = variation.image.src,
				variation_title   = variation.image.caption;
				//variation_thumb   = ( typeof variation.image.thumb_src != 'undefined' ) ? variation.image.thumb_src : variation.image.src;
			if ( variation_src ) { 
				gimages.attr( 'src', variation_src ).attr( 'data-src', variation_fullsrc ).attr( 'alt', variation_title ).attr( 'srcset', '' ).attr('data-zoom-image', variation_fullsrc);
				$thumb_img.attr( 'src', variation_src ).attr( 'data-src', variation_src ).attr( 'srcset', '' );
				
			} else { 
				$thumb_img.attr( 'src', gimages.data('srcx') ).attr( 'data-src', gimages.data('srcxx') );
			}
			
			$( document ).on( 'click', '.variations_form .reset_variations', function(event) {
				$thumb_img.attr( 'src', gimages.data('srcx') ).attr( 'data-src', gimages.data('srcxx') );
			}); 
			
		
		}); 
		
		
			
	}
	
		
		
	Module.init_variation_form = function( $wrap ) {

		if ( typeof $wrap == 'undefined') var $wrap = '';
		if ( $wrap != '' ) {
			$wrap = $wrap+' .type-product.product-type-variable';
		}else{
			$wrap = '.type-product.product-type-variable';
		}
		if ( $($wrap).length  && typeof mw_arr_attr !== 'undefined' ) { 
			$($wrap).find('.variations select').each(function(){
				var select = $(this), select_div, var_attr = mw_arr_attr[select.attr('name')];
				if ( typeof var_attr == 'undefined') { return false; } 
				
				if (var_attr.type == 'select' || var_attr.type == '') { 
					//select.niceSelect();
					//selectظ.on('change', function() {
						//select.niceSelect('update');
					//});
					//$( ".variations_form" ).on( "woocommerce_variation_select_change", function () {
					//});
					//return false;
					select.show();
				}else{
					select_div = $('<div />', {
									'class': 'sellect-wrap',
									'data-atrrname':select.attr('name'),
								}).insertAfter(select);
					select.hide();

					select.find( 'option' ).each(function (){
						var option_old = $(this), option;
						if ( option_old.attr('value')!= '' ) {
							var inner_opt, class_sellect, val_opt = var_attr.key_val[option_old.attr('value')];
							
							if( typeof val_opt == 'undefined' )
								return;
							
							if (var_attr.type == 'color') {
								inner_opt = $('<span/>');
								var outer_opt = $('<i/>', {
												'style':'background:' + val_opt,
											}).appendTo(inner_opt);
								class_sellect = ' color';
							}else if (var_attr.type == 'image') {
								inner_opt = $('<span/>', {
												'style':'background-image:url("' + val_opt + '")'
											});
								class_sellect = ' image';
							}else if (var_attr.type == 'text') {
								inner_opt = $('<span/>', {
												'html': val_opt
											});
								class_sellect = ' text';
							}
							
							if (var_attr.type != 'select') {
								option = $('<div/>', {
											'class': 'option'+class_sellect,
											'data-toggle':'tooltip',
											'data-original-title':option_old.text(),
											'data-value': option_old.attr('value')
										}).appendTo(select_div);
								inner_opt.appendTo(option);
								if ( option_old.val() == select.val() ){
									option.addClass('selected');
								}
								var data_variations = $('.variations_form').data('product_variations');
								option.on('click', function () {
									
									if( $(this).hasClass('disable') ){
										return false;
									}
									if ( $(this).hasClass('color') ) {
										$(this).closest('tr').find('.el_p_c').remove();
									} 
									if ( $(this).hasClass('selected') ) {
										select.val('').change();
									} else {
										select.val( option_old.val() ).change();
										if ( $(this).hasClass('color') ) {
											$(this).closest('tr').find('th label').append( '<span class="el_p_c">'+option_old.text()+'</span>' );
										} 
									}
									
									
									
									if( data_variations )
									   $('.sellect-wrap .option').addClass('disable');
									
									var e_this = $(this);
									var e_key = e_this.parents('.sellect-wrap').data('atrrname');
									
									$.each( data_variations, function( i, value ) {
										if( value.attributes[e_key] == e_this.data('value') && ( value.is_in_stock == false ) ){
											var e_count = Object.keys(value.attributes).length;
											$.each(value.attributes, function( i, value ) {
												if(value != ''){
													if($("div.option[data-value='" + value +"']").hasClass('disable')){
														$("div.option[data-value='" + value +"']").removeClass('disable');
													}else{
														$("div.option[data-value='" + value +"']").addClass('disable');
													}
													if( e_count > 1 )
													e_this.removeClass('disable');
												}
											});	
										} else{
											//e_this.parents('.sellect-wrap').find('div.option').siblings().removeClass('disable');
											if( value.attributes[e_key] == e_this.data('value') && ( value.is_in_stock == true ) ) {
												$.each(value.attributes, function( i, value ) {
													if(value != ''){
														$("div.option[data-value='" + value +"']").removeClass('disable');
													}else{
														$(".sellect-wrap[data-atrrname='" + i +"'] .option").removeClass('disable');
													}
												});	
											}
										}
									});
				
									setSelectedOpt( $(this) );
								});
							}
						}
					});
				}
				
			});
			$( document ).on( 'click', '.variations_form .reset_variations', function(event) {
				$('.variations_form .sellect-wrap .option').removeClass('selected').removeClass('disable');
				$('.el_p_c').remove();
				//$('select').niceSelect('update');
			});
			
		}
		
		var price_detail_wrap = $('.jewel_price_details');
		if( price_detail_wrap.length ){ 
			var price_detail_data = price_detail_wrap.data( 'price_details' );
			$(document).on('found_variation', 'form.cart', function( event, variation ) {   
				if(price_detail_data){
					if( price_detail_data[variation.variation_id] != '' ){
						price_detail_wrap.html(price_detail_data[variation.variation_id]);
					}else{
						price_detail_wrap.html(price_detail_data['parent']);
					}
				 }
			});
			$(document).on('hide_variation', 'form.cart', function( event, variation ) {   
				price_detail_wrap.html(price_detail_data['parent']);
			}); 
		}
		
		function setSelectedOpt( option ) {
			option.toggleClass('selected');
			option.siblings().removeClass('selected').removeClass('disable');
		}
		
	}
	
	
	Module.init_sticky_add_to_cart = function(){
	
		var el_adcart = $('.sticky_btn_add_to_cart');	
		var single_btn = $('.single_add_to_cart_button');
		
		if ( !single_btn.length || !el_adcart.length ) {
			return;
		}
		
		var el_offset = single_btn.offset();
		var el_footer = $('.footer_wrap');
		if ( !el_footer.length ){
			el_footer = $('.elementor-location-footer');
		}
		
		
		if($(window).width() >= 768){
			$(window).scroll(function(e){
				var currentScroll = $(this).scrollTop();
				if (currentScroll > el_offset.top && el_adcart.offset().top < (el_footer.offset().top - el_adcart.height()) ){
					el_adcart.addClass('active');
				} else {
					el_adcart.removeClass('active');
				}
			});
		}else{
			$(window).scroll(function(e){
				var currentScroll = $(this).scrollTop();
				if (currentScroll > el_offset.top){
					el_adcart.addClass('active');
				} else {
					el_adcart.removeClass('active');
				}
			});
		}
		
		el_adcart.on('click', function(e){
			$('html,body').animate({scrollTop:el_offset.top - 150},'slow');
			if( !single_btn.hasClass('disabled') )
				single_btn.trigger('click');
		});
					
		if( single_btn.length > 0 ){
			$('.el_addtocart').on('click', function(e){
				$('html,body').animate({scrollTop:el_offset.top - 150}, 'slow');
			});	
		}else{
			if( $('.el_addtocart').length > 0 ){
				$('.el_addtocart').addClass('disable');
			}
		}
		
	}
	
	
	Module.init_wc_tabs = function(){
		var self = this;
		if( $('.scroll_wc_tab').length && $('.wc-tabs').length ){
			
			var el_content_section = $('.woocommerce-Tabs-panel');
			var el_navigation = $('.wc-tabs');
			
			var el_navigation_offset = el_navigation.offset().top;
			var el_navigation_height = el_navigation.height();
			
			el_navigation.on('click', 'a', function(event){
				if(self._window.scrollTop() < 100 )
					return false;
				event.preventDefault(); 
				$('body,html').animate({
					scrollTop: $(this.hash).offset().top
				}, 800);
			});
			
			self._window.on('scroll', function(){
				self.mweb_update_wc_nav_tabs(el_content_section);
				
				 var windowTop = self._window.scrollTop();
				if ( el_navigation_offset + el_navigation_height < windowTop ) {
					el_navigation.addClass('is_active');
				} else {
					el_navigation.removeClass('is_active');
				}
	
			});
			
			self.mweb_update_wc_nav_tabs(el_content_section);
		}

	
	}
	
	
	Module.mweb_update_wc_nav_tabs = function( el_content_section ){
		var self = this;
		el_content_section.each(function(){
			var sectionName = $(this).attr('id');
			var navigationMatch = $('.wc-tabs a[href="#' + sectionName + '"]');
			if( ($(this).offset().top - self._window.height()/2 < self._window.scrollTop()) &&
				  ($(this).offset().top + $(this).height() - self._window.height()/2 > self._window.scrollTop()))
				{
					navigationMatch.parent().addClass('active');
				}
			else {
				navigationMatch.parent().removeClass('active');
			}
		});
	}
	
	
	Module.init_popup = function( $photo , $link ) {
	
		var self = this;
		if( self.mweb_getCookie('run_popup') == null ){
			$.magnificPopup.open({
				mainClass: 'mweb-popup',
				tLoading: '',
				tClose: 'دیگر نمایش نده',
				items: { src: $('<div class="white-popup"><a href="'+$link+'"><img src="'+$photo+'" /></a></div>') },
				type: 'inline'
			}, 0);
		}
	}
	
	Module.init_swiper_vtabs = function() {
		var swiper_c = $('.swiper_vtabs');
		if(swiper_c.length > 0){
			var configs = swiper_c.data('slider') || {};
			if(this.is_mobile == true){
				configs.slidesPerView = 'auto';
				configs.freeMode = true;
				configs.watchSlidesVisibility = false;
				configs.centeredSlides = false;
				//configs.autoplay = false;
				delete(configs.breakpoints);
			}
			configs.observer = true;
			configs.observeParents = true;
			configs.lazy = {
				loadPrevNext: true,
			};
			var newswiper = new Swiper('.swiper_vtabs', configs );
		}
		
	}
	
	Module.init_swiper_slider = function () {
		
		var sliderSelector = ".mr-swiper",
		defaultOptions = {
			breakpointsInverse: true,
			observer: true
		};
		var jSlider = $(sliderSelector);
		if( jSlider.length > 0 ){
			jSlider.each(function (i, slider) {
				$(slider).addClass( 'mrswSlider_' + i );
				var data = $(slider).attr("data-swiper") || {};
				if (data) {
					var dataOptions = JSON.parse(data);
				}
				slider.options = $.extend({}, defaultOptions, dataOptions);
				var swiper = new Swiper('.mrswSlider_' + i, slider.options);

				if (typeof slider.options.autoplay !== "undefined" && slider.options.autoplay !== false) {
					slider.addEventListener("mouseenter", function () {
						swiper.autoplay.stop();
					});
					slider.addEventListener("mouseleave", function () {
						swiper.autoplay.start();
					});
				}
			});
		}

	}
	
	
	Module.init_slider_action = function($element) {
		
		var self = this;
		if( $element.length < 1 )
			return false;
		
		var swiper_c = $('#'+ $element.attr('id'));
		var configs = swiper_c.data('slider') || {};
	
		if( self.is_mobile == true && !$element.hasClass('no_auto') && !$element.hasClass('elm_bn_slider') ){
			configs.slidesPerView = 'auto';
			configs.freeMode = true;
			configs.watchSlidesVisibility = false;
			configs.centeredSlides = false;
			//configs.autoplay = false;
			configs.speed = 100;
			delete(configs.breakpoints);
			
			
			configs.freeModeSticky = false;  
		}
		
		if( configs.freeMode ){
			/* configs.slidesPerView = 'auto';
			delete(configs.breakpoints);
			console.log(configs); */
			configs.centeredSlides = false;
			configs.speed = 100;
			configs.freeModeSticky = false;
		}
		
		configs.observer = true;
		configs.observeParents = true;
		configs.lazy = {
			loadPrevNext: true,
		};
		var myswiper = new Swiper('#'+ $element.attr('id'), configs );

	}
	
	
	Module.init_deal_slider_action = function($element) {
		
		var slider_id = $('#'+ $element.attr('id'));
		//$(this).addClass( 'oswSlider_' + index );
		var nav_type = slider_id.data('nav');
		var pagination = [];
		if(nav_type == 'title'){
			slider_id.find(".swiper-slide .product-name a").each(function(i) {
				pagination.push('<i class="onsale_pt">' + $(this).text() + '</i>');
			});
		}else if(nav_type == 'image'){
			slider_id.find(".swiper-slide img").each(function(i) {
				pagination.push('<i class="onsale_pi" style="background-image:url(' + $(this).attr("src") + ')"></i>');
			});
		}else{
			slider_id.find(".swiper-slide .product-deal").each(function(i) {
				pagination.push('<i class="onsale_pp">' + $(this).attr("data-off") + '</i>');
			});
		}
		
		if( pagination.length < 1 ){
			return;
		}
		
		let mweb_Swiper = new Swiper ( '#'+ $element.attr('id') , {
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '.mweb-swiper-next',
				prevEl: '.mweb-swiper-prev',
			},
			speed: 500,
			effect: 'fade',
			observer: true,
			observeParents: true,
			pagination: {
			  el: '.onsale-pagination',
				clickable: true,
				renderBullet: function (index, className) {
				  return '<span class="' + className + '">' + pagination[index] + '</span>';
				},
			},
		});
		

	}
	
	
	Module.init_tab_slider_action = function() {
		var tab_slider = $('.slick_slider_wrap');
		if( tab_slider.length == 1 ){
			var titles = [];
			tab_slider.find(".swiper-slide a").each(function(i) {
				titles.push($(this).attr("title"));
			});
			if(titles.length < 1){
				return;
			}
			var mweb_Swiper = new Swiper ('.slick_slider_wrap', {
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				},
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				speed: 500,
				observer: true,
				observeParents: true,
				navigation: {
					nextEl: '.mweb-swiper-next',
					prevEl: '.mweb-swiper-prev',
				},
				pagination: {
				  el: '.swiper-pagination',
					clickable: true,
					renderBullet: function (index, className) {
					  return '<span class="' + className + '">' + titles[index] + '</span>';
					},
				},
			});
		}
		
	}
	
	
	Module.init_vertical_slider_action = function() {
		var deal_slider_v = $('.deal_slider_v');
		if( deal_slider_v.length > 0 ){
			var elm_config = deal_slider_v.data('slider') || {};
			var vswiper = new Swiper('.deal_slider_v', elm_config );
		}
	}
 
	
	Module.init_hover_slider_items_act = function ( $this ) {
			var $list = $this.closest('.swiper');
			var $next_btn = $list.find('.mweb-swiper-next');
			var $prev_btn = $list.find('.mweb-swiper-prev');
		if ( $list.length > 0 ) {
			$next_btn.css({
				'top': ($this.height() / 2 + 18) + 'px',
			});
			$prev_btn.css({
				'top': ($this.height() / 2 + 18) + 'px',
			});
			$this.hover(
				function (e) {
					$list.css({
						'padding-bottom': '84px',
						'margin-bottom': '-84px',
						'z-index': '4',
					});
					$next_btn.css({
						'top': ($this.height() / 2 + 18) + 'px',
					});
					$prev_btn.css({
						'top': ($this.height() / 2 + 18) + 'px',
					});
				}, function () {
					$list.css({
						'padding-bottom': '2px',
						'margin-bottom': '-2px',
						'z-index': '1',
					});
					
				}
			);
		}
	}
	
	
	Module.init_realtime_slider = function () {
		var swiper_c = $('.realtime_slider');
		if( swiper_c.length > 0 ){
			var mweb_Swiper = new Swiper ( '.realtime_slider', {
				slidesPerView: 1,
				autoplay: {
					delay: 5000,
				},
				navigation: {
					nextEl: '.mweb-swiper-next',
					prevEl: '.mweb-swiper-prev',
				},
				on: {
					init: function () {
						$(".slider-progress").css({
							width: "100%",
							transition: "width 5000ms"
						});
					},
				}
			});
			
			try {
				mweb_Swiper.on('slideChange', function () {
					$(".slider-progress").css({
						width: 0,
						transition: "width 0s"
					});
				});
				
				mweb_Swiper.on('transitionEnd', function () {
					$(".slider-progress").css({
						width: "100%",
						transition: "width 5000ms"
					});
				});				
			} catch (err) {
				console.log('Oops, Swiper slider must be 5.3.6 v');
			}
			
		}
	}
	
	
	Module.instagram_popup_widget = function() {
		if (typeof(mweb_instagram_popup) != 'undefined' && mweb_instagram_popup) {
			$('.instagram-el').find('a').magnificPopup({
				type: 'image',
				closeOnContentClick: true,
				closeBtnInside: true,
				removalDelay: 500,
				mainClass: 'mfp-fade',
				zoom: {
					enabled: true,
					duration: 500, // duration of the effect, in milliseconds
					easing: 'ease', // CSS transition easing function
					opener: function (element) {
						return element.find('img');
					}
				},
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0, 1]
				}
			});
		}
	}
	
	
	Module.init_countdown = function(){
		
		if($('.product-date').length >0){
			$('.product-date').each(function(i,item){
				var $this = $(this);
				var date = $(this).attr('data-date');
				$(item).countdown(date).on('update.countdown', function(event) {
					var $this = $(this).html(event.strftime(''
						+ '<div class="day"><span class="no">%D</span><span class="text">روز</span></div>'
						+ '<div class="hours"><span class="no">%H</span><span class="text">ساعت</span></div>'
						+ '<div class="min"><span class="no">%M</span><span class="text">دقیقه</span></div>'
						+ '<div class="second"><span class="no">%S</span><span class="text">ثانیه</span></div>'));
				}).on('finish.countdown', function(event) {
					$(this).html('اتمام زمان بندی').parent().addClass('disabled');
				});
			});
		} 
		
	}
	
	
	Module.init_qty = function(){
		var self = this;
		var click_throttle,
			click_throttle_timeout = 1000;
		$(document).off('click.elm_qty').on('click.elm_qty', '.increase, .reduced', function() {
			
			if (click_throttle) { clearTimeout(click_throttle); }
			
			var $this		= $(this),
				$qty		= $this.closest('.quantity').find('.qty'),
				currentVal	= parseFloat($qty.val()),
				max			= parseFloat($qty.attr('max')),
				min			= parseFloat($qty.attr('min')),
				step		= $qty.attr('step');
			
			if (!currentVal || currentVal === '' || currentVal === 'NaN') currentVal = 0;
			if (max === '' || max === 'NaN') max = '';
			if (min === '' || min === 'NaN') min = 0;
			if (step === 'any' || step === '' || step === undefined || parseFloat(step) === 'NaN') step = 1;
			
			if ($this.hasClass('increase')) {
				if (max && (max == currentVal || currentVal > max)) {
					$qty.val(max);
				} else {
					$qty.val(currentVal + parseFloat(step));
					click_throttle = setTimeout(function() { self.quantity_inputs_trigger_events($qty); }, click_throttle_timeout);
				}
			} else {
				if (min && (min == currentVal || currentVal < min)) {
					$qty.val(min);
				} else if (currentVal > 0) {
					$qty.val(currentVal - parseFloat(step));
					click_throttle = setTimeout(function() { self.quantity_inputs_trigger_events($qty); }, click_throttle_timeout);
				}
			}
		});
		
		
		self._window.on('mweb_qty_change', function(event, quantityInput) {
			if ( self._body.hasClass('open_cart_sidebar') ){
				self.mweb_mini_cart_update($(quantityInput));
			}

		});
		
	}


	Module.quantity_inputs_trigger_events = function($qty) {
		$qty.trigger('change');
		this._window.trigger('mweb_qty_change', $qty);
		
	}
	
	
	Module.mweb_mini_cart_update = function($quantityInput) {
		var self = this;
		if (self.cart_ajax) {
			self.cart_ajax.abort(); 
		}
		
		$quantityInput.closest('li').addClass('loading');
		
		var $cartForm = $('#mweb-mini-cart-form'), 
			$cartFormNonce = $cartForm.find('#_wpnonce'),
			data = {};
		
		if ( ! $cartFormNonce.length ) {
			console.log( 'mweb_mini_cart_update: Nonce field not found.' );
			return;
		}
		
		data['mweb_cart_update'] = '1';
		data['update_cart'] = '1';
		data[$quantityInput.attr('name')] = $quantityInput.val();
		data['_wpnonce'] = $cartFormNonce.val();
		
		self.cart_ajax = $.ajax({
			type:     'POST',
			url:      $cartForm.attr('action'),
			data:     data,
			dataType: 'html',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log('AJAX error - mweb_mini_cart_update() - ' + errorThrown);
				
				$('.woocommerce-mini-cart.cart_list').children('.loading').removeClass('loading');
			},
			success: function(response) {
				//$(document.body).trigger('wc_fragment_refresh').trigger('updated_cart_totals');	
				var url = woocommerce_params.wc_ajax_url;
				url = url.replace("%%endpoint%%", "get_refreshed_fragments");

				$.post(url, function(data, status){
					if ( data.fragments ){
						jQuery.each(data.fragments, function(key, value){
							jQuery(key).replaceWith(value);
						});
					}
					$(document.body).trigger( 'wc_fragments_refreshed' );	
				});
				
			},
			complete: function() {
				self.cart_ajax = null; 
			}
		});
	}
	

	Module.shop_carousel_filter = function(){
		
		$('.wd_filter').on('click', '.wd_title', function(e){
			var wd_parent = $(this).closest('.wd_filter');
			//e.preventDefault(); 
			if( wd_parent.hasClass('active') ){
				wd_parent.removeClass('active');
				$('.wd_filter_wrap').removeClass('active');
			}else{
				$('.wd_filter').removeClass('active');
				wd_parent.addClass('active');
				$('.wd_filter_wrap').addClass('active');
			}		
		});
		
	}
	
	
	Module.select_to_list_ordering = function(){
		
		if( this.is_mobile != true ){
			
			var $wrap = $('.order_as_list');
			var $select = $wrap.find('.orderby');
			if($select.length > 0){
				var $ul = $('<ul></ul>').attr('class', 'el_category_' + $select.attr('name')).attr('data-label', 'مرتب سازی بر اساس :');
				$select.children().each(function() {
					var $option = $(this);
					var text = $option.text().replace('مرتب سازی بر اساس ', '').replace('مرتب سازی بر اساس ', '').replace('مرتب سازی ', '').replace('میانگین رتبه', 'امتیاز').replace('هزینه: کم به زیاد', 'ارزان ترین').replace('هزینه: زیاد به کم', 'گران ترین');
					var text = text.replace(/مرتب[\s\u00A0\u200C‌]*سازی[\s\u00A0\u200C‌]*بر[\s\u00A0\u200C‌]*اساس/gi, '').trim();
					if($option.is(':selected')){
						$('<li></li>').attr('data-id', $option.val()).attr('class', 'is_active').text(text).appendTo($ul);
					}else{
						$('<li></li>').attr('data-id', $option.val()).text(text).appendTo($ul);
					}
				});

				$wrap.append($ul);
				
				$('.el_category_orderby').find('li').on('click', function(){
					var el_this = $(this);
					$('.el_category_orderby li').removeClass('is_active');
					el_this.addClass('is_active');
					$select.val(el_this.data('id')).change();
				});
			}
		}
	}
	
	
	Module.init_content_more = function(){
		
		if ( $('.entry_content_inner').length > 0 ){
			var elm_entry = $('.entry_content_inner');
			var elm_entry_more = $('.entry_content_more');
			if( elm_entry.height() >= 500 ){
				elm_entry.addClass('has_more');
				elm_entry_more.show();
				elm_entry_more.click(function(e){
					e.preventDefault();
					elm_entry.toggleClass('active');
					$(this).toggleClass('active');
				});
			}
		}
		
	}
	
	
	Module.init_smoothAccordion = function ( element ) {
			
		var accordionContent = $(element).find(".accordion-item-content");
		var link = $(element).find(".accordion-item-title");
		var ico = $(element).find("i.fal");
		link.click(function (e) {
			var $cnt = $(this);
			if ($cnt.hasClass("active")) {
				$cnt.next().removeClass("active").slideUp();
				$cnt.removeClass("active");
				$cnt.find("i.fal").removeClass("fa-angle-down");
				$cnt.find("i.fal").addClass("fa-angle-up");
			} else {
				$cnt.next().addClass("active").slideDown();
				$cnt.addClass("active");
				$cnt.find("i.fal").removeClass("fa-angle-up").addClass("fa-angle-down");
			}
			e.preventDefault();
		});
	
	}
		
		
	Module.init_listAccordion = function ( element ) {
		$(element).each(function () {
			var $main = $(this);
			$main.find('.cat-parent').each(function () {
				if ($(this).hasClass('current-cat-parent')) {
					$(this).addClass('show-sub');
					$(this).children('.children').slideDown(400);
				}
				$(this).children('.children').before('<span class="carets"><svg class="pack-theme" viewBox="0 0 24 24"><use xlink:href="'+iconp+'#arrow-square-down"></use></svg></span>');
			});
			$main.children('.cat-parent').each(function () {
				var curent = $(this).find('.children');
				$(this).children('.carets').on('click', function () {
					$(this).parent().toggleClass('show-sub');
					$(this).parent().children('.children').slideToggle(400);
					$main.find('.children').not(curent).slideUp(400);
					$main.find('.cat-parent').not($(this).parent()).removeClass('show-sub');
				});
				var next_curent = $(this).find('.children');
				next_curent.children('.cat-parent').each(function () {
					var child_curent = $(this).find('.children');
					$(this).children('.carets').on('click', function () {
						$(this).parent().toggleClass('show-sub');
						$(this).parent().parent().find('.cat-parent').not($(this).parent()).removeClass('show-sub');
						$(this).parent().parent().find('.children').not(child_curent).slideUp(400);
						$(this).parent().children('.children').slideToggle(400);
					})
				});
			});
		});
	}
	
	
	Module.init_header_function = function(){
		var self = this;
		if(mweb_header_sticky){
			var offset_top = $('header').height();
			$(window).scroll(function(event){
				var currentScroll = $(this).scrollTop();
				if (currentScroll > offset_top ){
					$('.custom_sticky').addClass('my_sticky');
				} else {
					$('.custom_sticky').removeClass('my_sticky');
				}
			});
		} 
		
		if(mweb_header_sticky){
			var header = $('.head_mobile');
			if( header.length ){
				var wc_tfix = $('.wc_fixed_tab');
				$('body.body_ismobile').addClass('is_head_sticky');
				var previousScroll = 0;
				$(window).scroll(function(event){
					var currentScroll = $(this).scrollTop();
					if (currentScroll > previousScroll){
						if(currentScroll > 115 ){
							header.removeClass('visible');
							header.removeClass('position_top');
						}
						if( wc_tfix.length ){
							wc_tfix.removeClass('topoffset');
						}

					} else {
						if(currentScroll < 155 ){
							header.addClass('position_top');
						}
						header.addClass('visible');
						
						if( wc_tfix.length ){
							if( (wc_tfix.offset().top - 67) < currentScroll ){
								wc_tfix.addClass('topoffset');
							} else {
								wc_tfix.removeClass('topoffset');
							}
						}
						
					}
					previousScroll = currentScroll;
				});
			}
		}
		
		
		var mweb_off_canvas_button = $('#mweb-trigger');
		var mweb_off_canvas_button_close = $('#mweb-close-off-canvas');

		mweb_off_canvas_button.click(function() {
			self._body.toggleClass('mobile-js-menu');
			return false;
		});

		mweb_off_canvas_button_close.click(function() {
			self._body.removeClass('mobile-js-menu');
			return false;
		});
		self.site_mask.click(function() {
			self._body.removeClass('mobile-js-menu');
			return false;
		});


		var mobile_menu = $('.mobile-menu-wrap');
		var sub_mobile_menu = mobile_menu.find('li.menu-item-has-children');
		$('.explain-menu').unbind('click').bind('touchend click', function(e) {
			e.preventDefault();
			$(this).parent('a').toggleClass('active').siblings('ul').slideToggle(500);
		});

		sub_mobile_menu.find('a').click(function(event) {
			event.stopPropagation();
		});

		mobile_menu.click(function(event) {
			event.stopPropagation();
		});
		
		$('.item-dir-vertical').find('.sub-menu>li').first().addClass('is_hovered');

		$('.item-dir-vertical').hover(function(e){
			e.preventDefault();
			$(this).find('.sub-menu>li').hover(function(){
				$('.item-dir-vertical .sub-menu>li').removeClass('is_hovered');
				$(this).addClass('is_hovered');
			});
		});
		
		$('.menu_title').click(function (e) {
			e.preventDefault();
			$(this).parent().toggleClass( "active" );
			$('.head_3_menu').slideToggle(300);
		}); 
		
		if( mweb_acc_digits ){
			$('.login_btn, .comment_login, .user_cant_ps').addClass('digits-login-modal');
		}
		
		$('.login_btn, .comment_login, .user_cant_ps, .showlogin').click(function () {
			if( mweb_ajax_account ){
				$('html,body').animate({scrollTop:0},'slow');
				self._body.toggleClass('account_area');
				return false;
			}
		}); 
		self.site_mask.click(function() {
			self._body.removeClass('account_area my_account_s sidebar_open open_cart_sidebar open_filter_sidebar open_categories_sidebar');
		});
		
		$('.create_account').click(function() {
			$('.login_wrap').hide('fast');
			$('.register_wrap').fadeIn();
			return false;
		});
		
		$('.close_modal').click(function() {
			$('.register_wrap').hide('fast');
			$('.login_wrap').fadeIn();
			return false;
		});
		
		$('.hs_search_btn').click(function() {
			$('.search_overlay').addClass('active');
		});
		
		$('.search_toggle').click(function() {
			$('.search_overlay').removeClass('active');
		});

	}
	
	
	Module.init_footer_function = function(){
		
		$('.gototop, .go_up').click(function(){
			$('html,body').animate({scrollTop:0}, 'slow'); return false;
		});
	
	}
	
	
	Module.init_single_function = function(){
		
		var self = this;
		
		/* if ($('li.questions_tab').length > 0){
			var hash  = window.location.hash;
			var url   = window.location.href;
			if ( hash.toLowerCase().includes( 'question-' ) || hash === '#tab-questions' ) {
				$( 'li.questions_tab a' ).click();
			}
		} */
		
		
		self._document.on("click", ".wcad_show-all", function() {
			if ($("#productattrs").length === 0) {
				let fullBox = `
						<div class="full_box" id="productattrs">
						  <div class="full_box_header">
							<h5>مشخصات محصول</h5>
							<span class="close_full_box"><svg class="pack-theme" viewBox="0 0 24 24"><use xlink:href="${iconp}#close-square"></use></svg></span>
						  </div>
						  <div class="full_box_body"></div>
						</div>
					  `;
				$("body").append(fullBox);
			}

			let attrs = $(".elm_pattr_wrap").clone();
			attrs.find(".hide").removeClass("hide"); 

			$("#productattrs .full_box_body").html(attrs);

			$("#productattrs").addClass("active");
			$("body").addClass("noscroll");
		});

		self._document.on("click", "#productattrs .close_full_box", function() {
			$("#productattrs").remove();
			$("body").removeClass("noscroll");
		});
		
		self._document.on('click', '.review_toggle', function() {
			$(this).closest('.result_review_wrap').find('.result_review_inner').slideToggle(300);

			$(this).toggleClass('active');
		});
		
		function setupCounter($textarea, $counter, max) {
			$textarea.on('input', function() {
				var length = $(this).val().length;
				$counter.text(length);
				if (length >= max) {
					$counter.css('color', 'red');
				} else {
					$counter.css('color', 'var(--maincolor)');
				}
			});
		}

		setupCounter($('#question-text'), $('#question-count'), 100);
		setupCounter($('#answer-text'), $('#answer-count'), 500);
		
		$('#ask-question-btn').on('click', function(e) {
			e.preventDefault();
			$('#ask-question-modal').modal();
		});

		$('.pquestion-reply-btn').on('click', function(e) {
			e.preventDefault();
			var parentId = $(this).data('id');
			$('#answer-parent-id').val(parentId);
			$('#answer-question-modal').modal();
		});

		$('#ask-question-form').on('submit', function(e) {
			e.preventDefault();
			$.post(mweb_object.ajax_url, $(this).serialize(), function(res) {
				var msg_t = res.success ? 'success' : 'error' ;
				self.add_notice( res.data.message, '&nbsp', msg_t );
				if (res.success) {
					$.modal.close();
				}
			});
		});

		$('#answer-question-form').on('submit', function(e) {
			e.preventDefault();
			$.post(mweb_object.ajax_url, $(this).serialize(), function(res) {
				var msg_t = res.success ? 'success' : 'error' ;
				self.add_notice( res.data.message, '&nbsp', msg_t );
				if (res.success) {
					$.modal.close();
				}
			});
		});
	
		
		$('#advantage-input , #disadvantages-input').on('change keyup' , function() {
			var input_point = $(this);
			var input_param = input_point.val();
			if(input_param){
				input_point.next().fadeIn();
			}else{
				input_point.next().hide();
			}
		});
		
		$(".advantages").delegate(".add_point_advantage", 'click', function (e) {
			//e.preventDefault();
			if ($('.advantages_list').find(".advantage_item").length >= 5) {
					return;
				}
			var advantage_input = $(this).prev();
			if (advantage_input.val().trim().length > 0) {
					$('.advantages_list').append('<div class="advantage_item">\n' +
						advantage_input.val() +
						'<button type="button" class="remove_point"><svg class="pack-theme" viewBox="0 0 24 24"><use xlink:href="'+iconp+'#minus"></use></svg></button>\n' +
						'<input type="hidden" name="advantages[]" value="' + advantage_input.val() + '">\n' +
						'</div>');

					advantage_input.val('').change();
					advantage_input.focus();
				}
			
		}).delegate(".remove_point", 'click', function (e) {
			$(this).parent('.advantage_item').remove();
		});
		
		$(".disadvantages").delegate(".add_point_disadvantage", 'click', function (e) {
			//e.preventDefault();
			if ($('.disadvantages_list').find(".disadvantage_item").length >= 5) {
					return;
				}
			var disadvantage_input = $(this).prev();
			if (disadvantage_input.val().trim().length > 0) {
					$('.disadvantages_list').append('<div class="disadvantage_item">\n' +
						disadvantage_input.val() +
						'<button type="button" class="remove_point"><svg class="pack-theme" viewBox="0 0 24 24"><use xlink:href="'+iconp+'#minus"></use></svg></button>\n' +
						'<input type="hidden" name="disadvantages[]" value="' + disadvantage_input.val() + '">\n' +
						'</div>');

					disadvantage_input.val('').change();
					disadvantage_input.focus();
				}
			
		}).delegate(".remove_point", 'click', function (e) {
			$(this).parent('.disadvantage_item').remove();
		});
		
	
		if( $('.rating_wrap').length > 0 ){
			var fa_label = ["خیلی بد", "بد", "معمولی", "خوب", "عالی"].reverse();
			var rev_number = [1,2,3,4,5].reverse();
			$(".rate_slider")
			.slider({
				max: 5,
				min: 1,
				value: 3,
				step: 1,
				change: function( e, ui ) {
					//$(".out").html( numerals[ ui.value ] )
					$(e.currentTarget).next('input').val(rev_number[ui.value-1]);
				}
			})
			.slider("pips", {
				first: "pip",
				last: "pip",
				//rest: "label",
				//labels: fa_label
			})
			.slider("float", {
				labels: fa_label
			});
		}
		
		$('.recommended_warp select').niceSelect();		
		
		$('.btn_more_description').click(function(e){
			e.preventDefault();
			var $elm_this = $(this);
			$(this).prev('.has_more').toggleClass('is_active', function() {
			  if ( $( this ).is( ".is_active" ) ) {
				$elm_this.text('بستن');
			  } else {
				$elm_this.text('مشاهده');
			  }
			});
		});
		
		
		if( $('.wcc_media_wrap').length ){
			let dt = new DataTransfer(); 
			const input = $("#wcc_media_file")[0];
			var output = $('#wcc_media_output');
			var message = $('.wcc_error');
			
			var total_size = 0;
			var counter = input.files ? input.files.length : 0;
			
			$('#commentform')[0].encoding = 'multipart/form-data';


			$(".wcc_media_btn").on('click', function(e){
				$("#wcc_media_file").click();
			}); 
			
			
			
			$('#wcc_media_file').on('change', function(e){
				e.preventDefault(); 
				message.empty();
				var flag = false;
				var file_count = counter + e.target.files.length;
				
				if( file_count > 5 ){
					message.empty().text('خطا: حداکثر تعداد مجاز تصاویر 5 می باشد');
				} 

				if (e.target.files) {
					for (let i = 0; i < e.target.files.length; i++) {
						total_size += e.target.files[i].size;
						if( total_size <= 500000 && file_count <= 5 ){ 
							dt.items.add(e.target.files[i]);
							output.append("<div class='wcc_media_selected'><img src='" + URL.createObjectURL(e.target.files[i]) + "' /><span class='wcc_media_remove' data-id='" + (counter++) + "'><svg class='pack-theme' viewBox='0 0 24 24'><use xlink:href='"+iconp+"#close-square'></use></svg></span></div>");
						}else{
							total_size -= e.target.files[i].size;
							flag = true;
							break;
						}
					}
				}
				input.files = dt.files;
				
				if( flag && file_count <= 5 )
					message.empty().text('خطا: حداکثر حجم مجموع تصاویر نباید از 500 کیلوبایت بیشتر باشد');

			});


			this._window.on('click', '.wcc_media_remove', function(e){
				let index = $(this).data("id");
				let dtRemove = new DataTransfer();
				const { files } = input;
				for (let i = 0; i < files.length; i++) {
					const file = files[i];
					if (index !== i){
						dtRemove.items.add(file);
					}else{
						total_size -= file.size;
						counter--;
					}
				}
				dt = dtRemove;
				input.files = dt.files
				if (input.files) {
					output.empty();
					for (let i = 0; i < input.files.length; i++) { 
						output.append("<div class='wcc_media_selected'><img src='" + URL.createObjectURL(input.files[i]) + "' /><span class='wcc_media_remove' data-id='" + i + "'><svg class='pack-theme' viewBox='0 0 24 24'><use xlink:href='"+iconp+"#close-square'></use></svg></span></div>")
					}
				}
				
			});
		}
		
		
		this._body.on('click', '.jewel_dtprice_btn', function(e) {
			e.preventDefault();
			var btn = $(this);
			var product_id = btn.data('id');
			var def_html = '<div class="modal" id="jewel_price_detail"><div id="jewel_modal_content"><div class="ajax-loader"></div></div></div>';

			$.ajax({
				type: 'post',
				url: mweb_object.ajax_url,
				data: {
					action: 'get_jewel_price_detail',
					product_id: product_id,
					security_nonce : mweb_object.nonce 
				},
				beforeSend: function (xhr) {
					if( !$('#jewel_price_detail').length ){
						$(def_html).appendTo('body').modal();
					} else {
						$('#jewel_price_detail').modal();
						$('#jewel_modal_content').html('<div class="ajax-loader"></div>');
					}
				},
				success: function (res) {
					if(res.success){
						if(res.data){
							$('#jewel_modal_content').html(res.data.html);
						}
					}else{
						$('#jewel_modal_content').html(res.data.message);
					}
				}
			});
		});

		
		//if( mweb_vstock == true ){
			$('form.variations_form').on('show_variation', function(event, variation) {
				const stock_element = $('.product_stock');
				if( stock_element.length > 0 ){
					var stock_status = $('.product_stock span');
					const svgIcon = $('.product_stock .pack-theme use');
					if (variation.is_in_stock) {
						const stockQuantity = variation.variation_stock || 'موجود';
						const stockText = !isNaN(stockQuantity) && mweb_vstock == true ? 'موجودی: ' + stockQuantity : 'موجود';
						stock_status.html(stockText);
						svgIcon.attr('xlink:href', iconp + '#tick-square');
						stock_element.removeClass('no_avl');
					} else {
						stock_status.html('ناموجود');
						svgIcon.attr('xlink:href', iconp + '#close-square');
						stock_element.addClass('no_avl');
					}
				} else {
					if( mweb_vstock == true ){
						var stock_status = $('.vstock_status');
						if (variation.is_in_stock) {
							const stockQuantity = variation.variation_stock || 'موجود';
							const stockText = !isNaN(stockQuantity) ? 'موجودی: ' + stockQuantity : 'موجود';
							stock_status.html(stockText);
						} else {
							stock_status.html('ناموجود');
						}
					}
				}
				
			});
		
		//}
		
		
		
		//this._body.on( 'init', '.wc-tabs-wrapper, .woocommerce-tabs', function() {
			
			if ( this._window.width() > 980 ) {
				var $stickyComment = $('.elm-sticky_cmLeft');
				if ($stickyComment.length) {
					$stickyComment.theiaStickySidebar({
						additionalMarginTop: 20
					});
				} 
			}
			
		//});
		
		
		$(document).on('click', '.single_add_to_cart_button', function(e) {
			var relatedProductId = $('#add_related_product').is(':checked') ? $('#add_related_product').val() : '';

			$(this).closest('form.cart').find('input[name="related_product_id"]').remove();
			if (relatedProductId) {
				$('<input>').attr({
					type: 'hidden',
					name: 'related_product_id',
					value: relatedProductId
				}).appendTo($(this).closest('form.cart'));
			}
		});
		
		
		if( $('.el_acc_wrap').length > 0 ){
			var relatedProductPrice = $('.el_acc_wrap .price').data('price'); 
			if( relatedProductPrice > 0 || relatedProductPrice !== '' ){
				var priceBox = $('<div class="single_acc_price"><i>+</i>' + parseFloat(relatedProductPrice).toLocaleString() + ' <span> ' + currency_symbol + ' </span></div>');
			
				$(".single_price").before(priceBox);

				$('#add_related_product').change(function() {
					if ($(this).is(":checked")) {
						priceBox.show();
					} else {
						priceBox.hide();
					}
				});
			} 
		}
			
			
		
	}
	
	
	Module.init_sidebar_function = function(){
		var self = this;
		if ( mweb_sidebar_sticky ){
			$('.sidebar-wrap').each(function () {
				var mweb_sidebar_el = $(this);
				mweb_sidebar_el.theiaStickySidebar({
				  additionalMarginTop: 0
				 });
			});
		}
		
		$('.my_account_menu').click(function(e) {
			e.preventDefault();
			self._body.addClass('my_account_s');
		});
		
		$('.my_account_close').click(function(e) {
			e.preventDefault();
			$('.woocommerce-MyAccount-navigation').removeClass('is_active');
			self._body.removeClass('my_account_s');
		});
		
		
		self._body.on('click', '.get_sidebar', function(e) {
			var target = '.' + $(this).data('class').substring(5);
			if($(target).length){
				e.preventDefault();
				self._body.addClass( $(this).data('class') + ' sidebar_open');
			}
		});
		
		$('.close_sidebar').click(function(e) {
			e.preventDefault();
			self._body.removeClass($(this).data('class') + ' sidebar_open');
		});
		
		self._body.on('wc_fragments_loaded', function() {
			if ( $('.cart_sidebar').length ) {
				$('.get_sidebar.shop_cart').trigger('click');
			}
			
		});			
		
		self._body.on( 'wc_cart_button_updated', function( e, $button ) {
			if ( $button.closest('.add-to-cart-wrap').find( '.added_to_cart' ).length ) {
				var mybtn = $button.closest('.add-to-cart-wrap').find( '.added_to_cart' );
				mybtn.html('<svg class="pack-theme" viewBox="0 0 24 24"><use xlink:href="'+iconp+'#bag-tick"></use></svg>');
				$button.closest('.add-to-cart-wrap').attr('data-original-title', mybtn.attr('title'));
			}
			//$( button ).siblings( '.added_to_cart' ).tooltip();
			//$( button ).parents( '.add-to-cart-wrap' ).addClass( 'added' ).attr('data-original-title', $( button ).siblings( '.added_to_cart' ).text().trim());
		} );
	
	},
	
	
	Module.init_cart_function = function(){
		
		$(document).on( "change", ".cart_item .qty", function(e) {
			e.preventDefault();
			setTimeout(function(){
				$( "td.actions button" ).trigger( "click" );
			},2000); 
		});
	
	}
	
	
	Module.init_element_function = function(){
		
		var self = this;
		
		$.extend(true, $.magnificPopup.defaults, {
			tClose: 'بستن', 
			tLoading: 'بارگذاری ...', 
			gallery: {
				tPrev: 'قبل', 
				tNext: 'بعد', 
				tCounter: '%curr% از %total%' 
			},
			image: {
				tError: '<a href="%url%">عکس</a> نمی تواند بارگذاری شود.' 
			},
			ajax: {
				tError: '<a href="%url%">محتوا</a> نمی تواند بارگذاری شود.' 
			}
		});
		
		$(".sub-cat").rollbar({
			scroll: 'vertical',
			autoHide: true,	
			pathPadding: '5px',
			sliderOpacity: 0.2
		});
		
		if ( $('#nav_select').length > 0 ){
			$('#nav_select').tinyNav({
				active: 'selected',
				header: 'فهرست', 
				indent: '-'
				});
		}
		
		if ( $('#accordionfaq').length > 0 ){
			self.init_smoothAccordion('#accordionfaq');
		}
		
		if ( $('.accordion-shortcode').length > 0 ){
			self.init_smoothAccordion(".accordion-shortcode");
		}
		
		$('.more_btn').click(function(e){
			e.preventDefault();
			$(this).closest("div").find('.entry_readmore').toggleClass('fullheight');
			$(this).toggleClass('active');
		});
		
		$('.or_view').click(function(e) {
			e.preventDefault();
			$(this).parents('.morder_item').next().slideToggle();
		});
		
		
		$('.progress .progress-bar').progressbar();
		
		if ( $('.product-categories').length > 0 ){
			self.init_listAccordion('.product-categories');
		}
		
		$('.nav-tabs_trigger').click(function (e) {
			e.preventDefault();
			$(this).next('.nav-tabs').slideToggle(300);
		});
		
		$('.loadmore').click(function(e){
			e.preventDefault(); 
			$('.term-description').toggleClass('desc_show', function() {
			  if ( $( this ).is( ".desc_show" ) ) {
				$('.loadmore').text('بسـتن');
			  } else {
				$('.loadmore').text('اطلاعات بیشتر ...');
			  }
			});
		});
		
		if ( $('.xslider .elm_pg_4').length > 0 ) {
			self.init_hover_slider_items_act($('.elm_pg_4'));
		}
		
		
		$('.elm_print').click(function(e){
			e.preventDefault(); 
			var table = $(this).closest('.mweb-block-wrap').find('table');
			var win = window.open('', '');
			var style = "<style>";
			style = style + "body{direction: rtl;} table {width: 100%; font: 11px tahoma; direction: rtl}";
			style = style + "table, th, td {text-align: right; border: solid 1px #DDD; border-collapse: collapse;";
			style = style + "padding: 8px 5px; text-align: center;} .th_action, .td_action{ display: none}";
			style = style + ".td_attribute span {display: inline-block;margin: 0 4px;} .td_title a {text-decoration: none; font-weight: 500; font-size: 12px; color: #333;}";
			style = style + ".elm_td_svg { display: none;}";
			style = style + "</style>";
			win.document.write( style + table.prop('outerHTML') );
			win.document.close();
			win.print();
			win.close();
			return false;
		}); 
		
		
		$('.elm_exp_excel').click(function(e){
			var table = $(this).closest('.mweb-block-wrap').find('table');
			if( table && table.length ){
				table.table2excel({
					exclude: ".th_action",
					name: "خروجی اکسل",
					filename: "excel-export",
					fileext: ".xls",
					exclude_links: true,
					exclude_inputs: true
				}); 
			}
		}); 
		
		$('.elm_acc_link').on('click', function() {
			if( !self._body.hasClass('elementor-editor-active') )
				document.location = $(this).attr('data-href');
			return false;
		});
		
		$('.btn_print').on('click', function() {
			
			var contentToPrint = $('.elementor-widget-theme-post-content .elementor-widget-container').html(); 
			var printWindow = window.open('', 'Print Window'); 
			var styles = '';
			$('link[rel="stylesheet"]').each(function() {
				var href = $(this).attr('href');
				styles = styles + '<link rel="stylesheet" type="text/css" href="' + href + '">';
			});
			printWindow.document.write('<html><head>' + styles + '</head><body>' + contentToPrint + '</body></html>');
			printWindow.document.close();  
			printWindow.focus();
			setTimeout(function(){
				printWindow.print();
				printWindow.close(); 
			}, 2000);
			
		});
		
		$('.el-instock-switch input').on('change', function(){
			$('.woocommerce-ordering').submit();
		});
		
		if ($('.btn_fontsize').length) {

			var el_content = $('.elementor-widget-theme-post-content');
			var el_fontsize = $('.btn_fontsize').find('b');

			var el_fontsize_n = 14;

			if (el_content.length) {
				var currentSize = parseInt(el_content.css("font-size"));
				if (!isNaN(currentSize)) {
					el_fontsize_n = currentSize;
				} else {
					el_content.css("font-size", "14px");
				}
			}

			el_fontsize.text(el_fontsize_n);

			$('.btn_fontsize .increase').on('click', function () {
				if (el_content.length) {
					el_content.css("font-size", ++el_fontsize_n + "px");
				}
				el_fontsize.text(el_fontsize_n);
			});

			$('.btn_fontsize .decrease').on('click', function () {
				if (el_content.length) {
					el_content.css("font-size", --el_fontsize_n + "px");
				}
				el_fontsize.text(el_fontsize_n);
			});

		}
		

		
		$(".coupon_code").click(function(){
			var copy_text = $(this);
				copy_text.focus();
				copy_text.select();
				try {
					var successful = document.execCommand('copy');
					var msg = successful ? 'کپی شد' : 'کپی نشد';
					var old_text = copy_text.val();
					copy_text.val(msg);
					setTimeout(() => { copy_text.val(old_text) }, 2000);
				} catch (err) {
					console.log('Oops, unable to copy');
				}
		});
		
		
		
		$(".btn_copy").click(function(){
			var copy_btn = $(this);
			var copy_text = copy_btn.parent().find('.text_copy');
			copy_text.focus();
			copy_text.select();

			try {
				var successful = document.execCommand('copy');
				var msg = successful ? 'کپی شد' : 'کپی نشد';
				var old_text = copy_text.val();
				copy_text.val(msg);
				setTimeout(() => { copy_text.val(old_text) }, 2000);
			} catch (err) {
				console.log('Oops, unable to copy');
			}
		});
		
		
		$(".elm_c_btn.is_main").click(function() {
			$(this).toggleClass('is_active');
			if( $(this).hasClass('is_active') ){
				$(".elm_c_list").slideDown();
				$(".elm_c_list a").each(function(index) {
					$(this).delay(100 * (index + 1)).fadeIn().animate({ opacity: 1 }, 200);
				});
			}else{
				$(".elm_c_list a").each(function(index) {
					$(this).delay(50 * (index + 1)).fadeOut().animate({ opacity: 0 }, 50);
				});
				setTimeout(function() {
					$(".elm_c_list").slideUp('slow');
				}, 200);
			}
		});
		
		
		/* $(".btn_chk").click(function(e) {
			e.preventDefault();
			$(this).hide();
			$('#sec_2').removeClass('hide');
			$('html, body').animate({scrollTop: $('#sec_2').offset().top - 20}, 'slow');
		}); */
	
	
		jQuery(window).scroll(function() {
			jQuery(this).scrollTop() > 250 ? jQuery(".sticky_toolbox").addClass("active") : jQuery(".sticky_toolbox").removeClass("active");
		});
		
		$('.compare-button .compare , .type-product .summary .compare, .yith-wcwl-add-button .add_to_wishlist, .yith-wcwl-wishlistaddedbrowse a, .yith-wcwl-wishlistexistsbrowse a').each(function(){
			$(this).attr('data-toggle', 'tooltip').attr('data-original-title', $(this).text().trim());
		});
		
		$("body *[data-toggle='tooltip']").each(function(){
			$(this).tooltip();
		});
		
		self.lazyload_instance = new LazyLoad({
			threshold: 0,
		}); 
		

	
	}
	
	
	
	Module.init_order_review = function (){
		
		var self = this;
		
		let currentIndex = 0;
		const steps = $('.single_wc_c');
		const tabs = $('.single_wc_tab span');

		function showStep(index) {
			steps.hide();
			$(steps[index]).fadeIn();
			tabs.removeClass('active');
			$(tabs[index]).addClass('active');
		}

		showStep(currentIndex);

		$('.next-step').on('click', function() {
			if (currentIndex < steps.length - 1) {
				currentIndex++;
				showStep(currentIndex);
			}
		});

		tabs.on('click', function() {
			let targetIndex = $(this).index();
			showStep(targetIndex);
			currentIndex = targetIndex;
		});

		$('.oreview-form').on('submit', function(e) {
			e.preventDefault();
			let form = $(this);
			let formData = form.serialize();

			$.ajax({
				type: 'POST',
				url: mweb_object.ajax_url, 
				data: formData + '&action=submit_review',
				beforeSend: function() {
					form.find('button[type=submit]').prop('disabled', true).text('در حال ارسال...');
				},
				success: function(response) {
					if (response.success) {
						form.find('input, textarea, select, button').prop('disabled', true);
						form.find('button[type=submit]').hide();
						self.add_notice( response.data.message, '&nbsp', 'success' );
					} else {
						self.add_notice( response.data.message, '&nbsp', 'error' );
						form.find('button[type=submit]').prop('disabled', false).text('ثبت دیدگاه');
					}
				},
				error: function() {
					self.add_notice( 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.', '&nbsp', 'error' );
					form.find('button[type=submit]').prop('disabled', false).text('ثبت دیدگاه');
				}
			});
		});

	
	}
	
	
	Module.init_tickets = function (){

		var self = this;

		let ticketFiles = [];
		//let replyFiles = [];
		
		

		$('#create-ticket').on('submit', function (e) {
			e.preventDefault();

			var this_e = $(this);
			var el_parent = this_e.closest('form');

			var contentValue = this_e.find('textarea').val();
			var wordCount = contentValue.split(' ').filter(function(word) {
				return word.trim() !== '';
			}).length;

			if (wordCount < 5) {
				self.add_notice('محتوا باید بیشتر از 5 کلمه باشد', '&nbsp', 'error');
				return;
			}

			var formData = this_e.serialize();

			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: mweb_object.ajax_url,
				data: {
					'action': 'submit_ticket',
					'wcp_nonce': mweb_object.nonce,
					'form_data': formData
				},

				beforeSend: function() {
					el_parent.addClass('mweb-loader_up');
				},

				success: function(response) {
					el_parent.removeClass('mweb-loader_up');
					self.add_notice(response.data.message, '&nbsp', 'success');

					if (response.data.ticket_id) {
						handleCreateTicketUpload(
							response.data.ticket_id,
							response.data.url
						);
					}
				},

				error: function(xhr, textStatus, errorThrown) {
					el_parent.removeClass('mweb-loader_up');
					console.log(xhr.responseText);
				}
			});
		});
		
		
		
		$('#reply-ticket').on('submit', function (e) {
			e.preventDefault();

			var this_e = $(this);
			var el_parent = this_e.closest('form');
			
			var contentValue = this_e.find('textarea').val();
			var wordCount = contentValue.split(' ').filter(function(word) {
				return word.trim() !== '';
			}).length;

			if (wordCount < 1) {
				self.add_notice( 'محتوا باید بیشتر از 1 کلمه باشد', '&nbsp', 'error' );
				return;
			}

			var formData = this_e.serialize();
			
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: mweb_object.ajax_url ,
				data: {
					'action': 'reply_ticket',
					'wcp_nonce': mweb_object.nonce,
					'form_data': formData
				},
				beforeSend: function() {
					el_parent.addClass('mweb-loader_up');
				},
				success: function(response) {
					self.add_notice( response.data.message, '&nbsp', 'success' );
					el_parent.removeClass('mweb-loader_up');
					//this_e.find('textarea').val('');
			
					if (response.data.ticket_id) {
						handleReplyUpload(
							response.data.ticket_id,
						);
					}
					
				},
				error: function(xhr, textStatus, errorThrown) {
					el_parent.removeClass('mweb-loader_up');
					console.log(xhr.responseText);
				}
			});
		});
		
		$('#search-ticket').on('submit', function (e) {
			e.preventDefault();

			var this_e = $(this);
			var el_target = $('.ticket_rows');
			
			var contentValue = this_e.find('input').val();
			var wordCount = contentValue.split(' ').filter(function(word) {
				return word.trim() !== '';
			}).length;

			if (contentValue.length < 1) {
				self.add_notice( 'فیلد شناسه الزامیست', '&nbsp', 'error' );
				return;
			}
			$('.ticket_pagination').hide();
			var formData = this_e.serialize() + '&type=id';
			get_ticket_query(formData, el_target);
			
			
		});
		
		var filter_ticket = $('#tki_sort');
		if( filter_ticket.length ){
			var previousValue = filter_ticket.val();
			var el_target = $('.ticket_rows');
			filter_ticket.niceSelect();
			filter_ticket.change(function () {
				var id = $(this).val();
				if (id === previousValue) {
					return;
				}

				previousValue = id;
				if( id == 0 ){
					$('.ticket_pagination').show();
				}
				var formData = 'tki_sort=' + id + '&type=status';
				get_ticket_query(formData, el_target);
				  
			});
		}
		
		
		function get_ticket_query( mydata , $target ){
			
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: mweb_object.ajax_url ,
				data: {
					'action': 'search_ticket',
					'wcp_nonce': mweb_object.nonce,
					'param': mydata
				},
				beforeSend: function() {
					$target.addClass('mweb-loader_up');
				},
				success: function(response) {
					//self.add_notice( response.data.message, '&nbsp', 'success' );
					$target.removeClass('mweb-loader_up');
					if( response.data.html ){
						$target.html(response.data.html);
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					$target.removeClass('mweb-loader_up');
				}
			});
			
		}
		
		
		$('.ticket-pagination').on('click', function (e) {
			e.preventDefault();
            var el_num = $(this);
            var page = el_num.data('page');
			var el_target = $('.ticket_rows');
			if( el_num.hasClass('current') ){
				return false;
			}
			$('.ticket-pagination').removeClass('current');
            $.ajax({
                type: 'POST',
				dataType: 'json',
				url: mweb_object.ajax_url ,
                data: {
                    'action': 'load_tickets_by_page',
					'wcp_nonce': mweb_object.nonce,
                    'page': page
                },
				beforeSend: function() {
					el_num.addClass('current');
					el_target.addClass('mweb-loader_up');
				},
                success: function(response) {
					el_target.removeClass('mweb-loader_up');
					if( response.data.html ){
						el_target.html(response.data.html);
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					el_target.removeClass('mweb-loader_up');
				}
            });
        });
		
		
		$('.close_ticket_btn').on('click', function (e) {
			e.preventDefault();
            var el_btn = $(this);
            var el_id = el_btn.data('id');
			
            $.ajax({
                type: 'POST',
				dataType: 'json',
				url: mweb_object.ajax_url ,
                data: {
                    'action': 'close_ticket',
					'wcp_nonce': mweb_object.nonce,
                    'ticket_id': el_id
                },
				beforeSend: function() {
					el_btn.addClass('fa-fade');
				},
                success: function(response) {
					el_btn.remove();
					$('#reply-ticket').remove();
					self.add_notice( response.data.message, '&nbsp', 'success' );
					setTimeout(function(){
						window.location.reload();
					}, 3000);
				},
				error: function(xhr, textStatus, errorThrown) {
					el_btn.removeClass('fa-fade');
				}
            });
        });
		
		$('.continue_ticket_btn').on('click', function (e) {
			e.preventDefault();
			$('#create-ticket').toggleClass('hide');
		});
		
		
		
		

		function toggleLoader(show){
			if(show){
				$('.ticket-upload-box').addClass('mweb-loader_up');
			}else{
				$('.ticket-upload-box').removeClass('mweb-loader_up');
			}
		}


		$('#mweb_ticket_files').on('change', function () {
			const box      = $(this).closest('.ticket-upload-box');
			const maxCount = parseInt( box.data('max') )  || 3;
			const maxSize  = parseInt( box.data('size') ) || 500; // KB

			let files = this.files;
			
			if (ticketFiles.length >= maxCount) {
				self.add_notice( 'حداکثر ' + maxCount + ' فایل مجاز است', '&nbsp', 'error' );
				return;
			}
				
			for (let i = 0; i < files.length; i++) {
				let file = files[i];
				
				if (file.size > maxSize * 1024) {
					self.add_notice( 'حداکثر حجم هر فایل ' + maxSize + ' کیلوبایت است', '&nbsp', 'error' );
					continue;
				}

				ticketFiles.push({
					raw:     file,
					name:    file.name,
					size:    file.size,
					type:    file.type,
					preview: URL.createObjectURL(file)
				});
			}

			renderPreview();
			$(this).val('');
		});


		

		function uploadQueue(files, ticket_id, done){

			let index = 0;

			function next(){

				if(index >= files.length){
					if(typeof done === 'function') done();
					return;
				}

				let file = files[index];

				let form = new FormData();
				form.append('action', 'mweb_ticket_upload');
				form.append('file', file.raw);
				form.append('ticket_id', ticket_id);

				$.ajax({
					url: mweb_object.ajax_url,
					type: 'POST',
					data: form,
					processData: false,
					contentType: false,
					success: function(){

						index++;
						next();
					},
					error: function(){

						index++;
						next();
					}
				});
			}

			next();
		}
		
		function handleCreateTicketUpload(ticket_id, redirect_url){
			uploadQueue(ticketFiles, ticket_id, function(){
				window.location.replace(redirect_url);
			});
		}
		
		
		function handleReplyUpload(ticket_id){
			uploadQueue(ticketFiles, ticket_id, function(){
				window.location.reload();
			});
		}


		function renderPreview(){
			let html = '';
			ticketFiles.forEach((f, i) => {

				let isImg = f.type.includes('image');

				html += `
					<div class="tk_file_item">

						${isImg
							? `<img src="${f.preview}">`
							: `<div class="tk_file_icon">ZIP</div>`
						}

						<div class="tk_file_name">${f.name}</div>

						<span
							class="remove_file"
							data-index="${i}">
							×
						</span>
					</div>
				`;
			});

			$('#mweb_ticket_preview').html(html);
		}


		$(document).on('click', '.remove_file', function () {
			let index = $(this).data('index');
			ticketFiles.splice(index, 1);
			renderPreview();
		});

	
		
		
	}
	
	
	Module.init_Random_Number = function (){
		
		var self = this;
		
		function seededRandom(seed) {
			let t = seed + 0x6D2B79F5;
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		}

		function getRandomInRange(min, max, widgetId) {
			const now   = new Date();
			const hour  = `${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}`;
			const seed  = simpleHash(widgetId + hour);
			const rand  = seededRandom(seed);
			return Math.floor(rand * (max - min + 1)) + min;
		}

		function simpleHash(str) {
			let hash = 0;
			for (let i = 0; i < str.length; i++) {
				hash = ((hash << 5) - hash) + str.charCodeAt(i);
				hash |= 0;
			}
			return Math.abs(hash);
		}

		function updateNumber(wrapper) {
			const min      = parseInt(wrapper.dataset.min, 10);
			const max      = parseInt(wrapper.dataset.max, 10);
			const widgetId = wrapper.dataset.widgetId;
			const animate  = wrapper.dataset.animate === 'yes';
			const numEl    = wrapper.querySelector('.spc-number');

			if (!numEl) return;

			const newVal = getRandomInRange(min, max, widgetId + Date.now());

			if (animate) {
				numEl.classList.add('spc-updating');
				setTimeout(() => {
					numEl.textContent = newVal;
					numEl.dataset.value = newVal;
					numEl.classList.remove('spc-updating');
				}, 300);
			} else {
				numEl.textContent = newVal;
				numEl.dataset.value = newVal;
			}
		}

		function initWidget(wrapper) {
			const refresh = parseInt(wrapper.dataset.refresh, 10);
			if (refresh > 0) {
				setInterval(() => updateNumber(wrapper), refresh * 1000);
			}
		}

		function init() {
			document.querySelectorAll('.spc-wrapper').forEach(initWidget);
		}

		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', init);
		} else {
			init();
		}
		
	}
	
	
	
	Module.init_login_and_register = function (){
		
		var self = this;

		
		$(document).on('click', '.edit_phoneno', function(e) {
			var el_form = $(this).closest('form');
			$(this).fadeOut(500);
			el_form.find('.row-mobile').fadeIn();
			el_form.find('.row-get-otp').remove();
			//$('#message').text('');
			el_form.find('.row-mobile input').focus();
			el_form.find('.row-mobile input').focus();
			el_form.find('input[type="submit"]').removeAttr('disabled');
		}); 
	
		function mweb_init_otp_field(btn) {
			const inputs = document.querySelectorAll(".row-otp > input");
			const button = document.querySelector(btn);

			window.addEventListener("load", () => inputs[0].focus());
			button.setAttribute("disabled", true);

			function persianToEnglish(input) {
				return input.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
			}

			inputs[0].addEventListener("paste", function (event) {
				event.preventDefault();
				const pastedValue = persianToEnglish((event.clipboardData || window.clipboardData).getData("text"));
				const otpLength = inputs.length;

				for (let i = 0; i < otpLength; i++) {
					if (i < pastedValue.length) {
						inputs[i].value = pastedValue[i];
						inputs[i].removeAttribute("disabled");
						inputs[i].focus();
					} else {
						inputs[i].value = ""; // Clear any remaining inputs
						inputs[i].focus();
					}
				}
			});

			inputs.forEach((input, index1) => {
				input.addEventListener("keyup", (e) => {
					input.value = persianToEnglish(input.value);
					const currentInput = input;
					const nextInput = input.nextElementSibling;
					const prevInput = input.previousElementSibling;

					if (currentInput.value.length > 1) {
						currentInput.value = "";
						return;
					}

					if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
						nextInput.removeAttribute("disabled");
						nextInput.focus();
					}

					if (e.key === "Backspace") {
						inputs.forEach((input, index2) => {
							if (index1 <= index2 && prevInput) {
								input.setAttribute("disabled", true);
								input.value = "";
								prevInput.focus();
							}
						});
					}

					button.classList.remove("active");

					const inputsNo = inputs.length;
					if (!inputs[inputsNo - 1].disabled && inputs[inputsNo - 1].value !== "") {
						button.classList.add("active");
						button.removeAttribute("disabled");
						return;
					}
				});
			});
		}
 
		
		
		$( ".switch_login" ).on( "click", function() {
			var el_this = $(this);
			if( $('.row-get-otp').length )
				$('.row-get-otp').remove();
			
			$('.wp_login_btn').prop('disabled', false);
			if( el_this.hasClass('is_active') ){
				el_this.removeClass('is_active');
				$('.row-username').removeClass('hide');
				$('.row-password').removeClass('hide');
				$('.row-mobile').addClass('hide');
				el_this.text(el_this.data('on'));
				$('input[name="type"]').val('default');
				$('.row-mobile input').prop('required', false);
				$('.row-password input').prop('required', true);
				$('.row-username input').prop('required', true);
			} else {
				el_this.addClass('is_active');
				$('.row-username').addClass('hide');
				$('.row-password').addClass('hide');
				$('.row-mobile').removeClass('hide');
				el_this.text(el_this.data('off'));
				$('input[name="type"]').val('otp');
				$('.row-mobile input').prop('required', true);
				$('.row-password input').prop('required', false);
				$('.row-username input').prop('required', false);
			}
		
		});

		
		function mweb_otp_timer( $btn ){
			var counterElement = $btn.find('.otp_counter');
			var counterValue = parseInt(counterElement.text());
			$btn.removeClass('enabled');
			function decrementCounter() {
				counterValue--;
				counterElement.text(counterValue);
				if ( counterValue === 0 ) {
					$btn.addClass('enabled');
					clearInterval(counterInterval);
					//mweb_resend_otp($btn);
				}
			}

			var counterInterval = setInterval(function() {
				decrementCounter();
			}, 1000);
		}
		
		
		function mweb_resend_otp( $btn, type = 'login' ){
			$btn.off('click').on('click', function( e ) {
				if( !$btn.hasClass('enabled') )
					return;
				//e.preventDefault();
				$btn.removeClass('enabled');
				var el_parent = $btn.closest('.form-row-wide');
				var row_mobile = $btn.closest('form').find('.row-mobile input');
				el_parent.addClass('mweb-loader_up');
				$.ajax({
					type: 'POST',
					dataType: 'json',
					url: mweb_object.ajax_url ,
					data: {
						action: 'resend_otp',
						phone_number : row_mobile.val(),
						otp_type : type,
						wcp_nonce : mweb_object.nonce
					},
					success: function (response) {
						self.add_notice( response.data.message, '&nbsp', 'success' );
						$btn.removeClass('enabled');
						if (response.success ) {
							$btn.find('.otp_counter').text(response.data.html);
							mweb_otp_timer($btn);
						}
						
					},
					complete: function (data) {
						el_parent.removeClass('mweb-loader_up');
					}
				});
			});
		}
		
		
		$( "#mweb_login" ).submit(function( e ) {
			e.preventDefault();
			
			var this_e = $(this);
			var el_parent = this_e.closest('form');
			var row_mobile = this_e.find('.row-mobile');
			var login_type = this_e.find('input[name="type"]');
			var all_data = this_e.serializeArray();
			all_data.push({name: 'wcp_nonce', value: mweb_object.nonce});
			el_parent.addClass('mweb-loader_up');
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: mweb_object.ajax_url ,
				data: all_data,
				success: function (response) {
					if( response.data.html ){
						if( login_type.val() == 'otp' ){
							row_mobile.hide();
							row_mobile.after(response.data.html);
						}
						mweb_otp_timer(this_e.find('.resend_otp'));
						mweb_resend_otp(this_e.find('.resend_otp'));
						mweb_init_otp_field('.wp_login_btn');
					}
					var notice_type = response.success ? 'success' : 'error';
					self.add_notice( response.data.message, '&nbsp', notice_type );
					if (response.success && response.data.logged_in) {
						if(response.data.redirect){
							//setTimeout(function(){
								window.location.replace(response.data.redirect);
							//}, 1000);
								
						}else{
							window.location.reload();
						}
					}
				},
				complete: function (data) {
					el_parent.removeClass('mweb-loader_up');
				}
			});

		});
		
		$( "#mweb_register" ).submit(function( e ) {
			
			var this_e = $(this);
			var el_parent = this_e.closest('form');
			var row_mobile = this_e.find('.row-mobile');
			var all_data = this_e.serializeArray();
			all_data.push({name: 'wcp_nonce', value: mweb_object.nonce});
			
			e.preventDefault();
			el_parent.addClass('mweb-loader_up');
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: mweb_object.ajax_url ,
				data: all_data,
				success: function (response) {
					
					if (response.success){
						if( response.data.html ){
							row_mobile.hide();
							row_mobile.after(response.data.html);
							mweb_otp_timer(this_e.find('.resend_otp'));
							mweb_resend_otp(this_e.find('.resend_otp'));
							mweb_init_otp_field('.wp_register_btn');
						}
						self.add_notice( response.data.message, '&nbsp', 'success' );
						if ( response.data.logged_in ){
							if(response.data.redirect){
								//setTimeout(function(){
									window.location.replace(response.data.redirect);
								//}, 1000);
									
							}else{
								window.location.reload();
							}
						}
					}else if( !response.success ){
						//this_e.find('.form-row-wide , #phone_number_field').fadeIn();
						self.add_notice( response.data.message, '&nbsp', 'success' );
					}  
				},
				complete: function (data) {
					el_parent.removeClass('mweb-loader_up');
				}
			});

		}); 
		
		
		
		$( "#mweb_subscribe" ).submit(function( e ) {
			e.preventDefault();
			
			var this_e = $(this);
			var el_parent = this_e.closest('form');
			var row_mobile = this_e.find('.row-mobile');
			var login_type = this_e.find('input[name="type"]');
			var all_data = this_e.serializeArray();
			all_data.push({name: 'wcp_nonce', value: mweb_object.nonce});
			el_parent.addClass('mweb-loader_up');
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: mweb_object.ajax_url ,
				data: all_data,
				success: function (response) {
					if( response.data.html ){
							row_mobile.hide();
							row_mobile.after(response.data.html);
						mweb_otp_timer(this_e.find('.resend_otp'));
						mweb_resend_otp(this_e.find('.resend_otp'));
						mweb_init_otp_field('.wp_subscribe_btn');
					}
					var notice_type = response.success ? 'success' : 'error';
					self.add_notice( response.data.message, '&nbsp', notice_type );
					if (response.success && response.data.logged_in) {
						if(response.data.redirect){
							//setTimeout(function(){
								window.location.replace(response.data.redirect);
							//}, 1000);
								
						}else{
							window.location.reload();
						}
					}
				},
				complete: function (data) {
					el_parent.removeClass('mweb-loader_up');
				}
			});

		});
		
		
		
		$( "#verify_user_form" ).submit(function( e ) {
			e.preventDefault();
			
			var this_e = $(this);
			var el_parent = this_e.closest('form');
			var row_mobile = this_e.find('.row-mobile');
			var all_data = this_e.serializeArray();
			all_data.push({name: 'action', value: 'verify_ajax'});
			all_data.push({name: 'wcp_nonce', value: mweb_object.nonce});
			el_parent.addClass('mweb-loader_up');
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: mweb_object.ajax_url ,
				data: all_data,
				success: function (response) {
					if( response.data.html ){
						row_mobile.hide();
						row_mobile.after(response.data.html);
						mweb_otp_timer(this_e.find('.resend_otp'));
						mweb_resend_otp(this_e.find('.resend_otp'));
						mweb_init_otp_field('.wp_verify_btn');
					}
					var notice_type = response.success ? 'success' : 'error';
					self.add_notice( response.data.message, '&nbsp', notice_type );
					if (response.success && response.data.verify) {
						//setTimeout(function(){
							window.location.replace(response.data.redirect);
						//},1000);
					}
				},
				complete: function (data) {
					el_parent.removeClass('mweb-loader_up');
				}
			});

		});
		
		
		
		$( "#mweb_lost_password" ).submit(function( e ) {
			e.preventDefault();
			
			var this_e = $(this);
			var el_parent = this_e.closest('form');
			var row_mobile = this_e.find('.row-mobile');
			var all_data = this_e.serializeArray();
			all_data.push({name: 'wcp_nonce', value: mweb_object.nonce});
			el_parent.addClass('mweb-loader_up');
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: mweb_object.ajax_url ,
				data: all_data,
				success: function (response) {
					if( response.data.html ){
						row_mobile.hide();
						row_mobile.after(response.data.html);
						mweb_otp_timer(this_e.find('.resend_otp'));
						mweb_resend_otp(this_e.find('.resend_otp'));
						mweb_init_otp_field('.wp_lostpass_btn');
					}
					var notice_type = response.success ? 'success' : 'error';
					self.add_notice( response.data.message, '&nbsp', notice_type );
					if (response.success && response.data.link) {
						this_e.after('<p class="message">' + response.data.link + '</p>');
						this_e.remove();
					}
				},
				complete: function (data) {
					el_parent.removeClass('mweb-loader_up');
				}
			});

		});
		
		
		
	}
	
	
	
	
	
	Module.init_console_bio = function () {
		console.log("%c              	   .-.       .-.  _                          .-.    \n" +
			"			   	   : :       : : :_;                         : :    \n" +
			" ,-.,-.,-.  .--.   : `-.   .-' : .-.  .--.  .-..-..-.  .--.  : `-.  \n" +
			" : ,. ,. : ' .; ;  : .. : ' .; : : : `._-.' : `; `; : ' '_.' ' .; : \n" +
			" :_;:_;:_; `.__,_; :_;:_; `.__.' :_; `.__.' `.__.__.' `.__.' `.__.' ",
			"color:#ef394e;font-size:9px;font-weight:bold",
			"\n Design & Develop by => https://www.mahdisweb.net/ version 17.0.2");
	}


	return Module;

    }(Mweb_Main_Js || {}, jQuery)
);



( function( $ ) {
	"use strict";
	
	$(document).ajaxComplete(function(){
		
		//mweb_theme.ajax_compare_product();
		
		if ( typeof(Mweb_Main_Js.lazyload_instance) != 'undefined' ) {
			try {
				Mweb_Main_Js.lazyload_instance.update();
			} catch (err) {
				console.log('Oops, can not execute function');
			}
		}

		/* $("body *[data-toggle='tooltip']").each(function(){
			$(this).tooltip();
		}); */

	}); 
	
	$(document).ready(function() {
		
		Mweb_Main_Js.init();
		
		
		
		/* function verify_timer(elm){
			var date = elm.attr('data-date');
			elm.countdown(date).on('update.countdown', function(event) {
				var $this = $(this).html(event.strftime(''
				+ '<span>%H</span>'
				+ '<span>%M</span>'
				+ '<span>%S'));
			}).on('finish.countdown', function(event) {
				$(this).html('مهلت استفاده از کد تمام شد <span class="el_get_otp" id="resend_otp">دریافت مجدد</span>').parent().addClass('disabled');
				$('.edit_phoneno').fadeIn('slow');
				$('.verify_btn').fadeOut('slow');
				//salam();
			});
		} */
		
		/* ---------------------- woocommerce login and registre ---------------------- */
		/* if(ajax_otp.required_login == 1){
			$('html,body').animate({scrollTop:0},'slow');
			mweb_theme.body.toggleClass('account_area');
		} */
	
	});
		
	if ( !window.elementor && !window.elementorFrontend ) {
		var paceOptions = { 
				ajax: true,
				document: true,
				eventLag: false
			};

		if( typeof Pace !== 'undefined' ){
			Pace.on('done', function () {
				$('#preloader').addClass("isdone");
				$('.loading-text').addClass("isdone");
			});
		}
	}
	
	if ( window.elementor && window.elementorFrontend ) {
		$("img.lazy").each(function() {
			var el_img = $(this);
			if(!el_img.hasClass('loaded')){
				el_img.addClass('loaded');
			}
		});
	}
	
	
	class Elementor_Js_Class {
		static getInstance() {
			if (!Elementor_Js_Class.instance) {
				Elementor_Js_Class.instance = new Elementor_Js_Class();
			}
			return Elementor_Js_Class.instance;
		}
		constructor() {
			$(window).on('elementor/frontend/init', () => {
				this.init();
			});
		}
		init() {

			elementorFrontend.hooks.addAction('frontend/element_ready/block-post-slider.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/block-brand-slider.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/block-story.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			
			elementorFrontend.hooks.addAction('frontend/element_ready/block-post-category-slider.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/carousel-onsale-product.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/mobile-deal-slider-product.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/block-expert.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/product-list-box.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/general-slider-product.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/product-recently-viewed.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/block-service-slider.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/block-slider-two.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/block-testimonial-slider.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/mweb-product-related.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/block-related-posts.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/my-footer-namad.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/block-category-slider.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/block-category-minimal-slider.default', ($scope) => {
				let sliderElement     = $scope.find('.xslider');
				Mweb_Main_Js.init_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/general-onsale-product.default', ($scope) => {
				let sliderElement     = $scope.find('.main_onsale_slider');
				Mweb_Main_Js.init_deal_slider_action(sliderElement);	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/block-slider.default', ($scope) => {
				Mweb_Main_Js.init_tab_slider_action();	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/general-vonsale-product.default', ($scope) => {
				Mweb_Main_Js.init_vertical_slider_action();	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/marquee-product.default', ($scope) => {
				Mweb_Main_Js.init_swiper_slider();	
			});
			elementorFrontend.hooks.addAction('frontend/element_ready/product-vertical-tabs.default', ($scope) => {
				Mweb_Main_Js.init_swiper_vtabs();	
			});
			
			elementorFrontend.hooks.addAction('frontend/element_ready/social_proof_counter.default', ($scope) => {
				Mweb_Main_Js.init_Random_Number();	
			});
			
		}
	}
	Elementor_Js_Class.getInstance();	
} )( jQuery );
