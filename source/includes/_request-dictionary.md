# Request Dictionary

All API request types and parameters are logically named and should be easily
understandable. The following outlines each possible API call and required
parameters.

## Pricing Plans

### Get All Pricing Plans

Get all pricing plan data from the product with `productCode=MY_PRODUCT_CODE`

`/plans/get/productCode/MY_PRODUCT_CODE`

#### Response

`Example response: plans.xml`

### Get a Single Pricing Plan

Get the pricing plan data from the product with `productCode=MY_PRODUCT_CODE`
for the pricing plan with `code=MY_PLAN_CODE`

`/plans/get/productCode/MY_PRODUCT_CODE/code/MY_PLAN_CODE`

## Customers

### Get All Customers

Get all customer data from the product with `productCode=MY_PRODUCT_CODE`

`/customers/get/productCode/MY_PRODUCT_CODE`

Name | Required | Description
---- | -------- | -----------
subscriptionStatus | No | "activeOnly" or "canceledOnly"
planCode[] | No | Your pricing plan code. This is an array and may be provided multiple times to filter by multiple plans.
createdAfterDate | No | YYYY-MM-DD
createdBeforeDate | No | YYYY-MM-DD
canceledAfterDate | No | YYYY-MM-DD
canceledBeforeDate | No | YYYY-MM-DD
transactedAfterDate | No | YYYY-MM-DD
transactedBeforeDate | No | YYYY-MM-DD
orderBy | No | "name" (default), "company", "plan", "billingDatetime" or "createdDatetime"
orderByDirection | No | "asc" (default) or "desc"
search | No | Text search customer name, company, email address and last four digits of credit card.

<aside class="notice">
As in all date and time related operations, the timezone used is the timezone set
for the authenticated user. Dates are inclusive. e.g. assuming timezone for the
authenticated user is set to UTC, 2010-07-04 <= X <= 2010-08-04 is interpreted
as 2010-07-04T00:00:00+00:00 <= X <= 2010-08-04T23:59:59+00:00.
</aside>


### Get a Single Customer

Get the customer data from the product with `productCode=MY_PRODUCT_CODE`
for the customer with `code=MY_CUSTOMER_CODE` (or by id or `invoiceNumber`).

