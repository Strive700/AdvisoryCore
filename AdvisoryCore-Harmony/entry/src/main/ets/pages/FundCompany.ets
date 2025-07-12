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

class FundCompany {
  companyName: string = '';
  establishmentDate: string = '';
  registeredCapital: number = 0;
  firstFundDate: string = '';
  managerCount: number = 0;
  fundCount: number = 0;
  effectiveAssets: number = 0;
  equityCapital: number = 0;
  equityReturn: string = '';
  bondReturn: string = '';
}

class FundCompanyQueryParams {
  page: number = 1;
  pageSize: number = 10;
  companyName?: string;
  minEffectiveAssets?: number;
  maxEffectiveAssets?: number;
  minEquityReturn?: number;
  maxEquityReturn?: number;
  minBondReturn?: number;
  maxBondReturn?: number;
}

class FundCompanyListResponse {
  list: FundCompany[] = [];
  total: number = 0;
}

@Entry
@Component
struct FundCompanyPage {
  @State searchText: string = '';
  @State selectedDate: string = '';
  @State selectedCapital: string = '';
  @State selectedStructure: string = '';
  @State selectedAsset: string = '';
  @State selectedEquityReturn: string = '';
  @State selectedBondReturn: string = '';
  @State tableData: FundCompany[] = [];
  @State currentPage: number = 1;
  @State pageSize: number = 10;
  @State total: number = 0;
  @State showDetailDialog: boolean = false;
  @State detailCompany: FundCompany = new FundCompany();

  private readonly dateOptions: string[] = ['5-10年', '3-5年', '1年以内'];
  private readonly capitalOptions: string[] = ['100亿以上', '80-100亿', '50-80亿', '30-50亿'];
  private readonly structureOptions: string[] = ['100亿以上', '80-100亿', '50-80亿', '30-50亿'];
  private readonly assetOptions: string[] = ['100亿以上', '80-100亿', '50-80亿', '30-50亿'];
  private readonly equityReturnOptions: string[] = ['大于200%', '100%-200%', '50%-100%', '50%以下'];
  private readonly bondReturnOptions: string[] = ['大于200%', '100%-200%', '50%-100%', '50%以下'];

  aboutToAppear() {
    this.onSearch();
  }

  private getMinMaxByLabel(label: string): MinMax {
    if (!label) return new MinMax();
    if (label.includes('以上')) {
      return new MinMax(parseFloat(label), undefined);
    }
    if (label.includes('以下')) {
      return new MinMax(undefined, parseFloat(label));
    }
    if (label.includes('-')) {
      let parts = label.replace(/[^0-9\.-]/g, '').split('-');
      return new MinMax(parseFloat(parts[0]), parseFloat(parts[1]));
    }
    return new MinMax();
  }

