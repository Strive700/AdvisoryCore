import RequestAxios from '../utility/BaseRequest';
import { promptAction } from '@kit.ArkUI';

class MinMax {
  min?: number;
  max?: number;
  constructor(min?: number, max?: number) {
    this.min = min;
    this.max = max;
  }
}

class FundManager {
  managerName: string = '';
  companyName: string = '';
  managedAssets: number = 0;
  managedCount: number = 0;
  highestEducation: string = '';
  tenureYears: string = '';
  effectiveAssets: number = 0;
  equityReturn: string = '';
  bondReturn: string = '';
  annualizedReturn: string = '';
  winRate: string = '';
}

class FundManagerQueryParams {
  page: number = 1;
  pageSize: number = 10;
  managerName?: string;
  fundCount?: string;
  fundScale?: string;
  tenure?: string;
  feature?: string;
  assetScale?: string;
  equityReturn?: string;
  bondReturn?: string;
  tenureYearsMin?: number;
  tenureYearsMax?: number;
}

class FundManagerListResponse {
  list: FundManager[] = [];
  total: number = 0;
}

class FilterOption {
  label: string;
  key: string;
  options: string[];
  constructor(label: string, key: string, options: string[]) {
    this.label = label;
    this.key = key;
    this.options = options;
  }
}

@Entry
@Component
struct FundManagerPage {
  @State manager: string = '';
  @State fundCount: string = '';
  @State fundScale: string = '';
  @State tenure: string = '';
  @State feature: string = '';
  @State assetScale: string = '';
  @State equityReturn: string = '';
  @State bondReturn: string = '';
  @State tableData: FundManager[] = [];
  @State currentPage: number = 1;
  @State pageSize: number = 10;
  @State total: number = 0;
  @State showDetailDialog: boolean = false;
  @State detailManager: FundManager = new FundManager();

  private readonly filterOptions: FilterOption[] = [
    new FilterOption('在管基金:', 'fundCount', ['1只', '2-3只', '3-5只', '5只以上']),
    new FilterOption('在管资金规模:', 'fundScale', ['100亿以上', '80-100亿', '50-80亿', '30-50亿']),
    new FilterOption('任职年限:', 'tenure', ['10年以上', '5-10年', '3-5年', '1-3年']),
    new FilterOption('特色因子:', 'feature', ['悦品特色因子']),
    new FilterOption('有效资产规模:', 'assetScale', ['100亿以上', '80-100亿', '50-80亿', '30-50亿']),
    new FilterOption('权益类基金历史收益率:', 'equityReturn', ['大于200%', '100%-200%', '50%-100%', '50%以下']),
    new FilterOption('债权类基金历史收益率:', 'bondReturn', ['大于200%', '100%-200%', '50%-100%', '50%以下'])
  ];

  aboutToAppear() {
    this.onSearch();
  }

  private getMinMaxByLabel(label: string): MinMax {
    if (!label) return new MinMax();
    if (label.includes('以上')) {
      return new MinMax(parseInt(label), undefined);
    }
    if (label.includes('以下')) {
      return new MinMax(undefined, parseInt(label));
    }
    if (label.includes('-')) {
      let parts = label.replace(/[^\d-]/g, '').split('-');
      return new MinMax(parseInt(parts[0]), parseInt(parts[1]));
    }
    return new MinMax();
  }

  private getFilterValue(key: string): string {
    switch (key) {
      case 'fundCount': return this.fundCount;
      case 'fundScale': return this.fundScale;
      case 'tenure': return this.tenure;
      case 'feature': return this.feature;
      case 'assetScale': return this.assetScale;
      case 'equityReturn': return this.equityReturn;
      case 'bondReturn': return this.bondReturn;
      default: return '';
    }
  }
  private setFilterValue(key: string, value: string) {
    switch (key) {
      case 'fundCount': this.fundCount = value; break;
      case 'fundScale': this.fundScale = value; break;
      case 'tenure': this.tenure = value; break;
      case 'feature': this.feature = value; break;
      case 'assetScale': this.assetScale = value; break;
      case 'equityReturn': this.equityReturn = value; break;
      case 'bondReturn': this.bondReturn = value; break;
    }
  }

