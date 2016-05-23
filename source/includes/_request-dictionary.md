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

Name | Description
---- | -----------
`subscriptionStatus` | "activeOnly" or "canceledOnly"
`planCode[]` | Your pricing plan code. This is an array and may be provided multiple times to filter by multiple plans.
`createdAfterDate` | YYYY-MM-DD
`createdBeforeDate` | YYYY-MM-DD
`canceledAfterDate` | YYYY-MM-DD
`canceledBeforeDate` | YYYY-MM-DD
`transactedAfterDate` | YYYY-MM-DD
`transactedBeforeDate` | YYYY-MM-DD
`orderBy` | "name" (default), "company", "plan", "billingDatetime" or "createdDatetime"
`orderByDirection` | "asc" (default) or "desc"
`search` | Text search customer name, company, email address and last four digits of credit card.

<aside class="notice">
As in all date and time related operations, the timezone used is the timezone set
for the authenticated user. Dates are inclusive. e.g. assuming timezone for the
authenticated user is set to UTC, 2010-07-04 <= X <= 2010-08-04 is interpreted
as 2010-07-04T00:00:00+00:00 <= X <= 2010-08-04T23:59:59+00:00.
</aside>


### Get a Single Customer

> Get a Single Customer

```shell
curl -u "<username>:<API key>" \
https://cheddargetter.com/xml/customers/get/productCode/MY_PRODUCT_CODE/code/canceled_reactivate
```

```php
$customer = $client->getCustomer('canceled_reactivate');

// get current subscription
$subscription = $customer->getCustomerSubscription();

// is this customer's account active?
$customerIsActive = $customer->getCustomerIsActive();

// get the customer's current subscribed pricing plan
$plan = $customer->getCustomerPlan();

// get the customer's current/pending invoice
$invoice = $customer->getCustomerInvoice();

// See CheddarGetter_Response for more convenience methods
```

```ruby
client.get_customer(:code => 'canceled_reactivate')
```

Get the customer data from the product with `productCode=MY_PRODUCT_CODE`
for the customer with `code=MY_CUSTOMER_CODE` (or by id or `invoiceNumber`).