  private onSearch() {
    let assetRange = this.getMinMaxByLabel(this.selectedAsset);
    let equityRange = this.getMinMaxByLabel(this.selectedEquityReturn);
    let bondRange = this.getMinMaxByLabel(this.selectedBondReturn);
    let params = new FundCompanyQueryParams();
    params.page = this.currentPage;
    params.pageSize = this.pageSize;
    if (this.searchText) params.companyName = this.searchText;
    if (assetRange.min !== undefined) params.minEffectiveAssets = assetRange.min;
    if (assetRange.max !== undefined) params.maxEffectiveAssets = assetRange.max;
    if (equityRange.min !== undefined) params.minEquityReturn = equityRange.min;
    if (equityRange.max !== undefined) params.maxEquityReturn = equityRange.max;
    if (bondRange.min !== undefined) params.minBondReturn = bondRange.min;
    if (bondRange.max !== undefined) params.maxBondReturn = bondRange.max;

    RequestAxios.post<FundCompanyListResponse>('/fund-companies/query', params)
      .then((res: import('@ohos/axios').AxiosResponse<FundCompanyListResponse>) => {
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
    this.searchText = '';
    this.selectedDate = '';
    this.selectedCapital = '';
    this.selectedStructure = '';
    this.selectedAsset = '';
    this.selectedEquityReturn = '';
    this.selectedBondReturn = '';
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
              Text('基金公司:')
                .fontSize(16)
                .fontColor('#0A59F7')
                .layoutWeight(1)
              TextInput({ placeholder: '请输入基金公司名称', text: this.searchText })
                .onChange(v => this.searchText = v)
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
              // 设立日期
              Column() {
                Text('设立日期:')
                  .fontSize(14)
                  .fontColor('#666666')
                  .margin({ bottom: 8 })
                  .width('100%')
                Flex({ wrap: FlexWrap.Wrap }) {
                  ForEach(this.dateOptions, (opt: string) => {
                    Text(opt)
                      .onClick(() => this.selectedDate = opt)
                      .backgroundColor(this.selectedDate === opt ? '#0A59F7' : '#FAFBFF')
                      .fontColor(this.selectedDate === opt ? '#FFFFFF' : '#333333')
                      .borderRadius(16)
                      .border({ width: this.selectedDate === opt ? 0 : 1, color: '#0A59F7' })
                      .margin({ right: 8, bottom: 8 })
                      .fontSize(13)
                      .padding(10)
                  })
                }
              }
              .margin({ bottom: 16 })
              .width('100%')
              // 注册资本
              Column() {
                Text('注册资本:')
                  .fontSize(14)
                  .fontColor('#666666')
                  .margin({ bottom: 8 })
                  .width('100%')
                Flex({ wrap: FlexWrap.Wrap }) {
                  ForEach(this.capitalOptions, (opt: string) => {
                    Text(opt)
                      .onClick(() => this.selectedCapital = opt)
                      .backgroundColor(this.selectedCapital === opt ? '#0A59F7' : '#FAFBFF')
                      .fontColor(this.selectedCapital === opt ? '#FFFFFF' : '#333333')
                      .borderRadius(16)
                      .border({ width: this.selectedCapital === opt ? 0 : 1, color: '#0A59F7' })
                      .margin({ right: 8, bottom: 8 })
                      .fontSize(13)
                      .padding(10)
                  })
                }
              }
              .margin({ bottom: 16 })
              .width('100%')
              // 股东结构
              Column() {
                Text('股东结构:')
                  .fontSize(14)
                  .fontColor('#666666')
                  .margin({ bottom: 8 })
                  .width('100%')
                Flex({ wrap: FlexWrap.Wrap }) {
                  ForEach(this.structureOptions, (opt: string) => {
                    Text(opt)
                      .onClick(() => this.selectedStructure = opt)
                      .backgroundColor(this.selectedStructure === opt ? '#0A59F7' : '#FAFBFF')
                      .fontColor(this.selectedStructure === opt ? '#FFFFFF' : '#333333')
                      .borderRadius(16)
                      .border({ width: this.selectedStructure === opt ? 0 : 1, color: '#0A59F7' })
                      .margin({ right: 8, bottom: 8 })
                      .fontSize(13)
                      .padding(10)
                  })
                }
              }
              .margin({ bottom: 16 })
              .width('100%')
              // 有效资产规模
              Column() {
                Text('有效资产规模:')
                  .fontSize(14)
                  .fontColor('#666666')
                  .margin({ bottom: 8 })
                  .width('100%')
                Flex({ wrap: FlexWrap.Wrap }) {
                  ForEach(this.assetOptions, (opt: string) => {
                    Text(opt)
                      .onClick(() => this.selectedAsset = opt)
                      .backgroundColor(this.selectedAsset === opt ? '#0A59F7' : '#FAFBFF')
                      .fontColor(this.selectedAsset === opt ? '#FFFFFF' : '#333333')
                      .borderRadius(16)
                      .border({ width: this.selectedAsset === opt ? 0 : 1, color: '#0A59F7' })
                      .margin({ right: 8, bottom: 8 })
                      .fontSize(13)
                      .padding(10)
                  })
                }
              }
              .margin({ bottom: 16 })
              .width('100%')
              // 权益类收益
              Column() {
                Text('权益类基金历史收益率:')
                  .fontSize(14)
                  .fontColor('#666666')
                  .margin({ bottom: 8 })
                  .width('100%')
                Flex({ wrap: FlexWrap.Wrap }) {
                  ForEach(this.equityReturnOptions, (opt: string) => {
                    Text(opt)
                      .onClick(() => this.selectedEquityReturn = opt)
                      .backgroundColor(this.selectedEquityReturn === opt ? '#0A59F7' : '#FAFBFF')
                      .fontColor(this.selectedEquityReturn === opt ? '#FFFFFF' : '#333333')
                      .borderRadius(16)
                      .border({ width: this.selectedEquityReturn === opt ? 0 : 1, color: '#0A59F7' })
                      .margin({ right: 8, bottom: 8 })
                      .fontSize(13)
                      .padding(10)
                  })
                }
              }
              .margin({ bottom: 16 })
              .width('100%')
              // 债权类收益
              Column() {
                Text('债权类基金历史收益率:')
                  .fontSize(14)
                  .fontColor('#666666')
                  .margin({ bottom: 8 })
                  .width('100%')
                Flex({ wrap: FlexWrap.Wrap }) {
                  ForEach(this.bondReturnOptions, (opt: string) => {
                    Text(opt)
                      .onClick(() => this.selectedBondReturn = opt)
                      .backgroundColor(this.selectedBondReturn === opt ? '#0A59F7' : '#FAFBFF')
                      .fontColor(this.selectedBondReturn === opt ? '#FFFFFF' : '#333333')
                      .borderRadius(16)
                      .border({ width: this.selectedBondReturn === opt ? 0 : 1, color: '#0A59F7' })
                      .margin({ right: 8, bottom: 8 })
                      .fontSize(13)
                      .padding(10)
                  })
                }
              }
              .margin({ bottom: 16 })
              .width('100%')
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
              Text('基金公司列表')
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
              Text('基金公司').width(120).fontWeight(FontWeight.Bold)
              Text('注册资本').width(100).fontWeight(FontWeight.Bold)
              Text('有效资产规模').width(120).fontWeight(FontWeight.Bold)
              Text('操作').width(80).fontWeight(FontWeight.Bold)
            }
            .backgroundColor('#F0F5FF')
            .padding({ left: 16, right: 16, top: 12, bottom: 12 })
            .borderRadius(8)
            .width('100%')
            .height(48)

            List({ space: 8 }) {
              ForEach(this.tableData, (row: FundCompany) => {
                ListItem() {
                  Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
                    Text(row.companyName ?? '').width(120)
                    Text(row.registeredCapital?.toString() ?? '').width(100)
                    Text(row.effectiveAssets?.toString() ?? '').width(120)
                    Button('详情', { type: ButtonType.Normal })
                      .width(80)
                      .height(32)
                      .backgroundColor('#F0F5FF')
                      .fontColor('#0A59F7')
                      .borderRadius(6)
                      .fontSize(13)
                      .onClick(() => {
                        this.detailCompany = row;
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

      // 详情弹窗条件渲染，放在 Stack 内部
      if (this.showDetailDialog) {
        Column() {
          Row() {
            Text('公司详情')
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
            Text('基金公司: ' + (this.detailCompany.companyName ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('设立日期: ' + (this.detailCompany.establishmentDate ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('注册资本: ' + (this.detailCompany.registeredCapital?.toString() ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('首只基金成立日期: ' + (this.detailCompany.firstFundDate ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('基金管理人数量: ' + (this.detailCompany.managerCount?.toString() ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('基金个数: ' + (this.detailCompany.fundCount?.toString() ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('有效资产规模: ' + (this.detailCompany.effectiveAssets?.toString() ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('权益资本: ' + (this.detailCompany.equityCapital?.toString() ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('权益类基金历史收益率: ' + (this.detailCompany.equityReturn ?? ''))
              .fontSize(16)
              .margin({ bottom: 8 })
            Text('债权类基金历史收益率: ' + (this.detailCompany.bondReturn ?? ''))
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