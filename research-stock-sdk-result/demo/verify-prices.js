import { StockSDK } from 'stock-sdk';

const sdk = new StockSDK();

async function verify() {
  const assets = [
    { name: '茅台 (A-share)', codes: ['sh600519'], type: 'getFullQuotes' },
    { name: '沪深300etf (A-share ETF)', codes: ['sh510300'], type: 'getFullQuotes' },
    { name: '易方达沪深300 (Fund)', codes: ['110020'], type: 'getFundQuotes' },
    { name: '腾讯 (HK)', codes: ['hk00700'], type: 'getHKQuotes' },
    { name: '长城 (HK)', codes: ['hk02333'], type: 'getHKQuotes' },
    { name: '微软 (US)', codes: ['usmsft.oq'], type: 'getUSQuotes' },
    { name: 'VOO (US ETF)', codes: ['usvoo.am'], type: 'getUSQuotes' },
    { name: 'VXUS (US ETF)', codes: ['usvxus.oq'], type: 'getUSQuotes' }
  ];

  for (const asset of assets) {
    try {
      let result;
      if (asset.type === 'getFullQuotes') {
        result = await sdk.getFullQuotes(asset.codes);
      } else if (asset.type === 'getFundQuotes') {
        result = await sdk.getFundQuotes(asset.codes);
      } else if (asset.type === 'getHKQuotes') {
        result = await sdk.getHKQuotes(asset.codes);
      } else if (asset.type === 'getUSQuotes') {
        result = await sdk.getUSQuotes(asset.codes);
      }

      console.log(`Asset: ${asset.name}`);
      if (result && result[0]) {
        const q = result[0];
        console.log(`  Price: ${q.price}`);
        console.log(`  Name: ${q.name}`);
        console.log(`  Code: ${q.code}`);
      } else {
        console.log('  No result');
      }
      console.log('---');
    } catch (e) {
      console.error(`Error fetching ${asset.name}:`, e);
    }
  }
}

verify();