`/customers/get/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

`/customers/get/productCode/MY_PRODUCT_CODE/invoiceNumber/1`

`/customers/get/productCode/MY_PRODUCT_CODE/id/CG_CUSTOMER_ID`

### Create a New Customer

Create a new customer in the product with  `productCode=MY_PRODUCT_CODE`
and subscribe the customer to a pricing plan.

`/customers/new/productCode/MY_PRODUCT_CODE`

Name | Required | Description
---- | -------- | -----------
code | Yes | Your code for this customer. Limited to 255 characters.
firstName | Yes | Limited to 40 characters
lastName | Yes | Limited to 40 characters
email | Yes | Valid email address
company | No | Limited to 60 characters
isVatExempt | No | 1 or 0
vatNumber | No | If the customer is geographically eligible to be taxed and is exempt, provide the exemption number if applicable. Limited to 32 characters
notes | No | Limited to 255 characters
firstContactDatetime | No | Date or datetime in ISO 8601 format.(e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
referer | No | A valid URL referer. Limited to 255 characters. See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignTerm | No | The "term" or "keyword" phrase that lead a potential customer to your site. Google Adwords equivalent: "utm_term". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignName | No | The name of the marketing campaign. Google Adwords equivalent: "utm_campaign". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignSource | No | The source of the lead. Google Adwords equivalent: "utm_source". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignMedium | No | The medium used to find your site. Google Adwords equivalent: "utm_medium". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignContent | No | The content you wish to track. Google Adwords equivalent: "utm_content". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
metaData[&lt;user-defined&gt;] | No | See the [KB Article](http://support.cheddargetter.com/kb/api-8/customer-meta-data) about customer metadata
subscription[planCode] | Yes | Your code for the subscribed pricing plan
subscription[initialBillDate] | No | Date or datetime in ISO 8601 format. (e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). Date on which you would like the customers first invoice to be billable. This option overrides the pricing plan default. Must either be today's date (run invoice immediately) or a future date.
subscription[method] | No | "cc" (default) or "paypal"
subscription[ccNumber] | Conditional (See notes) | Numbers only -- a valid credit/debit card number
subscription[ccExpiration] | Conditional (See notes) | MM/YYYY - the expiration date for the credit card
subscription[ccCardCode] | Conditional. If plan is free, no. If your preference is to require the cardCode, yes. Not required when method is paypal. | 3-4 digits - The Card Verification Value (CCV).
subscription[ccFirstName] | Conditional (see notes) | Limited to 40 characters
subscription[ccLastName] | Conditional (see notes) | Limited to 40 characters
subscription[ccCompany] | No | Limited to 60 characters
subscription[ccCountry] | No | Limited to 60 characters. Many billing solutions require that the ISO 2 char codes are used.
subscription[ccAddress] | No | Limited to 60 characters
subscription[ccCity] | No | Limited to 40 characters
subscription[ccState] | No | Limited to 40 characters. 2 character state/province codes are suggested when country is US/Canada.
subscription[ccZip] | No | Limited to 20 characters
subscription[returnUrl] | when method is paypal. | Must be a valid URL. Only used when method is paypal. This is the location where subscriber is returned from paypal after accepting a preapproval.
subscription[cancelUrl] | Conditional. Required when method is paypal. | Must be a valid URL. Only used when method is paypal. This is the location where subscriber is returned from paypal after declining a preapproval.
charges[&lt;user-defined&gt;][chargeCode] | No (see notes) | Your code for this charge. Limited to 36 characters.
charges[&lt;user-defined&gt;][quantity] | No (see notes) | Positive integer quantity
charges[&lt;user-defined&gt;][eachAmount] | No (see notes) | Positive or negative integer or float with two digit decimal precision. A positive number will create a charge (debit). A negative number will create a credit.
charges[&lt;user-defined&gt;][description] | No | Description for this charge/credit
items[&lt;user-defined&gt;][itemCode] | No (see notes) | Your code for this tracked item. Limited to 36 characters.
items[&lt;user-defined&gt;][quantity] | No (see notes) | The positive amount accurate to up to 4 decimal places that you wish to set the current usage to for this item. Can be zero.
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

<aside class="notice">

  If the plan is free, only <code>code</code>, <code>firstName</code>, <code>lastName</code>, <code>email</code> and
  <code>subscription[planCode]</code> are required. If the plan is a paid plan, credit card
  information is only required if you have configured CheddarGetter to require it.
  It can be optional only if the first invoice on a pricing plan is delayed. If a
  subscription on a paid plan does not have a payment method when it comes time to
  bill, the subscription will be auto-cancelled. See the the email templates
  <a href="http://support.cheddargetter.com/kb/operational-how-tos/email-notification-templates">KB Article</a>
  regarding free trials and the <em>Bill Reminder</em> email.
  <br/>
  <br/>
<p>
  When using $0.00 verification transactions (e.g., <code>Authorize.Net CIM validationMode=liveMode)</code>
  for credit card pre-verifications, <code>subscription[ccAddress]</code> and
  <code>subscription[ccZip]</code> are required.
</p>

<p>
  Charges are not required but when including charges, <code>chargeCode</code>,
   <code>quantity</code> and <code>eachAmount</code> are required for each charge.
</p>

<p>
  Items are not required but when including items, <code>itemCode</code> and
  <code>quantity</code> are required for each item.
</p>

<p>
  Check out this article for more information about <a href="http://support.cheddargetter.com/kb/api-8/using-paypal-with-the-api">
  using the API with PayPal
  </a>.
</p>

</aside>

### Import Customers

Import customers to the product with `productCode=MY_PRODUCT_CODE`. Existing
paying (or non-paying) customers in another billing system may be imported while
maintaining payment methods if the billing solution is compatible. Please [contact
support](http://support.cheddargetter.com/discussion/new) for more information
about whether or not importing is possible in your situation.

`/customers/import/productCode/MY_PRODUCT_CODE`

Name | Required | Description
---- | -------- | -----------
code | Yes | Your code for this customer. Limited to 255 characters.
gatewayToken | Conditional | The gateway reference code. Limited to 255 characters.
firstName | Yes | Limited to 40 characters
lastName | Yes | Limited to 40 characters
email | Yes | Valid email address
company | No | Limited to 60 characters
isVatExempt | No | 1 or 0
vatNumber | No | If the customer is geographically eligible to be taxed and is exempt, provide the exemption number if applicable. Limited to 32 characters
notes | No | Limited to 255 characters
firstContactDatetime | No | Date or datetime in ISO 8601 format. (e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
referer | No | A valid URL referer. Limited to 255 characters. See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignTerm | No | The "term" or "keyword" phrase that lead a potential customer to your site. Google Adwords equivalent: "utm_term". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignName | No | The name of the marketing campaign. Google Adwords equivalent: "utm_campaign". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignSource | No | The source of the lead. Google Adwords equivalent: "utm_source". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignMedium | No | The medium used to find your site. Google Adwords equivalent: "utm_medium". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignContent | No | The content you wish to track. Google Adwords equivalent: "utm_content". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
metaData[&lt;user-defined&gt;] | No | See the [KB Article](http://support.cheddargetter.com/kb/api-8/customer-meta-data) about customer metadata
subscription[initialBillDate] | Yes | Date or datetime in ISO 8601 format. (e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). Date on which you would like the customers first invoice to be billable. This option overrides the pricing plan default. Must either be today's date (run invoice immediately) or a future date.
subscription[ccType] | Conditional | visa, mc, disc, amex, diners, jcb, unk. If you specify a subscription[gatewayToken], this is required.
subscription[ccLastFour] | Conditional | Numbers only -- last four digits of credit/debit card number. If you specify a subscription[gatewayToken], this is required.
subscription[ccExpiration] | Conditional | MM/YYYY - the expiration date for the credit/debit card. If you specify a subscription[gatewayToken], this is required.
subscription[ccFirstName] | Conditional | Limited to 40 characters. If you specify a subscription[gatewayToken], this is required.
subscription[ccLastName] | Conditional | Limited to 40 characters. If you specify a subscription[gatewayToken], this is required.
subscription[ccCompany] | No | Limited to 60 characters
subscription[ccCountry] | No | Limited to 60 characters. Many billing solutions require that the ISO 2 char codes are used.
subscription[ccAddress] | No | Limited to 60 characters
subscription[ccCity] | No | Limited to 40 characters
subscription[ccState] | No | Limited to 40 characters. 2 character state/province codes are suggested when country is US/Canada.
subscription[ccZip] | No | Limited to 20 characters
charges[&lt;user-defined&gt;][chargeCode] | No (see notes) | Your code for this charge. Limited to 36 characters.
charges[&lt;user-defined&gt;][quantity] | No (see notes) | Positive integer quantity
charges[&lt;user-defined&gt;][eachAmount] | No (see notes) | Positive or negative integer or float with two digit decimal precision. A positive number will create a charge (debit). A negative number will create a credit.
charges[&lt;user-defined&gt;][description] | No | Description for this charge/credit
items[&lt;user-defined&gt;][itemCode] | No (see notes) | Your code for this tracked item. Limited to 36 characters.
items[&lt;user-defined&gt;][quantity] | No (see notes) | The positive amount accurate to up to 4 decimal places that you wish to set the current usage to for this item. Can be zero.

<aside class="notice">

  Up to 100 customers may be imported in one call. Customer data must be in a
  nested list.
<br/>
<br/>
<p>
  Any customer may be imported with or without a payment method. If payment
  method import is desired, the last four digits of the card number, the
  expiration date and the card type are required (card type may be "unk" if
  not known).
</p>

<p>
  <code>subscription[initialBillDate]</code> is required. The first transaction
  will occur on the <code>initialBillDate</code>.

<p>
  Charges are not required but when including charges, <code>chargeCode</code>,
  <code>quantity</code> and <code>eachAmount</code> are required for each charge.
</p>

<p>
  Items are not required but when including items, <code>itemCode</code> and
  <code>quantity</code> are required for each item.
</p>

<p>
  Check out this article for more information about <a href="http://support.cheddargetter.com/kb/getting-started-19/can-i-migrate-or-import-existing-customers-to-cheddargetter-how">
  using the import functionality
  </a>.
</p>

</aside>

### Delete a Customer

Delete an existing customer in the product with `productCode=MY_PRODUCT_CODE`

`/customers/delete/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

