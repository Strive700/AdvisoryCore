import RequestAxios from '../utility/BaseRequest';
import { promptAction } from '@kit.ArkUI';

class FundOption {
  watchlistid: number = 0;
  fund_code: string = '';
  fund_name: string = '';
  manager_name: string = '';
  fund_type: string = '';
  latest_nav: number = 0;
  latest_nav_date: string = '';
  return_1m: string = '';
  return_ytd: string = '';
  max_drawdown_1y: string = '';
  operation_cycle: string = '';
  fund_size: number = 0;
  inception_date: string = '';
  quality_score: number = 0;
  description?: string;
  alert_param?: string;
  trigger_date?: string;
  actual_value?: string;
  threshold?: string;
  alert_status?: number;
  alertid?: number;
  alert_create_time?: string;
}

interface FundOptionsData {
  list: FundOption[];
  total: number;
}

interface FundAlertResponse {
  data: FundOption[];
  Code?: number;
  status?: string;
}

interface GeneratedObjectLiteralInterface_1 {
  fundCode: string;
  alertParam: string;
  threshold: number;
  alertAction: string;
  description: string;
}

@Entry
@Component
struct FundOptionsPage {
  @State tableData: FundOption[] = [];
  @State total: number = 0;
  @State pageSize: number = 10;
  @State currentPage: number = 1;
  @State alertDialogVisible: boolean = false;
  @State alertParam: string = '';
  @State alertThreshold: string = '';
  @State alertAction: string = '';
  @State editingRow: FundOption | null = null;

  aboutToAppear() {
    this.onSearch();
  }

