# Customer Profile: {customer_details[0].name}

```sql customer_details
select *
from sample_data.customers
where customer_id = '${params.id}'
```

## Segment: {customer_details[0].segment}

### Order History

```sql customer_orders
select *
from sample_data.orders
where customer_id = '${params.id}'
order by order_date desc
```

<DataTable data={customer_orders}/>

### Spending Trend

<LineChart
    data={customer_orders}
    x=order_date
    y=amount
/>

[Back to Dashboard](/)
