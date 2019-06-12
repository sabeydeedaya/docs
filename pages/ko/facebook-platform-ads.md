## 개요

Branch 링크는 다양한 Facebook 광고에 사용할 수 있습니다. Branch 링크를 사용하면 광고 성과를 Branch 대시보드에서 확인할 수 있으며, 광고를 통해 앱을 인스톨한 신규 사용자들이 앱을 처음 오픈할 때 이들을 원하는 콘텐츠로 딥링킹할 수 있습니다.

주의: 본 문서는 Facebook 과 Audience Network에 해당하는 내용입니다.

본 문서는 다음 Facebook 광고 캠페인 타입을 지원합니다.

| Facebook 캠페인 카테고리 | 캠페인 타입/목적 | Branch 광고 형식  |
|-------------------|-----------|---------------|
| 인지도               | 브랜드 인지도   | 크로스 플랫폼 디스플레이 |
| 인지도               | 도달        | 크로스 플랫폼 디스플레이 |
| 고려 사항             | 동영상 조회    | 크로스 플랫폼 디스플레이 |
| 고려 사항             | 잠재 고객 확보  | 크로스 플랫폼 디스플레이 |

### Facebook 캠페인 광고 형식 지원 표

| Facebook 캠페인 유형 | 사진 | 동영상 | 캐러셀 | 슬라이드쇼 | 컬렉션 | 동적 | 캔바스 |
|-----------------|----|-----|-----|-------|-----|----|-----|
| 브랜드 인지도         | ✔︎ | ✔︎  | ✔︎  | ✔︎    |     |    | ✔︎  |
| 도달              | ✔︎ | ✔︎  | ✔︎  | ✔︎    |     |    | ✔︎  |
| 동영상 조회          |    | ✔︎  | ✔︎  | ✔︎    |     |    | ✔︎  |
| 잠재 고객 확보        | ✔︎ | ✔︎  | ✔︎  | ✔︎    |     |    |     |

!!! info ""
다른 Facebook 광고 캠페인 유형을 찾는 경우 당사의 [Facebook 광고 개요 가이드](/deep-linked-ads/facebook-ads-overview)를 확인해 주세요.

## 설정

