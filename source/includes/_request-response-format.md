# Request/Response Format

## Authentication

Authentication is achieved via HTTP Basic Authentication.

`username: Email address of an authorized user of CheddarGetter`
`password: Password for the authorized user`

It is recommended that you use a different user account for development accounts vs. live accounts.  It's also a good idea to use a dedicated user account just for API authentication.

## Request

The standard URL format is:
`https://cheddargetter.com/xml/<PATH>/productCode/<MY_PRODUCT_CODE>[/PARAMS]`

For example:
`https://cheddargetter.com/xml/customers/get/productCode/MY_PRODUCT_CODE`

gets all customer data for the product with `productCode=MY_PRODUCT_CODE`

and

`https://cheddargetter.com/xml/customers/get/code/MY_FIRST_CUSTOMER/productCode/MY_PRODUCT_CODE`

gets customer data for the customer with `code=MY_FIRST_CUSTOMER` in the product
with  `code=MY_PRODUCT_CODE`

## Response

Response format is XML.  There are three response document types: *Plans*,
*Customers*, and *Error*.  The *Plans* document is returned when interacting
with pricing plans (a simple `GET`, for example).  The *Customers* document is
returned when interacting with customers.

You may also view raw API responses within the GUI.  For example, if you're looking at your customer list:

`https://cheddargetter.com/admin/customers/get`

Simply change `/admin/` to `/xml/`:

`https://cheddargetter.com/xml/customers/get`

### Plans Response Example

<script src="https://gist.github.com/marcguyer/660077.js?file=plans.xml"></script>

### Customers Response Example

<script src="https://gist.github.com/marcguyer/660077.js?file=customers.xml"></script>

### Error Response Example

<script src="https://gist.github.com/marcguyer/660077.js?file=error.xml"></script>
