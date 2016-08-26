/*
 *	Fototip Plugin von Markus Krauss
 * 
 * 	Optionen: innenabstand, hintergrund, schriftgröße und -farbe
 * 
 * 	Öffnet ein Dialogfenster am unteren ende eines entsprechenden Elements und schreibt den Titel hinein
 * 
 * */
$.fn.fototip = function(optionen){
	
	//Optionen (default)
	optionen = $.extend({
		innenabstand:"15",
		hintergrund: "RGBA(0, 0, 0, 0.4)",
		schriftfarbe:"#fff",
		schriftgrose:"15px"	
	}, optionen);

	$(this).each(function(){

		//Hohlt den Text aus dem title-Attribut
		var inhalt = $(this).attr("title");
		$(this).attr("title", "");

		$('<div class="fototip"></div>').text(inhalt).insertAfter(this).hide();
		
		if(inhalt != undefined){
			//Manage Mouseevents
			$(this).bind({
				mouseenter: function(){
					
					//breite
					width = $(this).width();			
					breite=width-optionen.innenabstand*2;
					
					//höhe
					height = $(this).height();
					hoehe=height-optionen.innenabstand*2;
					
					//Setze breite der Box und feste Attribute
					$(this).next().css({"padding":optionen.innenabstand+"px","height":"auto","width":breite,"position":"absolute","display":"none",});
						
					//Position
					posleft = parseFloat($(this).css("margin-left").slice(0,-2));			
					marginTop = parseFloat($(this).css("margin-top").slice(0,-2));
					boxheight=$(this).next().outerHeight();
					postop = marginTop+height-boxheight;
					
					//Box posizionieren
					$(this).next()
					.css({
						"color":optionen.schriftfarbe,
						"font-size":optionen.schriftgrose,
						"background":optionen.hintergrund,			
						"margin":postop+'px 0 0 '+posleft+'px'
					});
					
					//Set Toolbox-Div after Hovered Picture
					$(this).next().fadeIn();
				}
				,
				mouseleave: function(){
					//Eintrag im Head entfernen
					$('.fototip').fadeOut();
				}
			});
		}
	});	
};