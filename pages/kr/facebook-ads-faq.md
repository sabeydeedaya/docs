## FAQ

### Facebook MMP란?

*"Facebook 마케팅 파트너와 협업하여 더 자세한 인사이트를 얻거나, 여러 광고 네트워크에 걸쳐 성과를 측정해 보세요"[Facebook - '앱 광고 측정'](https://developers.facebook.com/docs/app-ads/measuring){:target="\_blank"}).*

MMP는 넓은 범위에서는 Facebook 모바일 마케팅 파트너를 의미하며, 비교적 좁은 범위에서는 모바일 측정 파트너를 의미하는 약어입니다. 여기서 모바일 측정 파트너는 Facebook 파트너 중에서도 디바이스 레벨의 어트리뷰션 데이터에 액세스할 수 있는 협력 기업입니다. Branch는 Facebook의 파트너로 선정되어 상세 분석 기능과 탁월한 크로스 채널 보고 기능을 제공해왔습니다. Branch는 어떤 설치, 실행, 전환 이벤트가 기타 마케팅 전략 대비 Facebook 광고 캠페인을 통해 발생하는지 측정할 수 있도록 지원합니다.

### Branch는 이벤트에 대한 Facebook 광고의 기여도를 어떻게 측정할까요?

Facebook은 자체 어트리뷰션 네트워크로 설치 및 기타 이벤트에 대한 크레딧을 부여하며, 이 점에서 일부 광고 네트워크와 다릅니다. 다른 광고 네트워크는 일련의 노출 및 클릭 데이터를 전송하며 Branch는 이러한 데이터를 이벤트와 매칭합니다. 그런 다음 Facebook의 크레딧 부여 정보를 다른 광고 네트워크와 비교하고 이메일, 웹사이트 및 기타 출처에서 발생하는 트래픽과도 비교해서 가장 최근에 발생한 클릭을 선택하여 여기에 크레딧을 부여합니다.

Branch SDK를 사용하면 설치 및 기타 이벤트를 추적할 수 있습니다. Facebook MMP 통합을 활성화하면 Branch에서 Facebook으로 이벤트 및 광고 ID를 전송합니다. 그러면 Facebook은 캠페인, 광고 세트 및 광고 등 유용한 데이터를 포함하여 이전에 기기에서 Facebook 광고를 보거나 클릭했는지 여부를 보고합니다. Branch는 그런 다음 위에 언급한 대로 어트리뷰션에 대해 중복된 크레딧 부여 데이터를 제외합니다.

### Branch에서 설치, 실행 및 기타 이벤트에 대한 Facebook의 기여도를 측정하려면 Facebook SDK가 있어야 하나요?

아니요. Branch SDK는 이벤트에 대한 Facebook 광고의 기여도를 측정할 수 있도록 적절한 데이터를 수집합니다.

### Facebook 광고에 딥링크를 사용하려면 어떻게 해야 하나요?

딥링크는 간편하게 만들 수 있습니다. 먼저 Branch 대시보드에서 [Facebook MMP 통합을 설정했는지 확인](/deep-linked-ads/facebook-app-install-ads/#enable-facebook-as-an-ad-partner) 하고, []파트너 관리 섹션에서 Facebook 페이지](https://dashboard.branch.io/ads/partner-management/a_facebook?tab=settings) 로 이동한 다음 'Facebook 링크 만들기'를 클릭하세요.

[Facebook 개요] (/deep-linked-ads/facebook-ads-overview/) 페이지를 통해 연결된 가이드에서 자세한 지침을 확인하실 수 있습니다. 예를 들어, [앱 설치 가이드의 이 섹션](/deep-linked-ads/facebook-app-install-ads/#create-an-ad-link)을 참조하세요.

### 컨버젼 이벤트에 대한 Facebook 광고의 기여도를 측정하려면 어떻게 해야 하나요?

먼저 Branch 대시보드에서 [Facebook MMP 통합](/deep-linked-ads/facebook-app-install-ads/#enable-facebook-as-an-ad-partner) 을 설정했는지 확인하고 [표준 이벤트 추적을 설정](/apps/v2event/#v2-event)하세요. 이벤트에 대한 Facebook 광고의 기여도를 자동으로 손쉽게 측정할 수 있습니다.

*Facebook은 40자를 초과하거나 하이픈으로 시작하는 맞춤 이벤트 이름을 허용하지 않으며 문자, 숫자, 하이픈, 공백 및 밑줄만 사용하도록 합니다.*.  Branch는 자동으로 40자를 초과하는 이벤트 이름을 조정하며, 이벤트가 승인 절차를 통과할 수 있도록 이름을 수정할 수 있습니다. 아래 예시를 확인해 보세요.

- **입력한 이벤트 이름**: This & Is & A * Bad Event That's So SO SOOOOOO Long
- **Branch에서 수정한 이름**: This _ Is _ A _ Bad Event That_s So SO S

이벤트 트래킹 관련 고급 옵션은 [아래](/deep-linked-ads/facebook-ads-faq/#facebook-mmp-event-options)에서 자세히 확인하실 수 있습니다.

### 온보딩 과정의 일환으로 요청하는 권한과 그 이유

| **Permissions (OAuth scopes)** | **Why** |
| - | - |
| ads_read | 마케팅 인사이트 데이터(예: 노출, 클릭)를 가져와서 Branch 대시보드에 표시합니다. 또한 크리에이티브 이름, ID 등을 가져오는 데 이 권한을 활용하여 설치, 실행 및 기타 이벤트에 대한 상세 분석을 제공할 수도 있습니다. |
| business_management | (1) 선택할 광고 계정을 가져옵니다. (2) 로그인 과정을 완료하면 Branch가 REPORTS_ONLY 권한으로 시스템 사용자를 여러분의 비즈니스 및 광고 계정에 추가합니다. 그런 다음 해당 권한(ads_read 및 business_management)을 모두 가진 액세스 토큰을 더 이상 저장하지 않습니다. 앞으로 비정상적이거나 허가되지 않은 활동이 감지될 경우 해당 시스템 사용자를 손쉽게 격리하거나 권한을 해제할 수 있습니다. |

### 온보딩 과정에서 필요한 정보와 그 이유

| **Identifier** | **Why** |
| - | - |
| 광고 계정 | 마케팅 인사이트 데이터(예: 노출, 클릭)를 가져와서 Branch 대시보드에 표시합니다. |
| Facebook 앱 ID | S설치, 실행 및 기타 이벤트를 Facebook에 전송하여 해당 이벤트가 Facebook 광고 캠페인을 통해 발생했는지 확인합니다. |

If you still have questions, please [contact us](https://support.branch.io/support/tickets/new){:target="\_blank"} and include "Facebook MMP + Permissions" in the subject.

#### 사용하려는 광고 계정이 표시되지 않는 경우

Facebook에서 로그아웃한 후 다시 로그인해 보세요. 이때 사용 중인 이메일 주소를 입력하시기 바랍니다. 그래도 광고 계정이 표시되지 않으면 [business.facebook.com](https://business.facebook.com)을 방문하여 동일한 이메일 주소/Facebook 계정을 사용 중인지 확인하시기 바랍니다. 문제가 해결되지 않으면 제목에 'Facebook MMP + 광고 계정이 표시되지 않음'을 기재하여 [문의](https://support.branch.io/support/tickets/new) 해 주세요.

### 이전 Facebook 광고 상품과 새로운 Facebook 광고 상품의 차이점

Branch는 현재 Facebook MMP(모바일 측정 파트너)로서, Facebook과의 파트너십을 통해 설치, 실행 및 맞춤 이벤트에 대한 Facebook 광고 캠페인의 기여도를 더 정확하게 측정합니다.

주요 차이점: Branch는 이 상품을 Branch 딥링크 없이도 사용할 수 있습니다. 즉, Branch 링크를 별도로 만들어 Facebook 광고에 추가하지 않아도 됩니다.

Branch 딥링크를 사용하는 경우, Branch는 여러분이 딥링크를 통해 사용자를 콘텐츠에 연결할 수 있도록 앱의 Branch 딥링크 데이터를 반환합니다. Facebook 광고를 통해 발생한 이벤트에는 Branch 딥링크 데이터가 아닌 Facebook 광고 캠페인 데이터가 포함됩니다. 이 데이터는 데이터 통합을 통해 서드 파티에 전송할 수 없습니다.

### Branch는 Facebook에 대한 조회(노출) 기여 데이터를 제공하나요?

Branch는 노출에서 설치까지 최대 24시간 동안 설치에 대한 기기 수준의 조회 기여 데이터를 제공할 수 있습니다. 이 기능은 Facebook이 제공한 MMP API를 통해 사용할 수 있습니다. 또한 설치 후 곧바로 다른 앱 이벤트(예: 실행)가 발생한 경우에도 이를 동일한 노출/조회의 기여로 측정할 수 있습니다.

### 이전 Facebook 연동에서 신규 Facebook 연동으로 업그레이드하려면?

방법은 간단합니다. [광고 관리 포털의 Facebook 섹션](https://dashboard.branch.io/ads/partner-management/a_facebook?tab=settings)으로 이동하세요. 'Facebook과 연결'을 선택하고 안내에 따라 [Facebook MMP와의 연동을 설정](/deep-linked-ads/facebook-app-install-ads/#enable-facebook-as-an-ad-partner)할 수 있습니다.

이 연결 절차를 완료하면 MMP 기능을 모두 사용하실 수 있도록 업그레이드해 드립니다. 이제 설치 및 기타 분석에 Facebook의 캠페인, 광고 세트, 광고 및 크리에이티브 관련 데이터를 활용할 수 있습니다.

### 이전에 Facebook을 사용해 본 적이 있지만...

[광고 관리 포털의 Facebook 섹션](https://dashboard.branch.io/ads/partner-management/a_facebook?tab=settings)으로 이동하면 'Facebook과 연결' 메시지만 표시됩니다. 어떻게 해야 하나요?

기존의 Facebook 설정 과정은 표시되지 않도록 처리했습니다. 'Facebook과 연결'을 선택하고 안내에 따라 [Facebook MMP와의 연동을 설정](/deep-linked-ads/facebook-app-install-ads/#enable-facebook-as-an-ad-partner)하세요.

이전에 사용된 연동 계정 절차는 더 이상 지원되지 않습니다. 기존의 연결 절차를 이용해야 하는 경우 제목에 'Facebook MMP + 기존 연결 절차'를 기재하여 [문의]https://support.branch.io/support/tickets/new){:target="\_blank"}해 주세요.

### 딥링크를 사용한 캠페인을 통해 얻을 수 있는 성과

광고에 딥링크를 사용하는 것을 권장합니다. [연구 결과에 따르면](https://branch.io/resources/#case-studies){:target="\_blank"} 사용자를 딥링크로 연결할 때 더 나은 경험을 제공하고 리텐션율도 높일 수 있습니다.

Branch 링크를 Facebook 광고에 삽입하면 해당 링크가 앱에 반환되어 사용자를 딥링크로 연결할 수 있습니다. 딥링킹 기능은 이전과 동일하게 작동합니다.

### Facebook 광고에서 딥링크를 제거해야 하나요?

아니요. 딥링크를 사용하는 것이 좋습니다. 이전 질문 내용을 참고하시기 바랍니다.

### 새로운 Facebook MMP 기능을 웹 캠페인에 활용할 수 있나요?

일반적으로 불가능합니다. Facebook MMP를 사용하면 Facebook 앱 설치 및 앱 참여 광고의 성과를 측정할 수 있지만, 몇몇 경우에는 앱 설치/참여 광고 이후에 발생한 웹 이벤트가 해당 광고를 통해 발생한 것으로 측정할 수 있습니다. 그 이유는 저희는 '사용자 중심 어트리뷰션' 방식을 사용하여 웹과 앱 유저의 광고 아이디를 연결할 수 있기 때문입니다.

### 데이터를 가져올 수 있나요?

!!! warning "경고"
	데이터 통합에는 Facebook을 통해 발생한 이벤트가 포함되지 않습니다. 디바이스 레벨의 Facebook 어트리뷰션 데이터를 서드 파티와 공유할 수 없기 때문입니다.

Facebook 관련 데이터에 액세스하는 방법은 다양합니다.

[쿼리 API](/exports/query-api)뿐 아니라 [Branch 대시보드](https://dashboard.branch.io){:target="\_blank"}의 여러 페이지에서 노출, 클릭, 설치, 실행 및 전환 이벤트에 대한 분석 데이터를 확인할 수 있습니다.

Facebook의 ['고급 모바일 측정' 계약서('고급 모바일 앱 측정에 대한 데이터 이용 약관')](https://www.facebook.com/ads/manage/advanced_mobile_measurement/tos){:target="\_blank"})에 서명한 경우 [Webhook](/exports/ua-webhooks/), [Data Export API](/exports/api-v3/) 및 [CSV Export](https://dashboard.branch.io/data-import-export/csv-exports){:target="\_blank"}를 통해 기기 수준의 데이터를 가져올 수 있습니다. 이 계약서에 서명하지 않았다면, Webhook, Data Export API 및 CSV Export를 통해 액세스한 경우 Facebook 광고를 통해 발생한 모든 이벤트는 오가닉 이벤트로 표시됩니다.

Branch는 디바이스 레의 Facebook 어트리뷰션 데이터를 서드 파티에 전송할 수 없으므로, Facebook을 통해 발생한 이벤트를 데이터 통합을 사용하여 보낼 수 없습니다. 대신, 해당 데이터에 대해 사내 분석(웹훅, 데이터 내보내기 API 또는 CSV 내보내기 사용)을 실시하거나 모든 분석 및 어트리뷰션 요구 사항을 충족할 수 있도록 Branch 대시보드를 사용해 보시기 바랍니다. Branch 대시보드로 해결되지 않는 분석 요구 사항이 있는 경우 제목에 'Facebook MMP + 기능 요청'을 기재하여 [문의](https://support.branch.io/support/tickets/new){:target="\_blank"}해 주세요.

| **Branch feature** | **Facebook data included** |
| - | - |
| [대시보드 시각화](https://dashboard.branch.io/){:target="\_blank"} | 사전 집계된 분석 |
| [쿼리 API](/exports/query-api/) | 사전 집계된 분석 |
| [라이브뷰](https://dashboard.branch.io/liveview){:target="\_blank"} | 디바이스 레벨 데이터 분석 * |
| [Data Export API](/exports/api-v3/) | 디바이스 레벨 데이터 분석 * |
| [CSV Exports](https://branch.dashboard.branch.io/data-import-export/csv-exports){:target="\_blank"} | 디바이스 레벨 데이터 분석 * |
| [Webhooks](/exports/ua-webhooks/) | 디바이스 레벨 데이터 분석 * |
| [데이터 통합](/integrations/data-integrations/) | 지원되지 않음 |

(`*`) Facebook의 ['고급 모바일 측정' 계약서('고급 모바일 앱 측정에 대한 데이터 이용 약관')](https://www.facebook.com/ads/manage/advanced_mobile_measurement/tos){:target="\_blank"} 에 서명해야 이 데이터를 확인할 수 있습니다.

다음은 '고급 모바일 측정' 계약서에 서명한 광고 계정을 볼 수 있는 페이지입니다.

![AMM](/_assets/img/pages/deep-linked-ads/facebook-ads-faq/amm.png)

### Facebook 데이터와 Branch 데이터가 일치하지 않는 경우

아래에서 [Facebook과 Branch 데이터 간의 불일치 원인](/deep-linked-ads/facebook-ads-faq/#sources-of-discrepancies-between-facebook-and-branch) 섹션을 참조하시기 바랍니다.

## Facebook 광고 고급 옵션

### Facebook MMP 이벤트 옵션

!!! info "팁"
	아래의 옵션을 Branch 대시보드에서 보려면 [여기를 클릭](https://dashboard.branch.io/ads/partner-management/a_facebook?tab=events){:target="\_blank"}하세요.

Branch와 Facebook MMP를 사용하면 이벤트가 Facebook 광고 캠페인을 통해 발생하는지 측정할 수 있습니다. Branch가 Facebook에 광고 ID를 포함한 메타데이터와 이벤트를 보내면, Facebook은 사용자가 마지막으로 보거나 클릭한 광고에 대한 데이터를 반환합니다. 그런 다음 Branch 대시보드에 이 데이터가 표시되며, 조건에 따라* 이 데이터를 Branch의 [데이터 피드](/exports/data-feeds/) 상품에서 사용할 수 있습니다.

파트너는 Facebook에 이벤트를 보낼 때 아래와 같이 여러 옵션을 사용합니다.

 (`*`) [고급 모바일 앱 측정에 대한 데이터 이용 약관](https://www.facebook.com/ads/manage/advanced_mobile_measurement/tos){:target="\_blank"}에 서명해야 합니다.

#### 인스톨 추적

Branch가 모든 인스톨 데이터를 Facebook으로 보내면, Facebook은 중복 인스톨 데이터를 제거합니다. 또한 Facebook SDK 및/또는 다른 MMP가 있으면 이를 통해 Facebook의 백엔드로 인스톨 데이터가 전송됩니다. Facebook이 중복 항목을 제거하므로 중복 인스톨은 발생하지 않습니다.

#### 리인스톨과 오픈 추적

!!! warning "경고"
	Facebook은 백엔드에서 중복되는 커스텀 앱 이벤트를 제거하지 않습니다. 따라서 Facebook SDK가 통합되어 있거나 다른 MMP 추적 앱이 열려 있는 경우 아래의 옵션 1을 선택하시기 바랍니다.

재설치와 실행을 트래킹할 경우 다음과 같은 3가지 옵션을 선택할 수 있습니다.

1. *Branch 이름(branch_open) 사용*: 이 옵션을 사용하면 Facebook에서 어트리뷰션 데이터를 가져올 수 있지만 이벤트를 앱 실행으로 계산하지 않습니다. Facebook SDK가 통합되어 있거나 다른 MMP로 테스트 중인 경우 이 옵션을 사용하세요. Facebook SDK 또는 다른 MMP가 이미 fb_mobile_activate_app을 전송하므로 Branch에서 이를 다시 전송하지 않습니다(기본값).
1. *Facebook 이름(fb_mobile_activate_app) 사용*: Branch는 앱 오픈 추적을 위해 Facebook에서 사용한 정확한 이벤트를 전송합니다. Facebook SDK가 없고 다른 MMP를 활용하여 오픈을 추적하지 않으며, Branch를 통해 Facebook이 오픈을 기록하도록 하려면 이 옵션을 사용하세요.
1. *Disable*: Branch가 오픈에 대해 기여도를 측정하지 않도록 하려면 이 옵션을 사용하세요. 경우에 따라 Facebook에서 이전에 검색한 어트리뷰션 데이터를 기반으로 오픈에 대해 기여도를 측정할 수 있습니다. 하지만 Branch는 어트리뷰션 데이터를 다시 가져오기 위해 Facebook에 오픈 이벤트를 전송하지 않습니다.

#### 다른 전환 이벤트 추적

!!! warning "경고"
	Facebook은 백엔드에서 중복되는 커스텀 앱 이벤트를 제거하지 않습니다. 따라서 Facebook SDK가 통합되어 있거나 다른 MMP 추적 앱이 열려 있는 경우 아래의 옵션 1을 선택하시기 바랍니다.

Branch만으로도 [앱 이벤트를 추적](/apps/v2event/#v2-event)할 수 있습니다. Branch를 통해 한 번 추적하면 Branch에서 해당 이벤트를 Facebook과 기타 분석 시스템으로 전송합니다. 여기에 간략히 나와 있는 [v2/이벤트 로깅 방법](/apps/v2event/#v2-event)을 사용하시기 바랍니다.

장바구니에 추가, 구매 및 기타 Facebook 앱 이벤트를 추적할 경우 다음과 같은 3가지 옵션을 사용할 수 있습니다.

1. *Branch 이름 사용*: Facebook에서 어트리뷰션 데이터를 가져올 수 있지만 이벤트를 구매, 장바구니에 추가 등으로 계산하지 않습니다. Facebook SDK가 연동되어 있거나 다른 MMP로 테스트 중이며, 이미 이 두 가지 방법 중 하나를 사용하여 앱 이벤트를 추적하는 경우 이 옵션을 사용하세요. Facebook SDK 또는 다른 MMP가 이미 Facebook에 이벤트를 전송하므로 Branch에서 해당 이벤트를 다시 전송하지 않습니다(기본값).
1. *Facebook 이름 사용*: Branch는 앱 이벤트 추적을 위해 Facebook에서 사용한 정확한 이벤트를 전송합니다. Facebook SDK 또는 다른 MMP를 활용하여 앱 이벤트를 추적하지 않고, Branch를 통해 Facebook이 해당 이벤트를 기록하도록 하려면 이 옵션을 사용하세요.
1. *Disable*: Branch가 이러한 전환 이벤트에 대해 기여도를 측정하지 않도록 하려면 이 옵션을 사용하세요. Branch는 경우에 따라 Facebook에서 이전에 검색한 어트리뷰션 데이터를 기반으로 해당 전환 이벤트에 대해 기여도를 측정할 수 있습니다. 하지만 어트리뷰션 데이터를 다시 가져오기 위해 Facebook에 전환 이벤트를 전송하지는 않습니다.

#### Mapping of Branch event names to Facebook events

| Branch event name | Facebook MMP _eventName
| --- | ---
| ACHIEVE_LEVEL | fb_mobile_level_achieved
| ADD_PAYMENT_INFO | fb_mobile_add_payment_info
| ADD_TO_CART | fb_mobile_add_to_cart
| ADD_TO_WISHLIST | fb_mobile_add_to_wishlist
| COMPLETE_REGISTRATION | fb_mobile_complete_registration
| COMPLETE_TUTORIAL | fb_mobile_tutorial_completion
| INITIATE_PURCHASE | fb_mobile_initiated_checkout
| PURCHASE | fb_mobile_purchase
| RATE | fb_mobile_rate
| SEARCH | fb_mobile_search
| SPEND_CREDITS | fb_mobile_spent_credits
| UNLOCK_ACHIEVEMENT | fb_mobile_achievement_unlocked
| VIEW_ITEM | fb_mobile_content_view

#### Mapping of Branch metadata to Facebook metadata

|Branch Key-Value Pair | Facebook MMP Key-Value Pair | Facebook event(s) supported
| --- | --- | ---
|commerce_data.revenue | _valueToSum | fb_mobile_add_to_cart, fb_mobile_add_to_wishlist, fb_mobile_initiated_checkout, fb_mobile_purchase, fb_mobile_spent_credits, fb_mobile_content_view
|commerce_data.currency | fb_currency | fb_mobile_add_to_cart, fb_mobile_add_to_wishlist, fb_mobile_initiated_checkout, fb_mobile_purchase, fb_mobile_content_view
|content_items[0].$sku | fb_content_id | fb_mobile_add_to_cart, fb_mobile_add_to_wishlist, fb_mobile_tutorial_completion, fb_mobile_initiated_checkout, fb_mobile_purchase, fb_mobile_rate, fb_mobile_spent_credits, fb_mobile_content_view
|content_items[0].$product_category | fb_content_type | fb_mobile_add_to_cart, fb_mobile_add_to_wishlist, fb_mobile_initiated_checkout, fb_mobile_purchase, fb_mobile_rate, fb_mobile_search, fb_mobile_spent_credits, fb_mobile_content_view
|content_items[0].$quantity | fb_num_items | fb_mobile_initiated_checkout, fb_mobile_purchase
|content_items[0].$rating | _valueToSum | fb_mobile_rate
|content_items[0].$rating_max | fb_max_rating_value | fb_mobile_rate
|event_data.search_query | fb_search_string | fb_mobile_search
|content_items[0].$og_description | fb_description | fb_mobile_achievement_unlocked
|custom_data.fb_payment_info_available | fb_payment_info_available | fb_mobile_initiated_checkout
|custom_data.level | fb_level | fb_mobile_level_achieved
|custom_data.fb_success | fb_success | fb_mobile_add_payment_info, fb_mobile_tutorial_completion, fb_mobile_search
|custom_data.fb_registration_method | fb_registration_method | fb_mobile_complete_registration

현재 Facebook은 이벤트당 fb_content_id(기타)를 하나만 전송하도록 지원하지만, Branch는 더 많이 전송하도록 지원합니다. 가능한 한 많은 기능을 제공하기 위해 Branch는 첫 번째 content_item을 선택하고 Facebook에 전송할 수 있는 키 정보에 대해 검색합니다.

####  커스텀 이벤트 추적

인스톨 및 Facebook 앱 이벤트 를 추적하는 것 외에도 Branch가 커스텀 이벤트에 대해 기여도를 측정하도록 할 수 있습니다. 이렇게 하려면 Facebook에 해당 이벤트를 전송해야 합니다.

동일한 [Facebook 앱 이벤트](https://developers.facebook.com/docs/marketing-api/app-event-api){:target="\_blank"}가 없는 커스텀 이벤트를 추적할 경우 다음과 같이 2가지 옵션을 사용할 수 있습니다.

1. *사용*: 이 옵션을 사용하면 Branch에서 커스텀 이벤트를 Facebook에 전송합니다. 그러면 Facebook에서 어트리뷰션 데이터를 가져올 수 있습니다(기본값).
1. *Disable*: Branch에서 커스텀 이벤트에 대해 기여도를 측정하지 않도록 하려면 이 옵션을 사용하세요. Branch는 경우에 따라 Facebook에서 이전에 검색한 어트리뷰션 데이터를 기반으로 해당 커스텀 이벤트에 대해 기여도를 측정할 수 있습니다. 하지만 Branch는 어트리뷰션 데이터를 다시 가져오기 위해 Facebook에 커스텀 이벤트를 전송하지는 않습니다.

### 기존 Facebook 연동에서 MMP로 마이그레이션

!!! info "참고"
	Facebook의 앱 비밀번호를 복사하여 붙여 넣어야 하는 기존 Facebook 온보딩 절차가 더 이상 표시되지 않습니다. 대신 'Facebook으로 인증' 옵션을 사용할 수 있습니다.

2018년 2월 14일 이전에 Facebook과 Branch의 통합을 사용한 경우 MMP를 포함하는 새로운 Branch 통합으로 업그레이드하는 것이 좋습니다.

Branch는 현재 Facebook 공인 모바일 측정 파트너입니다. 이전보다 탁월한 방식으로 Facebook이 설치, 실행 및 전환 이벤트에 어떻게 기여하는지 측정할 수 있습니다.

이 통합에는 Facebook, Instagram 및 Audience Network에 대한 모든 지원이 포함됩니다. Branch는 Facebook에서 자동으로 노출 및 클릭 데이터를 가져와 Branch 링크에 대한 클릭 데이터와 함께 보여줍니다. 사용자들의 만족도가 높은 딥링킹은 계속해서 지원됩니다.

Facebook MMP를 설정하는 방법은 [여기](/deep-linked-ads/facebook-app-install-ads/#enable-facebook-as-an-ad-partner)에서 확인하세요. 이렇게 하면 백엔드에서 기존 자격 증명이 대체됩니다. Branch 대시보드에 Facebook 앱 비밀번호를 복사하여 붙여넣는 대신, 클릭만으로 손쉽게 일반 Facebook 로그인 절차를 따를 수 있습니다.

Branch는 Branch 대시보드 시각화를 통해 Facebook 캠페인, 광고 세트 및 광고 데이터를 자동으로 보여줍니다. 대시보드에서 [광고 분석]https://dashboard.branch.io/ads/analytics){:target="\_blank"}뿐 아니라 [출처 분석](https://dashboard.branch.io/sources){:target="\_blank"}과 같은 크로스 채널 분석에 대한 시각적인 데이터도 확인할 수 있습니다.

### Facebook과 Branch 데이터 간의 불일치 원인

Branch를 Facebook MMP로 사용할 때 올바르게 설정하지 않을 경우 Branch 대시보드와 Facebook 대시보드 간 데이터가 일치하지 않을 수 있습니다. Branch 대시보드에 Facebook을 온보딩한 후에도 불일치가 발생하는 데에는 여러 원인이 있습니다.

Facebook 및 Branch 대시보드상에서 서로 다른 수치가 발견되는 원인은 여러가지입니다. Branch에는 Facebook 인사이트 API를 통해 노출 및 클릭을 추적하는 시스템과 비공개 Facebook API를 통해 설치, 재설치, 실행 및 전환 이벤트를 추적하는 시스템이 있습니다. 차이점을 파악할 때 한 번에 이벤트(예: 클릭 또는 설치) 한 개를 선택하고 불일치가 발생하는 원인을 파악하는 데 집중하는 것이 가장 좋습니다.

아래의 첫 섹션 두 개에서는 불일치의 일반적인 원인이라 할 수 있는 어트리뷰션 기간과 시간대에 대해 설명하고, 그 다음 섹션에서는 특정 문제 진단 및 해결에 대한 추가 단계를 안내합니다.

#### 어트리뷰션 윈도우

어트리뷰션 윈도우는 초기 액션(클릭 또는 노출)과 이러한 초기 액션을 통해 발생한 것으로 파악한 전환 이벤트(설치 또는 실행) 사이의 최대 시간입니다.

3일의 조회 어트리뷰션 윈도우를 예시로 들어보겠습니다. 사용자가 광고를 보고 2일 후에 앱을 설치하면 해당 설치는 광고 조회를 통해 발생한 것으로 간주합니다. 하지만 사용자가 광고를 보고 4일 후에 앱을 설치하면 해당 설치는 오가닉 설치로 간주되며, 광고 조회를 통해 발생한 것으로 간주하지 않습니다. 자세한 내용은 [여기](/dashboard/unified-analytics/#attribution-windows)를 참조하세요.

Branch 대시보드의 어트리뷰션 윈도우 중 하나가 Facebook 대시보드의 해당 윈도우와 다른 경우 대시보드 간 데이터가 일치하지 않습니다. Branch 대시보드에서 어트리뷰션 기간을 변경하거나 특정 광고 계정에 대한 Facebook 대시보드를 변경하여 데이터 간의 차이를 줄일 수 있습니다.

Branch 어트리뷰션 윈도우는 4개이고, Facebook 어트리뷰션 윈도우는 2개입니다. 아래 차트에서는 어떤 Facebook 윈도우 이름이 어떤 Branch 윈도우 이름에 해당하는지 보여줍니다. Facebook 어트리뷰션 윈도우 변경

| Branch window name  |  Facebook window name |
|---|---|
| Click to install | Click Window|
| Click to session start |  Click Window |
| Click to conversion event | Click Window |
| Impression to install | View Window |
| Impression to session start | View Window |
| Impression to conversion event | View Window |

*특정 광고 계정에 대한 Facebook 어트리뷰션 윈도우를 업데이트하려면*

https://business.facebook.com/ads/manager/account_settings/information으로 이동하세요. 왼쪽 상단 모서리의 드롭다운에서 계정을 선택합니다. 계정 관리자라면 오른쪽 상단에 '어트리뷰션' 섹션이 보이고, 클릭 또는 조회 기간이나 두 기간을 모두 편집할 수 있을 것입니다.

*Branch 어트리뷰션 윈도우 변경*

또는, Branch 어트리뷰션 윈도우 4개 중 임의의 기간을 업데이트할 수 있습니다. 이렇게 하려면 Branch 대시보드의 [링크 설정](https://dashboard.branch.io/link-settings) 섹션으로 이동하고 '어트리뷰션 윈도우' 섹션까지 아래로 스크롤하여 펼치세요. 차트에 나열된 4개의 기간 중 임의의 기간을 해당하는 Facebook 기간과 일치하도록 변경한 다음 페이지의 하단에서 저장하시기 바랍니다.

*노출 또는 전환 시간에 기반한 보고*

Facebook과 Branch는 노출이 같은 날 발생하고 설치가 다른 날 발생한 경우 동일한 설치를 다른 날에 발생한 것으로 보고할 수 있습니다.

배경:

Facebook은 기본적으로 노출이 발생한 날을 기반으로 설치를 보고하지만, 여러분은 설치가 발생한 날을 기반으로 보고서를 볼 수도 있습니다.

Branch는 항상 설치 날짜를 기반으로 설치를 보고하며, 노출 날짜를 기반으로는 보고하지 않습니다.

다음 시나리오를 살펴보겠습니다.

사용자가 4월 1일에 광고를 보고 클릭한 다음 4월 2일에 앱을 설치합니다.

Facebook은 기본적으로 4월 1일에 설치가 발생했다고 보고합니다. 하지만 인사이트 API에서 데이터를 가져올 때 action_report_time=conversion 옵션을 지정할 수 있습니다. 그러면 Facebook은 4월 2일에 설치가 발생한 것으로 보고합니다.

Branch는 별도의 조치를 취하지 않아도 4월 2일에 설치가 발생한 것으로 보고합니다.


#### 시간대

Facebook 광고 계정과 Branch 계정의 시간대가 동일한지 확인하세요.

Branch 계정에서 사용한 시간대는 [여기](https://dashboard.branch.io/account-settings/app){:target="\_blank"}에서 볼 수 있습니다.

Facebook 광고 계정에서 사용한 시간대는 [여기]https://www.facebook.com/ads/manager/account_settings/information/){:target="\_blank"}에서 볼 수 있습니다. 여러 광고 계정에서 Branch를 사용하고 있다면 각 광고 계정의 시간대를 맞춰야 합니다.

시간대를 모두 맞추지 못한 경우 Branch 대시보드의 일부 데이터가 Facebook 대시보드의 데이터와 정확하게 일치하지 않을 수 있습니다. 데이터가 손실되지는 않지만 짧은 시간 동안에는 다소 차이가 있을 수 있습니다. 더 긴 시간 동안의 수치를 합하면 일치하지 않는 시간대로 인해 발생하는 영향을 크게 줄일 수 있습니다.

#### 기타 일반적인 문제

##### iOS 10+ 및 광고 추적 제한 문제

Apple은 iOS 10에서 사용자가 앱 추적 제한 옵션을 사용할 경우 앱 개발자가 IDFA를 수집하지 못하도록 제한했습니다. 이 경우 Branch와 Facebook은 데이터를 비교하여 어떻게 설치가 발생했는지 확인할 수 없습니다. 이러한 이유로 두 플랫폼에서 약 15%의 불일치가 발생하며, Branch에서 추적한 설치 수가 더 적어집니다.

##### 광고 ID를 수집하지 않음

연동 과정에서 데이터가 전혀 표시되지 않을 경우 Android에서 Google 광고 ID(GAID)를 수집하지 않았거나 iOS에서 IDFA를 수집하지 않았을 가능성이 있습니다.

- iOS: AdSupport.framework를 추가하고 스토어에 대한 [제출]/apps/ios-launch/)과 관련된 추가 정보를 확인합니다.
- Android: GAID를 수집할 수 있도록 Google Play 서비스를 추가합니다. [여기](/apps/android-launch/)를 참조하세요.

##### 딥링크에 대한 Facebook 캠페인의 기여도 측정

Facebook은 어트리뷰션에 사용되지 않는 앱 설치 캠페인 유형으로 딥링킹에 대한 전용 엔드포인트를 보유하고 있습니다. Branch는 해당 엔드포인트로부터 수신한 링크에 대해 기여도를 측정하지 않으며, 어트리뷰션에 공식 MMP 엔드포인트를 사용합니다. 하지만 동영상 광고 및 재참여 광고를 포함한 일부 Facebook 광고 형식은 실제 링크 클릭을 유도하므로 어트리뷰션이 상충될 수 있습니다.

딥링킹을 위한 링크를 사용할 때 해당 링크에 기여도를 부여하지 않으려면 `%24deeplink_no_attribution=true`를 링크에 추가하세요. 이 매개변수를 사용할 경우 Branch는 해당 링크에 기여도를 부여하지 않으며, 대신 모든 경우에 MMP 응답을 사용합니다.

##### Branch에서 리인스톨, 오픈으로 측정된 인스톨

Branch에서 이전에 발견한 불일치의 근본 원인은 Branch가 설치를 재설치 또는 실행으로 분류하는 경우에 있습니다. Branch는 특정 사용자의 내역을 몇 가지 다른 방법 외에 IDFA 또는 Google 광고 ID를 통해 기억하고, 사용자가 신규 사용자인지, 이전에 앱을 삭제하고 다시 설치한 사용자인지 여부를 감지합니다. Facebook은 180일의 제한이 있는 다른 메커니즘을 보유하고 있습니다. 일부 경우 Branch는 1년 후에 발생된 재설치를 기록하는 경우도 있습니다.

##### setDebug를 사용할 수 없음

[디버그 모드](/apps/ios/#simulate-an-install)는 Facebook에 올바른 하드웨어 ID를 전송하지 못하게 하므로, Facebook 광고는 디버그 모드와 호환되지 않습니다.

##### 캠페인, 광고 세트 및 광고 이름 변경

Facebook 대시보드에서 캠페인, 광고 세트, 광고 또는 크리에이티브의 이름을 변경할 경우 Branch와 Facebook 데이터 사이에 불일치가 발생할 수 있습니다. 예를 들어 캠페인 이름을 변경할 경우 Branch는 신규 캠페인 이름을 사용하여 거의 모든 신규 설치(및 기타 이벤트)를 거의 즉시 추적합니다. 하지만 기존 이벤트를 신규 캠페인 이름으로 재분류하지는 않습니다.

하지만 Branch에서는 데이터를 적절하게 처리하고 있습니다. 2018년 초부터 대시보드에 게시하지는 않지만, 캠페인 ID, 광고 세트 ID, 광고 ID 및 크리에이티브 ID를 기반으로도 데이터를 추적합니다. 해당 항목은 이름을 변경해도 변경되지 않습니다. Branch의 [데이터 피드](/exports/data-feeds/) 상품을 사용하여 여기에 포함된 데이터를 확인할 수 있습니다.


#### 노출 및 클릭 데이터 간 불일치

##### 1. Branch 대시보드에 클릭 또는 설치 데이터가 표시되지 않는 경우

첫째, Facebook 연동이 정상적으로 이루어졌는지 확인해야 합니다. [이 절차](/deep-linked-ads/facebook-app-install-ads/#enable-facebook-as-an-ad-partner)를 정확하게 확인해 주세요. 하나 이상의 광고 계정이 활성화되어 있어야 하며 Facebook 앱 ID가 연결되어 있어야 합니다.

둘째, 설치, 재설치 또는 실행으로 이어지는 광고를 집행 중인지 확인하세요. 앱이 설치되면 곧바로 클릭 데이터가 표시되어야 합니다. 자세한 내용은 다음 FAQ 항목을 참조하세요.

Branch 대시보드에서 설치, 재설치 또는 실행을 확인할 수 없다면 아래의 [Branch 대시보드에서 설치, 재설치 또는 실행 데이터가 표시되지 않는 경우] 섹션으로 건너뛰세요.

##### 2. Facebook 대시보드에 설치 데이터만 표시되고 클릭 데이터는 표시되지 않는 경우

!!! tip "참고"
	Branch는 설치, 재설치 또는 실행 캠페인에 대한 노출과 클릭 데이터만 표시합니다. 이러한 앱 기반 결과로 이어지지 않은 캠페인이 있을 경우 Branch는 이를 숨김 처리합니다. 이를 통해 관련성이 없는 데이터를 사용하여 Branch 대시보드에서 과도하게 확대 분석을 수행하는 것을 방지할 수 있습니다. 관련 의견이 있다면 제목에 'Facebook MMP + 클릭'을 기재하여 [문의](https://support.branch.io/support/tickets/new){:target="\_blank"}해 주세요.

최근 1시간 이내에 통합 기능을 사용하도록 설정한 경우 Branch 대시보드를 새로 고침하여 클릭 데이터를 확인해야 할 수 있습니다. Facebook을 사용하도록 설정한 후 [광고 분석](https://dashboard.branch.io/ads/analytics){:target="\_blank"} 페이지에 처음 방문하면 Branch에서 자동으로 백그라운드 작업을 시작하여 Facebook의 노출과 클릭 데이터를 가져옵니다.

(1) MMP 통합을 사용하도록 설정하고 (2) Ads Analytics 페이지를 방문한 다음 (3) 새로 고침을 클릭하고 (4) 설치는 확인했지만 클릭 데이터가 없는 것을 확인한 후 1시간 이상이 지났다면 제목에 'Facebook MMP + 클릭 없음'을 기재하여 [문의](https://support.branch.io/support/tickets/new){:target="\_blank"}해 주세요.

* Branch 앱 ID
* Facebook 광고 계정 ID
* 클릭 및 인스톨이 기록된 Facebook 캠페인 이름
* 날짜 범위
* 날짜 범위에 해당하는 Facebook 대시보드에서 확인되는 클릭 수(테이블과 스크린샷 모두 포함)
* 날짜 범위에 해당하는 Facebook 대시보드에서 확인되는 인스톨 수(테이블과 스크린샷 모두 포함)

##### 3. Branch 대시보드에 클릭 데이터가 표시되지만 Facebook 대시보드에서 확인되는 수치와 다른 경우

*If you are looking at impressions/clicks for the current day:*

당일의 노출/클릭 수를 확인한 경우:

수치가 Branch와 Facebook 간에 매우 유사하게 일치할 경우 Facbeook의 수치가 약간 더 최근 값일 수 있습니다. Facebook 인사이트 API는 데이터를 15분마다 새로 고치며, Branch는 업데이트된 수치를 가능한 한 자주 가져오려고 시도합니다.

수치가 매우 유사하게 일치하지는 않지만, 최근 신규 캠페인을 시작한 경우 Branch가 해당 캠페인의 데이터를 아직 가져오지 않았을 수 있습니다. 해당 수치는 1시간 이내에 훨씬 더 유사하게 일치할 것입니다. 그렇지 않을 경우 제목에 'Facebook MMP + 클릭 수 불일치'를 기재하여 [문의](https://support.branch.io/support/tickets/new){:target="\_blank"}해 주세요.

* Branch 앱 ID
* Facebook 광고 계정 ID
* 클릭 및 인스톨이 기록된 Facebook 캠페인 이름
* 날짜 범위
* 날짜 범위에 해당하는 Facebook 대시보드에서 확인되는 클릭 수(테이블과 스크린샷 모두 포함)
* 날짜 범위에 해당하는 Facebook 대시보드에서 확인되는 인스톨 수(테이블과 스크린샷 모두 포함)

*이전 날짜의 노출/클릭 수를 확인한 경우:*

Facebook 연동을 처음 설정한 경우 [Ads Analytics](https://dashboard.branch.io/ads/analytics){:target="\_blank"} 페이지를 방문하면 Branch가 최근 며칠 동안의 노출 및 클릭 데이터를 가져옵니다. 이때 7일 이전의 노출 및 클릭 데이터는 확인이 어려울 수 있습니다. 이 데이터가 필요할 경우 제목에 'Facebook MMP + 이전 클릭 수 불러오기'를 기재하여 [문의](https://support.branch.io/support/tickets/new){:target="\_blank"}해 주세요. 문의 시 다음 정보를 함께 제공해 주세요.

* Branch 앱 ID
* Facebook 광고 계정 ID
* 클릭 및 인스톨이 기록된 Facebook 캠페인 이름
* 날짜 범위

#### 설치, 실행 및 전환 이벤트 간 불일치

##### 1. Branch 대시보드에서 설치, 재설치 또는 실행 데이터가 표시되지 않는 경우

첫째, Facebook 연동이 정상적으로 이루어졌는지 확인해야 합니다. [이 절차](/deep-linked-ads/facebook-app-install-ads/#enable-facebook-as-an-ad-partner)를 정확하게 확인해 주세요. 하나 이상의 광고 계정이 활성화되어 있어야 하며 Facebook 앱 ID가 연결되어 있어야 합니다.

둘째, 설치, 재설치 또는 실행으로 이어지는 광고를 집행 중인지 확인하세요.

셋째, Facebook 대시보드에서 설치, 재설치 또는 실행을 유도하는 캠페인을 찾습니다. 앱 캠페인을 진행 중인 광고 계정 ID를 확인하세요. 그런 다음 [파트너 관리에서 Facebook 페이지](https://dashboard.branch.io/ads/partner-management/a_facebook?tab=settings){:target="\_blank"}로 이동하여 광고 계정 ID가 완료된 연결 프로세스의 일부로 표시되는지 확인해야 합니다. 해당 정보는 여기에 표시되어야 합니다(광고 계정 두 개가 화면에서 활성화된 것으로 표시되지만 광고 계정 ID는 흐리게 표시됨).

![complete](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/9-complete.png)

넷째, Branch와 Facebook 통합을 사용하도록 설정한 후에 발생한 설치, 재설치 또는 실행을 확인해야 합니다. Branch는 디바이스 레벨의 과거 데이터를 가져올 수 없습니다. Facebook API가 이에 맞게 설계되지 않았기 때문입니다. Branch와 Facebook을 사용하도록 설정한 다음 신규 설치가 발생할 때까지 기다린 후에 [광고 분석](https://dashboard.branch.io/ads/analytics){:target="\_blank"} 페이지를 확인하세요.

이후에도 설치 데이터가 표시되지 않을 경우 제목에 'Facebook MMP + 설치 없음'을 기재하여 [문의](https://support.branch.io/support/tickets/new){:target="\_blank"}해 주세요.

* Branch 앱 ID
* Facebook 광고 계정 ID
* 설치 데이터가 있는 Facebook 캠페인 이름
* 날짜 범위
* 날짜 범위에 해당하는 Facebook 대시보드에서 확인되는 설치 수(테이블과 스크린샷 모두 포함)

##### 2. Branch 대시보드에 설치, 재설치 또는 실행 데이터가 표시되지만 Facebook 대시보드에서 확인되는 수치와 다른 경우

여기까지 마쳤다면 Branch와 Facebook의 통합을 효율적으로 활용하실 수 있습니다. 이제 수치상 불일치가 발생하는 이유를 살펴보겠습니다.

(1) 설치를 (2) 캠페인 한 개에 대해서만 비교하세요. Branch의 [광고 분석](https://dashboard.branch.io/ads/analytics){:target="\_blank"} 페이지에서 '필터 추가'를 선택하고 첫 번째 드롭다운에서 '캠페인'을 선택한 다음 두 번째 드롭다운에서 개별 캠페인 이름을 선택하여 캠페인 한 개에 대한 데이터를 확인할 수 있습니다. 즉, 하나의 캠페인을 통해 발생한 설치에 대해 Facebook과 Branch 간에 일치하지 않는 수치를 찾아보세요.

첫째, Facebook과 Branch 간의 어트리뷰션 기간이 일치하는지 확인합니다.

둘째, Facebook과 Branch 간의 시간대가 일치하는지 확인합니다.

과거에 발생한 이벤트에는 어트리뷰션 기간이 적용되지 않습니다. 따라서 클릭부터 설치까지의 어트리뷰션 기간을 Branch에서 30일로 설정하고 클릭에 대한 어트리뷰션 기간을 Facebook에서 7일로 설정한 경우, Branch에 설정한 클릭부터 설치까지의 어트리뷰션 기간을 7일로 변경하면 과거 수치가 자동으로 업데이트되지 않습니다. 대신 Branch에서 변경한 클릭부터 설치까지의 7일 어트리뷰션 기간 동안 신규 설치가 발생할 때까지 기다려야 할 수 있습니다. 다음 날 다시 돌아와서 현재 날짜의 설치 수를 확인할 수 있어야 하며, 이 데이터에는 불일치가 더 적어야 합니다.

이후에도 여전히 불일치가 발생할 경우 제목에 'Facebook MMP + 설치 수 불일치'를 기재하여 [문의](https://support.branch.io/support/tickets/new){:target="\_blank"}해 주세요. 문의 시 다음 정보를 제공해 주세요.

* Branch 앱 ID
* Facebook 광고 계정 ID
* 클릭 및 인스톨이 기록된 Facebook 캠페인 이름
* 날짜 범위
* Facebook 어트리뷰션 윈도우(테이블과 스크린샷 모두 포함)
* 날짜 범위에 해당하는 Facebook 대시보드에서 확인되는 설치 수(테이블과 스크린샷 모두 포함)
* 날짜 범위에 해당하는 Branch 대시보드에서 확인되는 설치 수(테이블과 스크린샷 모두 포함)

!!! note "참고"
	드문 경우지만 광고주 측에서 동일한 이름의 복수의 Facebook 캠페인을 진행하는 경우가 있었습니다. 이 경우 Branch 대시보드는 동일한 이름으로 모든 캠페인에 대한 통계 수치를 합산하여 보여주지만 Facebook 캠페인 ID가 다르므로 해당 데이터는 백엔드에서 별도로 보관됩니다. Branch 대시보드에 이 데이터를 표시하지는 않지만, 캠페인 ID를 기준으로 [Query API](/exports/query-api)를 통해 통계 자료를 가져올 수 있습니다.

##### 3. Branch 대시보드에 전환 이벤트가 표시되지 않는 경우

v2/이벤트를 추적하고 있는지 확인합니다. [v2/이벤트 문서에서 자세한 내용을 확인해 보세요](/apps/v2event/#v2-event).

전환 이벤트를 Facebook에 전송하는 옵션을 사용 중인지 확인합니다.

Facebook 광고를 통해 유입되는 사용자는 전환 이벤트를 완료한 것으로 간주하세요. 예를 들어, 구매를 완료한 사용자의 비율이 낮고 Facebook을 통해 앱을 다운로드하는 사용자의 비율이 낮다면 전자와 후자 간에 중복이 발생하지 않을 수도 있습니다.

이후에도 여전히 불일치가 발생할 경우 제목에 'Facebook MMP + 설치 수 불일치'를 기재하여 [문의](https://support.branch.io/support/tickets/new){:target="\_blank"}해 주세요. 문의 시 다음 정보를 제공해 주세요.

* Branch 앱 ID
* Facebook 광고 계정 ID
* 클릭 및 인스톨이 기록된 Facebook 캠페인 이름
* 날짜 범위
* Facebook 어트리뷰션 윈도우(테이블과 스크린샷 모두 포함)
* 날짜 범위에 해당하는 Facebook 대시보드에서 확인되는 설치 수(테이블과 스크린샷 모두 포함)
* 날짜 범위에 해당하는 Branch 대시보드에서 확인되는 설치 수(테이블과 스크린샷 모두 포함)
* 날짜 범위에 해당하는 Facebook 대시보드에서 확인되는 전환 이벤트 수(테이블과 스크린샷 모두 포함)
* 날짜 범위에 해당하는 Branch 대시보드에서 확인되는 전환 이벤트 수(테이블과 스크린샷 모두 포함)


##### 4. Branch 대시보드 전환 이벤트 데이터가 표시되지만 Facebook 대시보드에서 확인되는 수치와 다른 경우

지금까지 이와 관련해서 발생한 문제는 없었습니다. Branch 대시보드에 설치, 재설치 또는 실행 데이터가 표시되지만 Facebook 대시보드에서 확인되는 수치와 다른 경우 관련하여 트러블슈팅이 필요하신 경우 어떻게 확인하셨는지 등과 같은 자세한 사항과 함께 연락 주십시오.

**IP 화이트리스트 없음**

Branch에는 앱 대신 Facebook에 요청할 API 서버가 대량으로 배포되어 있으므로 [Facebook 고급 설정](https://developers.facebook.com/apps/390736167768543/settings/advanced/)에 IP 화이트리스트를 보유할 수 없으며, 이 통합 작업을 계속 수행하게 됩니다. IP 화이트리스트가 있으면 이 설정에서 IP를 모두 제거하세요.
