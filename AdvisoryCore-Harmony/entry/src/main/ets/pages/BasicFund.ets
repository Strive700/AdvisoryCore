import RequestAxios from '../utility/BaseRequest';
import { promptAction } from '@kit.ArkUI';

// 定义基础数据类型
type FundFieldValue = string | number | boolean | null | undefined;

// 定义 Fund 接口
interface Fund {
  fundCode: string;
  fundName: string;
  fundSize: number;
  fundType: string;
  inceptionDate: string;
  managerName: string;
  maxDrawdown1y: number;
  navDate: string;
  operationCycle: string;
  qualityScore: number;
  return1m: number;
  returnYtd: number;
  unitNav: number;
  description?: string;
}

// 定义 FundImageData 类
class FundImageData {
  fund_name: string = '';
  fund_code: string = '';
  fund_type: string = '';
  fund_size: number = 0;
  manager_name: string = '';
  inception_date: string = '';
  operation_cycle: string = '';
  industry_tag?: string;
  rating?: string;
  fund_description?: string;
  quality_score?: number;
  research_score?: number;
  risk_adj_score?: number;
  tenure_score?: number;
  return_ytd?: number;
  return_1m?: number;
  max_drawdown_1y?: number;
  annual_sharpe?: number;
  risk_level?: string;
  fee_rate?: number;
  ranking?: number;
  stock_asset?: number;
  bond_asset?: number;
  cash_asset?: number;
  deposit_asset?: number;
  accumulated_nav?: number;
  unit_nav?: number;
  nav_date?: string;
  disclosure_date?: string;
  market_value?: number;
  stock_name?: string;
  stock_code?: string;
  share_count?: number;
  share_total?: number;
}

// 定义筛选选项接口
interface FilterOption {
  label: string;
  key: keyof Filters;
  options: string[];
}

// 定义筛选条件类
class Filters {
  code: string = '';
  time: string = '';
  scale: string = '';
  managerYear: string = '';
  ytdReturn: string = '';
  fee: string = '';
  barra: string = '';
}

// 定义范围值接口
interface RangeValue {
  min: number | null;
  max: number | null;
}

// 定义详情项接口
interface DetailItem {
  label: string;
  value: string;
}

// 定义API响应接口
class QueryWithJoinData {
  records: Fund[] = [];
  total: number = 0;
}

interface QueryWithJoinResponse {
  data: QueryWithJoinData;
}

interface FundImageResponse {
  data: Record<string, Partial<FundImageData>>;
}

// 默认基金画像数据
const DEFAULT_FUND_IMAGE_DATA = new FundImageData();

// 查询参数类
class FundQueryParams {
  page: number;
  pageSize: number;
  scale: RangeValue | null;
  managerTenure: RangeValue | null;
  yieldThisYear: RangeValue | null;
  feeRate: RangeValue | null;
  styleTag: string;
  code: string;
  constructor(
    page: number,
    pageSize: number,
    scale: RangeValue | null,
    managerTenure: RangeValue | null,
    yieldThisYear: RangeValue | null,
    feeRate: RangeValue | null,
    styleTag: string,
    code: string
  ) {
    this.page = page;
    this.pageSize = pageSize;
    this.scale = scale;
    this.managerTenure = managerTenure;
    this.yieldThisYear = yieldThisYear;
    this.feeRate = feeRate;
    this.styleTag = styleTag;
    this.code = code;
  }
}

@Entry
@Component
struct BasicFundPage {
  @State filters: Filters = new Filters();
  @State tableData: Fund[] = [];
  @State total: number = 0;
  @State pageSize: number = 10;
  @State currentPage: number = 1;
  @State fundImageDialogVisible: boolean = false;
  @State fundImageData: FundImageData = new FundImageData();
  // 筛选选项配置
  private readonly filterOptions: FilterOption[] = [
    { label: '基金成立时间:', key: 'time', options: ['5-10年', '3-5年', '1-3年', '1年以内'] },
    { label: '基金规模:', key: 'scale', options: ['100亿以上', '80-100亿', '50-80亿', '30-50亿'] },
    { label: '基金经理任职年限:', key: 'managerYear', options: ['10年以上', '5-10年', '3-5年', '1-3年'] },
    { label: '今年以来收益率:', key: 'ytdReturn', options: ['20%以上', '10-20%', '0-10%', '0%以下'] },
    { label: '管理费率:', key: 'fee', options: ['1.5%以上', '1-1.5%', '0.5-1%', '0.5%以下'] },
    { label: 'Barra风格归因:', key: 'barra', options: ['成长', 'value', '平衡'] }
  ];

