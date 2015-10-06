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
--------- | ------- | -----------
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
--------- | ------- | -----------
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
<p>
  If the plan is free, only <code>code</code>, <code>firstName</code>, <code>lastName</code>, <code>email</code> and
  <code>subscription[planCode]</code> are required. If the plan is a paid plan, credit card
  information is only required if you have configured CheddarGetter to require it.
  It can be optional only if the first invoice on a pricing plan is delayed. If a
  subscription on a paid plan does not have a payment method when it comes time to
  bill, the subscription will be auto-cancelled. See the the email templates
  <a href="http://support.cheddargetter.com/kb/operational-how-tos/email-notification-templates">KB Article</a>
  regarding free trials and the *Bill Reminder* email.
</p>
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
  Check out this article for more information about <a href="http://support.cheddargetter.com/kb/api-8/using-paypal-with-the-api">using the API with PayPal</a>.
</p>

</aside>
