/*
*@ 兼容IE8以下html5输入框文字预显属性placeholder(pc)
*@ 基于jquery
*@ 原理：在input上方生成一个定位的层仿制预显层
*@ 调用案例：$('#testinput').IEplaceholder();
*/
(function($){
	var isInputSupported = 'placeholder' in document.createElement('input'),
	    isTextareaSupported = 'placeholder' in document.createElement('textarea');
	$.fn.IEplaceholder = function(opts){
		if(!isInputSupported && !isTextareaSupported){
			this.each(function(){
				var input = $(this),
					parent = input.parent(),
					word = input.attr('placeholder') || '预显文字';
				if(!/relative|absolute/.test(parent.css('position'))){
					parent.css('position', 'relative');
				}
				parent.append('<span class="IEplaceholder">'+ word +'</span>');
				var label = parent.find('.IEplaceholder');
				var _w = (+input.css('padding-left').replace('px','')) + (+input.css('border-left-width').replace('px','')) + 2;
				label.css({
					'display': !!input.val() ? 'none' : 'block',
					'position': 'absolute',
					'left': 0,
					'top': 0,
					'z-index': 9,
					'color': '#999',
					'cursor': 'text',
					'margin': 0,
					'padding': 0,
					'width': input.outerWidth(true) - _w,
					'height': input.outerHeight(true),
					'line-height': input[0].tagName == 'TEXTAREA' ? Number(input.css('line-height').replace('px','')) + Number(input.css('padding-top').replace('px',''))*2 + 'px' : input.outerHeight(true) + 'px',
					'text-indent': _w
				});
				label.on('click.placeholder', function(){
					input.trigger('focus', ['placeholder']);
				});
				input.on('propertychange.placeholder focus.placeholder blur.placeholder', function(){
					label.css({'display': !!input.val() ? 'none' : 'block'});
				});
			});
		}
		return this;
	};
})(jQuery);