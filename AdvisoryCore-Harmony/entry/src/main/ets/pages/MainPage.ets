/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import router from '@ohos.router';

interface ModuleEntry {
  title: string;
  page: string;
}

/**
 * Main page
 */
@Entry
@Component
struct MainPage {
  private modules: ModuleEntry[] = [
    { title: '基础基金', page: 'pages/BasicFund' },
    { title: '创建衍生因子', page: 'pages/CreateDerivedFactorPage' },
    { title: '衍生因子选择', page: 'pages/DerivedFactorSelectStepPage' },
    { title: '基金公司', page: 'pages/FundCompany' },
    { title: '基金经理', page: 'pages/FundManager' },
    { title: '基金备选库', page: 'pages/FundOptionsPage' }
  ];

  private gotoPage(page: string) {
    router.pushUrl({ url: page });
  }

  build() {
    Scroll() {
      Column() {
        Text('基金管理系统')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#0A59F7')
          .margin({ top: 40, bottom: 32 })
          .alignSelf(ItemAlign.Center)
        ForEach(this.modules, (mod: ModuleEntry) => {
          Button(mod.title, { type: ButtonType.Capsule })
            .onClick(() => this.gotoPage(mod.page))
            .width('100%')
            .height(64)
            .fontSize(18)
            .fontColor('#0A59F7')
            .backgroundColor('#F7F9FE')
            .borderRadius(18)
            .margin({ bottom: 24 })
            .shadow({ radius: 8, color: '#1A2978FB', offsetX: 0, offsetY: 2 })
        })
      }
      .padding({ left: 32, right: 32, top: 16 })
      .width('100%')
      .alignItems(HorizontalAlign.Center)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F7FAFF')
  }
}