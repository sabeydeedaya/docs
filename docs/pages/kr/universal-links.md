## 개요

Branch는 Universal Link를 쉽게 활성화할 수 있게 하고 동시에 이를 향상시키고 있습니다. 이는 온전한 Attribution 매칭 기능을 지원하고 Universal Link 랜딩이 실패할 때 기타 UX 를 파괴하지 않은 대안을 제공하며 앱 미설치자가 앱 설치하고 최초 실행할 때도 지정한 컨텐츠로 라우팅할 수 있게 도와줍니다.

![image](/_assets/img/pages/deep-linking/universal-links/how_branch_improves.png)

## 설정

### Branch Dashboard에서 Universal Link를 활성화

1. Branch Dashboard에서 [Link Settings](https://dashboard.branch.io/link-settings)로 이동합니다.
1. iOS redirects에서 `Enable Universal Links` 박스를 체크합니다.
1. 귀사 앱의 Bundle Identifier를 입력합니다.
1. 귀사 앱의 App Prefix를 입력합니다. (Apple Developer Portal의 [해당 페이지](https://developer.apple.com/account/ios/identifier/bundle) 에서 지정 앱을 클릭하여 찾을 수 있습니다. )
1. `Save` 버튼을 눌러서 저장합니다.

![image](/_assets/img/pages/deep-linking/universal-links/dashboard_enable_universal_links.png)

### XCode에서 Associated Domains 를 활성화

1. 프로젝트 파일에서 `Capabilities` 탭으로 이동합니다.
1. 마우스 스크롤 다운하여 `Associated Domains` 를 활성화 합니다. ![image](/_assets/img/pages/deep-linking/universal-links/enable_ass_domains.png)

!!! tip "If you see an error after this step"
	![image](/_assets/img/pages/deep-linking/universal-links/enable_ass_domains_error.png)

	만약 진행과정에 에러가 발생한다면 다음과 같이 처리합니다.

	- XCode 프로젝트에서 정확한 Team이 선택되었는지 확인합니다.
	- XCode 에 설정한 Bundle Identifier 가 Apple Developer 계정에 등록한 것과 일치한지 확인합니다.

### Branch link 도메인을 추가

1. Branch Dashboard 에서 [Link Settings](https://dashboard.branch.io/link-settings) 페이지로 이동합니다.
1. 마우스로 `Link Domain` 영역으로 이동합니다
1. 도메인을 복사합니다.![image](/_assets/img/pages/deep-linking/universal-links/subdomain-setting.png)
1. XCode Associated Domains의 `Domains` 섹션에서 `+` 아이콘을 클릭하여 다음 도메인을 추가합니다. (xxxx 을 귀사 앱이 Branch로부터 부여받거나 귀사에서 선택한 subdomain prefix로 치환해야 합니다.)
	* `applinks:xxxx.app.link`
	* `applinks:xxxx-alternate.app.link`
	* `applinks:xxxx.test-app.link`
	* `applinks:xxxx-alternate.test-app.link`

![image](/_assets/img/pages/deep-linking/universal-links/add_domain.png)

!!! warning "구 버전 링크에 대한 지원"
	만약 Default domain name 박스에 구 버전인 bnc.lt 도메인이 표시된다면 다음 내용을 바꿔야 합니다: `applinks:bnc.lt`

!!! tip "커스텀 도메인 또는 서브 도메인의 사용"
	만약 귀사에서 [Branch Link 에게 커스텀 도메인 또는 서브 도메인](/dashboard/integrate/#change-link-domain)을 사용한다면 `applinks: 뒤의 값을 [mycustomdomainorsubdomain]`와 `XXXX-alternate.app.link`로 추가해야 합니다. 만약 Branch로부터 부여받은 app.link 서브 도메인에 확실하지 않다면 integrations@branch.io 로 연락주시기 바랍니다.

## Advanced

### Universal Links 를 지원하는 앱/브라우저

아쉽게도 Universal Links 는 아직 모든 곳에서 작동하지는 않습니다. Branch 에서는 가장 널리 알려져 있는 앱들의 Universal Links 지원상태를 수집해 보았습니다.

#### 항상 작동하는 앱

아래 앱 중 하나에서 Universal Link 를 실행하면 항상 정상 작동할 수 있습니다.

| 앱/브라우저 | 지원상태
| --- | ---
| Messages | 작동
| Mail | 작동
| WhatsApp | 작동
| Gmail | 작동
| Inbox | 작동

#### Apple 에 의해 제한되는 앱

Apple 에서는 사용자가 헷갈리게 하는 상황을 피하기 위해 특정 상황에서 Universal Links 의 작동을 제한하고 있습니다.

- 링크를 브라우저의 URL 필드에 복사한다면 Universal Links 는 작동하지 않습니다.
- Universal Links 는 사용자가 `<a href=”...”>` 에 삽입된 도메인을 가로지르는 링크를  클릭했을 때 작동합니다. 예를 들면 Google.com 에 있는 Universal Link 가 bnc.it 로 포인팅하고 있다면 해당 링크로 앱을 실행시킬 수 있습니다.
- Universal Links 는 사용자가 `<a href=”...”>` 에 삽입된 같은 도메인의 링크를 클릭했을 때 작동하지 않습니다. 예를 들면 Google.com 에 있는 Universal Link 가 Google.com 에 있는 다른 Universal Link 를 포인팅하고 있다면 앱이 실행되지 않습니다.
- Universal Links 는 Javascript 를 통해 호출될 수 없습니다. (`window.onload` 또는 `<a>` element 에서 `.click()` 를 호출) 예외인 상황은 이것이 사용자 액션의 일부분이 되어야 합니다.

| 앱/브라우저 | 지원상태
| --- | ---
| Safari | 조건적으로 작동
| Chrome | 조건적으로 작동

#### 상황에 따라 가끔 작동하는 앱

Web View 가 빌드되어 있는 앱 (Google, Twitter, Facebook, Facebook Messenger, WeChat 등)에서는 오직 WebView 가 이미 오픈되었을 때만 Universal Links 가 작동합니다. 다르게 말하면 Universal Links 는 앱의 feed 또는 메인 App View 에서 작동하지 않습니다.

이런 제한 아래에서 작업하려면 링크에 반드시 [deepviews](/web/deep-views/) 또는 기타 유사한 것이 있어야 합니다. Deep View에는 뒤에 Universal Link 가 삽입되어 있는 call-to-action 링크/버튼이 있습니다. 이렇게 하면 Branch Link 가 App Feed 에서 클릭되었을 때 Deep View 가 포함한 Web View 를 오픈합니다. 그 다음 사용자가 Deep View 에 있는 링크/버튼을 클릭하여 앱을 실행할 수 있습니다. Apple 에서 제한하고 있는 부분(이전 섹션에서 언급)은 Deep View에서도 동일하게 적용됩니다.

| 앱/브라우저 | 지원상태
| --- | ---
| Google | 조건적으로 작동
| Facebook | 조건적으로 작동
| Facebook Messenger | 조건적으로 작동
| WeChat | 조건적으로 작동
| Twitter | 조건적으로 작동
| LinkedIn | 조건적으로 작동
| Any app using `SFSafariViewController` | 조건적으로 작동

#### 특별한 케이스인 앱

| 앱/브라우저 | 지원상태
| --- | ---
| Slack | 링크를 Safari 로 오픈하도록 설정하면 작동합니다. 다른 상황에서는 이전 섹션에서 언급한 것과 같은 조건적으로 작동합니다.


#### 작동되지 않은 앱

| 앱/브라우저 | 지원상태
| --- | ---
| Pinterest | 깨짐
| Instagram | 깨짐
| Telegram | 깨짐

### Universal Links 를 실패하게 하는 일반적인 이슈

!!! tip "XCode 프로젝트를 위한 자동화된 검증"
	[Universal Links Validator](/resources/validation-tools/#universal-link-validator). 를 이용하여 XCode 프로젝트가 정확하게 설정되었는지 확인할 수 있습니다.

##### Universal Link 를 수동으로 Safari 브라우저에 입력하여 테스트하셨나요?
Universal Links 는 Safari 에 입력했을 때 적절하게 작동하지 않습니다. Notes 또는 iMessage 앱을 사용하여 테스트하시기 바랍니다.

##### Branch Link 를 다른 링크에 포장하여 Redirecting 하고 있나요?
대부분의 상황에서 Universal Link는 클릭 트래킹에 포장되어 있을 때 앱을 실행시키지 않습니다. Branch Links 를 포함한 Universal Links 는 반드시 독립적이어야 합니다. 만약 Universal Links 가 모든 상황에서 작동하기를 바란다면 다른 링크에서 Branch Links 로 Redirect 하지 않도록 해야 합니다.

##### Team ID & Bundle ID 가 Branch Dashboard 에 설정한 것과 동일하나요?
이 정보들은 Branch Dashboard 에서 Settings->Link Settings 에서 확인할 수 있습니다. Branch Dashboard 에 설정된 Team ID 와 Bundle ID 는 앱에 실제 설정된 것과 동일해야 합니다. Team ID 는 본 [링크](https://developer.apple.com/membercenter/index.action#accountSummary)에서 찾을 수 있습니다. Bundle ID 는 XCode 의 `General` 탭에서 확인할 수 있습니다. 만약 Apple App Prefix 가 귀사의 Team ID 와 다르다면 App Prefix 를 사용해야 합니다. App Prefix 는 Apple Developer Portal 의 App IDs 에서 확인할 수 있습니다.

##### 앱을 삭제하고 재설치 하셨나요?
앱을 삭제하고 재설치하는 경우를 제외하고 iOS 는 apple-app-site-association 파일을 다시 가져오지 않습니다. (유일한 예외는 App Store 업데이트입니다. iOS 는 업데이트때마다 apple-app-site-asssociation 파일을 다시 가져옵니다. 그 의미는 사용자가 applinks entitlement 가 포함한 앱으로 업데이트할 때 Universal Link 가 작동하기 시작합니다. )

##### Universal Links 는 비활성화 될 수 있습니다.
만약 사용자가 Universal Link 를 통해 성공적으로 앱을 실행했다면 상태 바의 오른쪽 위 코너에서 app.link(또는 귀사 도메인)과 전진 버튼을 볼 수 있습니다. 만약 사용자가 해당 버튼을 클릭한다면 Apple 은 더 이상 Universal Links 를 활성화시키지 않습니다. Universal Links 를 다시 활성화하려면 Messages(iOS 9 only) 또는 Notes(iOS 10/9) 에서 링크를 길게 누른다음 “Open in<>” 을 선택합니다.

##### 커스텀 도메인을 사용
커스텀 도메인을 정확하게 설정하였는지 확인해야 합니다. 설정에 관한 이슈는 [Universal Link Validator](http://branch.io/resources/aasa-validator/)를 통해 찾을 수 있습니다.

귀사의 도메인에 SSL 을 적절하게 설정하지 않았다면 아래와 같은 에러 메시지를 발견할 수 있습니다.:

```js
Sep 21 14:27:01 Derricks-iPhone swcd[2044] <Notice>: 2015-09-21 02:27:01.878907 PM [SWC] ### Rejecting URL 'https://examplecustomdomain.com/apple-app-site-association' for auth method 'NSURLAuthenticationMethodServerTrust': -6754/0xFFFFE59E kAuthenticationErr
```

위 로그는 실제 디바이스를 XCode 에 연결하여 확인할 수 있습니다. (Window->Devices->해당 디바이스 선택하고 XCode 메인 뷰에서 왼쪽 아래에 있는 “UP” 화살표를 클릭합니다.)

만약 귀사에서 현재 커스텀 서브 도메인을 사용하고 있다면 해당 도메인의 CNAME 은 `custom.bnc.lt` 로 포이팅 되어야 합니다.

### continueUserActivity 에 YES 를 반환합니다.

사용자가 Universal Link 를 통해 앱을 실행했다면 Branch SDK 에서는 해당 링크에 `bnc.lt` 가 포함되어 있는지 체크합니다. 만약 있다면 `handledByBranch` 가 `YES` 를 반환하고 아니라면 `handledByBranch` 는 `NO` 를 반환합니다. 이는 저희가 서버 호출을 하지 않고 들어온 링크가 Branch 로부터 온 것이 맞는지 명확하게 확인할 수 있게 합니다.

대부분의 구현사례에서는 딥링크 라우팅이 어떤 방식으로든 정확하게 처리되므로 이슈가 되지 않습니다. 하지만 만약 커스텀 링크 도메인을 사용되고 있고 들어오는 모든 Branch 에서 생성한 Universal Link 에 대해 `handledByBranch` 값을 `YES` 로 반환하려면 아래와 같은 방식으로 커스텀 도메인을  Branch SDK 에 알려주어야 합니다.

1. 앱의 **Info.plist** 파일에서 `branch_universal_link_domains` 라는 Key 를 생성합니다.
1. 커스텀 도메인을 하나의 String 으로 추가합니다. ![image](/_assets/img/pages/deep-linking/universal-links/branch-universal-link-domain.png)
1. 저장합니다.
