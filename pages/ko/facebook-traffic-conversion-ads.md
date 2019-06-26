## 개요

Branch 링크는 Facebook 트래픽 및 전환 광고에 사용 가능하며, 광고에 대한 참여도와 새로운 사용자가 처음 앱을 열 때 사용자를 콘텐츠로 딥링킹하는 광고 기반의 인스톨을 트래킹할 수 있습니다.

주의: 본 문서는 Facebook 과 Audience Network에 해당하는 내용입니다.

본 문서는 다음 Facebook 광고 캠페인 타입을 지원합니다.

| Facebook 캠페인 카테고리 | 캠페인 타입/목적 | Branch 광고 형식  |
|-------------------|-----------|---------------|
| 고려 사항             | 트래픽       | 크로스 플랫폼 디스플레이 |
| 전환                | 전환        | 크로스 플랫폼 디스플레이 |

#### Facebook 캠페인 광고 형식 지원 표

| Facebook 캠페인 유형 | 사진 | 동영상 | 캐러셀 | 슬라이드쇼 | 컬렉션 | 동적 | 캔바스 |
|-----------------|----|-----|-----|-------|-----|----|-----|
| 트래픽             | ✔︎ | ✔︎  | ✔︎  | ✔︎    | ✔︎  | ✔︎ | ✔︎  |
| 전환              | ✔︎ | ✔︎  | ✔︎  | ✔︎    |     |    | ✔︎  |

