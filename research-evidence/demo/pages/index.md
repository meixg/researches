# Sales Dashboard

This is a demo Evidence report using SQL and Markdown.

```sql sales_by_customer
select
    customer_id,
    sum(amount) as total_sales
from sample_data.orders
group by 1
order by 2 desc
```

<BarChart
    data={sales_by_customer}
    x=customer_id
    y=total_sales
    title="Sales by Customer"
/>

## Order Details

<DataTable data={sales_by_customer}/>
