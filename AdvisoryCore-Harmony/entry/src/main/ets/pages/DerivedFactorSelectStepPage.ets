import RequestAxios from '../utility/BaseRequest';
import { promptAction } from '@kit.ArkUI';
import router from '@ohos.router';

class DerivedFactor {
  id: string = '';
  name: string = '';
  checked: boolean = false;
  constructor(data?: Partial<DerivedFactor>) {
    if (data) {
      this.id = data.id ?? '';
      this.name = data.name ?? '';
      this.checked = data.checked ?? false;
    }
  }
}

@Entry
@Component
struct DerivedFactorSelectStepPage {
  @State allFactors: DerivedFactor[] = [];
  @State selectedFactors: DerivedFactor[] = [];
  @State search: string = '';
  @State planName: string = '';
  @State selectedCheckedIds: string[] = [];

  aboutToAppear() {
    this.fetchAllFactors();
  }

  private fetchAllFactors(): void {
    RequestAxios.get<DerivedFactor[]>('/derived-factors/data-types')
      .then((res: import('@ohos/axios').AxiosResponse<DerivedFactor[]>) => {
        this.allFactors = res.data.map(f => new DerivedFactor(f));
      })
      .catch((e: Error) => {
        promptAction.showToast({ message: `获取衍生因子失败: ${e.message}` });
      });
  }

  private get filteredFactors(): DerivedFactor[] {
    if (!this.search) return this.allFactors;
    return this.allFactors.filter(f => f.name.indexOf(this.search) !== -1);
  }

  private addSelected(): void {
    let toAdd: DerivedFactor[] = [];
    for (let i = 0; i < this.allFactors.length; i++) {
      let f = this.allFactors[i];
      if (f.checked && !this.selectedFactors.some(s => s.id === f.id)) {
        toAdd.push(f);
      }
    }
    this.selectedFactors = this.selectedFactors.concat(toAdd);
    for (let i = 0; i < this.allFactors.length; i++) {
      if (this.allFactors[i].checked) this.allFactors[i].checked = false;
    }
  }
  private removeSelected(): void {
    this.selectedFactors = this.selectedFactors.filter(f => this.selectedCheckedIds.indexOf(f.id) === -1);
    this.selectedCheckedIds = [];
  }
  private clearAll(): void {
    this.selectedFactors = [];
    this.selectedCheckedIds = [];
  }

  build() {
    Column() {
      // 上半部分：全部因子选择卡片
      Column() {
        Row() {
          Text('衍生因子').fontWeight(FontWeight.Bold).fontSize(16)
          TextInput({ placeholder: '请输入衍生因子风格名称', text: this.search })
            .onChange((v: string) => this.search = v)
            .width(120).margin({ left: 8 })
        }
        .margin({ bottom: 8 })
        if (this.allFactors.length > 0) {
          List() {
            ForEach(this.filteredFactors, (item: DerivedFactor) => {
              ListItem() {
                Row() {
                  Checkbox()
                    .select(item.checked)
                    .onChange((v: boolean) => { item.checked = v; })
                  Text(item.name).margin({ left: 8 })
                }
              }
            })
          }
          .height(200)
        } else {
          Text('暂无数据').fontColor('#888888')
        }
      }
      .backgroundColor('#fafbfc').borderRadius(16).padding(20).margin({ bottom: 24, top: 24 }).constraintSize({ maxWidth: 500 }).alignSelf(ItemAlign.Center)

      // 下半部分：方案卡片
      Column() {
        Row() {
          Text('方案名称').fontWeight(FontWeight.Bold)
          TextInput({ placeholder: '请输入方案名称（1~6字以内）', text: this.planName })
            .onChange((v: string) => this.planName = v)
            .width(120).margin({ left: 8 })
        }
        .margin({ bottom: 8 })
        Text(`已选指数（${this.selectedFactors.length}）`).fontColor('#197aff').fontSize(14).margin({ bottom: 8 })
        List() {
          ForEach(this.selectedFactors, (item: DerivedFactor) => {
            ListItem() {
              Row() {
                Checkbox()
                  .select(this.selectedCheckedIds.indexOf(item.id) !== -1)
                  .onChange((v: boolean) => {
                    if (v) {
                      if (this.selectedCheckedIds.indexOf(item.id) === -1) this.selectedCheckedIds.push(item.id);
                    } else {
                      this.selectedCheckedIds = this.selectedCheckedIds.filter(id => id !== item.id);
                    }
                  })
                Text(item.name).margin({ left: 8 })
              }
            }
          })
        }
        .height(120)
        // 操作按钮横向排列
        Flex({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
          Button('添加 >>')
            .onClick(() => this.addSelected())
            .width(100)
            .height(40)
            .backgroundColor('#0A59F7')
            .fontColor('#FFFFFF')
            .fontSize(16)
            .borderRadius(20)
            .margin({ right: 12 })

          Button('<< 删除')
            .onClick(() => this.removeSelected())
            .width(100)
            .height(40)
            .backgroundColor('#0A59F7')
            .fontColor('#FFFFFF')
            .fontSize(16)
            .borderRadius(20)
            .margin({ right: 12 })

          Button('全部清空')
            .onClick(() => this.clearAll())
            .width(100)
            .height(40)
            .backgroundColor('#0A59F7')
            .fontColor('#FFFFFF')
            .fontSize(16)
            .borderRadius(20)
            .margin({ right: 12 })

          Button('下一步')
            .onClick(() => {
              let selected = this.selectedFactors.length > 0 ? this.selectedFactors[0] : null;
              if (selected) {
                router.pushUrl({
                  url: 'pages/CreateDerivedFactorPage',
                  params: {
                    factorName: selected.name,
                    displayName: selected.name,
                    dataType: 'string',
                    calcMethod: 'avg',
                    updateFrequency: 'daily',
                    name: selected.name,
                    factorType: '技术因子'
                  }
                });
              } else {
                promptAction.showToast({ message: '请先选择一个因子' });
              }
            })
            .width(100)
            .height(40)
            .backgroundColor('#0A59F7')
            .fontColor('#FFFFFF')
            .fontSize(16)
            .borderRadius(20)
        }
        .margin({ top: 16 })
      }
      .backgroundColor('#fafbfc').borderRadius(16).padding(20).margin({ bottom: 24 }).constraintSize({ maxWidth: 500 }).alignSelf(ItemAlign.Center)
    }
    .backgroundColor('#F5F6FA').width('100%').height('100%').padding(16)
  }
} 