  aboutToAppear() {
    this.onSearch();
  }

  // 根据标签获取范围值
  private getRangeByLabel(label: string): RangeValue | null {
    if (!label) return null;

    const rangeParts = label.replace('%', '').replace('亿', '').split('-');
    const minStr = rangeParts[0];
    const maxStr = rangeParts[1] || '';

    if (label.includes('以上')) {
      return { min: parseFloat(minStr), max: null };
    }
    if (label.includes('以下')) {
      return { min: null, max: parseFloat(minStr) };
    }
    if (label.includes('-')) {
      return {
        min: parseFloat(minStr),
        max: parseFloat(maxStr)
      };
    }
    return null;
  }

  // 设置筛选条件
  private setFilter(key: string, value: string) {
    switch (key) {
      case 'code':
        this.filters.code = value;
        break;
      case 'time':
        this.filters.time = value;
        break;
      case 'scale':
        this.filters.scale = value;
        break;
      case 'managerYear':
        this.filters.managerYear = value;
        break;
      case 'ytdReturn':
        this.filters.ytdReturn = value;
        break;
      case 'fee':
        this.filters.fee = value;
        break;
      case 'barra':
        this.filters.barra = value;
        break;
    }
  }

  private getFilter(key: string): string {
    switch (key) {
      case 'code':
        return this.filters.code;
      case 'time':
        return this.filters.time;
      case 'scale':
        return this.filters.scale;
      case 'managerYear':
        return this.filters.managerYear;
      case 'ytdReturn':
        return this.filters.ytdReturn;
      case 'fee':
        return this.filters.fee;
      case 'barra':
        return this.filters.barra;
      default:
        return '';
    }
  }

  // 执行搜索
  private onSearch() {
    const params = new FundQueryParams(
      this.currentPage,
      this.pageSize,
      this.getRangeByLabel(this.filters.scale),
      this.getRangeByLabel(this.filters.managerYear),
      this.getRangeByLabel(this.filters.ytdReturn),
      this.getRangeByLabel(this.filters.fee),
      this.filters.barra,
      this.filters.code
    );

    RequestAxios.post<QueryWithJoinResponse>('/funds/queryWithJoin', params)
      .then((res: import('@ohos/axios').AxiosResponse<QueryWithJoinResponse>) => {
        const data = (res.data as QueryWithJoinResponse).data;
        this.tableData = data.records;
        this.total = data.total;
      })
      .catch((e: Error) => {
        promptAction.showToast({ message: `搜索失败: ${e.message}` });
      });
  }

  // 重置筛选条件
  private onReset() {
    this.filters = new Filters();
    this.onSearch();
  }

  // 处理分页变化
  private handlePageChange(page: number) {
    this.currentPage = page;
    this.onSearch();
  }

