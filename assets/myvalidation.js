function myvalidation(theformdom,settings) {
    //$('form#formpendaftaran').myvalidation();
    $(theformdom).submit(function() {
	/**
	 * Global settings:
	 * formdom: dom pointer to form
	 * bordercolor:
	 * blockcolor:
	 * fontcolor:
	 * fontsize: in em
	 * fontfamily:
	 * width: integer
	 * hidden: boolean, show when focus
	 * 
	 * 
	 * The settings data-
	 * data-mandatory: yes
	 * data-error: error text
	 * data-error-hidden: true
	 * data-error-min: error text if string is too short
	 * data-error-max: error text if string is too long
	 * data-error-allowed: error text when inputs contains not allowed char 
	 * data-mandatory: parent
	 * data-mandatory-child: names of child
	 * 	separate with comma
	 * data-allowed-char: character, number and alphabet allowed to be filled
	 * data-min-char: minimum character allowed
	 * data-max-char: maximum character allowed
	 */
	
	
        var numerror = [];
	$('.decoy').remove();
	$('.field-error').removeClass('field-error');
	$('.parent-error').removeClass('parent-error');
	
	if ( !('fontcolor' in settings) ) {
	    errorfontcolor = '#fff';
	} else {
	    errorfontcolor = settings.fontcolor;
	}
	
	if ( !('fontsize' in settings) ) {
	    errorfontsize = '0.8';
	} else {
	    errorfontsize = settings.fontsize;
	}
	
	if ( !('fontfamily' in settings) ) {
	    errorfontfamily = 'inherit';
	} else {
	    errorfontfamily = settings.fontfamily;
	}
	
	if ( !('blockcolor' in settings) ) {
	    errorblockcolor = '#D13636';
	} else {
	    errorblockcolor = settings.blockcolor;
	}
	
	if ( !('bordercolor' in settings) ) {
	    errorbordercolor = '#ed8989';
	} else {
	    errorbordercolor = settings.bordercolor;
	}
	
	if ( !('width' in settings) ) {
	    notifwidth = '200px';
	} else {
	    settingswidth = settings.width; //just number not include px
	    if (settingswidth == 'full') {
		notifwidth = '100%';
	    } else if (settingswidth == 'auto') {
		notifwidth = 'auto';
	    } else {
		notifwidth = settingswidth+'px';
	    }
	}
	
	precss = '<style>';
	precss = precss + '.field-error {';
	    precss = precss + 'border: 1px solid '+errorbordercolor+';';
	    //precss = precss + 'background-image: url("exclamation.png");';
	precss = precss + '}';
	precss = precss + '.parent-error {';
	    precss = precss + 'border-radius: 4px;';
	    precss = precss + 'padding: 5px 10px;';
	precss = precss + '}';
	precss = precss + '</style>';
	
	$('body').append(precss);
	
        $('[data-mandatory="yes"], [data-mandatory="parent"]').each(function() {
	    datamandatorytype = $(this).attr('data-mandatory');
            fieldcontent = $(this).val();
            fieldname = $(this).attr('name');
            fieldid = $(this).attr('id');
            fieldtype = $(this).attr('type');
            errnotif = $(this).attr('data-error');
	    errnotifhidden = null;
	    errnotifhidden = $(this).attr('data-error-hidden');
	    
	    errnotifmin = $(this).attr('data-error-min');
	    errnotifallowed = $(this).attr('data-error-allowed');
	    errnotifmax = $(this).attr('data-error-max');
	    minchar = $(this).attr('data-min-char');
	    maxchar = $(this).attr('data-max-char');
	    allowedchar = $(this).attr('data-allowed-char');
	    
	    console.log(datamandatorytype);
            
            //lalala = $(this).find(':input').attr('name');
            //console.log(lalala);
	    if (datamandatorytype == "yes") {
            
		if (fieldname == "email") {
		    cekemailnya = cekemail(fieldcontent);
		    if (cekemailnya == false) {
			numerror.push("error");
			//alert('email error');
			if (errnotifhidden == null) {
			    $(this).after('<span id="decoy-'+fieldname+'" class="decoy"></span>');
			}
			$(this).addClass('field-error');
		    }
		}
		
		if (fieldcontent == "") {
		    console.log(fieldname+' error');
		    numerror.push("error");
		    if (errnotifhidden == null) {
			$(this).after('<span id="decoy-'+fieldname+'" class="decoy"></span>');
		    }
		    $(this).addClass('field-error');
		}
		
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
			    $(this).after('<span id="decoy-'+fieldname+'" class="decoy"></span>');
			}
			$('[name="'+fieldname+'"]').addClass('field-error');
		    }
		}
		
		if (fieldtype == "checkbox") {
		    if ( $(this).is(":not(':checked')") ) {
			//console.log(fieldname+' error (checkbox)');
			numerror.push("error");
			if (errnotifhidden == null) {
			    $(this).after('<span id="decoy-'+fieldname+'" class="decoy"></span>');
			}
			$(this).addClass('field-error');
		    }
		}
		
		if ( (fieldtype == "text" || fieldtype == "password" || $(this).is("textarea")) && fieldcontent != "" ) {
		    checkminchar = minimum_char(fieldcontent,minchar);
		    checkmaxchar = maximum_char(fieldcontent,maxchar);
		    checkallowedchar = allowed_char(fieldcontent,allowedchar);
		    if (checkminchar == false) {
			numerror.push("error");
			if (errnotifhidden == null) {
			    if (errnotifmin == null) {
				errnotif = 'can not less than '+minchar+' characters';
			    } else {
				errnotif = errnotifmin;
			    }
			    $(this).after('<span id="decoy-'+fieldname+'" class="decoy"></span>');
			}
			$(this).addClass('field-error');
			//$(this).addClass('field-error-too-short');
		    } else if (checkmaxchar == false) {
			numerror.push("error");
			if (errnotifhidden == null) {
			    if (errnotifmax == null) {
				errnotif = 'can not exceed '+maxchar+' characters';
			    } else {
				errnotif = errnotifmax;
			    }
			    $(this).after('<span id="decoy-'+fieldname+'" class="decoy"></span>');
			}
			$(this).addClass('field-error');
		    } else if (checkallowedchar == false) {
			numerror.push("error");
			if (errnotifhidden == null) {
			    if (errnotifallowed == null) {
				errnotif = 'inputs must one of these characters: '+allowedchar;
			    } else {
				errnotif = errnotifallowed;
			    }
			    $(this).after('<span id="decoy-'+fieldname+'" class="decoy"></span>');
			}
			$(this).addClass('field-error');
		    }
		}
		
		fieldnameprinted = fieldname;
	    
	    } else if (datamandatorytype == "parent") {
		datamandatorychild = $(this).attr('data-mandatory-child');
		datamandatoryfieldname = datamandatorychild.split(',');
		var numerrorchild = [];
		//foreach (datamandatoryfieldname as childelement) {
		for (var ch in datamandatoryfieldname) {
		    
		    fieldcontentchild = $('[name="'+datamandatoryfieldname[ch]+'"]').val();
		    fieldnamechild = $('[name="'+datamandatoryfieldname[ch]+'"]').attr('name');
		    fieldidchild = $('[name="'+datamandatoryfieldname[ch]+'"]').attr('id');
		    fieldtypechild = $('[name="'+datamandatoryfieldname[ch]+'"]').attr('type');
		    //errnotif
		    //errnotifhidden
		    
		    if (fieldnamechild == "email") {
			cekemailnya = cekemail(fieldcontentchild);
			if (cekemailnya == false) {
			    //numerror.push("error");
			    numerrorchild.push("error");
			    //alert('email error');
			    $('[name="'+fieldnamechild+'"]').addClass('field-error');
			}
		    }
		    if (fieldcontentchild == "") {
			//console.log(fieldnamechild+' error');
			numerrorchild.push("error");
			$('[name="'+fieldnamechild+'"]').addClass('field-error');
		    }
		    
		    if (fieldtypechild == "radio") {
			//console.log(fieldname+' error (radio)');
			lengthradiochild = $('[name="'+fieldnamechild+'"]').length;
			countuncheckedradiochild = 0;
			$('[name="'+fieldnamechild+'"]').each(function() {
			    fieldid2child = $(this).attr('id');
			    fieldname2child = $(this).attr('name');
			    //console.log(fieldid2+' (each radio)');
			    
			    if ( $(this).is(":not(':checked')") ) {
				//console.log(fieldid2+' not checked');
				countuncheckedradiochild++;
			    }
			    
			});
			//console.log(fieldname+': appears '+lengthradio+', unchecked '+countuncheckedradio);
			if (lengthradiochild == countuncheckedradiochild) {
			    //console.log(fieldname+' error (radio)');
			    numerrorchild.push("error");
			    $('[name="'+fieldnamechild+'"]').addClass('field-error');
			}
		    }
		    
		    if (fieldtypechild == "checkbox") {
			if ( $('[name="'+fieldnamechild+'"]').is(":not(':checked')") ) {
			    //console.log(fieldname+' error (checkbox)');
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
			$(this).after('<span id="decoy-'+fieldnamechild+'" class="decoy"></span>');
		    }
		}
		
		fieldnameprinted = fieldnamechild;
		
	    }
            
            vlcc = '<style>';
                vlcc = vlcc + '#decoy-'+fieldnameprinted+'::after {';
                    vlcc = vlcc + 'border-color: transparent transparent '+errorblockcolor+';';
                    vlcc = vlcc + 'border-style: solid;';
                    vlcc = vlcc + 'border-width: 0 4px 5px;';
                    vlcc = vlcc + 'content: "";';
                    vlcc = vlcc + 'height: 0;';
                    vlcc = vlcc + 'position: absolute;';
                    vlcc = vlcc + 'right: 8px;';
                    vlcc = vlcc + 'top: -5px;';
                    vlcc = vlcc + 'width: 0;';
                vlcc = vlcc + '}';
                vlcc = vlcc + '#decoy-'+fieldnameprinted+'::before {';
                    vlcc = vlcc + 'background-color: '+errorblockcolor+';';
                    vlcc = vlcc + 'border-radius: 5px;';
                    vlcc = vlcc + 'color: '+errorfontcolor+';';
                    vlcc = vlcc + 'content: "'+errnotif+'";';
                    vlcc = vlcc + 'font-size: '+errorfontsize+'em;';
		    vlcc = vlcc + 'font-family: '+errorfontfamily+';';
                    vlcc = vlcc + 'padding: 5px 12px;';
                    vlcc = vlcc + 'position: absolute;';
                    vlcc = vlcc + 'right: 0;';
                    vlcc = vlcc + 'width: '+notifwidth+';';
                    vlcc = vlcc + 'line-height: 1.2em;';
		    vlcc = vlcc + 'z-index: 100;';
                vlcc = vlcc + '}';
            vlcc = vlcc + '</style>';
            
            $('body').append(vlcc);

        });
        numoferror = numerror.length;
        //console.log(numoferror);
        
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
