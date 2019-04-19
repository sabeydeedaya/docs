!!! info "<img src="../../../_assets/img/pages/deep-linked-ads/google/google-ads-logo.png" width="50"/> Google Ads 리소스"
- **Google Ads 개요(현재 페이지)**
- [연동 활성화하기](/deep-linked-ads/google-ads-enable/)
- [유니버설 앱 캠페인(UAC)](/deep-linked-ads/google-ads-uac/)
- [웹 기반 광고(non-UAC)](/deep-linked-ads/google-ads-non-uac/)
- [문제 해결 및 FAQ](/deep-linked-ads/google-ads-troubleshooting/)

##Google Ads + Branch 이용 사례

Branch를 사용하면 **[Google Ads](https://ads.google.com/home/)** 와의 연동을 통해 전환율을 높이고 Branch 대시보드에서 바로 캠페인의 영향을 측정할 수 있습니다.

![이미지](/_assets/img/pages/deep-linked-ads/google/branch-google-ads.png)

Google Ads 캠페인 지원
-----------------

!!! warning " **활성화 필요** "
Branch와 Google Ads를 연동하려면 먼저 Branch 대시보드에서 **[Google Ads 연동을 활성화](/deep-linked-ads/google-ads-enable/)** 해야 합니다.

Branch와 Google Ads를 연동하면 다음이 지원됩니다.

### [유니버설 앱 캠페인(UAC)](/deep-linked-ads/google-ads-uac/)

* 다음에 대한 전체 어트리뷰션:
  * 앱 인스톨만

* 서드 파티 링크 해당 없음
* 딥링킹 해당 없음
* 랜딩 페이지:
  * 앱 스토어만

### [웹 기반 광고(non-UAC)](/deep-linked-ads/google-ads-non-uac/)

* **검색** , **디스플레이** , **쇼핑** 및 **동영상 광고** 캠페인 유형 포함
* 다음에 대한 전체 어트리뷰션:
  * 앱 전환(오픈 및 앱 내 이벤트)
  * 웹(모바일 및 데스크톱) 전환

* Branch 링크를 통한 딥링킹
* 랜딩 페이지:
  * 웹(모바일 및 데스크톱)만
    * [Branch Web SDK](/web/integrate/) 필요

  * 앱(인스톨된 경우)
    * [유니버설 링크](/deep-linking/universal-links/) 및/또는 [앱 링크](/deep-linking/android-app-links/) 필요

Google Ads와 Branch 간 데이터 매핑
---------------------------

Branch는 다음과 같은 Google Ads 데이터 필드를 Branch로 매핑합니다.

|    Google Data    |      Branch Data       |                                       정의                                       |                                                                                      가능한 값                                                                                      |
|-------------------|------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| campaign_id     | ~campaign_id         | 광고 이벤트가 발생한 캠페인의 캠페인 ID(숫자). 이 값은 항상 고유합니다.                                | Google Ads 캠페인 ID                                                                                                                                                               |
| campaign_name   | ~campaign              | 광고 이벤트가 발생한 캠페인의 캠페인 이름(광고주가 지정). 이 값은 고유하지 않을 수 있습니다.                     | Google Ads 캠페인 이름                                                                                                                                                               |
| ad_type         | ~ad_format           | 광고 이벤트가 발생한 광고의 유형. 다음과 같이 다양한 인벤토리 유형을 구별하는 데 사용할 수 있는 값입니다.                  | ClickToDownload AppDeepLink AppDeepLinkContinue 알 수 없음                                                                                                                          |
| network_type    | ~channel               | 이 필드는 광고 이벤트가 발생한 Google Ads 광고 네트워크를 나타냅니다.                                   | Search Display YouTube                                                                                                                                                          |
| network_subtype | ~secondary_publisher | 이 필드는 광고 이벤트가 발생한 Google Ads 광고 네트워크의 '하위 유형'을 나타냅니다. 가능한 값은 네트워크 유형에 따라 다릅니다. | campaign_type = 'UAC', network_type = 'Display'인 경우 'Google Search', 'Search Partners', 'mGDN', 'Google AdMob', 'YouTubeVideos', 'YouTubeSearch', 'VideoPartners' `null` 가능 |
| campaign_type   | ~tags                  | 이 필드는 광고 이벤트가 발생한 캠페인의 캠페인 유형을 나타냅니다.                                          | UAC, UACe,                                                                                                                                                                      |

Search, Display, Video, Shopping
ad_group_id | ~ad_set_id | 광고 이벤트가 발생한 광고 그룹의 ID(숫자). campaign_type이 'UAC'가 아닌 경우에만 제공됩니다. | Google Ads 광고 그룹 ID
creative_id | ~ad_id | 광고 이벤트가 발생한 크리에이티브 광고 단위의 ID(숫자). campaign_type이 'UAC'가 아닌 경우에만 제공됩니다. | Google Ads 크리에이티브 ID

Google Ads로 이벤트 전달
------------------

Branch SDK를 통해 이벤트 트래킹을 시작한 후 Google Ads로 가져올 이벤트를 선택할 수 있습니다. Google Ads의 사전 정의된 이벤트는 아래와 같이 Branch 이벤트로 매핑됩니다. 자세한 내용은 이 [문서](https://developers.google.com/app-conversion-tracking/api/)를 참조하십시오.

Branch는 캠페인 유형에 상관없이 앱 내 이벤트를 Google Ads로 전달하여 캠페인을 최적화합니다. 또한 Branch는 어트리뷰션 데이터를 수신하여 Branch 대시보드에서 충실한 분석을 제공합니다.

|      Google Event       |       Branch Event        |
|-------------------------|---------------------------|
| first_open            | 인스톨                       |
| session_start         | open                      |
| in_app_purchase     | purchase                  |
| view_item_list      | view_items              |
| view_item             | view_item               |
| view_search_results | search                    |
| add_to_cart         | add_to_cart           |
| ecommerce_purchase    | purchase                  |
| custom                  | Branch를 통해 추적된 모든 커스텀 이벤트 |

이러한 이벤트를 추적하는 방법에 관한 자세한 [정보](/apps/v2event/#v2-event)는 이 문서를 참조하십시오.
