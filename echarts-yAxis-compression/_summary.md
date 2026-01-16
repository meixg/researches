ECharts Y-Axis Compression Demo explores multiple strategies to improve readability of bar charts with wide-ranging or outlier data by compressing or breaking the Y-axis. With ECharts 6.0+, the project highlights the new, native `axis.breaks` feature, allowing true axis gaps with customizable styles such as zigzag edges—see [broken-axis-demo.html](broken-axis-demo.html) for practical examples. For older ECharts versions, it details methods like custom label formatting, interval adjustments, and dual axes, which help declutter charts but do not produce visual breaks. Hands-on [demo files](index.html) illustrate both modern and legacy techniques, with a strong recommendation to leverage ECharts 6.0+ for best results.

**Key findings:**
- Native `axis.breaks` (ECharts 6+) enables actual axis gaps, supporting multiple breaks and custom visual effects.
- Formatter functions and interval controls offer flexible, simple label reduction for prior ECharts versions.
- Dual axes simulate breaks for separated ranges, but do not create true visual gaps.
- Best practices include maintaining context, using tooltips, and always displaying min/max values.  
- Upgrading to ECharts 6+ is highly recommended for interactive and visually distinct compression.  

Learn more:
- [ECharts Broken Axis Feature Overview](https://echarts.apache.org/handbook/en/basics/release-note/v6-feature/)
- [ECharts Documentation](https://echarts.apache.org/en/option.html)