  // 显示基金画像
  private showFundImage(row: Fund) {
    class FundImageParams {
      fund_code: string;

      constructor(fund_code: string) {
        this.fund_code = fund_code;
      }
    }

    const params = new FundImageParams(row.fundCode);

    RequestAxios.post<FundImageResponse>('/funds/Fund_Image', params)
      .then((res: import('@ohos/axios').AxiosResponse<FundImageResponse>) => {
        const data = res.data;
        let newData = new FundImageData();
        newData.fund_code = row.fundCode;
        let fundData: Partial<FundImageData> | undefined = undefined;
        if (data && typeof (data as FundImageResponse).data === 'object') {
          const dataMap = (data as FundImageResponse).data;
          fundData = dataMap[row.fundCode];
        }
        if (fundData) {
          if (fundData.fund_name) newData.fund_name = fundData.fund_name;
          if (fundData.fund_type) newData.fund_type = fundData.fund_type;
          if (fundData.fund_size) newData.fund_size = fundData.fund_size;
          if (fundData.manager_name) newData.manager_name = fundData.manager_name;
          if (fundData.inception_date) newData.inception_date = fundData.inception_date;
          if (fundData.operation_cycle) newData.operation_cycle = fundData.operation_cycle;
          if (fundData.industry_tag) newData.industry_tag = fundData.industry_tag;
          if (fundData.rating) newData.rating = fundData.rating;
          if (fundData.fund_description) newData.fund_description = fundData.fund_description;
          if (fundData.quality_score) newData.quality_score = fundData.quality_score;
          if (fundData.research_score) newData.research_score = fundData.research_score;
          if (fundData.risk_adj_score) newData.risk_adj_score = fundData.risk_adj_score;
          if (fundData.tenure_score) newData.tenure_score = fundData.tenure_score;
          if (fundData.return_ytd) newData.return_ytd = fundData.return_ytd;
          if (fundData.return_1m) newData.return_1m = fundData.return_1m;
          if (fundData.max_drawdown_1y) newData.max_drawdown_1y = fundData.max_drawdown_1y;
          if (fundData.annual_sharpe) newData.annual_sharpe = fundData.annual_sharpe;
          if (fundData.risk_level) newData.risk_level = fundData.risk_level;
          if (fundData.fee_rate) newData.fee_rate = fundData.fee_rate;
          if (fundData.ranking) newData.ranking = fundData.ranking;
          if (fundData.stock_asset) newData.stock_asset = fundData.stock_asset;
          if (fundData.bond_asset) newData.bond_asset = fundData.bond_asset;
          if (fundData.cash_asset) newData.cash_asset = fundData.cash_asset;
          if (fundData.deposit_asset) newData.deposit_asset = fundData.deposit_asset;
          if (fundData.accumulated_nav) newData.accumulated_nav = fundData.accumulated_nav;
          if (fundData.unit_nav) newData.unit_nav = fundData.unit_nav;
          if (fundData.nav_date) newData.nav_date = fundData.nav_date;
          if (fundData.disclosure_date) newData.disclosure_date = fundData.disclosure_date;
          if (fundData.market_value) newData.market_value = fundData.market_value;
          if (fundData.stock_name) newData.stock_name = fundData.stock_name;
          if (fundData.stock_code) newData.stock_code = fundData.stock_code;
          if (fundData.share_count) newData.share_count = fundData.share_count;
          if (fundData.share_total) newData.share_total = fundData.share_total;
        }
        this.fundImageData = newData;
        this.fundImageDialogVisible = true;
      })
      .catch((e: Error) => {
        promptAction.showToast({ message: `获取基金画像失败: ${e.message}` });
      });
  }

