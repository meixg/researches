# Investigation Notes: stock-sdk

## Timeline
- **Discovery**: Cloned `https://github.com/chengzuopeng/stock-sdk`.
- **Dependency Check**: Verified `package.json`. Confirmed zero runtime dependencies.
- **Data Source Trace**: Grepped source for URLs. Identified Tencent, Eastmoney, and Sina as primary providers.
- **Symbol Mapping**:
    - "茅台" -> `sh600519`
    - "沪深300etf" -> `sh510300`
    - "易方达沪深300" -> `jj110020`
    - "腾讯" -> `hk00700`
    - "长城" -> `hk02333`
    - "微软" -> `usmsft.oq`
    - "VOO" -> `usvoo.am`
    - "VXUS" -> `usvxus.oq`
- **Price Verification**: Wrote and executed `verify-prices.js`. Fetched prices for all target symbols.
- **Accuracy Comparison**: Compared fetched prices with Google search results (Sina Finance, Morningstar).
- **MCP Research**: Read `website/mcp` docs. Verified AI integration capabilities.
- **Testing**: Ran `yarn test` and `yarn test:integration:smoke`.

## Findings
- The SDK is lightweight and well-structured.
- Data is fetched from free public APIs; no API keys required.
- Integration with AI tools (Cursor/Claude) is a strong selling point.
- Price accuracy is reliable for standard market analysis, with typical delay for public sources.