<aside class="warning">
  Warning - This will delete the customer and all related data in CheddarGetter
  and will delete the customer data at the gateway if a gateway is configured.
</aside>

### Delete All Customers

Delete all existing customers in the product with `productCode=MY_PRODUCT_CODE`

`/customers/delete-all/confirm/[current unix timestamp]/productCode/MY_PRODUCT_CODE`

<aside class="warning">
  Warning - This will delete all customers and all related data in
  CheddarGetter. This method is <b>disabled</b> in production accounts.
</aside>

### Update a Customer and Subscription

Update an existing customer's information in the product with
`productCode=MY_PRODUCT_CODE` and modify the subscription information

`/customers/edit/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Required | Description
---- | -------- | -----------
firstName | No | Limited to 20 characters.
lastName | No | Limited to 20 characters.
email | No | Valid email address
company | No | Limited to 60 characters
notes | No | Limited to 255 characters
isVatExempt | No | 1 or 0
vatNumber | No | If the customer lives in a VAT eligible country and is exempt, provide the exemption number. Limited to 32 characters
firstContactDatetime | No | Date or datetime in ISO 8601 format. (e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
referer | No | A valid URL referer. Limited to 255 characters. See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignTerm | No | The "term" or "keyword" phrase that lead a potential customer to your site. Google Adwords equivalent: "utm_term". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignName | No | The name of the marketing campaign. Google Adwords equivalent: "utm_campaign". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignSource | No | The source of the lead. Google Adwords equivalent: "utm_source". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignMedium | No | The medium used to find your site. Google Adwords equivalent: "utm_medium". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
campaignContent | No | The content you wish to track. Google Adwords equivalent: "utm_content". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
metaData[&lt;user-defined&gt;] | No | See the [KB Article](http://support.cheddargetter.com/kb/api-8/customer-meta-data) about customer metadata
subscription[method] | No | "cc" (default) or "paypal"
subscription[planCode] | No | Your code for the subscribed pricing plan
subscription[couponCode] | No | Coupon code for the promotion you'd like to apply to the subscription
subscription[ccNumber] | No (see notes) | Numbers only -- a valid credit/debit card number
subscription[ccExpiration] | No (see notes) | MM/YYYY - the expiration date for the credit card
subscription[ccCardCode] | Conditional. If plan is free, no. If your preference is to require the cardCode, yes. | 3-4 digits - The Card Verification Value (CCV).
subscription[ccFirstName] | No (see notes) | Limited to 20 characters
subscription[ccLastName] | No (see notes) | Limited to 20 characters
subscription[ccCompany] | No | Limited to 50 characters
subscription[ccCountry] | No | Limited to 60 characters. Many billing solutions require that the ISO 2 char codes are used.
subscription[ccAddress] | No | Limited to 60 characters
subscription[ccCity] | No | Limited to 40 characters
subscription[ccState] | No | suggested when country is US/Canada.
subscription[ccZip] | Conditional. If plan is free, no. If your preference is to require the zip, yes. | Limited to 20 characters
subscription[returnUrl] | Conditional. Required when method is paypal. | Must be a valid URL. Only used when method is paypal. This is the location where subscriber is returned from paypal after accepting a preapproval.
subscription[cancelUrl] | Conditional. Required when method is paypal. | Must be a valid URL. Only used when method is paypal. This is the location where subscriber is returned from paypal after declining a preapproval.
subscription[changeBillDate] | No | Date or datetime in ISO 8601 format. (e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). You may also use the word 'now' as shorthand for the current datetime.
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

<aside class="notice">

  If the customer does not already have a subscription with a valid credit card,
  all credit card information is required. If the plan code corresponds to a
  "free" plan, no Credit Card data is required. If the customer already has a
  subscription with a credit card, no credit card information data is required.
  In this instance, any subset of credit card data may be provided.
<br/>
<br/>
<p>
  If the plan is a paid plan, credit card information is only required if you
  have configured CheddarGetter to require it. It can be optional only if the
  next invoice is delayed. If a subscription on a paid plan does not have a
  credit card when it comes time to bill, the subscription will be auto-cancelled.
  See the email templates <a href="http://support.cheddargetter.com/kb/operational-how-tos/email-notification-templates">KB Article</a> regarding free trials and the <em>Bill Reminder</em> email.
</p>

<p>
  Changing the next bill date using <code>subscription[changeBillDate]</code>
  effects the billing cycle. Subsequent bill dates will be on the new cycle.
  In other words, for a monthly plan that typically bills on the 3rd of every
  month, if the next bill date is changed to the 10th, the subscription will
  now bill every month on the 10th. If the date is equal to 'now' or is less
  than or equal to the current date and time, the current invoice will be
  executed in real-time.

  <p>
    Check out this article for more information about
    <a href="http://support.cheddargetter.com/kb/api-8/using-paypal-with-the-api">
    using the API with PayPal
    </a>.
  </p>

</aside>

### Update a Customer Only

Update an existing customer's information in the product with
`productCode=MY_PRODUCT_CODE`

`/customers/edit-customer/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Required | Description
---- | -------- | -----------
firstName | No | Limited to 20 characters
lastName | No | Limited to 20 characters
email | No | Valid email address
Company | No | Limited to 60 characters
notes | No | Limited to 255 characters
metaData[&lt;user-defined&gt;] | No | See the [KB Article](http://support.cheddargetter.com/kb/api-8/customer-meta-data) about customer metadata
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

## Subscriptions

### Update a Subscription Only

UUpdate an existing customer's subscription information in the product with
`productCode=MY_PRODUCT_CODE`

`/customers/edit-subscription/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Required | Description
---- | -------- | -----------
method | No | "cc" (default) or "paypal"
planCode | No | Your code for the subscribed plan
couponCode | No | Coupon code you'd like to apply to the subscription
ccNumber | No (see notes) | Numbers only -- a valid credit/debit card number
ccExpiration | No (see notes) | MM/YYYY - the expiration date for the credit card
ccCardCode | No (see notes) | 3-4 digits - The Card Verification Value (CCV).
ccFirstName | No (see notes) | Limited to 20 characters
ccLastName | No (see notes) | Limited to 20 characters
ccCompany | No | Limited to 50 characters
ccCountry | No | Limited to 60 characters. Many billing solutions require that the ISO 2 char codes are used.
ccAddress | No | Limited to 60 characters
ccCity | No | Limited to 40 characters
ccState | No | Limited to 40 characters. 2 character state/province codes are suggested when country is US/Canada.
ccZip | No (see notes) | Limited to 20 characters
returnUrl | Conditional. Required when method is paypal. | Must be a valid URL. Only used when method is paypal. This is the location where subscriber is returned from paypal after accepting a preapproval.
cancelUrl | Conditional. Required when method is paypal. | Must be a valid URL. Only used when method is paypal. This is the location where subscriber is returned from paypal after declining a preapproval.
changeBillDate | No | Date or datetime in ISO 8601 format. (e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). You may also use the word 'now' as shorthand for the current datetime.
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

<aside class="notice">

  If the customer does not already have a subscription with a valid credit card,
  all credit card information is required. If the plan code corresponds to a
  "free" plan, no credit card data is required. If the customer already has a
  subscription with a credit card, no credit card information data is required.
  In this instance, any subset of credit card data may be provided. Your
  preferences still apply for <code>ccCardCode</code> and <code>ccZip</code>.
<br/>
<br/>
<p>
  If the plan is a paid plan, credit card information is only required if you
  have configured CheddarGetter to require it. It can be optional only if the
  next invoice is delayed. If a subscription on a paid plan does not have a credit
  card when it comes time to bill, the subscription will be auto-cancelled.
  See the email templates <a href="http://support.cheddargetter.com/kb/operational-how-tos/email-notification-templates">KB Article</a> regarding free trials and the <em>Bill Reminder</em> email.
</p>

<p>
  Changing the next bill date using <code>subscription[changeBillDate]</code>
  effects the billing cycle. Subsequent bill dates will be on the new cycle.
  In other words, for a monthly plan that typically bills on the 3rd of every
  month, if the next bill date is changed to the 10th, the subscription will
  now bill every month on the 10th. If the date is equal to 'now' or is less
  than or equal to the current date and time, the current invoice will be
  executed in real-time.

  <p>
    Check out this article for more information about
    <a href="http://support.cheddargetter.com/kb/api-8/using-paypal-with-the-api">
    using the API with PayPal
    </a>.
  </p>

</aside>

### Cancel a Customer's Subscription

Cancel an existing customer's subscription in the product with
`productCode=MY_PRODUCT_CODE`

`/customers/cancel/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

<aside class="notice">
  The customer's current subscription will be canceled at the moment this call
  is made. If you would like to reactivate a customer's subscription, you may do
  so by updating the subscription with full credit card data.
</aside>

## Tracked Items

### Add Item quantity

Increment a customer's current usage of a single item in the product with
`productCode=MY_PRODUCT_CODE`

`/customers/add-item-quantity/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE/itemCode/MY_ITEM_CODE`

Name | Required | Description
---- | -------- | -----------
quantity | No | The positive amount accurate to up to 4 decimal places (if other that 1.0000) that you wish to add to the current usage for this item.
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

<aside class="notice">
  <code>quantity</code> is only required if you wish to add more than one to
  the current usage amount.
</aside>

### Remove Item Quantity

Decrement a customer's current usage of a single item in the product with
`productCode=MY_PRODUCT_CODE`

`/customers/remove-item-quantity/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE/itemCode/MY_ITEM_CODE`

Name | Required | Description
---- | -------- | -----------
quantity | No | The positive amount accurate to up to 4 decimal places (if other that 1.0000) that you wish to add to the current usage for this item.
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

<aside class="notice">
  <code>quantity</code> is only required if you wish to subtract more than one from
  the current usage amount.
</aside>

### Set Item Quantity

Set a customer's current usage of a single item in the product with
`productCode=MY_PRODUCT_CODE`

`/customers/set-item-quantity/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE/itemCode/MY_ITEM_CODE`

Name | Required | Description
---- | -------- | -----------
quantity | Yes | The positive amount accurate to up to 4 decimal places (if other than 1.0000) that you wish to add to the current usage for this item. Can be zero.
invoicePeriod | No | The billing period - 'current' (the default) or 'outstanding'. [See below](#current-vs-outstanding-invoice).
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

## Invoice Interactions

### Add a Custom Charge/Credit

Add an arbitrary charge or credit to the customer's current invoice in the product
with `productCode=MY_PRODUCT_CODE`

`/customers/add-charge/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Required | Description
---- | -------- | -----------
chargeCode | Yes | Your code for this charge. Limited to 36 characters.
quantity | Yes | Positive integer quantity
eachAmount | Yes | Positive or negative integer or float with two digit decimal precision. A positive number will create a charge (debit). A negative number will create a credit.
description | No | Description for this charge/credit
invoicePeriod | No | The billing period - 'current' (the default) or 'outstanding'. [See below](#current-vs-outstanding-invoice).
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

### Delete a Custom Charge/Credit

Remove a charge or credit from the customer's current invoice in the product
with `productCode=MY_PRODUCT_CODE`

`/customers/delete-charge/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Required | Description
---- | -------- | -----------
chargeId | Yes | CheddarGetter's ID for the charge/credit
invoicePeriod | No | The billing period - 'current' (the default) or 'outstanding'. [See below](#current-vs-outstanding-invoice).
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

### Create a One-Time Invoice

Create a parallel one-time invoice and execute the transaction immediately using
the customer's current payment method in the product with `productCode=MY_PRODUCT_CODE`

`/invoices/new/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Required | Description
---- | -------- | -----------
charges[&lt;user-defined&gt;][chargeCode] | Yes | Your code for this charge. Limited to 36 characters.
charges[&lt;user-defined&gt;][quantity] | Yes | Positive integer quantity
charges[&lt;user-defined&gt;][eachAmount] | Yes | Positive or negative integer or float with two digit decimal precision. A positive number will create a charge (debit). A negative number will create a credit.
charges[&lt;user-defined&gt;][description] | No | Description for this charge/credit
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

<aside class="notice">
  At least one charge is required. Multiple charges may be submitted.
</aside>

### Run an Outstanding Invoice

Execute an outstanding invoice in the product with `productCode=MY_PRODUCT_CODE`

`/customers/run-outstanding/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Required | Description
---- | -------- | -----------
ccCardCode | No | 3-4 digits - The Card Verification Value (CCV).
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

<aside class="notice">
  The customer must have an outstanding invoice. This method can be useful for
  manually retrying the transaction on an outstanding invoice. An invoice may
  be outstanding if all prior attempts to transact the invoice were unsuccessful
  or if the invoice has not yet been attempted as with the <a href="http://support.cheddargetter.com/kb/operational-how-tos/web-hooks-service-hooks-and-captain-hooks#subscription-billable">
  Subscription Billable Event
  </a>.
  <br/>
  <br/>
  <p>
    This method can be used to reactivate a canceled subscription. If the retry
    succeeds on a canceled subscription, the subscription is reactivated. You
    can also add credits to the invoice to offset charges, making the invoice
    amount = 0. In this case, executing that outstanding invoice will succeed
    for a zero amount and reactivate the subscription.
  </p>
</aside>

### Issue a Refund

Refund a transaction on a billed invoice in the product with `productCode=MY_PRODUCT_CODE`

`/invoices/refund/productCode/MY_PRODUCT_CODE`

Name | Required | Description
---- | -------- | -----------
number or id | Yes | Either CheddarGetter's ID for the invoice or the CheddarGetter-generated invoice number
amount | Yes | An amount less than or equal to the refundable amount. See notes.
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

<aside class="notice">
  Many billing solutions allow for partial refunds. If your billing solution
  allows partial refunds, the amount may be less than the amount of the original
  transaction. If the transaction had been previously refunded and you wish to
  issue another refund, the amount must be less than or equal to the original
  amount minus any previously issued partial refund amounts.
  <br/>
  <br/>
  <p>
    Some billing solutions allow for refunds prior to transaction settlement.
    If your billing solution does not allow refunds prior to settlement, you
    must execute a void of the full transaction or wait until after settlement
    occurs to issue a refund.
  </p>
</aside>

### Issue a Void

Void a transaction on a billed invoice in the product with `productCode=MY_PRODUCT_CODE`

`/invoices/void/productCode/MY_PRODUCT_CODE`

Name | Required | Description
---- | -------- | -----------
number or id | Yes | Either CheddarGetter's ID for the invoice or the CheddarGetter-generated invoice number
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

<aside class="notice">
  Some billing solutions allow for voids. If your billing solution allows
  voids, a void can only be executed prior to transaction settlement.
</aside>

### Issue a Void or Refund

Defer to CheddarGetter to decide if a void or a refund is executed against
the invoice in the product with  `productCode=MY_PRODUCT_CODE`

`/invoices/void-or-refund/productCode/MY_PRODUCT_CODE`

Name | Required | Description
---- | -------- | -----------
number or id | Yes | Either CheddarGetter's ID for the invoice or the CheddarGetter-generated invoice number
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

<aside class="notice">
  Many billing solutions do not allow for voids. Voids are only possible for a
  short period of time after the transaction is executed. In short, determining
  whether to execute a void or a refund is a moving target. Fortunately, CheddarGetter
  has already figured that out. Using this call makes voids and refunds simple.
  A drawback of using this method is that partial refunds are not possible.
</aside>

### Send or Resend an Invoice email

Send (or resend) email notification for the invoice in the product
with  `productCode=MY_PRODUCT_CODE`

`/invoices/send-email/productCode/MY_PRODUCT_CODE`

Name | Required | Description
---- | -------- | -----------
number or id | Yes | Either CheddarGetter's ID for the invoice or the CheddarGetter-generated invoice number
remoteAddress | No ([see below](#fraud-protection-rate-limiting)) | Client IPv4 address

<aside class="notice">
  Email notifications must be enabled in your account.
  <a href="https://cheddargetter.com/admin/emails">
    Check your settings here
  </a>.
  <br/>
  <br/>
  <p>
    Emails are automatically sent but if you'd like to resend one, just use this
    method. The most recent relevant email will be sent for the invoice. For
    example, if the most recent transaction was declined, the decline email is
    sent. If that most recent transaction was approved, the payment receipt email
    is sent.
  </p>
</aside>

## Promotions

### Get all Promotions

Get all promotion data from the product with  `productCode=MY_PRODUCT_CODE`

`/promotions/get/productCode/MY_PRODUCT_CODE`

### Get a Single Promotions

Get the promotion data from the product with  `productCode=MY_PRODUCT_CODE` for
the promotion with coupon `code=MY_COUPON_CODE`

`/promotions/get/productCode/MY_PRODUCT_CODE/code/MY_COUPON_CODE`
