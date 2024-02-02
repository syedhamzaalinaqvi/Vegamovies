/*
VidoRev Theme Library
Author: BeeTeam368
Author URI: http://themeforest.net/user/beeteam368
Version: 2.9.9.9.9.8
License: Themeforest Licence
License URI: http://themeforest.net/licenses
*/

;(function(factory) {
    if(typeof define === 'function' && define.amd){
        define(['jquery'], factory);
    }else if (typeof exports !== 'undefined'){
        module.exports = factory(require('jquery'));
    }else{
        factory(jQuery);
    }
}(function($){
	'use strict';
	
	var prefix = 'vidorev_theme';		
	var vidorev_theme = window.vidorev_theme || {};
	
  	vidorev_theme = (function(){
		function vidorev_theme(el, options){
			var _ = this;
			
			_.defaults = {
									
			}
			
			if(typeof(options)==='object'){
				_.options = $.extend({}, _.defaults, options);
			}else{
				_.options = _.defaults;
			}
			
			_.$el = $(el);
			
			_.replaceAll = function (str, mapObj){
				var re = new RegExp(Object.keys(mapObj).join('|'), 'gi');
			
				return str.replace(re, function(matched){
					return mapObj[matched.toLowerCase()];
				});
			}
			
			_.check_atob = function(value){
				var _ = this;
				
				var old_value = value;
				
				var mapObj = {
				   '.mp4' : '',
				   '.m3u8' : '',
				}
				
				value = _.replaceAll(value, mapObj);
				
				try {
					window.atob(value);
					return window.atob(value);
				} catch(e) {
					return old_value;
				}
			}
			
			_.sticky_menu_on	= _.$el.hasClass('sticky-menu-on');
			_.sticky_behavior 	= 'down';
			if(_.$el.hasClass('sticky-behavior-up')){
				_.sticky_behavior = 'up';
			}
			
			_.sticky_sidebar_on	= _.$el.hasClass('sticky-sidebar-on');
			
			if(typeof(vidorev_jav_js_object)!=='undefined' && typeof(vidorev_jav_js_object.query_vars)!=='undefined' && typeof(vidorev_jav_js_object.query_vars.paged)!=='undefined'){
				_.global_blog_page = vidorev_jav_js_object.query_vars.paged;
			}else{
				_.global_blog_page = -1;
			}
			if(_.global_blog_page==0){
				_.global_blog_page = 1;
			}
			_.global_blog_ajax_load = true;
			
			_.global_video_autoplay = 'off';			
			if(typeof(vidorev_jav_js_object)!=='undefined' && typeof(vidorev_jav_js_object.video_auto_play)!=='undefined' && !_.getMobileOperatingSystem()){
				_.global_video_autoplay = vidorev_jav_js_object.video_auto_play;
			}
			
			_.global_browser_desktop_autoplay = 'on';
			var isBrowserNoAutoplay = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
			
			if(typeof(vidorev_jav_js_object)!=='undefined' && typeof(vidorev_jav_js_object.vid_auto_play_mute)!=='undefined' && vidorev_jav_js_object.vid_auto_play_mute==='on'){
				isBrowserNoAutoplay = true;
			}
			
			if(!_.getMobileOperatingSystem() && isBrowserNoAutoplay){
				_.global_browser_desktop_autoplay = 'off';
			}
			
			_.global_muted_video = false;
			if(_.global_video_autoplay === 'on' && _.global_browser_desktop_autoplay === 'off'){
				_.global_muted_video = true;
			}
			
			_.preview_mode_active = false;
			if(typeof(vidorev_jav_js_object)!=='undefined' && typeof(vidorev_jav_js_object.video_preview_mode)!=='undefined' && vidorev_jav_js_object.video_preview_mode==='on'){
				_.global_video_autoplay 	= 'on';
				_.global_muted_video 		= true;
				_.preview_mode_active		= true;
			}
			
			_.global_video_network_placeholder_hide = false;
			if(typeof(vidorev_jav_js_object)!=='undefined' && typeof(vidorev_jav_js_object.amp_active)!=='undefined'){
				_.global_video_network_placeholder_hide = true;
			}
			
			/*chrome auto play for vimeo & facebook mute*/
				var isChromeBrowser = false;
				var isChromium 		= window.chrome;
				var winNav 			= window.navigator;
				var vendorName 		= winNav.vendor;
				var isOpera 		= typeof window.opr !== "undefined";
				var isIEedge 		= winNav.userAgent.indexOf("Edge") > -1;
				var isIOSChrome 	= winNav.userAgent.match("CriOS");
				
				if (isIOSChrome) {
					isChromeBrowser = true;
				} else if(
				  isChromium !== null &&
				  typeof isChromium !== "undefined" &&
				  vendorName === "Google Inc." &&
				  isOpera === false &&
				  isIEedge === false
				) {
					isChromeBrowser = true;
				} else { 
					isChromeBrowser = false;
				}
				
				_.global_video_network_mute_for_autoplay = false;
				if(_.global_video_autoplay === 'on' && isChromeBrowser){
					_.global_video_network_mute_for_autoplay = true;
				}				
			/*chrome auto play for vimeo & facebook mute*/
			
			_.global_number_format = 'short';
			if(typeof(vidorev_jav_js_object)!=='undefined' && typeof(vidorev_jav_js_object.number_format)!=='undefined'){
				_.global_number_format = vidorev_jav_js_object.number_format;
			}
			
			_.global_video_lightbox_items = [];
			_.global_video_lightbox_suggested_posts = [];
			_.global_video_lightbox_live_comments = null;
			_.global_click_added_live_comment = null;
			_.global_video_vast_running = [];
			_.global_video_myCred_calculator = [];
			
			_.global_video_auto_next = typeof(Cookies.get('vpautonextvideo'))!=='undefined' && Cookies.get('vpautonextvideo') == 'true';
			
			_.global_hls_library = false;
			_.global_mpd_library = false;
			
			/*video ads*/
			_.default_ads_otps = {
				'vid_ads_m_video_ads':			'no',
				'vid_ads_m_video_ads_type':		'google_ima',
				'vid_ads_m_group_google_ima':	[],
				'vid_ads_m_group_image':		[],
				'vid_ads_m_group_html':			[],
				'vid_ads_m_group_dynamic':		[],
				'vid_ads_m_vpaid_mode':			'no',
				'vid_ads_m_vast_preroll':		[],
				'vid_ads_m_vast_postroll':		[],
				'vid_ads_m_vast_pauseroll':		[],
				'vid_ads_m_vast_midroll':		[],
				'vid_ads_m_time_to_show_ads':	'0',
				'vid_ads_m_time_skip_ads':		'5',
				'vid_ads_m_time_to_hide_ads':	'10'
			}
			
			if(typeof(vidorev_jav_plugin_video_ads_object) === 'object'){
				_.ads_opts = $.extend({}, _.default_ads_otps, vidorev_jav_plugin_video_ads_object);
			}else{
				_.ads_opts = _.default_ads_otps;
			}			
			
			if(typeof(vidorev_jav_plugin_video_ads_object_post) === 'object'){				
				
				if(typeof(vidorev_jav_plugin_video_ads_object_post.vid_ads_m_video_ads_type) !== 'undefined' && $.trim(vidorev_jav_plugin_video_ads_object_post.vid_ads_m_video_ads_type)!=''){										
					_.ads_opts = $.extend({}, _.default_ads_otps, vidorev_jav_plugin_video_ads_object_post);
				}
				
				if(typeof(vidorev_jav_plugin_video_ads_object_post.vid_ads_m_video_ads) !== 'undefined' && $.trim(vidorev_jav_plugin_video_ads_object_post.vid_ads_m_video_ads)!=''){
					_.ads_opts.vid_ads_m_video_ads = vidorev_jav_plugin_video_ads_object_post.vid_ads_m_video_ads;
				}else{
					if(typeof(vidorev_jav_plugin_video_ads_object) === 'object' && typeof(vidorev_jav_plugin_video_ads_object.vid_ads_m_video_ads) !== 'undefined' && $.trim(vidorev_jav_plugin_video_ads_object.vid_ads_m_video_ads)!=''){
						_.ads_opts.vid_ads_m_video_ads = vidorev_jav_plugin_video_ads_object.vid_ads_m_video_ads;
					}
				}
			}
			
			_.get_ads_params(_.ads_opts, true);
			
			_.is_ad_appeared = [];
			_.is_ad_google_ima_control = [];
			_.is_ad_google_ima_stated_event = [];
			_.global_player_playing = [];
			/*video ads*/
			
			/*youtube player*/
			_.you_rel 				= 0,
			_.you_modestbranding 	= 1,
			_.you_showinfo 			= 1;
				
			if(typeof(vidorev_jav_plugin_js_object)!=='undefined'){
				if(typeof(vidorev_jav_plugin_js_object.youtube_rel)!=='undefined' && vidorev_jav_plugin_js_object.youtube_rel==='yes'){
					_.you_rel = 1;
				}
				if(typeof(vidorev_jav_plugin_js_object.youtube_modestbranding)!=='undefined' && vidorev_jav_plugin_js_object.youtube_modestbranding==='no'){
					_.you_modestbranding = 0;
				}
				if(typeof(vidorev_jav_plugin_js_object.youtube_showinfo)!=='undefined' && vidorev_jav_plugin_js_object.youtube_showinfo==='no'){
					_.you_showinfo = 0;
				}
			}
			/*youtube player*/
			
			_.global_scroll_bar_lib = 'malihu';
			if(typeof(vidorev_jav_js_object)!=='undefined' && typeof(vidorev_jav_js_object.scrollbar_library)!=='undefined' && vidorev_jav_js_object.scrollbar_library == 'overlay'){
				_.global_scroll_bar_lib = 'overlay';
			}
			
			_.init();
		}	
			
		return vidorev_theme;
	}());	
	
	vidorev_theme.prototype.get_ads_params = function(ads_opts, global){
		var _ = this;
		
		var ads_enable			= ads_opts.vid_ads_m_video_ads === 'yes'?true:false,
			ads_network			= ads_opts.vid_ads_m_video_ads_type, /*google_ima, image, html5_video, html, vast*/
			time_to_show_ads 	= (typeof(ads_opts.vid_ads_m_time_to_show_ads)!=='undefined'&&$.trim(ads_opts.vid_ads_m_time_to_show_ads)!='')?(ads_opts.vid_ads_m_time_to_show_ads).split(','):[0],
			time_skip_ads 		= (typeof(ads_opts.vid_ads_m_time_skip_ads)!=='undefined'&&_.isNumber(ads_opts.vid_ads_m_time_skip_ads))?parseFloat(ads_opts.vid_ads_m_time_skip_ads):5,
			time_to_hide_ads 	= (typeof(ads_opts.vid_ads_m_time_to_hide_ads)!=='undefined'&&_.isNumber(ads_opts.vid_ads_m_time_to_hide_ads))?parseFloat(ads_opts.vid_ads_m_time_to_hide_ads):10;
		
		var time_to_show_ads_arr = [];
		if(!Array.isArray(time_to_show_ads)){
			time_to_show_ads_arr = [0];
		}else{
			
			var new_time_to_show_ads = [];			
			$.each(time_to_show_ads, function(i, value){
				var new_val = $.trim(value);
				if(_.isNumber(new_val)){
					new_time_to_show_ads[i] = parseFloat(new_val);
				}
			});
			
			time_to_show_ads_arr = 
			($.grep(new_time_to_show_ads, function(n){ 
				return n == 0 || n;
			})).slice()
			.sort(function(a,b){
				return a > b;
			})
			.reduce(function(a,b){
				if (a.slice(-1)[0] !== b) a.push(b);
				return a;
			},[]);		
		}
		
		var va_google_ima_source 	= '',
			va_image_source 		= '',
			va_image_link 			= '',
			va_video_source 		= '',
			va_video_link 			= '',
			va_html_source 			= '',
			va_dynamic_type 		= '',
			va_dynamic_size_desk 	= '',
			va_dynamic_size_mob 	= '',
			va_dynamic_size_vert 	= '',
			va_dynamic_source 		= '',
			va_dynamic_link 		= '',
			va_vast_preroll 		= '',
			va_vast_postroll 		= '',
			va_vast_pauseroll 		= '',
			va_vast_midroll 		= '';
		
		if(	ads_opts.vid_ads_m_group_google_ima != null && Array.isArray(ads_opts.vid_ads_m_group_google_ima) && typeof(ads_opts.vid_ads_m_group_google_ima[0]) === 'object'){
			
			var adsIMARand = '';
			
			if(!_.getMobileOperatingSystem()){
				if(typeof(ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source) !== 'undefined' && Array.isArray(ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source) && ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source.length > 0){
					adsIMARand 	= ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source[Math.floor(Math.random() * ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source.length)];
				}
			}else{
				if(window.innerWidth>767){
					if(typeof(ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source_tablet) !== 'undefined' && Array.isArray(ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source_tablet) && ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source_tablet.length > 0){
						adsIMARand 	= ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source_tablet[Math.floor(Math.random() * ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source_tablet.length)];
					}
				}else{
					if(typeof(ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source_mobile) !== 'undefined' && Array.isArray(ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source_mobile) && ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source_mobile.length > 0){
						adsIMARand 	= ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source_mobile[Math.floor(Math.random() * ads_opts.vid_ads_m_group_google_ima[0].vid_ads_m_ima_source_mobile.length)];
					}
				}
			}
			
			va_google_ima_source = adsIMARand;
			
		}
		
		if(ads_opts.vid_ads_m_group_image != null && Array.isArray(ads_opts.vid_ads_m_group_image) && ads_opts.vid_ads_m_group_image.length > 0){				
			var adsImageRand 	= ads_opts.vid_ads_m_group_image[Math.floor(Math.random() * ads_opts.vid_ads_m_group_image.length)],
				adsImageSource 	= $.trim(adsImageRand.vid_ads_m_image_source),
				adsImageLink 	= $.trim(adsImageRand.vid_ads_m_image_link);
				
			if(typeof(adsImageSource)!=='undefined' && adsImageSource!=''){
				va_image_source 	= adsImageSource;
				va_image_link 		= adsImageLink;
			}
		}
		
		if(ads_opts.vid_ads_m_group_html5_video != null && Array.isArray(ads_opts.vid_ads_m_group_html5_video) && ads_opts.vid_ads_m_group_html5_video.length > 0){				
			var adsVideoRand 	= ads_opts.vid_ads_m_group_html5_video[Math.floor(Math.random() * ads_opts.vid_ads_m_group_html5_video.length)],
				adsVideoSource 	= adsVideoRand.vid_ads_m_video_source,
				adsVideoLink 	= $.trim(adsVideoRand.vid_ads_m_video_link);
				
			if(typeof(adsVideoSource)==='object'){
				va_video_source 	= adsVideoSource;
				va_video_link 		= adsVideoLink;
			}
		}		
		
		if(	ads_opts.vid_ads_m_group_html != null 
			&& Array.isArray(ads_opts.vid_ads_m_group_html) 
			&& typeof(ads_opts.vid_ads_m_group_html[0]) === 'object' 
			&& typeof(ads_opts.vid_ads_m_group_html[0].vid_ads_m_html_source) !== 'undefined' 
			&& Array.isArray(ads_opts.vid_ads_m_group_html[0].vid_ads_m_html_source) 
			&& ads_opts.vid_ads_m_group_html[0].vid_ads_m_html_source.length > 0
		){
			var adsHTMLRand = ads_opts.vid_ads_m_group_html[0].vid_ads_m_html_source[Math.floor(Math.random() * ads_opts.vid_ads_m_group_html[0].vid_ads_m_html_source.length)];
			va_html_source = adsHTMLRand;	
			
			if( (adsHTMLRand.indexOf('ins class="adsbygoogle"')>0 || adsHTMLRand.indexOf('<ins class="adsbygoogle"')>0 || adsHTMLRand.indexOf('class="adsbygoogle"')>0 || (adsHTMLRand.indexOf('data-ad-client')>0 && adsHTMLRand.indexOf('data-ad-slot')>0) ) && adsHTMLRand.indexOf('script') == -1){
				va_html_source = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'+(adsHTMLRand)+'<script>(adsbygoogle=window.adsbygoogle||[]).push({});</script>';
			}
		}
		
		if(ads_opts.vid_ads_m_group_dynamic != null && Array.isArray(ads_opts.vid_ads_m_group_dynamic) && ads_opts.vid_ads_m_group_dynamic.length > 0){			
			
			var adsDynamicObj = ads_opts.vid_ads_m_group_dynamic[0];
				
			va_dynamic_type 		= (typeof(adsDynamicObj.vid_ads_m_dynamic_type) !== 'undefined'&&adsDynamicObj.vid_ads_m_dynamic_type!='')?adsDynamicObj.vid_ads_m_dynamic_type:'image';
			va_dynamic_size_desk 	= (typeof(adsDynamicObj.vid_ads_m_dynamic_size_desktop) !== 'undefined'&&adsDynamicObj.vid_ads_m_dynamic_size_desktop!='')?adsDynamicObj.vid_ads_m_dynamic_size_desktop:'336x280';
			va_dynamic_size_mob 	= (typeof(adsDynamicObj.vid_ads_m_dynamic_size_mobile) !== 'undefined'&&adsDynamicObj.vid_ads_m_dynamic_size_mobile!='')?adsDynamicObj.vid_ads_m_dynamic_size_mobile:'300x250';
			va_dynamic_size_vert 	= (typeof(adsDynamicObj.vid_ads_m_dynamic_vertial_align) !== 'undefined'&&adsDynamicObj.vid_ads_m_dynamic_vertial_align!='')?adsDynamicObj.vid_ads_m_dynamic_vertial_align:'bottom';
			
			if(va_dynamic_type == 'image'){
				va_dynamic_source 		= (typeof(adsDynamicObj.vid_ads_m_dyn_image_source) !== 'undefined'&&adsDynamicObj.vid_ads_m_dyn_image_source!='')?adsDynamicObj.vid_ads_m_dyn_image_source:'';
				if(window.innerWidth<992){
					va_dynamic_source 	= (typeof(adsDynamicObj.vid_ads_m_dyn_image_source_mob) !== 'undefined'&&adsDynamicObj.vid_ads_m_dyn_image_source_mob!='')?adsDynamicObj.vid_ads_m_dyn_image_source_mob:'';
				}
				va_dynamic_link 		= (typeof(adsDynamicObj.vid_ads_m_dyn_image_link) !== 'undefined'&&adsDynamicObj.vid_ads_m_dyn_image_link!='')?adsDynamicObj.vid_ads_m_dyn_image_link:'';
			}else if(va_dynamic_type == 'html'){
				var adsDynamicHTMLsource = (typeof(adsDynamicObj.vid_ads_m_dyn_html_source) !== 'undefined'&&adsDynamicObj.vid_ads_m_dyn_html_source!='')?adsDynamicObj.vid_ads_m_dyn_html_source:'';
				if(window.innerWidth<992){
					adsDynamicHTMLsource = (typeof(adsDynamicObj.vid_ads_m_dyn_html_source_mob) !== 'undefined'&&adsDynamicObj.vid_ads_m_dyn_html_source_mob!='')?adsDynamicObj.vid_ads_m_dyn_html_source_mob:'';
				}
				
				va_dynamic_source = adsDynamicHTMLsource;
				
				if( (adsDynamicHTMLsource.indexOf('ins class="adsbygoogle"')>0 || adsDynamicHTMLsource.indexOf('<ins class="adsbygoogle"')>0 || adsDynamicHTMLsource.indexOf('class="adsbygoogle"')>0 || (adsDynamicHTMLsource.indexOf('data-ad-client')>0 && adsDynamicHTMLsource.indexOf('data-ad-slot')>0) ) && adsDynamicHTMLsource.indexOf('script') == -1){
					va_dynamic_source = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'+(adsDynamicHTMLsource)+'<script>(adsbygoogle=window.adsbygoogle||[]).push({});</script>';
				}
			}
			
		}
		
		var vast_vpaid_mode	= (typeof(ads_opts.vid_ads_m_vpaid_mode)!=='undefined'&&ads_opts.vid_ads_m_vpaid_mode=='yes')?true:false;
		
		if(ads_opts.vid_ads_m_vast_preroll != null && Array.isArray(ads_opts.vid_ads_m_vast_preroll) && typeof(ads_opts.vid_ads_m_vast_preroll[0]) === 'object' 
		&& typeof(ads_opts.vid_ads_m_vast_preroll[0].vid_ads_m_vast_tag_pre) !== 'undefined' && $.trim(ads_opts.vid_ads_m_vast_preroll[0].vid_ads_m_vast_tag_pre)!=''){				
			va_vast_preroll = $.trim(ads_opts.vid_ads_m_vast_preroll[0].vid_ads_m_vast_tag_pre);
		}
		
		if(ads_opts.vid_ads_m_vast_postroll != null && Array.isArray(ads_opts.vid_ads_m_vast_postroll) && typeof(ads_opts.vid_ads_m_vast_postroll[0]) === 'object'
		&& typeof(ads_opts.vid_ads_m_vast_postroll[0].vid_ads_m_vast_tag_post) !== 'undefined' && $.trim(ads_opts.vid_ads_m_vast_postroll[0].vid_ads_m_vast_tag_post)!=''){				
			va_vast_postroll = $.trim(ads_opts.vid_ads_m_vast_postroll[0].vid_ads_m_vast_tag_post);
		}
		
		if(ads_opts.vid_ads_m_vast_pauseroll != null && Array.isArray(ads_opts.vid_ads_m_vast_pauseroll) && typeof(ads_opts.vid_ads_m_vast_pauseroll[0]) === 'object'
		&& typeof(ads_opts.vid_ads_m_vast_pauseroll[0].vid_ads_m_vast_tag_pause) !== 'undefined' && $.trim(ads_opts.vid_ads_m_vast_pauseroll[0].vid_ads_m_vast_tag_pause)!=''){				
			va_vast_pauseroll = $.trim(ads_opts.vid_ads_m_vast_pauseroll[0].vid_ads_m_vast_tag_pause);
		}
		
		if(ads_opts.vid_ads_m_vast_midroll != null && Array.isArray(ads_opts.vid_ads_m_vast_midroll) && ads_opts.vid_ads_m_vast_midroll.length > 0){				
			va_vast_midroll = ads_opts.vid_ads_m_vast_midroll;
		}
		
		if(global){
			
			_.ads_enable 			= ads_enable;	
			_.ads_network 			= ads_network;
			_.time_to_show_ads 		= time_to_show_ads_arr;
			_.time_skip_ads 		= time_skip_ads;
			_.time_to_hide_ads 		= time_to_hide_ads;
			
			_.va_google_ima_source 	= va_google_ima_source;
			
			_.va_image_source 		= va_image_source;
			_.va_image_link 		= va_image_link;
			
			_.va_video_source 		= va_video_source;
			_.va_video_link 		= va_video_link;
			
			_.va_html_source 		= va_html_source;
			
			_.va_dynamic_type 		= va_dynamic_type;
			_.va_dynamic_size_desk 	= va_dynamic_size_desk;
			_.va_dynamic_size_mob 	= va_dynamic_size_mob;
			_.va_dynamic_size_vert 	= va_dynamic_size_vert;
			_.va_dynamic_source 	= va_dynamic_source;
			_.va_dynamic_link 		= va_dynamic_link;
			
			_.vast_vpaid_mode		= vast_vpaid_mode;
			_.va_vast_preroll 		= va_vast_preroll;			
			_.va_vast_postroll 		= va_vast_postroll;
			_.va_vast_pauseroll  	= va_vast_pauseroll;
			_.va_vast_midroll  		= va_vast_midroll;
			
		}else{
			return {
				'ads_enable': 			ads_enable,
				'ads_network': 			ads_network,
				'time_to_show_ads': 	time_to_show_ads,
				'time_skip_ads': 		time_skip_ads,
				'time_to_hide_ads': 	time_to_hide_ads,
				'va_google_ima_source': va_google_ima_source,
				'va_image_source': 		va_image_source,
				'va_image_link': 		va_image_link,
				'va_video_source': 		va_video_source,
				'va_video_link': 		va_video_link,
				'va_html_source': 		va_html_source,
				
				'va_dynamic_type': 		va_dynamic_type,
				'va_dynamic_size_desk': va_dynamic_size_desk,
				'va_dynamic_size_mob': 	va_dynamic_size_mob,
				'va_dynamic_size_vert': va_dynamic_size_vert,
				'va_dynamic_source': 	va_dynamic_source,
				'va_dynamic_link': 		va_dynamic_link,
				
				'vast_vpaid_mode': 		vast_vpaid_mode,
				'va_vast_preroll': 		va_vast_preroll,
				'va_vast_postroll': 	va_vast_postroll,
				'va_vast_pauseroll': 	va_vast_pauseroll,
				'va_vast_midroll': 		va_vast_midroll,
			};
		}
	}
		
	/*init function [Core]*/
	vidorev_theme.prototype.init = function(){
		var _ = this;
		
		scrollDir({ 
			attribute: 'data-vp-scroll-direction'
		});
		
		_.mobile_menu_open();
		_.mobile_menu_items();
		_.fading_slide_control();
		_.clone_nav();	
		_.top_search_dropdown();	
		_.blog_switch_view();
		_.ajax_load_post();
		_.ajax_infinite_scroll();
		_.single_slider();
		_.video_light_off();
		_.video_share_toolbar();
		_.create_single_video_player();
		_.close_video_player_floating();
		_.auto_next_control();
		_.open_lightbox_video();
		_.close_lightbox_video_title();
		_.close_lightbox_video();
		_.add_scroll_bar_for_playlist();
		_.watch_later();
		_.archive_sort_button();
		_.scroll_control();
		_.alphabet_filter_action();	
		_.sticky_menu();	
		_.sticky_sidebar();
		_.popular_slider();
		_.megamenu_control();
		_.open_lightbox_image();
		_.video_repeat();
		_.amazon_product_link_action();	
		_.download_lightbox();
		_.side_menu();
		_.sv_showmore_content();
		_.video_theater_mode();
		
		_.window_load();
		_.window_resize();
		_.window_scroll();
		
		_.document_control();
		_.facebook_comment_control();
		_.facebook_like_button_control();
		_.single_video_clean_action();
		
		/*init*/		
		_.$el.trigger(prefix+'init', [_]);/*init*/
	}/*init function [Core]*/
	
	vidorev_theme.prototype.window_load = function(){
		var _ = this;
		$(window).on('load', function(){
			
		});
	}

	vidorev_theme.prototype.window_resize = function(){
		var _ 				= this,
			default_width 	= window.innerWidth;
			
		$(window).on('resize', function(){
			if(default_width === window.innerWidth){
				return;
			}
			
			default_width 	= window.innerWidth;
		});
	}

	vidorev_theme.prototype.window_scroll = function(){
		var _ = this;
		
		$(window).on('scroll', function(){
			_.sticky_menu();
			_.ajax_infinite_scroll();
			_.video_player_floating();
			_.scroll_to_top_button();
		});
	}
	vidorev_theme.prototype.document_control = function(){
		var _ = this;
		$(document).on('click', function(e){			

		});
	}
	
	vidorev_theme.prototype.scroll_to_top_button = function(){
		var _ = this;
		
		var $scroll_to_top_button = $('.scroll-to-top-button-control');
		
		if($scroll_to_top_button.length === 0){
			return;
		}
		
		if(document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight){
			$scroll_to_top_button.addClass('active-item').find('a').on('click.scrollToTop', function(){
				$('html, body').stop().animate({scrollTop:0}, {duration:500}, function(){});
				return false;
			});
		}else{
			$scroll_to_top_button.removeClass('active-item').find('a').off('.scrollToTop');
		}
	}
	
	vidorev_theme.prototype.megamenu_control = function(){
		var _ = this;
		
		_.$el.off('.megamenuControl').on('mouseenter.megamenuControl', '.megamenu-item-control', function(e){
			var $t = $(this),
				$parent = $t.parents('.megamenu-wrapper-control');
				
			$parent.find('.megamenu-item-control').addClass('hidden-item').removeClass('active-item');	
			$t.addClass('active-item').removeClass('hidden-item');
			
			var attrID = $.trim($t.attr('data-id'));
			if(typeof(attrID)!=='undefined' && attrID!=''){
				if($parent.find('.sc-blocks-container-control').length > 0){
					$parent.find('.sc-blocks-container-control').addClass('hidden-item').removeClass('active-item');
					$parent.find('.sc-blocks-container-control[data-id="'+(attrID)+'"]').addClass('active-item').removeClass('hidden-item');
				}else{
					$parent.find('.blog-wrapper-control').addClass('hidden-item').removeClass('active-item');
					$parent.find('.blog-wrapper-control[data-id="'+(attrID)+'"]').addClass('active-item').removeClass('hidden-item');
				}	
				
			}
		})
	}
	
	vidorev_theme.prototype.mobile_menu_open = function(){
		var _ = this;
		_.$el.off('.mobileMenuOpen').on('click.mobileMenuOpen', '.button-menu-mobile-control', function(e){
			_.$el.toggleClass('active-mobile-menu');
		})
	}
	
	vidorev_theme.prototype.mobile_menu_items = function(){
		var _ = this;
		_.$el.find('.vp-mobile-menu-items-control > ul > li.menu-item-has-children, .widget_nav_menu ul.menu > li.menu-item-has-children').each(function(index, element) {
			var $t = $(this),
				btn_control_class = 'open-submenu-'+(index);
			$t.append('<span class="open-submenu-mobile '+(btn_control_class)+'"><i class="fa fa-angle-right" aria-hidden="true"></i></span>').find('.'+(btn_control_class)).on('click', function(){
				$t.toggleClass('active-sub-menu').children('ul').slideToggle({duration:368});
			});
		});
	}
	
	vidorev_theme.prototype.fading_slide_control = function(){
		var _ = this;
		$('.fading-slide-control', _.$el).each(function(index, element){
			var $t = $(this);
			
			if($t.find('li').length<2){
				return;
			}
			
			if($t.find('.active-item').length === 0){
				$t.find('li:first-child').addClass('active-item');
			}
			
			setInterval(function(){
				var $next_item = $t.find('.active-item').next('li');
				if($next_item.length === 0){
					$next_item = $t.find('li:first-child');
				}
				
				$t.find('.active-item').removeClass('active-item').css({'display':'none'});
				$next_item.addClass('active-item').fadeIn('slow');
			}, 5000);
		});		
	}
	
	vidorev_theme.prototype.clone_nav = function(){
		var _ = this;
		
		if(!_.sticky_menu_on || $('.main-nav-control', _.$el).length===0){
			return;
		}
			
		$('.main-nav-control', _.$el).clone(true).addClass('sticky-menu-control sticky-menu').find('.wpdreams_asl_container').remove().end().insertAfter('#site-header');
	}
	
	vidorev_theme.prototype.sticky_menu = function(){
		var _ = this;
		
		var $nav_wrap_control = $('.nav-wrap-control', _.$el),
			$sticky_menu_control = $('.sticky-menu-control', _.$el);
		
		if(!_.sticky_menu_on || $sticky_menu_control.length===0){
			return;
		}
			
		if(_.sticky_behavior==='down'){
			if($(window).scrollTop() > $nav_wrap_control.offset().top+$nav_wrap_control.height()+10 && !$sticky_menu_control.hasClass('active-item')){
				$sticky_menu_control.addClass('active-item setTransit');				
				_.$el.trigger(prefix+'stickyMenuShow', [_]);			
			}else if($(window).scrollTop() <= $nav_wrap_control.offset().top && $sticky_menu_control.hasClass('active-item')){
				$sticky_menu_control.removeClass('active-item setTransit').find('a.top-search-dropdown-control').removeClass('active-item');
				$sticky_menu_control.removeClass('active-item setTransit').find('a.top-login-mobile-dropdown-control').removeClass('active-item');
				_.$el.trigger(prefix+'stickyMenuHide', [_]);
			}			
			return;
		}	
		
		if(window.global_up_down_scroll === 'up'){
			if($(window).scrollTop() > $nav_wrap_control.offset().top+$nav_wrap_control.height()+10 && !$sticky_menu_control.hasClass('active-item')){
				$sticky_menu_control.addClass('active-item setTransit');
				_.$el.trigger(prefix+'stickyMenuShow', [_]);
			}else if($(window).scrollTop() <= $nav_wrap_control.offset().top && $sticky_menu_control.hasClass('active-item')){
				$sticky_menu_control.removeClass('active-item setTransit').find('a.top-search-dropdown-control').removeClass('active-item');
				$sticky_menu_control.removeClass('active-item setTransit').find('a.top-login-mobile-dropdown-control').removeClass('active-item');
				_.$el.trigger(prefix+'stickyMenuHide', [_]);
			}
		}else if(window.global_up_down_scroll === 'down'){
			$sticky_menu_control.removeClass('active-item');
			_.$el.trigger(prefix+'stickyMenuHide', [_]);
		}
	}
	
	vidorev_theme.prototype.top_search_dropdown = function(){
		var _ = this;
		
		_.$el.off('.topSearchDropdown').on('click.topSearchDropdown', 'a.top-search-dropdown-control', function(e){
			
			_.$el.trigger(prefix+'topSearchDropdownBefore', [_]);
			
			var $t 		= $(this),
				$textfield = $t.parents('.top-search-elm-control').find('.search-terms-textfield-control');
				
			$t.toggleClass('active-item');	
			
			if($t.hasClass('active-item')){
				setTimeout(function(){
					$textfield.focus();
				}, 200);
				$textfield.focus();				
			}
			
			_.$el.trigger(prefix+'topSearchDropdownAfter', [_]);
			
			return false;
		});
		
		_.$el.off('.topLoginMobileDropdown').on('click.topLoginMobileDropdown', 'a.top-login-mobile-dropdown-control', function(e){
			
			_.$el.trigger(prefix+'topLoginMobileDropdownBefore', [_]);
			
			var $t 		= $(this);
				
			$t.toggleClass('active-item');
			
			_.$el.trigger(prefix+'topLoginMobileDropdownAfter', [_]);
			
			return false;
		});		
	}
	
	vidorev_theme.prototype.blog_switch_view = function(){
		var _ = this;
		
		_.$el.off('.blogSwitchView').on('click.blogSwitchView', '.switch-control', function(e){
			var $t = $(this),
				$blog_items = _.$el.find('.blog-items-control');
				
			var $parent = $t.parents('.series-heading-control');
			if($parent.length > 0 && $parent.next('.blog-items-control').length > 0){
				$blog_items = $parent.next('.blog-items-control');
			}
				
			if($blog_items.length > 0 && ( $blog_items.hasClass('grid-default') || $blog_items.hasClass('list-default') )){
				if($parent.length > 0){
					$parent.find('.switch-control').removeClass('active-item');
				}else{
					$('.switch-control').removeClass('active-item');
				}
				$t.addClass('active-item');
				if($t.hasClass('grid-icon')){
					$blog_items.addClass('grid-default').removeClass('list-default');
				}else if($t.hasClass('list-icon')){
					$blog_items.addClass('list-default').removeClass('grid-default');
				}
			}	
		});
	}
	
	vidorev_theme.prototype.ajax_post_action = function($t){
		var _ = this;
		
		if(_.global_blog_page === -1 || !_.global_blog_ajax_load){
			$t.blur();
			return false;
		}
		
		_.global_blog_ajax_load = false;
		
		var template 	= $t.attr('data-template'),
			style 		= $t.attr('data-style'),
			$parent		= $t.parents('.blog-wrapper-control'),
			$apply_html = $parent.find('.blog-items-control'),
			
			data 		= {
				'action': 		'blog_ajax_load_post',
				'blog_page': 	_.global_blog_page,
				'template': 	template,
				'query_vars':	vidorev_jav_js_object.query_vars,
				'style': 		style,
				'archive_query':(typeof(vidorev_jav_js_object.archive_query)!=='undefined')?vidorev_jav_js_object.archive_query:'',
				'alphabet_filter':(typeof(vidorev_jav_js_object.alphabet_filter)!=='undefined')?vidorev_jav_js_object.alphabet_filter:'',	
				'theme_image_ratio':(typeof(vidorev_jav_js_object.theme_image_ratio)!=='undefined')?vidorev_jav_js_object.theme_image_ratio:'',
				'security':		(typeof(vidorev_jav_js_object.security)!=='undefined')?vidorev_jav_js_object.security:'',
			};
			
		$t.addClass('ajax-loading active-item');	
			
		$.ajax({
			type: 		'POST',
			url: 		vidorev_jav_js_object.admin_ajax,
			cache: 		false,
			data: 		data,
			dataType: 	'html',
			success: 	function(data, textStatus, jqXHR){
				if(data != ''){
				
					$apply_html.append(data);
				
					_.global_blog_page = _.global_blog_page + 1;		
					
					if(typeof(vidorev_builder_control)!=="undefined" && vidorev_builder_control!==null){	
						vidorev_builder_control.imdb_rating_jsonp();		
					}
					
					if(typeof(window.vidorev_visible_image_opacity) !== 'undefined'){
						window.vidorev_visible_image_opacity();
					}
					
					if($apply_html.find('.blog-last-page-control').length>0){
						$parent.find('.blog-last-page-control').remove();
						$parent.find('.blog-pagination-control').remove();
					}
					
					_.$el.trigger('ajaxloadpostcomplete_themeControl', [_]);
				
				} else {
					
					_.global_blog_page = -1;
											
				}					
				
				_.global_blog_ajax_load = true;
				$t.removeClass('ajax-loading active-item').blur();
			},
			error: function( jqXHR, textStatus, errorThrown ){
				_.global_blog_ajax_load = true;
				$t.removeClass('ajax-loading active-item').blur();
			}
		});	
	}
	
	vidorev_theme.prototype.ajax_load_post = function(){
		var _ = this;
			
		_.$el.off('.ajaxLoadPost').on('click.ajaxLoadPost', 'a.loadmore-btn-control', function(e){
			
			var $t = $(this);
			
			_.ajax_post_action($t);
						
			return false;
		});
	}
	
	vidorev_theme.prototype.ajax_infinite_scroll = function(){
		var _ = this;
		
		var $infinite = _.$el.find('.infinite-scroll-control');
		
		if($infinite.length === 0){			
			return;
		}
		$infinite.each(function(index, element){
			var $t = $(this),
				ajaxVisible 	= $t.offset().top,
				ajaxScrollTop 	= $(window).scrollTop()+$(window).height();
				
			if(ajaxVisible <= (ajaxScrollTop) && (ajaxVisible + $(window).height()) > ajaxScrollTop){
				_.ajax_post_action($t);
			};	
		});
	}
	
	vidorev_theme.prototype.facebook_like_button_control = function(){
		var _ = this;
		
		var $fb_like_button_control = _.$el.find('.fb-like');
		
		if($fb_like_button_control.length === 0 || $fb_like_button_control.find('iframe').length > 0){
			return;
		}
		
		var requ_fnc 	= (typeof(FB)!=='undefined' && typeof(FB.Event)!=='undefined');
		var requ_url	= (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.facebook_library_url)!=='undefined' && vidorev_jav_plugin_js_object.facebook_library_url!='')?vidorev_jav_plugin_js_object.facebook_library_url:'https://connect.facebook.net/en_US/sdk.js?ver=6.0#xfbml=1&version=v6.0';
		if(!requ_fnc){			
			_.requestScript(requ_url, function(){});
		}		
	}
	
	vidorev_theme.prototype.facebook_comment_control = function(){
		var _ = this;
		
		var $fb_scroll = _.$el.find('#vidorev_facebook_comment');
		
		if($fb_scroll.length === 0 || $fb_scroll.find('iframe').length > 0){
			return;
		}
		
		var requ_fnc 	= (typeof(FB)!=='undefined' && typeof(FB.Event)!=='undefined');
		var requ_url	= (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.facebook_library_url)!=='undefined' && vidorev_jav_plugin_js_object.facebook_library_url!='')?vidorev_jav_plugin_js_object.facebook_library_url:'https://connect.facebook.net/en_US/sdk.js?ver=6.0#xfbml=1&version=v6.0';
		if(!requ_fnc){
			$fb_scroll.append('<div class="fb-load-comment-icon-control"><span class="video-load-icon"></span></div>');
			_.requestScript(requ_url, function(){
				var fb_triggerInterval = setInterval(function(){					
					if($fb_scroll.find('iframe').length > 0){												
						clearInterval(fb_triggerInterval);
						setTimeout(function(){
							$fb_scroll.find('.fb-load-comment-icon-control').remove();
						},688);					
					}
				},368);	
			});
		}		
	}	
	
	vidorev_theme.prototype.single_slider = function(){
		var _ = this;
		
		_.$el.find('.is-single-slider').each(function(index, element){
			var $t = $(this),
				$parent_wg = $t.parents('.vidorev-post-extensions');
			
			var options = {
				arrows:true,
				dots: true,
				infinite: true,
				speed: 500,
				slidesToShow: 1,
				adaptiveHeight: true,
				focusOnSelect: false,
				prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
			};
			
			if($t.hasClass('effect-fade')){
				options['fade'] = true;
			}
			
			$t.on('init', function(event, slick){
				if($parent_wg.length > 0){
					var $arrow_prev = $parent_wg.find('.widget-arrow-prev-control');
					var $arrow_next = $parent_wg.find('.widget-arrow-next-control');
					$arrow_prev.on('click', function(){
						slick.slickPrev();
					});
					$arrow_next.on('click', function(){
						slick.slickNext();
					});
				}
			});
			
			$t.find('img.ul-normal-effect').addClass('img-effect-setup img-loaded');
			$t.slick(options);
			
		});

	}
	
	vidorev_theme.prototype.video_light_off = function(){
		var _ = this;
		_.$el.off('.videoLightOffBTN').on('click.videoLightOffBTN', '.turn-off-light-control', function(e){
			var $t = $(this);
			$t.toggleClass('active-item');
			_.$el.toggleClass('light-off-enabled');					
		});
	}
	
	vidorev_theme.prototype.video_share_toolbar = function(){
		var _ = this;
		_.$el.off('.videoShareToolbar').on('click.videoShareToolbar', '.share-control', function(e){
			var $t 		= $(this),
				$parent = $t.parents('.single-player-video-wrapper');
				
			$t.toggleClass('active-item');
			$parent.find('.social-share-toolbar-control').toggleClass('active-item');					
		});
	}
	
	vidorev_theme.prototype.alphabet_filter_action = function(){
		var _ = this;
		_.$el.off('.alphabetFilterAction').on('click.alphabetFilterAction', '.alphabet-filter-control', function(e){			
			_.$el.toggleClass('active-alphabet-filter');					
		});
		
		$('#vidorev-advance-search-control').removeClass('init-loading-filter');
	}
	
	vidorev_theme.prototype.getMobileOperatingSystem = function(){
		return navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/);
	}
	
	vidorev_theme.prototype.loadAdsLibraries = function(callback){
		var _ 					= this,
			requ_fnc_adsense 	= (typeof(window)!=='undefined' && typeof(window.adsbygoogle)!=='undefined'),
			requ_fnc_ima 		= (typeof(google)!=='undefined' && typeof(google.ima)!=='undefined'),
			requ_url_adsense	= (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.google_adsense_library_url)!=='undefined' && vidorev_jav_plugin_js_object.google_adsense_library_url!='')?vidorev_jav_plugin_js_object.google_adsense_library_url:'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
			requ_url_ima		= (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.google_ima_library_url)!=='undefined' && vidorev_jav_plugin_js_object.google_ima_library_url!='')?vidorev_jav_plugin_js_object.google_ima_library_url:'https://imasdk.googleapis.com/js/sdkloader/ima3.js';
		
		if(requ_fnc_adsense && requ_fnc_ima){
			callback();
		}else if(!requ_fnc_adsense && !requ_fnc_ima){
			_.requestScript(requ_url_adsense, function(){
				_.requestScript(requ_url_ima, callback);
			});
		}else{
			if(!requ_fnc_adsense){
				_.requestScript(requ_url_adsense, callback);
			}
			if(!requ_fnc_ima){
				_.requestScript(requ_url_ima, callback);
			}
		}
	}
	
	vidorev_theme.prototype.setYoutubeAPIReady = function(vid_id){
		
		var _ = 			this,
			prefix_vid_id = '';
			
		if(typeof(vid_id)!=='undefined'){
			prefix_vid_id = vid_id;
		}	
		
		setTimeout(function(){
			if($('script[src*="youtube.com/iframe_api"]').length>0 || $('script[src*="www-widgetapi.js"]').length>0){			
			
				var triggerInterval = setInterval(function(){					
					if(typeof(YT)!=='undefined' && typeof(YT.Player)!=='undefined'){
						_.loadAdsLibraries(function(){
							$(document).trigger(prefix+'youtubeAPIReady'+(prefix_vid_id), []);
						});						
						clearInterval(triggerInterval);
					}
				},368);			
				
			}else{
				
				var you_API_YTdeferred = $.Deferred();	
				
				window.onYouTubeIframeAPIReady = function(){
					you_API_YTdeferred.resolve(window.YT);
				}
						
				var tag = document.createElement('script');
				tag.src = (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.youtube_library_url)!=='undefined' && vidorev_jav_plugin_js_object.youtube_library_url!='')?vidorev_jav_plugin_js_object.youtube_library_url:'https://www.youtube.com/iframe_api';
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			
				you_API_YTdeferred.done(function(YT){
					_.loadAdsLibraries(function(){
						$(document).trigger(prefix+'youtubeAPIReady'+(prefix_vid_id), []);	
					});
				});
			}
		},368);	
	}
	
	vidorev_theme.prototype.setVideo3rdPartyAPIReady = function(vid_id, triggerName, networkAPI){
		
		var _ = 			this,
			prefix_vid_id = '';
			
		if(typeof(vid_id)!=='undefined'){
			prefix_vid_id = vid_id;
		}
			
		switch(networkAPI){
			case 'jw':
				var requ_fnc 	= (typeof(jwplayer)!=='undefined');
				var requ_url	= (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.jwplayer_library_url)!=='undefined' && vidorev_jav_plugin_js_object.jwplayer_library_url!='')?vidorev_jav_plugin_js_object.jwplayer_library_url:'';
				break;
			
			case 'fluidplayer':
				var requ_fnc 	= (typeof(fluidPlayer)!=='undefined');
				var requ_url	= (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.fluidplayer_library_url)!=='undefined' && vidorev_jav_plugin_js_object.fluidplayer_library_url!='')?vidorev_jav_plugin_js_object.fluidplayer_library_url:'';
				break;
				
			case 'Plyr':
				var requ_fnc 	= (typeof(Plyr)!=='undefined');
				var requ_url	= (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.plyr_library_url)!=='undefined' && vidorev_jav_plugin_js_object.plyr_library_url!='')?vidorev_jav_plugin_js_object.plyr_library_url:'';
				break;	
				
			case 'vimeo':
				var requ_fnc 	= (typeof(Vimeo)!=='undefined' && typeof(Vimeo.Player)!=='undefined');
				var requ_url	= (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.vimeo_library_url)!=='undefined' && vidorev_jav_plugin_js_object.vimeo_library_url!='')?vidorev_jav_plugin_js_object.vimeo_library_url:'https://player.vimeo.com/api/player.js';
				break;
				
			case 'dailymotion':
				var requ_fnc 	= (typeof(DM)!=='undefined' && typeof(DM.player)!=='undefined');
				var requ_url	= (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.dailymotion_library_url)!=='undefined' && vidorev_jav_plugin_js_object.dailymotion_library_url!='')?vidorev_jav_plugin_js_object.dailymotion_library_url:'https://api.dmcdn.net/all.js';
				break;
				
			case 'facebook':
				var requ_fnc 	= (typeof(FB)!=='undefined' && typeof(FB.Event)!=='undefined');
				var requ_url	= (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.facebook_library_url)!=='undefined' && vidorev_jav_plugin_js_object.facebook_library_url!='')?vidorev_jav_plugin_js_object.facebook_library_url:'https://connect.facebook.net/en_US/sdk.js?ver=6.0#xfbml=1&version=v6.0';
				break;
				
			case 'twitch':
				var requ_fnc 	= (typeof(Twitch)!=='undefined' && typeof(Twitch.Player)!=='undefined');
				var requ_url	= (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.twitch_library_url)!=='undefined' && vidorev_jav_plugin_js_object.twitch_library_url!='')?vidorev_jav_plugin_js_object.twitch_library_url:'https://player.twitch.tv/js/embed/v1.js';
				break;
				
			case 'selfhosted':
				var requ_fnc 	= (typeof(mejs)!=='undefined');
				var requ_url	= (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.mediaelement_library_url)!=='undefined' && vidorev_jav_plugin_js_object.mediaelement_library_url!='')?vidorev_jav_plugin_js_object.mediaelement_library_url:'';
				break;								
		}
		
		if(typeof(requ_fnc)==='undefined' || typeof(requ_url)==='undefined' || $.trim(requ_url)==''){
			return;
		}
		
		if(requ_fnc){
			_.loadAdsLibraries(function(){
				$(document).trigger(prefix+(triggerName)+(prefix_vid_id), []);
			});
		}else{
			_.requestScript(requ_url, function(){
				_.loadAdsLibraries(function(){
					$(document).trigger(prefix+(triggerName)+(prefix_vid_id), []);	
				});
			});
		}	
	}
	
	vidorev_theme.prototype.create_single_video_player = function(player_id, obj){
		var _ = this;
		
		if(typeof(obj)!=='undefined'){
			var player_obj 	= obj,
				autoplay 	= 'off',
				lightbox_cf = true;
				
				if(typeof(player_obj.sc_autoplay_valid)!=='undefined' && player_obj.sc_autoplay_valid==='on'){
					if(!_.getMobileOperatingSystem()){
						autoplay 	= 'on';
					}
					lightbox_cf = false;
				}
		}else{			
			if(typeof(vidorev_jav_js_object)!=='undefined' && typeof(vidorev_jav_js_object.single_video_network)!=='undefined' && typeof(vidorev_jav_js_object.single_video_source)!=='undefined' && typeof(vidorev_jav_js_object.single_video_url)!=='undefined' && typeof(vidorev_jav_js_object.single_video_network_library_setup)!=='undefined'){
				var player_obj = vidorev_jav_js_object,
					autoplay = _.global_video_autoplay;
			}else{
				if(typeof(vidorev_jav_js_object.single_video_network_library_setup)==='undefined' && $('#player-api-control').length > 0){
					$('#player-api-control').append('<div class="require-plugin-player">You need to have installed "VidoRev Extensions Plugin" for used this feature.</div>').parents('.player-3rdparty-control').addClass('player-loaded');;
				}				
				return '';
			}			
		}
		
		/*if(typeof(player_obj.player_library)!=='undefined' && player_obj.player_library!='vp'){
			return '';
		}*/
				
		if(typeof(player_obj)!=='undefined' && typeof(player_obj.single_video_network)!=='undefined' && typeof(player_obj.single_video_source)!=='undefined' && typeof(player_obj.single_video_url)!=='undefined'){
			var single_video_network = player_obj.single_video_network,
				single_video_source = player_obj.single_video_source,
				single_video_url = player_obj.single_video_url;
				
				if(typeof(player_obj.ebs_sco_check)!=='undefined'){				
					single_video_url = _.check_atob(single_video_url);		
				}	
				
				if(typeof(player_id)==='undefined' || player_id === null){
					player_id = 'player-api-control'
				}
				
			if($('#'+(player_id)).length === 0){
				return '';
			}
			
			if(typeof(player_obj.vm_video_ratio)){
				var single_player_ratio = $.trim(player_obj.vm_video_ratio);
				if(single_player_ratio!='' && single_player_ratio!='16:9' && single_player_ratio.indexOf(':')>-1){
					var arr_spr = single_player_ratio.split(':');
					if(arr_spr.length === 2 && _.isNumber(arr_spr[0]) && _.isNumber(arr_spr[1])){						
						var final_ratio = arr_spr[1]/arr_spr[0]*100;
						var $parent_wrap_ratio = $('#'+(player_id)).parents('.video-player-wrap');
						$parent_wrap_ratio.addClass('parent_ratio_custom_'+(player_id));
						$('head').append('<style type="text/css">@media(min-width:768px){.parent_ratio_custom_'+(player_id)+' .video-player-ratio{padding-top:'+(final_ratio)+'%}}</style>');
					}
				}
			}	
			
			if(typeof(player_obj.vm_video_ratio_mobile)){
				var single_player_ratio_mobile = $.trim(player_obj.vm_video_ratio_mobile);
				if(single_player_ratio_mobile!='' && single_player_ratio_mobile!='16:9' && single_player_ratio_mobile.indexOf(':')>-1){
					var arr_spr_mobile = single_player_ratio_mobile.split(':');
					if(arr_spr_mobile.length === 2 && _.isNumber(arr_spr_mobile[0]) && _.isNumber(arr_spr_mobile[1])){						
						var final_ratio_mobile = arr_spr_mobile[1]/arr_spr_mobile[0]*100;
						var $parent_wrap_ratio_mobile = $('#'+(player_id)).parents('.video-player-wrap');
						$parent_wrap_ratio_mobile.addClass('parent_ratio_mobile_custom_'+(player_id));
						$('head').append('<style type="text/css">@media(max-width:767px){.parent_ratio_mobile_custom_'+(player_id)+' .video-player-ratio{padding-top:'+(final_ratio_mobile)+'%}}</style>');
					}
				}
			}	
			
			if(single_video_network=='drive' && $('#'+(player_id)).find('iframe[src*="https://drive.google.com"]').length > 0){
				single_video_network = 'embeded-code';
			}
				
			var $partyElm 			= $('#'+(player_id)).parents('.player-3rdparty-control'),
				player_init_id 		= (player_id)+'-init',
				$player 			= null,
				options 			= {},
				video_duration		= '',
				video_current_time	= '',
				first_create		= true,
				$poster_preload		= $partyElm.find('.autoplay-off-elm-control'),
				$playerMutedControl = $partyElm.find('.player-muted-control'),
				poster_background	= $poster_preload.attr('data-background-url');	
				
			if(typeof(player_obj.membership) && $.trim(player_obj.membership) != '' && (player_obj.membership).indexOf('<div class="trailer-notice">')==-1 && lightbox_cf == true){
				$('#'+(player_id)).html(player_obj.membership);
				$partyElm.addClass('player-loaded');
				return '';
			}
			
			if(typeof(player_obj.membership) && $.trim(player_obj.membership) != '' && (player_obj.membership).indexOf('<div class="trailer-notice">')>-1 && lightbox_cf == true){
				$partyElm.append(player_obj.membership);
			}
			
			if(typeof(player_obj.prime_video) && $.trim(player_obj.prime_video) != '' && lightbox_cf == true){
				$('#'+(player_id)).html(player_obj.prime_video);
				$partyElm.addClass('player-loaded');
				return '';
			}
			
			if(typeof(player_obj.woo_membership) && $.trim(player_obj.woo_membership) != '' && lightbox_cf == true){
				$('#'+(player_id)).html(player_obj.woo_membership);
				$partyElm.addClass('player-loaded');
				return '';
			}
			
			if(typeof(player_obj.mycred_sell) && $.trim(player_obj.mycred_sell) != '' && lightbox_cf == true){
				$('#'+(player_id)).html(player_obj.mycred_sell);
				$partyElm.addClass('player-loaded');
				return '';
			}
			
			if(typeof(player_obj.login_user_lock) && $.trim(player_obj.login_user_lock) != '' && lightbox_cf == true){
				$('#'+(player_id)).html(player_obj.login_user_lock);
				$partyElm.addClass('player-loaded');
				return '';
			}
				
			/*video ads params*/	
			var ads_enable 				= _.ads_enable,
				ads_network 			= _.ads_network,
				time_to_show_ads 		= _.time_to_show_ads,
				time_skip_ads 			= _.time_skip_ads,
				time_to_hide_ads 		= _.time_to_hide_ads,
				va_google_ima_source 	= _.va_google_ima_source,
				va_image_source 		= _.va_image_source,
				va_image_link 			= _.va_image_link,
				va_video_source 		= _.va_video_source,
				va_video_link 			= _.va_video_link,
				va_html_source 			= _.va_html_source,
				
				va_dynamic_type 		= _.va_dynamic_type,
				va_dynamic_size_desk 	= _.va_dynamic_size_desk,
				va_dynamic_size_mob 	= _.va_dynamic_size_mob,
				va_dynamic_size_vert 	= _.va_dynamic_size_vert,
				va_dynamic_source 		= _.va_dynamic_source,
				va_dynamic_link 		= _.va_dynamic_link,
				
				vast_vpaid_mode 		= _.vast_vpaid_mode,
				va_vast_preroll 		= _.va_vast_preroll,
				va_vast_postroll 		= _.va_vast_postroll,
				va_vast_pauseroll 		= _.va_vast_pauseroll,
				va_vast_midroll 		= _.va_vast_midroll;
					
			if(	typeof(player_obj.vidorev_jav_plugin_video_ads_object_post) === 'object'){
				
				if(typeof(player_obj.vidorev_jav_plugin_video_ads_object_post.vid_ads_m_video_ads_type) !== 'undefined' && $.trim(player_obj.vidorev_jav_plugin_video_ads_object_post.vid_ads_m_video_ads_type) != ''){				
					var new_ads_opts 	= $.extend({}, _.default_ads_otps, player_obj.vidorev_jav_plugin_video_ads_object_post);
					var new_ads_params 	= _.get_ads_params(new_ads_opts, false);				
					
					ads_network 			= new_ads_params.ads_network;
					time_to_show_ads 		= new_ads_params.time_to_show_ads;
					time_skip_ads 			= new_ads_params.time_skip_ads;
					time_to_hide_ads 		= new_ads_params.time_to_hide_ads;
					va_google_ima_source 	= new_ads_params.va_google_ima_source;
					va_image_source 		= new_ads_params.va_image_source;
					va_image_link 			= new_ads_params.va_image_link;
					va_video_source 		= new_ads_params.va_video_source;
					va_video_link 			= new_ads_params.va_video_link;
					va_html_source 			= new_ads_params.va_html_source;
					
					va_dynamic_type 		= new_ads_params.va_dynamic_type;
					va_dynamic_size_desk 	= new_ads_params.va_dynamic_size_desk;
					va_dynamic_size_mob 	= new_ads_params.va_dynamic_size_mob;
					va_dynamic_size_vert 	= new_ads_params.va_dynamic_size_vert;
					va_dynamic_source 		= new_ads_params.va_dynamic_source;
					va_dynamic_link 		= new_ads_params.va_dynamic_link;
					
					vast_vpaid_mode 		= new_ads_params.vast_vpaid_mode;
					va_vast_preroll 		= new_ads_params.va_vast_preroll;
					va_vast_postroll 		= new_ads_params.va_vast_postroll;
					va_vast_pauseroll 		= new_ads_params.va_vast_pauseroll;
					va_vast_midroll 		= new_ads_params.va_vast_midroll;
				}
				
				if(typeof(player_obj.vidorev_jav_plugin_video_ads_object_post.vid_ads_m_video_ads) !== 'undefined' && $.trim(player_obj.vidorev_jav_plugin_video_ads_object_post.vid_ads_m_video_ads) != ''){
					ads_enable 				= player_obj.vidorev_jav_plugin_video_ads_object_post.vid_ads_m_video_ads==='yes'?true:false;
				}
			}
			
			if(typeof(vidorev_jav_js_object)!=='undefined' && typeof(vidorev_jav_js_object.video_preview_mode)!=='undefined' && vidorev_jav_js_object.video_preview_mode==='on'){
				ads_enable = false;
			}
			
			if(typeof(vidorev_jav_plugin_video_ads_object)!=='undefined' && typeof(vidorev_jav_plugin_video_ads_object.vid_ads_m_hide_ads_membership_result)!=='undefined' && vidorev_jav_plugin_video_ads_object.vid_ads_m_hide_ads_membership_result==='hide'){
				ads_enable = false;
			}
			
			var ads_object = {
				'ads_enable': 			ads_enable,
				'ads_network': 			ads_network,
				'time_to_show_ads': 	time_to_show_ads,
				'time_skip_ads': 		time_skip_ads,
				'time_to_hide_ads': 	time_to_hide_ads,
				'va_google_ima_source': va_google_ima_source,
				'va_image_source': 		va_image_source,
				'va_image_link': 		va_image_link,
				'va_video_source': 		va_video_source,
				'va_video_link': 		va_video_link,
				'va_html_source': 		va_html_source,
				
				'va_dynamic_type': 		va_dynamic_type,
				'va_dynamic_size_desk': va_dynamic_size_desk,
				'va_dynamic_size_mob': 	va_dynamic_size_mob,
				'va_dynamic_size_vert': va_dynamic_size_vert,
				'va_dynamic_source': 	va_dynamic_source,
				'va_dynamic_link': 		va_dynamic_link,
				
				'vast_vpaid_mode':		vast_vpaid_mode,
				'va_vast_preroll': 		va_vast_preroll,
				'va_vast_postroll': 	va_vast_postroll,
				'va_vast_pauseroll': 	va_vast_pauseroll,
				'va_vast_midroll': 		va_vast_midroll,
			}/*video ads params*/
			
			var $lib_item_control				= $('#'+(player_id)).parents('.lib-item-control');
			
			var is_used_plyr_player 			= (typeof(player_obj.player_library)!=='undefined'&&player_obj.player_library=='vp'&&typeof(player_obj.plyr_player)!=='undefined'&&player_obj.plyr_player=='on');
			
			/*3rd party*/
			if(typeof(player_obj.player_library)!=='undefined' && player_obj.player_library!='vp'){
				switch(player_obj.player_library){
					case 'jw':
						$(document).on(prefix+'jwAPIReady'+(player_id), function(){
						/*api ready*/	
							if(typeof(jwplayer)!=='undefined'){							
								if(typeof(vidorev_jav_js_object.jwplayer_licence_key)!=='undefined' && vidorev_jav_js_object.jwplayer_licence_key!=''){
									jwplayer.key = vidorev_jav_js_object.jwplayer_licence_key;
								}
								
								var jw_pos_img = $partyElm.find('img.poster-preload').attr('src');
								
								if(typeof(jw_pos_img)==='undefined'){
									jw_pos_img = '';
								}
								
								options = {
									'file':	 	single_video_url,
									'image': 	jw_pos_img,								
								}
								
								if(typeof(player_obj.single_media_sources)!=='undefined' && Array.isArray(player_obj.single_media_sources)){
									var array_sources = [];
									$.each(player_obj.single_media_sources, function(i, value){
										if(typeof(value)==='object'){
											if(typeof(value.source_file)!=='undefined' && $.trim(value.source_file)!=''){
												array_sources[i] = {};
												
												if(typeof(player_obj.ebs_sco_check)!=='undefined'){
													array_sources[i].file = _.check_atob($.trim(value.source_file));
												}else{
													array_sources[i].file = $.trim(value.source_file);
												}
												
												if(typeof(value.source_label)!=='undefined' && $.trim(value.source_label)!=''){
													array_sources[i].label = $.trim(value.source_label);
												}
											}
										}
									});
								}
								
								if(typeof(array_sources)!=='undefined' && Array.isArray(array_sources) && array_sources.length>0){
									options.sources = array_sources;
								}
								
								if(ads_enable && ads_network === 'google_ima' && va_google_ima_source!=''){
									options.advertising = {
										'client': 		'googima',
										'tag': 			va_google_ima_source,
										'skipoffset': 5,
										/*'cuetext': 		'Advertisement',
										'skipmessage': 	'Skip ad in xx',
										'skiptext': 	'Skip',*/							
									}
								}
								
								if(_.preview_mode_active){
									options.controls = false;
								}
								
								$player = jwplayer(player_id).setup(options);
								
								$player.on('ready', function(){
									if(_.global_muted_video){
										$player.setMute(true);
									}
									
									$player.on('play', function(e){								
										_.global_player_playing[player_id] = true;								
										if(typeof($player.getMute())!=='undefined' && $player.getMute() && first_create && !_.preview_mode_active){
											$playerMutedControl.addClass('active-item').on('click', function(){
												$player.setMute(false);
												$(this).removeClass('active-item');
											});
										}	
										first_create = false;
									});
									
									/*ads control*/
									if(ads_enable && ads_network != 'google_ima'){				
										$player.on('time', function(data){
											
											video_duration 		= data.duration;	
											
											if(video_duration===0){
												return;
											}
											
											video_current_time 	= data.currentTime;
											
											_.video_ads({
												'player': 				$player,
												'single_video_network': single_video_network,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
												'partyElm':				$partyElm,
												'ads_object':			ads_object,
											});
											
											_.video_myCred_points({
												'player': 				$player,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
											});
											
										});
									}else{
										if(typeof(timeViewVideoRequest_myCred)!=='undefined' && _.isNumber(timeViewVideoRequest_myCred)){
											$player.on('time', function(data){
											
												video_duration 		= data.duration;	
												
												if(video_duration===0){
													return;
												}
												
												video_current_time 	= data.currentTime;
												
												_.video_myCred_points({
													'player': 				$player,
													'video_duration': 		video_duration,
													'video_current_time': 	video_current_time,
													'player_id': 			player_id,
												});
												
											});
										}
									}/*ads control*/	
									
									setTimeout(function(){
										
										$player.vidorev_partyLibrary = 'jw';	
										
										if(ads_enable && ads_network === 'google_ima' && va_google_ima_source!=''){
											/*Google IMA*/
											_.ads_google_ima({
												'player': 				$player,																
												'player_id': 			player_id,
												'player_init_id': 		player_init_id,
												'partyElm':				$partyElm,
												'fake_player':			_.fake_player({
																			'player': 				$player,
																			'single_video_network': single_video_network,
																		}),
												'autoplay':				autoplay,
												'va_google_ima_source': va_google_ima_source,					
											});
										}else{
										
											$partyElm.addClass('player-loaded');
																		
											if(autoplay==='on' && ( $lib_item_control.length === 0 && !$('#parse-lightbox-control.video-lightbox-wrapper-control').hasClass('show-lightbox') ) ){								
												$player.play();																
											}else{
												if(!_.global_video_network_placeholder_hide){
													$poster_preload
													.css({'background-image': 'url(' + (poster_background) + ')'})
													.addClass('active-item')
													.on('click', function(){
														$player.play();
														$(this).removeClass('active-item');
													});
												}
											}
											
											$('#'+(player_init_id)).trigger( prefix+'videoCreateFinish', [$player]);
										
										}
										
										if(player_id === 'player-api-control'){
											_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){
												_.player_actions($player, single_video_network, 'pause');
											});
										}
										
										_.single_video_time_lapses($player, single_video_network, player_id, $poster_preload);
										
									}, 368);
									
									$player.on('complete', function(e){
										$playerMutedControl.removeClass('active-item');
										
										_.reset_ads(player_id);
										
										_.auto_next_fnc({
											'player': 				$player,
											'partyElm':				$partyElm,
											'player_id': 			player_id,
											'single_video_network': single_video_network,
										});
									});
								});
								
								$player.on('setupError', function(){
									$partyElm.addClass('player-loaded');
								});
								
								return '';
							}else{
								$('#'+(player_id)).prepend('<div class="require-plugin-player">You need to declare the library for JWPlayer. Please refer to the documentation.</div>');
								$partyElm.addClass('player-loaded');
							}
						/*api ready*/	
						});
						_.setVideo3rdPartyAPIReady(player_id, 'jwAPIReady', 'jw');
						
						return '';
						
						break;
						
					case 'fluidplayer':	
						
						$(document).on(prefix+'fluidplayerAPIReady'+(player_id), function(){
						/*api ready*/	
							if(typeof(fluidPlayer)!=='undefined' && typeof(vidorev_jav_plugin_fluidplayer_object)!=='undefined'){							
								var $fluidplayer_action = null;
								
								var ff_pos_img = $partyElm.find('img.poster-preload').attr('src');
								
								if(typeof(ff_pos_img)==='undefined'){
									ff_pos_img = false;
								}
								
								var boolean_pr 	= false,
									html_pr		= '';
								
								if(_.global_muted_video || autoplay==='on'){
									boolean_pr 	= true;
									html_pr		= 'muted';
								}
								
								options = {
									layoutControls: {
										fillToContainer: true,
										primaryColor: false,
										posterImage: ff_pos_img,
										autoPlay: false,
										playButtonShowing: true,
										playPauseAnimation: true,
										mute: boolean_pr,
										logo: {
											imageUrl: null,
											position: 'top left',
											clickUrl: null,
											opacity: 1,
											mouseOverImageUrl: null,
											imageMargin: '15px',
											hideWithControls: false,
											showOverAds: false
										},
										htmlOnPauseBlock: {
											html: null,
											height: null,
											width: null,
										},
										allowDownload: false,
										allowTheatre: false,
										playbackRateEnabled: true,
										controlBar: {
											autoHide: true,
											autoHideTimeout: 5,
											animated: true,
										},
										persistentSettings: {
											volume:  false,
											quality: false,
											speed:   false,
											theatre: false
										},
										playerInitCallback: (function(){
																					
											setTimeout(function(){
												
												if(ff_pos_img!==false && typeof(player_obj.video_player_background)!=='undefined' && player_obj.video_player_background === 'on'){
													$partyElm.find('.fluid_video_wrapper video').css({'background-image': 'url(' + (ff_pos_img) + ')'});
												}								
									
												if(ads_enable && ads_network === 'google_ima' && va_google_ima_source!=''){
													/*Google IMA*/
													_.ads_google_ima({
														'player': 				$player,																
														'player_id': 			player_id,
														'player_init_id': 		player_init_id,
														'partyElm':				$partyElm,
														'fake_player':			_.fake_player({
																					'player': 				$player,
																					'single_video_network': single_video_network,
																				}),
														'autoplay':				autoplay,
														'va_google_ima_source': va_google_ima_source,					
													});
												}else{
													$partyElm.addClass('player-loaded');
													
													if(autoplay==='on' && ( $lib_item_control.length === 0 && !$('#parse-lightbox-control.video-lightbox-wrapper-control').hasClass('show-lightbox') ) ){							
														$player.play();											
													}else{
														//$player.volume = 1;
													}
																									
													$('#'+(player_init_id)).trigger( prefix+'videoCreateFinish', [$player]);					
												}
												
												if(player_id === 'player-api-control'){
													_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){
														_.player_actions($player, single_video_network, 'pause');
													});
												}
												
												_.single_video_time_lapses($player, single_video_network, player_id, $poster_preload);											
												
											},368);	
											
										}),
									},
									vastOptions: {
										adList:                     {},
										skipButtonCaption:          'Skip ad in [seconds]',
										skipButtonClickCaption:     'Skip ad <span class="skip_button_icon"></span>',
										adText:                     null,
										adTextPosition:             'top left',
										adCTAText:                  false,
										adCTATextPosition:          'bottom right',
										vastTimeout:                5000,
										maxAllowedVastTagRedirects: 3,
										showProgressbarMarkers: 	true,
									}							
								}
								
								if(typeof(vidorev_jav_plugin_fluidplayer_object.vid_fluid_m_styling)!=='undefined' && Array.isArray(vidorev_jav_plugin_fluidplayer_object.vid_fluid_m_styling) && typeof(vidorev_jav_plugin_fluidplayer_object.vid_fluid_m_styling[0])!=='undefined'){
									
									var fluidStyle = vidorev_jav_plugin_fluidplayer_object.vid_fluid_m_styling[0];
									
									if(typeof(fluidStyle['vid_fluid_m_logo_url'])!=='undefined' && $.trim(fluidStyle['vid_fluid_m_logo_url'])!=''){									
										options.layoutControls.logo.imageUrl = $.trim(fluidStyle['vid_fluid_m_logo_url']);
									}
									if(typeof(fluidStyle['vid_fluid_m_logo_hover_url'])!=='undefined' && $.trim(fluidStyle['vid_fluid_m_logo_hover_url'])!=''){
										options.layoutControls.logo.mouseOverImageUrl = $.trim(fluidStyle['vid_fluid_m_logo_hover_url']);
									}
									if(typeof(fluidStyle['vid_fluid_m_logo_click_url'])!=='undefined' && $.trim(fluidStyle['vid_fluid_m_logo_click_url'])!=''){
										options.layoutControls.logo.clickUrl = $.trim(fluidStyle['vid_fluid_m_logo_click_url']);
									}
									if(typeof(fluidStyle['vid_fluid_m_display_logo'])!=='undefined' && $.trim(fluidStyle['vid_fluid_m_display_logo'])!=''){
										options.layoutControls.logo.position = $.trim(fluidStyle['vid_fluid_m_display_logo']);
									}
									if(typeof(fluidStyle['vid_fluid_m_logo_opacity'])!=='undefined' && _.isNumber(fluidStyle['vid_fluid_m_logo_opacity'])){
										options.layoutControls.logo.opacity = parseFloat(fluidStyle['vid_fluid_m_logo_opacity'])/100;
									}
									if(typeof(fluidStyle['vid_fluid_m_logo_margin'])!=='undefined' && $.trim(fluidStyle['vid_fluid_m_logo_margin'])!=''){
										options.layoutControls.logo.imageMargin = $.trim(fluidStyle['vid_fluid_m_logo_margin']);
									}
									if(typeof(fluidStyle['vid_fluid_m_primary_color'])!=='undefined' && $.trim(fluidStyle['vid_fluid_m_primary_color'])!=''){
										options.layoutControls.primaryColor = $.trim(fluidStyle['vid_fluid_m_primary_color']);
									}
								}
								
								var vast_valign 			= 'bottom';
								var vast_nonlinearDuration 	= 10;
								var vast_size 				= '728x90';
								
								if(typeof(
									vidorev_jav_plugin_fluidplayer_object.vid_fluid_m_vast_configuration)!=='undefined' &&
									Array.isArray(vidorev_jav_plugin_fluidplayer_object.vid_fluid_m_vast_configuration) &&
									typeof(vidorev_jav_plugin_fluidplayer_object.vid_fluid_m_vast_configuration[0])!=='undefined'
								){
									var fluid_vast_configuration = vidorev_jav_plugin_fluidplayer_object.vid_fluid_m_vast_configuration[0];
									
									if(typeof(fluid_vast_configuration['vid_fluid_m_skipbuttoncaption'])!=='undefined' && $.trim(fluid_vast_configuration['vid_fluid_m_skipbuttoncaption'])!=''){									
										options.vastOptions.skipButtonCaption = $.trim(fluid_vast_configuration['vid_fluid_m_skipbuttoncaption']);
									}								
									if(typeof(fluid_vast_configuration['vid_fluid_m_skipbuttonclickcaption'])!=='undefined' && $.trim(fluid_vast_configuration['vid_fluid_m_skipbuttonclickcaption'])!=''){									
										options.vastOptions.skipButtonClickCaption = $.trim(fluid_vast_configuration['vid_fluid_m_skipbuttonclickcaption']);
									}								
									if(typeof(fluid_vast_configuration['vid_fluid_m_adtext'])!=='undefined' && $.trim(fluid_vast_configuration['vid_fluid_m_adtext'])!=''){									
										options.vastOptions.adText = $.trim(fluid_vast_configuration['vid_fluid_m_adtext']);
									}								
									if(typeof(fluid_vast_configuration['vid_fluid_m_adtextposition'])!=='undefined' && $.trim(fluid_vast_configuration['vid_fluid_m_adtextposition'])!=''){									
										options.vastOptions.adTextPosition = $.trim(fluid_vast_configuration['vid_fluid_m_adtextposition']);
									}
									if(typeof(fluid_vast_configuration['vid_fluid_m_adctatext'])!=='undefined' && $.trim(fluid_vast_configuration['vid_fluid_m_adctatext'])!=''){									
										options.vastOptions.adCTAText = $.trim(fluid_vast_configuration['vid_fluid_m_adctatext']);
									}
									if(typeof(fluid_vast_configuration['vid_fluid_m_adctatextposition'])!=='undefined' && $.trim(fluid_vast_configuration['vid_fluid_m_adctatextposition'])!=''){									
										options.vastOptions.adCTATextPosition = $.trim(fluid_vast_configuration['vid_fluid_m_adctatextposition']);
									}
									if(typeof(fluid_vast_configuration['vid_fluid_m_vasttimeout'])!=='undefined' && _.isNumber(fluid_vast_configuration['vid_fluid_m_vasttimeout'])){
										options.vastOptions.vastTimeout = parseFloat(fluid_vast_configuration['vid_fluid_m_vasttimeout']);
									}
									if(typeof(fluid_vast_configuration['vid_fluid_m_maxallowedvasttagredirects'])!=='undefined' && _.isNumber(fluid_vast_configuration['vid_fluid_m_maxallowedvasttagredirects'])){
										options.vastOptions.maxAllowedVastTagRedirects = parseFloat(fluid_vast_configuration['vid_fluid_m_maxallowedvasttagredirects']);
									}
									if(typeof(fluid_vast_configuration['vid_fluid_m_valign'])!=='undefined' && $.trim(fluid_vast_configuration['vid_fluid_m_valign'])!=''){									
										vast_valign = $.trim(fluid_vast_configuration['vid_fluid_m_valign']);
									}
									if(typeof(fluid_vast_configuration['vid_fluid_m_nonlinearduration'])!=='undefined' && _.isNumber(fluid_vast_configuration['vid_fluid_m_nonlinearduration'])){
										vast_nonlinearDuration = parseFloat(fluid_vast_configuration['vid_fluid_m_nonlinearduration']);
									}
									if(typeof(fluid_vast_configuration['vid_fluid_m_size'])!=='undefined' && $.trim(fluid_vast_configuration['vid_fluid_m_size'])!=''){									
										vast_size = $.trim(fluid_vast_configuration['vid_fluid_m_size']);
									}
								}							
								
								if(ads_enable && ads_network === 'vast'){
									var vast_arr = [];
								
									if(typeof(ads_object.va_vast_preroll)!=='undefined' && ads_object.va_vast_preroll!=''){
										if(typeof(ads_object.vast_vpaid_mode)!=='undefined' && ads_object.vast_vpaid_mode){
											vast_arr[vast_arr.length] = {
												roll: 		'preRoll',
												vastTag: 	ads_object.va_vast_preroll,
											}
										}else{
											vast_arr[vast_arr.length] = {
												roll: 				'preRoll',
												vastTag: 			ads_object.va_vast_preroll,
												vAlign:				vast_valign,
												nonlinearDuration:	vast_nonlinearDuration,
												size:				vast_size,
											}
										}										
									}
									if(typeof(ads_object.va_vast_postroll)!=='undefined' && ads_object.va_vast_postroll!=''){										
										if(typeof(ads_object.vast_vpaid_mode)!=='undefined' && ads_object.vast_vpaid_mode){
											vast_arr[vast_arr.length] = {
												roll: 				'postRoll',
												vastTag: 			ads_object.va_vast_postroll,
											}
										}else{
											vast_arr[vast_arr.length] = {
												roll: 				'postRoll',
												vastTag: 			ads_object.va_vast_postroll,
												vAlign:				vast_valign,
												nonlinearDuration:	vast_nonlinearDuration,
												size:				vast_size,
											}
										}
									}
									if(typeof(ads_object.va_vast_pauseroll)!=='undefined' && ads_object.va_vast_pauseroll!=''){
										
										if(typeof(ads_object.vast_vpaid_mode)!=='undefined' && ads_object.vast_vpaid_mode){
											/*
											no show for vpaid mode enable
											vast_arr[vast_arr.length] = {
												roll: 				'onPauseRoll',
												vastTag: 			ads_object.va_vast_pauseroll,
											}
											*/
										}else{
											vast_arr[vast_arr.length] = {
												roll: 				'onPauseRoll',
												vastTag: 			ads_object.va_vast_pauseroll,
												vAlign:				vast_valign,
												nonlinearDuration:	vast_nonlinearDuration,
												size:				vast_size,
											}
										}
									}
									if(typeof(ads_object.va_vast_midroll)!=='undefined' && Array.isArray(ads_object.va_vast_midroll)){
										$.each(ads_object.va_vast_midroll, function(i, value){									
											if(typeof(value)==='object' && typeof(value.vid_ads_m_vast_tag_mid)!=='undefined' && typeof(value.vid_ads_m_vast_timer_seconds)!=='undefined' && $.trim(value.vid_ads_m_vast_tag_mid)!='' && _.isNumber(value.vid_ads_m_vast_timer_seconds)){												
												if(typeof(ads_object.vast_vpaid_mode)!=='undefined' && ads_object.vast_vpaid_mode){
													vast_arr[vast_arr.length] = {
														roll: 		'midRoll',
														vastTag: 	value.vid_ads_m_vast_tag_mid,
														timer:		value.vid_ads_m_vast_timer_seconds,
													}
												}else{
													vast_arr[vast_arr.length] = {
														roll: 		'midRoll',
														vastTag: 	value.vid_ads_m_vast_tag_mid,
														timer:		value.vid_ads_m_vast_timer_seconds,
														vAlign:				vast_valign,
														nonlinearDuration:	vast_nonlinearDuration,
														size:				vast_size,
													}
												}
											}
											
										});
									}
									
									if(typeof(ads_object.vast_vpaid_mode)!=='undefined' && ads_object.vast_vpaid_mode){
										options.vastOptions.allowVPAID = true;
									}
									
									options.vastOptions.adList = vast_arr;
									options.vastOptions.vastAdvanced = {
										vastLoadedCallback:       (function() {
											_.global_video_vast_running[player_id] = 'no';
										}),
										noVastVideoCallback:      (function() {
										}),
										vastVideoSkippedCallback: (function() {																		
										}),
										vastVideoEndedCallback:   (function() {																		
										})
									}
								}
								
								if(_.preview_mode_active){
									options.layoutControls.logo = {};
									options.layoutControls.subtitlesEnabled = false;
								}
								
								var rnd_fluidplayer_id = (player_id)+'_'+(Math.floor((Math.random() * 9999) + 1));
								var fluid_type 	= 'type="video/mp4"';
								
								var mpd_enable 	= false;
								var mpd_player	= null;
								
								var hls_enable 	= false;
								var hls_player	= null;
								
								if(typeof(player_obj.single_video_streaming) && $.trim(player_obj.single_video_streaming!='')){
									switch(player_obj.single_video_streaming){
										case 'MPEG-DASH':
											fluid_type 	= 'type="application/dash+xml"';
											mpd_enable = true;																		
											break;
										
										case 'HLS':
											fluid_type 	= 'type="application/x-mpegURL"';
											hls_enable	= true;										
											break;	
									}								
								}
															
								var fluid_sources = '<source src="'+(single_video_url)+'" '+(fluid_type)+' />';
								
								if(typeof(player_obj.single_media_sources)!=='undefined' && Array.isArray(player_obj.single_media_sources)){
									$.each(player_obj.single_media_sources, function(i, value){
										if(typeof(value)==='object'){
											if(typeof(value.source_file)!=='undefined' && $.trim(value.source_file)!=''){
												var source_title = i;
												if(typeof(value.source_label)!=='undefined' && $.trim(value.source_label)!=''){
													source_title = $.trim(value.source_label);
												}
												
												if(typeof(player_obj.ebs_sco_check)!=='undefined'){
													fluid_sources+='<source src="'+(_.check_atob($.trim(value.source_file)))+'" title="'+(source_title)+'" '+(fluid_type)+' />';													
												}else{
													fluid_sources+='<source src="'+($.trim(value.source_file))+'" title="'+(source_title)+'" '+(fluid_type)+' />';
												}										
																			
											}
										}
									});
								}
								
								var fluid_subtitles = '';
								
								if(typeof(player_obj.single_media_subtitles)!=='undefined' && Array.isArray(player_obj.single_media_subtitles)){
									$.each(player_obj.single_media_subtitles, function(i, value){
										if(typeof(value)==='object'){
											if(typeof(value.src)!=='undefined' && $.trim(value.src)!='' && typeof(value.label)!=='undefined' && $.trim(value.label)!='' && typeof(value.srclang)!=='undefined' && $.trim(value.srclang)!=''){
												if(i == 0){
													fluid_subtitles+='<track label="'+(value.label)+'" kind="metadata" srclang="'+(value.srclang)+'" src="'+(value.src)+'" default>';
												}else{
													fluid_subtitles+='<track label="'+(value.label)+'" kind="metadata" srclang="'+(value.srclang)+'" src="'+(value.src)+'">';
												}
											}
										}
									});
								}
								
								if(fluid_subtitles!=''){
									options.layoutControls.subtitlesEnabled = true;
								}
								
								if(typeof(player_obj.vid_vtt_preview_vtt_file)!=='undefined' && Array.isArray(player_obj.vid_vtt_preview_vtt_file) && player_obj.vid_vtt_preview_vtt_file.length === 3){
									
									var vtt_preview_file = player_obj.vid_vtt_preview_vtt_file;
									
									options.layoutControls.timelinePreview = {};
									options.layoutControls.timelinePreview.file 					= vtt_preview_file[2];
									options.layoutControls.timelinePreview.type 					= 'VTT';
									options.layoutControls.timelinePreview.spriteRelativePath 		= false;
																		
									if(typeof(player_obj.vid_vtt_preview_sprite_image)!=='undefined' && Array.isArray(player_obj.vid_vtt_preview_sprite_image) && player_obj.vid_vtt_preview_sprite_image.length === 2){
										var vtt_preview_file 										= player_obj.vid_vtt_preview_sprite_image;
										options.layoutControls.timelinePreview.sprite 				= vtt_preview_file[1];
									}
									
								}
								
								$('#'+(player_id)).prepend('<video playsinline="" webkit-playsinline="" id="'+(rnd_fluidplayer_id)+'" preload="metadata" controls '+(html_pr)+'>'+(fluid_sources)+(fluid_subtitles)+'</video>');
								
								$player = document.getElementById(rnd_fluidplayer_id);
								
								var video_handle = function(){
									if($($player).hasClass('selfHosted-ready-load')){
										return;
									}								
									
									$($player).addClass('selfHosted-ready-load');
									
									$player.addEventListener('playing', function(){
										_.global_player_playing[player_id] = true;
										
										if($player.muted && first_create && !_.preview_mode_active){
											$playerMutedControl.addClass('active-item').on('click', function(){
												$player.muted = false;
												$player.volume = 1;
												$(this).removeClass('active-item');
											});
										}	
																		
										first_create = false;
									});
									
									/*ads control*/
									if(ads_enable && ads_network != 'google_ima'){
										$player.addEventListener('timeupdate', function(){
											
											video_duration 		= $player.duration;	
											
											if(video_duration===0){
												return;
											}
											
											video_current_time 	= $player.currentTime;
											
											_.video_ads({
												'player': 				$player,
												'single_video_network': single_video_network,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
												'partyElm':				$partyElm,
												'ads_object':			ads_object,
											});
											
											_.video_myCred_points({
												'player': 				$player,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
											});
											
										});
									}else{
										if(typeof(timeViewVideoRequest_myCred)!=='undefined' && _.isNumber(timeViewVideoRequest_myCred)){
											$player.addEventListener('timeupdate', function(){
											
												video_duration 		= $player.duration;	
												
												if(video_duration===0){
													return;
												}
												
												video_current_time 	= $player.currentTime;
												
												_.video_myCred_points({
													'player': 				$player,
													'video_duration': 		video_duration,
													'video_current_time': 	video_current_time,
													'player_id': 			player_id,
												});
												
											});
										}
									}/*ads control*/
									
									$fluidplayer_action = fluidPlayer(rnd_fluidplayer_id, options);								
																	
									$player.addEventListener('ended', function(){									
											
										if(typeof(_.global_video_vast_running[player_id])!=='undefined' && _.global_video_vast_running[player_id] == 'no'){
											return;									
										}
										
										$playerMutedControl.removeClass('active-item');
											
										_.reset_ads(player_id);
										
										_.auto_next_fnc({
											'player': 				$player,
											'partyElm':				$partyElm,
											'player_id': 			player_id,
											'single_video_network': single_video_network,
										});
	
									});
								}
								
								var hls_fnc = function(){
									if (Hls.isSupported()) {
										hls_player = new Hls({p2pConfig: {logLevel: false,}});
										hls_player.attachMedia($player);
										hls_player.loadSource(single_video_url);
										hls_player.on(Hls.Events.MANIFEST_PARSED, video_handle);
										hls_player.on(Hls.Events.ERROR, function (event, data) {											
											if (data.fatal) {
												$partyElm.append('<div class="offline-stream-html" style="background-image:url('+(poster_background)+')"><div class="offline-content h4 h6-mobile">'+(vidorev_jav_js_object.translate_currently_offline)+'</div></div>').addClass('player-loaded');
											}
										});
									}else if($player.canPlayType('application/vnd.apple.mpegurl')){
										$player.src = single_video_url;
										$player.addEventListener('loadedmetadata', video_handle);
									}else{
										/*
										$('#'+(player_id)).prepend('<div class="require-plugin-player">Media type not supported by this browser. (application/x-mpegURL)</div>');
										$partyElm.addClass('player-loaded');
										*/
										console.log('Media type not supported by this browser. (application/x-mpegURL)');
										$player.addEventListener('loadedmetadata', video_handle);
									}
									
									return false;
								}
								
								var mpd_fnc = function(){
									if ( typeof ( window.MediaSource || window.WebKitMediaSource ) === "function") {
										mpd_player = dashjs.MediaPlayer().create();
										mpd_player.getDebug().setLogToBrowserConsole(false);
										mpd_player.initialize($player, single_video_url, false);
										mpd_player.on('manifestLoaded', video_handle);	
									}else{
										/*
										$('#'+(player_id)).prepend('<div class="require-plugin-player">Media type not supported by this browser. (application/dash+xml)</div>');
										$partyElm.addClass('player-loaded');
										*/
										console.log('Media type not supported by this browser. (application/dash+xml)');
										$player.addEventListener('loadedmetadata', video_handle);
									}
									
									return false;
								}
								
								if(hls_enable){
									if(!_.global_hls_library){
										_.requestScript(vidorev_jav_plugin_js_object.hls_library_url, function(){
											_.global_hls_library = true;
											return hls_fnc();											
										});
									}else{
										return hls_fnc();	
									}
								}else if(mpd_enable){
									if(!_.global_mpd_library){
										_.requestScript(vidorev_jav_plugin_js_object.mpd_library_url, function(){
											_.global_mpd_library = true;
											return mpd_fnc();											
										});
									}else{
										return mpd_fnc();
									}								
								}else{
									$player.addEventListener('loadedmetadata', video_handle);
								}																		
								
								return '';
							}else{
								$('#'+(player_id)).prepend('<div class="require-plugin-player">You need to activate the Fluid Player player. Please refer to the documentation.</div>');
								$partyElm.addClass('player-loaded');
							}
						/*api ready*/	
						});
						_.setVideo3rdPartyAPIReady(player_id, 'fluidplayerAPIReady', 'fluidplayer');
						
						return '';
						
						break;
						
					case 'videojs':
						
						if(typeof(lightbox_cf)==='undefined'){
							return '';
						}
						break;
						
					case 'flow':
					
						if(typeof(lightbox_cf)==='undefined'){
							return '';
						}
						break;		
				}
			}/*3rd party*/			
										
			switch(single_video_network){
				case 'youtube':
					
					if(is_used_plyr_player){
						$(document).on(prefix+'PlyrAPIReady'+(player_id), function(){							
							
							$('#'+(player_id)).html(
							'<iframe src="https://www.youtube.com/embed/'+(single_video_source)+'?origin=&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1" allowfullscreen allowtransparency allow="autoplay"></iframe>'
							);
							
							/*$('#'+(player_id)).attr({'data-plyr-provider':'youtube', 'data-plyr-embed-id': single_video_source});*/
							
							options = {
								debug: 		false,
								autoplay:	false,
								volume:		1,
								source: {
									type: 'video',
									sources: [
										{
											src: single_video_source,
											provider: 'youtube',
										},
									],
								},
								youtube: {
									noCookie: false,
								}
							};
							
							if(_.preview_mode_active){
								/*options.controls = 0;*/
							}
							
							$player = new Plyr('#'+(player_id), options);
							
														
							$player.on('ready', function(e){
								
								$player.is_used_plyr_player = 'on';
								
								$partyElm.find('.plyr button').attr({'aria-live':'polite'});
								$('#'+(player_id)).find('iframe').attr({'wmode':'Opaque'});
								
								if(_.global_muted_video || _.global_video_network_mute_for_autoplay){
									/*$player.volume = 0;*/
									$player.muted 	= true;
								}
								
								$player.on('volumechange', function(e){
									if($player.volume>0){
										$playerMutedControl.removeClass('active-item');
									}
								});
								
								$player.on('playing', function(e){
									_.global_player_playing[player_id] = true;
									if(typeof($player.muted)!=='undefined' && $player.muted && first_create && !_.preview_mode_active){
										$playerMutedControl.addClass('active-item').on('click', function(){	
											$player.volume 	= 1;
											$player.muted = false;
											$(this).removeClass('active-item');
										});
									}	
									first_create = false;
								});
								
								/*ads control*/	
								if(ads_enable && ads_network != 'google_ima'){				
									$player.on('timeupdate', function(e){
										
										video_duration 		= $player.duration;	
										
										if(video_duration===0){
											return;
										}
										
										video_current_time 	= $player.currentTime;
										
										_.video_ads({
											'player': 				$player,
											'single_video_network': single_video_network,
											'video_duration': 		video_duration,
											'video_current_time': 	video_current_time,
											'player_id': 			player_id,
											'partyElm':				$partyElm,
											'ads_object':			ads_object,
										});
										
										_.video_myCred_points({
											'player': 				$player,
											'video_duration': 		video_duration,
											'video_current_time': 	video_current_time,
											'player_id': 			player_id,
										});
									});
								}else{
									if(typeof(timeViewVideoRequest_myCred)!=='undefined' && _.isNumber(timeViewVideoRequest_myCred)){
										$player.on('timeupdate', function(e){
										
											video_duration 		= $player.duration;	
											
											if(video_duration===0){
												return;
											}
											
											video_current_time 	= $player.currentTime;
											
											_.video_myCred_points({
												'player': 				$player,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
											});
										});
									}
								}/*ads control*/
								
								setTimeout(function(){						
									
									if(ads_enable && ads_network === 'google_ima' && va_google_ima_source!=''){
										/*Google IMA*/
										_.ads_google_ima({
											'player': 				$player,																
											'player_id': 			player_id,
											'player_init_id': 		player_init_id,
											'partyElm':				$partyElm,
											'fake_player':			_.fake_player({
																		'player': 				$player,
																		'single_video_network': single_video_network,
																	}),
											'autoplay':				autoplay,
											'va_google_ima_source': va_google_ima_source,					
										});
									}else{
										$partyElm.addClass('player-loaded');
									
										if(autoplay==='on' && ( $lib_item_control.length === 0 && !$('#parse-lightbox-control.video-lightbox-wrapper-control').hasClass('show-lightbox') ) ){								
											$player.play();																
										}else{
											$player.volume 	= 1;
											$player.muted = false;
										}
		
										
										$('#'+(player_init_id)).trigger( prefix+'videoCreateFinish', [$player]);
									}
									
									if(player_id === 'player-api-control'){
										_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){
											_.player_actions($player, single_video_network, 'pause');
										});
									}
									
									_.single_video_time_lapses($player, single_video_network, player_id, $poster_preload);
									
									_.$el.on(prefix+'videoBeforeTimeLapsesClick', function(e, player){
										player.volume 	= 1;
										player.muted = false;									
									});
									
								}, 368);
								
								$player.on('ended', function(e){
									$playerMutedControl.removeClass('active-item');
									
									_.reset_ads(player_id);
									
									_.auto_next_fnc({
										'player': 				$player,
										'partyElm':				$partyElm,
										'player_id': 			player_id,
										'single_video_network': single_video_network,
									});
								});
							});
						});						
						_.setVideo3rdPartyAPIReady(player_id, 'PlyrAPIReady', 'Plyr');
						
					}else{
						options = {
							enablejsapi:	1, 
							html5:			1, 
							wmode:			'transparent', 
							modestbranding:	_.you_modestbranding, 
							iv_load_policy:	3,
							autoplay:		0,
							playsinline:	1,
							rel:			_.you_rel,
							showinfo:		_.you_showinfo,
						}
						
						if(typeof(vidorev_jav_js_object.origin_url)!=='undefined' && vidorev_jav_js_object.origin_url!=''){
							options.origin = vidorev_jav_js_object.origin_url;
						}
						
						if(typeof(player_obj.single_video_youtube_playlist_id)!=='undefined' && player_obj.single_video_youtube_playlist_id!=''){
							options.list 		= $.trim(player_obj.single_video_youtube_playlist_id);
							options.listType 	= 'playlist';
						}
						
						if(_.preview_mode_active){
							options.controls = 0;
						}
						
						$(document).on(prefix+'youtubeAPIReady'+(player_id), function(){
						/*api ready*/	
							var intervalYoutube = null;
							
							$player = new YT.Player(player_id, {						
								videoId: 		single_video_source,
								playerVars: 	options,
								events: 		{
													'onReady': function(e){	
														$('#'+(player_id)).attr({'wmode':'Opaque'});
														
														if(_.global_muted_video){
															$player.mute();
														}
														
														setTimeout(function(){													
															
															if(ads_enable && ads_network === 'google_ima' && va_google_ima_source!=''){
																/*Google IMA*/															
																_.ads_google_ima({
																	'player': 				$player,																
																	'player_id': 			player_id,
																	'player_init_id': 		player_init_id,
																	'partyElm':				$partyElm,
																	'fake_player':			_.fake_player({
																								'player': 				$player,
																								'single_video_network': single_video_network,
																							}),
																	'autoplay':				autoplay,
																	'va_google_ima_source': va_google_ima_source,					
																});
															}else{
																$partyElm.addClass('player-loaded');
															
																if(autoplay==='on' && ( $lib_item_control.length === 0 && !$('#parse-lightbox-control.video-lightbox-wrapper-control').hasClass('show-lightbox') ) ){								
																	$player.playVideo();																
																}else{
																	if(!_.global_video_network_placeholder_hide){
																		$poster_preload
																		.css({'background-image': 'url(' + (poster_background) + ')'})
																		.addClass('active-item')
																		.on('click', function(){
																			$player.playVideo();
																			$(this).removeClass('active-item');
																		});
																	}
																}
																
																$('#'+(player_init_id)).trigger( prefix+'videoCreateFinish', [$player]);
															}
															
															if(player_id === 'player-api-control'){
																_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){
																	_.player_actions($player, single_video_network, 'pause');
																});
															}
															
															_.single_video_time_lapses($player, single_video_network, player_id, $poster_preload);
															
														}, 368);	
																										
													},
													'onStateChange':function(e){
														
														if(e.data===1){
															_.global_player_playing[player_id] = true;
														}
														
														if(e.target.isMuted() && first_create && !_.preview_mode_active){
															$playerMutedControl.addClass('active-item').on('click', function(){
																e.target.unMute();
																$(this).removeClass('active-item');
															});
														}
																											
														first_create = false;
														
														/*ads control*/
														if(ads_enable && e.data==YT.PlayerState.PLAYING && ads_network != 'google_ima'){
															if(intervalYoutube!==null){
																clearInterval(intervalYoutube);
															}
															intervalYoutube = setInterval(function(){
	
																
																video_duration 		= $player.getDuration();
																
																if(video_duration===0){
																	return;
																}
																
																video_current_time 	= $player.getCurrentTime();
																
																_.video_ads({
																	'player': 				$player,
																	'single_video_network': single_video_network,
																	'video_duration': 		video_duration,
																	'video_current_time': 	video_current_time,
																	'player_id': 			player_id,
																	'partyElm':				$partyElm,
																	'ads_object':			ads_object,
																});
																
																_.video_myCred_points({
																	'player': 				$player,
																	'video_duration': 		video_duration,
																	'video_current_time': 	video_current_time,
																	'player_id': 			player_id,
																});
																
															}, 250);														
														}else{
															if(intervalYoutube!==null){
																clearInterval(intervalYoutube);
															}
																														
															if(typeof(timeViewVideoRequest_myCred)!=='undefined' && _.isNumber(timeViewVideoRequest_myCred)){
																
																intervalYoutube = setInterval(function(){	
																
																	video_duration 		= $player.getDuration();
																	
																	if(video_duration===0){
																		return;
																	}
																	
																	video_current_time 	= $player.getCurrentTime();
																	
																	_.video_myCred_points({
																		'player': 				$player,
																		'video_duration': 		video_duration,
																		'video_current_time': 	video_current_time,
																		'player_id': 			player_id,
																	});
																	
																}, 250);
															}															
															
														}/*ads control*/
														
														if(e.data===0){
															$playerMutedControl.removeClass('active-item');
															
															_.reset_ads(player_id);
															
															_.auto_next_fnc({
																'player': 				$player,
																'partyElm':				$partyElm,
																'player_id': 			player_id,
																'single_video_network': single_video_network,
															});
															
															e.target.stopVideo();
														}
																											
													}
												},				
							});
						/*api ready*/	
						});					
						_.setYoutubeAPIReady(player_id);
					}
										
					break;
					
				case 'vimeo':
					
					if(is_used_plyr_player){
						
						$(document).on(prefix+'PlyrAPIReady'+(player_id), function(){
							
							$('#'+(player_id)).html(
							'<iframe src="https://player.vimeo.com/video/'+(single_video_source)+'?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media" allowfullscreen allowtransparency allow="autoplay"></iframe>'							
							);
							
							options = {
								debug: 		false,
								autoplay:	false,
								volume:		1,
								source: {
									type: 'video',
									sources: [
										{
											src: single_video_source,
											provider: 'vimeo',
										},
									],
								},
							};
							
							if(_.preview_mode_active){
								/*options.controls = 0;*/
							}
							
							$player = new Plyr('#'+(player_id), options);							
														
							$player.on('ready', function(e){
								
								$player.is_used_plyr_player = 'on';
								
								$partyElm.find('.plyr button').attr({'aria-live':'polite'});
								$('#'+(player_id)).find('iframe').attr({'wmode':'Opaque'});
								
								if(_.global_muted_video || _.global_video_network_mute_for_autoplay){
									/*$player.volume = 0;*/
									$player.muted 	= true;
								}
								
								$player.on('volumechange', function(e){
									if($player.volume>0){
										$playerMutedControl.removeClass('active-item');
									}
								});
								
								$player.on('playing', function(e){
									_.global_player_playing[player_id] = true;
									if(typeof($player.muted)!=='undefined' && $player.muted && first_create && !_.preview_mode_active){
										$playerMutedControl.addClass('active-item').on('click', function(){	
											$player.volume 	= 1;
											$player.muted = false;
											$(this).removeClass('active-item');
										});
									}	
									first_create = false;
									
									$('body').trigger( 'vidorevVimeoVideoPlay', [$player, $partyElm]);
								});
								
								/*ads control*/	
								if(ads_enable && ads_network != 'google_ima'){				
									$player.on('timeupdate', function(e){
										
										video_duration 		= $player.duration;	
										
										if(video_duration===0){
											return;
										}
										
										video_current_time 	= $player.currentTime;
										
										_.video_ads({
											'player': 				$player,
											'single_video_network': single_video_network,
											'video_duration': 		video_duration,
											'video_current_time': 	video_current_time,
											'player_id': 			player_id,
											'partyElm':				$partyElm,
											'ads_object':			ads_object,
										});										
										
										_.video_myCred_points({
											'player': 				$player,
											'video_duration': 		video_duration,
											'video_current_time': 	video_current_time,
											'player_id': 			player_id,
										});
									});
								}else{
									if(typeof(timeViewVideoRequest_myCred)!=='undefined' && _.isNumber(timeViewVideoRequest_myCred)){
										$player.on('timeupdate', function(e){
										
											video_duration 		= $player.duration;	
											
											if(video_duration===0){
												return;
											}
											
											video_current_time 	= $player.currentTime;													
											
											_.video_myCred_points({
												'player': 				$player,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
											});
										});
									}
								}/*ads control*/
								
								setTimeout(function(){						
									
									if(ads_enable && ads_network === 'google_ima' && va_google_ima_source!=''){
										/*Google IMA*/
										_.ads_google_ima({
											'player': 				$player,																
											'player_id': 			player_id,
											'player_init_id': 		player_init_id,
											'partyElm':				$partyElm,
											'fake_player':			_.fake_player({
																		'player': 				$player,
																		'single_video_network': single_video_network,
																	}),
											'autoplay':				autoplay,
											'va_google_ima_source': va_google_ima_source,					
										});
									}else{
										$partyElm.addClass('player-loaded');
									
										if(autoplay==='on' && ( $lib_item_control.length === 0 && !$('#parse-lightbox-control.video-lightbox-wrapper-control').hasClass('show-lightbox') ) ){								
											$player.play();																
										}else{
											$player.volume 	= 1;
											$player.muted = false;
										}
		
										
										$('#'+(player_init_id)).trigger( prefix+'videoCreateFinish', [$player]);
									}
									
									if(player_id === 'player-api-control'){
										_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){
											_.player_actions($player, single_video_network, 'pause');
										});
									}
									
									_.single_video_time_lapses($player, single_video_network, player_id, $poster_preload);
									
									_.$el.on(prefix+'videoBeforeTimeLapsesClick', function(e, player){
										player.volume 	= 1;
										player.muted = false;									
									});
									
								}, 368);
								
								$player.on('ended', function(e){
									$playerMutedControl.removeClass('active-item');
									
									_.reset_ads(player_id);
									
									_.auto_next_fnc({
										'player': 				$player,
										'partyElm':				$partyElm,
										'player_id': 			player_id,
										'single_video_network': single_video_network,
									});
									
									$('body').trigger( 'vidorevVimeoVideoEnded', [$player, $partyElm]);
								});
								
								$player.on('pause', function(e){
									$('body').trigger( 'vidorevVimeoVideoPause', [$player, $partyElm]);
								});
							});	
						});						
						_.setVideo3rdPartyAPIReady(player_id, 'PlyrAPIReady', 'Plyr');
						
					}else{
					
						$(document).on(prefix+'vimeoAPIReady'+(player_id), function(){
						/*api ready*/	
							options = {
								id: 			single_video_source,
								autoplay: 		0,
								playsinline: 	true,
							}
							
							if(_.preview_mode_active){
								options.controls = 0;
							}
		
							$player = new Vimeo.Player(player_id, options);
							
							$player.ready().then(function(){
								
								$('#'+(player_id)).find('iframe').attr('allow', 'autoplay; encrypted-media');
								
								if(_.global_muted_video || _.global_video_network_mute_for_autoplay){
									$player.setVolume(0);
								}
								
								$player.on('play', function(e){
									_.global_player_playing[player_id] = true;
									
									$player.getVolume().then(function(volume) {
										if(volume === 0 && !_.preview_mode_active){
											$playerMutedControl.addClass('active-item').on('click', function(){
												$player.setVolume(1);
												$(this).removeClass('active-item');
											});
										}								
									}).catch(function(error) {});
														
									first_create = false;
									
									$('body').trigger( 'vidorevVimeoVideoPlay', [$player, $partyElm]);
								});
								
								/*ads control*/
								if(ads_enable && ads_network != 'google_ima'){
									$player.on('timeupdate', function(e){
										Promise.all([$player.getDuration(), $player.getCurrentTime()]).then(function(dimensions) {
											
											video_duration 		= dimensions[0];
											
											if(video_duration===0){
												return;
											}
											
											video_current_time 	= dimensions[1];
											
											_.video_ads({
												'player': 				$player,
												'single_video_network': single_video_network,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
												'partyElm':				$partyElm,
												'ads_object':			ads_object,												
											});
											
											_.video_myCred_points({
												'player': 				$player,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
											});
											
										});										
									});
								}else{
									if(typeof(timeViewVideoRequest_myCred)!=='undefined' && _.isNumber(timeViewVideoRequest_myCred)){
										$player.on('timeupdate', function(e){
											Promise.all([$player.getDuration(), $player.getCurrentTime()]).then(function(dimensions) {
												
												video_duration 		= dimensions[0];
												
												if(video_duration===0){
													return;
												}
												
												video_current_time 	= dimensions[1];
												
												_.video_myCred_points({
													'player': 				$player,
													'video_duration': 		video_duration,
													'video_current_time': 	video_current_time,
													'player_id': 			player_id,
												});
												
											});										
										});
									}
								}/*ads control*/	
								
								setTimeout(function(){													
									
									if(ads_enable && ads_network === 'google_ima' && va_google_ima_source!=''){
										/*Google IMA*/
										_.ads_google_ima({
											'player': 				$player,																
											'player_id': 			player_id,
											'player_init_id': 		player_init_id,
											'partyElm':				$partyElm,
											'fake_player':			_.fake_player({
																		'player': 				$player,
																		'single_video_network': single_video_network,
																	}),
											'autoplay':				autoplay,
											'va_google_ima_source': va_google_ima_source,					
										});								
									}else{
										$partyElm.addClass('player-loaded');
									
										if(autoplay==='on' && ( $lib_item_control.length === 0 && !$('#parse-lightbox-control.video-lightbox-wrapper-control').hasClass('show-lightbox') ) ){								
											$player.play();																
										}else{
											if(!_.global_video_network_placeholder_hide){
												$poster_preload
												.css({'background-image': 'url(' + (poster_background) + ')'})
												.addClass('active-item')
												.on('click', function(){
													$player.play();
													$(this).removeClass('active-item');
												});
											}
										}
										
										$('#'+(player_init_id)).trigger( prefix+'videoCreateFinish', [$player]);
									}
									
									if(player_id === 'player-api-control'){
										_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){
											_.player_actions($player, single_video_network, 'pause');
										});
									}
									
									_.single_video_time_lapses($player, single_video_network, player_id, $poster_preload);
									
								}, 368);
								
								$player.on('ended', function(e){
									$playerMutedControl.removeClass('active-item');
									
									_.reset_ads(player_id);
									
									_.auto_next_fnc({
										'player': 				$player,
										'partyElm':				$partyElm,
										'player_id': 			player_id,
										'single_video_network': single_video_network,
									});
									
									$('body').trigger( 'vidorevVimeoVideoEnded', [$player, $partyElm]);
								});
								
								$player.on('pause', function(e){
									$('body').trigger( 'vidorevVimeoVideoPause', [$player, $partyElm]);
								});
								
							});
						/*api ready*/
						});					
						_.setVideo3rdPartyAPIReady(player_id, 'vimeoAPIReady', 'vimeo');
						
					}
										
					break;
					
				case 'dailymotion':
				
					$(document).on(prefix+'dailymotionAPIReady'+(player_id), function(){
					/*api ready*/	
						options = {
							video: single_video_source,
							params: {
								'endscreen-enable': false,
								autoplay: 			false,
								'sharing-enable':	false,
								'ui-logo':			false,	
							}
						}
						
						if(_.preview_mode_active){
							options.params.controls = false;
						}
						
						$player = DM.player(document.getElementById(player_id), options);
						
						$player.addEventListener('apiready', function(e){
							
							if(_.global_muted_video || _.global_video_network_mute_for_autoplay){
								$player.setMuted(true);
								$player.muted = true;
							}
							
							$player.addEventListener('play', function(e){
								_.global_player_playing[player_id] = true;
								if(typeof($player.muted)!=='undefined' && $player.muted && first_create && !_.preview_mode_active){
									$playerMutedControl.addClass('active-item').on('click', function(){
										$player.toggleMuted();
										$(this).removeClass('active-item');
									});
								}	
								first_create = false;
							});
							
							/*ads control*/	
							if(ads_enable && ads_network != 'google_ima'){				
								$player.addEventListener('timeupdate', function(e){
									
									video_duration 		= $player.duration;	
									
									if(video_duration===0){
										return;
									}
									
									video_current_time 	= $player.currentTime;
									
									_.video_ads({
										'player': 				$player,
										'single_video_network': single_video_network,
										'video_duration': 		video_duration,
										'video_current_time': 	video_current_time,
										'player_id': 			player_id,
										'partyElm':				$partyElm,
										'ads_object':			ads_object,
									});
									
									_.video_myCred_points({
										'player': 				$player,
										'video_duration': 		video_duration,
										'video_current_time': 	video_current_time,
										'player_id': 			player_id,
									});
									
								});
							}else{
								if(typeof(timeViewVideoRequest_myCred)!=='undefined' && _.isNumber(timeViewVideoRequest_myCred)){
									$player.addEventListener('timeupdate', function(e){
									
										video_duration 		= $player.duration;	
										
										if(video_duration===0){
											return;
										}
										
										video_current_time 	= $player.currentTime;
										
										_.video_myCred_points({
											'player': 				$player,
											'video_duration': 		video_duration,
											'video_current_time': 	video_current_time,
											'player_id': 			player_id,
										});
										
									});
								}
							}/*ads control*/
							
							setTimeout(function(){						
								
								if(ads_enable && ads_network === 'google_ima' && va_google_ima_source!=''){
									/*Google IMA*/
									_.ads_google_ima({
										'player': 				$player,																
										'player_id': 			player_id,
										'player_init_id': 		player_init_id,
										'partyElm':				$partyElm,
										'fake_player':			_.fake_player({
																	'player': 				$player,
																	'single_video_network': single_video_network,
																}),
										'autoplay':				autoplay,
										'va_google_ima_source': va_google_ima_source,					
									});
								}else{
									$partyElm.addClass('player-loaded');
								
									if(autoplay==='on' && ( $lib_item_control.length === 0 && !$('#parse-lightbox-control.video-lightbox-wrapper-control').hasClass('show-lightbox') ) ){								
										$player.play();																
									}else{
										if(!_.global_video_network_placeholder_hide){
											$poster_preload
											.css({'background-image': 'url(' + (poster_background) + ')'})
											.addClass('active-item')
											.on('click', function(){
												$player.play();
												$(this).removeClass('active-item');
											});
										}
									}
	
									
									$('#'+(player_init_id)).trigger( prefix+'videoCreateFinish', [$player]);
								}
								
								if(player_id === 'player-api-control'){
									_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){
										_.player_actions($player, single_video_network, 'pause');
									});
								}
								
								_.single_video_time_lapses($player, single_video_network, player_id, $poster_preload);
								
							}, 368);
							
							$player.addEventListener('ended', function(e){
								$playerMutedControl.removeClass('active-item');
								
								_.reset_ads(player_id);
								
								_.auto_next_fnc({
									'player': 				$player,
									'partyElm':				$partyElm,
									'player_id': 			player_id,
									'single_video_network': single_video_network,
								});
							});
							
						});
					/*api ready*/
					});					
					_.setVideo3rdPartyAPIReady(player_id, 'dailymotionAPIReady', 'dailymotion');
					
					break;
					
				case 'facebook':
				
					$(document).on(prefix+'facebookAPIReady'+(player_id), function(){
					/*api ready*/
						if(!_.getMobileOperatingSystem()){
							options = {'data-href':single_video_url, 'data-allowfullscreen':'true', 'data-width':'2560', 'data-height':'1440'}
						}else{
							options = {'data-href':single_video_url, 'data-allowfullscreen':'true', 'data-width':'2560'}
						}
						if(_.preview_mode_active){
							options['data-controls'] = 'false';
						}
						
						$('#'+(player_id)).addClass('fb-video').attr(options);					
						FB.Event.subscribe('xfbml.ready', function(msg) {
							if (msg.type === 'video' && msg.id === player_id) {
								$player = msg.instance;
								
								$('#'+(player_id)).find('iframe').attr('allow', 'autoplay; encrypted-media');
															
								if(_.global_muted_video || _.global_video_network_mute_for_autoplay){
									$player.mute();
								}else{
									$player.unmute();
								}						
								
								var intervalFacebook = null;
								
								$player.subscribe('startedPlaying', function(e){
									
									_.global_player_playing[player_id] = true;
									
									if($player.isMuted() && first_create && !_.preview_mode_active){
										$playerMutedControl.addClass('active-item').on('click', function(){
											$player.unmute();
											$(this).removeClass('active-item');
											$player.play();
										});
									}	
									
									first_create = false;
									
									/*ads control*/
									if(ads_enable && ads_network != 'google_ima'){
									
										if(intervalFacebook!==null){
											clearInterval(intervalFacebook);
										}
										intervalFacebook = setInterval(function(){
											
											video_duration 		= $player.getDuration();
											
											if(video_duration===0){
												return;
											}
											
											video_current_time 	= $player.getCurrentPosition();
											
											_.video_ads({
												'player': 				$player,
												'single_video_network': single_video_network,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
												'partyElm':				$partyElm,
												'ads_object':			ads_object,
											});
											
											_.video_myCred_points({
												'player': 				$player,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
											});
											
										}, 250);
									
									}else{
										if(intervalFacebook!==null){
											clearInterval(intervalFacebook);
										}
										if(typeof(timeViewVideoRequest_myCred)!=='undefined' && _.isNumber(timeViewVideoRequest_myCred)){
											intervalFacebook = setInterval(function(){
												
												video_duration 		= $player.getDuration();
												
												if(video_duration===0){
													return;
												}
												
												video_current_time 	= $player.getCurrentPosition();
												
												_.video_myCred_points({
													'player': 				$player,
													'video_duration': 		video_duration,
													'video_current_time': 	video_current_time,
													'player_id': 			player_id,
												});
												
											}, 250);
										}
									}/*ads control*/
								});							
								
								$player.subscribe('paused', function(e){
									if(ads_enable && intervalFacebook!==null){
										clearInterval(intervalFacebook);
									}
								});
								
								$player.subscribe('finishedPlaying', function(e){
									
									$playerMutedControl.removeClass('active-item');
									
									if(ads_enable){	
										_.reset_ads(player_id);
										if(intervalFacebook!==null){
											clearInterval(intervalFacebook);
										}
									}
									
									_.auto_next_fnc({
										'player': 				$player,
										'partyElm':				$partyElm,
										'player_id': 			player_id,
										'single_video_network': single_video_network,
									});
									
								});
								
								$player.subscribe('error', function(e){
									if(ads_enable){	
										_.reset_ads(player_id);									
										if(intervalFacebook!==null){
											clearInterval(intervalFacebook);
										}
									}
								});
								
								setTimeout(function(){								
									
									if(ads_enable && ads_network === 'google_ima' && va_google_ima_source!=''){
										/*Google IMA*/
										_.ads_google_ima({
											'player': 				$player,																
											'player_id': 			player_id,
											'player_init_id': 		player_init_id,
											'partyElm':				$partyElm,
											'fake_player':			_.fake_player({
																		'player': 				$player,
																		'single_video_network': single_video_network,
																	}),
											'autoplay':				autoplay,
											'va_google_ima_source': va_google_ima_source,					
										});
									}else{
										$partyElm.addClass('player-loaded');
									
										if(autoplay==='on' && ( $lib_item_control.length === 0 && !$('#parse-lightbox-control.video-lightbox-wrapper-control').hasClass('show-lightbox') ) ){								
											$player.play();																
										}else{
											if(!_.global_video_network_placeholder_hide){
												$poster_preload
												.css({'background-image': 'url(' + (poster_background) + ')'})
												.addClass('active-item')
												.on('click', function(){
													$player.play();
													$(this).removeClass('active-item');
												});
											}
										}
										
										$('#'+(player_init_id)).trigger( prefix+'videoCreateFinish', [$player]);
									}
									
									if(player_id === 'player-api-control'){
										_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){
											_.player_actions($player, single_video_network, 'pause');
										});
									}
									
									_.single_video_time_lapses($player, single_video_network, player_id, $poster_preload);
									
								}, 368);
								
							}
						});
						
						if($('#parse-lightbox-control').length>0){
							FB.XFBML.parse(document.getElementById('parse-lightbox-control'));
						}
					/*api ready*/
					});					
					_.setVideo3rdPartyAPIReady(player_id, 'facebookAPIReady', 'facebook');
					
					break;
					
				case 'twitch':
					
					$(document).on(prefix+'twitchAPIReady'+(player_id), function(){
					/*api ready*/
						options = {						
							video: single_video_source,
							autoplay: _.global_video_autoplay==='on' ? true : false,
							playsinline: true,
							muted: _.global_muted_video,
	
						}
						
						if(single_video_source.indexOf('channel...?><[~|~]')!==-1){
							options = {						
								channel: single_video_source.split('channel...?><[~|~]')[1],
								autoplay: _.global_video_autoplay==='on' ? true : false,
								playsinline: true,
								muted: _.global_muted_video,
							}
						}
						
						if(_.preview_mode_active){
							options.controls = false;
						}					
						
						$player = new Twitch.Player(player_id, options);
						
						$player.addEventListener(Twitch.Player.READY, function(e){
											
							var intervalTwitch 	= null;
							
							$player.addEventListener(Twitch.Player.PLAY, function(e){
								
								if(( first_create && $lib_item_control.length > 0 && !$lib_item_control.hasClass('show-video') ) || ( $lib_item_control.length === 0 && $('#parse-lightbox-control.video-lightbox-wrapper-control').hasClass('show-lightbox') ) ){								
									$player.pause();
									$player.seek(0);
									$player.pause();
								}
								
								_.global_player_playing[player_id] = true;
								
								if($player.getMuted() && first_create && !_.preview_mode_active){
									$playerMutedControl.addClass('active-item').on('click', function(){
										$player.setMuted(false);
										$player.setVolume(1);
										$(this).removeClass('active-item');
									});
								}	
								
								first_create = false;
								
								/*ads control*/	
								if(ads_enable && ads_network != 'google_ima'){							
									if(intervalTwitch!==null){
										clearInterval(intervalTwitch);
									}
									intervalTwitch = setInterval(function(){
										
										video_duration 		= $player.getDuration();
										
										if(video_duration===0){
											return;
										}
										
										video_current_time 	= $player.getCurrentTime();
										
										_.video_ads({
											'player': 				$player,
											'single_video_network': single_video_network,
											'video_duration': 		video_duration,
											'video_current_time': 	video_current_time,
											'player_id': 			player_id,
											'partyElm':				$partyElm,
											'ads_object':			ads_object,
										});
										
										_.video_myCred_points({
											'player': 				$player,
											'video_duration': 		video_duration,
											'video_current_time': 	video_current_time,
											'player_id': 			player_id,
										});
										
									}, 250);
								
								}else{
									if(intervalTwitch!==null){
										clearInterval(intervalTwitch);
									}
									if(typeof(timeViewVideoRequest_myCred)!=='undefined' && _.isNumber(timeViewVideoRequest_myCred)){
										
										intervalTwitch = setInterval(function(){
										
											video_duration 		= $player.getDuration();
											
											if(video_duration===0){
												return;
											}
											
											video_current_time 	= $player.getCurrentTime();
											
											_.video_myCred_points({
												'player': 				$player,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
											});
											
										}, 250);
									}
								}/*ads control*/
							});
							
							$player.addEventListener(Twitch.Player.PAUSE, function(e){
								if(intervalTwitch!==null){
									clearInterval(intervalTwitch);
								}
							});						
							
							setTimeout(function(){														
								if(ads_enable && ads_network === 'google_ima' && va_google_ima_source!=''){
									/*Google IMA*/
									_.ads_google_ima({
										'player': 				$player,																
										'player_id': 			player_id,
										'player_init_id': 		player_init_id,
										'partyElm':				$partyElm,
										'fake_player':			_.fake_player({
																	'player': 				$player,
																	'single_video_network': single_video_network,
																}),
										'autoplay':				autoplay,
										'va_google_ima_source': va_google_ima_source,					
									});
								}else{
									$partyElm.addClass('player-loaded');
									if(autoplay!='on' && !_.global_video_network_placeholder_hide){									
										$poster_preload
										.css({'background-image': 'url(' + (poster_background) + ')'})
										.addClass('active-item')
										.on('click', function(){
											$player.play();
											$(this).removeClass('active-item');
										});
									}
									$('#'+(player_init_id)).trigger( prefix+'videoCreateFinish', [$player]);
								}
								
								if(player_id === 'player-api-control'){
									_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){
										_.player_actions($player, single_video_network, 'pause');
									});
								}
								
								_.single_video_time_lapses($player, single_video_network, player_id, $poster_preload);
																												
							}, 368);
							
							$player.addEventListener(Twitch.Player.ENDED, function(e){
								$playerMutedControl.removeClass('active-item');
								
								_.reset_ads(player_id);
								
								_.auto_next_fnc({
									'player': 				$player,
									'partyElm':				$partyElm,
									'player_id': 			player_id,
									'single_video_network': single_video_network,
								});
								
								$player.pause();
								$player.seek(0);
								$player.pause();
							});
													
						});
					/*api ready*/
					});					
					_.setVideo3rdPartyAPIReady(player_id, 'twitchAPIReady', 'twitch');
					
					break;	
					
				case 'self-hosted': case 'drive':
					
					$(document).on(prefix+'selfhostedAPIReady'+(player_id), function(){					
					/*api ready*/	
						/*start - old shortcode*/
						var $selfHostedVideo = $partyElm.find('video.wp-video-shortcode');
						
						if($selfHostedVideo.length > 0){
							
							$selfHostedVideo.attr({'playsinline': '', 'webkit-playsinline': '',});
							
							if(typeof(player_obj.video_player_background)!=='undefined' && player_obj.video_player_background === 'on'){
								$selfHostedVideo.css({'background-image': 'url(' + (poster_background) + ')'});
							}
							
							var selfHostedVideoID = $.trim($selfHostedVideo.attr('id'));
							
							if(selfHostedVideoID!=''){
								$player = document.getElementById(selfHostedVideoID);
								
								if(_.preview_mode_active){
									$player.controls = false;
								}
								
								$player.muted = _.global_muted_video;
								$player.addEventListener('loadedmetadata', function(){
									
									if($($player).hasClass('selfHosted-ready-load')){
										return;
									}
									
									$($player).addClass('selfHosted-ready-load');
									
									$player.addEventListener('playing', function(){
										_.global_player_playing[player_id] = true;
										
										if($player.muted && first_create && !_.preview_mode_active){
											$playerMutedControl.addClass('active-item').on('click', function(){
												$player.muted = false;
												$player.volume = 1;
												$(this).removeClass('active-item');
											});
										}	
																		
										first_create = false;
									});
									
									/*ads control*/
									if(ads_enable && ads_network != 'google_ima'){
										$player.addEventListener('timeupdate', function(){
											
											video_duration 		= $player.duration;	
											
											if(video_duration===0){
												return;
											}
											
											video_current_time 	= $player.currentTime;
											
											_.video_ads({
												'player': 				$player,
												'single_video_network': single_video_network,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
												'partyElm':				$partyElm,
												'ads_object':			ads_object,
											});
											
											_.video_myCred_points({
												'player': 				$player,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
											});
											
										});
									}else{
										if(typeof(timeViewVideoRequest_myCred)!=='undefined' && _.isNumber(timeViewVideoRequest_myCred)){
											$player.addEventListener('timeupdate', function(){
												
												video_duration 		= $player.duration;	
												
												if(video_duration===0){
													return;
												}
												
												video_current_time 	= $player.currentTime;
												
												_.video_myCred_points({
													'player': 				$player,
													'video_duration': 		video_duration,
													'video_current_time': 	video_current_time,
													'player_id': 			player_id,
												});
												
											});
										}
									}/*ads control*/
									
									setTimeout(function(){
										
										if(ads_enable && ads_network === 'google_ima' && va_google_ima_source!=''){
											/*Google IMA*/
											_.ads_google_ima({
												'player': 				$player,																
												'player_id': 			player_id,
												'player_init_id': 		player_init_id,
												'partyElm':				$partyElm,
												'fake_player':			_.fake_player({
																			'player': 				$player,
																			'single_video_network': single_video_network,
																		}),
												'autoplay':				autoplay,
												'va_google_ima_source': va_google_ima_source,					
											});
										}else{
											$partyElm.addClass('player-loaded');
											
											if(autoplay==='on' && ( $lib_item_control.length === 0 && !$('#parse-lightbox-control.video-lightbox-wrapper-control').hasClass('show-lightbox') ) ){
												$player.play();							
											}else{
												$poster_preload
												.css({'background-image': 'url(' + (poster_background) + ')'})
												.addClass('active-item')
												.on('click', function(){
													$player.play();
													$(this).removeClass('active-item');
												});
											}
										}
										
										if(player_id === 'player-api-control'){
											_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){
												_.player_actions($player, single_video_network, 'pause');
											});
										}
										
										_.single_video_time_lapses($player, single_video_network, player_id, $poster_preload);	
										
									}, 368);
									
									$player.addEventListener('ended', function(){
										$playerMutedControl.removeClass('active-item');
										
										_.reset_ads(player_id);
										
										_.auto_next_fnc({
											'player': 				$player,
											'partyElm':				$partyElm,
											'player_id': 			player_id,
											'single_video_network': single_video_network,
										});
										
									});
									
								});
															
								return;
							}						
						}
						/*end - old shortcode*/					
					
						var $vidorev_video_shortcode 	= $partyElm.find('video.vidorev-video-shortcode');					
						if((typeof(player_obj.single_video_wp_shortcode) === 'undefined' && $vidorev_video_shortcode.length === 0) || typeof(mejs) === 'undefined'){
							return;
						}
						
						if(typeof(player_obj.single_video_wp_shortcode)!=='undefined'){					
							$('#'+(player_id)).append((player_obj.single_video_wp_shortcode).replace('id="video-0-1"', 'id="wpsc-'+(player_id)+'"'));
						}
						
						if($vidorev_video_shortcode.length > 0){
							$vidorev_video_shortcode.addClass('wp-video-shortcode');
						}
						
						if(typeof(player_obj.video_player_background)!=='undefined' && player_obj.video_player_background === 'on'){
							$('#'+(player_id)).find('video.wp-video-shortcode').css({'background-image': 'url(' + (poster_background) + ')'});
						}
						
						$('#'+(player_id)).find('video.wp-video-shortcode').attr({'playsinline': '', 'webkit-playsinline': '',}).mediaelementplayer({
							success: function(player, node){							
								$player = node;
								
								if($(player).find('video').length > 1){
									var $selfHostedLGBVideo = $(player).find('video.wp-video-shortcode');
									$selfHostedLGBVideo.attr({'playsinline': '', 'webkit-playsinline': '',});
									var selfHostedLGBVideoID = $.trim($selfHostedLGBVideo.attr('id'));
									$player = document.getElementById(selfHostedLGBVideoID);
								}
								
								if($($player).hasClass('selfHosted-ready-load')){
									return;
								}
								
								if(_.preview_mode_active){
									$player.controls = false;
								}
								
								$player.muted = _.global_muted_video;
								
								$($player).addClass('selfHosted-ready-load');
								
								$player.addEventListener('playing', function(){
									_.global_player_playing[player_id] = true;
									
									if($player.muted && first_create && !_.preview_mode_active){
										$playerMutedControl.addClass('active-item').on('click', function(){
											$player.muted = false;
											$player.volume = 1;
											$(this).removeClass('active-item');
										});
									}	
									
									first_create = false;
								});
								
								/*ads control*/
								if(ads_enable && ads_network != 'google_ima'){
									$player.addEventListener('timeupdate', function(){
										
										video_duration 		= $player.duration;
										
										if(video_duration===0){
											return;
										}
										
										video_current_time 	= $player.currentTime;
										
										_.video_ads({
											'player': 				$player,
											'single_video_network': single_video_network,
											'video_duration': 		video_duration,
											'video_current_time': 	video_current_time,
											'player_id': 			player_id,
											'partyElm':				$partyElm,
											'ads_object':			ads_object,
										});
										
										_.video_myCred_points({
											'player': 				$player,
											'video_duration': 		video_duration,
											'video_current_time': 	video_current_time,
											'player_id': 			player_id,
										});
										
									});
								}else{
									if(typeof(timeViewVideoRequest_myCred)!=='undefined' && _.isNumber(timeViewVideoRequest_myCred)){
										$player.addEventListener('timeupdate', function(){
											
											video_duration 		= $player.duration;
											
											if(video_duration===0){
												return;
											}
											
											video_current_time 	= $player.currentTime;
																						
											_.video_myCred_points({
												'player': 				$player,
												'video_duration': 		video_duration,
												'video_current_time': 	video_current_time,
												'player_id': 			player_id,
											});
											
										});
									}
								}/*ads control*/	
								
								setTimeout(function(){								
									
									if(ads_enable && ads_network === 'google_ima' && va_google_ima_source!=''){
										/*Google IMA*/
										_.ads_google_ima({
											'player': 				$player,																
											'player_id': 			player_id,
											'player_init_id': 		player_init_id,
											'partyElm':				$partyElm,
											'fake_player':			_.fake_player({
																		'player': 				$player,
																		'single_video_network': single_video_network,
																	}),
											'autoplay':				autoplay,
											'va_google_ima_source': va_google_ima_source,					
										});
									}else{
										$partyElm.addClass('player-loaded');
										
										if($vidorev_video_shortcode.length > 0){
											if(autoplay==='on' && ( $lib_item_control.length === 0 && !$('#parse-lightbox-control.video-lightbox-wrapper-control').hasClass('show-lightbox') ) ){
												$player.play();							
											}else{
												$poster_preload
												.css({'background-image': 'url(' + (poster_background) + ')'})
												.addClass('active-item')
												.on('click', function(){
													$player.play();
													$(this).removeClass('active-item');
												});
											}
										}else{
											if(autoplay!='on'){									
												$poster_preload
												.css({'background-image': 'url(' + (poster_background) + ')'})
												.addClass('active-item')
												.on('click', function(){
													$player.play();
													$(this).removeClass('active-item');
												});
											}
											
											$('#'+(player_init_id)).trigger( prefix+'videoCreateFinish', [$player]);
										}									
									}
									
									if(player_id === 'player-api-control'){
										_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){
											_.player_actions($player, single_video_network, 'pause');
										});
									}
									
									_.single_video_time_lapses($player, single_video_network, player_id, $poster_preload);											
									
								},368);	
								
								$player.addEventListener('ended', function(){
									$playerMutedControl.removeClass('active-item');
									
									_.reset_ads(player_id);
									
									_.auto_next_fnc({
										'player': 				$player,
										'partyElm':				$partyElm,
										'player_id': 			player_id,
										'single_video_network': single_video_network,
									});
									
								});			
							}
						});
					/*api ready*/	
					});
					_.setVideo3rdPartyAPIReady(player_id, 'selfhostedAPIReady', 'selfhosted');
					
					break;
					
				case 'embeded-code':
				
					$player = {
						play:function(){},
						pause:function(){},
						seek:function(int){}
					}
					
					var $ads_object = {
						'player': 				$player,
						'player_id': 			player_id,
						'player_init_id': 		player_init_id,
						'single_video_network': single_video_network,											
						'partyElm':				$partyElm,
						'fake_player':			_.fake_player({
													'player': 				$player,
													'single_video_network': single_video_network,
												}),
						'autoplay':				'off',						
						'ads_object':			ads_object,	
						'ads_enable':			ads_enable,
						'ads_network':			ads_network,										
						'va_google_ima_source': va_google_ima_source						
					}
				
					if(typeof(player_obj.single_video_embed) === 'undefined'){
						
						_.video_ads_embed($ads_object);
						return;
						
					}
					
					$('#'+(player_id)).append(player_obj.single_video_embed);
					
					var $vidorev_custom_player = $('#'+(player_id)).find('.video-js');
					if(player_obj.single_video_embed.indexOf('GDPlayer') !== -1 && typeof(videojs) === 'function' && $vidorev_custom_player.length > 0 && typeof($vidorev_custom_player.attr('id'))!=='undefined'){
						videojs($vidorev_custom_player.attr('id'));
						console.log('Vidorev: GD Player setup');
					}else if(player_obj.single_video_embed.indexOf('videojs(') === -1 && player_obj.single_video_embed.indexOf('videojs (') === -1 && typeof(videojs) === 'function' && $vidorev_custom_player.length > 0 && typeof($vidorev_custom_player.attr('id'))!=='undefined'){
						videojs($vidorev_custom_player.attr('id'));
						console.log('Vidorev: video js setup');
					}
					
					_.video_ads_embed($ads_object);
					
					_.$el.on(prefix+'closeLightBoxVideoEventForEmbedTrigger', function(e, _, videoActive){
						if(videoActive.find('#'+(player_id)).length > 0){
							$('#'+(player_id)).html('');
						}
					});
					
					_.$el.on(prefix+'VideoEmbedChangeEventTrigger', function(e, _, videoActive){
						if(videoActive.find('#'+(player_id)).length > 0){
							$('#'+(player_id)).html('');
						}
					});
					
					_.$el.on(prefix+'openLightBoxVideoEmbedEventTrigger', function(e, _, item_id){
						if(item_id.find('#'+(player_id)).length > 0){
							$('#'+(player_id)).append(player_obj.single_video_embed);
							/*_.video_ads_embed($ads_object);*/
						}						
					});												
			}
			
		}else{
			return '';
		}
	}
	
	vidorev_theme.prototype.video_theater_mode = function(){
		var _ = this;
		
		_.$el.off('.theaterModeControl').on('click.theaterModeControl', '.theater-mode-control', function(e){
			var $t = $(this);
			
			if($t.parents('#main-content').length > 0){
				_.$el.addClass('vidorev-theater-mode-classic');
			}
			
			$t.toggleClass('active-item');
			_.$el.toggleClass('vidorev-theater-mode');
			
			var offsetTop = 0;
			
			if(window.innerWidth > 600){
				offsetTop = $('#wpadminbar').height();
			}
			
			var $nav = $('#site-header .nav-wrap-control');
			
			if($nav.length > 0){
				$('html, body').animate({scrollTop:$nav.offset().top - offsetTop}, {duration:500, complete: function(){}});
			}
			
			var sidebarPadding = $('#video-player-wrap-control').height() + 20;
			
			if(_.$el.hasClass('vidorev-theater-mode-classic') && _.$el.hasClass('vidorev-theater-mode')){
				$('#main-sidebar').css({'padding-top':(sidebarPadding)+'px'});
			}else{
				$('#main-sidebar').css({'padding-top':''});//.removeAttr('style');
			}
			
			var default_width 	= window.innerWidth;			
			$(window).on('resize', function(){
				if(default_width === window.innerWidth){
					return;
				}
				
				if(!_.$el.hasClass('vidorev-theater-mode-classic') || !_.$el.hasClass('vidorev-theater-mode')){
					return;
				}
				
				var sidebarPadding = $('#video-player-wrap-control').height() + 20;
				
				$('#main-sidebar').css({'padding-top':(sidebarPadding)+'px'});
				
				default_width 	= window.innerWidth;
			});
			
			if(!_.$el.hasClass('close-side-menu') && $('.side-menu-wrapper-control').css('display')!='none' && _.$el.hasClass('header-vid-side')){				
				_.$el.removeClass('open-side-menu').addClass('close-side-menu');
			}
			
			_.$el.trigger('theater_mode_enable', [_]);				
		});
	}
	
	vidorev_theme.prototype.video_player_floating = function(){
		var _ = this;
		
		var $vidPlayerWrapper 	= $('#video-player-wrap-control'),
			floatingClass 		= 'floating-video';
		
		if($vidPlayerWrapper.length === 0 || _.$el.hasClass('disable-floating-video') || !$vidPlayerWrapper.find('.player-3rdparty-control').hasClass('player-loaded') || $vidPlayerWrapper.find('.fluid_control_mini_player').length > 0){
			return;
		}
		
		var videoOffset = $vidPlayerWrapper.offset().top + $vidPlayerWrapper.outerHeight(true);
		
		if($(window).scrollTop() > videoOffset+20){
			if(_.$el.hasClass('floating-video')){
				return;
			}
			_.$el.addClass('floating-video');
		}else{
			if(!_.$el.hasClass('floating-video')){
				return;
			}
			_.$el.removeClass('floating-video');
		}
	}
	
	vidorev_theme.prototype.close_video_player_floating = function(){
		var _ = this;
		
		_.$el.off('.scrollUpVideoPlayerFloating').on('click.scrollUpVideoPlayerFloating', 'a.scroll-up-floating-video-control', function(e){
			$('html, body').animate({scrollTop:0}, {duration:500, complete: function(){}});			
			return false;
		});
		
		_.$el.off('.closeVideoPlayerFloating').on('click.closeVideoPlayerFloating', 'a.close-floating-video-control', function(e){
			var $t = $(this);			
			_.$el.addClass('disable-floating-video');
			return false;				
		});
	}
	
	vidorev_theme.prototype.auto_next_control = function(){
		var _ = this;
		
		_.$el.off('.autoNextControl').on('click.autoNextControl', '.auto-next-control', function(e){
			var $t 				= $(this),
				$icon_control 	= $t.find('.auto-next-icon-control');		
					
			$icon_control.toggleClass('active-item');
			
			if($icon_control.hasClass('active-item')){
				Cookies.set('vpautonextvideo', 'true', { expires: 368 });
			}else{
				Cookies.set('vpautonextvideo', 'false', { expires: 368 });
			}
			
			_.global_video_auto_next = typeof(Cookies.get('vpautonextvideo'))!=='undefined' && Cookies.get('vpautonextvideo') == 'true';
			
			return false;				
		});
		
		_.auto_next_check();
	}
	
	vidorev_theme.prototype.auto_next_check = function(){
		var _ = this;
		
		if(_.global_video_auto_next){			
			$('.auto-next-icon-control').addClass('active-item');
			return true;			
		}
		
		return false;		
	}
	
	vidorev_theme.prototype.player_actions = function($player, single_video_network, action, setCurrentTime){
		var _ = this;
		
		if(typeof($player) === 'undefined' || typeof(single_video_network) === 'undefined'){
			return;
		}
		
		if(typeof($player.vidorev_partyLibrary)!=='undefined'){
			switch($player.vidorev_partyLibrary){				
				case 'jw':
					if(action==='play'){
						$player.play();
					}else if(action==='pause'){
						$player.pause();
					}else if(action==='seek' && typeof(setCurrentTime)!=='undefined' && _.isNumber(setCurrentTime)){
						$player.seek(setCurrentTime);
					}
					return;
					break;
				
				case 'fluidplayer':
					if(action==='play'){
						$player.play();
					}else if(action==='pause'){
						$player.pause();
					}else if(action==='seek' && typeof(setCurrentTime)!=='undefined' && _.isNumber(setCurrentTime)){						
						try {
							$player.currentTime = setCurrentTime;								
						} catch (fluidError1) {
							console.log('try fluid-api');
							try {
								$player.skipTo(setCurrentTime);	
							} catch (fluidError2) {
								console.log('err-fluid');
							}													
						}
					}
					return;
					break;				
			}
			
		}
								
		switch(single_video_network){
			case 'youtube':
				
				if(typeof($player.is_used_plyr_player)!=='undefined' && $player.is_used_plyr_player == 'on'){
					if(action==='play'){
						$player.play();
					}else if(action==='pause'){
						$player.pause();
					}else if(action==='seek' && typeof(setCurrentTime)!=='undefined' && _.isNumber(setCurrentTime)){
						$player.currentTime=setCurrentTime;
						$player.muted=false;
						$player.volume=1;
					}
				}else{
					if(action==='play'){
						$player.playVideo();
					}else if(action==='pause'){
						$player.pauseVideo();
					}else if(action==='seek' && typeof(setCurrentTime)!=='undefined' && _.isNumber(setCurrentTime)){
						$player.seekTo(setCurrentTime, true);
					}
				}
				break;
				
			case 'vimeo':
				if(typeof($player.is_used_plyr_player)!=='undefined' && $player.is_used_plyr_player == 'on'){
					if(action==='play'){
						$player.play();
					}else if(action==='pause'){
						$player.pause();
					}else if(action==='seek' && typeof(setCurrentTime)!=='undefined' && _.isNumber(setCurrentTime)){
						$player.currentTime=setCurrentTime;
						$player.muted=false;
						$player.volume=1;
					}
				}else{
					if(action==='play'){
						$player.play();
					}else if(action==='pause'){
						$player.pause();
					}else if(action==='seek' && typeof(setCurrentTime)!=='undefined' && _.isNumber(setCurrentTime)){
						$player.setCurrentTime(setCurrentTime);
					}
				}
				break;
				
			case 'dailymotion':			
				if(action==='play'){
					$player.play();
				}else if(action==='pause'){
					$player.pause();
				}else if(action==='seek' && typeof(setCurrentTime)!=='undefined' && _.isNumber(setCurrentTime)){
					$player.seek(setCurrentTime);
				}
				break;
				
			case 'facebook':
				if(action==='play'){
					$player.play();
				}else if(action==='pause'){
					$player.pause();
				}else if(action==='seek' && typeof(setCurrentTime)!=='undefined' && _.isNumber(setCurrentTime)){
					$player.seek(setCurrentTime);
				}
				break;
				
			case 'twitch':
				if(action==='play'){
					$player.play();
				}else if(action==='pause'){
					$player.pause();
				}else if(action==='seek' && typeof(setCurrentTime)!=='undefined' && _.isNumber(setCurrentTime)){
					$player.seek(setCurrentTime);
				}	
				break;	
				
			case 'self-hosted': case 'drive':
				if(action==='play'){
					$player.play();
				}else if(action==='pause'){
					$player.pause();
				}else if(action==='seek' && typeof(setCurrentTime)!=='undefined' && _.isNumber(setCurrentTime)){
					$player.currentTime = setCurrentTime;
				}	
				break;				
		}
	}
	
	vidorev_theme.prototype.isNumber = function(n){
		var _ = this;
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	vidorev_theme.prototype.nFormatter = function(num, digits){	
			
		if(isNaN(num)){
			return '0';
		}
		
		var si = [
				{ value: 1E18, symbol: "E" },
				{ value: 1E15, symbol: "P" },
				{ value: 1E12, symbol: "T" },
				{ value: 1E9,  symbol: "G" },
				{ value: 1E6,  symbol: "M" },
				{ value: 1E3,  symbol: "k" }
			],
			rx = /\.0+$|(\.[0-9]*[1-9])0+$/, 
			i;
		for (var i=0; i<si.length;i++) {
			if(num>=si[i].value) {
				return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
			}
		}
		return num.toFixed(digits).replace(rx, "$1");
	}
	
	vidorev_theme.prototype.fake_player = function(values){
		
		if(typeof(values)!=='object'){
			return;
		}
		
		var _ = this;
		
		var $player 				= values.player,
			single_video_network 	= values.single_video_network;

		
		var action = document.createElement('video');
		
		action.play = function(){
			_.player_actions($player, single_video_network, 'play');
		}			
		action.pause = 	function(){
			_.player_actions($player, single_video_network, 'pause');
		}
		
		if(_.global_video_network_placeholder_hide){
			action.vidorev_amp_player = true;
		}
		
		if( (single_video_network === 'self-hosted' || single_video_network === 'drive') && typeof($player.vidorev_partyLibrary)==='undefined' ){
			return $player;
		}
		
		return action;
	}
	
	vidorev_theme.prototype.reset_ads = function(player_id){
		var _ = this;
		if(typeof(_.is_ad_appeared[player_id])!=='undefined' && Array.isArray(_.is_ad_appeared[player_id]) && _.is_ad_appeared[player_id].length>0){
			_.is_ad_appeared[player_id] = [];
			/*$('.data-lightbox-content').append(player_id+'-reset<br>');*/
		}
	}
	
	vidorev_theme.prototype.auto_next_fnc = function(obj){
		var _ = this;

		if(typeof(obj)!=='object'){
			return;
		}else{
			
			var $player					= obj.player,
				$partyElm 				= obj.partyElm,
				player_id 				= obj.player_id,
				single_video_network 	= obj.single_video_network,
				$playlistFrame			= $partyElm.parents('.playlist-frame-control');
			
			var $repeat_btn = null;	
				
			var	action_auto_next = function(next_text, next_url, target_lightbox){
				
				if(_.global_video_network_placeholder_hide){
					return;
				}
					
				var $autoNextControl 	= $partyElm.find('.auto-next-elm-control');
				
				if(next_text!==null){
					$autoNextControl.find('.video-next-title-control').text(next_text);
				}
				
				if(next_url===null){
					next_url = $autoNextControl.attr('data-next-url');
				}
				
				if(typeof(next_url)==='undefined' || next_url==''){
					return;
				}
				
				$autoNextControl.css({'background-image': 'url(' + ($autoNextControl.attr('data-background-url')) + ')'}).addClass('active-item');
				
				if(screenfull.isFullscreen){
					$partyElm.addClass('auto-next-set-fs');
				}
				
				$(window).on('resize', function(){									
					if(screenfull.isFullscreen){
						$partyElm.addClass('auto-next-set-fs');
					}else{
						$partyElm.removeClass('auto-next-set-fs');
					}
				});
				
				var cancel_next = null;
				
				cancel_next = setTimeout(function(){
					if(cancel_next!==null){
						clearTimeout(cancel_next);
					}
					
					if(typeof(target_lightbox)!=='undefined' && target_lightbox.length > 0){
						
						if($partyElm.parents('.lib-item-control').hasClass('show-video') && $partyElm.parents('.video-lightbox-wrapper-control').hasClass('show-lightbox')){
																
							target_lightbox.trigger('click');
						}
													
					}else{							
						window.location.href = next_url;							
					}
				}, 6800);					
									
				$autoNextControl.find('.loader-timer-control').on('click', function(){
					if(cancel_next!==null){
						clearTimeout(cancel_next);
					}
					
					if(typeof(target_lightbox)!=='undefined' && target_lightbox.length > 0){
						target_lightbox.trigger('click');
					}else{
						window.location.href = next_url;
					}
											
					return false;
				});
				
				$autoNextControl.find('.cancel-btn-control').on('click', function(){
					if(cancel_next!==null){
						clearTimeout(cancel_next);
					}
					$autoNextControl.removeClass('active-item');
					$partyElm.removeClass('auto-next-set-fs');
					
					return false;
				});
				
				_.$el.on(prefix+'closeLightBoxVideoEventTrigger', function(){
					if(cancel_next!==null){
						clearTimeout(cancel_next);
					}
					$autoNextControl.removeClass('active-item');
					$partyElm.removeClass('auto-next-set-fs');
				});
				
				_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){
					if(cancel_next!==null){
						clearTimeout(cancel_next);
					}
					$autoNextControl.removeClass('active-item');
					$partyElm.removeClass('auto-next-set-fs');
				});
			}
			
			if($partyElm.parents('.video-lightbox-wrapper-control').length > 0){
				
				$repeat_btn = $partyElm.parents('.video-lightbox-wrapper-control').find('.repeat-video-control');
				if($repeat_btn.length === 1 && $repeat_btn.hasClass('active-item')){
					_.video_repeat_action(obj);
					return false;
				}
				
				if(!_.global_video_auto_next){
					return;
				}
				
				var $next_elm 			= $partyElm.parents('.video-lightbox-wrapper-control').find('.next-video-popup-action .check-url-control'),
					next_url 			= $next_elm.attr('href'),
					next_text 			= $next_elm.text();
				
				if($next_elm.length === 0){					
					return;
				}
									
				action_auto_next(next_text, next_url, $next_elm);
				
			}else if($playlistFrame.length > 0){
				
				$repeat_btn = $playlistFrame.find('.repeat-video-control');
				if($repeat_btn.length === 1 && $repeat_btn.hasClass('active-item')){
					_.video_repeat_action(obj);
					return false;
				}
				
				if(!_.global_video_auto_next){
					return;
				}
				
				var $curent_player_index = $playlistFrame.find('.video-listing-item-control.current-item');
				if($curent_player_index.length === 0){
					return;
				}
				
				var index = $curent_player_index.attr('data-index');
				
				if(typeof(index)==='undefined' || !_.isNumber(index)){
					return;
				}
				
				var next_index = parseFloat(index) + 1;
				
				if($playlistFrame.find('.video-listing-item-control[data-index="'+(next_index)+'"]').length === 0){
					next_index = 0;
				}
				
				var $next_elm 			= $playlistFrame.find('.video-listing-item-control[data-index="'+(next_index)+'"]').find('.check-url-control'),
					next_url 			= $next_elm.attr('href'),
					next_text 			= $next_elm.text();
									
				action_auto_next(next_text, next_url);
				
			}else{
				$repeat_btn = _.$el.find('.single-repeat-video-control');
				if($repeat_btn.length === 1 && $repeat_btn.hasClass('active-item')){
					_.video_repeat_action(obj);
					return false;
				}
				
				if(!_.global_video_auto_next){
					return;
				}
				
				action_auto_next(null, null);
			}
		}
	}
	
	vidorev_theme.prototype.video_ads_embed = function(values){
		if(typeof(values)!=='object'){
			return;
		}
		var _ = this;
		
		var ads_enable				= values.ads_enable,
			$partyElm				= values.partyElm;
			
		if(!ads_enable){
			$partyElm.addClass('player-loaded');
			return;
		}
		
		var ads_network				= values.ads_object.ads_network,
			va_google_ima_source	= values.va_google_ima_source,
			$poster_preload			= $partyElm.find('.autoplay-off-elm-control'),
			poster_background		= $poster_preload.attr('data-background-url');			
				
		_.loadAdsLibraries(function(){
			if(ads_network === 'google_ima' && va_google_ima_source!=''){
				
				_.ads_google_ima(values);
				return;
							
			}else if(ads_network != 'google_ima'){
				
				$poster_preload
				.css({'background-image': 'url(' + (poster_background) + ')'})
				.addClass('active-item')
				.on('click', function(){
					switch(ads_network){
						case 'image':
							_.ads_image(values);
							break;
							
						case 'html5_video':
							_.ads_html5_video(values);
							break;	
							
						case 'html':
							_.ads_html(values);
							break;
							
						case 'dynamic_ad':
							_.ads_dynamic(values);
							break;					
					}
					
					$(this).removeClass('active-item');
				});
								
				$partyElm.addClass('player-loaded');							
				return;
				
			}
		});		
	}
	
	vidorev_theme.prototype.video_myCred_points = function(values){
		
		var _ = this;
		
		if(typeof(timeViewVideoRequest_myCred)==='undefined' || !_.isNumber(timeViewVideoRequest_myCred) || typeof(values)!=='object'){
			return;
		}
		
		var	$player 				= values.player, 
			video_duration			= parseFloat(values.video_duration),
			video_current_time		= parseFloat(values.video_current_time),
			player_id				= values.player_id;
			
		_.$el.trigger( prefix+'beeteam368ActionToControlVideo', [player_id, video_current_time, video_duration]);	
			
		if(typeof(_.global_video_myCred_calculator[player_id])!=='undefined' && _.global_video_myCred_calculator[player_id] === null){
			return;
		}
		
		var data = {
			'action': 		'vidorev_update_mycred_points',
			'security':		(typeof(vidorev_jav_js_object.security)!=='undefined')?vidorev_jav_js_object.security:'',					
		}

		if(timeViewVideoRequest_myCred === -1 || timeViewVideoRequest_myCred > 1){
			
			if(typeof(_.global_video_myCred_calculator[player_id])==='undefined'){
				_.global_video_myCred_calculator[player_id] = [1, parseFloat(video_current_time)];
			}else{
				var last_current_time = parseFloat(_.global_video_myCred_calculator[player_id][1]);
				if(parseFloat(video_current_time) > last_current_time){
					_.global_video_myCred_calculator[player_id] = [parseFloat(_.global_video_myCred_calculator[player_id][0])+1, video_current_time];
				}else{
					_.global_video_myCred_calculator[player_id] = [_.global_video_myCred_calculator[player_id][0], last_current_time];					
				}
			}
			
			var time = parseFloat(_.global_video_myCred_calculator[player_id][0]) * 280 / 1000;
			
			if(timeViewVideoRequest_myCred === -1 && time >= video_duration - 3.68){
				_.global_video_myCred_calculator[player_id] = null;
				
				$.ajax({
					type: 		'POST',
					url: 		vidorev_jav_js_object.admin_ajax,
					cache: 		false,
					data: 		data,
					dataType: 	'json',
					success: 	function(data, textStatus, jqXHR){					
						if(typeof(data) === 'object'){
							console.log(data);
						}
					},
				});
				
			}else if(timeViewVideoRequest_myCred > 0 && time >= timeViewVideoRequest_myCred - 1){
				_.global_video_myCred_calculator[player_id][0] = 1;
				
				$.ajax({
					type: 		'POST',
					url: 		vidorev_jav_js_object.admin_ajax,
					cache: 		false,
					data: 		data,
					dataType: 	'json',
					success: 	function(data, textStatus, jqXHR){					
						if(typeof(data) === 'object'){
							console.log(data);
						}
					},
				});
			}
			
		}else if(timeViewVideoRequest_myCred === 1){
			_.global_video_myCred_calculator[player_id] = null;			
			
			$.ajax({
				type: 		'POST',
				url: 		vidorev_jav_js_object.admin_ajax,
				cache: 		false,
				data: 		data,
				dataType: 	'json',
				success: 	function(data, textStatus, jqXHR){					
					if(typeof(data) === 'object'){
						console.log(data);
					}
				},
			});
		}

	}
	
	vidorev_theme.prototype.video_ads = function(values){
		if(typeof(values)!=='object'){
			return;
		}
		var _ = this;
		
		var $player 				= values.player,
			$partyElm				= values.partyElm,
			single_video_network 	= values.single_video_network,
			video_duration			= parseFloat(values.video_duration),
			video_current_time		= parseFloat(values.video_current_time),
			player_id				= values.player_id;
			
		var ads_network				= values.ads_object.ads_network,
			time_to_show_ads 		= values.ads_object.time_to_show_ads,
			time_skip_ads 			= parseFloat(values.ads_object.time_skip_ads),
			time_to_hide_ads 		= parseFloat(values.ads_object.time_to_hide_ads);
			
		if(ads_network === 'google_ima' || ads_network === 'vast'){
			return;
		}	
			
		if(typeof(_.is_ad_appeared[player_id])==='undefined'){
			_.is_ad_appeared[player_id] = [];
		}
		
		if(screenfull.isFullscreen){
			$partyElm.addClass('ads-set-fs');
		}
		
		$(window).on('resize', function(){									
			if(screenfull.isFullscreen){
				$partyElm.addClass('ads-set-fs');
			}else{
				$partyElm.removeClass('ads-set-fs');
			}
		});		
						
		if(!Array.isArray(time_to_show_ads) || !_.isNumber(video_duration) || !_.isNumber(video_current_time)){
			return;
		}
				
		$.each(time_to_show_ads, function(i, value){
			
			var ct_show_ad 			= _.isNumber(value) ? parseFloat(value) : '',
				next_time_show_ad 	=  (typeof(time_to_show_ads[i+1])!=='undefined' && _.isNumber(time_to_show_ads[i+1])) ? parseFloat(time_to_show_ads[i+1]) : video_duration;
					
			if(ct_show_ad !== '' && ct_show_ad < video_duration && video_current_time >= ct_show_ad && video_current_time < next_time_show_ad && typeof(_.is_ad_appeared[player_id][i])==='undefined'){
				
				_.is_ad_appeared[player_id][i] = true;
				
				if(ads_network!='dynamic_ad'){
				
					_.player_actions($player, single_video_network, 'pause');
					
					$(document).on(prefix+'adsFinish'+(player_id), function(){
						_.player_actions($player, single_video_network, 'play');
					});
					
				}
				
				switch(ads_network){
					case 'image':
						_.ads_image(values);
						break;
						
					case 'html5_video':
						_.ads_html5_video(values);
						break;	
						
					case 'html':
						_.ads_html(values);
						break;
						
					case 'dynamic_ad':
						_.ads_dynamic(values);
						break;				
				}

			}
		});
	}
	
	vidorev_theme.prototype.ads_google_ima = function(values){
		if(typeof(values)!=='object'){
			return;
		}
		
		var _ = this;
		
		var $player			= values.player,
			player_id 		= values.player_id,
			adsContainerID 	= (player_id)+'-adContainer',
			player_init_id	= values.player_init_id,
			$player_init_id = $('#'+(player_init_id)),
			$partyElm 		= values.partyElm,
			$textLoadAds	= $partyElm.find('.text-load-ads-control'),
			$ads_muted_c	= $partyElm.find('.ads-muted-control'),
			$fake_player	= values.fake_player,
			autoplay		= values.autoplay,
			adWidth			= $partyElm.width(),
			adHeight		= $partyElm.height();
			
		var va_google_ima_source = values.va_google_ima_source;
		
		if(va_google_ima_source == ''){
			return;
		}

		$partyElm.append('<div class="ima-adContainer ima-adContainer-control" id="'+(adsContainerID)+'"></div>');
		
		var adsManager;
		var adsLoader;
		var adDisplayContainer;
		var intervalTimer = null;
		var videoContent = $fake_player;
		
		var controlPlayer = function(){
				$partyElm.addClass('player-loaded');
				$partyElm.removeClass('ads-active-elm');
				$adContainer.addClass('hide-ads');	
				$textLoadAds.removeClass('show-load-ad');
				$ads_muted_c.removeClass('active-item');
				if(autoplay==='on'){								
					videoContent.play();																
				}else{
					var $poster_preload		= $partyElm.find('.autoplay-off-elm-control'),
						poster_background	= $poster_preload.attr('data-background-url');
					
					if(!$poster_preload.hasClass('ready-setup')){
						if(!_.global_video_network_placeholder_hide){
							$poster_preload
							.css({'background-image': 'url(' + (poster_background) + ')'})
							.addClass('active-item')
							.on('click', function(){						
								videoContent.play();
								$(this).removeClass('active-item');
							});
						}
					}else{
						var $lightbox_video 	= $partyElm.parents('.video-lightbox-wrapper-control');
						var $item_on_lightbox 	= $partyElm.parents('.lib-item-control');
						if($lightbox_video.length > 0 && $item_on_lightbox.length > 0 && (!$lightbox_video.hasClass('show-lightbox') || !$item_on_lightbox.hasClass('show-video') || !$poster_preload.hasClass('ready-clicked'))){
							return;
						}
						videoContent.play();
					}
				}
				
				$player_init_id.trigger( prefix+'videoCreateFinish', [$player]);
			},
			$adContainer = $('#'+(adsContainerID)),
			controlIMAPreroll = function(){
				var $lightbox_video 	= $partyElm.parents('.video-lightbox-wrapper-control');
				var $item_on_lightbox 	= $partyElm.parents('.lib-item-control');
				if($lightbox_video.length > 0 && $item_on_lightbox.length > 0 && (!$lightbox_video.hasClass('show-lightbox') || !$item_on_lightbox.hasClass('show-video'))){										
					adsManager.pause();
				}	
			};
		
		/*onAdsManagerLoaded*/
		
			/*adsManager EVENT*/
				var onAdError = function(adErrorEvent) {
					console.log('adsManager: '+(adErrorEvent.getError()));
					adsManager.destroy();
					controlPlayer();
				}
				
				var onContentPauseRequested = function() {
					videoContent.pause();
				}
				
				var onContentResumeRequested = function() {
					var $lightbox_video 	= $partyElm.parents('.video-lightbox-wrapper-control');
					var $item_on_lightbox 	= $partyElm.parents('.lib-item-control');
					if($lightbox_video.length > 0 && $item_on_lightbox.length > 0 && (!$lightbox_video.hasClass('show-lightbox') || !$item_on_lightbox.hasClass('show-video'))){
						return;
					}
					
					videoContent.play();
				}
				
				var onAdEvent = function(adEvent){
					var ad = adEvent.getAd();
					switch (adEvent.type) {
						case google.ima.AdEvent.Type.LOADED:
							if (!ad.isLinear()) {															
								$partyElm.addClass('ads-non-linear');								
								videoContent.play();
							}else{
								$partyElm.removeClass('ads-non-linear');
							}
							
							$textLoadAds.removeClass('show-load-ad');
							$player_init_id.trigger( prefix+'videoCreateFinish', [$player, adsContainerID]);
												
							break;
						case google.ima.AdEvent.Type.STARTED:						
							
							if(adsManager.getVolume() == 0){
								$ads_muted_c.addClass('active-item').on('click', function(){
									adsManager.setVolume(1);
									$(this).removeClass('active-item');
								});
							}
							
							$partyElm.addClass('ads-active-elm');
							$adContainer.removeClass('hide-ads');
							$textLoadAds.removeClass('show-load-ad');
							
							if (ad.isLinear()) {
								intervalTimer = setInterval(function() {
									var remainingTime = adsManager.getRemainingTime();
									if(typeof(_.global_player_playing[player_id])!=='undefined' && _.global_player_playing[player_id]){
										_.global_player_playing[player_id] = false;
										videoContent.pause();
										
										var $lightbox_video 	= $partyElm.parents('.video-lightbox-wrapper-control');
										var $item_on_lightbox 	= $partyElm.parents('.lib-item-control');
										if($lightbox_video.length > 0 && $item_on_lightbox.length > 0 && (!$lightbox_video.hasClass('show-lightbox') || !$item_on_lightbox.hasClass('show-video'))){
											return;
										}
										
										adsManager.resume();
									}
								},
								368);
							}
							
							controlIMAPreroll();
							
							break;
						case google.ima.AdEvent.Type.COMPLETE:
							$partyElm.removeClass('ads-active-elm');
							$adContainer.addClass('hide-ads');
							$ads_muted_c.removeClass('active-item');
							if (intervalTimer!=null && ad.isLinear()) {
								clearInterval(intervalTimer);
							}
							break;							
						case google.ima.AdEvent.Type.SKIPPED:
							$partyElm.removeClass('ads-active-elm');
							$adContainer.addClass('hide-ads');
							$ads_muted_c.removeClass('active-item');
							if (intervalTimer!=null && ad.isLinear()) {
								clearInterval(intervalTimer);
							}
							break;							
						case google.ima.AdEvent.Type.USER_CLOSE:
							$partyElm.removeClass('ads-active-elm');
							$adContainer.addClass('hide-ads');
							$ads_muted_c.removeClass('active-item');						
							if (intervalTimer!=null && ad.isLinear()) {
								clearInterval(intervalTimer);
							}
							break;	
						case google.ima.AdEvent.Type.VOLUME_MUTED:
							$ads_muted_c.addClass('active-item').on('click', function(){
								adsManager.setVolume(1);
								$(this).removeClass('active-item');
							});
							break;	
					}
				}
			/*adsManager EVENT*/
			
			var onAdsManagerLoaded = function(adsManagerLoadedEvent){
				
				/*adsRenderingSettings*/
					var adsRenderingSettings = new google.ima.AdsRenderingSettings();		
					adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
				/*adsRenderingSettings*/
				
				/*adsManager*/
					adsManager = adsManagerLoadedEvent.getAdsManager( videoContent, adsRenderingSettings );
					
					/*RUN Ads*/						
						
						$partyElm.addClass('player-loaded');
						
						if(autoplay==='on'){
							
							if(screenfull.isFullscreen){
								$partyElm.addClass('ads-set-fs');
							}
							
							$(window).on('resize', function(){									
								if(screenfull.isFullscreen){
									$partyElm.addClass('ads-set-fs');
								}else{
									$partyElm.removeClass('ads-set-fs');
								}
							});
							
							$textLoadAds.addClass('show-load-ad');
							
							adDisplayContainer.initialize();
							try {
								
								adsManager.init(adWidth, adHeight, google.ima.ViewMode.NORMAL);
								if(_.global_muted_video){
									adsManager.setVolume(0);
								}
								_.is_ad_google_ima_control[adsContainerID] = adsManager;
								
								_.is_ad_google_ima_stated_event[adsContainerID] = true;	
								adsManager.start();
																
							} catch (adError) {
								
								console.log('adsManager-init: '+(adError));								
								controlPlayer();
								
							}
													
						}else{
							
							var $poster_preload		= $partyElm.find('.autoplay-off-elm-control'),
								poster_background	= $poster_preload.attr('data-background-url');	
								
							$poster_preload
							.css({'background-image': 'url(' + (poster_background) + ')'})
							.addClass('active-item ready-setup')
							.on('click', function(){
								
								/*screenfull.request($('#player-api-control')[0]);*/
								
								if(screenfull.isFullscreen){
									$partyElm.addClass('ads-set-fs');
								}
								
								$(window).on('resize', function(){									
									if(screenfull.isFullscreen){
										$partyElm.addClass('ads-set-fs');
									}else{
										$partyElm.removeClass('ads-set-fs');
									}
								});								
																
								$(this).addClass('ready-clicked');
								
								$textLoadAds.addClass('show-load-ad');
																
								if(typeof(videoContent.vidorev_amp_player)==='undefined'){
									videoContent.load();
									videoContent.play();
								}
								
								adDisplayContainer.initialize();
								try {
									
									adsManager.init(adWidth, adHeight, google.ima.ViewMode.NORMAL);
									if(_.global_muted_video){
										adsManager.setVolume(0);
									}
									_.is_ad_google_ima_control[adsContainerID] = adsManager;
									
									_.is_ad_google_ima_stated_event[adsContainerID] = true;	
									adsManager.start();
									
								} catch (adError) {
									
									console.log('adsManager-init: '+(adError));
									controlPlayer();
									
								}	
															
								$(this).removeClass('active-item');
								videoContent.pause();
								
							});
							
							$player_init_id.trigger( prefix+'playVideoWithGoogleIMAReady', [$player, $poster_preload]);	
							
						}
					/*RUN Ads*/
								
					adsManager.addEventListener( google.ima.AdErrorEvent.Type.AD_ERROR, onAdError );
					adsManager.addEventListener( google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, onContentPauseRequested );		
					adsManager.addEventListener( google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, onContentResumeRequested );		
					adsManager.addEventListener( google.ima.AdEvent.Type.ALL_ADS_COMPLETED, onAdEvent );
					adsManager.addEventListener( google.ima.AdEvent.Type.LOADED, onAdEvent );
					adsManager.addEventListener( google.ima.AdEvent.Type.STARTED, onAdEvent );
					adsManager.addEventListener( google.ima.AdEvent.Type.COMPLETE, onAdEvent );	
					
					adsManager.addEventListener( google.ima.AdEvent.Type.AD_BREAK_READY, onAdEvent );	
					adsManager.addEventListener( google.ima.AdEvent.Type.AD_METADATA, onAdEvent );	
					adsManager.addEventListener( google.ima.AdEvent.Type.CLICK, onAdEvent );	
					adsManager.addEventListener( google.ima.AdEvent.Type.DURATION_CHANGE, onAdEvent );	
					adsManager.addEventListener( google.ima.AdEvent.Type.FIRST_QUARTILE, onAdEvent );	
					adsManager.addEventListener( google.ima.AdEvent.Type.IMPRESSION, onAdEvent );	
					adsManager.addEventListener( google.ima.AdEvent.Type.INTERACTION, onAdEvent );	
					adsManager.addEventListener( google.ima.AdEvent.Type.LINEAR_CHANGED, onAdEvent );
					
					adsManager.addEventListener( google.ima.AdEvent.Type.LOG, onAdEvent );
					adsManager.addEventListener( google.ima.AdEvent.Type.MIDPOINT, onAdEvent );
					adsManager.addEventListener( google.ima.AdEvent.Type.PAUSED, onAdEvent );
					adsManager.addEventListener( google.ima.AdEvent.Type.RESUMED, onAdEvent );
					
					adsManager.addEventListener( google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, onAdEvent );
					adsManager.addEventListener( google.ima.AdEvent.Type.SKIPPED, onAdEvent );	
					adsManager.addEventListener( google.ima.AdEvent.Type.THIRD_QUARTILE, onAdEvent );
					
					adsManager.addEventListener( google.ima.AdEvent.Type.USER_CLOSE, onAdEvent );
					adsManager.addEventListener( google.ima.AdEvent.Type.VOLUME_CHANGED, onAdEvent );
					adsManager.addEventListener( google.ima.AdEvent.Type.VOLUME_MUTED, onAdEvent );		
				/*adsManager*/
				
			}	
		/*onAdsManagerLoaded*/
		
		/*adDisplayContainer*/
			adDisplayContainer = new google.ima.AdDisplayContainer(document.getElementById(adsContainerID)/*, videoContent*/);			
		/*adDisplayContainer*/
		
		/*adsLoader*/			
			/*adsLoader EVENT*/
				var adsLoader_onAdError = function(adErrorEvent) {
					console.log('adsLoader: '+(adErrorEvent.getError()));								
					controlPlayer();
				}
			/*adsLoader EVENT*/
			
			adsLoader = new google.ima.AdsLoader(adDisplayContainer);
			adsLoader.getSettings().setAutoPlayAdBreaks(false);
			
			/*adsRequest*/
				var adsRequest 		= new google.ima.AdsRequest();
				adsRequest.adTagUrl = va_google_ima_source;
			
				adsRequest.linearAdSlotWidth = adWidth;
				adsRequest.linearAdSlotHeight = adHeight;
			
				adsRequest.nonLinearAdSlotWidth = adWidth;
				adsRequest.nonLinearAdSlotHeight = adHeight;
			/*adsRequest*/
			
			adsLoader.requestAds(adsRequest);
			
			adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, onAdsManagerLoaded, false);
			adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, adsLoader_onAdError, false);
			
			videoContent.addEventListener('ended', function(){
				adsLoader.contentComplete();
			});					
			
		/*adsLoader*/
	}
	
	vidorev_theme.prototype.ads_image = function(values){
		if(typeof(values)!=='object'){
			return;
		}
		var _ = this;
		
		var player_id				= values.player_id,
			ads_object				= values.ads_object;
		
		if(typeof(ads_object)==='undefined' || typeof(ads_object.va_image_source)==='undefined' || $.trim(ads_object.va_image_source)==''){
			$(document).trigger(prefix+'adsFinish'+(player_id), [_]);
			return false;
		}
		
		var	va_image_source			= $.trim(ads_object.va_image_source),
			va_image_link			= $.trim(ads_object.va_image_link),
			time_skip_ads 			= parseFloat(ads_object.time_skip_ads),
			time_to_hide_ads 		= parseFloat(ads_object.time_to_hide_ads);
		
		var $partyElm				= values.partyElm,
			selfAdsID				= (player_id)+'-selfAdsID';
			
		var before_ads 	= '',
			after_ads	= '';
				
		if(va_image_link!=''){
			before_ads 	= '<a href="'+(va_image_link)+'" target="_blank">';
			after_ads	= '</a>';
		}	
		
		if($partyElm.find('#'+(selfAdsID)).length === 0){
			
			var skip_ad_image = '';
			
			if($partyElm.find('.video-play-control').length>0){
				var img_video_url = $partyElm.find('.video-play-control').attr('data-background-url');
				if(typeof(img_video_url)!=='undefined' && img_video_url!=''){
					skip_ad_image = '<span class="skip-ad-image" style="background-image:url('+(img_video_url)+')"></span>';
				}				
			}
			
			var html_ads_wrapper = '<div class="other-ads-container self-adContainer-control" id="'+(selfAdsID)+'">\
				'+(before_ads)+'\
					<img src="'+(va_image_source)+'" class="type-image-ads type-image-ads-control">\
				'+(after_ads)+'\
				<span class="skip-ad skip-ad-control">\
					<span class="skip-text skip-text-control"><span>'+(vidorev_jav_js_object.translate_skip_ad)+'</span><i class="fa fa-angle-double-right" aria-hidden="true"></i></span>\
					<span class="skip-ad-in skip-ad-in-control"><span>'+(vidorev_jav_js_object.translate_skip_ad_in)+'</span><span class="skip-second skip-second-control">'+(time_skip_ads)+'</span></span>\
					'+(skip_ad_image)+'\
				</span>\
			</div>';
			
			if($partyElm.find('.mejs-container').length > 0){
				$partyElm.find('.mejs-container').append(html_ads_wrapper);
			}else if($partyElm.find('.fluid_video_wrapper').length > 0){
				$partyElm.find('.fluid_video_wrapper').append(html_ads_wrapper);
			}else if($partyElm.find('.plyr.plyr--video').length > 0){
				$partyElm.find('.plyr.plyr--video').append(html_ads_wrapper);	
			}else{
				$partyElm.append(html_ads_wrapper);
			}
		}
		
		var $selfAdsContainer 	= $('#'+(selfAdsID)+'.self-adContainer-control'),
			$skipAds			= $selfAdsContainer.find('.skip-ad-control'),
			$skipSecond			= $selfAdsContainer.find('.skip-second-control'),
			$textLoadAds		= $partyElm.find('.text-load-ads-control'); 
			
		var timeOutHideAds 	= null,
			timeOutSkipAds 	= null;	
			
		var remove_ads =  function(){
			if(timeOutHideAds!==null){
				clearTimeout(timeOutHideAds);
			}
			
			if(timeOutSkipAds!==null){
				clearInterval(timeOutSkipAds);
			}
			
			$skipAds.removeClass('active-skip');
			$selfAdsContainer.addClass('hide-ads');
			$skipSecond.text(time_skip_ads);			
		}	
			
		$skipAds.off('.clickSkipAds').on('click.clickSkipAds', function(){
			remove_ads();				
			$(document).trigger(prefix+'adsFinish'+(player_id), [_]);
		});	
			
		$selfAdsContainer.removeClass('hide-ads');
		$textLoadAds.addClass('show-load-ad');
		
		$selfAdsContainer.find('.type-image-ads-control').on('load', function(){
			
			var $lightbox_wrapper 	= $partyElm.parents('.video-lightbox-wrapper-control'),
				$item_wrapper		= $partyElm.parents('.lib-item-control show-video');
				
			if( $lightbox_wrapper.length > 0 && $item_wrapper.length > 0 && (!$lightbox_wrapper.hasClass('show-lightbox') || !$item_wrapper.hasClass('show-video')) ){
				return false;
			}	
			
			$textLoadAds.removeClass('show-load-ad');
			$selfAdsContainer.addClass('ready-ad');
			
			if(timeOutHideAds!==null){
				clearTimeout(timeOutHideAds);
			}
						
			if(timeOutSkipAds!==null){
				clearInterval(timeOutSkipAds);
			}
						
			timeOutHideAds = setTimeout(function(){				
				clearTimeout(timeOutHideAds);									
				$skipAds.trigger('click');				
			}, time_to_hide_ads * 1000);
			
			var currentSkipSeconds = time_skip_ads;
			timeOutSkipAds = setInterval(function(){				
				currentSkipSeconds--;
				if(currentSkipSeconds===0){
					clearInterval(timeOutSkipAds);
					$skipAds.addClass('active-skip');
				}
				
				$skipSecond.text(currentSkipSeconds);				
			}, 1000);
		})
		.each(function() {
			var $lightbox_wrapper 	= $partyElm.parents('.video-lightbox-wrapper-control'),
				$item_wrapper		= $partyElm.parents('.lib-item-control show-video');
				
			if( $lightbox_wrapper.length > 0 && $item_wrapper.length > 0 && (!$lightbox_wrapper.hasClass('show-lightbox') || !$item_wrapper.hasClass('show-video')) ){
				return false;
			}	
			
			if(this.complete) {
				$(this).load();
			}
		});
		
		_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){						
			remove_ads();			
		});
		
		_.$el.on(prefix+'closeLightBoxVideoEventTrigger', function(){			
			remove_ads();
		});

	}
	
	vidorev_theme.prototype.converSecondsToTime = function(seconds){
		var date = new Date(null);
		date.setSeconds(seconds);
		var result = '';
		try{
			result = date.toISOString().substr(11, 8);
		}catch(err){
			return result;
		}
		var res = result.split(':');
		if(res.length === 3 && res[0] == '00'){
			result = (res[1])+':'+(res[2]);
		}
		return result;
	}
	
	vidorev_theme.prototype.ads_html5_video = function(values){
		if(typeof(values)!=='object'){
			return;
		}
		var _ = this;
		
		var player_id				= values.player_id,
			ads_object				= values.ads_object;
		
		if(typeof(ads_object)==='undefined' || typeof(ads_object.va_video_source)!=='object'){
			$(document).trigger(prefix+'adsFinish'+(player_id), [_]);
			return false;
		}
		
		var	va_video_source			= ads_object.va_video_source,
			va_video_link			= $.trim(ads_object.va_video_link),
			time_skip_ads 			= parseFloat(ads_object.time_skip_ads);
		
		var $partyElm				= values.partyElm,
			selfAdsID				= (player_id)+'-selfAdsID';
			
		var before_ads 	= '',
			after_ads	= '';
				
		if(va_video_link!=''){
			before_ads 	= '<a href="'+(va_video_link)+'" target="_blank" class="videoads-link-target">';
			after_ads	= '</a>';
		}	
		
		var video_html_5_id = 'vidorev_vid_ads_'+(player_id);
		
		if($partyElm.find('#'+(selfAdsID)).length === 0){
			
			var skip_ad_image = '';
			
			if($partyElm.find('.video-play-control').length>0){
				var img_video_url = $partyElm.find('.video-play-control').attr('data-background-url');
				if(typeof(img_video_url)!=='undefined' && img_video_url!=''){
					skip_ad_image = '<span class="skip-ad-image" style="background-image:url('+(img_video_url)+')"></span>';
				}				
			}
			
			var video_source = '';
			$.each( va_video_source, function( key, value ) {
				var ext = value.slice((Math.max(0, value.lastIndexOf(".")) || Infinity) + 1);
				switch(ext){
					case 'mp4':
						video_source+='<source src="'+(value)+'" type="video/mp4">';
						break;
						
					case 'webm':
						video_source+='<source src="'+(value)+'" type="video/webm">';
						break;
						
					case 'ogg':
						video_source+='<source src="'+(value)+'" type="video/ogg">';
						break;
				}
			});	
						
			var adsContent = '<video class="type-videoads" id="'+(video_html_5_id)+'" webkit-playsinline playsinline>'+(video_source)+'</video>';
			
			var html_ads_wrapper = '<div class="other-ads-container self-adContainer-control" id="'+(selfAdsID)+'">\
				'+(adsContent)+'\
				'+(before_ads)+'\
				'+(after_ads)+'\
				<span class="countdown-video-time countdown-video-time-control"></span>\
				<span class="skip-ad skip-ad-control">\
					<span class="skip-text skip-text-control"><span>'+(vidorev_jav_js_object.translate_skip_ad)+'</span><i class="fa fa-angle-double-right" aria-hidden="true"></i></span>\
					<span class="skip-ad-in skip-ad-in-control"><span>'+(vidorev_jav_js_object.translate_skip_ad_in)+'</span><span class="skip-second skip-second-control">'+(time_skip_ads)+'</span></span>\
					'+(skip_ad_image)+'\
				</span>\
			</div>';
			
			if($partyElm.find('.mejs-container').length > 0){
				$partyElm.find('.mejs-container').append(html_ads_wrapper);
			}else if($partyElm.find('.fluid_video_wrapper').length > 0){
				$partyElm.find('.fluid_video_wrapper').append(html_ads_wrapper);
				$partyElm.find('.ads-muted-control').remove();
				$partyElm.find('.self-adContainer-control').append('<div class="player-muted ads-mute-elm ads-muted-control"><i class="fa fa-volume-off" aria-hidden="true"></i></div>');
			}else if($partyElm.find('.plyr.plyr--video').length > 0){
				$partyElm.find('.plyr.plyr--video').append(html_ads_wrapper);	
			}else{
				$partyElm.append(html_ads_wrapper);
			}

		}
		
		var $selfAdsContainer 	= $('#'+(selfAdsID)+'.self-adContainer-control'),
			$skipAds			= $selfAdsContainer.find('.skip-ad-control'),
			$skipSecond			= $selfAdsContainer.find('.skip-second-control'),
			$textLoadAds		= $partyElm.find('.text-load-ads-control'),
			$countdownTimeVideo	= $selfAdsContainer.find('.countdown-video-time-control'),
			$ads_muted_c		= $partyElm.find('.ads-muted-control'); 
					
		var remove_ads =  function(){			
			$skipAds.removeClass('active-skip');
			$selfAdsContainer.addClass('hide-ads');
			$skipSecond.text(time_skip_ads);
			$countdownTimeVideo.text('');
			$ads_muted_c.removeClass('active-item')
			
			vid_ads.pause();
			vid_ads.addEventListener('loadedmetadata', function() {
				this.currentTime = 0;
			}, false);			
			vid_ads.load();			
		}	
			
		$skipAds.off('.clickSkipAds').on('click.clickSkipAds', function(){
			remove_ads();				
			$(document).trigger(prefix+'adsFinish'+(player_id), [_]);
		});	
			
		$selfAdsContainer.removeClass('hide-ads');
		$textLoadAds.addClass('show-load-ad');
		
		var vid_ads = $('#'+(video_html_5_id))[0];

		if(!$ads_muted_c.hasClass('ready-load-evt')){
			vid_ads.muted = _.global_muted_video;		
			if(_.getMobileOperatingSystem()){
				vid_ads.muted = true;
			}
		}
		
		vid_ads.onloadeddata = function(){
			var $lightbox_wrapper 	= $partyElm.parents('.video-lightbox-wrapper-control'),
				$item_wrapper		= $partyElm.parents('.lib-item-control show-video');
				
			if( $lightbox_wrapper.length > 0 && $item_wrapper.length > 0 && (!$lightbox_wrapper.hasClass('show-lightbox') || !$item_wrapper.hasClass('show-video')) ){
				return false;
			}	
			
			$textLoadAds.removeClass('show-load-ad');
			$selfAdsContainer.addClass('ready-ad');
			
			vid_ads.onerror = function(){
				$skipAds.trigger('click');
			}
			
			vid_ads.onended = function(){
				$skipAds.trigger('click');
			}
			
			vid_ads.addEventListener('playing', function(){				
				
				if(vid_ads.muted){
					$ads_muted_c.addClass('active-item').on('click', function(){
						vid_ads.muted = false;
						vid_ads.volume = 1;
						$(this).removeClass('active-item').addClass('ready-load-evt');
					});
				}	

			});
			
			vid_ads.ontimeupdate = function(){
				var videoDuration = vid_ads.duration;
				
				$countdownTimeVideo.text(_.converSecondsToTime((vid_ads.duration-vid_ads.currentTime)));
								
				if(time_skip_ads<=vid_ads.currentTime){
					$skipAds.addClass('active-skip');
				}else{
					$skipSecond.text(Math.ceil(time_skip_ads-vid_ads.currentTime));
				}																					
			}
			
			if(!$selfAdsContainer.hasClass('hide-ads')){
				vid_ads.play();
			}
			
		}
		
		if($selfAdsContainer.hasClass('ready-ad') || _.getMobileOperatingSystem()){
			vid_ads.load();
		}
		
		_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){						
			remove_ads();			
		});
		
		_.$el.on(prefix+'closeLightBoxVideoEventTrigger', function(){			
			remove_ads();
		});

	}
	
	vidorev_theme.prototype.ads_html = function(values){
		if(typeof(values)!=='object'){
			return;
		}
		var _ = this;
		
		var player_id				= values.player_id,
			ads_object				= values.ads_object;
		
		if(typeof(ads_object)==='undefined' || typeof(ads_object.va_html_source)==='undefined' || $.trim(ads_object.va_html_source)==''){
			$(document).trigger(prefix+'adsFinish'+(player_id), [_]);
			return false;
		}
		
		var	va_html_source			= $.trim(ads_object.va_html_source),
			time_skip_ads 			= parseFloat(ads_object.time_skip_ads),
			time_to_hide_ads 		= parseFloat(ads_object.time_to_hide_ads);
		
		var $partyElm				= values.partyElm,
			selfAdsID				= (player_id)+'-selfAdsID';
			
		var extra_class_ads = '';
		
		if(va_html_source.indexOf('ins class="adsbygoogle"')>0 || va_html_source.indexOf('<ins class="adsbygoogle"')>0 || va_html_source.indexOf('class="adsbygoogle"')>0 || va_html_source.indexOf('data-ad-client')>0 || va_html_source.indexOf('data-ad-slot')>0){
			extra_class_ads = 'type-mode-google-adsense';
		}	
			
		var before_ads 	= '<div class="html-wrapper-ads html-wrapper-ads-control '+(extra_class_ads)+'">',
			after_ads	= '</div>';
	
		
		if($partyElm.find('#'+(selfAdsID)).length === 0){
			
			var skip_ad_image = '';
			
			if($partyElm.find('.video-play-control').length>0){
				var img_video_url = $partyElm.find('.video-play-control').attr('data-background-url');
				if(typeof(img_video_url)!=='undefined' && img_video_url!=''){
					skip_ad_image = '<span class="skip-ad-image" style="background-image:url('+(img_video_url)+')"></span>';
				}				
			}
			
			var html_ads_wrapper = '<div class="other-ads-container self-adContainer-control" id="'+(selfAdsID)+'">\
				'+(before_ads)+'\
					'+(va_html_source)+'\
				'+(after_ads)+'\
				<span class="skip-ad skip-ad-control">\
					<span class="skip-text skip-text-control"><span>'+(vidorev_jav_js_object.translate_skip_ad)+'</span><i class="fa fa-angle-double-right" aria-hidden="true"></i></span>\
					<span class="skip-ad-in skip-ad-in-control"><span>'+(vidorev_jav_js_object.translate_skip_ad_in)+'</span><span class="skip-second skip-second-control">'+(time_skip_ads)+'</span></span>\
					'+(skip_ad_image)+'\
				</span>\
			</div>';
			
			if($partyElm.find('.mejs-container').length > 0){
				$partyElm.find('.mejs-container').append(html_ads_wrapper);
			}else if($partyElm.find('.fluid_video_wrapper').length > 0){
				$partyElm.find('.fluid_video_wrapper').append(html_ads_wrapper);
			}else if($partyElm.find('.plyr.plyr--video').length > 0){
				$partyElm.find('.plyr.plyr--video').append(html_ads_wrapper);	
			}else{
				$partyElm.append(html_ads_wrapper);
			}
		}
		
		var $selfAdsContainer 	= $('#'+(selfAdsID)+'.self-adContainer-control'),
			$skipAds			= $selfAdsContainer.find('.skip-ad-control'),
			$skipSecond			= $selfAdsContainer.find('.skip-second-control'),
			$textLoadAds		= $partyElm.find('.text-load-ads-control'),
			$htmlWrapper		= $partyElm.find('.html-wrapper-ads-control'); 
			
		$selfAdsContainer.removeClass('hide-ads');
		$textLoadAds.addClass('show-load-ad');
		_.$el.addClass('adsense-google-active');
		
		if($.trim($htmlWrapper.html())==''){
			$htmlWrapper.html(va_html_source);
		}
		
		var timeOutHideAds 	= null,
			timeOutSkipAds 	= null;	
			
		var remove_ads =  function(){
			if(timeOutHideAds!==null){
				clearTimeout(timeOutHideAds);
			}
			
			if(timeOutSkipAds!==null){
				clearInterval(timeOutSkipAds);
			}
			
			$skipAds.removeClass('active-skip');
			$selfAdsContainer.addClass('hide-ads');
			$skipSecond.text(time_skip_ads);
			
			if(extra_class_ads=='type-mode-google-adsense'){
				$htmlWrapper.html('');	
			}
			_.$el.removeClass('adsense-google-active');		
		}	
			
		$skipAds.off('.clickSkipAds').on('click.clickSkipAds', function(){
			remove_ads();				
			$(document).trigger(prefix+'adsFinish'+(player_id), [_]);
		});	
		
		var active_ads = function(){
			var $lightbox_wrapper 	= $partyElm.parents('.video-lightbox-wrapper-control'),
				$item_wrapper		= $partyElm.parents('.lib-item-control show-video');
				
			if( $lightbox_wrapper.length > 0 && $item_wrapper.length > 0 && (!$lightbox_wrapper.hasClass('show-lightbox') || !$item_wrapper.hasClass('show-video')) ){
				return false;
			}	
			
			$textLoadAds.removeClass('show-load-ad');
			$selfAdsContainer.addClass('ready-ad');
			
			if(timeOutHideAds!==null){
				clearTimeout(timeOutHideAds);
			}
						
			if(timeOutSkipAds!==null){
				clearInterval(timeOutSkipAds);
			}
						
			timeOutHideAds = setTimeout(function(){				
				clearTimeout(timeOutHideAds);									
				$skipAds.trigger('click');				
			}, time_to_hide_ads * 1000);
			
			var currentSkipSeconds = time_skip_ads;
			timeOutSkipAds = setInterval(function(){				
				currentSkipSeconds--;
				if(currentSkipSeconds===0){
					clearInterval(timeOutSkipAds);
					$skipAds.addClass('active-skip');
				}
				
				$skipSecond.text(currentSkipSeconds);				
			}, 1000);
		}
		
		if(extra_class_ads=='type-mode-google-adsense'){
			$htmlWrapper.find('iframe').on('load', function(){
				active_ads();
			});
			if($htmlWrapper.find('iframe').length === 0){
				setTimeout(function(){
					if($htmlWrapper.find('iframe').length > 0){
						active_ads();
					}else{
						setTimeout(function(){
							if($htmlWrapper.find('iframe').length > 0){
								active_ads();
							}else{
								remove_ads();
							}
						},666);
					}
				},368);
			}	
		}else{
			active_ads();
		}
		
		_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){						
			remove_ads();			
		});
		
		_.$el.on(prefix+'closeLightBoxVideoEventTrigger', function(){			
			remove_ads();
		});
	}
	
	vidorev_theme.prototype.ads_dynamic = function(values){
		if(typeof(values)!=='object'){
			return;
		}
		var _ = this;
		
		var player_id				= values.player_id,
			ads_object				= values.ads_object;
			
		if(typeof(ads_object)==='undefined' || typeof(ads_object.va_dynamic_type)==='undefined' || $.trim(ads_object.va_dynamic_type)=='' || typeof(ads_object.va_dynamic_source)==='undefined' || $.trim(ads_object.va_dynamic_source)==''){
			return false;
		}
		
		var	va_dynamic_type			= $.trim(ads_object.va_dynamic_type),
			va_dynamic_size_desk	= $.trim(ads_object.va_dynamic_size_desk),
			va_dynamic_size_mob		= $.trim(ads_object.va_dynamic_size_mob),
			va_dynamic_size_vert	= $.trim(ads_object.va_dynamic_size_vert),
			va_dynamic_source		= $.trim(ads_object.va_dynamic_source),
			va_dynamic_link			= $.trim(ads_object.va_dynamic_link),
			time_to_hide_ads 		= parseFloat(ads_object.time_to_hide_ads);
			
		var $partyElm				= values.partyElm,
			selfAdsID				= (player_id)+'-selfAdsID';	
			
		var before_ads 				= '',
			after_ads				= '',
			mid_ads_ct				= '';	
		
		switch(va_dynamic_type){
			case 'image':
				if(va_dynamic_link!=''){
					before_ads 	= '<a href="'+(va_dynamic_link)+'" target="_blank">';
					after_ads	= '</a>';
				}		
				mid_ads_ct	= '<img src="'+(va_dynamic_source)+'" class="type-image-ads type-image-ads-control">';
				break;
				
			case 'html':
				var extra_class_ads = '';
				if(va_dynamic_source.indexOf('ins class="adsbygoogle"')>0 || va_dynamic_source.indexOf('<ins class="adsbygoogle"')>0 || va_dynamic_source.indexOf('class="adsbygoogle"')>0 || va_dynamic_source.indexOf('data-ad-client')>0 || va_dynamic_source.indexOf('data-ad-slot')>0){
					extra_class_ads = 'type-mode-google-adsense';
				}
				before_ads 	= '<div class="dynamic-html-ads dynamic-html-ads-control '+(extra_class_ads)+'">',
				after_ads	= '</div>';
				mid_ads_ct	= va_dynamic_source;
				break;	
		}
		
		if($partyElm.find('#'+(selfAdsID)).length === 0){
			var html_ads_wrapper = '<div class="dynamic-ads-container dynamic-adContainer-control desk-'+(va_dynamic_size_desk)+' mobi-'+(va_dynamic_size_mob)+' vert-'+(va_dynamic_size_vert)+'" id="'+(selfAdsID)+'">\
				<span class="dynamic-close-button dynamic-close-button-control"><i class="fa fa-times" aria-hidden="true"></i></span>\
				<div class="dynamic-ads-content dynamic-ads-content-control">\
					'+(before_ads)+(mid_ads_ct)+(after_ads)+'\
				</div>\
			</div>';
			
			if($partyElm.find('.mejs-container').length > 0){
				$partyElm.find('.mejs-container').append(html_ads_wrapper);
			}else if($partyElm.find('.fluid_video_wrapper').length > 0){
				$partyElm.find('.fluid_video_wrapper').append(html_ads_wrapper);
			}else if($partyElm.find('.plyr.plyr--video').length > 0){
				$partyElm.find('.plyr.plyr--video').append(html_ads_wrapper);	
			}else{
				$partyElm.append(html_ads_wrapper);
			}

		}
		
		var $selfAdsContainer = $('#'+(selfAdsID)+'.dynamic-adContainer-control'),
			$html_dynamic_adsense = $selfAdsContainer.find('.dynamic-html-ads-control'),
			$closeDynamicAds = $selfAdsContainer.find('.dynamic-close-button-control');
			
		$selfAdsContainer.removeClass('hidden-dynamic-ads');
		_.$el.addClass('adsense-google-active');	
		
		if(va_dynamic_type == 'html' && typeof(extra_class_ads) && extra_class_ads=='type-mode-google-adsense' && $.trim($html_dynamic_adsense.html())==''){
			$html_dynamic_adsense.html(va_dynamic_source);
		}
		
		var timeOutHideAds 	= null;
		
		var remove_ads =  function(){
			
			if(timeOutHideAds!==null){
				clearTimeout(timeOutHideAds);
			}
			
			$selfAdsContainer.addClass('hidden-dynamic-ads');
			
			if(va_dynamic_type == 'html' && typeof(extra_class_ads) && extra_class_ads=='type-mode-google-adsense'){
				$html_dynamic_adsense.html('');				
			}
			
			_.$el.removeClass('adsense-google-active');					
		}
		
		$closeDynamicAds.on('click', function(){
			remove_ads();
		});
		
		var active_ads = function(){
			var $lightbox_wrapper 	= $partyElm.parents('.video-lightbox-wrapper-control'),
				$item_wrapper		= $partyElm.parents('.lib-item-control show-video');
				
			if( $lightbox_wrapper.length > 0 && $item_wrapper.length > 0 && (!$lightbox_wrapper.hasClass('show-lightbox') || !$item_wrapper.hasClass('show-video')) ){
				return false;
			}	
			
			$selfAdsContainer.addClass('ready-ad');
			
			if(timeOutHideAds!==null){
				clearTimeout(timeOutHideAds);
			}
						
			timeOutHideAds = setTimeout(function(){				
				clearTimeout(timeOutHideAds);									
				$closeDynamicAds.trigger('click');				
			}, time_to_hide_ads * 1000);
			
		}
		
		if(va_dynamic_type == 'html' && typeof(extra_class_ads) && extra_class_ads=='type-mode-google-adsense'){
			$html_dynamic_adsense.find('iframe').on('load', function(){
				active_ads();
			});
			
			if($html_dynamic_adsense.find('iframe').length === 0){
                setTimeout(function(){
                    if($html_dynamic_adsense.find('iframe').length > 0){
                        active_ads();
                    }else{
                        setTimeout(function(){
                            if($html_dynamic_adsense.find('iframe').length > 0){
                                active_ads();
                            }else{
                                remove_ads();
                            }
                        },666);
                    }
                },368);
            }
			
		}else if(va_dynamic_type == 'image'){
			$selfAdsContainer.find('.type-image-ads-control')
			.on('load', function(){
				active_ads();
			})
			.each(function() {
				var $lightbox_wrapper 	= $partyElm.parents('.video-lightbox-wrapper-control'),
					$item_wrapper		= $partyElm.parents('.lib-item-control show-video');
					
				if( $lightbox_wrapper.length > 0 && $item_wrapper.length > 0 && (!$lightbox_wrapper.hasClass('show-lightbox') || !$item_wrapper.hasClass('show-video')) ){
					return false;
				}	
				
				if(this.complete) {
					$(this).load();
				}
			});
		}else{
			active_ads();
		}
		
		_.$el.on(prefix+'openLightBoxVideoEventTrigger', function(){
			remove_ads();	
		});
		
		_.$el.on(prefix+'closeLightBoxVideoEventTrigger', function(){
			remove_ads();
		});
	}
	
	vidorev_theme.prototype.open_lightbox_image = function(){
		var _ = this;
		_.$el.off('.openLightboxImage').on('click.openLightboxImage', '.img-lightbox-icon-control', function(e){
			
			_.$el.trigger(prefix+'openLightBoxImageEventTrigger', [_]);
			
			var $t 			= $(this),
				img_source 	= $t.attr('data-url'),
				img_id		= $t.attr('data-id');
			
			if(typeof(img_id)==='undefined' || typeof(img_source)==='undefined'){
				return false;
			}
			
			var $lightbox_wrapper = _.$el.find('.image-lightbox-wrapper-control');	
			if($lightbox_wrapper.length === 0) {
				_.$el.append( 	'<div class="image-lightbox-wrapper image-lightbox-wrapper-control dark-background">\
									<div class="close-btn close-img-lg-control"></div>\
									<div class="img-loading img-loading-control"><span class="video-load-icon"></span></div>\
								</div>' );
								
				$lightbox_wrapper = _.$el.find('.image-lightbox-wrapper-control');
				
				$('.close-img-lg-control', $lightbox_wrapper).on('click', function(){
					$lightbox_wrapper.removeClass('show-lightbox');
					$('img.image-lightbox-item-control', $lightbox_wrapper).removeClass('active-item');
					_.$el.trigger(prefix+'closeLightBoxImageEventTrigger', [_]);
				});
				
				setTimeout(function(){
					$lightbox_wrapper.addClass('show-lightbox');
				}, 200);
			}else{
				$lightbox_wrapper.addClass('show-lightbox');
			}
			
			if($lightbox_wrapper.find('.image-lightbox-item-control[data-id="'+(img_id)+'"]').length === 0){
				
				$lightbox_wrapper.append('<img src="'+(img_source)+'" class="image-lightbox-item image-lightbox-item-control" data-id="'+(img_id)+'">');
				
				setTimeout(function(){
					$('<img src="'+(img_source)+'">').on('load', function(){
						if($lightbox_wrapper.hasClass('show-lightbox')){						
							$('img.image-lightbox-item-control[data-id="'+(img_id)+'"]', $lightbox_wrapper).addClass('active-item');						
						}
					});
				}, 368);
				
			}else{
				$('img.image-lightbox-item-control[data-id="'+(img_id)+'"]', $lightbox_wrapper).addClass('active-item');
			}
			
		});
	}
	
	vidorev_theme.prototype.open_lightbox_video = function(){
		var _ = this;
		
		_.$el.off('.openLightboxVideo').on('click.openLightboxVideo', '.video-popup-control', function(e){
			
			_.$el.trigger(prefix+'openLightBoxVideoEventTrigger', [_]);
			
			var $t 				= $(this),
				id 				= $.trim($t.attr('data-id')),
				player_id 		= 'player-api-control-'+(id),
				player_init_id 	= (player_id)+'-init',
				item_id 		= 'video-lib-'+(id);
			
			if(id==''){
				return;
			}
			
			var $lightbox_wrapper = _.$el.find('.video-lightbox-wrapper-control');
			
			if($lightbox_wrapper.length === 0) {
				var class_show_tab 			= '',
					class_suggested_active 	= 'active-item',
					class_comments_active 	= '';
				
				if(vidorev_jav_js_object.video_lightbox_suggested == 'off'){
					class_show_tab +=' suggested-off suggested-off-control';
					class_suggested_active 	= '';
					class_comments_active 	= 'active-item';
				}
				
				if(vidorev_jav_js_object.video_lightbox_comments == 'off'){
					class_show_tab +=' comments-off comments-off-control';					
				}
				
				var class_show_form_comment = 'disable-comment';
				if(vidorev_jav_js_object.is_user_logged_in == '1'){
					class_show_form_comment = '';
				}
				
				_.$el.append(	'<div id="parse-lightbox-control" class="video-lightbox-wrapper video-lightbox-wrapper-control dark-background '+(class_show_tab)+'">\
									<div class="lib-item-cp navigation-font">\
										<div class="site__container-fluid">\
											<div class="site__row">\
												<div class="site__col cp-left">\
													<div class="lib-close-video lib-close-video-control"><span class="close-btn"></span><span>'+(vidorev_jav_js_object.translate_close)+'</span></div>\
												</div>\
												<div class="site__col cp-center">\
													<div class="auto-next-control"><span>'+(vidorev_jav_js_object.translate_auto_next)+'</span><span><i class="auto-next-icon big-style auto-next-icon-control"></i></span></div>\
												</div>\
												<div class="site__col cp-right">\
													<div class="listing-toolbar listing-toolbar-control">\
														<div class="site__row">\
															<div class="site__col toolbar-item toolbar-item-control h6 '+(class_suggested_active)+'" data-active="suggested">'+(vidorev_jav_js_object.translate_suggested)+'</div>\
															<div class="site__col toolbar-item toolbar-item-control h6 '+(class_comments_active)+'" data-active="comments">'+(vidorev_jav_js_object.translate_comments)+'</div>\
														</div>\
													</div>\
												</div>\
											</div>\
										</div>\
									</div>\
									<div class="lib-contents lib-contents-control">\
										<div class="site__container-fluid">\
											<div class="site__row">\
												<div class="site__col lib-vid-player lib-vid-player-control">\
												</div>\
												<div class="site__col lib-vid-listing lib-vid-listing-control">\
													<div class="listing-toolbar listing-toolbar-control">\
														<div class="site__container-fluid">\
															<div class="site__row">\
																<div class="site__col toolbar-item toolbar-item-control h6 '+(class_suggested_active)+'" data-active="suggested">'+(vidorev_jav_js_object.translate_suggested)+'</div>\
																<div class="site__col toolbar-item toolbar-item-control h6 '+(class_comments_active)+'" data-active="comments">'+(vidorev_jav_js_object.translate_comments)+'</div>\
															</div>\
														</div>\
													</div>\
													<div class="data-lightbox data-lightbox-control">\
														<div class="data-lightbox-content">\
															<div class="suggested-listing suggested-listing-control '+(class_suggested_active)+'">\
																<div class="loading-content loading-content-control">'+(vidorev_jav_js_object.translate_loading)+'...<br><span class="loader-bar"></span></div>\
																<div class="ajax-content ajax-content-control"></div>\
															</div>\
															<div class="comments-listing comments-listing-control '+(class_comments_active)+'">\
																<div class="loading-content loading-content-control">'+(vidorev_jav_js_object.translate_loading)+'...<br><span class="loader-bar"></span></div>\
																<div class="ajax-comment-form ajax-comment-form-control '+(class_show_form_comment)+'">\
																	<div class="ajax-comment-form-wrapper">\
																		<div class="comment-input-wrap"><input type="text" class="live-comment-input live-comment-input-control" placeholder="'+(vidorev_jav_js_object.translate_public_comment)+'..."></div>\
																		<div class="comment-send-wrap"><button class="live-comment-send live-comment-send-control">'+(vidorev_jav_js_object.translate_post_comment)+'</button>\
																			<input type="button" class="live-comment-reset live-comment-reset-control white-style" value="'+(vidorev_jav_js_object.translate_reset)+'">\
																		</div>\
																		<div class="login-tooltip"><span>'+(vidorev_jav_js_object.translate_login_comment)+'</span></div>\
																	</div>\
																</div>\
																<div class="ajax-content ajax-content-control"></div>\
															</div>\
														</div>\
													</div>\
												</div>\
											</div>\
										</div>\
									</div>\
								</div>'
				);
								
				$lightbox_wrapper = _.$el.find('.video-lightbox-wrapper-control');
				
				var $btnResetCommentForm = $lightbox_wrapper.find('.live-comment-reset-control'),
					$inputTextCommentForm = $lightbox_wrapper.find('.live-comment-input-control');
				
				$btnResetCommentForm.off('.resetCommentForm').on('click.resetCommentForm', function(){
					$inputTextCommentForm.val('');
				});
				
				setTimeout(function(){
					
					$lightbox_wrapper.addClass('show-lightbox');
					
					if(_.global_scroll_bar_lib === 'malihu'){

						$lightbox_wrapper.find('.data-lightbox-control').mCustomScrollbar({
							theme: 'minimal',
							alwaysShowScrollbar:0,
							scrollInertia: 200,
						});

					}else if(_.global_scroll_bar_lib === 'overlay'){
						
						$lightbox_wrapper.find('.data-lightbox-control').overlayScrollbars({
							scrollbars:{
								autoHide:'move',
							}
						});
					}
					
				},200);
				
			}else{
				$lightbox_wrapper.addClass('show-lightbox');
				
				var $videoActive = $lightbox_wrapper.find('.lib-item-control.show-video');
				if($videoActive.length>0){
					var	idActive = $videoActive.attr('id');					
					$videoActive.removeClass('show-video');
					
					_.$el.trigger(prefix+'VideoEmbedChangeEventTrigger', [_, $videoActive]);
					
					if(typeof(_.global_video_lightbox_items[idActive])!=='undefined'){
						_.player_actions(_.global_video_lightbox_items[idActive][0], _.global_video_lightbox_items[idActive][1], 'pause');
					}
				}
				
			}
			
			$('html').addClass('disable-scroll');
			
			_.auto_next_check();
			
			var $suggested_listing_control 		= $lightbox_wrapper.find('.suggested-listing-control'),
					$comments_listing_control 	= $lightbox_wrapper.find('.comments-listing-control');
					
			$suggested_listing_control.removeClass('load-completed').find('.ajax-content-control').html('');
			$comments_listing_control.removeClass('load-completed').find('.ajax-content-control').html('');			
			
			try{
				if(vidorev_jav_js_object.single_post_comment_type == 'facebook'){
					_.action_lightbox_facebook_comment(id, $comments_listing_control);
				}else{
					_.get_lightbox_video_comment(id, '', $comments_listing_control);
					_.action_lightbox_added_comment(id, $comments_listing_control);
				}			
			}catch (comment_error) {
				console.log(comment_error);
			}			
			
			if($('#'+(item_id)).length===0){
			
				var html = '';
				
				html+= '<div id="'+(item_id)+'" class="lib-item lib-item-control show-video">';
							
							html+= '<div class="single-player-video-wrapper">\
										<div class="video-lightbox-title video-lightbox-title-control"></div>\
										<div class="video-player-wrap">\
											<div class="video-player-ratio"></div>\
											<div class="video-player-content video-player-control">\
												<div class="player-3rdparty player-3rdparty-control" id="'+(player_init_id)+'">\
													<div id="'+(player_id)+'" class="player-api">\
													</div>\
													<div class="player-muted player-muted-control"><i class="fa fa-volume-off" aria-hidden="true"></i></div>\
													<div class="text-load-ads text-load-ads-control">\
														'+(vidorev_jav_js_object.translate_text_load_ad)+'\
													</div>\
													<div class="autoplay-off-elm autoplay-off-elm-control video-play-control" data-id="'+(id)+'">\
														<span class="video-icon big-icon video-play-control" data-id="'+(id)+'"></span>\
													</div>\
													<div class="player-muted ads-mute-elm ads-muted-control"><i class="fa fa-volume-off" aria-hidden="true"></i></div>\
													<div class="auto-next-elm auto-next-elm-control dark-background">\
														<div class="auto-next-content">\
															<div class="up-next-text font-size-12">'+(vidorev_jav_js_object.translate_up_next)+'</div>\
															<h3 class="h6-mobile video-next-title video-next-title-control"></h3>\
															<div class="loader-timer-wrapper loader-timer-control">\
																<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" class="loader-timer">\
																	<circle class="progress-timer" fill="none" stroke-linecap="round" cx="20" cy="20" r="15.915494309" />\
																</svg>\
																<i class="fa fa-fast-forward" aria-hidden="true"></i>\
															</div>\
															<a href="#" class="basic-button basic-button-default cancel-btn cancel-btn-control">'+(vidorev_jav_js_object.translate_cancel)+'</a>\
														</div>\
													</div>\
												</div>\
												<div class="video-loading video-loading-control">\
													<span class="video-load-icon"></span>\
												</div>\
											</div>\
										</div>\
									</div>';
									
				html+= '</div>';			
						
				$lightbox_wrapper.find('.lib-vid-player-control').append(html);
				
				var data 		= {
					'action': 		'get_player_params',				
					'post_id': 		id,
					'security':		(typeof(vidorev_jav_js_object.security)!=='undefined')?vidorev_jav_js_object.security:'',					
				}
				
				$.ajax({
					type: 		'POST',
					url: 		vidorev_jav_js_object.admin_ajax,
					cache: 		false,
					data: 		data,
					dataType: 	'json',
					success: 	function(data, textStatus, jqXHR){					
						if(typeof(data) === 'object'){
							
							if(vidorev_jav_js_object.video_lightbox_suggested == 'on' && typeof(data.single_video_suggested)!=='undefined'){	
								_.global_video_lightbox_suggested_posts[item_id] = data.single_video_suggested;
								$suggested_listing_control.addClass('load-completed').find('.ajax-content-control').html(data.single_video_suggested);
								if(typeof(window.vidorev_visible_image_opacity) !== 'undefined'){
									window.vidorev_visible_image_opacity();
								}
							}
							
							if(typeof(data.video_title)!=='undefined' && $.trim(data.video_title)!=''){
								$('#'+(item_id)).find('.video-lightbox-title-control').html(data.video_title);
							}
							
							_.$el.trigger(prefix+'openLightBoxVideoHandleCustomAction', [_, $('#'+(item_id)), id, data]);
							
							if(typeof(data.single_video_network) === 'undefined' && typeof(data.single_video_source) === 'undefined' && typeof(data.single_video_url) === 'undefined'){
								return false;
							}
							
							var $poster_preload		= $('#'+(player_init_id)).find('.autoplay-off-elm-control');															
							$poster_preload.attr('data-background-url', data.poster_background).append('<img class="poster-preload" src="'+(data.poster_background)+'">');
							
							var $autoNextControl     = $('#'+(player_init_id)).find('.auto-next-elm-control');	
							$autoNextControl.attr('data-background-url', data.poster_background);					
							
							$('#'+(player_init_id)).on(prefix+'videoCreateFinish', function(e, player, adsContainerID){
								
								_.global_video_lightbox_items[item_id] = [player, data.single_video_network];
								
								setTimeout(function(){
									
									if(!$('#'+(item_id)).hasClass('show-video') || !$lightbox_wrapper.hasClass('show-lightbox') || _.global_video_autoplay!='on' || typeof(adsContainerID)!=='undefined'){										
										return false;
									}									
									
									$poster_preload.removeClass('active-item');
									_.player_actions(player, data.single_video_network, 'play');	
																	
								},200);								
								
							});							
							
							$('#'+(player_init_id)).on(prefix+'playVideoWithGoogleIMAReady', function(e, player, $poster_preload){
								if(_.global_video_autoplay==='on' && $('#'+(item_id)).hasClass('show-video') && $lightbox_wrapper.hasClass('show-lightbox')){
									$poster_preload.trigger('click');
								}
							});
							
							_.create_single_video_player(player_id, data);
							
						}					
						
					},
					error: function( jqXHR, textStatus, errorThrown ){
					}
				});	
			
			}else{
				$('#'+(item_id)).addClass('show-video');
				
				_.$el.trigger(prefix+'openLightBoxVideoEmbedEventTrigger', [_, $('#'+(item_id))]);
				
				var $poster_preload	= $('#'+(item_id)).find('.autoplay-off-elm-control');
				
				if(vidorev_jav_js_object.video_lightbox_suggested == 'on' && typeof(_.global_video_lightbox_suggested_posts[item_id])!=='undefined'){
					$suggested_listing_control.addClass('load-completed').find('.ajax-content-control').html(_.global_video_lightbox_suggested_posts[item_id]);
					if(typeof(window.vidorev_visible_image_opacity) !== 'undefined'){
						window.vidorev_visible_image_opacity();
					}
				}
				
				if($('#'+(item_id)).find('.ima-adContainer-control:not(.hide-ads)').length>0){
					
					var adsContainerID = $('#'+(item_id)).find('.ima-adContainer-control').attr('id');
					
					if(typeof(adsContainerID)!=='undefined' && typeof(_.is_ad_google_ima_control[adsContainerID])!=='undefined'){
						try{
							if(typeof(_.is_ad_google_ima_stated_event[adsContainerID])==='boolean' && _.is_ad_google_ima_stated_event[adsContainerID] === true){							
								_.is_ad_google_ima_control[adsContainerID].resume();
							}else{
								if($('#'+(item_id)).find('.autoplay-off-elm-control.active-item').length === 0){								
									_.is_ad_google_ima_stated_event[adsContainerID] = true;
									_.is_ad_google_ima_control[adsContainerID].start();	
								}
							}
						}catch (imaError) {
						}
					}else{
						if(_.global_video_autoplay==='on'){
							$poster_preload.trigger('click');
						}
					}	
					return false;
				}
				
				if(typeof(_.global_video_lightbox_items[item_id])==='undefined' || _.global_video_autoplay!='on'){
					return false;
				}
				
				$poster_preload.removeClass('active-item');
				_.player_actions(_.global_video_lightbox_items[item_id][0], _.global_video_lightbox_items[item_id][1], 'play');
			}
			
			return false;				
		});
		
		_.$el.off('.lightboxToolbar').on('click.lightboxToolbar', '.listing-toolbar-control .toolbar-item-control', function(e){
			var $t 			= $(this),
				active		= $t.attr('data-active');
				
			$('.listing-toolbar-control .toolbar-item-control, .data-lightbox-control .suggested-listing-control, .data-lightbox-control .comments-listing-control').removeClass('active-item');
			$('.listing-toolbar-control .toolbar-item-control[data-active="'+(active)+'"], .data-lightbox-control .'+(active)+'-listing-control').addClass('active-item');
		});
	}
	
	vidorev_theme.prototype.action_lightbox_facebook_comment = function(post_id, comments_listing_control){
		var _ = this;
		
		var $comments_listing_control 	= comments_listing_control,
			comment_id 					= 'facebook-comment-'+(post_id),	
			$facebook_comment 			= $comments_listing_control.find('#'+comment_id);
		
		$comments_listing_control.removeClass('load-completed').find('.facebook-comment-control').removeClass('active-item');	
		
		var data = {
			'action': 		'get_post_data_for_lightbox',				
			'post_id': 		post_id,
			'security':		(typeof(vidorev_jav_js_object.security)!=='undefined')?vidorev_jav_js_object.security:'',			
		}
		
		if($facebook_comment.length > 0){			
			$facebook_comment.addClass('active-item');
			$comments_listing_control.addClass('load-completed');	
		}else{
			$.ajax({
				type: 		'POST',
				url: 		vidorev_jav_js_object.admin_ajax,
				cache: 		false,
				data: 		data,
				dataType: 	'json',
				success: 	function(data, textStatus, jqXHR){					
					
					if(typeof(data) === 'object' && typeof(data['post_url']) !== 'undefined'){
						$comments_listing_control.prepend('<div class="facebook-comment facebook-comment-control" id="'+(comment_id)+'">\
							<div id="fb-root"></div>\
							<div class="fb-comments" data-href="'+(data['post_url'])+'" data-width="auto" data-numposts="20" data-order-by="time" data-colorscheme="dark"></div>\
							</div>'
						);
						
						var fb_action_lightbox = function(){
							FB.XFBML.parse(document.getElementById(comment_id));
						
							var facebook_comment_loaded = null;
							
							facebook_comment_loaded = setTimeout(function(){
								$comments_listing_control.find('#'+comment_id).addClass('active-item');
								$comments_listing_control.addClass('load-completed');
								facebook_comment_loaded = null;
							}, 2000);
							
							_.$el.on(prefix+'closeLightBoxVideoEventTrigger', function(){
								if(facebook_comment_loaded!==null){
									clearTimeout(facebook_comment_loaded);
									$comments_listing_control.removeClass('load-completed').find('#'+comment_id).removeClass('active-item');
								}							
							});	
						}
						
						var requ_fnc 	= (typeof(FB)!=='undefined' && typeof(FB.Event)!=='undefined');
						var requ_url	= (typeof(vidorev_jav_plugin_js_object)!=='undefined' && typeof(vidorev_jav_plugin_js_object.facebook_library_url)!=='undefined' && vidorev_jav_plugin_js_object.facebook_library_url!='')?vidorev_jav_plugin_js_object.facebook_library_url:'https://connect.facebook.net/en_US/sdk.js?ver=6.0#xfbml=1&version=v6.0';
						if(!requ_fnc){							
							_.requestScript(requ_url, fb_action_lightbox);
						}else{
							fb_action_lightbox();
						}										
					}						
					
				},
				error: function( jqXHR, textStatus, errorThrown ){
				}
			});
		}
		
	}
	
	vidorev_theme.prototype.action_lightbox_added_comment = function(post_id, comments_listing_control){
		var _ = this;
		
		_.$el.off('.lightboxAddedComment');
		
		if(post_id=='' || vidorev_jav_js_object.video_lightbox_comments == 'off'){			
			return;
		}
		
		_.$el.on('click.lightboxAddedComment', '.live-comment-send-control', function(e){
			
			var $t 						= $(this),
				$commentForm			= $t.parents('.ajax-comment-form-control'),
				$inputTextCommentForm	= $commentForm.find('.live-comment-input-control'),
				comment_value			= $inputTextCommentForm.val();
			
			if(comment_value==''){				
				return false;
			}
			
			$inputTextCommentForm.val('');
			
			if( _.global_click_added_live_comment === 1){
				return false;
			}
			
			$commentForm.addClass('added-loading');
						
			_.global_click_added_live_comment = 1;
			clearInterval(_.global_video_lightbox_live_comments);
			_.global_video_lightbox_live_comments = null;
			
			var added_comment = {
				'action': 		'add_live_comment',				
				'post_id': 		post_id,
				'comment':		comment_value,
				'security':		(typeof(vidorev_jav_js_object.security)!=='undefined')?vidorev_jav_js_object.security:'',				
			}
			
			$.ajax({
				type: 		'POST',
				url: 		vidorev_jav_js_object.admin_ajax,
				cache: 		false,
				data: 		added_comment,
				dataType: 	'json',
				success: 	function(data, textStatus, jqXHR){
					
					var $comments_listing_control = comments_listing_control,
						$comments_ajax = $comments_listing_control.find('.comment-wrapper-control'),
						query_date = '';
						
					if($comments_ajax.find('.comment-item').length>0 && typeof($comments_ajax.find('.comment-item').eq(0))!=='undefined' && typeof($comments_ajax.find('.comment-item').eq(0).attr('data-date'))!=='undefined'){
						query_date = $comments_ajax.find('.comment-item').eq(0).attr('data-date');
					}
						
					_.global_click_added_live_comment = null;	
					
					_.$el.on(prefix+'add_comment_end', function(){
						$commentForm.removeClass('added-loading');
						$t.blur();
					});
								
					_.get_lightbox_video_comment(post_id, query_date, $comments_listing_control);
					
					if(typeof(data) === 'object'){
						if(data.result == '0'){
							if($commentForm.find('.spam-error').length === 0 ){
								$commentForm.append('<div class="spam-error">'+(data.msg)+'</div>');
							}
						}else if(data.result == '2'){
							if($commentForm.find('.spam-error').length > 0 ){
								$commentForm.find('.spam-error').remove();
							}
						}
					}
					
					if(typeof(window.vidorev_visible_image_opacity) !== 'undefined'){
						window.vidorev_visible_image_opacity();
					}					
					
				},
				error: function( jqXHR, textStatus, errorThrown ){
				}
			});	
			
		});
		
		_.$el.off('.enterlightboxInputComment').on('keydown.enterlightboxInputComment', '.live-comment-input-control', function(e){
			if(e.keyCode === 13){
				_.$el.find('.live-comment-send-control').trigger('click');
			}
		});
	}
	
	vidorev_theme.prototype.get_lightbox_video_comment = function(post_id, query_date, comments_listing_control){
		var _ = this;
		
		if(post_id=='' || vidorev_jav_js_object.video_lightbox_comments == 'off'){
			return;
		}
		
		var $comments_listing_control = comments_listing_control,
			$comments_ajax = $comments_listing_control.find('.comment-wrapper-control');
		
		var data_comment = {
			'action': 		'get_player_comments',				
			'post_id': 		post_id,	
			'query_date':	query_date,
			'security':		(typeof(vidorev_jav_js_object.security)!=='undefined')?vidorev_jav_js_object.security:'',				
		}
		
		$.ajax({
			type: 		'POST',
			url: 		vidorev_jav_js_object.admin_ajax,
			cache: 		false,
			data: 		data_comment,
			dataType: 	'html',
			success: 	function(data, textStatus, jqXHR){					
				if(typeof(data) !== 'undefined' && _.global_click_added_live_comment===null){						
					
					if($comments_ajax.length === 0){
						$comments_listing_control.addClass('load-completed').find('.ajax-content-control').html(data);	
						$comments_ajax = $comments_listing_control.find('.comment-wrapper-control');
					}else{
						if($.trim(data)!==''){
							$comments_ajax.prepend(data);
						}
					}
					
					if(typeof(window.vidorev_visible_image_opacity) !== 'undefined'){
						window.vidorev_visible_image_opacity();
					}
					
					_.$el.trigger(prefix+'add_comment_end', []);
					
					if(_.global_video_lightbox_live_comments===null){
						_.global_video_lightbox_live_comments = setInterval(
							function(){
								clearInterval(_.global_video_lightbox_live_comments);
								_.global_video_lightbox_live_comments = null;
								
								if($comments_ajax.find('.comment-item').length>0 && typeof($comments_ajax.find('.comment-item').eq(0))!=='undefined' && typeof($comments_ajax.find('.comment-item').eq(0).attr('data-date'))!=='undefined'){
									query_date = $comments_ajax.find('.comment-item').eq(0).attr('data-date');
								}
								
								_.get_lightbox_video_comment(post_id, query_date, $comments_listing_control);								
							},
							5368
						);
					}			
					
				}					
				
			},
			error: function( jqXHR, textStatus, errorThrown ){
			}
		});
	}
	
	vidorev_theme.prototype.close_lightbox_video_title = function(){
		var _ = this;
		
		_.$el.off('.closeLightboxVideoTitle').on('click.closeLightboxVideoTitle', '.close-title-control', function(e){
			var $t = $(this);
			var $video_title_wrapper = $t.parents('.video-lightbox-title-control');
			
			if($video_title_wrapper.length > 0){
				$video_title_wrapper.remove();
			}
		});
	}
	
	vidorev_theme.prototype.close_lightbox_video = function(){
		var _ = this;
		
		_.$el.off('.closeLightboxVideo').on('click.closeLightboxVideo', '.lib-close-video-control', function(e){
			
			_.$el.trigger(prefix+'closeLightBoxVideoEventTrigger', [_]);
			
			var $lightbox_wrapper 	= _.$el.find('.video-lightbox-wrapper-control'),
				$videoActive		= $lightbox_wrapper.find('.lib-item-control.show-video'),
				idActive			= $videoActive.attr('id');
				
			var $suggested_listing_control 	= $lightbox_wrapper.find('.suggested-listing-control'),
				$comments_listing_control 	= $lightbox_wrapper.find('.comments-listing-control');
			
			if(_.global_video_lightbox_live_comments!==null){	
				clearInterval(_.global_video_lightbox_live_comments);
				_.global_video_lightbox_live_comments = null;	
			}
				
			$suggested_listing_control.removeClass('load-completed').find('.ajax-content-control').html('');
			$comments_listing_control.removeClass('load-completed').find('.ajax-content-control').html('');	
			
			$videoActive.removeClass('show-video');
			$lightbox_wrapper.removeClass('show-lightbox');	
			
			$('html').removeClass('disable-scroll');
			
			_.$el.off('.lightboxAddedComment');
			
			if($comments_listing_control.find('.spam-error').length > 0 ){
				$comments_listing_control.find('.spam-error').remove();
			}
			
			_.$el.trigger(prefix+'closeLightBoxVideoEventForEmbedTrigger', [_, $videoActive]);
			
			if(typeof(_.global_video_lightbox_items[idActive])==='undefined'){
				return false;
			}
								
			var $player = _.global_video_lightbox_items[idActive][0],
				network = _.global_video_lightbox_items[idActive][1],
				adsContainerID = $videoActive.find('.ima-adContainer-control').attr('id');
			
			_.player_actions($player, network, 'pause');
							
			if(typeof(adsContainerID)!=='undefined' && typeof(_.is_ad_google_ima_control[adsContainerID])!=='undefined' && typeof(_.is_ad_google_ima_stated_event[adsContainerID])==='boolean' && _.is_ad_google_ima_stated_event[adsContainerID] === true){
				try{
					_.is_ad_google_ima_control[adsContainerID].pause();
				}catch (imaError) {
				}
			}		
			
			return false;
		});			
	}
	
	vidorev_theme.prototype.add_scroll_bar_for_playlist = function(){
		var _ = this;
		
		if(_.global_scroll_bar_lib === 'malihu'){

			_.$el.find('.video-playlist-listing-control').mCustomScrollbar({
				alwaysShowScrollbar:1,
				scrollInertia: 200,
			});

		}else if(_.global_scroll_bar_lib === 'overlay'){
			
			_.$el.find('.video-playlist-listing-control').overlayScrollbars({
				scrollbars:{
					/*autoHide:'move',*/
				}
			});
		}
	}
	
	vidorev_theme.prototype.watch_later = function(){
		var _ 			= this,
			cookie_name = 'vpwatchlatervideos';
		
		var cookie_action = function($t, action){
			
			var id = $t.attr('data-id');
			
			if(!_.isNumber(id)){
				return false;
			}
			
			id = parseFloat(id);			
			
			if(typeof(Cookies.get(cookie_name))!=='undefined'){
				var current_video_ids = $.trim(Cookies.get(cookie_name));
				var new_current_video_ids = [];
				
				$.each(current_video_ids.split(','), function(i, value){
					var new_val = $.trim(value);
					if(_.isNumber(new_val)){
						new_current_video_ids[i] = parseFloat(new_val);
					}
				});
				
				var index = new_current_video_ids.indexOf(id);
				
				if(action === 'remove'){
					
					if(index !== -1){
						new_current_video_ids.splice(index, 1);
						var new_cookie = new_current_video_ids.join();
						Cookies.set(cookie_name, new_cookie, { expires: 368 });
						
						if(new_cookie===''){
							_.$el.find('.hasVideos-control').removeClass('hasVideos');
						}
					}					
					$t.removeClass('active-item');
					
					var $parent = $t.parents('.watch-later-archive-control');
					if($parent.length > 0){
						$('article[id="post-'+(id)+'"]', $parent).hide('fast', function(){ 
							$(this).remove()
						});
					}
					
					var $top_parent = _.$el.find('.top-watch-later-control');
					$('.video-listing-item[id="post-'+(id)+'-wl"]', $top_parent).hide('fast', function(){ 
						$(this).remove();
						if($top_parent.find('.video-listing-item-control').length === 0){
							$top_parent.addClass('no-video');
							_.$el.find('.hasVideos-control').removeClass('hasVideos');
						}
					});
					
				}else if(action === 'add'){
					
					if(index === -1){
						new_current_video_ids.push(id);
						var new_cookie = new_current_video_ids.join();
						Cookies.set(cookie_name, new_cookie, { expires: 368 });
						add_item_to_top($t);
					}
					
				}
			}else{
				if(action === 'add'){
					Cookies.set(cookie_name, id, { expires: 368 });
					add_item_to_top($t);
				}
			}
			
			if(action === 'add'){
				_.$el.find('.hasVideos-control').addClass('hasVideos');	
				$t.addClass('active-item');
			}		
			
		}
		
		var add_item_to_top = function($t){
			var id = $t.attr('data-id');
			
			if(!_.isNumber(id)){
				return false;
			}
			
			id = parseFloat(id);
			
			var title = $t.attr('data-title'),
				hyperlink = $t.attr('data-hyperlink'),
				img = $t.attr('data-img-src'),
				$container = _.$el.find('.top-watch-later-control');
			
			var $img = '';	
			
			if(typeof(img)!=='undefined' && img !=''){
				$img = '<img class="blog-picture" src="'+(img)+'">';	
			}
			
			$container.prepend('<div class="video-listing-item video-listing-item-control" id="post-'+(id)+'-wl">\
								<div class="video-img">'+($img)+'</div>\
								<div class="video-content">\
									<h3 class="h6 post-title">\
										<a href="'+(hyperlink)+'" title="'+(title)+'">'+(title)+'</a>\
									</h3>\
								</div>\
								<div class="remove-item-watch-later remove-item-watch-later-control" data-id="'+(id)+'"><i class="fa fa-times" aria-hidden="true"></i></div>\
							</div>')
			.removeClass('no-video');	
		}
			
		_.$el.off('.addWatchLater').on('click.addWatchLater', '.watch-later-control', function(e){
			var $t = $(this);				
			
			if($t.hasClass('active-item')){
				cookie_action($t, 'remove');
			}else{
				cookie_action($t, 'add');
			}
		});
		
		_.$el.off('.removeWatchLater').on('click.removeWatchLater', '.remove-item-watch-later-control', function(e){
			var $t = $(this),
				id = $t.attr('data-id');
				
			cookie_action($t, 'remove', id);
			
			var $parent = $t.parents('.top-watch-later-control');
			
			$('.video-listing-item[id="post-'+(id)+'-wl"]', $parent).hide('fast', function(){ 
				$(this).remove();
				if($parent.find('.video-listing-item-control').length === 0){
					$parent.addClass('no-video');
					_.$el.find('.hasVideos-control').removeClass('hasVideos');
				}
			});
			
			var $pageWatch = _.$el.find('.watch-later-archive-control');			
			if($pageWatch.length > 0){
				$('article[id="post-'+(id)+'"]', $pageWatch).hide('fast', function(){ 
					$(this).remove()
				});
			}
						
			_.$el.find('.watch-later-control[data-id="'+(id)+'"]').removeClass('active-item');
		});
	}
	
	vidorev_theme.prototype.archive_sort_button = function(){
		var _ = this;	
		
		_.$el.off('.archiveSortBtn').on('click.archiveSortBtn', '.sort-block-control', function(e){
			var $t = $(this);
			$t.toggleClass('active-item');
		});	
	}
	
	vidorev_theme.prototype.download_lightbox = function(){
		var _ = this;	
		
		_.$el.off('.downloadFilesLightbox').on('click.downloadFilesLightbox', '.download-files-control', function(e){
			var $t = $(this);
			_.$el.toggleClass('active-download');
			return false;
		});	
	}
	
	vidorev_theme.prototype.video_repeat = function(){
		var _ = this;	
		
		_.$el.off('.videoPlayerRepeat').on('click.videoPlayerRepeat', '.repeat-video-control', function(e){
			var $t = $(this);
			$t.toggleClass('active-item');
		});	
	}
	
	vidorev_theme.prototype.video_repeat_action = function(obj){
		var _ = this;
		var $player					= obj.player,
			$partyElm 				= obj.partyElm,
			player_id 				= obj.player_id,
			single_video_network 	= obj.single_video_network,
			timeOutfnc				= null;
			
		_.$el.on(prefix+'closeLightBoxVideoEventTrigger', function(){
			if(timeOutfnc!=null){
				clearTimeout(timeOutfnc);
			}
		});
		
		timeOutfnc = setTimeout(function(){
			_.player_actions($player, single_video_network, 'seek', 0);
			_.player_actions($player, single_video_network, 'play');
		}, 368);
		
	}
	
	vidorev_theme.prototype.scroll_control = function(){
		var _ = this;	
		
		_.$el.off('.scrollControlAction').on('click.scrollControlAction', '.scroll-elm-control', function(e){
			var $t = $(this),
				elm = $t.attr('href');
			
			if(typeof(elm)==='undefined' || elm==''){
				elm = $t.attr('data-href');
			}	
				
			if($(elm).length > 0){
				$('html, body').stop().animate({scrollTop:($(elm).offset().top-$('#wpadminbar').height()-40)}, {duration:500}, function(){});
				return false;
			}	
		});	
	}
	
	vidorev_theme.prototype.sticky_sidebar = function(){
		var _ = this;	
		
		if(!_.sticky_sidebar_on){
			return;
		}
		
		var scroll_down_fix = 0;
		
		if(_.$el.hasClass('sticky-menu-on') && !_.$el.hasClass('sticky-behavior-up')){
			scroll_down_fix = $('.sticky-menu-control').outerHeight();			
		}
		
		var offsetTop = $('#wpadminbar').outerHeight() + 30 + scroll_down_fix,
			opts = {
				additionalMarginTop: offsetTop,
				additionalMarginBottom:30,
				disableOnResponsiveLayouts:false,				
			}
			
		if(_.$el.hasClass('sticky-menu-on sticky-behavior-up')){
			opts.stickyUpMenuHeight = $('.sticky-menu-control').outerHeight();
		}	
		
		if($('.sidebar-content-control').length>0){		
			$('.sidebar-content-control').theiaStickySidebar(opts);
		}
		
		$('.elementor-widget-sidebar[data-element_type="sidebar.default"], .elementor-widget-sidebar[data-widget_type="sidebar.default"]', _.$el).each(function(index, element){
			var $t 							= $(this),
				sticky_sidebar_class 		= 'sticky-sidebar-'+index+'rnd'+(Math.floor((Math.random() * 999) + 1)),
				$row_parents				= $t.parents('.elementor-row');
				
				if(typeof(vidorev_jav_js_object)!=='undefined' && typeof(vidorev_jav_js_object.elementor_version)!=='undefined' && vidorev_jav_js_object.elementor_version==='ver-3x'){
					$row_parents				= $t.parents('.elementor-container');
				}				
						
			if($row_parents.find('.elementor-element.elementor-inner-column[data-element_type="column"]').length > 1 || $row_parents.find('.elementor-element.elementor-top-column[data-element_type="column"]').length > 1){
				$t.addClass(sticky_sidebar_class);			
				$('.'+(sticky_sidebar_class)).theiaStickySidebar(opts);
			}
		});	
	}
	
	vidorev_theme.prototype.popular_slider = function(){
		var _ = this;
		
		_.$el.find('.slider-popular-control').each(function(index, element){
			var $t 		= $(this);
			var options = {
				arrows:true,
				dots: false,
				infinite: true,
				speed: 500,
				slidesToShow: 2,
				slidesToScroll: 1,
				adaptiveHeight: true,
				focusOnSelect: false,
				prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				responsive: [					
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 	1,
								slidesToScroll: 1,								
							}
						},								
				]
			}
			
			if(_.$el.hasClass('fullwidth-mode-enable')){
				options['slidesToShow'] = 4;
				options['responsive'] = [
					{
						breakpoint: 2000,
						settings: {
							slidesToShow: 	3,								
						}
					},
					{
						breakpoint: 1580,
						settings: {
							slidesToShow: 	2,								
						}
					},				
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 	1,
							slidesToScroll: 1,								
						}
					},								
				];
			}
			
			$t.on('init', function(event, slick){
				
			});
			
			$t.find('img.ul-normal-effect').addClass('img-effect-setup img-loaded');
			$t.slick(options);
		});
	}
	
	vidorev_theme.prototype.amazon_product_link_action = function(){
		var _ = this;
		_.$el.off('.amazonProductLink').on('click.amazonProductLink', '.amazon-action-control', function(e){
			var $t 		= $(this),
				$parent = $t.parents('.amazon-product-link-control');
			
			var sub_class = '';
			
			if(window.innerWidth < 768){
				sub_class = ' active-mobile';
			}else{
				sub_class = '';
			}
			
			if($t.attr('data-action') === 'open'){
				$parent.addClass('active-item'+(sub_class));
			}else{
				$parent.removeClass('active-item active-mobile');
			}	
			
		});	
	}	
	
	vidorev_theme.prototype.side_menu = function(){
		var _ = this;
		
		_.$el.off('.closeSideMenu').on('click.closeSideMenu', '.button-menu-side-control', function(e){
			var $t = $(this);
			if(_.$el.hasClass('close-side-menu') || $('.side-menu-wrapper-control').css('display')==='none'){
				_.$el.removeClass('close-side-menu').addClass('open-side-menu');
				Cookies.set('vidorevsidemenustatus', 'open', { expires: 368 });
			}else{
				_.$el.removeClass('open-side-menu').addClass('close-side-menu');
				Cookies.set('vidorevsidemenustatus', 'close', { expires: 368 });
			}
		
			_.$el.trigger(prefix+'side_menu_action', [_]);
		});
		
		if(_.global_scroll_bar_lib === 'malihu'){

			_.$el.find('.side-menu-children-control').mCustomScrollbar({
				theme: 'minimal',
				alwaysShowScrollbar:0,
				scrollInertia: 200,
			});

		}else if(_.global_scroll_bar_lib === 'overlay'){
			
			_.$el.find('.side-menu-children-control').overlayScrollbars({
				scrollbars:{
					autoHide:'move',
				}
			});
		}
		
		_.$el.find('.main-side-menu > ul > li.menu-item-has-children').each(function(index, element) {
			var $t = $(this),
				btn_control_class = 'open-submenu-'+(index);
			$t.append('<span class="open-submenu-mobile '+(btn_control_class)+'"><i class="fa fa-angle-right" aria-hidden="true"></i></span>').find('.'+(btn_control_class)).on('click', function(){
				$t.toggleClass('active-sub-menu').children('ul').slideToggle({duration:368});
			});
		});
	}
	
	vidorev_theme.prototype.sv_showmore_content = function(){
		var _ = this;
		_.$el.off('.showmoreButtonBontrol').on('click.showmoreButtonControl', '.showmore_button_control', function(e){
			var $t = $(this);
			$t.toggleClass('show-more-content');
			_.$el.toggleClass('show-more-content');
			
			if(!_.$el.hasClass('show-more-content')){				
				$('html, body').animate({scrollTop:$('.hidden-content-control').offset().top-150}, {duration:500, complete: function(){}});			
			}
		});
	}
	
	vidorev_theme.prototype.requestScript = function(url, callback) {
		var _ = this;

        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
			
		head.appendChild(script);	
			
        script.onreadystatechange = callback;
        script.onload = callback;
		script.onerror = callback;
		
    }
	
	vidorev_theme.prototype.single_video_clean_action = function(){
		var _ = this;	
		
		_.$el.off('.videoCleanStyle').on('click.videoCleanStyle', '.show-hide-toolbar-control', function(e){
			var $t = $(this);
			_.$el.toggleClass('single-video-clean-style');
		});	
	}
	
	vidorev_theme.prototype.single_video_time_lapses = function($player, single_video_network, player_id, $poster_preload){
		var _ = this;	
		var $wrap_time_lapses_ct = $('#'+(player_id)).parents('.vidorev-custom-embed-control');
		
		if(player_id != 'player-api-control' && $wrap_time_lapses_ct.length === 0){			
			return;
		}
		
		if($wrap_time_lapses_ct.length > 0){
			$wrap_time_lapses_ct.find('.time_lapses_control').attr({'data-vid-id':player_id});
		}else{
			_.$el.find('.time_lapses_control').attr({'data-vid-id':player_id});
		}
		
		_.$el.on('click.timeLapsesControl', '.time_lapses_control[data-vid-id="'+(player_id)+'"]', function(e){
			
			var $t = $(this);
			
			var time = $.trim($t.attr('data-time'));
			
			if(typeof(time)!=='undefined' && time!=''){
				var time =  time.split(':');
				var time_length = time.length;
				
				var hours = 0;
				var mins = 0;
				var secs = 0;
				
				var seek_time = 0;
				
				switch(time_length){
					case 3:
						
						hours = $.trim(time[0]);
						mins = $.trim(time[1]);
						secs = $.trim(time[2]);
						
						if(_.isNumber(hours) && _.isNumber(mins) && _.isNumber(secs)){
							seek_time = parseFloat(hours) * 3600 + parseFloat(mins) * 60 + parseFloat(secs);
						}						
						
						break;
						
					case 2:
						
						mins = $.trim(time[0]);
						secs = $.trim(time[1]);
						
						if(_.isNumber(mins) && _.isNumber(secs)){
							seek_time = parseFloat(mins) * 60 + parseFloat(secs);
						}
					
						break;
						
					case 1:
					
						secs = $.trim(time[0]);
						
						if(_.isNumber(secs)){
							seek_time = parseFloat(secs);
						}
						
						break;		
				}
				
				if(seek_time==0){
					seek_time=0.01;
				}
				
				if(seek_time > 0){
					
					_.$el.trigger( prefix+'videoBeforeTimeLapsesClick', [$player]);
					
					if($poster_preload.hasClass('active-item')){
						_.player_actions($player, single_video_network, 'seek', seek_time);
						$poster_preload.trigger('click');						
					}else{						
						_.player_actions($player, single_video_network, 'seek', seek_time);
						_.player_actions($player, single_video_network, 'play');
						$poster_preload.removeClass('active-item');
					}					
					
					_.$el.trigger( prefix+'videoAfterTimeLapsesClick', [$player]);
					
					if($wrap_time_lapses_ct.length > 0){
						$('html, body').stop().animate({scrollTop:$('#'+(player_id)).parents('.vidorev-custom-embed-control').offset().top-90}, {duration:500}, function(){});
					}else{
						$('html, body').stop().animate({scrollTop:$('#'+(player_id)).parents('#video-player-wrap-control').offset().top-90}, {duration:500}, function(){});
					}
				}
			}
			
			return false;
		});
	}
		
	/*destroy [Core]*/
	vidorev_theme.prototype.destroy = function(){
		var _ = this;		
	}/*destroy [Core]*/
	
	/*jquery [Core]*/
	$.fn.J_vidorev_theme = function(){
		var _ 		= this,
			opt 	= arguments[0],
			args 	= Array.prototype.slice.call(arguments, 1),
			l 		= _.length,
			i,
			ret;
		for(i = 0; i < l; i++) {
			if(typeof opt == 'object' || typeof opt == 'undefined'){
				_[i].J_vidorev_theme = new vidorev_theme(_[i], opt);
			}else{
				ret = _[i].J_vidorev_theme[opt].apply(_[i].J_vidorev_theme, args);
			}
			if (typeof ret != 'undefined'){				
				return ret;
			}
		}
		return _;
	}/*jquery [Core]*/
	
	/*ready [Core]*/
	$(document).ready(function(){
		var $b = $( 'body' ),
			options = { };
			
		$b.on(prefix+'init', function(e, fnc){
			console.log('VidoRev: library is installed, version 2.9.9.9.9.8');
			window.get_vidorev_build_fnc = fnc;
			$b.trigger('get_vidorev_build_fnc', []);
		});
			
		$b.J_vidorev_theme( options );		
	});/*ready [Core]*/
			
}));