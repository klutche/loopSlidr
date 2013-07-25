/*
jQuery roopSlidr Plugin
version: 1.0
Author: KLUTCHE
*/

(function($){
	
	$.fn.roopSlidr = function(options) {
		
		//オプション
		var settings = $.extend( {
			'speed': 10, //速さ
		}, options);
		
		//開始時のフェードインとプリロード
		var opening = function(obj){
			var d = new $.Deferred;
			var ul = obj.find('ul');
			var li = obj.find('li');
			
			//li幅の合計を取得
			width = 0;
			li.each(function(){
				width = width + parseInt($(this).innerWidth());
			});
		
			//CSS
			obj.css({
				overflow: 'hidden'
			});
			
			ul.css({
				position: 'relative',
				width: width*2 + 'px',
				overflow: 'hidden',
				clear: 'both'
			}).children('li').css({
				float: 'left'
			});
			
			//フェードイン
			li.hide().each(function(){
				$(this).fadeIn('slow', function(){
					$(this).clone().appendTo(ul);
				});
			});
			
			d.resolve();
			return d.promise();
		}
		
		//アニメーション処理
		var slide = function(obj){
			var d = new $.Deferred;
			var ul = obj.children('ul');
			
			var anim = function(){
				ul.animate({
					left: '-' + ul.width()/2 + 'px'
				}, ul.width()/2*settings.speed, 'linear', function(){
					ul.css('left', 0);
					anim();
				});
			}
			anim();
			
			return d.promise();
		}
		
		//実行
		return this.each(function() {
			opening($(this)).then(slide($(this)));
		});
	
	};
})(jQuery);