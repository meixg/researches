# ECharts Y-Axis Compression - Research Notes

## Project Started: 2026-01-16

### Initial Research

Found Stack Overflow question about hiding Y-axis labels except min/max values in ECharts.
Link: https://stackoverflow.com/questions/77436703/how-to-hide-the-y-axis-except-min-max-in-echarts

**Key Solution Found:**
Use `axisLabel.formatter` function to conditionally show/hide labels.

```javascript
yAxis: {
    type: "log",
    min: 1,
    max: 625,
    logBase: 5,
    axisLabel: {
        formatter: function(value, index) {
            // Show only min and max
            if (value === 1 || value === 625) {
                return value;
            }
            return '';  // Hide other labels
        }
    }
}
```

### Methods Investigated

1. **formatter Function** (Most Flexible)
   - Can conditionally show/hide labels based on value, index, or custom logic
   - Works with all axis types (value, log, time, category)
   - Can return empty string to hide labels

2. **interval Property**
   - Controls the interval between axis labels
   - Useful for showing every Nth label
   - Example: `interval: 2` shows every 2nd label

3. **splitNumber Property**
   - Controls the number of segments in the axis
   - Works with automatic scale calculation
   - Example: `splitNumber: 4` divides axis into 4 segments

4. **Dual Y-Axes** (Advanced)
   - Can create break-axis effect
   - Useful for showing data with widely different ranges
   - Each series can use different yAxisIndex

5. **Logarithmic Scale**
   - Good for data with exponential growth
   - Use `type: 'log'` with `logBase` property
   - Can combine with formatter to hide middle labels

### Implementation Details

**File 1: index.html**
- Created 5 different chart examples
- Each demonstrates a different technique
- Includes visual descriptions for each method

**File 2: advanced.html**
- Advanced techniques including:
  - Dynamic label filtering based on value ranges
  - Break axis effect using two Y-axes
  - Custom tick marks with visual compression

### Key Learnings

1. **ECharts doesn't have a built-in "break axis" or "axis gap" feature**
   - Must use workarounds like formatter or dual axes

2. **The formatter function is the most powerful tool**
   - Gives complete control over label display
   - Can implement any custom logic

3. **Consider user experience when hiding labels**
   - Too few labels can make the chart hard to read
   - Log scales without labels are especially confusing
   - Always consider showing at least min/max values

4. **Performance considerations**
   - Formatter functions are called for each label
   - Keep logic simple to avoid performance issues

### Challenges Encountered

1. **Finding comprehensive documentation**
   - ECharts documentation is extensive but not always clear
   - Stack Overflow was more helpful for specific use cases

2. **No native "break axis" feature**
   - Had to implement creative workarounds
   - Dual Y-axis approach is complex but effective

3. **Balancing readability with compression**
   - Too much compression makes charts hard to interpret
   - Need to find the right balance for each use case

### Code Quality Notes

- All HTML files are self-contained with embedded CSS and JavaScript
- Used CDN for ECharts library (v5.4.3)
- Added responsive resize handlers
- Used consistent styling across all charts
- Included comments and descriptions for clarity

---

## MAJOR DISCOVERY: ECharts 6.0 Native Broken Axis Support (2026-01-16)

### Breaking News!

After further research, discovered that **ECharts 6.0+ has native support for broken axis functionality**!

This is exactly what the user was asking for - not just hiding labels, but actually removing parts of the axis with a visual gap effect.

### Key Discovery Resources

1. **ECharts 6.0 New Features Documentation**
   - Source: https://echarts.apache.org/handbook/en/basics/release-note/v6-feature/
   - Introduces "broken axis" (坐标轴断裂) feature
   - Creates "torn paper" visual effect in the gap area

2. **Chinese Implementation Guide**
   - Source: https://blog.csdn.net/gitblog_00868/article/details/152102924
   - Comprehensive tutorial with code examples
   - Published: September 26, 2025

3. **GitHub Issues**
   - Issue #12790: Request for axis break support
   - Issue #21202: Missing broken-axis documentation

### Core Implementation: `axis.breaks`

```javascript
yAxis: {
    type: 'value',
    breaks: [
        {
            start: 1500,      // Start value of break
            end: 6500,        // End value of break
            gap: 30           // Gap width in pixels (or percentage like '20%')
        }
    ]
}
```

### Advanced Styling with `breakArea`

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

### Key Features

1. **Visual Gap Effect**: The middle part of the axis actually disappears
2. **Multiple Breaks**: Can have multiple break intervals
3. **Customizable Gap Width**: In pixels or percentage
4. **Zigzag/Torn Effect**: Visual indication of data discontinuity
5. **Interactive Control**: Can expand/collapse breaks programmatically

### New File Created

**File 3: broken-axis-demo.html**
- Demonstrates ECharts 6.0+ native broken axis feature
- 5 examples showing different configurations:
  1. Standard chart (baseline)
  2. Single break
  3. Multiple breaks
  4. Custom zigzag styling
  5. Percentage gap width

### Comparison: Old vs New Approach

**Old Approach (formatter, dual axes):**
- Only hides labels, axis remains continuous
- Data values still rendered on continuous scale
- Complex workarounds needed

**New Approach (axis.breaks):**
- Actually removes part of the axis
- Creates visual gap in the chart
- Native, clean implementation
- Built-in visual effects (zigzag/torn paper)

### Requirements

- **ECharts 6.0 or higher** required
- Current demo uses v5.4.3 CDN (will need to update)
- Feature may not work in older versions

### API Methods

```javascript
// Collapse break area
chart.dispatchAction({
    type: 'collapseAxisBreak',
    yAxisIndex: 0,
    breaks: [{ start: 1500, end: 6500 }]
});

// Expand break area
chart.dispatchAction({
    type: 'expandAxisBreak',
    yAxisIndex: 0,
    breaks: [{ start: 1500, end: 6500 }]
});
```

### Use Cases Perfect for Broken Axis

1. **Extreme values**: Sales data with one product having 100x sales
2. **Time series gaps**: Stock market (trading days vs weekends)
3. **Multi-tier data**: Data clustered in different ranges
4. **Outlier handling**: Statistical data with extreme outliers

### Important Notes

⚠️ **Version Requirement**: Must use ECharts 6.0+
- Current CDN link in demos is v5.4.3 (needs update)
- Check browser console for errors if breaks don't work

⚠️ **Data Integrity**: The break doesn't change data values
- Only visual representation is affected
- Tooltips still show actual values

⚠️ **User Experience**: Consider providing toggle controls
- Let users expand/collapse breaks
- Helps maintain data context
