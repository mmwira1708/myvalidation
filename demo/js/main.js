$ = jQuery.noConflict();

(function($) {
//script starts here

//var ajaxload_init;
$(document).ready(function() {
    /*
    settings = {
        errornotifcss : 'text-align: left;',
        fielderrorcss : 'border: 3px solid #ed8989 !important;',
        showfirstonly : 'yes',
        placeholdercolor : '#6f6f6f',
        fontsize : '1.1',
        webkitselectcss : 'padding: 10px !important;',
	hideonblur : 'yes',
    };
    */
    settings = {
        placeholdercolor : '#bbb',
    };
    myvalidation('#form-demo',settings);    
    
});

	
//scripts do not write below this
})( jQuery );

