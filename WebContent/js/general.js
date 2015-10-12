(function() {

		var this$, tabHeight = $('.tab').height(), yTravel = tabHeight / 2, boxStartPos, boxYPos, bgXPos, counterBoxStartPos, counterBoxYPos, counterBoxheight;

		//central timer control
		var ctc = {

			timerID : 0,
			timers : [],

			add : function(fn) {
				this.timers.push(fn);
			},

			start : function runNext() {
				if (this.timerID)
					return;
				(function() {
					if (ctc.timers.length > 0) {
						for ( var i = 0; i < ctc.timers.length; i++) {
							if (ctc.timers[i].call(this$) === false) {
								ctc.timers.splice(i, 1);
								i--;
								//wenn ctc abgearbeitet, schicke Event ab, mit dem neue toggleTab-Fkt ausgelöst wird
								if (!ctc.timers.length)
									$('body .trial').trigger('animationDone');
							}
						}
						ctc.timerID = setTimeout(runNext, 40);
					}
				})();
			},

			stop : function() {
				clearTimeout(this.timerID);
				this.timerID = 0;
			}

		};

		//Animations-Fkten zur Ausfuehrung in der central timer control
		function openTab() {
			boxYPos += 4;
			$(this).css('top', boxYPos + 'px');
			$(this).css('background-position', bgXPos + " -" + boxYPos + "px");
			if (boxYPos >= boxStartPos + yTravel)
				return false;
		}
		function showTabContent() {
			counterBoxYPos -= 4;
			counterBoxheight += tabHeight * 4 / yTravel;
			$(this).prev('.counterBox').css('top', counterBoxYPos + 'px').height(counterBoxheight + 'px');
			if (counterBoxYPos <= counterBoxStartPos - yTravel) {
				$(this).prevAll('.tab').eq(0).removeClass('changing');
				return false;
			}
		}
		function closeTab() {
			boxYPos -= 4;
			$(this).css('top', boxYPos + 'px');
			$(this).css('top', boxYPos + 'px');
			$(this).css('backgroundPosition', bgXPos + " -" + boxYPos + "px");
			if (boxYPos <= boxStartPos - yTravel)
				return false;
		}
		function hideTabContent() {
			counterBoxYPos += 4;
			counterBoxheight -= tabHeight * 4 / yTravel;
			$(this).prevAll('.counterBox').eq(0).css('top', counterBoxYPos + 'px').height(counterBoxheight + 'px');
			if (counterBoxYPos >= counterBoxStartPos + yTravel) {
				$(this).prevAll('.tab').eq(0).removeClass('changing');
				return false;
			}
		}

		$('body').on('click', '.shut:not(.changing, .terminal)', toggleTabs);

		$('body').on('click', '.open:not(.changing, .terminal)', shutTab);

		$('body').on('animationDone', '.trial', toggleTabs);

		function toggleTabs() {

			ctc.stop();

			if ($('.tab.open').length) {

				$(this).addClass('trial');

				this$ = $('.tab.open').nextAll('.tab').eq(0);

				boxStartPos = parseInt(this$.css('top'));
				boxYPos = boxStartPos;
				//Object-Detection für Bg-Position
				if(typeof($(this).css('background-position')) != 'undefined')
					bgXPos = $(this).css('background-position').split(" ");
				else
					bgXPos = $(this).css('background-position-x');
				bgXPos = bgXPos[0];
				ctc.add(closeTab);

				counterBoxStartPos = boxStartPos - 2 * yTravel;
				counterBoxYPos = counterBoxStartPos;
				counterBoxheight = parseInt(this$.prev('.counterBox').css('height'));
				ctc.add(hideTabContent);

				this$.prevAll('.tab').eq(0).addClass('changing');
				ctc.start();
				this$.prevAll('.tab').addClass('shut').removeClass('open');

			} else {

				this$ = $(this).nextAll('.tab').eq(0);

				boxStartPos = parseInt(this$.css('top'));
				boxYPos = boxStartPos;
				if(typeof($(this).css('background-position')) != 'undefined')
					bgXPos = $(this).css('background-position').split(" ");
				else
					bgXPos = $(this).css('background-position-x');
				bgXPos = bgXPos[0];
				ctc.add(openTab);

				counterBoxStartPos = boxStartPos;
				counterBoxYPos = counterBoxStartPos;
				counterBoxheight = parseInt(this$.prev('.counterBox').css('height'));
				ctc.add(showTabContent);

				$(this).addClass('changing');
				ctc.start();
				$(this).addClass('open').removeClass('shut trial');
			}
		};

		function shutTab() {
			ctc.stop();
			this$ = $(this).nextAll('.tab').eq(0);

			boxStartPos = parseInt(this$.css('top'));
			boxYPos = boxStartPos;
			ctc.add(closeTab);

			counterBoxStartPos = boxStartPos - 2 * yTravel;
			counterBoxYPos = counterBoxStartPos;
			counterBoxheight = parseInt(this$.prevAll('.counterBox').eq(0).css('height'));
			ctc.add(hideTabContent);

			$(this).addClass('changing');
			ctc.start();
			$(this).addClass('shut').removeClass('open');
		}
	
	//stelle Links für Sprachwechsel Deutsch-Englisch zusammen durch Hinzufügen des aktuellen Request-Parameters (z.B. bei Tagtarget-Seite)
	var queryParam = location.search == 0 ? '' : location.search.substr(1).replace(/&?request_locale=[\w-]*/,'');
	if (queryParam != '')
		queryParam += '&';
	$('#de').wrap('<a href="' + window.location.pathname+ '?' + queryParam + 'request_locale=de" />');
	$('#en').wrap('<a href="' + window.location.pathname+ '?' + queryParam + 'request_locale=en" />');

	$(function() {

		if ($('#references #thumbnails img').length)
			$('#references #thumbnails img').goggleBox({
				largeImage : '#screen',
				toFirstImage : '#toFirstImage',
				toPreviousImage : '#toPreviousImage',
				toNextImage : '#toNextImage',
				toLastImage : '#toLastImage',
				runSlideShow : '#runSlideShow',
				thumbnailsDisplay : false,
				autoStart : true,
				cycleTime : 5000
			});
		
		//erzeuge Slider
		$('#references #mycarousel').jcarousel({
			auto : 3,
			wrap : 'circular',
			animation: 2000,
			easing: 'easeInOutSine'
		});

	});

})();
//PRIO-a: in IE7 Platzierung und mouseover der Übersicht-Buttons korrigieren
//PRIO-a: in IE8 social links korrekt platzieren
//PRIO-c: seitenspezifisches Javasript seitenabhängig laden
//PRIO-c: mobile Tab-Performance verbessern
//PRIO-c: Flaggen im Header bei Seitenaufruf gemäß primärer accepted language des user agent ein-/ausblenden
//PRIO-c: keywords in TagTaget-Seite optimieren für 'Effekte' (de), 'Quality' (de+en), 'CI' (de+en), 'Animationen' (de), 'Web Card' (de+en), 'Social Media' (de+en)