  private onSearch() {
    let params = new FundManagerQueryParams();
    params.page = this.currentPage;
    params.pageSize = this.pageSize;
    if (this.manager) params.managerName = this.manager;
    if (this.fundCount) params.fundCount = this.fundCount;
    if (this.fundScale) params.fundScale = this.fundScale;
    if (this.tenure) params.tenure = this.tenure;
    if (this.feature) params.feature = this.feature;
    if (this.assetScale) params.assetScale = this.assetScale;
    if (this.equityReturn) params.equityReturn = this.equityReturn;
    if (this.bondReturn) params.bondReturn = this.bondReturn;
    let tenureRange = this.getMinMaxByLabel(this.tenure);
    if (tenureRange.min !== undefined) params.tenureYearsMin = tenureRange.min;
    if (tenureRange.max !== undefined) params.tenureYearsMax = tenureRange.max;
    RequestAxios.post<FundManagerListResponse>('/fund-managers/query', params)
      .then((res: import('@ohos/axios').AxiosResponse<FundManagerListResponse>) => {
        if (res.data && res.data.list) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      })
      .catch((e: Error) => {
        promptAction.showToast({ message: `查询失败: ${e.message}` });
      });
  }

  private onClear() {
    this.manager = '';
    this.fundCount = '';
    this.fundScale = '';
    this.tenure = '';
    this.feature = '';
    this.assetScale = '';
    this.equityReturn = '';
    this.bondReturn = '';
    this.onSearch();
  }

  private handlePageChange(page: number) {
    this.currentPage = page;
    this.onSearch();
  }

  build() {
    Stack({ alignContent: Alignment.Top }) {
      // 主内容区
      Scroll() {
        Column() {
          // ===== 筛选区卡片 =====
          Column() {
            Row() {
              Text('基金经理:')
                .fontSize(16)
                .fontColor('#0A59F7')
                .layoutWeight(1)
              TextInput({ placeholder: '请输入基金经理姓名', text: this.manager })
                .onChange(v => this.manager = v)
                .layoutWeight(3)
                .margin({ left: 12 })
                .borderRadius(8)
                .backgroundColor('#F7F9FE')
                .padding({ left: 12, right: 12 })
                .fontSize(16)
                .height(44)
            }
            .margin({ bottom: 18 })
            .height(44)

            // 动态筛选条件
            Flex({ wrap: FlexWrap.Wrap }) {
              ForEach(this.filterOptions, (filterGroup: FilterOption) => {
                Column() {
                  Text(filterGroup.label)
                    .fontSize(14)
                    .fontColor('#666666')
                    .margin({ bottom: 8 })
                    .width('100%')
                  Flex({ wrap: FlexWrap.Wrap }) {
                    ForEach(filterGroup.options, (opt: string) => {
                      Text(opt)
                        .onClick(() => this.setFilterValue(filterGroup.key, opt))
                        .backgroundColor(this.getFilterValue(filterGroup.key) === opt ? '#0A59F7' : '#FAFBFF')
                        .fontColor(this.getFilterValue(filterGroup.key) === opt ? '#FFFFFF' : '#333333')
                        .borderRadius(16)
                        .border({ width: this.getFilterValue(filterGroup.key) === opt ? 0 : 1, color: '#0A59F7' })
                        .margin({ right: 8, bottom: 8 })
                        .fontSize(13)
                        .padding(10)
                    })
                  }
                }
                .margin({ bottom: 16 })
                .width('100%')
              })
            }
            .margin({ bottom: 16 })

            // 操作按钮
            Row() {
              Button('清除', { type: ButtonType.Capsule })
                .onClick(() => this.onClear())
                .backgroundColor('#FFFFFF')
                .fontColor('#0A59F7')
                .borderRadius(24)
                .layoutWeight(1)
                .height(44)
                .fontSize(16)
                .margin({ right: 12 })
              Button('确定', { type: ButtonType.Capsule })
                .onClick(() => this.onSearch())
                .backgroundColor('#0A59F7')
                .fontColor('#FFFFFF')
                .borderRadius(24)
                .layoutWeight(1)
                .height(44)
                .fontSize(16)
            }
            .margin({ top: 8, bottom: 8 })
            .width('100%')
          }
          .padding(24)
          .backgroundColor('#FFFFFF')
          .borderRadius(16)
          .margin({ bottom: 16, top: 16 })
          .width('100%')
          .shadow({
            radius: 16,
            color: '#1A2978FB',
            offsetX: 0,
            offsetY: 4
          })

          // ===== 表格区卡片 =====
          Column() {
            Row() {
              Text('基金经理列表')
                .fontSize(18)
                .fontColor('#1D2129')
                .fontWeight(FontWeight.Bold)
              Blank()
              Text(`共 ${this.total} 条记录`)
                .fontSize(14)
                .fontColor('#86909C')
            }
            .margin({ bottom: 16 })

            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              Text('基金经理').width(80).fontWeight(FontWeight.Bold)
              Text('基金公司').width(120).fontWeight(FontWeight.Bold)
              Text('操作').width(80).fontWeight(FontWeight.Bold)
            }
            .backgroundColor('#F0F5FF')
            .padding({ left: 16, right: 16, top: 12, bottom: 12 })
            .borderRadius(8)
            .width('100%')
            .height(48)

            List({ space: 8 }) {
              ForEach(this.tableData, (row: FundManager) => {
                ListItem() {
                  Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
                    Text(row.managerName ?? '').width(80)
                    Text(row.companyName ?? '').width(120)
                    Button('详情', { type: ButtonType.Normal })
                      .width(80)
                      .height(32)
                      .backgroundColor('#F0F5FF')
                      .fontColor('#0A59F7')
                      .borderRadius(6)
                      .fontSize(13)
                      .onClick(() => {
                        this.detailManager = row;
                        this.showDetailDialog = true;
                      })
                  }
                  .padding({ left: 16, right: 16, top: 14, bottom: 14 })
                  .width('100%')
                  .backgroundColor('#FFFFFF')
                  .borderRadius(8)
                }
              })
            }
            .layoutWeight(1)
            .width('100%')
            .divider({
              strokeWidth: 1,
              color: '#F0F0F0',
              startMargin: 16,
              endMargin: 16
            })

            Row() {
              Button('←', { type: ButtonType.Circle })
                .onClick(() => {
                  if (this.currentPage > 1) this.handlePageChange(this.currentPage - 1)
                })
                .backgroundColor(this.currentPage > 1 ? '#0A59F7' : '#F7F9FE')
                .enabled(this.currentPage > 1)
                .width(40)
                .height(40)
                .fontColor(this.currentPage > 1 ? '#FFFFFF' : '#C5C5C5')

              Text(`${this.currentPage} / ${Math.ceil(this.total / this.pageSize)}`)
                .fontSize(16)
                .fontColor('#666666')
                .margin({ left: 16, right: 16 })

              Button('→', { type: ButtonType.Circle })
                .onClick(() => {
                  if (this.currentPage < Math.ceil(this.total / this.pageSize))
                    this.handlePageChange(this.currentPage + 1)
                })
                .backgroundColor(this.currentPage < Math.ceil(this.total / this.pageSize) ? '#0A59F7' : '#F7F9FE')
                .enabled(this.currentPage < Math.ceil(this.total / this.pageSize))
                .width(40)
                .height(40)
                .fontColor(this.currentPage < Math.ceil(this.total / this.pageSize) ? '#FFFFFF' : '#C5C5C5')
            }
            .justifyContent(FlexAlign.Center)
            .margin({ top: 24, bottom: 16 })
            .width('100%')
          }
          .padding(24)
          .backgroundColor('#FFFFFF')
          .borderRadius(16)
          .margin({ bottom: 24 })
          .width('100%')
          .shadow({
            radius: 16,
            color: '#1A2978FB',
            offsetX: 0,
            offsetY: 4
          })
        }
        .width('100%')
        .padding({ left: 24, right: 24 })
        .alignItems(HorizontalAlign.Center)
      }
      .width('100%')
      .height('100%')