!!! warning "전제 조건"
	* [x] Facebook 광고를 통해 발생한 인스톨을 트래킹하려면 [Branch SDK를 앱에 연동](/apps/ios/#integrate-branch)해야 합니다.
	* [x] Facebook 앱 인스톨 광고에서 Branch 링크를 사용하려면 Android에서 활성화된 앱 링크 또는 iOS에서 유니버설 링크를 설정하여 올바른 라우팅 동작이 이루어지도록 해야 합니다. 설정을 위해 [유니버설](/deep-linking/universal-links/) 및 [앱 링크](/deep-linking/android-app-links/)를 확인하세요.
	* [x] 광고에서 사용자를 특정 콘텐츠로 딥링킹하려면 [딥링크 라우팅 구성](/deep-linking/routing/)이 필요합니다.
	* [x] Ads는 MAU 기반으로 가격이 책정된 프리미엄 제품입니다. 이 기능을 사용하려면 Ads 제품에 가입하십시오.

### Facebook을 광고 파트너로 연동하기(측정 목적)

!!! info ""
	'Facebook을 광고 파트너로 연동하기' 섹션을 완료하면 광고 캠페인에 대한 리어트리뷰션을 위해 Branch에서 Facebook에 앱 이벤트를 전송합니다. **이는 광고의 딥링킹을 활성화시키지 않으며,** 딥링킹을 활성화하려면 다음의 추가 작업이 필요합니다.

Branch 대시보드에서 Facebook을 광고 파트너로 연동하지 않않다면 아래 섹션을 따라 연동해 주세요. 이벤트 전송을 위한 고급 옵션 설정은 [여기](/deep-linked-ads/facebook-ads-faq/#facebook-mmp-event-options)를 참조하세요.

1. ['파트너 관리' 탭](https://dashboard.branch.io/ads/partner-management)으로 이동합니다.
   ![image](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/ads-partner-management.png)
1. **Facebook** 을 검색합니다.
1. `'Facebook과 연결'`을 클릭합니다.
   ![image](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/1-connect.png)
1. Facebook 계정으로 로그인합니다.
   ![image](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/2-login.png)
1. Branch가 공개 프로파일 정보를 받을 수 있도록 확인합니다.
   ![image](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/3-profile.png)
1. Branch가 `ads_read` 권한을 받을 수 있도록 확인합니다.
   ![image](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/4-scopes.png)
   `ads_read`는 Branch 대시보드 내에서 클릭과 임프레션 확인 용도로 사용됩니다.
1. Install 광고 혹은 App Engagement 광고를 진행할 광고 계정을 선택합니다.
   ![image](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/5-adaccounts.png)
   !!! info ""
   		광고를 집행하려는 광고 계정을 찾거나 선택하는 데 문제가 있으면 [FAQ](/deep-linked-ads/facebook-ads-faq/#im-having-problems-finding-or-choosing-the-correct-ad-accounts) 페이지를 확인해 주세요.
1. Facebook 광고 집행을 위해 Facebook 앱 아이디를 선택합니다.
   ![image](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/6-app-1.png)
1. 앱 아이디를 복사합니다.
   ![image](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/7-app-2.png)
1. 앱 ID를 붙여넣고 `저장`을 클릭합니다.
   ![image](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/8-app-3.png)
1. Facebook이 광고 파트너로 연동되었습니다!
		만일 Facebook과 Branch 간에 서로 다른 어트리뷰션 윈도우가 설정되어 있을 경우 아래와 같이 확인될 수 있습니다.  두 대시보드의 어트리뷰션 윈도우를 동일하게 조정하는 방법은 아래 페이지의 링크를 참조 부탁 드립니다.
    ![image](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/9-complete.png)
1. 마지막으로 Facebook 광고 링크 생성을 위해 오른쪽 상단의 `Facebook 링크 만들기` 버튼을 클릭합니다.
    ![image](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/create-facebook-link.png)

### 광고 링크 생성

1. [Partner Management(파트너 관리) 페이지](https://dashboard.branch.io/ads/partner-management) 의 Facebook Partner(Facebook 파트너) 아래에서 `Create Facebook Link` 버튼을 클릭하여 Branch 광고 링크를 생성한 다음, 캠페인 유형에 따라 `Create Display Link` 또는 `Create Display Link`를 클릭합니다.
	![image](/_assets/img/pages/deep-linked-ads/reusable-images/create-link-display.png)
1. 추후 참조를 위해 링크 이름을 지정합니다.
1. Ad Partner(광고 파트너)로 **Facebook** 을 연결하도록 설정하고 Ad Format(광고 형식)을 **Cross-platform Display** (크로스 플랫폼 디스플레이) 또는 **Cross-platform Display** (크로스 플랫폼 디스플레이)로 설정합니다.
	![image](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/link-setup.png)
1. Configure Options(설정 옵션) 탭 아래에서 Redirects(리디렉션) 하위 섹션으로 이동하여 iOS/Android 및 데스크톱 리디렉션이 광고 캠페인에서 홍보하는 랜딩 페이지로 설정되어 있는지 확인합니다.
	![image](/_assets/img/pages/deep-linked-ads/reusable-images/example-link-redirect.png)
1. Analytics Tags(분석 태그) 하위 섹션에서 추가 태그를 설정할 수 있습니다. 이러한 필드는 Branch의 광고 분석 보기에서 필터로 사용될 수 있으므로 작성해 두는 것이 좋습니다. 광고 링크를 Facebook 캠페인과 올바르게 연결하려면 채널 필드를 Facebook 광고로 설정하고 캠페인 필드를 Facebook 광고에서 사용한 것과 동일한 광고 캠페인 이름으로 설정합니다.
	![image](/_assets/img/pages/deep-linked-ads/reusable-images/facebook-analytics-tags.png)

!!! warning ""
	캠페인을 보다 효율적으로 집행하기 위해 Deepviews가 비활성화되어 있는지 확인해 주세요. 전체 계정에 대해 [Deepviews를 비활성화](/web/deep-views/)하거나 [하나의 링크에 대해 Deepviews를 비활성화](/web/deep-views/)할 수 있습니다.

!!! info "선택 사항: 딥링크 데이터"
	이 설정 섹션을 사용하여 인스톨 이후 앱에 딥링킹될 커스텀 링크 매개변수를 설정할 수 있습니다. 쿠폰 코드 또는 페이지 식별자를 포함하여 사용자를 라우팅할 수 있습니다. 자세한 사항은 [Deep Link Routing](/deep-linking/routing/)(딥링크 라우팅) 페이지에서 확인하실 수 있습니다.

### 브랜드 인지도 캠페인 설정

#### 광고 설정

Facebook 브랜드 인지도 캠페인을 설정하려면 생성된 광고의 웹사이트 랜딩 페이지로 Branch 광고 링크를 삽입해야 합니다. 브랜드 인지도 캠페인을 위한 Facebook 광고 가이드는 **[여기](https://www.facebook.com/business/ads-guide/brand-awareness)** 에서 참조하실 수 있습니다.

#### 캠페인 생성

1. Facebook 앱이 연결된 계정에 로그인한 상태에서 https://www.facebook.com/ads/create 페이지로 이동합니다.

2. 캠페인 마케팅 목표로 **브랜드 인지도** 를 선택합니다.
   ![image](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/brand-awareness/campaign-selection.png)

3. 광고할 앱, 오디언스, 게재 위치, 그리고 예산 등을 지정하여 캠페인 생성합니다. 그런 다음 계속을 눌러 광고 작성 단계로 들어갑니다.

4. 이제 광고 형식을 선택하고 광고를 목적에 맞게 커스터마이징 합니다.

5. 이제 Branch 링크를 광고에 추가합니다.

   * `Add a Website URL` 확인란을 선택하고 Branch 광고 링크를 복사하여 **웹사이트 URL** 필드에 붙여넣습니다.

   ![image](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/brand-awareness/ad-deep-link.png)

   * 전체 화면 캔버스 광고를 추가하도록 선택한 경우, Branch 광고 링크를 캔버스 광고 구성 요소의 **Destination URL** (랜딩 페이지 URL)로 추가합니다.

6. 나머지 광고 캠페인 세팅을 완료합니다.

!!! info "선택 사항: 여러 링크가 있는 광고 형식"
	슬라이드와 같은 일부 광고 형식은 여러 딥링크를 지원합니다. 광고의 각 이미지 또는 구성 요소에 대한 링크 성능 데이터를 얻으려면 여러 링크 광고 형식의 각 부분에서 사용할 여러 개의 Branch 광고 링크를 만듭니다. 이 형식은 고객을 다른 콘텐츠 또는 제품으로 유도하려는 경우 유용합니다.

### 도달 캠페인 설정

#### 광고 설정

Facebook 도달 캠페인을 설정하려면 생성된 광고의 웹사이트 랜딩 페이지로 Branch 광고 링크를 삽입해야 합니다. 도달 캠페인을 위한 Facebook 광고 가이드는 **[여기](https://www.facebook.com/business/ads-guide/reach)** 에서 참조하실 수 있습니다.

#### 캠페인 생성

1. Facebook 앱이 연결된 계정에 로그인한 상태에서 https://www.facebook.com/ads/create 페이지로 이동합니다.

2. 캠페인 마케팅 목표로 **도달** 을 선택합니다.
   ![image](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/reach/campaign-selection.png)

3. 광고할 앱, 오디언스, 게재 위치, 그리고 예산 등을 지정하여 캠페인 생성합니다. 그런 다음 계속을 눌러 광고 작성 단계로 들어갑니다.

4. 이제 광고 형식을 선택하고 광고를 목적에 맞게 커스터마이징 합니다.

5. 이제 Branch 링크를 광고에 추가합니다.

   * `Add a Website URL` 확인란을 선택하고 Branch 광고 링크를 복사하여 **웹사이트 URL** 필드에 붙여넣습니다.

   ![image](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/reach/ad-deep-link.png)

   * 전체 화면 캔버스 광고를 추가하도록 선택한 경우, Branch 광고 링크를 캔버스 광고 구성 요소의 **Destination URL** (랜딩 페이지 URL)로 추가합니다.

6. 나머지 광고 캠페인 세팅을 완료합니다.

!!! info "선택 사항: 여러 링크가 있는 광고 형식"
	슬라이드와 같은 일부 광고 형식은 여러 딥링크를 지원합니다. 광고의 각 이미지 또는 구성 요소에 대한 링크 성능 데이터를 얻으려면 여러 링크 광고 형식의 각 부분에서 사용할 여러 개의 Branch 광고 링크를 만듭니다. 이 형식은 고객을 다른 콘텐츠 또는 제품으로 유도하려는 경우 유용합니다.

### 동영상 조회 캠페인 설정

#### 광고 설정

Facebook 동영상 조회 캠페인을 설정하려면 생성된 광고의 웹사이트 랜딩 페이지로 Branch 광고 링크를 삽입해야 합니다. 동영상 조회 캠페인을 위한 Facebook 광고 가이드는 **[여기](https://www.facebook.com/business/ads-guide/video-views/)** 에서 참조하실 수 있습니다.

#### 캠페인 생성

1. Facebook 앱이 연결된 계정에 로그인한 상태에서 https://www.facebook.com/ads/create 페이지로 이동합니다.

2. 캠페인 마케팅 목표로 **동영상 조회** 를 선택합니다.
   ![image](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/video-views/campaign-selection.png)

3. 광고할 앱, 오디언스, 게재 위치, 그리고 예산 등을 지정하여 캠페인 생성합니다. 그런 다음 계속을 눌러 광고 작성 단계로 들어갑니다.

4. 이제 광고 형식을 선택하고 광고를 목적에 맞게 커스터마이징 합니다.

5. 이제 Branch 링크를 광고에 추가합니다.

   * `Add a Website URL` 확인란을 선택하고 Branch 광고 링크를 복사하여 **웹사이트 URL** 필드에 붙여넣습니다.

   ![image](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/video-views/ad-deep-link.png)

   * 전체 화면 캔버스 광고를 추가하도록 선택한 경우, Branch 광고 링크를 캔버스 광고 구성 요소의 **Destination URL** (랜딩 페이지 URL)로 추가합니다.

6. 나머지 광고 캠페인 세팅을 완료합니다.

!!! info "선택 사항: 여러 링크가 있는 광고 형식"
	슬라이드와 같은 일부 광고 형식은 여러 딥링크를 지원합니다. 광고의 각 이미지 또는 구성 요소에 대한 링크 성능 데이터를 얻으려면 여러 링크 광고 형식의 각 부분에서 사용할 여러 개의 Branch 광고 링크를 만듭니다. 이 형식은 고객을 다른 콘텐츠 또는 제품으로 유도하려는 경우 유용합니다.

### 잠재 고객 확보 캠페인 설정

#### 광고 설정

Facebook 잠재 고객 확보 캠페인을 설정하려면 생성된 광고의 웹사이트 랜딩 페이지로 Branch 광고 링크를 삽입해야 합니다. 사용자가 잠재 고객 양식을 작성하고 나면 Branch 광고 링크를 거쳐 웹사이트 또는 앱으로 연결됩니다. 잠재 고객 확보 캠페인을 위한 Facebook 광고 가이드는 **[여기](https://www.facebook.com/business/ads-guide/lead-generation)** 에서 참조하실 수 있습니다.

#### 캠페인 생성

1. Facebook 앱이 연결된 계정에 로그인한 상태에서 https://www.facebook.com/ads/create 페이지로 이동합니다.
2. 캠페인 마케팅 목표로 **잠재 고객 확보** 를 선택합니다.
![image](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/lead-generation/campaign-selection.png)
3. 광고할 앱, 오디언스, 게재 위치, 그리고 예산 등을 지정하여 캠페인 생성합니다. 그런 다음 계속을 눌러 광고 작성 단계로 들어갑니다.
4. 이제 광고 형식을 선택하고 광고를 목적에 맞게 커스터마이징 합니다.
5. 잠재 고객 양식 생성 포털로 이동한 다음 양식을 설정합니다.
6. 마지막 '감사 인사' 화면에서 Branch 광고 링크를 **웹사이트 링크** 필드에 붙여넣습니다.
![image](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/lead-generation/ad-deep-link.png)
7. 나머지 광고 캠페인 세팅을 완료합니다.

### 데이터 조회

Branch 대시보드의 [광고 분석 페이지](https://dashboard.branch.io/ads/analytics)에서는 광고 캠페인의 성과를 확인할 수 있는 인터랙티브 시계열 그래프와 표를 제공합니다.

![광고 분석 그래프 예시](/_assets/img/ingredients/deep-linked-ads/view-ad-link-data/analytics-graph.png)

표는 각 광고 캠페인의 성과에 대한 요약 데이터를 보여줍니다. 표의 오른쪽 상단 **다운로드 버튼** 을 클릭하여 차트의 내용을 CSV 파일로 다운로드할 수 있습니다.

![image](/_assets/img/ingredients/deep-linked-ads/view-ad-link-data/analytics-table.png)

!!! info "데이터 활용하기"
	`비교 +` 버튼을 통해 광고 캠페인의 성과에 대한 다양한 측면을 분석 및 비교하고, 매개변수를 추가하여 데이터를 나누어 살펴볼 수 있습니다.

	그런 다음 '추가 +' 버튼으로 더욱 정제된 데이터를 얻을 수 있으며, 이를 활용하여 광고 캠페인의 성과에 대한 더욱 깊이 있는 인사이트를 확인할 수 있습니다.

	### 데이터를 가져올 수 있나요?

	!!! warning "경고"
		데이터 통합에는 Facebook을 통해 발생한 이벤트가 포함되지 않습니다. 디바이스 레벨의 Facebook 어트리뷰션 데이터를 서드 파티와 공유할 수 없기 때문입니다.

	Facebook 관련 데이터에 액세스하는 방법은 다양합니다.

	[쿼리 API](/exports/query-api)뿐 아니라 [Branch 대시보드](https://dashboard.branch.io)의 여러 페이지에서 노출, 클릭, 설치, 실행 및 전환 이벤트에 대한 분석 데이터를 확인할 수 있습니다.

	Facebook의 ['고급 모바일 측정' 계약서('고급 모바일 앱 측정에 대한 데이터 이용 약관')](https://www.facebook.com/ads/manage/advanced_mobile_measurement/tos))에 서명한 경우 [Webhook](/exports/ua-webhooks/), [Data Export API](/exports/api-v3/) 및 [CSV Export](https://dashboard.branch.io/data-import-export/csv-exports)를 통해 기기 수준의 데이터를 가져올 수 있습니다. 이 계약서에 서명하지 않았다면, Webhook, Data Export API 및 CSV Export를 통해 액세스한 경우 Facebook 광고를 통해 발생한 모든 이벤트는 오가닉 이벤트로 표시됩니다.

	Branch는 디바이스 레의 Facebook 어트리뷰션 데이터를 서드 파티에 전송할 수 없으므로, Facebook을 통해 발생한 이벤트를 데이터 통합을 사용하여 보낼 수 없습니다. 대신, 해당 데이터에 대해 사내 분석(웹훅, 데이터 내보내기 API 또는 CSV 내보내기 사용)을 실시하거나 모든 분석 및 어트리뷰션 요구 사항을 충족할 수 있도록 Branch 대시보드를 사용해 보시기 바랍니다. Branch 대시보드로 해결되지 않는 분석 요구 사항이 있는 경우 제목에 'Facebook MMP + 기능 요청'을 기재하여 [문의](https://support.branch.io/support/tickets/new)해 주세요.

	| **Branch feature** | **Facebook data included** |
	| - | - |
	| [대시보드 시각화](https://dashboard.branch.io/) | 사전 집계된 분석 |
	| [쿼리 API](/exports/query-api/) | 사전 집계된 분석 |
	| [라이브뷰](https://dashboard.branch.io/liveview) | 디바이스 레벨 데이터 분석 * |
	| [Data Export API](/exports/api-v3/) | 디바이스 레벨 데이터 분석 * |
	| [CSV Exports](https://branch.dashboard.branch.io/data-import-export/csv-exports) | 디바이스 레벨 데이터 분석 * |
	| [Webhooks](/exports/ua-webhooks/) | 디바이스 레벨 데이터 분석 * |
	| [데이터 통합](/integrations/data-integrations/) | 지원되지 않음 |

	(`*`) Facebook의 ['고급 모바일 측정' 계약서('고급 모바일 앱 측정에 대한 데이터 이용 약관')](https://www.facebook.com/ads/manage/advanced_mobile_measurement/tos) 에 서명해야 이 데이터를 확인할 수 있습니다.

	다음은 '고급 모바일 측정' 계약서에 서명한 광고 계정을 볼 수 있는 페이지입니다.

	![AMM](/_assets/img/pages/deep-linked-ads/facebook-ads-faq/amm.png)

## 문제 해결

당사에는 [Facebook 앱 광고 FAQ 페이지](/deep-linked-ads/facebook-ads-faq/#sources-of-discrepancies-between-facebook-and-branch)가 마련되어 있습니다. 앱 광고와 관련하여 문제가 있는 경우 이 FAQ를 확인해 주세요.

Facebook의 웹 전용 광고와 관련하여 문제가 있는 경우 FAQ를 확인하고, "Facebook 웹 전용 광고 문제"라는 제목으로 [당사에 문의](https://support.branch.io/support/tickets/new)해 주세요.
