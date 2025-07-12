import RequestAxios from '../utility/BaseRequest';
import { promptAction } from '@kit.ArkUI';

class FactorNode {
  treeid: number = 0;
  parentId: number | null = null;
  nodeName: string = '';
  description: string = '';
  isLeaf: boolean = false;
  children: FactorNode[] = [];
  checked: boolean = false;
  constructor(data?: Partial<FactorNode>) {
    if (data) {
      this.treeid = data.treeid ?? 0;
      this.parentId = data.parentId ?? null;
      this.nodeName = data.nodeName ?? '';
      this.description = data.description ?? '';
      this.isLeaf = data.isLeaf ?? false;
      this.checked = data.checked ?? false;
      this.children = data.children ? data.children.map(child => new FactorNode(child)) : [];
    }
  }
}

class WeightItem {
  baseId: number = 0;
  weight: number = 0;
  constructor(baseId: number, weight: number) {
    this.baseId = baseId;
    this.weight = weight;
  }
}

class DerivedFactorPayload {
  factors: WeightItem[] = [];
  factorName: string = '';
  constructor(factors: WeightItem[], factorName: string) {
    this.factors = factors;
    this.factorName = factorName;
  }
}

@Entry
@Component
struct CreateDerivedFactorPage {
  @State factorTree: FactorNode[] = [];
  @State selectedFactors: FactorNode[] = [];
  @State step: number = 0;
  @State factorName: string = '';
  @State weights: WeightItem[] = [];
  @State weightError: string = '';

  aboutToAppear() {
    this.fetchFactorTree();
  }

  private fetchFactorTree(): void {
    RequestAxios.get<FactorNode[]>('/factors/tree')
      .then((res: import('@ohos/axios').AxiosResponse<FactorNode[]>) => {
        this.factorTree = this.arrayToTree(res.data);
      })
      .catch((e: Error) => {
        promptAction.showToast({ message: `获取因子树失败: ${e.message}` });
      });
  }

  private arrayToTree(arr: FactorNode[]): FactorNode[] {
    let map: Record<number, FactorNode> = {};
    for (let i = 0; i < arr.length; i++) {
      map[arr[i].treeid] = new FactorNode(arr[i]);
      map[arr[i].treeid].children = [];
    }
    let tree: FactorNode[] = [];
    for (let i = 0; i < arr.length; i++) {
      let item = map[arr[i].treeid];
      if (item.parentId && map[item.parentId]) {
        map[item.parentId].children.push(item);
      } else {
        tree.push(item);
      }
    }
    return tree;
  }

  private handleCheck(node: FactorNode, checked: boolean): void {
    node.checked = checked;
    if (node.isLeaf) {
      if (checked && !this.selectedFactors.some(f => f.treeid === node.treeid)) {
        this.selectedFactors.push(node);
      } else if (!checked) {
        this.selectedFactors = this.selectedFactors.filter(f => f.treeid !== node.treeid);
      }
    }
    for (let i = 0; i < node.children.length; i++) {
      this.handleCheck(node.children[i], checked);
    }
  }

  private handleStepChange(nextStep: number): void {
    if (nextStep === 1) {
      this.weights = this.selectedFactors.map(f => new WeightItem(f.treeid, 0));
    }
    this.step = nextStep;
  }

