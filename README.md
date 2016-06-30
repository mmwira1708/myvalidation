# myvalidation
Validation for HTML Form

# purpose
myvalidation is a javascript code that makes easier to create form validation
it is run on the fly by adding "data-" prefix in form element property

# dependencies
myvalidation needs jquery to operate

# how to use
- include this script to page after jquery load script
'<script src="assets/myvalidation.js"></script>'

Simply add these "data-" prefix form element property:
For instance:
'<input type="text" data-mandatory="yes" data-error="this field could not be empty">'
