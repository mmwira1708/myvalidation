function myvalidation(theformdom,settings) {
    
    /**
     * Version: v.1.2.0 (August 21th, 2016)
     * 
     * Example of use:
     *
     * theformdom = 'form#subscribe-form';
     * settings = {
     *		bordercolor: '#ff0000',
     *		bgcolor: '#ffcc00',
     *		fontsize: '0.9',
     *		fontfamily: 'Oswald, sans-serif',
     * }
     * myvalidation(theformdom,settings);
     *----------------------------------------
     * 
     * Global settings:
     * 
     * bordercolor:
     * bgcolor: #hexa -> background color for error notifications
     * fontcolor:
     * fontsize: in em
     * fontfamily:
     * placeholdercolor:
     * width: full, auto or integer
     * hideonblur: yes -> hide error notification when field lose focus
     * showfirstonly: yes -> show only first error notification
     * fielderrorcss: add css to .field-error class
     * parenterrorcss: add css to .parent-error class
     * errornotifcss: add css to .error-notif class
     * errornotifaftercss: add css to .error-notif::after class
     * webkitselectcss: add css for select on webkit device
     *--------------------------------------------------------
     * 
     * Field settings data-
     * 
     * data-mandatory: yes
     * data-error: error text
     * data-error-hidden: yes
     * data-error-min: error text if string is too short
     * data-error-max: error text if string is too long
     * data-error-allowed: error text when inputs contains not allowed char 
     * data-mandatory: parent
     * data-mandatory-child: names of child
     * 	separate with comma
     * data-allowed-char: character, number and alphabet allowed to be filled
     * data-min-char: minimum character allowed
     * data-max-char: maximum character allowed
     * 
     * The settings data- only for email field
     * data-is-email: yes -> pointing if this field is for email.
     * data-error-email: error text if wrong email format
     *-------------------------------------------------------------------
     *
     * Notes:
     * to prevent non-javascript submit form add "disabled" to field type="submit"
     *
     * Hello collaborators.
     * This things need to be repaired on next version:
     * - field validation on lose focus (blur), so after filling error field, the visitor directly know whether it is done or not.
     * - finalizing data mandatory parent
     * - support for untouched form
     * - php validation
     * - allow integration with select2 and uniform
     * - styling for optgroup
     * - send data when form abandoned
     * - default error notification for empty
     * - create interaction interface at demo folder to make the programmer easy to build their form validation
     * - default error notification for empty field
     * - support popup error notification
     */
    
    // remove defaulf html5 form validation
    $(theformdom).attr('novalidate','');
    
    /**
     * remove disabled on field type submit
     * form with no php validation sould add disabled
     * to field type submit to handle visitors who
     * turn off their browser's javascript
     */
    $(theformdom + ' [type="submit"]').removeAttr('disabled');

    // add placeholder to select element
    $('select option[data-placeholder="yes"]').each(function() {
	$(this).attr('hidden','hidden');
	$(this).attr('selected','selected');
	$(this).attr('value','');
	$(this).parent().attr('required','required');
    });
    
    // default setting for placeholdercolor
    if ( !('placeholdercolor' in settings) ) {
	errorplaceholdercolor = '#7f7f7f';
    } else {
	// if placeholdercolor setting occurs
	errorplaceholdercolor = settings.placeholdercolor;
    }
    
    /**
     * default setting for border color
     * bordercolor is use to border color error notifications
     * and the field itself when error happens
     */
    if ( !('bordercolor' in settings) ) {
	errorbordercolor = '#ed8989';
    } else {
	// if bordercolor setting occurs
	errorbordercolor = settings.bordercolor;
    }
    
    // default background color for error notifications
    if ( !('bgcolor' in settings) ) {
	errorbgcolor = '#D13636';
    } else {
	// if bgcolor setting occurs
	errorbgcolor = settings.bgcolor;
    }
    
    // default setting for fontcolor
    if ( !('fontcolor' in settings) ) {
	errorfontcolor = '#fff';
    } else {
	// if fontcolor setting occurs
	errorfontcolor = settings.fontcolor;
    }
    
    // default setting for fontsize
    if ( !('fontsize' in settings) ) {
	errorfontsize = '0.8';
    } else {
	// if fontsize setting occurs
	errorfontsize = settings.fontsize;
    }
    
    /**
     * default setting for fontfamily
     * fontfamily setting needs additional font definitions
     * whice is not included in this script
     */
    if ( !('fontfamily' in settings) ) {
	errorfontfamily = 'inherit';
    } else {
	// if fontfamily setting occurs
	errorfontfamily = settings.fontfamily;
    }
    
    // default setting for error notif width is 100% width
    if ( !('width' in settings) ) {
	notifwidth = '100%';
    } else {
	/** if width setting occurs
	 * it is filled with full, auto or integer number
	 */
	settingswidth = settings.width;
	if (settingswidth == 'full') {
	    notifwidth = '100%';
	} else if (settingswidth == 'auto') {
	    notifwidth = 'auto';
	} else {
	    notifwidth = settingswidth+'px';
	}
    }
    
    // css style
    precss = '<style>';
    precss = precss + 'select:invalid {';
	precss = precss + 'color: ' + errorplaceholdercolor + ' !important;';
    precss = precss + '}';
    
    precss = precss + '::-webkit-input-placeholder {';
	precss = precss + 'color: ' + errorplaceholdercolor + ' !important;';
	precss = precss + 'opacity: 1;';
    precss = precss + '}';
    precss = precss + ':-moz-placeholder {';
	precss = precss + 'color: ' + errorplaceholdercolor + ' !important;';
	precss = precss + 'opacity: 1;';
    precss = precss + '}';
    precss = precss + '::-moz-placeholder {';
	precss = precss + 'color: ' + errorplaceholdercolor + ' !important;';
	precss = precss + 'opacity: 1;';
    precss = precss + '}';
    precss = precss + ':-ms-input-placeholder {';
	precss = precss + 'color: ' + errorplaceholdercolor + ' !important;';
	precss = precss + 'opacity: 1;';
    precss = precss + '}';
    
    precss = precss + 'input[type="text"], input[type="password"], input[type="email"], select {';
	precss = precss + '-webkit-appearance: none;';
    precss = precss + '}';
    
    precss = precss + '@media screen and (-webkit-min-device-pixel-ratio:0) {';
	precss = precss + theformdom + ' select {';
	    if ( 'webkitselectcss' in settings ) {
		precss = precss + settings.webkitselectcss;
	    }
	precss = precss + '}';
    precss = precss + '}';
    
    precss = precss + theformdom + ' .field-error {';
	precss = precss + 'border: 1px solid '+errorbordercolor+' !important;';
	if ( 'fielderrorcss' in settings ) {
	    precss = precss + settings.fielderrorcss;
	}
    precss = precss + '}';
    precss = precss + '.parent-error {';
	precss = precss + 'border-radius: 4px;';
	precss = precss + 'padding: 5px 10px;';
	if ( 'parenterrorcss' in settings ) {
	    precss = precss + settings.parenterrorcss;
	}
    precss = precss + '}';
    precss = precss + '.error-notif {';
	precss = precss + 'display: table;';
	precss = precss + 'position: relative;';
	precss = precss + 'background-color: '+errorbgcolor+';';
	precss = precss + 'border-radius: 5px;';
	precss = precss + 'color: '+errorfontcolor+';';
	precss = precss + 'font-size: '+errorfontsize+'em;';
	precss = precss + 'font-family: '+errorfontfamily+';';
	precss = precss + 'padding: 5px 12px;';
	precss = precss + 'width: '+notifwidth+';';
	precss = precss + 'line-height: 1.2em;';
	precss = precss + 'z-index: 100;';
	if ( 'errornotifcss' in settings ) {
	    precss = precss + settings.errornotifcss;
	}
    precss = precss + '}';
    precss = precss + '.error-notif::after {';
	precss = precss + 'border-color: transparent transparent '+errorbgcolor+';';
	precss = precss + 'border-style: solid;';
	precss = precss + 'border-width: 0 4px 5px;';
	precss = precss + 'content: "";';
	precss = precss + 'height: 0;';
	precss = precss + 'position: absolute;';
	precss = precss + 'right: 10px;';
	precss = precss + 'top: -5px;';
	precss = precss + 'width: 0;';
	if ( 'errornotifaftercss' in settings ) {
	    precss = precss + settings.errornotifaftercss;
	}
    precss = precss + '}';
    
    precss = precss + '</style>';
    
    // add css style when init
    $('body').append(precss);
    
    // whem form submit..
    $(theformdom).submit(function() {
	
	activityx = $('#activity').val();
	console.log(activityx);
	
	/**
	 * set zero to numerror.
	 * this variable is to detect how many error found
	 * if still zero means there is no error(s) in form.
	 * otherwise if not zero means there are several errors
	 * in form
	 */
        var numerror = [];
	
	// netraulize classes of validation
	$('.error-notif').remove();
	$('.blur-script').remove();
	$('.field-error').removeClass('field-error');
	$('.parent-error').removeClass('parent-error');
	
	/**
	 * the validation checks are start here
	 * it will evaluate field which has "yes" data mandatory attribute (data-mandatory="yes")
	 * and has "parent" data mandatory attribute (still in beta)
	 */
        $(theformdom + ' [data-mandatory="yes"], ' + theformdom + ' [data-mandatory="parent"]').each(function() {
	    
	    // reads field data and other attributes
	    datamandatorytype = $(this).attr('data-mandatory');
            fieldcontent = $(this).val();
            fieldname = $(this).attr('name');
            fieldid = $(this).attr('id');
            fieldtype = $(this).attr('type');
	    fieldisemail = $(this).attr('data-is-email');
            errnotif = $(this).attr('data-error');
	    errnotifemail = $(this).attr('data-error-email');
	    errnotifhidden = null;
	    errnotifhidden = $(this).attr('data-error-hidden');
	    
	    errnotifmin = $(this).attr('data-error-min');
	    errnotifallowed = $(this).attr('data-error-allowed');
	    errnotifmax = $(this).attr('data-error-max');
	    minchar = $(this).attr('data-min-char');
	    maxchar = $(this).attr('data-max-char');
	    allowedchar = $(this).attr('data-allowed-char');

	    // if data-mandatory equals yes -> means must be evaluated
	    if (datamandatorytype == "yes") {
		
		if (fieldcontent == "") {
		    console.log(fieldname+' error');
		    numerror.push("error");
		    if (errnotifhidden == null) {
			$(this).after('<span id="error-notif-'+fieldname+'" class="error-notif">'+errnotif+'</span>');
		    }
		    $(this).addClass('field-error');
		} else if (fieldcontent == null) {
		    numerror.push("error");
		    if (errnotifhidden == null) {
			$(this).after('<span id="error-notif-'+fieldname+'" class="error-notif">'+errnotif+'</span>');
		    }
		    $(this).addClass('field-error');
		} else if (fieldisemail == "yes") {
		    cekemailnya = cekemail(fieldcontent);
		    if (cekemailnya == false) {
			numerror.push("error");
			if (errnotifemail != null) {
			    errnotif = errnotifemail;
			}
			if (errnotifhidden == null) {
			    $(this).after('<span id="error-notif-'+fieldname+'" class="error-notif">'+errnotif+'</span>');
			}
			$(this).addClass('field-error');
		    }
		}
		
		// if field type equals radio
		if (fieldtype == "radio") {
		    //console.log(fieldname+' error (radio)');
		    lengthradio = $('[name="'+fieldname+'"]').length;
		    countuncheckedradio = 0;
		    $('[name="'+fieldname+'"]').each(function() {
			fieldid2 = $(this).attr('id');
			fieldname2 = $(this).attr('name');
			//console.log(fieldid2+' (each radio)');
			
			if ( $(this).is(":not(':checked')") ) {
			    //console.log(fieldid2+' not checked');
			    countuncheckedradio++;
			}
			
		    });
		    //console.log(fieldname+': appears '+lengthradio+', unchecked '+countuncheckedradio);
		    if (lengthradio == countuncheckedradio) {
			console.log(fieldname+' error (radio)');
			numerror.push("error");
			if (errnotifhidden == null) {
			    $(this).after('<span id="error-notif-'+fieldname+'" class="error-notif">'+errnotif+'</span>');
			}
			$('[name="'+fieldname+'"]').addClass('field-error');
		    }
		}
		
		// if field type is checkbox
		if (fieldtype == "checkbox") {
		    if ( $(this).is(":not(':checked')") ) {
			numerror.push("error");
			if (errnotifhidden == null) {
			    $(this).after('<span id="error-notif-'+fieldname+'" class="error-notif">'+errnotif+'</span>');
			}
			$(this).addClass('field-error');
		    }
		}
		
		/**
		 * if those field type empty do conditional validation
		 * conditional validation including check minimum/maximum characters allowed,
		 * check what characters allowed to occurs
		 */
		if ( (fieldtype == "text" || fieldtype == "password" || $(this).is("textarea")) && fieldcontent != "" ) {
		    iserrormultiple = false;
		    if (allowedchar != null) {
			checkallowedchar = allowed_char(fieldcontent,allowedchar);
			if (checkallowedchar == false) {
			    numerror.push("error");
			    if (errnotifhidden == null) {
				if (errnotifallowed == null) {
				    errnotif = 'inputs must one of these characters: '+allowedchar;
				} else {
				    errnotif = errnotifallowed;
				}
				if (iserrormultiple == false) {
				    $(this).after('<span id="error-notif-'+fieldname+'" class="error-notif">'+errnotif+'</span>');
				    iserrormultiple = true;
				}
			    }
			    $(this).addClass('field-error');
			}
		    }
		    if (minchar != null) {
			checkminchar = minimum_char(fieldcontent,minchar);
			if (checkminchar == false) {
			    numerror.push("error");
			    if (errnotifhidden == null) {
				if (errnotifmin == null) {
				    errnotif = 'can not less than '+minchar+' characters';
				} else {
				    errnotif = errnotifmin;
				}
				if (iserrormultiple == false) {
				    $(this).after('<span id="error-notif-'+fieldname+'" class="error-notif">'+errnotif+'</span>');
				    iserrormultiple = true;
				}
			    }
			    $(this).addClass('field-error');
			}
		    }
		    if (maxchar != null) {
			checkmaxchar = maximum_char(fieldcontent,maxchar);
			if (checkmaxchar == false) {
			    numerror.push("error");
			    if (errnotifhidden == null) {
				if (errnotifmax == null) {
				    errnotif = 'can not exceed '+maxchar+' characters';
				} else {
				    errnotif = errnotifmax;
				}
				if (iserrormultiple == false) {
				    $(this).after('<span id="error-notif-'+fieldname+'" class="error-notif">'+errnotif+'</span>');
				    iserrormultiple = true;
				}
			    }
			    $(this).addClass('field-error');
			}
		    }
		    
		    
		}
		
		fieldnameprinted = fieldname;
	    
	    } else if (datamandatorytype == "parent") {
		/**
		 * parent form validation is still in beta
		 * however it has been working too
		 * with these very simple conditions below:
		 * imagine you have 3 date of birth (dob) fields
		 * their name attr are dob_date, dob_month, dob_year
		 * you place them parallel side-by-side
		 * and you only want one validation for these three fields
		 * so, all you need to do is wrap them with one <div>
		 * and place data-mandatory="parent" and data-error="something" in it
		 * if one of them empty, the error notification will shows
		 */
		
		datamandatorychild = $(this).attr('data-mandatory-child');
		dataisemailchild = $(this).attr('data-is-email');
		datamandatoryfieldname = datamandatorychild.split(',');
		var numerrorchild = [];

		for (var ch in datamandatoryfieldname) {
		    
		    fieldcontentchild = $('[name="'+datamandatoryfieldname[ch]+'"]').val();
		    fieldnamechild = $('[name="'+datamandatoryfieldname[ch]+'"]').attr('name');
		    fieldidchild = $('[name="'+datamandatoryfieldname[ch]+'"]').attr('id');
		    fieldtypechild = $('[name="'+datamandatoryfieldname[ch]+'"]').attr('type');
		    
		    if (fieldcontentchild == "") {
			numerrorchild.push("error");
			$('[name="'+fieldnamechild+'"]').addClass('field-error');
		    } else if (fieldcontentchild == null) {
			numerrorchild.push("error");
			$('[name="'+fieldnamechild+'"]').addClass('field-error');
		    } else if (dataisemailchild == "yes") {
			cekemailnya = cekemail(fieldcontentchild);
			if (cekemailnya == false) {
			    numerrorchild.push("error");
			    $('[name="'+fieldnamechild+'"]').addClass('field-error');
			}
		    }
		    
		    if (fieldtypechild == "radio") {
			lengthradiochild = $('[name="'+fieldnamechild+'"]').length;
			countuncheckedradiochild = 0;
			$('[name="'+fieldnamechild+'"]').each(function() {
			    fieldid2child = $(this).attr('id');
			    fieldname2child = $(this).attr('name');

			    if ( $(this).is(":not(':checked')") ) {
				countuncheckedradiochild++;
			    }
			    
			});

			if (lengthradiochild == countuncheckedradiochild) {
			    numerrorchild.push("error");
			    $('[name="'+fieldnamechild+'"]').addClass('field-error');
			}
		    }
		    
		    if (fieldtypechild == "checkbox") {
			if ( $('[name="'+fieldnamechild+'"]').is(":not(':checked')") ) {
			    numerrorchild.push("error");
			    $('[name="'+fieldnamechild+'"]').addClass('field-error');
			}
		    }
		    
		    
		}
		
		numoferrorchild = numerrorchild.length;
		
		if (numoferrorchild > 0) {
		    numerror.push("error");
		    $(this).addClass('parent-error');
		    $(this).addClass('field-error');
		    if (errnotifhidden == null) {
			$(this).after('<span id="error-notif-'+fieldnamechild+'" class="error-notif">'+errnotif+'</span>');
		    }
		}
		
		fieldnameprinted = fieldnamechild;
		
	    }
	    
	    // setting for remove notification when the field lose its focus (blur)
	    if ( 'hideonblur' in settings ) {
		if (settings.hideonblur == "yes") {
		    blurscript = '<script class="blur-script">';
			blurscript = blurscript + '$(\'[name="'+fieldname+'"]\').on("blur",function() {';
			    blurscript = blurscript + '$(\'#error-notif-'+fieldname+'\').remove();';
			    blurscript = blurscript + '$(this).removeClass(\'field-error\');';
			blurscript = blurscript + '});';
		    blurscript = blurscript + '</script>';
		    
		    $('body').append(blurscript);
		}
	    }

        });
        numoferror = numerror.length;
	
	// show only first error notification
	if ( 'showfirstonly' in settings ) {
	    if (settings.showfirstonly == "yes") {
		$(theformdom + ' .error-notif').hide();
		$(theformdom + ' .error-notif:first').show();
	    }
	}
	
	// set focus for first error field
	$(theformdom + ' .field-error:first').focus();
        
        if (numoferror > 0) {
            return false;
        }
            
    });
}

function cekemail(isiemail) {
    lengthemail = isiemail.length;
    validemail = true;
    re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emailvalidation = re.test(isiemail);
    if(! emailvalidation) {
	    validemail = false;
    }
    if (validemail == false) {
	return false;
    } else if (validemail == true) {
	return true;
    }
}

function allowed_char(thestring,charallowed) {
    lengththestring = thestring.length;
    validstring = true;
    for (loop=1;loop<=lengththestring;loop++) {
	char = thestring.charAt(loop-1);
	validdetect = charallowed.indexOf(char);
	if (validdetect == -1) {
		validstring = false;
	}
    }
    if (validstring == true) {
	return true;
    } else {
	return false;
    }
}

function minimum_char(thestring,minnumber) {
    lengththestring = thestring.length;
    if (lengththestring < minnumber) {
	return false;
    } else {
	return true;
    }
}

function maximum_char(thestring,maxnumber) {
    lengththestring = thestring.length;
    if (lengththestring > maxnumber) {
	return false;
    } else {
	return true;
    }
}