  build() {
    Stack({ alignContent: Alignment.Top }) {
      // 主内容区
      Scroll() {
        Column() {
          // 筛选区卡片 - 微调视觉层次
          Column() {
            // 基金代码输入增加图标
            Row() {
              Text('基金代码:')
                .fontSize(16)
                .fontColor('#0A59F7')
                .layoutWeight(1)
              TextInput({ placeholder: '请输入基金代码或名称', text: this.filters.code })
                .onChange(v => this.filters.code = v)
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

            // 动态筛选条件 - 优化视觉平衡
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
                        .onClick(() => this.setFilter(filterGroup.key, opt))
                        .backgroundColor(this.getFilter(filterGroup.key) === opt ? '#0A59F7' : '#FAFBFF')
                        .fontColor(this.getFilter(filterGroup.key) === opt ? '#FFFFFF' : '#333333')
                        .borderRadius(16)
                        .border({
                          width: this.getFilter(filterGroup.key) === opt ? 0 : 1,
                          color: '#0A59F7'
                        })
                        .margin({ right: 8, bottom: 8 })
                        .fontSize(13)
                        .padding(10)
                        .backgroundColor(this.getFilter(filterGroup.key) === opt ? '#0A59F7' : '#FAFBFF')
                    })
                  }
                }
                .margin({ bottom: 16 })
                .width('100%')
              })
            }
            .margin({ bottom: 16 })

            // 操作按钮 - 添加图标提升可视性
            Row() {
              Button('清除', { type: ButtonType.Capsule })
                .onClick(() => this.onReset())
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
          .padding(24) // 增加内边距
          .backgroundColor('#FFFFFF')
          .borderRadius(16) // 更大圆角
          .margin({ bottom: 16, top: 16 })
          .width('100%')
          .shadow({
            radius: 16, // 更柔和阴影
            color: '#1A2978FB',
            offsetX: 0,
            offsetY: 4
          })

          // 表格区 - 优化视觉层次和可读性
          Column() {
            // 添加表格标题
            Row() {
              Text('基金列表')
                .fontSize(18)
                .fontColor('#1D2129')
                .fontWeight(FontWeight.Bold)
              Blank()
              Text(`共 ${this.total} 条记录`)
                .fontSize(14)
                .fontColor('#86909C')
            }
            .margin({ bottom: 16 })

            // 表头 - 优化视觉对比
            Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
              this.buildTableHeaderCell('代码', 70)
              this.buildTableHeaderCell('简称', 90)
              this.buildTableHeaderCell('经理', 85)
              this.buildTableHeaderCell('类型', 70)
              this.buildTableHeaderCell('操作', 80)
            }
            .backgroundColor('#F0F5FF') // 更柔和的蓝色背景
            .padding({
              left: 16,
              right: 16,
              top: 12,
              bottom: 12
            })
            .borderRadius(8)
            .width('100%')
            .height(48) // 固定高度

            // 数据行 - 优化交互反馈
            List({ space: 8 }) {
              ForEach(this.tableData, (row: Fund) => {
                ListItem() {
                  this.buildTableRow(row)
                }
                .backgroundColor('#FFFFFF')
                .onClick(() => this.showFundImage(row)) // 整行可点击
                .borderRadius(8)
                .width('100%')
              }, (item: Fund) => item.fundCode)
            }
            .layoutWeight(1)
            .width('100%')
            .divider({
              strokeWidth: 1,
              color: '#F0F0F0',
              startMargin: 16,
              endMargin: 16
            })

            // 分页控件 - 现代化视觉设计
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
          .borderRadius(16) // 更大圆角
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
        .padding({ left: 24, right: 24 }) // 增加边距
        .alignItems(HorizontalAlign.Center)
      }
      .width('100%')
      .height('100%')

      // 基金画像对话框 - 优化为现代化卡片
      if (this.fundImageDialogVisible) {
        this.buildFundDetailDialog()
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F7FAFF') // 更浅的背景色
  }

  // 表格标题单元格组件
  @Builder
  buildTableHeaderCell(text: string, width: number): void {
    Text(text)
      .width(width)
      .fontSize(14)
      .fontColor('#1D2129')
      .fontWeight(FontWeight.Medium)
      .textAlign(TextAlign.Start)
  }

  // 表格行组件
  @Builder
  buildTableRow(row: Fund): void {
    Flex({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
      Text(row.fundCode ?? '')
        .width(70)
        .fontSize(14)
        .fontColor('#1D2129')

      Text(row.fundName ?? '')
        .width(90)
        .fontSize(14)
        .fontColor('#0A59F7')

      Text(row.managerName ?? '')
        .width(85)
        .fontSize(14)
        .fontColor('#1D2129')

      Text(row.fundType ?? '')
        .width(70)
        .fontSize(14)
        .fontColor('#666666')

      Button('详情', { type: ButtonType.Normal })
        .width(80)
        .height(32)
        .backgroundColor('#F0F5FF')
        .fontColor('#0A59F7')
        .borderRadius(6)// 更小的圆角
        .fontSize(13)
    }
    .padding({
      left: 16,
      right: 16,
      top: 14,
      bottom: 14
    })
    .width('100%')
  }

  // 基金详情对话框组件
  @Builder
  buildFundDetailDialog(): void {
    Column() {
      // 模态内容
      Column() {
        // 标题栏 - 简化设计避免图标问题
        Row() {
          Text('基金画像')
            .fontSize(20)
            .fontColor('#1D2129')
            .fontWeight(FontWeight.Bold)
          Blank()
          Button() {
            Text('×')
              .fontSize(24)
              .fontColor('#666666')
          }
          .onClick(() => this.fundImageDialogVisible = false)
          .width(32)
          .height(32)
          .backgroundColor(Color.Transparent)
        }
        .margin({ bottom: 24 })
        .padding({ bottom: 12, top: 8 })

        // 基本信息卡片
        Column() {
          Text('基本信息')
            .fontSize(16)
            .fontColor('#1D2129')
            .fontWeight(FontWeight.Bold)
            .margin({ bottom: 16 })

          // 使用Grid布局
          Grid() {
            ForEach([
              {label: '基金名称', value: this.fundImageData.fund_name} as DetailItem,
              {label: '基金代码', value: this.fundImageData.fund_code} as DetailItem,
              {label: '基金类型', value: this.fundImageData.fund_type} as DetailItem,
              {label: '基金规模', value: `${this.fundImageData.fund_size} 亿元`} as DetailItem,
              {label: '基金经理', value: this.fundImageData.manager_name} as DetailItem,
              {label: '成立日期', value: this.fundImageData.inception_date} as DetailItem,
              {label: '运作周期', value: this.fundImageData.operation_cycle} as DetailItem,
              {label: '行业标签', value: this.fundImageData.industry_tag ?? '--'} as DetailItem,
              {label: '基金评级', value: this.fundImageData.rating ?? '--'} as DetailItem,
              {label: '基金简介', value: this.fundImageData.fund_description ?? '--'} as DetailItem
            ], (item: DetailItem) => {
              GridItem() {
                Row() {
                  Text(item.label + ':')
                    .fontSize(14)
                    .fontColor('#86909C')
                    .margin({ right: 8 })
                  Text(item.value)
                    .fontSize(14)
                    .fontColor('#1D2129')
                }
                .margin({ bottom: 12 })
              }
            })
          }
          .columnsTemplate('1fr 1fr')
          .rowsGap(16)
          .columnsGap(24)
        }
        .padding(24)
        .backgroundColor('#F7F8FA')
        .borderRadius(12)
        .margin({ bottom: 24 })

        // 评分与风格卡片
        Column() {
          Text('评分与风格')
            .fontSize(16)
            .fontColor('#1D2129')
            .fontWeight(FontWeight.Bold)
            .margin({ bottom: 16 })
          Grid() {
            ForEach([
              {label: '质量评分', value: this.fundImageData.quality_score?.toString() ?? '--'} as DetailItem,
              {label: '研究评分', value: this.fundImageData.research_score?.toString() ?? '--'} as DetailItem,
              {label: '风险调整评分', value: this.fundImageData.risk_adj_score?.toString() ?? '--'} as DetailItem,
              {label: '任职评分', value: this.fundImageData.tenure_score?.toString() ?? '--'} as DetailItem,
              {label: '风险等级', value: this.fundImageData.risk_level ?? '--'} as DetailItem,
              {label: '费率', value: this.fundImageData.fee_rate?.toString() ?? '--'} as DetailItem,
              {label: '排名', value: this.fundImageData.ranking?.toString() ?? '--'} as DetailItem
            ], (item: DetailItem) => {
              GridItem() {
                Row() {
                  Text(item.label + ':')
                    .fontSize(14)
                    .fontColor('#86909C')
                    .margin({ right: 8 })
                  Text(item.value)
                    .fontSize(14)
                    .fontColor('#1D2129')
                }
                .margin({ bottom: 12 })
              }
            })
          }
          .columnsTemplate('1fr 1fr')
          .rowsGap(16)
          .columnsGap(24)
        }
        .padding(24)
        .backgroundColor('#F7F8FA')
        .borderRadius(12)
        .margin({ bottom: 24 })

        // 资产结构卡片
        Column() {
          Text('资产结构')
            .fontSize(16)
            .fontColor('#1D2129')
            .fontWeight(FontWeight.Bold)
            .margin({ bottom: 16 })
          Grid() {
            ForEach([
              {label: '股票资产', value: this.fundImageData.stock_asset?.toString() ?? '--'} as DetailItem,
              {label: '债券资产', value: this.fundImageData.bond_asset?.toString() ?? '--'} as DetailItem,
              {label: '现金资产', value: this.fundImageData.cash_asset?.toString() ?? '--'} as DetailItem,
              {label: '存款资产', value: this.fundImageData.deposit_asset?.toString() ?? '--'} as DetailItem,
              {label: '累计净值', value: this.fundImageData.accumulated_nav?.toString() ?? '--'} as DetailItem,
              {label: '单位净值', value: this.fundImageData.unit_nav?.toString() ?? '--'} as DetailItem,
              {label: '净值日期', value: this.fundImageData.nav_date ?? '--'} as DetailItem,
              {label: '披露日期', value: this.fundImageData.disclosure_date ?? '--'} as DetailItem,
              {label: '市场价值', value: this.fundImageData.market_value?.toString() ?? '--'} as DetailItem
            ], (item: DetailItem) => {
              GridItem() {
                Row() {
                  Text(item.label + ':')
                    .fontSize(14)
                    .fontColor('#86909C')
                    .margin({ right: 8 })
                  Text(item.value)
                    .fontSize(14)
                    .fontColor('#1D2129')
                }
                .margin({ bottom: 12 })
              }
            })
          }
          .columnsTemplate('1fr 1fr')
          .rowsGap(16)
          .columnsGap(24)
        }
        .padding(24)
        .backgroundColor('#F7F8FA')
        .borderRadius(12)
        .margin({ bottom: 24 })

        // 重仓股卡片
        Column() {
          Text('重仓股')
            .fontSize(16)
            .fontColor('#1D2129')
            .fontWeight(FontWeight.Bold)
            .margin({ bottom: 16 })
          Grid() {
            ForEach([
              {label: '股票名称', value: this.fundImageData.stock_name ?? '--'} as DetailItem,
              {label: '股票代码', value: this.fundImageData.stock_code ?? '--'} as DetailItem,
              {label: '持股数', value: this.fundImageData.share_count?.toString() ?? '--'} as DetailItem,
              {label: '总股本', value: this.fundImageData.share_total?.toString() ?? '--'} as DetailItem
            ], (item: DetailItem) => {
              GridItem() {
                Row() {
                  Text(item.label + ':')
                    .fontSize(14)
                    .fontColor('#86909C')
                    .margin({ right: 8 })
                  Text(item.value)
                    .fontSize(14)
                    .fontColor('#1D2129')
                }
                .margin({ bottom: 12 })
              }
            })
          }
          .columnsTemplate('1fr 1fr')
          .rowsGap(16)
          .columnsGap(24)
        }
        .padding(24)
        .backgroundColor('#F7F8FA')
        .borderRadius(12)
        .margin({ bottom: 24 })

        // 业绩表现卡片（原有）
        Column() {
          Text('业绩表现')
            .fontSize(16)
            .fontColor('#1D2129')
            .fontWeight(FontWeight.Bold)
            .margin({ bottom: 16 })

          Row() {
            Column() {
              Text('最新净值')
                .fontSize(14)
                .fontColor('#86909C')
                .margin({ bottom: 8 })
              Text(this.fundImageData.unit_nav?.toFixed(4) ?? '--')
                .fontSize(20)
                .fontColor('#0A59F7')
                .fontWeight(FontWeight.Bold)
              Text(`更新日期: ${this.fundImageData.nav_date ?? '--'}`)
                .fontSize(12)
                .fontColor('#86909C')
                .margin({ top: 4 })
            }
            .padding(16)
            .backgroundColor('#FFFFFF')
            .borderRadius(8)
            .layoutWeight(1)
            .margin({ right: 12 })

            Column() {
              Text('今年以来收益')
                .fontSize(14)
                .fontColor('#86909C')
                .margin({ bottom: 8 })
              Text(`${this.fundImageData.return_ytd?.toFixed(2) ?? '--'}%`)
                .fontSize(20)
                .fontColor((this.fundImageData.return_ytd ?? 0) > 0 ? '#F53F3F' : '#00B42A')
                .fontWeight(FontWeight.Bold)
            }
            .padding(16)
            .backgroundColor('#FFFFFF')
            .borderRadius(8)
            .layoutWeight(1)
          }
          .margin({ bottom: 16 })

          // 其他业绩指标
          Column() {
            Row() {
              Text('近1月收益')
                .fontSize(14)
                .fontColor('#86909C')
                .layoutWeight(1)
              Text(`${this.fundImageData.return_1m?.toFixed(2) ?? '--'}%`)
                .fontSize(14)
                .fontColor((this.fundImageData.return_1m ?? 0) > 0 ? '#F53F3F' : '#00B42A')
                .layoutWeight(1)
                .textAlign(TextAlign.End)
            }
            .margin({ bottom: 8 })

            Row() {
              Text('最大回撤')
                .fontSize(14)
                .fontColor('#86909C')
                .layoutWeight(1)
              Text(`${this.fundImageData.max_drawdown_1y?.toFixed(2) ?? '--'}%`)
                .fontSize(14)
                .fontColor('#1D2129')
                .layoutWeight(1)
                .textAlign(TextAlign.End)
            }
            .margin({ bottom: 8 })

            Row() {
              Text('夏普比率')
                .fontSize(14)
                .fontColor('#86909C')
                .layoutWeight(1)
              Text(this.fundImageData.annual_sharpe?.toFixed(2) ?? '--')
                .fontSize(14)
                .fontColor('#1D2129')
                .layoutWeight(1)
                .textAlign(TextAlign.End)
            }
          }
          .padding(16)
          .backgroundColor('#F7F8FA')
          .borderRadius(8)
        }
        .padding(24)
        .backgroundColor('#F7F8FA')
        .borderRadius(12)
        .margin({ bottom: 24 })

        // 关闭按钮
        Button('关闭', { type: ButtonType.Capsule })
          .onClick(() => this.fundImageDialogVisible = false)
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
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#80000000')
    .position({ x: 0, y: 0 })
    .zIndex(999)
    .align(Alignment.Center)
  }}