!!! info "전제 조건"
		* [x] Facebook 광고를 통해 발생한 인스톨을 트래킹하려면 [Branch SDK를 앱에 연동](/apps/ios/#integrate-branch)해야 합니다.
		* [x] Facebook 앱 인스톨 광고에서 Branch 링크를 사용하려면 Android에서 활성화된 앱 링크 또는 iOS에서 유니버설 링크를 설정하여 올바른 라우팅 동작이 이루어지도록 해야 합니다. 설정을 위해 [유니버설](/deep-linking/universal-links/) 및 [앱 링크](/deep-linking/android-app-links/)를 확인하세요.
		* [x] 광고에서 사용자를 특정 콘텐츠로 딥링킹하려면 [딥링크 라우팅 구성](/deep-linking/routing/)이 필요합니다.
		* [x] Ads는 MAU 기반으로 가격이 책정된 프리미엄 제품입니다. 이 기능을 사용하려면 Ads 제품에 가입하십시오.

#### Facebook을 광고 파트너로 연동하기(측정 목적)

!!! info
		'Facebook을 광고 파트너로 연동하기' 섹션을 완료하면 광고 캠페인에 대한 리어트리뷰션을 위해 Branch에서 Facebook에 앱 이벤트를 전송합니다. **이는 광고의 딥링킹을 활성화시키지 않으며,** 딥링킹을 활성화하려면 다음의 추가 작업이 필요합니다.

Branch 대시보드에서 Facebook을 광고 파트너로 연동하지 않않다면 아래 섹션을 따라 연동해 주세요. 이벤트 전송을 위한 고급 옵션 설정은 [여기](/deep-linked-ads/facebook-ads-faq/#facebook-mmp-event-options)를 참조하세요.

1. ['파트너 관리' 탭](https://dashboard.branch.io/ads/partner-management)으로 이동합니다.
   ![광고 파트너 관리](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/ads-partner-management.png)
2. **Facebook** 을 검색합니다.
3. `Facebook과 연결`을 클릭합니다.
   ![Facebook과 연결하기 ](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/1-connect.png)
4. Facebook 계정으로 로그인합니다.
   ![로그인](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/2-login.png)
5. Branch가 공개 프로파일 정보를 받을 수 있도록 확인합니다.
   ![공개 프로필](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/3-profile.png)
6. Branch가 `ads_read` 권한을 받을 수 있도록 확인합니다.
   ![OAuth 범위](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/4-scopes.png)
   `ads_read`는 Branch 대시보드 내에서 클릭과 임프레션 확인 용도로 사용됩니다.
7. Install 광고 혹은 App Engagement 광고를 진행할 광고 계정을 선택합니다.
   ![광고 계정 선택](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/5-adaccounts.png)
   광고를 집행하려는 광고 계정을 찾거나 선택하는 데 문제가 있으면 [FAQ](/deep-linked-ads/facebook-ads-faq/#im-having-problems-finding-or-choosing-the-correct-ad-accounts) 페이지를 확인해 주세요.
8. Facebook 광고 집행을 위해 Facebook 앱 아이디를 선택합니다.
   ![앱 ID 입력](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/6-app-1.png)
9. 앱 아이디를 복사합니다.
   ![앱 ID 찾기](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/7-app-2.png)
10. 앱 ID를 붙여넣고 `저장`을 클릭합니다.
    ![앱 ID 붙여넣기](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/8-app-3.png)
11. Facebook이 광고 파트너로 연동되었습니다!
    만일 Facebook과 Branch 간에 서로 다른 어트리뷰션 윈도우가 설정되어 있을 경우 아래와 같이 확인될 수 있습니다.  두 대시보드의 어트리뷰션 윈도우를 동일하게 조정하는 방법은 아래 페이지의 링크를 참조 부탁 드립니다.
    ![완료](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/9-complete.png)
12. 마지막으로 Facebook 광고 링크 생성을 위해 오른쪽 상단의 `Facebook 링크 만들기` 버튼을 클릭합니다.
    ![Facebook 광고 링크 생성](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/create-facebook-link.png)

## 설정

### 광고 링크 생성

!!! info
		이 섹션은 앱 전용 광고를 사용하시는 경우 선택 사항입니다. 캠페인, 광고 세트, 광고, 크리에이티브 정보는 Facebook으로부터 자동으로 가져옵니다. 하지만 유저들에게 딥링킹 기능을 제공하기 원하시는 경우, 본 섹션의 지침을 참조해주십시오.

1. [Partner Management 페이지](https://dashboard.branch.io/ads/partner-management) 에서 Facebook Partner의 `Create Facebook Link` 버튼을 클릭해 Branch 광고 링크를 생성한 뒤 `Create Display Link`를 선택합니다.
![링크 생성](/_assets/img/pages/deep-linked-ads/reusable-images/create-link-display.png)
1. Define 섹션에서 추후 참조를 위해 링크 이름을 지정합니다.
1. 광고 파트너를 **Facebook** 으로 설정하고 광고 형식은 **Cross-platform Display** 로 설정하여 링크를 구성합니다.
![광고 링크 생성](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/link-setup.png)
1. Configure Options 탭에서 Redirects 하위 섹션으로 이동하여 iOS/Android 및 데스크톱 리디렉션이 광고 캠페인에서 홍보하는 목표 위치로 설정되어 있는지 확인합니다.
![광고 링크 생성](/_assets/img/pages/deep-linked-ads/reusable-images/example-link-redirect.png)
1. Analytics Tags 하위 섹션에서 추가 태그를 설정할 수 있습니다. 이러한 필드의 내용은 Branch의 광고 분석 보기에서 필터로 사용될 수 있으므로 작성해 두는 것이 좋습니다. 광고 링크를 애드워즈 캠페인과 최적의 상태로 연결하려면 채널 필드를 Facebook 광고로 설정하고 캠페인 필드를 Facebook 광고에 사용되는 광고 캠페인 이름과 동일한 이름으로 설정하십시오.
![분석 태그](/_assets/img/pages/deep-linked-ads/reusable-images/facebook-analytics-tags.png)

!!! info ""
		캠페인을 보다 효율적으로 집행하기 위해 Deepviews가 비활성화되어 있는지 확인해 주세요. 전체 계정에 대해 [Deepviews를 비활성화](/web/deep-views/#setup)하거나 [하나의 링크에 대해 Deepviews를 비활성화](/web/deep-views/#disable-per-link-deepviews)할 수 있습니다.

!!! info ";선택 사항: 딥링크 데이터"
		이 설정 섹션을 사용하여 인스톨 이후 앱에 딥링킹될 커스텀 링크 매개변수를 설정할 수 있습니다. 쿠폰 코드 또는 페이지 식별자를 포함하여 사용자를 라우팅할 수 있습니다. 자세한 사항은 [Deep Link Routing](/deep-linking/routing) (딥링크 라우팅) 페이지에서 확인하실 수 있습니다.

### 트래픽 캠페인 설정

#### 광고 설정

Facebook 트래픽 캠페인을 설정하려면 먼저 캠페인을 생성하고 Branch 링크를 광고의 딥링크 URL로 사용해야 합니다. Facebook 트래픽 캠페인 정보는 **[여기](https://www.facebook.com/business/ads-guide/traffic)\{:target="\_blank"\}** 에서 확인할 수 있습니다.

#### 캠페인 생성

1. Facebook 앱이 연결된 계정에 로그인한 상태에서 https://www.facebook.com/ads/create\{:target="\_blank"\} 페이지로 이동합니다.
2. 캠페인 마케팅 목표로 **Traffic** 을 선택합니다. ![캠페인 선택](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/traffic/campaign-selection.png)
3. 트래픽을 `웹사이트`로 유도할 것인지 아니면 `앱`으로 유도할 것인지 선택합니다.
4. 광고할 앱, 오디언스, 게재 위치, 그리고 예산 등을 지정하여 캠페인 생성합니다. 그런 다음 계속을 눌러 광고 작성 단계로 들어갑니다.
5. 이제 광고 형식을 선택하고 광고를 목적에 맞게 커스터마이징 합니다.
6. Branch 광고 링크를 광고에 추가합니다.
   * 앱으로 트래픽을 유도하기로 선택하는 경우 Branch 링크를 복사한 뒤 **Deep Link** 필드를 찾아 여기에 붙여넣습니다.
     ![캠페인 선택](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/traffic/link-setup-app.png)
   * 웹사이트로 트래픽을 유도하기로 선택하는 경우에는 Branch 광고 링크를 **Website URL** 필드에 붙여넣습니다.
     ![캠페인 선택](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/traffic/link-setup-web.png)
   * 전체 화면 캔버스를 사용 중인 상태에서 트래픽을 웹사이트로 유도하기로 선택하는 경우에는 Branch 광고 링크를 캔버스 광고 구성 요소의 **랜딩 페이지 URL** 로 추가합니다.
7. 나머지 광고 캠페인 세팅을 완료합니다.

!!! info "선택 사항: 여러 링크가 있는 광고 형식"
		슬라이드와 같은 일부 광고 형식은 여러 딥링크를 지원합니다. 광고의 각 이미지 또는 구성 요소에 대한 링크 성능 데이터를 얻으려면 여러 링크 광고 형식의 각 부분에서 사용할 여러 개의 Branch 광고 링크를 만듭니다. 이 형식은 고객을 다른 콘텐츠 또는 제품으로 유도하려는 경우 유용합니다.

### 전환 캠페인 설정

#### 광고 설정

Facebook 전환 캠페인을 설정하려면 먼저 캠페인을 생성하고 Branch 링크를 광고의 딥링크 URL로 사용해야 합니다. Facebook 전환 캠페인 정보는 **[여기](https://www.facebook.com/business/ads-guide/conversions)\{:target="\_blank"\}** 에서 확인할 수 있습니다.

!!! info "전제 조건"
		Facebook은 보기, 장바구니에 담기, 구매 등과 같이 사용자의 콘텐츠 상호작용에 관한 이벤트를 보고할 것을 전제 조건으로 요구합니다. Facebook 픽셀을 웹사이트에 추가하고 Branch SDK\(Facebook으로 전송\)를 이용하는 이벤트 트래킹을 앱에 추가하려면 아래 지침을 따르십시오.

- [Branch SDK로 앱 이벤트 보내기](/deep-linked-ads/facebook-ads-faq/#tracking-other-conversion-events)
- [Facebook 픽셀로 웹 이벤트 보내기](https://developers.facebook.com/docs/marketing-api/facebook-pixel/v2.8)

#### 캠페인 생성

1. Facebook 앱이 연결된 계정에 로그인한 상태에서 https://www.facebook.com/ads/create 페이지로 이동합니다.
2. 캠페인 마케팅 목표로 **전환** 을 선택합니다. ![캠페인 선택](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/conversions/campaign-selection.png)
3. 전환을 `웹사이트`에서 달성할 것인지 아니면 `앱`에서 달성할 것인지 선택합니다.
4. 오디언스, 게재 위치, 그리고 예산을 지정하여 캠페인 생성을 계속합니다. 그런 다음 계속을 눌러 광고 생성 단계로 들어갑니다.
5. 이제 광고 형식을 선택하고 광고를 목적에 맞게 커스터마이징 합니다.
6. Branch 광고 링크를 광고에 추가합니다.
   * 앱 전환을 선택하는 경우 Branch 링크를 복사한 뒤 **Deep Link** 필드를 찾아 여기에 붙여넣습니다.
     ![캠페인 선택](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/conversions/link-setup-app.png)
   * 웹사이트 전환을 선택하는 경우에는 Branch 광고 링크를 **Website URL** 필드에 붙여넣습니다.
     ![캠페인 선택](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/conversions/link-setup-web.png)
   * 전체 화면 캔버스를 사용 중인 상태에서 웹사이트 전환을 선택하는 경우에는 Branch 광고 링크를 캔버스 광고 구성 요소의 **랜딩 페이지 URL** 로 추가합니다.
7. 나머지 광고 캠페인 세팅을 완료합니다.

!!! info "선택 사항: 여러 링크가 있는 광고 형식"
		슬라이드와 같은 일부 광고 형식은 여러 딥링크를 지원합니다. 광고의 각 이미지 또는 구성 요소에 대한 링크 성능 데이터를 얻으려면 여러 링크 광고 형식의 각 부분에서 사용할 여러 개의 Branch 광고 링크를 만듭니다. 이 형식은 고객을 다른 콘텐츠 또는 제품으로 유도하려는 경우 유용합니다.

#### 다른 전환 이벤트 추적

!!! warning "경고"
	Facebook은 백엔드에서 중복되는 커스텀 앱 이벤트를 제거하지 않습니다. 따라서 Facebook SDK가 통합되어 있거나 다른 MMP 추적 앱이 열려 있는 경우 아래의 옵션 1을 선택하시기 바랍니다.

Branch만으로도 [앱 이벤트를 추적](/apps/v2event/#v2-event)할 수 있습니다. Branch를 통해 한 번 추적하면 Branch에서 해당 이벤트를 Facebook과 기타 분석 시스템으로 전송합니다. 여기에 간략히 나와 있는 [v2/이벤트 로깅 방법](/apps/v2event/#v2-event)을 사용하시기 바랍니다.

장바구니에 추가, 구매 및 기타 Facebook 앱 이벤트를 추적할 경우 다음과 같은 3가지 옵션을 사용할 수 있습니다.

1. *Branch 이름 사용*: Facebook에서 어트리뷰션 데이터를 가져올 수 있지만 이벤트를 구매, 장바구니에 추가 등으로 계산하지 않습니다. Facebook SDK가 연동되어 있거나 다른 MMP로 테스트 중이며, 이미 이 두 가지 방법 중 하나를 사용하여 앱 이벤트를 추적하는 경우 이 옵션을 사용하세요. Facebook SDK 또는 다른 MMP가 이미 Facebook에 이벤트를 전송하므로 Branch에서 해당 이벤트를 다시 전송하지 않습니다(기본값).
1. *Facebook 이름 사용*: Branch는 앱 이벤트 추적을 위해 Facebook에서 사용한 정확한 이벤트를 전송합니다. Facebook SDK 또는 다른 MMP를 활용하여 앱 이벤트를 추적하지 않고, Branch를 통해 Facebook이 해당 이벤트를 기록하도록 하려면 이 옵션을 사용하세요.
1. *Disable*: Branch가 이러한 전환 이벤트에 대해 기여도를 측정하지 않도록 하려면 이 옵션을 사용하세요. Branch는 경우에 따라 Facebook에서 이전에 검색한 어트리뷰션 데이터를 기반으로 해당 전환 이벤트에 대해 기여도를 측정할 수 있습니다. 하지만 어트리뷰션 데이터를 다시 가져오기 위해 Facebook에 전환 이벤트를 전송하지는 않습니다.

### 데이터 조회

Branch 대시보드의 [광고 분석 페이지](https://dashboard.branch.io/ads/analytics)에서는 광고 캠페인의 성과를 확인할 수 있는 인터랙티브 시계열 그래프와 표를 제공합니다.

![광고 분석 그래프 예시](/_assets/img/ingredients/deep-linked-ads/view-ad-link-data/analytics-graph.png)

표는 각 광고 캠페인의 성과에 대한 요약 데이터를 보여줍니다. 표의 오른쪽 상단 **다운로드 버튼** 을 클릭하여 차트의 내용을 CSV 파일로 다운로드할 수 있습니다.

![광고 표 예시](/_assets/img/ingredients/deep-linked-ads/view-ad-link-data/analytics-table.png)

!!! info "데이터 활용하기"
		`비교 +` 버튼을 통해 광고 캠페인의 성과에 대한 다양한 측면을 분석 및 비교하고, 매개변수를 추가하여 데이터를 나누어 살펴볼 수 있습니다.

    그런 다음 '추가 +' 버튼으로 더욱 정제된 데이터를 얻을 수 있으며, 이를 활용하여 광고 캠페인의 성과에 대한 더욱 깊이 있는 인사이트를 확인할 수 있습니다.


## 문제 해결

당사에는 [Facebook 앱 광고 FAQ 페이지](/deep-linked-ads/facebook-ads-faq/#sources-of-discrepancies-between-facebook-and-branch)가 마련되어 있습니다. 앱 광고와 관련하여 문제가 있는 경우 이 FAQ를 확인해 주세요.

Facebook의 웹 전용 광고와 관련하여 문제가 있는 경우 FAQ를 확인하고, "Facebook 웹 전용 광고 문제"라는 제목으로 [당사에 문의](https://support.branch.io/support/tickets/new)해 주세요.
