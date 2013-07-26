/*
jQuery loopSlidr Plugin
version: 1.0
Author: KLUTCHE
*/

(function($){
	
	$.fn.loopSlidr = function(options) {
		
		//オプション
		var settings = $.extend( {
			'speed': 15 //速さ
		}, options);
		
		//開始時のフェードインとプリロード
		var opening = function(obj){
			var d = new $.Deferred;
			var ul = obj.find('ul');
			var li = ul.find('li');
			
			//CSS
			obj.css({
				position: "relative",
				overflow: "hidden"
			});
			ul.css({
				position: "relative",
				overflow: "hidden"
			});
			li.css({
				display: "block",
				float: "left"
			});
			
			//li幅の合計を取得
			i = 0;
			li.each(function(){
				i = i + parseInt($(this).innerWidth());
			});
		
			ul.css({
				width: i*2
			});
			
			//liをコピー
			li.each(function(){
				$(this).clone().appendTo(ul);
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