##MyValidation is the jQuery form validation for beginner to advance user

### ~ MyValidation ~ ###
>v.1.1.0

### ~ How it works ~ ###
Include myvalidation.js to page, add myvalidation function and parameters on document ready
state. On the form, add data attributes (data-something) to the field which needs 
to validate. And you're good to go.

### ~ Dependencies ~ ###
MyValidation needs jquery to operate. Make sure include myvalidation.js after jQuery 
load.

### ~ How to use ~ ###
#### Include myvalidation.js to page ####
```html
<script type="text/javascript" src="myvalidation.js"></script>
```
#### Add function and parameters on document ready ####
myvalidation function with first parameter is dom location of form. 
And the second parameter is settings. For instance:

```javascript
$(document).ready(function() {
	theformdom = 'form#subscribe-form';
	settings = {
		bordercolor: '#ff0000',
     	bgcolor: '#ffcc00',
     	fontsize: '0.9',
     	fontfamily: 'Oswald, sans-serif',
     	width: 'full'
	};
	myvalidation(theformdom,settings);
});
```
#### Add data attribute to form field ####
For instance:
```html
<form method="post" action="">
	<input type="text" name="name" id="name"
		data-mandatory="yes" 
		data-error="this field could not be empty"
	>
	<input type="text" name="email" id="email"
		data-mandatory="yes" 
		data-error="this field could not be empty" 
		data-is-email="yes" 
		data-error-email="fill with correct email format"
	>
</form>
```

### ~ Setting Parameters ~ ###
There are several parameters for Setting as describe below:

| Parameter | Value or Format | Default Value | Description |
| --- | --- | --- | --- |
| `bordercolor` | #hexa | #d13636 | use for giving border to *error field* and its *error notification* below it |
| `bgcolor` | #hexa | #d13636 | set background color for *error notification* |
| `fontcolor` | #hexa | #ffffff | set font color for *error notification* |
| `fontsize` | float | 1 | set font size for *error notification* |
| `fontfamily` | name of font |  | set font family for *error notification* |
| `placeholdercolor` | #hexa | #bbb | set placeholder color of fields |
| `width` | full, auto or integer | full | width of *error notification* |
| `hideonblur` | yes | no | *error notification* |
| `showfirstonly` ||||
| `fielderrorcss` ||||
| `parenterrorcss` ||||
| `errornotifcss` ||||
| `errornotifaftercss` ||||
| `webkitselectcss` ||||

### ~ Revisions History ~ ###
#### v.1.1.0 (July 25th, 2016) ####
- Bug revision: allow to add style for webkit browser
- Add feature: remove validation when field blur
- Add feature: allow to alter css of error field and error notif
- Add feature: allow to remove disabled to input type submit
- Add feature: support placeholder for input type select

#### v.1.0.0 (May 23rd, 2016) ####
- First launching. Support only basic function of validation form

### Next Ideas ###
Hello collaborators, here's few of my ideas about the next version of MyValidation
Come on and join to make this MyValidation even better.
- field validation on lose focus (blur), so after filling error field, the visitor 
directly know whether
- single field validation on blur
- hack for opera css
- data mandatory parent
- support for untouched form
- php validation
- allow integration with select2 and uniform
- styling for optgroup
