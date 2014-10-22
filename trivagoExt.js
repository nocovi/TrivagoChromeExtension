$('#js_itemlist' ).before('<div id="itemlist_div"></div>');
$('#js_itemlist').appendTo('#itemlist_div');
//add navigation links
$( '#js_itemlist' ).before('<a id="goBack" href="#" class="carousel-nav prev"></a>');
$( '#js_itemlist' ).after('<a id="goFW" href="#" class="carousel-nav next"></a>');

//add imgages to navigation links
var imgBack = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
imgBack.attr('src', chrome.extension.getURL("images/back.png"));
imgBack.appendTo('#goBack');

var imgFW = $('<img id="dynamic">'); 
imgFW.attr('src', chrome.extension.getURL("images/forward.png"));
imgFW.appendTo('#goFW');


//set global vars current index and itemCount
var currentIndex = 0,
itemCount    = $('#js_itemlist > li').length;
	
//on load add current class to 1st element and set onclick action for navigation links
$(function() {
	/* add the current class to the first item to hide all the others */
	$('#js_itemlist> li:eq(' + currentIndex + ')').addClass('current');
	$('.carousel-nav ').on('click', navigate);
});
	var observer = new MutationSummary({
		callback: handleChanges,
		// required
		rootNode: js_itemlist ,
		observeOwnChanges: false,
		queries: [{
        characterData: true
		}]
	});
	
		
	/* aux functions */
	 function handleChanges (sumaries) {
	 //check if the list is being displayed
	var listStyle = $('#js_itemlist').attr('style');
	if (listStyle !== 'display:none;' && !$('#js_itemlist > li.current').hasClass('active')) {
		$('#js_itemlist > li.current').removeClass('current');
		$('#js_itemlist> li:eq(' + currentIndex + ')').addClass('current');
	}
	}
	
	//allows navigation between li search results 
	function navigate() {
	   	//remove  css classes from items
		$('#js_itemlist > li').removeAttr('style');
		$('#js_itemlist > li.current').removeClass('current');
		$('#js_itemlist > li.next-out').removeClass('next-out');
		$('#js_itemlist > li.next-in').removeClass('next-in');
		$('#js_itemlist > li.prev-out').removeClass('prev-out');
		$('#js_itemlist > li.prev-in').removeClass('prev-in');
		
				
		//active and isNext nodes
		var $active  = $('#js_itemlist > li.current'),
	    isNext   = $(this).hasClass('next');
		
		//get current index
		currentIndex = (currentIndex + (isNext ? 1 : -1)) % itemCount;

		/* go back to the last item if we hit -1 */
		if (currentIndex === -1) {
			currentIndex = itemCount - 1;
		}
		
		//add css classes for transition
		var $next = $('#js_itemlist > li:eq(' + currentIndex + ')');
		$active.addClass(isNext ? 'next-out' : 'prev-out');
		$next.addClass('current').addClass(isNext ? 'next-in' : 'prev-in');
		
		return false;
		
}