  private onSearch() {
    RequestAxios.get('/fund-watchlist/alerts', {})
      .then((res: import('@ohos/axios').AxiosResponse<FundAlertResponse>) => {
        if (res && res.data && Array.isArray(res.data.data)) {
          this.tableData = res.data.data;
          this.total = res.data.data.length;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      })
      .catch((e: Error) => {
        promptAction.showToast({ message: '查询失败: ' + String(e) });
      });
  }

  private handlePageChange(page: number) {
    this.currentPage = page;
    this.onSearch();
  }

  private async handleDelete(row: FundOption) {
    try {
      await RequestAxios.delete(`/fund-watchlist/${row.watchlistid}`);
      promptAction.showToast({ message: '出库成功' });
      this.onSearch();
    } catch (e) {
      promptAction.showToast({ message: '出库失败' });
    }
  }

  private openAlertDialog(row: FundOption) {
    this.editingRow = row;
    promptAction.showDialog({
      title: '设置预警参数',
      message: '是否为该基金设置预警参数？',
      buttons: [
        { text: '取消', color: '#999999' },
        { text: '确定', color: '#0A59F7' }
      ]
    }).then((result) => {
      if (result.index === 1) {
        this.saveAlertParam();
      }
    });
  }
  private closeAlertDialog() {
    this.alertDialogVisible = false;
  }

  private async saveAlertParam() {
    if (!this.editingRow) return;
    const payload: GeneratedObjectLiteralInterface_1 = {
      fundCode: this.editingRow.fund_code,
      alertParam: this.alertParam,
      threshold: Number(this.alertThreshold),
      alertAction: this.alertAction,
      description: ''
    };
    try {
      await RequestAxios.post('/fund-alerts/set', payload);
      promptAction.showToast({ message: '保存成功' });
      this.closeAlertDialog();
      this.onSearch();
    } catch {
      promptAction.showToast({ message: '保存失败' });
    }
  }

  build() {
    Stack({ alignContent: Alignment.Top }) {
      Scroll() {
        Column() {
          Column() {
            Row() {
              Text('基金备选库')
                .fontSize(18)
                .fontColor('#1D2129')
                .fontWeight(FontWeight.Bold)
              Blank()
              Text(`共 ${this.total} 条记录`)
                .fontSize(14)
                .fontColor('#86909C')
            }
            .margin({ bottom: 16 })

            List({ space: 16 }) {
              ForEach(this.tableData, (row: FundOption) => {
                ListItem() {
                  Column() {
                    Row() {
                      Text(row.fund_name ?? '').fontSize(16).fontWeight(FontWeight.Bold).fontColor('#0A59F7')
                      Blank()
                      Text(row.fund_code ?? '').fontSize(12).fontColor('#86909C')
                    }
                    .margin({ bottom: 8 })

                    Row() {
                      Text('基金经理:').fontSize(12).fontColor('#666')
                      Text(row.manager_name ?? '').fontSize(12).fontColor('#333')
                    }
                    .margin({ bottom: 2 })

                    Row() {
                      Text('类型:').fontSize(12).fontColor('#666')
                      Text(row.fund_type ?? '').fontSize(12).fontColor('#333')
                    }
                    .margin({ bottom: 2 })

                    Row() {
                      Text('运行周期:').fontSize(12).fontColor('#666')
                      Text(row.operation_cycle ?? '').fontSize(12).fontColor('#333')
                    }
                    .margin({ bottom: 2 })

                    Row() {
                      Text('最新净值:').fontSize(12).fontColor('#666')
                      Text(row.latest_nav?.toString() ?? '').fontSize(12).fontColor('#333')
                    }
                    .margin({ bottom: 2 })

                    Row() {
                      Text('净值日期:').fontSize(12).fontColor('#666')
                      Text(row.latest_nav_date ?? '').fontSize(12).fontColor('#333')
                    }
                    .margin({ bottom: 2 })

                    Row() {
                      Text('基金规模:').fontSize(12).fontColor('#666')
                      Text(row.fund_size?.toString() ?? '').fontSize(12).fontColor('#333')
                    }
                    .margin({ bottom: 2 })

                    Row() {
                      Text('近一月收益率:').fontSize(12).fontColor('#666')
                      Text(row.return_1m?.toString() ?? '').fontSize(12).fontColor('#333')
                    }
                    .margin({ bottom: 2 })

                    Row() {
                      Text('今年以来收益率:').fontSize(12).fontColor('#666')
                      Text(row.return_ytd?.toString() ?? '').fontSize(12).fontColor('#333')
                    }
                    .margin({ bottom: 2 })

                    Row() {
                      Text('最大回撤:').fontSize(12).fontColor('#666')
                      Text(row.max_drawdown_1y?.toString() ?? '').fontSize(12).fontColor('#333')
                    }
                    .margin({ bottom: 2 })

                    Row() {
                      Text('成立日期:').fontSize(12).fontColor('#666')
                      Text(row.inception_date ?? '').fontSize(12).fontColor('#333')
                    }
                    .margin({ bottom: 2 })

                    Row() {
                      Text('评分:').fontSize(12).fontColor('#666')
                      Text(row.quality_score?.toString() ?? '').fontSize(12).fontColor('#333')
                    }
                    .margin({ bottom: 2 })

                    Row() {
                      Text('预警:').fontSize(12).fontColor('#F53F3F')
                      Text(row.description ?? '-').fontSize(12).fontColor('#F53F3F').margin({ right: 8 })
                      Text(row.alert_param ?? '').fontSize(12).fontColor('#F53F3F')
                    }
                    .margin({ bottom: 10 })

                    Row() {
                      Button('出库', { type: ButtonType.Normal })
                        .width(60)
                        .height(32)
                        .backgroundColor('#F0F5FF')
                        .fontColor('#F53F3F')
                        .borderRadius(6)
                        .fontSize(12)
                        .margin({ right: 16 })
                        .onClick(() => this.handleDelete(row))
                      Button('设置预警', { type: ButtonType.Normal })
                        .width(80)
                        .height(32)
                        .backgroundColor('#F0F5FF')
                        .fontColor('#0A59F7')
                        .borderRadius(6)
                        .fontSize(12)
                        .onClick(() => this.openAlertDialog(row))
                    }
                  }
                  .padding(18)
                  .backgroundColor('#FFFFFF')
                  .borderRadius(14)
                  .shadow({ radius: 8, color: '#1A2978FB', offsetX: 0, offsetY: 2 })
                  .width('100%')
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
          .margin({ bottom: 24, top: 40 })
          .width('100%')
          .shadow({ radius: 16, color: '#1A2978FB', offsetX: 0, offsetY: 4 })
        }
        .width('100%')
        .padding({ left: 24, right: 24 })
        .alignItems(HorizontalAlign.Center)
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F7FAFF')
  }
} 