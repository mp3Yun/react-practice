### AppropriationParser 類別建置步驟

#### 1. 匯入所需模組與類別
在類別中首先匯入必要的工具和介面：
- `ParserHelper`：協助解析資料的工具。
- `ReportParserStrategy`：策略模式的介面。
- `AppropriationDetails`：處理撥款詳細資料的類別。

```typescript
import ParserHelper from '../../../../../library/parser-helper';
import { ReportParserStrategy } from '../../report-parser-context';
import { DataSet, ReportInfo } from '../../report.type';
import AppropriationDetails from './appropriation-details-parser';
```

#### 2. 建立 class `AppropriationDetails`

- 把原本 `AppropriationDetails` 介面轉換成 `AppropriationDetails` 類別，請參考 [AppropriationDetails](./appropriation-report-parser/appropriation-details.ts)

- 繼承 `KeysReflector`

#### 3. 擴展 `ReportInfo` 介面
擴展 `ReportInfo`，加入 `appropriationDetails` 欄位來描述撥款明細。

```typescript
export interface AppropriationReport extends ReportInfo {
  appropriationDetails: DataSet<AppropriationDetails>;
}
```

#### 4. 實作 `AppropriationParser` 類別
`AppropriationParser` 實作 `ReportParserStrategy`，專門解析 `AppropriationReport`，包括以下部分：

- 建構子設定 `reportName`。
- `parse` 方法處理原始資料並返回解析後的 `AppropriationReport`。

```typescript
export default class AppropriationParser implements ReportParserStrategy<AppropriationReport> {
  reportName: string;

  constructor(reportName: string) {
    this.reportName = reportName;
  }

  parse(rawData: string[][]): AppropriationReport {
    // todo: 解構 ParserHelper
    const { findValueIndex, setIndices, createDataObject } = ParserHelper;

    const fieldNamesIndexObj = findValueIndex(rawData, '交易日期');
    const appropriationDetailIndices = setIndices(fieldNamesIndexObj.row + 1, rawData.length - 1);
    const appropriationDetails: DataSet<AppropriationDetails> = { name: '', entries: [] };
    const fieldNames = rawData[fieldNamesIndexObj.row];

    // todo: 把定義的 properties
    const keys = AppropriationDetails.getPropKeys();

    rawData.forEach((row, rowIndex) => {
      if (appropriationDetailIndices.includes(rowIndex)) {
        // todo: 透過 createDataObject<T> 取得 detail 資料
        const detail = createDataObject<AppropriationDetails>(fieldNames, row, keys);
        appropriationDetails.entries.push(detail);
      }
    });

    return {
      reportName: this.reportName,
      title: rawData[0][0],
      subtitle: rawData[1][0],
      printDate: rawData[2][14],
      printer: rawData[3][14],
      tradingAccount: rawData[4][1],
      currency: rawData[4][14],
      appropriationDetails,
    };
  }
}
```

#### 5. 輔助方法 `setAppropriationDetail`
在此步驟中， `setAppropriationDetail` 方法已被移除，並由 `ParserHelper` 的 `createDataObject` 函數取代。但可選擇保留此方法作為未來需求的一部分。

```typescript
// private setAppropriationDetail(fieldNames: string[], row: string[], keys: string[]): AppropriationDetails {
//   const obj = setFunc<AppropriationDetails>(fieldNames, row, keys);
//   return obj;
// }
```