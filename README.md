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

| Parameter | Example or Format | Default Value | Description |
| --- | --- | --- | --- |
| `bordercolor` | #ff0000 | #d13636 | use for giving border to *error field* and its *error notification* below it |
| `bgcolor` | #ff0000 | #d13636 | set background color for *error notification* |
| `fontcolor` | #222 | #ffffff | set font color for *error notification* |
| `fontsize` | float | 1 | set font size for *error notification* |
| `fontfamily` | name of font |  | set font family for *error notification* |
| `placeholdercolor` | #hexa | #bbb | set placeholder color of fields |
| `width` | full, auto or integer | full | width of *error notification* |
| `hideonblur` | yes | no | hide *error notification* when field lose focus |
| `showfirstonly` | yes | no | when multiple errors occur, show only first *error notification* |
| `fielderrorcss` | border: 2px solid red; background-color: #aaa; | - | add css to .field-error class (locate in field when error) |
| `parenterrorcss` | border: 2px solid red; background-color: #aaa; | - | add css to .parent-error class (locate in parent of error fields) |
| `errornotifcss` | border: 2px solid red; background-color: #aaa; | - | add css to .error-notif class (error notification itself) |
| `errornotifaftercss` | right: 30px; | - | add css to .error-notif::after class (appear as little arrow above error notification) |
| `webkitselectcss` | padding-left: 20px; font-size: 1.2em; | - | add css for select field on webkit device |

### ~ data- Field Settings ~ ###
data attribute settings for fields:

| Data Attribute | Example or Format | Default Value | Description |
| --- | --- | --- | --- |
| `data-mandatory` | yes | - | set to validate this field |
| (beta) `data-mandatory` | parent | - | for validate multiple field. wrap multiple field to be validate, then add some div or span wrap to them. add this data attribute to that wrapper |
| `data-error` | text | - | default *error notification* text for error field |
| `data-error-hidden` | yes | no | hide *error notification*, but class for error field still exist |
| `data-min-char` | integer | - | only for input type text, to set how many minimum characters are allowed |
| `data-error-min` | text | can not less than [data-min-char] characters | error text notification when number of characters less than data-min-char |
| `data-max-char` | integer | - | only for input type text, to set how many maximum characters are allowed |
| `data-error-max` | text | can not exceed [data-max-char] characters | error text notification when number of characters more than data-max-char |
| `data-allowed-char` | allowed characters | - | to set allowed characters in input type text. for instance: if data-error-allowed="0123456789 +()" will error if the input is "+62 563.456" because it contain period which is not include in this attribute |
| `data-error-allowed` | text | inputs must one of these characters: [allowed-char] | error text notification when one or more characters that's not the part of data-allowed-char occur |
| (beta) `data-mandatory-child` | name,address,age | - | use together with data-mandatory="parent", handle child's name of fileds within this data attribut. Error when the value is empty |
| `data-is-email` | yes | no | treat this field as email, and will error when not in email format |
| `data-error-email` | text | - | for field with data-is-email="yes", error text if wrong email format inserted |
| `data-placeholder` | yes | - | data field attribute only for option of select which is want to be treated as placeholder |

### ~ Any idea to make this better? ~ ###
Join this gitHub or simply contact me at mmwira1708@gmail.com to make this js better.

### ~ Revisions History ~ ###
#### v.1.1.0 (July 25th, 2016) ####
- Bug revision: allow to add style for webkit browser
- Add feature: remove validation when field blur
- Add feature: allow to alter css of error field and error notif
- Add feature: allow to remove disabled to input type submit
- Add feature: support placeholder for input type select

#### v.1.0.0 (May 23rd, 2016) ####
- First launching. Support only basic function of validation form

### ~ Next Ideas ~ ###
Hello collaborators, here's few of my ideas about the next version of MyValidation
Come on and join to make this MyValidation even better.
- field validation on lose focus (blur), so after filling error field, the visitor 
directly know whether it is done or not.
- hack for opera css
- data mandatory parent
- support for untouched form
- php validation
- allow integration with select2 and uniform
- styling for optgroup
- send data when form abandoned
- default error notification for empty
- create interaction interface at demo folder to make the programmer easy to build their form validation
