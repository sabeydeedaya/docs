## 개요

Branch는 모바일에 최적화된 링크 인프라입니다.  다이내믹 광고를 위한 딥링크 피드를 통해 광고주는 다이내믹 광고 캠페인에 필요한 모바일에 최적화된 링크를 대규모로 손쉽게 생성할 수 있습니다. 사용자들을 가장 관련성 높은 플랫폼\(웹 또는 앱\)의 가장 관련성 높은 콘텐츠로 유도함으로써 광고주는 수익을 극대화하고 모바일에서 광고 참여 기회를 높일 수 있습니다.

딥링크 피드는 기존 제품 피드의 각 콘텐츠에 올바른 딥링크를 추가합니다.

피드 업로드 및 관리에 적합한 시각적 인터페이스의 장점을 활용하고 여러분과 Branch 및 사용 중인 광고 네트워크 간의 더욱 원활한 자동 연동을 실현하세요.

!!! info ""
	이 제품은 Branch 유니버설 광고의 일부입니다.

## 설정

### 사전 요구사항

* 딥링크 피드를 사용하려면 Branch SDK를 연동해야 합니다.
* Facebook에서 딥링크 피드를 사용하려면 [Branch](https://dashboard.branch.io/ads/partner-management/) 대시보드에서 Facebook을 광고 파트너로 설정하고 활성화해야 합니다.

### 피드 소스 준비

딥링크 피드를 생성하려면 콘텐츠 또는 제품 피드를 업로드해야 합니다. Branch에서는 이를 **피드 소스** 라고 합니다.

**딥링크 피드** 를 생성하는 경우, 수정할 피드 소스를 선택하도록 요청하는 생성 플로를 거치게 됩니다.

이 플로에서 일부 어트리뷰션 태그를 입력하라는 요청을 받게 되며 선택적으로 링크를 구성할 수 있습니다. 이 과정이 끝나면 Branch가 딥링크 피드를 준비하고 정보가 입력되지 않은 컬럼을 추가하거나 딥링킹에 필요한 올바른 링크를 사용하도록 기존 컬럼을 수정할 수 있습니다.

참고 사항:

* 피드 소스는 각 제품의 웹 URL이 있는 `링크` 컬럼을 포함해야 합니다. 이는 Branch에서 딥링크를 생성하기 위한 최소한의 요구사항입니다(Facebook 또는 파트너의 승인을 받기에는 충분하지 않을 수 있음).
* 웹사이트에서 피드 내 각 웹 URL을 위한 [딥링크 데이터를 호스팅](/web/hosted-data/)할 것을 권장드립니다. 이는 피드 수정에 사용되지 않지만 광고에서 링크가 클릭되면 Branch가 해당 링크 데이터를 웹사이트에서 가져와 앱으로 재전송합니다.

이 옵션을 선택한 경우, [링크 설정](https://dashboard.branch.io/link-settings) > 고급 설정으로 이동하여 **링크 스크랩 허용** 옵션을 선택합니다. 이 옵션은 계정에서 딥링크 피드 제품을 활성화한 경우에만 사용할 수 있습니다(딥링크 피드를 만들고 다운로드하여 제품을 활성화할 수 있음).

![이미지](/_assets/img/pages/deep-linked-ads/dynamic-product-ads/enable-link-scraping.png)

* 링크 데이터를 호스팅할 수 없는 경우, 필요한 링크 데이터를 피드 소스에서 컬럼으로 추가하세요.
* 피드 소스를 더욱 다양한 방식으로 활용하려는 경우 [고급 섹션](#advanced)에서 고급 사용자를 위한 팁을 참고하시기 바랍니다.
* Branch는 Facebook의 형식과 호환되는 피드 소스를 허용합니다. 피드의 호환 가능성을 확신할 수 없는 경우 [Facebook의 제품 피드 디버그 도구](https://business.facebook.com/ads/product_feed/debug)를 사용하여 테스트 및 디버깅을 실시하시기 바랍니다.

!!! info "피드 소스 예시"
	Facebook은 [Facebook 개발자 포털](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/product-catalog)에서 Branch가 피드 소스로 허용하는 CSV 예시를 제공합니다. 스크롤을 내려 '지원되는 형식'에서 피드 예시를 찾아보실 수 있습니다.

### 피드 소스 업로드

Branch 대시보드에서 바로 [광고 > 링크 > 피드 소스 섹션](https://dashboard.branch.io/ads/links/feed-sources)으로 이동하여 시작할 수 있습니다.

1. 필요한 경우 **피드 소스** 탭을 클릭한 다음 '새 피드 소스 추가'를 클릭합니다.

   ![이미지](/_assets/img/pages/deep-linked-ads/dynamic-product-ads/add-new-feed-source.png)
2. 피드 소스의 이름을 지정합니다. URL을 입력\(권장 사항\)하거나 파일을 업로드할 수 있습니다.

   ![이미지](/_assets/img/pages/deep-linked-ads/dynamic-product-ads/name-and-upload-feed-source.png)

**피드 소스** 탭으로 이동하여 업로드한 모든 [피드 소스](https://dashboard.branch.io/ads/links/feed-sources)를 확인할 수 있습니다.

### 딥링크 피드 새로 만들기

1. 두 탭 중 아무 곳에서나 **광고 링크 생성** 버튼을 클릭합니다.

   ![이미지](/_assets/img/pages/deep-linked-ads/dynamic-product-ads/add-deep-linked-feed.png)
2. 제시된 옵션 중에서 **제품 링크 생성** 을 선택합니다.

   ![이미지](/_assets/img/pages/deep-linked-ads/dynamic-product-ads/select-product-from-modal.png)

### 딥링크 피드 생성 플로

1. '딥링크 피드 정보'에서 향후 참조를 위해 딥링크 피드 이름을 지정하고 딥링크 피드로 변환할 피드 소스를 지정할 수 있습니다. 또한 캠페인을 실행할 광고 플랫폼을 입력하게 됩니다. 이 정보는 피드를 수정하고 적절히 구조화된 Branch 어트리뷰션 데이터를 링크에 삽입하는 데 사용됩니다.

   ![이미지](/_assets/img/pages/deep-linked-ads/dynamic-product-ads/dlf-step-1.png)

   Facebook 광고의 경우 'CSV'를 선택하고, Google Product Listing 광고의 경우 'TSV'를 선택합니다.
2. '딥링크 생성'에서 선택 가능한 두 가지 요소가 표시됩니다. 첫 번째는 피드 소스의 컬럼 이름 목록입니다. 딥링크 데이터를 각 링크에 추가하려면 관련 데이터를 포함하는 컬럼을 선택합니다.

제품 피드에 `id`라는 이름이 지정된 컬럼이 있다고 가정해 보겠습니다. 이 컬럼은 피드 소스 파일의 각 콘텐츠를 위한 제품 ID를 포함하고 있으며 앱이 딥링크를 올바르게 처리하려면 이 데이터가 필요합니다. 이 ID로 각 제품에 대한 딥링크를 생성하려면 왼쪽의 체크박스를 선택하여 컬럼을 선택합니다. 해당 키의 이름을 변경하려는 경우\(예: `id`에서 `product_id`로 변경\) 오른쪽의 텍스트 상자에 새로운 키 이름을 입력할 수 있습니다. 이렇게 하면 올바른 `product_id`가 피드 내 모든 제품의 링크에 추가됩니다\(예: 첫 번째 품목에는 `"product_id":1392`가, 두 번째 품목에는 `"product_id":5284`가 지정됨\).

![이미지](/_assets/img/pages/deep-linked-ads/dynamic-product-ads/customize-columns.png)

### 딥링크 피드 받기

마지막으로 '딥링크 피드 받기'에서 딥링크 피드를 호스팅하는 URL을 받거나 딥링크 피드를 포함하는 파일을 다운로드할 수 있습니다.

마지막 단계에 도달하면 '링크가 생성되는 중...'이라는 메시지가 표시됩니다. 피드 소스의 크기가 큰 경우 링크가 생성되는 동안 다른 위치로 이동해도 됩니다. 이 프로세스가 완료되면 대시보드 알림과 함께 생성 완료된 딥링크 피드 링크가 포함된 이메일이 전송됩니다.

![이미지](/_assets/img/pages/deep-linked-ads/dynamic-product-ads/generating-dlf.png)

![이미지](/_assets/img/pages/deep-linked-ads/dynamic-product-ads/getting-dlf.png)

### 일정 새로고침

URL로 호스팅된 피드 소스를 사용한 경우\(권장 사항\), 피드에 액세스할 수 있는 두 가지 옵션이 표시됩니다. 둘 중에서 '일정 새로고침'을 선택할 것을 권장드립니다. 이 옵션을 선택하면 Branch가 딥링크 피드의 URL을 호스팅하며 해당 URL은 피드 소스 URL을 참고하여 주기적으로 업데이트됩니다. 이제 파트너에게 딥링크 피드 URL을 제공할 수 있으며, Branch가 콘텐츠를 최신 상태로 유지합니다.

![이미지](/_assets/img/pages/deep-linked-ads/dynamic-product-ads/hosted-dlf.png)

**딥링크 피드** 탭으로 이동하여 본인이 생성한 모든 [딥링크 피드](https://dashboard.branch.io/ads/links/deep-linked-feeds)를 확인할 수 있습니다.

### CSV 다운로드

딥링크 피드를 포함하는 파일이 필요한 경우 'CSV 다운로드'를 클릭합니다.

**딥링크 피드** 탭으로 이동하여 본인이 생성한 모든 [딥링크 피드](https://dashboard.branch.io/ads/links/deep-linked-feeds)를 확인할 수 있습니다.

### 딥링크 피드 사용

피드를 다운로드했으면 이제 적절히 활용할 차례입니다.

!!! info "Facebook 다이내믹 광고"
	[Facebook 다이내믹 광고 캠페인](/deep-linked-ads/facebook-dynamic-ads/)을 실행하여 참여를 유도하거나 딥링크 피드를 통한 인스톨을 유도하세요.

!!! info "광고 네트워크 연동"
	Criteo, Remerge 및 AppNexus와 같은 유수의 리마케팅 기업들이 Branch의 딥링크 피드를 이용합니다. 계정 관리자에게 Branch 딥링크를 사용하는 캠페인을 시작하는 방법을 문의해 보세요.

!!! info "콘텐츠를 통해 인스톨 유도"
	[콘텐츠 분석](https://dashboard.branch.io/analytics/content)을 활용하여 성과를 창출하는 제품을 확인하고 딥링크 피드를 사용하여 모든 유형의 광고에 필요한 링크를 대규모로 생성하세요.

### 광고 성과 이해

딥링크 피드는 캠페인과 콘텐츠를 최적화하는 데 중요한 역할을 하는 다양한 인사이트를 제공합니다.

| 딥링크 피드 필드 | Branch 분석 태그 |
|-----------|--------------|
| 기능        | 유료 광고        |
| 캠페인       | 캠페인          |
| 광고 플랫폼    | 채널           |
| 광고 유형     | 태그           |

* [콘텐츠 분석](https://dashboard.branch.io/analytics/content)으로 이동하여 클릭, 오픈, 인스톨 및 전환을 유도하는 제품을 확인하세요.
* [소스 분석](https://dashboard.branch.io/analytics/source)을 통해 어떤 광고 채널이 가장 효과적인지 확인하세요.
* [데이터 연동](https://branch.io/data-integrations)을 설정하여 다이내믹 광고 데이터를 다른 어트리뷰션 또는 분석 대시보드로 전송하세요.

## 고급

### 피드 소스에 링크 데이터 추가

`branch_query_params`라는 피드 소스에 컬럼을 추가하여 각 링크에 데이터를 추가할 수 있습니다. 이 컬럼은 웹 쿼리 매개변수 형식 `key1=value1&key2=value2`의 매개변수를 허용합니다.

### 데이터 연동을 통한 고급 세그멘테이션

어트리뷰션 데이터 연동 서비스\(Tune, Kochava, AppsFlyer, Localytics 및 Adjust\)는 HTTP 딥링크에 첨부할 수 있는 측정 매개변수를 통한 추가적인 네트워크 세그멘테이션을 지원합니다.

시작하려면 데이터 연동을 위한 *고급* 매뉴얼에서 캠페인 및 광고 네트워크를 위한 올바른 쿼리 매개변수를 생성하고 구성하는 방법을 알아보세요.

이 필드는 웹 쿼리 매개변수 형식 `key1=value1&key2=value2`의 매개변수를 허용하므로 시작 부분에 `?` 문자를 포함하지 마세요.

올바른 매개변수를 생성했으면 2단계의 `고급: 측정 매개변수 추가` 텍스트 필드에 해당 매개변수를 추가하세요. 그러면 `링크` 컬럼의 모든 HTTP Branck 링크에 매개변수가 추가됩니다.

![이미지](/_assets/img/pages/deep-linked-ads/dynamic-product-ads/add-measurement-parameters.png)

## 지원

### Branch는 어떻게 딥링크 피드를 생성하나요?

Branch는 원활하게 작동하는 피드 생성에 필요한 피드 소스와 링크 설정 및 입력 사항을 수집하여 딥링크 피드를 생성합니다.

Branch는 다음과 같은 컬럼에 입력된 내용을 확인하고 각 컬럼의 기존 항목을 수정하거나 빈 컬럼에 관련 정보를 추가합니다.

* link(기본적으로 웹 폴백을 포함하는 Branch 링크를 사용)
* ios_url
* ios_app_name
* ios_app_store_id
* android_url
* android_app_name
* android_package

### 링크에서 앱이 열리지 않음

* 먼저 링크로부터 [의도하는 동작](/links/integrate/#default-link-behavior)이 무엇인지 이해해야 합니다.
* 현재 상태에서는 딥링크 피드 도구로 생성한 링크가 `링크` 컬럼에서 원래 기본적으로 지정한 웹 URL로 연결됩니다. `branch_query_params`라는 컬럼을 포함하고 모든 행에 `$fallback_method=app_wide`를 값으로 포함하여 이 동작을 재정의할 수 있습니다. 이렇게 하면 각 링크가 [링크 설정](https://dashboard.branch.io/link-settings)에서 지정한 플랫폼 폴백(일반적으로 앱 스토어)으로 연결됩니다.
* Facebook은 폴백 동작을 변경하기 위해 특정 ["applink treatment"](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/mobile-app-events#deeplinksetup) 값을 표시할 것을 요구합니다. 이를 인터페이스에 추가하는 작업이 현재 진행 중이나, 당분간은 피드 소스에 직접 추가해주시기 바랍니다.

### 딥링크가 작동하지 않음

* 딥링크 데이터를 포함했는지 확인하세요. Branch는 모든 링크에 대해 피드 소스 내 `링크` 컬럼의 웹 URL에 해당하는 모든 [호스팅된 딥링크 데이터](/web/hosted-data/)를 스크랩합니다. 아니면 피드 소스 내에서 딥링크 데이터를 컬럼으로 추가한 다음 딥링크 생성 2단계에서 관련 데이터를 선택할 수 있습니다.
* 어떤 데이터가 앱으로 전달되는지 확인하려면 링크를 클릭한 다음 해당 링크 클릭을 [라이브 뷰](https://dashboard.branch.io/liveview/clicks)로 확인하여 데이터가 앱으로 전달되는지 볼 수 있습니다.
* 어떤 딥링크 데이터를 포함해야 하는지 모르겠다면 팀 내 기술 직원에게 문의하여 작동하는 Branch 링크에 어떤 데이터가 포함되어 있는지 확인해 볼 수 있습니다.

### 피드 소스가 업로드되지 않음

* Branch는 Facebook의 [피드 형식](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/product-catalog#feed-format)과 호환되는 피드 소스를 허용합니다. [Facebook의 제품 피드 디버그 도구](https://business.facebook.com/ads/product_feed/debug)를 사용하여 제품 피드 형식을 테스트하고 디버깅하세요.

* Branch는 품목을 구매할 수 있는 판매자 사이트의 링크를 포함하는 피드 소스에 최소한 `링크` 필드를 위한 컬럼을 포함할 것을 요구하지만, Facebook은 몇 가지 필드를 추가로 요구합니다. 제품 피드에 [필수 필드](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/product-catalog#required-fields)를 모두 포함했는지 확인하세요.

* 이 도구에서 허용하는 최대 파일 크기는 50MB입니다. 이보다 더 큰 파일을 업로드해야 하는 경우 [integrations@branch.io](mailto:integrations@branch.io)에 문의하시기 바랍니다.

### 문제 보고

* Facebook 데이터 불일치에 대한 자세한 내용은 Branch의 [Facebook 광고 문제 해결 매뉴얼](/deep-linked-ads/facebook-app-install-ads/#troubleshooting)을 참조하세요.

문제가 있거나 궁금한 사항이 있는 경우 [integrations@branch.io](mailto:integrations@branch.io)로 문의해주시기 바랍니다.
