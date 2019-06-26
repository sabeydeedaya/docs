!!! info "<img src="../../../_assets/img/pages/deep-linked-ads/google/google-ads-logo.png" width="50"/> Google Ads 리소스"
- [Google Ads 개요](/deep-linked-ads/google-ads-overview/)
- [연동 활성화](/deep-linked-ads/google-ads-enable/)
- [앱 인스톨 캠페인](/deep-linked-ads/google-ads-uac/)
- [앱 참여 캠페인](/deep-linked-ads/google-ads-app-engagement/)
- **웹 기반 광고** (이 페이지)
- [문제 해결 및 FAQ](/deep-linked-ads/google-ads-troubleshooting/)

유니버설 웹 캠페인은 `앱 다운로드` 라는 단일 전환 유형에만 초점을 맞추는 반면에 **검색, 디스플레이, 쇼핑, 동영상** 같은 다른 Google Ads 캠페인 유형을 활용하면 앱과 웹 전환 모드를 활성화할 수 있도록 마케팅 노력을 확대할 수 있습니다.

## 요구 사항

### 기본 연동 전제 조건

* [x]  Branch SDK가 앱과 연동되어 있어야 합니다.
* [x]  iOS의 IDFA 또는 Android의 AAID를 수집합니다. 각 운영 체제에 관한 구체적인 정보는 [iOS](/apps/ios/#install-branch) 및 [Android](/apps/android/#install-branch)의 설정 가이드를 참조하세요.
* [x]  SDK를 통해 모든 필수 이벤트를 트래킹합니다. 지침은 [여기](#forwarding-events-to-google-ads)에서 참조하세요.
* [x]  Google Ads 계정에 대한 관리자 액세스 권한이 있어야 합니다. 이는 Google Ads에서 링크 ID를 생성하는 데 필요합니다.

### 웹 라우팅만 사용 시 전제 조건

웹 기반(비 UAC) Google Ads 캠페인을 실행 중인 상태에서 **데스크톱 및 모바일 웹** 전환에 Branch의 기능을 활용하고 싶다면 다음을 완료해야 합니다.

* [x]  [기본 연동 전제 조건](#basic-integration-prerequisites)
* [x]  [Branch 웹 SDK v2.48.0+](/web/integrate/)
* [x]  [관련 v2 이벤트 측정](/web/integrate/#track-events)

### 웹 + 앱 라우팅 사용 시 전제 조건

웹 기반(비 UAC) Google Ads 캠페인을 실행 중인 상태에서 **데스크톱/모바일 웹 전환 및 Branch 링크를 이용한 앱으로의 딥링킹** 을 지원하는 Branch의 라우팅 기능을 모두 활용하고 싶은 경우에는 다음 사항도 완료해야 합니다.

* [x]  [기본 연동 전제 조건](#basic-integration-prerequisites)
* [x]  [웹 라우팅 전제 조건](#web-routing-only-prerequisites)
* [x]  Google Ads 캠페인을 설정할 때 [변경된 Branch 링크](#modifying-your-final-url-to-include-your-branch-link-as-a-query-parameter)를 `Final URL` 필드에 넣습니다.
* [x]  Branch 딥링킹이 다음 중 한 가지 방법으로 활성화되어야 합니다.
  * [x]  링크 데이터에 `$uri_redirect_mode=1` 추가. 앱 링크 설정 `URI Deep Link Mode`가 `Intelligent`로 설정된 경우에는 이 링크 키가 필요하지 않습니다.
  * [x]  [앱 링크(Android)](/deep-linking/android-app-links/) 및/또는 [유니버설 링크(iOS)](/deep-linking/universal-links/).

![이미지](/_assets/img/pages/deep-linked-ads/google/web-based-ads-routing-options.png)

## 설정

!!! warning " **활성화 필요** "
	Branch와 Google Ads를 연동하려면 먼저 Branch 대시보드에서 **[Google Ads 연동을 활성화](/deep-linked-ads/google-ads-enable/)** 해야 합니다.

### Branch 광고 링크 생성

1. [Partner Management 페이지](https://dashboard.branch.io/ads/partner-management)에서 Google Ads 파트너 아래의 `Create Google Ads Link` 버튼을 클릭해 Branch 광고 링크를 생성한 뒤, 실행하는 캠페인 유형에 따라 `Create Search/Display Link`를 선택합니다.
![링크 생성](/_assets/img/pages/deep-linked-ads/reusable-images/create-link-display.png)
1. Define 섹션에서 나중에 참조할 링크 이름을 선택합니다.
1. 링크를 구성할 때 Ad Format을 **Search** 또는 **Display** 로 설정하고 Ad Partner는 **Google Ads** 로 설정합니다.
![광고 링크 생성](/_assets/img/pages/deep-linked-ads/google-xplatform-display-ads/link-setup.png)
1. Configure Options 탭에서 Redirects 하위 섹션으로 이동한 뒤, 웹 리디렉션이 광고 캠페인에서 홍보하려는 최종 웹사이트로 설정되어 있는지 확인합니다.
![광고 링크 생성](/_assets/img/pages/deep-linked-ads/reusable-images/example-link-redirect.png)
1. Analytics Tags 하위 섹션에서 추가 태그를 설정할 수 있습니다. 이러한 필드의 내용은 Branch의 Ads Analytics 보기에서 필터로 사용될 수 있으므로 작성해 두는 것이 좋습니다. 광고 링크를 애드워즈 캠페인과 최적의 상태로 연결하는 방법은 다음과 같습니다.
	1. `Channel` 필드를 Google Ads로 설정합니다.
	1. `Campaign` 필드를 Google Ads에 사용되는 광고 캠페인 이름과 동일한 이름으로 설정합니다.
	1. Google Ads의 동일 캠페인 ID에 새 태그 `~campaign_id`를 추가합니다.
![분석 태그](/_assets/img/pages/deep-linked-ads/reusable-images/adwords-analytics-tags.png)

!!! warning "분석 태그"
	*임프레션* , *클릭* , *비용* 을 모든 다운스트림 이벤트와 함께 나열하려면 분석 태그가 링크에 반드시 존재해야 하며 그 값은 광고 네트워크 대시보드에 있는 값과 *정확히* 일치해야 합니다.

!!! note ";선택 사항: 딥링크 데이터"
	이 설정 섹션을 사용하여 인스톨 이후 앱에 딥링킹될 커스텀 링크 매개변수를 설정할 수 있습니다. 쿠폰 코드 또는 페이지 식별자를 포함하여 사용자를 라우팅할 수 있습니다. 자세한 사항은 [Deep Link Routing](/deep-linking/routing/)(딥링크 라우팅) 페이지에서 확인하실 수 있습니다.

#### 최종 URL을 변경하여 Branch 링크를 쿼리 매개변수로 포함

!!! note "앱으로의 Branch 딥링킹에만 해당하는 경우"
	캠페인의 **최종 URL** 은 반드시 디스플레이 URL과 일치해야 하고 어떠한 크로스 도메인 리디렉션도 포함하지 않아야 하기 때문에, Branch 링크를 이 상자에 직접 넣을 수 없습니다. 하지만 최종 URL에 쿼리 매개변수를 추가하여 Branch가 사용자들을 적절하게 라우팅 및 어트리뷰션하는 데 필요한 데이터를 전송할 수 있습니다.

1. 마지막 섹션에서 Branch 광고 링크를 복사합니다. 이때 복사된 링크는 적절한 추가 매개변수(~campaign_id, ~ad_set_id, lpurl 등)를 포함해야 합니다. 이러한 매개변수들은 Branch 대시보드에 자동으로 생성됩니다.
2. URL은 생성 및 복사된 Branch 광고 링크를 인코딩합니다.
3. 최종 URL에 `&branchify_url=URL ENDCODED BRANCH LINK`를 추가합니다.

### 캠페인 생성

!!! warning "지원되는 캠페인 유형"
	지원되는 모든 웹 기반 캠페인 유형은 [부록](/deep-linked-ads/google-ads-non-uac/#appendix)을 참조하세요.

새 [Google Ads 캠페인](https://support.google.com/google-ads/answer/6324971?co=ADWORDS.IsAWNCustomer%3Dtrue&oco=0) 생성 방법에 관한 Google Ads 도움말 문서를 참조하세요.

!!! tip "Google Ads 캠페인 내 Branch 링크 배치"
	캠페인 생성 시에는 원하는 사용자 결과에 맞는 정확한 위치에 Branch 링크를 배치해야 합니다.

    - **웹 라우팅만 사용하는 경우** - Google Ads 캠페인 설정 시 Branch 링크를 `Tracking Template` 필드에 배치하세요.
    - **앱 인스톨 시 앱으로의 딥링킹 또는 웹으로의 라우팅을 사용하는 경우** - Google Ads 캠페인 설정 시 변경된 Branch 링크를 `Final URL` 필드에 배치하세요.

Google Ads 캠페인에 관한 자세한 내용은 [광고 및 캠페인 생성](https://support.google.com/google-ads/topic/3119116?hl=en&ref_topic=311907)을 참조하세요.

!!! tip "어트리뷰션 윈도우 설정"
	계정 전체 수준으로 또는 링크 수준별로 링크의 어트리뷰션 윈도우를 지정할 수 있습니다. 이 윈도우를 이용해 Branch 링크의 어트리뷰션 데이터를 정확히 측정할 수 있습니다. 관련 지침은 [어트리뷰션 윈도우 변경](/deep-linked-ads/branch-universal-ads/#change-attribution-windows)을 참조하세요.

{! ingredients/deep-linked-ads/ko/view-ad-link-data.md !}

부록
---

### 검색 광고 관련 사항

본 문서는 다음의 Google 캠페인 유형을 지원합니다.

| Google 캠페인 | 캠페인 타입/목적 | Branch 광고 형식 |
|------------|-----------|--------------|
| 검색 네트워크    | 판매        | 크로스 플랫폼 검색   |
| 검색 네트워크    | 잠재 고객     | 크로스 플랫폼 검색   |
| 검색 네트워크    | 웹사이트 트래픽  | 크로스 플랫폼 검색   |

검색 앱 확장자의 경우, Branch에서 앱 이벤트 어트리뷰션에 활용하는 Google 전환 API가 Android 전환을 확인합니다. 이때 iOS 검색/웹 어트리뷰션에 대한 지원은 제한적입니다. iOS 앱 확장자의 트래킹 템플릿 내에서 Branch 링크를 사용할 수는 있지만 이 경우 Branch에서 집계하는 어트리뷰션이 Google 내 전환으로 간주되지 않습니다.

#### OS 지원 및 주요 차이점

|  운영 체제  | Google Ads 검색 네트워크 광고 지원 여부 |
|---------|-----------------------------|
| 웹       | 있음                          |
| iOS     | 있음                          |
| Android | 있음                          |

### 디스플레이 광고 관련 사항

본 문서는 다음의 Google 캠페인 유형을 지원합니다.

| Google 캠페인 |   캠페인 타입/목적    | Branch 광고 형식  |
|------------|----------------|---------------|
| 디스플레이 네트워크 | 판매             | 크로스 플랫폼 디스플레이 |
| 디스플레이 네트워크 | 잠재 고객          | 크로스 플랫폼 디스플레이 |
| 디스플레이 네트워크 | 웹사이트 트래픽       | 크로스 플랫폼 디스플레이 |
| 디스플레이 네트워크 | 제품 및 브랜드 고려 사항 | 크로스 플랫폼 디스플레이 |
| 디스플레이 네트워크 | 브랜드 인지도 및 도달   | 크로스 플랫폼 디스플레이 |

#### OS 지원 및 주요 차이점

|  운영 체제  | Google Ads 디스플레이 네트워크 광고 지원 여부 |
|---------|--------------------------------|
| 웹       | 있음                             |
| iOS     | 있음                             |
| Android | 있음                             |

#### 앱을 위한 다이내믹 리마케팅 캠페인

[앱 참여 캠페인](/deep-linked-ads/google-ads-app-engagement/)에는 앱을 위한 다이내믹 리마케팅 캠페인이 포함되지 않습니다.  이미 여러분의 앱에 참여한 적이 있는 사람들을 대상으로 하는 다이내믹 리마케팅 캠페인을 구성하고 싶다면 **디스플레이 네트워크** 를 이용해 **웹 기반 광고** 를 생성해야 합니다.

[앱을 위한 다이내믹 리마케팅 캠페인](https://support.google.com/google-ads/answer/7688618?visit_id=636880114590173198-621612626&rd=1)을 새로 만드는 방법에 관한 Google Ads 도움말 문서를 참조하세요.

##### 데이터 매핑

|         Google Data          |                Branch Data                 |                            정의                             |
|------------------------------|--------------------------------------------|-----------------------------------------------------------|
| currency_code              | event_data_currency                    | 선택 사항(URL 문자열에 쿼리 매개변수로 포함되어야 함)                      |
| value                        | 수익 증가                                      | 선택 사항(URL 문자열에 쿼리 매개변수로 포함되어야 하며 가능한 경우 본문에도 포함되어야 함) |
| origin                       | custom_data.origin                       | 선택 사항                                                     |
| start_date                 | custom_data.start_date                 | 선택 사항                                                     |
| end_date                   | custom_data.end_date                   | 선택 사항                                                     |
| search_term                | custom_data.search_term                | 선택 사항                                                     |
| google_business_vertical | custom_data.google_business_vertical | 선택 사항                                                     |
| item_location_id         | custom_data.item_location_id         | 선택 사항                                                     |
| item_id                    | content_items[].$sku                   | 필수 사항                                                     |

### 쇼핑 광고 관련 사항

본 문서는 다음의 Google 캠페인 유형을 지원합니다.

| Google 캠페인 | 캠페인 타입/목적 | Branch 광고 형식 |
|------------|-----------|--------------|
| 쇼핑         | 웹 및 앱 구매  | 크로스 플랫폼      |

#### OS 지원 및 주요 차이점

|  운영 체제  | Google Ads 쇼핑 광고 지원 여부 |
|---------|------------------------|
| iOS     | 있음                     |
| Android | 있음                     |
| 웹       | 있음                     |

#### 피드 활용

!!! warning "전제 조건"
	* [x] Google 애드워즈 계정과 Google 판매자 센터 계정을 모두 보유해야 하며 두 계정이 서로 연결되어 있어야 합니다.

##### Google 판매자 센터에 업로드

1. Google 판매자 센터에서 `Products`로 이동한 뒤 `Feeds`로 이동합니다.
![판매자 센터 홈](/_assets/img/pages/deep-linked-ads/google-xplatform-shopping-ads/google-merchant-center-home.png)
1. 큰 파란색 더하기 버튼을 클릭해 새 피드를 추가합니다.
1. 프롬프트를 따라 피드 이름을 지정하고 피드 언어를 선택한 뒤 피드를 업로드하거나 연결합니다.
1. 피드가 생성되면 판매자 센터에서 몇 분 정도에 걸쳐 이를 처리합니다. 처리가 끝나면 애드워즈 캠페인에 피드를 사용할 수 있습니다.

##### 애드워즈에서 판매자 센터 피드 활용

1. 애드워즈 대시보드에서 All Campaigns 페이지로 이동합니다.
![애드워즈 캠페인 보기](/_assets/img/pages/deep-linked-ads/google-xplatform-shopping-ads/google-adwords-campaign-view.png)
1. 빨간색 캠페인 버튼을 클릭한 뒤 새로운 쇼핑 캠페인을 생성합니다.
1. Shopping Ads Setup 페이지에서 정확한 판매자 식별자를 선택해야 합니다. 즉, 판매자 센터 대시보드의 값과 일치시켜야 합니다.
![애드워즈 판매자 식별자](/_assets/img/pages/deep-linked-ads/google-xplatform-shopping-ads/google-adwords-merchant-identifier.png)
1. 광고 구성을 완료하고 광고 그룹의 이름을 지정합니다.
1. 이제 새로운 캠페인과 광고 그룹이 표시됩니다.

애드워즈는 Google 판매자 센터에서 이 쇼핑 캠페인에 대해 정의한 기본 피드로부터 모든 제품을 자동으로 가져옵니다.

### 동영상 광고 관련 사항

본 문서는 다음의 Google 캠페인 유형을 지원합니다.

| Google 캠페인 |     캠페인 타입/목적      | Branch 광고 형식 |
|------------|--------------------|--------------|
| 동영상        | 표준 - 인스트림        | 크로스 플랫폼 검색   |
| 동영상        | 표준 - 범퍼          | 크로스 플랫폼 검색   |
| 동영상        | 모바일 앱 인스톨 - 인스트림 | 앱 전용: 인스톨    |

#### OS 지원 및 주요 차이점

|  운영 체제  | 애드워즈 동영상 광고 지원 여부 |
|---------|-------------------|
| 웹       | 있음                |
| iOS     | 있음                |
| Android | 있음                |
