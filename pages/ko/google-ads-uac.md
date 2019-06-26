!!! info "<img src="../../../_assets/img/pages/deep-linked-ads/google/google-ads-logo.png" width="50"/> Google Ads 리소스"
- [Google Ads 개요](/deep-linked-ads/google-ads-overview/)
- [연동 활성화](/deep-linked-ads/google-ads-enable/)
- **앱 인스톨 캠페인**  (이 페이지)
- [앱 참여 캠페인](/deep-linked-ads/google-ads-app-engagement/)
- [웹 기반 광고(비 UAC)](/deep-linked-ads/google-ads-non-uac/)
- [문제 해결 및 FAQ](/deep-linked-ads/google-ads-troubleshooting/)

앱 인스톨 캠페인을 사용하면 Google Search, Google Play, YouTube, Gmail, 그 외 디스플레이 네트워크상의 앱 및 모바일 웹사이트 전반에서 앱을 홍보할 수 있습니다.

대부분의 Google Ads 캠페인과 달리 앱 인스톨 캠페인의 개별 광고는 설계할 필요가 없습니다. Google Ads가 앱의 스토어 목록에서 광고 텍스트 아이디어 및 자산을 활용하여 여러 형식 및 네트워크에 걸쳐 다양한 광고를 설계하기 때문입니다.

## 전제 조건

!!! info "앱 인스톨 캠페인 전용"
	Branch의 Google Ads 연동은 Branch 링크를 사용하지 않는 앱 인스톨 캠페인의 링킹 및 어트리뷰션을 지원합니다. 모든 앱 인스톨 캠페인은 사용자를 해당 앱 스토어로 연결하므로 다음을 완료해야 합니다.

* [x]  Branch SDK가 앱과 연동되어 있어야 합니다.
* [x]  iOS의 IDFA 또는 Android의 AAID를 수집합니다. 각 운영 체제에 관한 구체적인 정보는 [iOS](/apps/ios/#install-branch) 및 [Android](/apps/android/#install-branch)의 설정 가이드를 각각 참조하세요.
* [x]  SDK를 통해 모든 필수 이벤트를 트래킹합니다. 지침은 [여기](#forwarding-events-to-google-ads)에서 참조하세요.
* [x]  Google Ads 계정에 대한 관리자 액세스 권한이 있어야 합니다. 이는 Google Ads에서 링크 ID를 생성하는 데 필요합니다.

!!! warning " **활성화 필요** "
	Branch와 Google Ads를 연동하려면 먼저 Branch 대시보드에서 **[Google Ads 연동을 활성화](/deep-linked-ads/google-ads-enable/)** 해야 합니다.

## 앱 인스톨 캠페인 생성

Google Ads의 [앱 인스톨 캠페인 설정](https://support.google.com/google-ads/answer/6291545?co=ADWORDS.IsAWNCustomer%3Dtrue&oco=0) 방법에 관한 문서를 참조하세요.

더 자세한 정보는 [Google Ads 도움말 문서](https://support.google.com/google-ads/answer/6247380?hl=en)를 참조하세요.

{! /ingredients/deep-linked-ads/ko/add-agency-prefix-san-only.md !}

## 라우팅 및 어트리뷰션

앱 인스톨 캠페인은 사용자를 해당 앱 스토어로 직접 연결하기 때문에 캠페인 생성 시 Branch 링크가 필요하지 않습니다. Google Ads는 자동으로 사용자를 앱 스토어로 라우팅하며, 앱 스토어에서 사용자가 앱을 다운로드할 수 있습니다.  앱 내에 Branch SDK가 구현되어 있으면 앱이 오픈될 때 당사가 이러한 앱 다운로드를 측정하며, Google Ads의 전환 API를 통해 Google Ads로부터 직접 전달받는 정보와 당사 SDK를 통해 확보한 데이터를 매칭합니다.

![이미지](/_assets/img/pages/deep-linked-ads/google/google-ads-uac.png)