//PRIO-done: SVG-Darstellungsfehler in Safari-Browsern beheben: 1)in Action-Klasse HttpServletResponse referenziert und per ServletResponseAware Content Type auf application/xhtml+xml, 2)clippath-Elemente aus SVGs entfernt
//PRIO-done: less.js serverseitig umsetzen
//PRIO-done: Fortsetzung des Seiten-bg für hohe Seiteninhalte umsetzen
//PRIO-done: Totalausfall in IE7 + 8 beheben: Legacy IE konnte less.js nicht kompilieren - auf serverseitige Kompilierung gewechselt
//PRIO-done: backgrounds für Tab-Animation auf mobiler Startseite korrigieren
//PRIO-done: Flaggen als PNGs für Legacy IE
//PRIO-done: Styling der Leistungen-Übersicht optimieren
//PRIO-done: Wortlaut der Links in Counterbox verkürzen
//PRIO-done: alle SVGs für Legacy IE mit PNGs ersetzen: PNGs mit gleichem Namensanfang wie urlrewrite-Ziele konnten nicht geladen werden
//PRIO-done: Zeugnis-Seite (home) stylen
//PRIO-done: tortendiagramm für mobile entfernen
//PRIO-done: alle PNGs für Legacy IE korrekt positionieren
//PRIO-done: html-Titel korrigieren (z.B. 'oo')