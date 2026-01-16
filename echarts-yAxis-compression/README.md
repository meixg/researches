# ECharts Y-Axis Compression Demo

This project demonstrates various techniques to compress or hide parts of the Y-axis in ECharts bar charts, including the **native broken axis feature** in ECharts 6.0+.

## ⭐ IMPORTANT UPDATE: ECharts 6.0 Native Broken Axis Support

**ECharts 6.0+ now includes native support for broken axis functionality!** This means you can actually **remove parts of the Y-axis** with a visual gap effect - not just hide labels, but create a true "broken" axis where the middle part disappears.

See **[broken-axis-demo.html](broken-axis-demo.html)** for examples using the new `axis.breaks` feature.

## Overview

When working with data that has a large range or outliers, you may want to hide some Y-axis labels or create gaps in the axis to improve readability.

## Files

### [index.html](index.html)
Contains 5 different chart examples, each demonstrating a different technique:

1. **Standard Bar Chart** - Baseline example showing all Y-axis labels
2. **Hide Middle Labels** - Shows only min/max values using `axisLabel.formatter`
3. **Show Every Nth Label** - Reduces label density by showing every Nth label
4. **Custom Interval** - Uses `interval` and `splitNumber` properties
5. **Logarithmic Scale** - Combines log scale with custom formatter for large data ranges

### [advanced.html](advanced.html)
Demonstrates advanced techniques (for ECharts < 6.0):

1. **Dynamic Label Filtering** - Shows labels only in specific value ranges
2. **Break Axis Effect** - Uses dual Y-axes to create a visual break in the axis
3. **Custom Tick Marks** - Visual compression with custom tick patterns

### ⭐ [broken-axis-demo.html](broken-axis-demo.html) **(RECOMMENDED for ECharts 6.0+)**
Demonstrates the **native broken axis feature** in ECharts 6.0+:

1. **Standard Bar Chart** - Baseline comparison
2. **Single Break** - One gap in the Y-axis
3. **Multiple Breaks** - Multiple gaps in different ranges
4. **Custom Zigzag Style** - Torn paper visual effect
5. **Percentage Gap** - Responsive gap width using percentages

This is the **recommended approach** for ECharts 6.0+ users who want true axis gaps!

## Key Techniques

### ⭐ 0. Using Native `axis.breaks` (ECharts 6.0+ - **BEST METHOD**)

**This is the recommended approach for ECharts 6.0+ users!**

```javascript
yAxis: {
    type: 'value',
    breaks: [
        {
            start: 1500,      // Start value of the gap
            end: 6500,        // End value of the gap
            gap: 30           // Gap width in pixels (or '20%' for percentage)
        }
    ]
}
```

**Advanced styling with zigzag effect:**
```javascript
yAxis: {
    breaks: [{ start: 1500, end: 6500, gap: 40 }],
    breakArea: {
        zigzagAmplitude: 5,  // Zigzag intensity (0 = straight line)
        itemStyle: {
            color: 'rgba(255, 0, 0, 0.1)',  // Fill color
            borderType: 'dashed'             // Border style
        }
    }
}
```

**Benefits:**
- ✅ Actually removes part of the axis (not just labels)
- ✅ Creates visual gap in the chart
- ✅ Native, clean implementation
- ✅ Built-in visual effects (zigzag/torn paper)
- ✅ Supports multiple breaks
- ✅ Interactive (expand/collapse programmatically)

**Requirements:**
- ⚠️ ECharts 6.0 or higher
- Current demos use v5.4.3 CDN (will need to update to v6.0+)

### 1. Using `axisLabel.formatter` (For older ECharts versions)

The most flexible approach is to use the `formatter` function:

```javascript
yAxis: {
    type: 'value',
    min: 0,
    max: 600,
    axisLabel: {
        formatter: function(value, index) {
            // Show only min and max
            if (value === 0 || value === 600) {
                return value;
            }
            return '';  // Hide other labels
        }
    }
}
```

### 2. Using `interval` Property

For simpler cases, use the `interval` property:

```javascript
yAxis: {
    type: 'value',
    interval: 150  // Show labels every 150 units
}
```

### 3. Dual Y-Axes for Break Effect

To create a visual break in the axis:

```javascript
yAxis: [
    {
        type: 'value',
        name: 'Low Range',
        min: 0,
        max: 100,
        position: 'left'
    },
    {
        type: 'value',
        name: 'High Range',
        min: 400,
        max: 600,
        position: 'right'
    }
]
```

## Usage

1. Clone or download this repository
2. Open `index.html` or `advanced.html` in a web browser
3. No build process or server required - uses ECharts from CDN

## Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (to load ECharts from CDN)

## Findings

### What Works Well

- **formatter function** - Most flexible and powerful approach
- **interval property** - Simple and effective for regular spacing
- **Dual Y-axes** - Good for distinctly separated data ranges

### Limitations

**ECharts 6.0+:**
- Native `axis.breaks` feature available
- May need to upgrade from older versions

**ECharts < 6.0:**
- No native "break axis" functionality
- Workarounds (formatter, dual axes) only hide labels, don't create true gaps
- Hiding too many labels can make charts hard to read
- Log scales without labels are especially confusing for users
- Always show at least min/max values for context

### Best Practices

1. **Maintain readability** - Don't hide so many labels that the chart becomes ambiguous
2. **Use tooltips** - Ensure tooltips show actual values when labels are hidden
3. **Consider your audience** - Technical audiences may prefer more information
4. **Test with real data** - Different datasets may require different approaches
5. **Document your approach** - Clearly label any non-standard axis treatments

## References

### Native Broken Axis (ECharts 6.0+)
- [ECharts 6.0 New Features - Broken Axis](https://echarts.apache.org/handbook/en/basics/release-note/v6-feature/)
- [ECharts 坐标轴断裂功能实现：大数据差距可视化](https://blog.csdn.net/gitblog_00868/article/details/152102924)
- [GitHub Issue #12790: Echart支持坐标轴中断](https://github.com/apache/echarts/issues/12790)
- [GitHub Issue #21202: Missing "Broken-Axis" Documentation](https://github.com/apache/echarts/issues/21202)

### Traditional Methods
- [Stack Overflow: How to hide the y axis except min max in ECharts?](https://stackoverflow.com/questions/77436703/how-to-hide-the-y-axis-except-min-max-in-echarts)
- [ECharts Documentation](https://echarts.apache.org/en/option.html)

## License

This demo code is free to use and modify for any purpose.
