import { promptAction, router } from '@kit.ArkUI';
import CommonConstants from '../common/constants/CommonConstants';
import RequestAxios from '../utility/BaseRequest'

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  userId?: number;
  message?: string;
}
interface response{
  code: number;
  message: string;
  data: object;
  timestamp: number;
}

@Extend(TextInput)
function inputStyle() {
  .placeholderColor($r('app.color.placeholder_color'))
  .height($r('app.float.login_input_height'))
  .fontSize($r('app.float.big_text_size'))
  .backgroundColor($r('app.color.background'))
  .width(CommonConstants.FULL_PARENT)
  .padding({ left: CommonConstants.INPUT_PADDING_LEFT })
  .margin({ top: $r('app.float.input_margin_top') })
}

@Extend(Line)
function lineStyle() {
  .width(CommonConstants.FULL_PARENT)
  .height($r('app.float.line_height'))
  .backgroundColor($r('app.color.line_color'))
}

@Extend(Text)
function blueTextStyle() {
  .fontColor($r('app.color.login_blue_text_color'))
  .fontSize($r('app.float.small_text_size'))
  .fontWeight(FontWeight.Medium)
}

@Entry
@Component
struct LoginPage {
  @State account: string = '';
  @State password: string = '';
  @State isShowProgress: boolean = false;
  private timeOutId: number = -1;

  @Builder
  imageButton(src: Resource) {
    Button({ type: ButtonType.Circle, stateEffect: true }) {
      Image(src)
    }
    .height($r('app.float.other_login_image_size'))
    .width($r('app.float.other_login_image_size'))
    .backgroundColor($r('app.color.background'))
  }

  login(): void {
    if (this.account === '' || this.password === '') {
      promptAction.showToast({ message: $r('app.string.input_empty_tips') });
      return;
    }
    this.isShowProgress = true;

    const requestBody: LoginRequest = {
      username: this.account,
      password: this.password
    };

    RequestAxios.post<LoginResponse>('/login', requestBody)
      .then((response: import('@ohos/axios').AxiosResponse<LoginResponse>) => {
        this.isShowProgress = false;
        const data = response.data;
        if (data.success) {
          router.replaceUrl({ url: 'pages/MainPage' });
        } else {
          promptAction.showToast({ message: data.message ?? '登录失败' });
        }
      })
      .catch((error: Error) => {
        this.isShowProgress = false;
        promptAction.showToast({ message: error.message ?? '网络错误' });
        console.log('网络请求出错:', error);
      });
  }

  aboutToDisappear() {
    clearTimeout(this.timeOutId);
    this.timeOutId = -1;
  }

  build() {
    Column() {
      // Added the new title for the login page
      Text('投顾中台系统')
        .fontSize($r('app.float.page_title_text_size')) // Using an existing resource for font size
        .fontWeight(FontWeight.Bold) // Making the title bold
        .fontColor($r('app.color.title_text_color')) // Using an existing resource for font color
        .margin({ bottom: $r('app.float.logo_margin_top') }); // Adding some margin below the title

      Image($r('app.media.logo'))
        .width($r('app.float.logo_image_size'))
        .height($r('app.float.logo_image_size'))
        .margin({ top: $r('app.float.logo_margin_top'), bottom: $r('app.float.logo_margin_bottom') })

      Text($r('app.string.login_page'))
        .fontSize($r('app.float.page_title_text_size'))
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.title_text_color'))

      Text($r('app.string.login_more'))
        .fontSize($r('app.float.normal_text_size'))
        .fontColor($r('app.color.login_more_text_color'))
        .margin({ bottom: $r('app.float.login_more_margin_bottom'), top: $r('app.float.login_more_margin_top') })

      TextInput({ placeholder: '账号' })
        .placeholderColor(Color.Gray)
        .margin({ bottom: 15 })
        .height(50)
        .borderRadius(8)
        .backgroundColor(Color.White)
        .onChange((value: string) => this.account = value)

      TextInput({ placeholder: '密码' })
        .type(InputType.NEW_PASSWORD)
        .placeholderColor(Color.Gray)
        .margin({ bottom: 25 })
        .height(50)
        .borderRadius(8)
        .backgroundColor(Color.White)
        .onChange((value: string) => this.password = value)

      Button('登录')
        .width('100%')
        .height(50)
        .backgroundColor(Color.Blue)
        .fontColor(Color.White)
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .borderRadius(8)
        .onClick(() => this.login())

      if (this.isShowProgress) {
        LoadingProgress()
          .width(30)
          .height(30)
      }
    }
    .backgroundColor($r('app.color.background'))
    .height(CommonConstants.FULL_PARENT)
    .width(CommonConstants.FULL_PARENT)
    .padding({
      left: $r('app.float.page_padding_hor'),
      right: $r('app.float.page_padding_hor'),
      bottom: $r('app.float.login_page_padding_bottom')
    })
  }
}