`/customers/get/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

`/customers/get/productCode/MY_PRODUCT_CODE/invoiceNumber/1`

`/customers/get/productCode/MY_PRODUCT_CODE/id/CG_CUSTOMER_ID`

### Create a New Customer

> Create a customer with a credit card

```shell
curl -d "code=MY_CUSTOMER_CODE&firstName=Example" \
-d "lastName=Customer&email=example_customer@example.com" \
-d "subscription[planCode]=FREE" \
-d "subscription[ccFirstName]=Example" \
-d "subscription[ccLastName]=Customer" \
-d "subscription[ccNumber]=4111111111111111" \
-d "subscription[ccExpiration]=04/2017" \
-u "<username>:<API key>" \
https://cheddargetter.com/xml/customers/new/productCode/MY_PRODUCT_CODE
```

```php
$data = array(
	'code'      => 'MY_CUSTOMER_CODE',
	'firstName' => 'Example',
	'lastName'  => 'Customer',
	'email'     => 'example_customer@example.com',
	'subscription' => array(
		'planCode'      => 'FREE',
		'ccFirstName'   => 'Example',
		'ccLastName'    => 'Customer',
		'ccNumber'      => '4111111111111111',
		'ccExpiration'  => '04/2017',
	)
);
$customer = $client->newCustomer($data);
```

```ruby
client.new_customer(
  :code      => 'MY_CUSTOMER_CODE',
  :firstName => 'Example',
  :lastName  => 'Customer',
  :email     => 'example_customer@example.com',
  :subscription => {
    :planCode     => 'FREE',
    :ccFirstName  => 'Example',
    :ccLastName   => 'Customer',
    :ccNumber     => '4111111111111111',
    :ccExpiration => '04/2017'
  }
)
```
> Create a customer without payment

```shell
curl -d "code=MY_CUSTOMER_CODE&firstName=Example" \
-d "lastName=Customer&email=example_customer@example.com" \
-d "subscription[planCode]=FREE" \
-u "<username>:<API key>" \
https://cheddargetter.com/xml/customers/new/productCode/MY_PRODUCT_CODE
```

```php
$data = array(
	'code'      => 'MY_CUSTOMER_CODE',
	'firstName' => 'Example',
	'lastName'  => 'Customer',
	'email'     => 'example_customer@example.com',
	'subscription' => array(
		'planCode'      => 'FREE'
	)
);
$customer = $client->newCustomer($data);
```

```ruby
client.new_customer(
  :code      => 'MY_CUSTOMER_CODE',
  :firstName => 'Example',
  :lastName  => 'Customer',
  :email     => 'example_customer@example.com',
  :subscription => {
    :planCode     => 'FREE'
  }
)
```

Create a new customer in the product with  `productCode=MY_PRODUCT_CODE`
and subscribe the customer to a pricing plan.

`/customers/new/productCode/MY_PRODUCT_CODE`

Name | Description
---- | -----------
`code` | **Required** Your code for this customer. Limited to 255 characters.
`firstName` | **Required** Limited to 40 characters
`lastName` | **Required** Limited to 40 characters
`email` | **Required** Valid email address
`company` |  Limited to 60 characters
`isVatExempt` | 1 or 0
`vatNumber` | If the customer is geographically eligible to be taxed and is exempt, provide the exemption number if applicable. Limited to 32 characters
`notes` | Limited to 255 characters
`firstContactDatetime` | Date or datetime in ISO 8601 format.(e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`referer` | A valid URL referer. Limited to 255 characters. See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignTerm` | The "term" or "keyword" phrase that lead a potential customer to your site. Google Adwords equivalent: "utm_term". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignName` | The name of the marketing campaign. Google Adwords equivalent: "utm_campaign". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignSource` | The source of the lead. Google Adwords equivalent: "utm_source". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignMedium` | The medium used to find your site. Google Adwords equivalent: "utm_medium". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignContent` | The content you wish to track. Google Adwords equivalent: "utm_content". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`metaData[<user-defined>]` | See the [KB Article](http://support.cheddargetter.com/kb/api-8/customer-meta-data) about customer metadata
`subscription[planCode] `| **Required** Your code for the subscribed pricing plan
`subscription[initialBillDate]` | Date or datetime in ISO 8601 format. (e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). Date on which you would like the customers first invoice to be billable. This option overrides the pricing plan default. Must either be today's date (run invoice immediately) or a future date.
`subscription[method]` | "cc" (default) or "paypal"
`subscription[ccNumber]` | **Conditional (See Notes)** Numbers only -- a valid credit/debit card number
`subscription[ccExpiration]` | **Conditional (See Notes)** MM/YYYY - the expiration date for the credit card
`subscription[ccCardCode]` | **Conditional. If plan is free, not required. If your preference is to require the `cardCode`, required. Not required when method is paypal.** 3-4 digits - The Card Verification Value (CCV).
`subscription[ccFirstName]` | **Conditional (See Notes)** Limited to 40 characters
`subscription[ccLastName]` | **Conditional (See Notes)** Limited to 40 characters
`subscription[ccCompany]` | Limited to 60 characters
`subscription[ccCountry]` | Limited to 60 characters. Many billing solutions require that the ISO 2 char codes are used.
`subscription[ccAddress]` | Limited to 60 characters
`subscription[ccCity]` | Limited to 40 characters
`subscription[ccState]` | Limited to 40 characters. 2 character state/province codes are suggested when country is US/Canada.
`subscription[ccZip]` | Limited to 20 characters
`subscription[returnUrl]` | **Conditional. Required when method is PayPal.** Must be a valid URL. Only used when method is paypal. This is the location where subscriber is returned from paypal after accepting a preapproval.
`subscription[cancelUrl]` | **Conditional. Required when method is PayPal.** Must be a valid URL. Only used when method is paypal. This is the location where subscriber is returned from paypal after declining a preapproval.
`charges[<user-defined>][chargeCode]` | **Not Required (See Notes)** Your code for this charge. Limited to 36 characters.
`charges[<user-defined>][quantity]` | **Not Required (See Notes)** Positive integer quantity
`charges[<user-defined>][eachAmount]` | **Not Required (See Notes)** Positive or negative integer or float with two digit decimal precision. A positive number will create a charge (debit). A negative number will create a credit.
`charges[<user-defined>][description]` | Description for this charge/credit
`items[<user-defined>][itemCode]` | **Not Required (See Notes)** Your code for this tracked item. Limited to 36 characters.
`items[<user-defined>][quantity]` | **Not Required (See Notes)** The positive amount accurate to up to 4 decimal places that you wish to set the current usage to for this item. Can be zero.
`remoteAddress` | **Not Required ([See Below](#fraud-protection-rate-limiting))** Client IPv4 address

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

Name | Description
---- | -----------
`code` | **Required** Your code for this customer. Limited to 255 characters.
`gatewayToken` | **Conditional** The gateway reference code. Limited to 255 characters.
`firstName` | **Required** Limited to 40 characters
`lastName` | **Required** Limited to 40 characters
`email` | **Required** Valid email address
`company` | Limited to 60 characters
`isVatExempt` | 1 or 0
`vatNumber` | If the customer is geographically eligible to be taxed and is exempt, provide the exemption number if applicable. Limited to 32 characters
`notes` | Limited to 255 characters
`firstContactDatetime` | Date or datetime in ISO 8601 format. (e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`referer` | A valid URL referer. Limited to 255 characters. See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignTerm` | The "term" or "keyword" phrase that lead a potential customer to your site. Google Adwords equivalent: "utm_term". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignName` | The name of the marketing campaign. Google Adwords equivalent: "utm_campaign". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignSource` | The source of the lead. Google Adwords equivalent: "utm_source". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignMedium` | The medium used to find your site. Google Adwords equivalent: "utm_medium". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignContent` | The content you wish to track. Google Adwords equivalent: "utm_content". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`metaData[<user-defined>]` | See the [KB Article](http://support.cheddargetter.com/kb/api-8/customer-meta-data) about customer metadata
`subscription[initialBillDate]` | **Required** Date or datetime in ISO 8601 format. (e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). Date on which you would like the customers first invoice to be billable. This option overrides the pricing plan default. Must either be today's date (run invoice immediately) or a future date.
`subscription[ccType] `| **Conditional** visa, mc, disc, amex, diners, jcb, unk. If you specify a `subscription[gatewayToken]`, this is required.
`subscription[ccLastFour]` | **Conditional** Numbers only -- last four digits of credit/debit card number. If you specify a `subscription[gatewayToken]`, this is required.
`subscription[ccExpiration]` | **Conditional** MM/YYYY - the expiration date for the credit/debit card. If you specify a subscription[gatewayToken], this is required.
`subscription[ccFirstName]` | **Conditional** Limited to 40 characters. If you specify a subscription[gatewayToken], this is required.
`subscription[ccLastName]` | **Conditional** Limited to 40 characters. If you specify a subscription[gatewayToken], this is required.
`subscription[ccCompany]` | Limited to 60 characters
`subscription[ccCountry]` | Limited to 60 characters. Many billing solutions require that the ISO 2 char codes are used.
`subscription[ccAddress]` | Limited to 60 characters
`subscription[ccCity]` | Limited to 40 characters
`subscription[ccState]` | Limited to 40 characters. 2 character state/province codes are suggested when country is US/Canada.
`subscription[ccZip] `| Limited to 20 characters
`charges[<user-defined>][chargeCode]` | **Not Required (See Notes)** Your code for this charge. Limited to 36 characters.
`charges[<user-defined>][quantity]` | **Not Required (See Notes)** Positive integer quantity
`charges[<user-defined>][eachAmount]` | **Not Required (See Notes)** Positive or negative integer or float with two digit decimal precision. A positive number will create a charge (debit). A negative number will create a credit.
`charges[<user-defined>][description]` | Description for this charge/credit
`items[<user-defined>][itemCode]` | **Not Required (See Notes)** Your code for this tracked item. Limited to 36 characters.
`items[<user-defined>][quantity]` | **Not Required (See Notes)** The positive amount accurate to up to 4 decimal places that you wish to set the current usage to for this item. Can be zero.

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

> Update a Customer and Subscription

```shell
curl -d "firstName=New&lastName=Info&email=new_info@example.com" \
-d "subscription[planCode]=NEW_PLAN_CODE" \
-u "<username>:<API key>" \
https://cheddargetter.com/xml/customers/edit/productCode/MY_PRODUCT_CODE/code/canceled_reactivate
```

```php
$data = array(
	'firstName' => 'New',
	'lastName'  => 'Info',
	'email'     => 'new_info@example.com',
	'subscription' => array(
		'planCode' => 'NEW_PLAN_CODE'
	)
);
$customer = $client->editCustomer('canceled_reactivate', null, $data);
```

```ruby
client.edit_customer(
  {:code      => 'canceled_reactivate'},
  {
    :firstName => 'New',
    :lastName  => 'Info',
    :email     => 'new_info@example.com',
    :subscription => {
      :planCode     => 'NEW_PLAN_CODE'
    }
  }
)
```

> Change Next Bill Date

```shell
curl -d "changeBillDate=2015-12-09" \
-u "<username>:<API key>" \
https://cheddargetter.com/xml/customers/edit-subscription/productCode/MY_PRODUCT_CODE/code/canceled_reactivate
```

```php
$data = array('changeBillDate' => '2015-12-09T09:36:37-05:00');
$customer = $client->editSubscription('canceled_reactivate', null, $data);
```

```ruby
client.edit_subscription(
  {:code      => 'canceled_reactivate'},
  {:changeBillDate     => '2015-12-09T09:36:37-05:00'}
)
```

Update an existing customer's information in the product with
`productCode=MY_PRODUCT_CODE` and modify the subscription information

`/customers/edit/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Description
---- | -----------
`firstName` | Limited to 20 characters.
`lastName` | Limited to 20 characters.
`email` | Valid email address
`company` | Limited to 60 characters
`notes` | Limited to 255 characters
`isVatExempt` | 1 or 0
`vatNumber` | If the customer lives in a VAT eligible country and is exempt, provide the exemption number. Limited to 32 characters
`firstContactDatetime` | Date or datetime in ISO 8601 format. (e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`referer` | A valid URL referer. Limited to 255 characters. See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignTerm` | The "term" or "keyword" phrase that lead a potential customer to your site. Google Adwords equivalent: "utm_term". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignName` | The name of the marketing campaign. Google Adwords equivalent: "utm_campaign". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignSource` | The source of the lead. Google Adwords equivalent: "utm_source". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignMedium` | The medium used to find your site. Google Adwords equivalent: "utm_medium". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`campaignContent` | The content you wish to track. Google Adwords equivalent: "utm_content". See the [KB Article](http://support.cheddargetter.com/faqs/marketing-metrics/marketing-metrics)
`metaData[<user-defined>]` | See the [KB Article](http://support.cheddargetter.com/kb/api-8/customer-meta-data) about customer metadata
`subscription[method]` | "cc" (default) or "paypal"
`subscription[planCode]` | Your code for the subscribed pricing plan
`subscription[couponCode]` | Coupon code for the promotion you'd like to apply to the subscription
`subscription[ccNumber]` | **Not Required (See Notes)** Numbers only -- a valid credit/debit card number
`subscription[ccExpiration]` | **Not Required (See Notes)** MM/YYYY - the expiration date for the credit card
`subscription[ccCardCode]` | **Conditional. If plan is free, no. If your preference is to require the cardCode, yes.** 3-4 digits - The Card Verification Value (CCV).
`subscription[ccFirstName]` | **Not Required (See Notes)** Limited to 20 characters
`subscription[ccLastName]` | **Not Required (See Notes)** Limited to 20 characters
`subscription[ccCompany]` | Limited to 50 characters
`subscription[ccCountry]` | Limited to 60 characters. Many billing solutions require that the ISO 2 char codes are used.
`subscription[ccAddress]` | Limited to 60 characters
`subscription[ccCity]` | Limited to 40 characters
`subscription[ccState]` | Suggested when country is US/Canada.
`subscription[ccZip]` | Conditional. If plan is free, no. If your preference is to require the zip, yes. | Limited to 20 characters
`subscription[returnUrl]` | **Conditional. Required when method is paypal.** Must be a valid URL. Only used when method is paypal. This is the location where subscriber is returned from paypal after accepting a preapproval.
`subscription[cancelUrl]` | **Conditional. Required when method is paypal.** Must be a valid URL. Only used when method is paypal. This is the location where subscriber is returned from paypal after declining a preapproval.
`subscription[changeBillDate]` | Date or datetime in ISO 8601 format. (e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). You may also use the word 'now' as shorthand for the current datetime.
`remoteAddress` | **Not Required ([See Below](#fraud-protection-rate-limiting))** Client IPv4 address

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

> Update a Customer

```shell
curl -d "firstName=New&lastName=Name" \
-u "<username>:<API key>" \
https://cheddargetter.com/xml/customers/edit/productCode/MY_PRODUCT_CODE/code/canceled_reactivate
```

```php
$data = array(
	'firstName' => 'New',
	'lastName'  => 'Info',
	'email'     => 'new_info@example.com'
);
$customer = $client->editCustomerOnly('canceled_reactivate', null, $data);
```

```ruby
client.edit_customer_only(
  {:code       => 'canceled_reactivate'},
  {
    :firstName => 'New',
    :lastName  => 'Info',
    :email     => 'new_info@example.com',
    :company   => '',
    :notes     => ''
  }
)
```

Update an existing customer's information in the product with
`productCode=MY_PRODUCT_CODE`

`/customers/edit-customer/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Description
---- | -----------
`firstName` | Limited to 20 characters
`lastName` | Limited to 20 characters
`email` | Valid email address
`Company` | Limited to 60 characters
`notes` | Limited to 255 characters
`metaData[<user-defined>]` | See the [KB Article](http://support.cheddargetter.com/kb/api-8/customer-meta-data) about customer metadata
`remoteAddress` | **Not Required ([See Below](#fraud-protection-rate-limiting))** Client IPv4 address

## Subscriptions

### Update a Subscription Only

> Update a Customer's Subscription

```shell
curl -d "planCode=NEW_PLAN_CODE" \
-u "<username>:<API key>" \
https://cheddargetter.com/xml/customers/edit-subscription/productCode/MY_PRODUCT_CODE/code/canceled_reactivate
```

```php
$data = array('planCode' => 'NEW_PLAN_CODE');
$customer = $client->editSubscription('canceled_reactivate', null, $data);
```

```ruby
client.edit_subscription(
  {:code      => 'canceled_reactivate'},
  {:planCode     => 'NEW_PLAN_CODE'}
)
```

Update an existing customer's subscription information in the product with
`productCode=MY_PRODUCT_CODE`

`/customers/edit-subscription/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Description
---- | -----------
`method` | "cc" (default) or "paypal"
`planCode` | Your code for the subscribed plan
`couponCode` | Coupon code you'd like to apply to the subscription
`ccNumber` | **Not Required (See Notes)** Numbers only -- a valid credit/debit card number
`ccExpiration` | **Not Required (See Notes)** MM/YYYY - the expiration date for the credit card
`ccCardCode` | **Not Required (See Notes)** 3-4 digits - The Card Verification Value (CCV).
`ccFirstName` | **Not Required (See Notes)** Limited to 20 characters
`ccLastName` | **Not Required (See Notes)** Limited to 20 characters
`ccCompany` | Limited to 50 characters
`ccCountry` | Limited to 60 characters. Many billing solutions require that the ISO 2 char codes are used.
`ccAddress` | Limited to 60 characters
`ccCity` | Limited to 40 characters
`ccState` | Limited to 40 characters. 2 character state/province codes are suggested when country is US/Canada.
`ccZip` | **Not Required (See Notes)** Limited to 20 characters
`returnUrl` | **Conditional. Required when method is paypal.** Must be a valid URL. Only used when method is paypal. This is the location where subscriber is returned from paypal after accepting a preapproval.
`cancelUrl` | **Conditional. Required when method is paypal.** Must be a valid URL. Only used when method is paypal. This is the location where subscriber is returned from paypal after declining a preapproval.
`changeBillDate` | Date or datetime in ISO 8601 format. (e.g., 2011-08-01 or 2011-08-01T15:30:00+00:00). You may also use the word 'now' as shorthand for the current datetime.
`remoteAddress` | **Not Required ([See Below](#fraud-protection-rate-limiting))** Client IPv4 address

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

Use the tracked item endpoints to *set*, *increment*, or *decrement* the quantity of
and item for an individual subscription.

[Learn more about using Tracked Items in the Knowledge Base](http://support.cheddargetter.com/kb/pricing-plans/pricing-plan-basics#tracked-items)

**Note:** Updates of item quantities on <em>canceled subscriptions</em> are only possible under a few circumstances:

* The cancellation is the special <code>paypal-wait</code> state and the PayPal preapproval request period is still valid (up to 3 hours)
* The canceled subscription has a pending invoice with a billingDatetime in the future
* The quantity update request is for the outstanding invoice. The request includes the `invoicePeriod` parameter and it is set to `outstanding`

### Add Item Quantity

> Add Item Quantity

```shell
curl -u "<username>:<API key>" \
https://cheddargetter.com/xml/customers/add-item-quantity/productCode/MY_PRODUCT_CODE/code/canceled_reactivate/itemCode/MY_ITEM_CODE
```

```php
$data = array(
	'itemCode' => 'MY_ITEM_CODE'
);

$quantity = $client->addItemQuantity('canceled_reactivate', null, $data);
```

```ruby
client.add_item_quantity(
	{
		:code => 'canceled_reactivate',
		:item_code => 'MY_ITEM_CODE'
	}
)
```

Increment a customer's current usage of a single item in the product with
`productCode=MY_PRODUCT_CODE`

`/customers/add-item-quantity/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE/itemCode/MY_ITEM_CODE`

Name | Description
---- | -----------
`quantity` | The positive amount accurate to up to 4 decimal places (if other that 1.0000) that you wish to add to the current usage for this item.
`remoteAddress` | **Not Required ([See Below](#fraud-protection-rate-limiting))** Client IPv4 address

<aside class="notice">
  <code>quantity</code> is only required if you wish to add more than one to
  the current usage amount.
</aside>

### Remove Item Quantity

> Remove Item Quantity

```shell
curl -u "<username>:<API key>" \
https://cheddargetter.com/xml/customers/remove-item-quantity/productCode/MY_PRODUCT_CODE/code/canceled_reactivate/itemCode/MY_ITEM_CODE
```

```php
$data = array(
	'itemCode' => 'MY_ITEM_CODE'
);

$quantity = $client->removeItemQuantity('canceled_reactivate', null, $data);
```

```ruby
client.remove_item_quantity(
	{
		:code => 'canceled_reactivate',
		:item_code => 'MY_ITEM_CODE'
	}
)
```

Decrement a customer's current usage of a single item in the product with
`productCode=MY_PRODUCT_CODE`

`/customers/remove-item-quantity/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE/itemCode/MY_ITEM_CODE`

Name | Description
---- | -----------
`quantity` | The positive amount accurate to up to 4 decimal places (if other that 1.0000) that you wish to add to the current usage for this item.
`remoteAddress` | **Not Required ([see below](#fraud-protection-rate-limiting))** Client IPv4 address

<aside class="notice">
  <code>quantity</code> is only required if you wish to subtract more than one from
  the current usage amount.
</aside>

### Set Item Quantity

> Set Item Quantity

```shell
curl -d "quantity=1.0000" \
-u "<username>:<API key>" \
https://cheddargetter.com/xml/customers/set-item-quantity/productCode/MY_PRODUCT_CODE/code/canceled_reactivate/itemCode/MY_ITEM_CODE
```

```php
$data = array(
	'itemCode' => 'MY_ITEM_CODE',
	'quantity' => 1.0000
);

$quantity = $client->setItemQuantity('canceled_reactivate', null, $data);
```

```ruby
client.set_item_quantity(
	{
		:code => 'canceled_reactivate',
		:item_code => 'MY_ITEM_CODE'
	},
	{
		:charge_code => 'CHARGE_CODE',
		:quantity => 1.0000,
		:eachAmount => '1'
	}
)
```

Set a customer's current usage of a single item in the product with
`productCode=MY_PRODUCT_CODE`

`/customers/set-item-quantity/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE/itemCode/MY_ITEM_CODE`

Name | Description
---- | -----------
`quantity` | Yes | **Required** The positive amount accurate to up to 4 decimal places (if other than 1.0000) that you wish to add to the current usage for this item. Can be zero.
`invoicePeriod` | The billing period - 'current' (the default) or 'outstanding'. [See below](#current-vs-outstanding-invoice).
`remoteAddress` | **Not Required ([see below](#fraud-protection-rate-limiting))** Client IPv4 address

## Invoice Interactions

### Add a Custom Charge/Credit

> Add a Custom Charge

```shell
curl -d "chargeCode=CHARGE_CODE" \
-d "quantity=3" \
-d "eachAmount=2.50" \
-u "<username>:<API key>" \
https://cheddargetter.com/xml/customers/add-charge/productCode/MY_PRODUCT_CODE/code/canceled_reactivate
```

```php
$data = array(
	'chargeCode' => 'CHARGE_CODE',
	'quantity' => 3,
	'eachAmount' => 2.50,
	'description' => 'Example charge'
);
$customer = $client->addCharge('canceled_reactivate', null, $data);
```

```ruby
client.add_charge(
	{:code => 'canceled_reactivate'},
	{
		:chargeCode => 'CHARGE_CODE',
		:quantity => 3,
		:eachAmount => 2.50,
		:description => 'Example charge'
	}
)
```

> Add a Custom Credit

```shell
curl -d "chargeCode=CREDIT_CODE" \
-d "quantity=2" \
-d "eachAmount=-8.00" \
-u "<username>:<API key>" \
https://cheddargetter.com/xml/customers/add-charge/productCode/MY_PRODUCT_CODE/code/canceled_reactivate
```

```php
$data = array(
	'chargeCode' => 'CHARGE_CODE',
	'quantity' => 3,
	'eachAmount' => 2.50,
	'description' => 'Example charge'
);
$customer = $client->addCharge('canceled_reactivate', null, $data);
```

```ruby
client.add_charge(
	{:code => 'canceled_reactivate'},
	{
		:chargeCode => 'CHARGE_CODE',
		:quantity => 2,
		:eachAmount => -8.00, // set negative value for a credit
		:description => 'Example credit'
	}
)
```

Add an arbitrary charge or credit to the customer's current invoice in the product
with `productCode=MY_PRODUCT_CODE`

`/customers/add-charge/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Description
---- | -----------
`chargeCode` | **Required** Your code for this charge. Limited to 36 characters.
`quantity` | **Required** Positive integer quantity
`eachAmount` | **Required** Positive or negative integer or float with two digit decimal precision. A positive number will create a charge (debit). A negative number will create a credit.
`description` | Description for this charge/credit
`invoicePeriod` | The billing period - 'current' (the default) or 'outstanding'. [See below](#current-vs-outstanding-invoice).
`remoteAddress` | **Not Required ([see below](#fraud-protection-rate-limiting))** Client IPv4 address

### Delete a Custom Charge/Credit

> Delete a Custom Charge/Credit

```shell
curl -d "chargeId=CHARGE_ID" \
-u "<username>:<API key>" \
https://chedddargetter.com/xml/customers/delete-charge/productCode/MY_PRODUCT_CODE/code/canceled_reactivate
```

```php
$data = array(
	'chargeId' => 'CHARGE_ID'
);
$customer = $client->deleteCharge('canceled_reactivate', null, $data);
```

```ruby
client.delete_charge(
	{:code => 'canceled_reactivate'},
	{
		:chargeId => 'CHARGE_ID'
	}
)
```

Remove a charge or credit from the customer's current invoice in the product
with `productCode=MY_PRODUCT_CODE`

`/customers/delete-charge/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Description
---- | -----------
`chargeId` | **Required** CheddarGetter's ID for the charge/credit
`invoicePeriod` | The billing period - 'current' (the default) or 'outstanding'. [See below](#current-vs-outstanding-invoice).
`remoteAddress` | **Not Required ([see below](#fraud-protection-rate-limiting))** Client IPv4 address

### Create a One-Time Invoice

Create a parallel one-time invoice and execute the transaction immediately using
the customer's current payment method in the product with `productCode=MY_PRODUCT_CODE`

`/invoices/new/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Description
---- | -----------
`charges[<user-defined>][chargeCode]` | **Required** Your code for this charge. Limited to 36 characters.
`charges[<user-defined>][quantity]` | **Required** Positive integer quantity
`charges[<user-defined>][eachAmount]` | **Required** Positive or negative integer or float with two digit decimal precision. A positive number will create a charge (debit). A negative number will create a credit.
`charges[<user-defined>][description]` | Description for this charge/credit
`remoteAddress` | **Not Required ([see below](#fraud-protection-rate-limiting))** Client IPv4 address

<aside class="notice">
  At least one charge is required. Multiple charges may be submitted.
</aside>

### Run an Outstanding Invoice

Execute an outstanding invoice in the product with `productCode=MY_PRODUCT_CODE`

`/customers/run-outstanding/productCode/MY_PRODUCT_CODE/code/MY_CUSTOMER_CODE`

Name | Description
---- | -----------
`ccCardCode` | 3-4 digits - The Card Verification Value (CCV).
`remoteAddress` | **Not Required ([see below](#fraud-protection-rate-limiting))** Client IPv4 address

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

Name | Description
---- | -----------
`number` or `id `| **Required** Either CheddarGetter's ID for the invoice or the CheddarGetter-generated invoice number
`amount` | **Required** An amount less than or equal to the refundable amount. See notes.
`remoteAddress` | **Not Required ([see below](#fraud-protection-rate-limiting))** Client IPv4 address

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

Name | Description
---- | -----------
`number` or `id` | **Required** Either CheddarGetter's ID for the invoice or the CheddarGetter-generated invoice number
`remoteAddress` | **Not Required ([see below](#fraud-protection-rate-limiting))** lient IPv4 address

<aside class="notice">
  Some billing solutions allow for voids. If your billing solution allows
  voids, a void can only be executed prior to transaction settlement.
</aside>

### Issue a Void or Refund

Defer to CheddarGetter to decide if a void or a refund is executed against
the invoice in the product with  `productCode=MY_PRODUCT_CODE`

`/invoices/void-or-refund/productCode/MY_PRODUCT_CODE`

Name | Description
---- | -----------
`number` or `id` | **Required** Either CheddarGetter's ID for the invoice or the CheddarGetter-generated invoice number
`remoteAddress` | **Not Required ([see below](#fraud-protection-rate-limiting))** Client IPv4 address

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

Name | Description
---- | -----------
`number` or `id` | **Required** Either CheddarGetter's ID for the invoice or the CheddarGetter-generated invoice number
`remoteAddress` | **Not Required ([see below](#fraud-protection-rate-limiting))** Client IPv4 address

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