  private validateWeights(): string {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      const val = Number(this.weights[i].weight);
      if (isNaN(val)) return '权重输入有误';
      if (val < 0) return '权重不能为负';
      sum += val;
    }
    if (this.weights.length === 0) return '请设置权重';
    if (Math.abs(sum - 100) > 0.0001) return '当前权重总和为: ' + sum;
    return '';
  }

  private onSubmit(): void {
    this.weightError = this.validateWeights();
    if (this.weightError) {
      promptAction.showToast({ message: this.weightError });
      return;
    }
    let payload = new DerivedFactorPayload(this.weights, this.factorName);
    RequestAxios.post('/derived-factors/add', payload)
      .then(() => {
        promptAction.showToast({ message: '添加成功' });
        this.step = 0;
        this.selectedFactors = [];
        this.factorName = '';
        this.weights = [];
      })
      .catch(() => {
        promptAction.showToast({ message: '添加失败' });
      });
  }

  // ArkTS树形递归渲染
  @Builder TreeNode(node: FactorNode) {
    Column() {
      Row() {
        Checkbox()
          .select(node.checked)
          .onChange((v: boolean) => this.handleCheck(node, v))
        Text(node.nodeName).fontSize(15).margin({ left: 4 })
      }
      .margin({ bottom: 2 })
      if (node.children.length > 0) {
        Column() {
          ForEach(node.children, (child: FactorNode) => this.TreeNode(child))
        }
        .margin({ left: 16 })
      }
    }
  }

  build() {
    Stack({ alignContent: Alignment.Top }) {
      Column() {
        // 左侧因子树卡片
        Column() {
          Text('可选因子')
            .fontWeight(FontWeight.Bold)
            .fontSize(18)
            .margin({ bottom: 12 })
          if (this.factorTree.length > 0) {
            ForEach(this.factorTree, (node: FactorNode) => this.TreeNode(node))
          } else {
            Column() {
              Text('暂无数据')
                .fontColor('#888888')
                .fontSize(16)
                .margin({ top: 40 })
            }
            .alignItems(HorizontalAlign.Center)
            .justifyContent(FlexAlign.Center)
            .height(200)
          }
        }
        .padding(20)
        .backgroundColor('#FFFFFF')
        .borderRadius(16)
        .shadow({ radius: 12, color: '#1A2978FB', offsetX: 0, offsetY: 4 })
        .margin({ bottom: 24 })
        .constraintSize({ minWidth: 220, maxWidth: 500 })
        .alignSelf(ItemAlign.Center)
        // 右侧步骤卡片
        Column() {
          // 步骤条
          Row() {
            ForEach([0, 1], (item: number) => {
              Text(item === 0 ? '选择因子' : '设置权重')
                .fontColor(this.step === item ? '#0A59F7' : '#888')
                .fontWeight(this.step === item ? FontWeight.Bold : FontWeight.Normal)
                .fontSize(16)
                .margin({ right: 24 })
            })
          }
          .margin({ bottom: 18, top: 4 })
          // 步骤内容
          if (this.step === 0) {
            Column() {
              Text('已选因子')
                .fontWeight(FontWeight.Bold)
                .fontSize(16)
                .margin({ bottom: 12 })
              if (this.selectedFactors.length > 0) {
                ForEach(this.selectedFactors, (f: FactorNode) => {
                  Row() {
                    Text(f.nodeName).width(120)
                    Text(f.description ?? '').width(120)
                  }
                  .margin({ bottom: 6 })
                })
              } else {
                Text('请在左侧选择因子')
                  .fontColor('#B0B0B0')
                  .fontSize(15)
                  .margin({ bottom: 12 })
              }
              Row() {
                Button('取消', { type: ButtonType.Capsule })
                  .onClick(() => { /* 可自定义返回逻辑 */ })
                  .backgroundColor('#F0F0F0')
                  .fontColor('#888')
                  .borderRadius(24)
                  .height(40)
                  .fontSize(15)
                  .margin({ right: 16 })
                Button('下一步', { type: ButtonType.Capsule })
                  .onClick(() => this.handleStepChange(1))
                  .enabled(this.selectedFactors.length > 0)
                  .backgroundColor(this.selectedFactors.length > 0 ? '#0A59F7' : '#B0B0B0')
                  .fontColor('#fff')
                  .borderRadius(24)
                  .height(40)
                  .fontSize(15)
              }
              .margin({ top: 20 })
            }
          } else {
            Column() {
              Text('设置权重')
                .fontWeight(FontWeight.Bold)
                .fontSize(16)
                .margin({ bottom: 12 })
              ForEach(this.weights, (w: WeightItem, idx: number) => {
                Row() {
                  Text('因子').width(60)
                  TextInput({ placeholder: '请输入权重', text: w.weight.toString() })
                    .onChange((v: string) => {
                      let arr = [...this.weights];
                      arr[idx] = new WeightItem(w.baseId, v === '' ? 0 : Number(v));
                      this.weights = arr;
                    })
                    .width(80)
                    .borderRadius(8)
                    .backgroundColor('#F7F9FE')
                    .padding({ left: 8, right: 8 })
                    .fontSize(15)
                  Text('%')
                }
                .margin({ bottom: 8 })
              })
              Row() {
                Button('上一步', { type: ButtonType.Capsule })
                  .onClick(() => this.handleStepChange(0))
                  .backgroundColor('#F0F0F0')
                  .fontColor('#888')
                  .borderRadius(24)
                  .height(40)
                  .fontSize(15)
                  .margin({ right: 16 })
                Button('确定', { type: ButtonType.Capsule })
                  .onClick(() => this.onSubmit())
                  .enabled(!this.validateWeights())
                  .backgroundColor(!this.validateWeights() ? '#0A59F7' : '#B0B0B0')
                  .fontColor('#fff')
                  .borderRadius(24)
                  .height(40)
                  .fontSize(15)
              }
              .margin({ top: 20 })
              Text('校验信息: ' + this.validateWeights())
                .fontColor('#F53F3F')
                .fontSize(14)
                .margin({ top: 8 })
            }
          }
        }
        .flexGrow(1)
        .padding(24)
        .backgroundColor('#FFFFFF')
        .borderRadius(16)
        .shadow({ radius: 12, color: '#1A2978FB', offsetX: 0, offsetY: 4 })
        .constraintSize({ maxWidth: 500 })
        .alignSelf(ItemAlign.Center)
      }
      .width('100%')
      .constraintSize({ maxWidth: 900 })
      .justifyContent(FlexAlign.Center)
      .margin({ top: 40 })
    }
    .backgroundColor('#F7FAFF')
    .width('100%')
    .height('100%')
  }
}