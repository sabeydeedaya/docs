## 개요

Branch 링크는 페이스북 앱 인스톨 캠페인 광고에 사용 가능하며 광고를 통해 발생된 인스톨을 Branch 대시보드 내에서 확인, 그리고 새로운 유저들을 앱 첫 오픈 시에 원하는 페이지로 딥링킹 하실 수 있습니다.

주의: 본 문서는 Facebook 과 Audience Network에 해당하는 내용입니다.

본 문서는 다음 Facebook 광고 캠페인 타입을 지원합니다.

Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
고려 사항 | 앱 인스톨  | 앱 전용: 인스톨

#### Facebook 캠페인 광고 형식 지원 표

Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic | Canvas
--- | --- | --- | --- | --- | --- | --- | ---
앱 인스톨 | ✔︎ | ✔︎ | ✔︎ | ✔︎ | - | - | ✔︎

다른 페이스북 광고 캠페인 타입을 찾으시는 경우 [Facebook Ads Overview Guide](/deep-linked-ads/facebook-ads-overview) 에서 확인 부탁 드립니다.

## 설정 방법

!!! warning "전제 조건"
	* [x] Facebook 광고에서 인스톨을 트래킹하길 원하신다면 [Branch SDK 연동](/apps/ios/#integrate-branch) 이 필요합니다.
	* [x] 광고에서 유저를 특정 앱 내 컨텐츠로 리다이렉션 하기 위해서는 [딥링크 라우팅 구성](/deep-linking/routing/)이 필요합니다.
	* [x] Ads는 MAU 기반으로 가격이 책정된 프리미엄 제품입니다. 이 기능을 사용하려면 Ads 제품에 가입하십시오.


#### Facebook을 광고 파트너로 연동하기

!!! info "참고"
	본 연동 작업을 진행해 주시게 되면 어트리뷰션을 위해 Branch에서는 앱 이벤트를 페이스북으로 전송하게 됩니다. **이 작업은 딥링킹 활성화와는 무관하며** 해당 활성화를 위해서는 아래 작업이 필요합니다.

Branch 대시보드 내에서 페이스북을 광고 파트너로 연동하는 방법은 다음과 같습니다. 이벤트 전송을 위한 고급 옵션 세팅은 [여기](/deep-linked-ads/facebook-ads-faq/#facebook-mmp-event-options) 를 참조해 주십시오.

1. [Partner Management tab](https://dashboard.branch.io/ads/partner-management) 으로 이동합니다.

    ![Ads Partner Management](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/ads-partner-management.png)

1. **Facebook** 을 검색합니다.

    ![Find Facebook in Partner Manager](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/find-facebook-partner.png)

1. `Connect With Facebook` 을 클릭합니다.

    ![Connect with Facebook](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/1-connect.png)

1. Facebook 계정으로 로그인합니다.

    ![Login](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/2-login.png)

1. Branch가 공개 프로파일 정보를 받을 수 있도록 확인합니다.

    ![Public profile](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/3-profile.png)

1. Branch가 `ads_read` 권한을 받을 수 있도록 확인합니다.

    ![OAuth scopes](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/4-scopes.png)

 	`ads_read` 는 Branch 대시보드 내에서 클릭과 임프레션 확인 용도로 사용됩니다.

1. Install 광고 혹은 App Engagement 광고를 진행할 광고 계정을 선택합니다.

    ![Choose ad accounts](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/5-adaccounts.png)

    !!! Note
        광고 집행 어카운트 확인에 어려움이 있으시다면 [FAQ](/deep-linked-ads/facebook-ads-faq/#im-having-problems-finding-or-choosing-the-correct-ad-accounts)페이지를 확인해 주십시오.

1. Facebook 광고 집행을 위해 Facebook 앱 아이디를 선택합니다.

    ![enter app id](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/6-app-1.png)

1. 앱 아이디를 복사합니다.

    ![find app id](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/7-app-2.png)

1. 앱 아이디 붙여넣기 후 `Save` 클릭.

    ![paste app id](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/8-app-3.png)

1. Facebook이 광고 파트너로 연동되었습니다!

	만일 Facebook과 Branch 간에 서로 다른 어트리뷰션 윈도우가 설정되어 있을 경우 아래와 같이 확인될 수 있습니다.  두 대시보드의 어트리뷰션 윈도우를 동일하게 조정하는 방법은 아래 페이지의 링크를 참조 부탁 드립니다.

    ![complete](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/9-complete.png)

1. 마지막으로 페이스북 광고 링크 생성을 위해서는 우측 상단의 `Create Facebook Link` 버튼을 클릭해 주십시오.

    ![Create Facebook Ad Link](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/create-facebook-link.png)


### 비용 데이터

Branch는 광고 파트너에 아래 비용 메트릭을 제공합니다.

Analytics Tag | Description | Used for
--- | --- | ---
비용| 비용 모델과 상관없이 해당 측정 기준 (분석 태그, 사용자 데이터, 시간 범위) 의 총 비용 (지출) | 총 비용 확인
eCPI | 인스톨 당 비용 | 모든 네트워크의 인스톨 당 비용 데이터의 평균 값 확인
eCPC | 클릭 당 비용 | 모든 네트워크의 클릭 당 비용 데이터의 평균 값 확인
eCPM | (임프레션 / 1000) 당 비용 | 모든 네트워크의 임프레션 (/1000) 당 비용 데이터의 평균 값 확인
eCPA | 구매 (웹과 앱 구매 포함) 당 비용 | 모든 네트워크의 구매 당 비용 데이터의 평균 값 확인
투자 수익 (ROI) | (revenue / cost) * 100 | (수익-비용 / 비용) * 100 | 광고 비용 당 발생된 '이익'의 비율을 이해'하여 투자 수익 창출


!!! info
    모든 비용 데이터는 현지 통화로 처리 된 다음 대시보드에서 데이터가 저장되는 날의 해당 환율에 대한 환율을 사용하여 USD로 변환됩니다. 즉, 대시보드에서는 캠페인 비용이 USD로 전환된 금액이 표시됩니다.


### 데이터 확인 방법

브랜치 대시보드의 [Ads Analytics Page](https://dashboard.branch.io/ads/analytics) 에서는 광고 캠페인의 퍼포먼스 확인을 위한 상호적 시간 그래프와 표를 제공합니다.

![Example Ads Analytics Graph](/_assets/img/ingredients/deep-linked-ads/view-ad-link-data/analytics-graph.png)

표는 각각의 광고 캠페인 퍼포먼스의 요약 데이터를 보여줍니다. 표의 우측 상단 **download button** 을 누르시면 해당 차트의 내용을 CSV 파일로 다운로드 받으실 수 있습니다.

![Example Ads Table](/_assets/img/ingredients/deep-linked-ads/view-ad-link-data/analytics-table.png)

!!! note "데이터 분석 및 상호 작용"
	 `Compare by + ` 버튼을 사용하여 광고 캠페인 퍼포먼스를 분석 및 비교하실 수 있습니다. 해당 버튼을 사용하여 파라미터를 추가하여 데이터를 나누어 확인이 가능합니다.

	그런 다음 `and +` 버튼으로 더욱 정제된 데이터를 얻을 수 있으며 이를 활용해 광고 캠페인 퍼포먼스에 더 깊은 인사이트를 얻을 수 있습니다.


#### 선택사항: 앱 인스톨 캠페인에 딥링크 활용하기

이 섹션은 **App-only 광고를 진행하시는 경우** 필수 조건 사항은 아닙니다.저희는 페이스북 측으로 부터 자동적으로 campaign, ad set, ad, 그리고 creative 정보를 불러올 수 있습니다. 하지만, 유저가 딥링크로 리다이렉트 되기를 원하시는 경우, 본 섹션의 가이드를 참조해 주십시오.

#####  앱에서 Facebook 인스톨 딥링크를 불러오기

1. 안타깝게도 S2S 연동의 경우 딥링크 정보를 받아오는데 한계가 있습니다. 가능하다면 Facebook [Android](https://developers.facebook.com/docs/android/getting-started) / [iOS](https://developers.facebook.com/docs/ios/getting-started) SDKs 를 인스톨하시는 부분을 권장 드립니다. 이 경우 Branch에서는 클라이언트 사이드 방식으로 보다 정확한 트래킹이 가능합니다.
1. 안드로이드의 경우, Proguard를 사용하고 있다면 Facebook SDK를 유지하기 위하여 아래 부분을 삽입해 주셔야 합니다.

	```xml
	-keep class com.facebook.applinks.** { *; }
	-keepclassmembers class com.facebook.applinks.** { *; }
	-keep class com.facebook.FacebookSdk { *; }
	```

1. Branch에 Facebook SDK를 사용하여 초기화 시 앱 링크를 불러오도록 지시합니다.

	- *iOS - Objective C*

		```objc
		// This goes BEFORE initSession is called in didFinishLaunchingWithOptions
		[[Branch getInstance] registerFacebookDeepLinkingClass:[FBSDKAppLinkUtility class]]
		```

	- *Android - Java*

		```java
		// This goes in the getAutoInstance call in your Application class
		Branch.getAutoInstance(this).enableFacebookAppLinkCheck();
		```

##### 딥링킹을 위해 광고 링크 생성하기

1. [Partner Management page](https://dashboard.branch.io/ads/partner-management)에서 Facebook Partner 내의 `Create Facebook Link` 버튼을 클릭한 뒤 `App Install 혹은 Engagement` 를 선택합니다.
<img src="/_assets/img/pages/deep-linked-ads/reusable-images/create-link-install-engagement.png" alt="Link Creation" class="half left">
1. 향후 참조를 위하여 링크 이름을 삽입합니다.
1. 링크의 광고 형식을 **App Only** 로 선택한 뒤, 광고 파트너를 **Facebook** 으로 선택, 그리고 두번째 광고 형식을 **App Install Ads** 로 설정합니다.
![Create Ad Link](/_assets/img/pages/deep-linked-ads/facebook-app-install-ads/link-setup.png)

1. Configure Options 탭에서 딥링크 데이터 삽입 칸에 사용하고 있는 딥링킹 파라미터를 추가해 주십시오. 해당 섹션을 사용하여 앱 인스톨 이후 딥링킹 되어질 커스텀 링크 파라미터를 설정하실 수 있습니다. 쿠폰 코드나 페이지 식별자 등을 포함할 수 있으며 자세한 사항은 [Deep Link Routing](/deep-linking/routing/) 에서 확인 부탁 드립니다.
![Create Ad Link](/_assets/img/pages/deep-linked-ads/reusable-images/create-link-deep-link-data.png)

1. 이것은 앱 인스톨 광고인 관계로 리다이렉션은 무시될 수 있습니다. 따라서 본 섹션을 변경하지 않은 상태로 유지하는 것을 권장합니다.
1. 애널리틱스는 위 Facebook 연동을 통해 자동적으로 기록되는 관계로 해당 애널리틱스 섹션에서의 설정은 무시하셔도 됩니다.

!!! warning ""
	캠페인을 보다 효과적으로 집행하기 위해서 Deepviews가 비활성화 되어 있는지 확인해 주십시오. 전체 계정 단에서 [Deepviews 비활성화](/web/deep-views/) 하거나 [링크 단에서 Deepviews 를 비활성화 ](/web/deep-views/#disable-per-link-deepviews)하실 수 있습니다.

#####  Ad Link를 딥링크로 설정하기

1. Facebook 앱이 있는 계정에 로그인 한 상태로 [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create) 페이지로 이동합니다.
1. 캠페인 마케팅 목적에 **App Installs** 를 선택합니다.
![Campaign Selection](/_assets/img/pages/deep-linked-ads/facebook-app-install-ads/campaign-selection.png)
1. 광고할 앱, 오디언스, 게재 위치, 그리고 예산 등을 지정하여 캠페인 생성합니다. 그런 다음 계속을 눌러 광고 작성 단계로 들어갑니다.
1. 이제 광고 형식을 선택하고 광고를 목적에 맞게 커스터마이징 합니다.
1. **Destination** 필드에서 광고를 앱 스토어로 리다이렉트 할 것인지 혹은 Facebook 캔버스 광고로 보낼 것인지 선택할 수 있습니다.
	- 앱 스토어 선택 시 **Deep Link** 칸에  Branch Ad link를 삽입합니다.

	![Deep Link Placement](/_assets/img/pages/deep-linked-ads/facebook-app-install-ads/deep-link.png)

	- 캔버스 선택 시 Branch Ad link 를  **보내고자 하는** Website URL 형태로 삽입합니다.

	![Canvas Setup](/_assets/img/pages/deep-linked-ads/facebook-app-install-ads/facebook-canvas-setup.png)

1. 나머지 광고 캠페인 세팅을 완료합니다.

이제 귀하의 Facebook 광고 캠페인이 Branch Links를 사용하여 App Installs를 처리하도록 설정되었습니다!

!!! note "선택 사항 : 여러 링크가 있는 광고 형식"
	캐러셀 형식과 같은 일부 광고 형식은 여러개의 딥링크가 필요한 경우가 있습니다. 각 이미지 또는 광고 구성 요소에 대한 링크 성능 데이터를 가지려면 해당 광고 형식의 각 부분에서 사용할 여러개의 Branch 광고 링크를 만듭니다. 이 형식은 고객을 다른 콘텐츠 또는 제품으로 유도하려는 경우 유용합니다.

##### 광고에서 딥링킹 테스트

UFacebook에서 광고 제작 과정에 사용되는 데모/미리보기 광고는 실제 Facebook 광고와 다른 메커니즘을 사용합니다. **따라서 Facebook 광고의 딥링킹을 테스트할 수 없습니다**. 이미 Facebook 담당자와 해당 문제에 대해 확인을 마쳤으니 불필요한 테스트는 지양하시기 바랍니다.

딥링킹 기능을 테스트하려면 실제 광고 시스템이 아닌 Facebook의 지원 도구 (helper tool) 를 사용하세요. 다음 순서에 따라 딥링킹 기능을 테스트해 보세요.

1. [Ads tester tool](https://developers.facebook.com/tools/app-ads-helper/)로 이동합니다.
1. 광고할 앱을 선택합니다.
1. `딥링크 테스트` 버튼까지 아래로 스크롤합니다.
1. Branch 링크를 붙여넣습니다.
1. `디퍼드 링크 전송` 을 체크합니다.
1. `OS/Android로 전송` 을 클릭합니다.
1. 앱을 설치하면 딥링크로 연결되어야 합니다!

!!! note "테스트 시 발생하는 일반적인 실수"
	1. 기기에서 GAID 또는 IDFA를 재설정할 경우 테스트하기 전에 Facebook을 삭제하고 재설치해야 합니다. Facebook은 실행될 때마다 IDFA/GAID를 업데이트하지 않습니다.
	1. 디퍼드 링크를 전송할 때 알림을 보내거나 클릭하지 않아도 됩니다. '디퍼드 링크 전송'을 선택하면 딥링크 데이터가 있는 테스트 기기의 일치 항목이 자동으로 대기열에 저장됩니다. 알림은 디퍼드 딥링킹과 완전히 별개입니다.
	1. '디퍼드 링크 전송'을 클릭한 데스크톱의 Facebook 계정은 대기열에 있는 디퍼드 딥링크 데이터를 통해 테스트 기기에 로그인한 계정과 일치해야 합니다. Branch는 테스트 기기의 여러 계정에서 로그인과 로그아웃을 통해 Facebook이 일치 항목을 올바르게 대기열에 포함시키지 못하게 하는 문제를 발견했습니다.
	1. 누군가가 여러분의 광고를 좋아한다는 것을 확인했다면 굳이 광고를 클릭하여 테스트하려고 하지 마세요. 알림에 표시되는 여러분의 실제 광고를 클릭해도 딥링크로 연결되지 않습니다.

## 문제 해결 방법

Facebook 앱 광고 관련하여 문의 사항이 있으신 경우  [Facebook app ads FAQ](/deep-linked-ads/facebook-ads-faq/#sources-of-discrepancies-between-facebook-and-branch)페이지를 참조 부탁 드립니다.

 만일 Facebook의 web-only ads 관련 문의 사항이 있으신 경우 위의 FAQ 페이지 참조 부탁 드리며 [contact us](https://support.branch.io/support/tickets/new)  페이지에 "Facebook web-only ads issues" 제목으로 문의 주십시오.

#### Branch 비용 데이터가 광고 파트너 대시보드와 일치하지 않음

광고 파트너의 대시보드와 Branch 대시보드에서 동일한 시간대를 선택했는지 확인하십시오.

#### 광고 파트너와 Branch 간에 비용 메트릭은 일치하나 CPI metric이 일치하지 않음

Branch의 마지막 클릭 어트리뷰션 모델은 Branch 와 자체 기여 네트워크 (SAN)의 인스톨 수에 차이를 유발할 수 있으며 이로 인해 CPI 메트릭 역시 수치 차이가 발생할 수 있습니다. 비용 및 인스톨 메트릭이 광고 파트너의 대시보드와 일치하는지 확인합니다. 인스톨 수치 차이는 발생할 수 있으며 인스톨 측정 로직이 상이함에 따라 Branch의 수치가 더욱 정확할 수 있습니다. 만일 수치 차이가 크게 발생하고 있는 경우 트러블슈팅 스텝을 따라 인스톨 수치 차이의 원인을 파악할 수 있습니다.

#### 비용 , 클릭 그리고 임프레션 데이터가 보이지 않음

일반적으로 파트너를 재인증하고 24시간을 기다리면 비용 데이터가 다시 활성화됩니다.

재인증 시 올바른 계정을 선택했는지 다시 확인하십시오. 인증 프로세스에서 선택한 계정에 대해서만 비용 데이터를 가져옵니다.

배경 : SAN (자체 기여 네트워크)의 비용, 클릭 및 노출 데이터는 일반적으로 파트너 API에서 가져옵니다. (예외: 웹 캠페인과 같이 Branch 임프레션 픽셀 혹은 링크가 의도적으로 어트리뷰션에 사용되는 경우) SAN을 활성화하게 되면 해당 프로바이더와 인증이 완료됩니다. Branch는 이 인증을 사용하여 클릭, 비용 및 노출 데이터를 검색합니다. 인증 토큰이 만료되면 (예 : 비밀번호를 재설정하거나 파트너가 토큰을 재설정 한 경우) 클릭, 노출 또는 비용 데이터가 표시되지 않을 수 있습니다. 이 경우 단순히 다시 인증하면 토큰이 새로 고쳐집니다.

#### 비용 데이터가 보이지 않거나 특정 캠페인에서 다르게 표시됨

인스톨과 같은 다운스트림 이벤트의 경우, 대시보드 상에서 항상 모든 옵션을 사용하여 비교하실 수 있습니다. 하지만 클릭, 노출, 그리고 비용 데이터의 경우 Partner API를 통해 데이터를 불러오게 되며 해당 API는 Branch가 지원하는 동일한 메트릭으로 비용 데이터를 분류하지 않을 수 있습니다. 따라서 Branch 대시보드 상에서 비용 데이터와 인스톨 데이터를 동일 선상에서 비교하는데 어려움이 있을 수 있습니다.


### 딥링킹 문제 해결

#### Branch 의 딥링크가 방해될 경우

Facebook 앱 광고에서 Branch 딥링크를 사용하는 경우 다음을 확인하세요.

Branch는 최근, 앱이 Facebook SDK를 호출하여 iOS 및 Android 앱 내에 디퍼드 앱 링크를 가져오는 문제를 발견했습니다. Branch 호출은 직접 API 통합을 통해 이와 동일한 메커니즘을 사용하지만, 그 전에 Facebook의 SDK가 링크를 가져올 경우 Branch는 모든 딥링크 데이터를 확인할 수 없습니다. 앱에서 다음 API에 대한 호출을 주석 처리해야 합니다.

- [Android: fetchDeferredAppLink](https://developers.facebook.com/docs/reference/android/current/class/AppLinkData/)
- [iOS: fetchDeferredAppLink](https://developers.facebook.com/docs/reference/ios/current/class/FBSDKAppLinkUtility/)

#### Facebook 앱 링크를 불러오는데 발생하는 문제

Facebook이 Branch 링크에서 앱 링크를 읽는 데 문제가 있는 경우, 해당 절차를 테스트하는 동안 다음과 같은 메시지가 표시될 수 있습니다. 이 메시지는 OG 태그에 손상된 부분이 있어 Facebook에서 해당 링크를 파싱하지 못할 때 표시됩니다.

<img src="/_assets/img/ingredients/deep-linked-ads/fb-ads-support/invalid-app-links-error.png" alt="Invalid App Links" class="left half">
<img src="/_assets/img/ingredients/deep-linked-ads/fb-ads-support/missing_applinks.png" alt="Troubleshooting" class="left">

**OG 태그 다시 스크랩**

Facebook에서 제공한 [OG 태그 테스터 도구](https://developers.facebook.com/tools/debug/og/object)를 사용하여 OG 태그를 다음과 같이 테스트할 수 있습니다.

1. Branch 링크를 입력 URL 상자에 붙여넣습니다.
1. 기존의 스크랩 정보 표시 버튼을 클릭합니다.
1. 출력 창에서 앱 링크 관련 오류를 검사합니다.
1. 새 스크랩 정보 가져오기 버튼을 클릭합니다. Branch 링크 설정이 올바른 경우 이 마지막 단계에서 일반적으로 문제가 해결됩니다.

!!! tip ""
		새 링크를 만들어 광고에 사용하기 전에 이 명령어를 사용하여 다시 스크랩 프로세스를 자동화할 수 있습니다.


	``` sh
	curl --insecure "https://graph.facebook.com/?id=[YOUR-URL-TO-SCRAPE]&scrape=true"
	```

**OG 태그 테스터가 계속해서 문제를 보고하는 경우**

1. [링크 세팅](https://dashboard.branch.io/#/settings/link) 에서 모든 플랫폼과 앱이 정확하게 설정되어 있는지, URI 스키마와 링크가 플레이/앱 스토어로 정확하게 연결되어 있는지 확인해 주십시오. 만일 iOS 리다이렉션에 커스텀 URL을 사용하고 있는 경우에는 URL내에 `?id[10-digit App Store ID]`을 추가해 주셔야 Facebook의 앱 링크와 OG tags를 정확하게 읽을 수 있습니다.
    - 예를 들어 앱 스토어 URL 이 다음과 같을 경우 `https://itunes.apple.com/us/app/my-app-name/id1234567890`, 귀하의 커스텀 URL 값은 `https://example.com?id1234567890` 입니다.
1. 출력 창의 오류가 제목,내용이 누락되는 이슈 등의 OG 태그와 관련이 있는 경우 ?debug=true를 [통합 테스팅 페이지]({{base.url}}/getting-started/integration-testing/guide/#debugging-an-individual-link)의 지침에 따라 추가하여 링크 OG 태그를 점검할 수 있습니다.
1. 링크 레벨당 OG 태그를 설정하지 않은 경우 대시보드의 글로벌 소셜 미디어 디스플레이 맞춤 설정을 [링크 설정](https://dashboard.branch.io/#/settings/link) 페이지에서 확인하세요.

**직접 딥링크 사용**

마지막 방법으로 직접 딥링크를 수동 입력할 수 있습니다. 딥링크를 검색하여 가져오는 방법은 다음과 같습니다.

1. Facebook 의 [Open Graph Object Debugger](https://developers.facebook.com/tools/debug/og/object/)로 이동합니다.
1. 광고에 사용할 Branch 링크를 입력합니다.
1. **Fetch new scrape information** 을 클릭합니다.
1. `al:ios:url`를 검색합니다. (예시: `<meta property="al:ios:url" content="myapp://open?link_click_id=link-242052337263342024" />`)
1. 이 값`(myapp://open?link_click_id=link-242052337263342024)`을 복사하여 광고 내 딥링크로 삽입합니다.

위의 방법으로 해결되지 않을 경우 integrations@branch.io 로 즉시 문의해 주세요.

#### 앱 제한에 대해 알려진 문제

최근 Branch는 Facebook 시스템 내의 버그를 발견했습니다. 이 버그는 고급 Facebook 앱 설정 탭의 기본값을 변경하면 로봇이 앱 링크를 읽지 못하게 막습니다. 다음 설정을 확인하세요.

- 알코올 포함: **아니요**
- 나이 제한: **만 14세 이상**
- 소셜 검색: **예**
- 국가 제한: **아니요**

**정확하게** 아래와 같이 설정되어 있어야 합니다:

![App Restrictions Troubleshooting](/_assets/img/ingredients/deep-linked-ads/fb-ads-support/app_restrictions.png)
