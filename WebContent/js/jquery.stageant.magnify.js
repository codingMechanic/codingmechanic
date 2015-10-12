(function ($) {

	$.fn.magnify = function(entries) {
		
		entries = $.extend({ scaleFactor: 2, vertical:'center', horizontal:'center', easing:'swing', durationIn:'normal', durationOut:'normal', callbackIn:null, callbackOut:null, fadeSiblings:false }, entries||{});
		//weise den Ausgangswerten der Bildmaße und -position Variablen zu
		var originalWidth = this.width();
		var originalHeight = this.height();
		var originalPos = this.position();
		var originalTop = originalPos.top;
		var originalLeft = originalPos.left;
		
		//berechne die Zielwerte der Bildmaße und weise ihnen Variablen zu
		var newWidth = (originalWidth*entries.scaleFactor);
		var newHeight = (originalHeight*entries.scaleFactor);
		
		//unterscheide horizontale und vertikale Verschiebungen anhand der in 'entries' übergebenen Argumente
		var newTop= originalTop-originalHeight/2*(entries.scaleFactor-1);
		
		switch(entries.vertical) {
		  /*case 'center':
			newTop = originalTop-originalHeight/2*(entries.scaleFactor-1);
			break;*/
		  case 'top':
			newTop = originalTop;
			break;
		  case 'bottom':
			newTop = originalTop-originalHeight*(entries.scaleFactor-1);
			break;
		  default:
			newTop = originalTop-originalHeight/2*(entries.scaleFactor-1);
		}
		
		var newLeft= originalLeft-originalWidth/2*(entries.scaleFactor-1);
	  
		switch(entries.horizontal) {
		  /*case 'center':
			newLeft = originalLeft-originalWidth/2*(entries.scaleFactor-1);
			break;*/
		  case 'left':
			newLeft = originalLeft;
			break;
		  case 'right':
			newLeft = originalLeft-originalWidth*(entries.scaleFactor-1);
			break;
		  default:
			newLeft = originalLeft-originalWidth/2*(entries.scaleFactor-1);
		}
		
		//unterscheide Easing anhand der in 'entries' übergebenen Argumente
		var easeIn='jswing';
		
		switch(entries.easing) {
		case 'bounce':
		  easeIn = 'easeOutBounce';
		  break;
		case 'elastic':
		  easeIn = 'easeOutElastic';
		  break;
		case 'sine':
		  easeIn = 'easeOutSine';
		  break;
		case 'expo':
		  easeIn = 'easeOutExpo';
		  break;
		case 'lin':
		  easeIn = 'linear';
		  break;
		default:
		  easeIn = 'jswing';
		}
		
		//unterscheide Easing anhand der in 'entries' übergebenen Argumente
		var easeOut='jswing';
		
		switch(entries.easing) {
		case 'bounce':
		  easeOut = 'easeOutBounce';
		  break;
		case 'elastic':
		  easeOut = 'easeOutElastic';
		  break;
		case 'sine':
		  easeOut = 'easeOutSine';
		  break;
		case 'expo':
		  easeOut = 'easeOutExpo';
		  break;
		case 'lin':
		  easeOut = 'linear';
		  break;
		default:
		  easeOut = 'jswing';
		}
		
		//unterscheide Hin-Animationsdauer anhand der in 'entries' übergebenen Argumente
		var duraIn= 'normal';
		
		/*switch(entries.durationIn) {
		case 'normal':
		  duraIn = 'normal';
		  break;
		case 'slow':
		  duraIn = 'slow';
		  break;
		case 'fast':
		  duraIn = 'fast';
		  break;
		default:
		  duraIn = 'normal';
		}*/
		
		//unterscheide Rück-Animationsdauer anhand der in 'entries' übergebenen Argumente
		var duraOut= 'normal';
		
		/*switch(entries.durationOut) {
		case 'normal':
		  duraOut = 'normal';
		  break;
		case 'slow':
		  duraOut = 'slow';
		  break;
		case 'fast':
		  duraOut = 'fast';
		  break;
		default:
		  duraOut = 'normal';
		}*/

	//Animationsfunktionen
		//vergrößere und verkleinere das Objekt im Fokus
		var zoomIn= function () {$(this).animate({ width: newWidth, height: newHeight, left: newLeft, top: newTop },{duration: duraIn, queue:false, easing: easeIn, complete:entries.callbackIn })};
		//var zoomIn= function () {$(this).animate({ width: newWidth, height: newHeight, left: 100, top: 100 },{duration: duraIn, queue:false, easing: easeIn, complete:entries.callbackIn })};

		var zoomOut= function () {$(this).animate({ width: originalWidth, height: originalHeight, left: originalLeft, top: originalTop },{duration: duraOut, queue:false, easing: easeOut, complete:entries.callbackOut })};
		//blende die übrigen Objekte, sowie das scharfe Hintergrungbild aus/ ein
		var fadeOutSharpBgAndOthers= function () { $('.sibling').not($(this)).add('#flugzeugeBgSharp').animate({ opacity:0 },{duration: duraIn, queue:false}) };
		var fadeInSharpBgAndOthers= function () { $('.sibling').not($(this)).add('#flugzeugeBgSharp').animate({ opacity:1 },{duration: duraOut, queue:false}) };
		//blende das unscharfe Hintergrundbild und den Beschreibungstext ein/ aus
		var fadeInBlurBgAndText= function () { $(this).next('.flgzgBeschreibung').add('#flugzeugeBgBlur').animate({ opacity:1 },{duration: duraIn, queue:false}) };
		var fadeOutBlurBgAndText= function () { $(this).next('.flgzgBeschreibung').add('#flugzeugeBgBlur').animate({ opacity:0 },{duration: duraOut, queue:false}) };
		var zIndexUp= function () {$(this).css("z-index",100)};
		var zIndexDown= function () {$(this).css("z-index",10)};
	//Wrapper-Methode: definiere die Listener für die Hover-Events mouseover u. mouseout (mit vorangehendem 'return', um das ursprüngliche wrapped set zurückzugeben u. so das chaining zu ermöglichen)	
	if(entries.fadeSiblings==true)
		return this.mouseover(zoomIn).mouseover(fadeOutSharpBgAndOthers).mouseover(fadeInBlurBgAndText).mouseout(zoomOut).mouseout(fadeInSharpBgAndOthers).mouseout(fadeOutBlurBgAndText);
	else
		return this.mouseover(zoomIn).mouseover(zIndexUp).mouseout(zoomOut).mouseout(zIndexDown);
	}

})(jQuery);