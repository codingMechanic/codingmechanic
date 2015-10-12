(function($) {
	
  $.fn.goggleBox = function(entries) {
	
	/*var ieVersion = null;
	if ( $.browser.msie ) {
	  ieVersion = $.browser.version;
	} */
	  
	var items = $.extend({
	  largeImage:'img#screen',
	  swapSrc: function(name) {
		return name.replace(/thumbnail/,'photo');
	  },
	  toFirstImage:null,
	  toPreviousImage:null,
	  toNextImage:null,
	  toLastImage:null,
	  runSlideShow:null,
	  thumbnailsDisplay:true,
	  autoStart:false,
	  cycleTime:5000
	},entries||{});
	
	items.presentIndex = 0;
	
	items.pictograms$ = this.filter('img');
	
	if(!items.thumbnailsDisplay)
		$('#thumbnails').hide();
	if(items.autoStart)
		run();
		
	function showImage(index) {
	  $(items.largeImage)
		.attr('src',items.swapSrc(items.pictograms$[index].src));
	  items.presentIndex=index;
	  animateOverlays(document.getElementById('screen'));
	}

	function run() { 
	  items.cycle = window.setInterval( 
		  function () { 
			  showImage((items.presentIndex+1) % items.pictograms$.length);
		  },
		  items.cycleTime);
	  $(items.toNextImage).click();
	}

	function halt() { 
		window.clearInterval(items.cycle);
	}
	  
	items.pictograms$
	  .each( function(i) { 
		$(this).data('imageIndex',i); 
	  })
	  .click( function() { 
		showImage($(this).data('imageIndex')); 
	  });
	
	$(items.largeImage)
	  .css('cursor','pointer')
	  .click( function() {
		showImage((items.presentIndex+1) % items.pictograms$.length); 
	  });
	
  //implementiere die Tasten-Funktionen des Players
	
	$(items.toFirstImage)
	  .click(function() {
		showImage(0);
	  });
	  
	$(items.toPreviousImage)
	  .click(function() {
		showImage((items.presentIndex-1+items.pictograms$.length) % items.pictograms$.length);
	  });
	  
	$(items.toNextImage)
	  .click(function() {
		showImage((items.presentIndex+1) % items.pictograms$.length);
	  });
	  
	$(items.toLastImage)
	  .click(function() {
		showImage(items.pictograms$.length-1);
	  });
	  
	$(items.runSlideShow)
	  .toggle( run, halt);
		
	  showImage(0);
	  
	  return this;
  };
  
  function animateOverlays(image){

	  var canvas = document.createElement('canvas'),
	  	//Anzahl der Schritte
	  	yTravelPitch = 7,
	    //Zähler der Frames
	    counter = -5,
	    //Breite der Grenzschicht (horizontal bei schräger Trennlinie, vertikal bei horizontaler Trennlinie)
	    fringeWidth = 200,
	    //Auflösung des Transparenzverlaufs innerhalb der Grenzschicht
	    alphaStep = 255/fringeWidth;
      
      canvas.setAttribute('id','blackNWhite');
      canvasContext = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      
      //bestimmt bei 45° schräger Trennlinie, wieviele Schritte nötig sind, um das ganze Bild zu durchlaufen
      var counterMultiplier = 2*(canvas.width/canvas.height);

      canvasContext.drawImage(image,0,0);

      var imageData = canvasContext.getImageData(0,0,canvas.width,canvas.height),
      		data = imageData.data;
      
      for(var i = 0; i<data.length; i++) {
    	  
    		var average = data[i] * .3 + data[i+1] * .59 + data[i+2] * .11;  //.3 .59 .11 , .33 .65 .12
            
            //rgb-Kanäle
            data[i] = average;
            data[++i] = average;
            data[++i] = average;
            ++i;
      }
      
      canvasContext.putImageData(imageData,0,0,0,0,imageData.width,imageData.height);
      image.parentNode.insertBefore(canvas,image);

      	$('#blackNWhite').fadeTo(0, 0);
      	$('#blackNWhite').fadeTo(500, 1,
      		function() {
          		$('#screen').fadeTo(0,1);
      			$('#blackNWhite').fadeTo(1000,0, function(){$('#blackNWhite').remove();});
      			setTimeout ( function() {
      					$('#screen').fadeTo(1000,0);
      				},2000);
      	   
//Wisch-Animation von s/w nach farbig
//        	$('#screen').fadeTo(0,1);
//        	setTimeout (function frame() {
//  	      	for(var i = 3; i<data.length; i+=4) {
//  	      		
//  	      		progress = counter * image.height/yTravelPitch;
//  	              
//  	              //Zeile in der sich der Bildpunkt befindet
//  	              var line = Math.floor((i/4)/canvas.width);
//  	              //Spalte in der sich der Bildpunkt befindet
//  	              var column = (i/4)-line*canvas.width,
//  	              		bordercol = progress-line;
//  	              
//  	              if(column < bordercol)
//  	            	  data[i] = 0;
//  	              else if(column >= bordercol && column < bordercol+fringeWidth) {
//  		            	data[i-1] = 245;
//  		              	data[i-2] = 245;
//  		              	data[i-3] = 245;
//  		              	data[i] = (column-bordercol)*alphaStep;
//  		              	}
//  	              else
//  	            	  data[i] = 255;
//
////  	            //für horizontale Trennlinie
////  	              var line = (i/4)/canvas.width;
////  	              
////  	              if(line < progress)
////  	              	data[i] = 0;
////  	              else if(line >= progress && line < progress+50) {
////  	            	data[i-1] *= 3;
////  	              	data[i-2] *= 3;
////  	              	data[i-3] *= 3;
////  	              	data[i] = (line-progress)*alphaStep;}
////  	              else
////  	              	data[i] = 255;
//  	              
//  	          }
//  	      	
//  	        canvasContext.putImageData(imageData,0,0,0,0,imageData.width,imageData.height);
//  		      
//  		      if(counter > yTravelPitch*counterMultiplier) {
//  		    	$('#blackNWhite').remove();
//  			    	$('#screen').fadeTo(3400,0);
//  			      	return;
//  		      }
//  		      counter++;
//  		      
//  		      setTimeout(frame, 20);
//  	      },20);
      		
      });
};
  
})(jQuery);