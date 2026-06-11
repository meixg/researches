# Advanced Sales Dashboard

Welcome to the advanced Evidence demo. This page showcases interactive inputs, query chaining, and advanced components.

## Overview

```sql total_sales
select sum(amount) as total from sample_data.orders
```

```sql order_count
select count(*) as count from sample_data.orders
```

<div class="grid grid-cols-2 gap-4">
    <BigValue data={total_sales} value=total fmt=usd title="Total Sales"/>
    <BigValue data={order_count} value=count title="Total Orders"/>
</div>

---

## Interactive Exploration

Select a category to filter the analysis:

<Dropdown name=category_filter title="Select Category">
    <DropdownOption valueLabel="All Categories" value="%"/>
    <DropdownOption value="Electronics"/>
    <DropdownOption value="Clothing"/>
    <DropdownOption value="Home"/>
</Dropdown>

```sql filtered_sales
select
    order_date,
    sum(amount) as daily_sales
from sample_data.orders
where category like '${inputs.category_filter.value}'
group by 1
order by 1
```

<LineChart
    data={filtered_sales}
    x=order_date
    y=daily_sales
    title="Daily Sales Trend"
/>

---

## Query Chaining

This section demonstrates how one query can build upon another.

```sql sales_by_customer_raw
select
    customer_id,
    sum(amount) as sales
from sample_data.orders
group by 1
```

```sql customers_with_sales
-- Chaining: Joining orders summary with customer details
select
    c.name,
    c.segment,
    s.sales
from ${sales_by_customer_raw} s
join sample_data.customers c on s.customer_id = c.customer_id
order by s.sales desc
```

<BarChart
    data={customers_with_sales}
    x=name
    y=sales
    series=segment
    title="Sales by Customer and Segment"
/>

---

## Conditional Rendering

{#if inputs.category_filter.value !== '%'}
    ### Focus on {inputs.category_filter.label}
    You are currently viewing a deep-dive into the {inputs.category_filter.label} category.
{:else}
    ### Multi-Category View
    Showing aggregated data across all product lines.
{/if}

---

## Data Table with Search

<DataTable data={customers_with_sales} search=true sortable=true/>