      // 详情弹窗
      if (this.showDetailDialog) {
        Column() {
          Row() {
            Text('经理详情')
              .fontSize(20)
              .fontColor('#1D2129')
              .fontWeight(FontWeight.Bold)
            Blank()
            Button() {
              Text('×')
                .fontSize(24)
                .fontColor('#666666')
            }
            .onClick(() => this.showDetailDialog = false)
            .width(32)
            .height(32)
            .backgroundColor(Color.Transparent)
          }
          .margin({ bottom: 24 })
          .padding({ bottom: 12, top: 8 })

          // 详细信息列表
          Column() {
            Text('基金经理: ' + (this.detailManager.managerName ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('基金公司: ' + (this.detailManager.companyName ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('在管基金规模(亿元): ' + (this.detailManager.managedAssets?.toString() ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('在管基金(只): ' + (this.detailManager.managedCount?.toString() ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('最高学历: ' + (this.detailManager.highestEducation ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('任职年限: ' + (this.detailManager.tenureYears ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('有效资产规模(亿元): ' + (this.detailManager.effectiveAssets?.toString() ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('权益类基金历史收益率: ' + (this.detailManager.equityReturn ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('债权类基金历史收益率: ' + (this.detailManager.bondReturn ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('任职年化收益率: ' + (this.detailManager.annualizedReturn ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('胜率: ' + (this.detailManager.winRate ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
          }
          .padding(24)
          .backgroundColor('#F7F8FA')
          .borderRadius(12)

          Button('关闭', { type: ButtonType.Capsule })
            .onClick(() => this.showDetailDialog = false)
            .width('100%')
            .height(48)
            .backgroundColor('#0A59F7')
            .fontColor('#FFFFFF')
            .fontSize(16)
            .margin({ top: 8 })
        }
        .padding(32)
        .backgroundColor('#FFFFFF')
        .borderRadius(24)
        .width('90%')
        .align(Alignment.Center)
        .zIndex(999)
        .position({ x: 0, y: 0 })
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F7FAFF')
  }
}