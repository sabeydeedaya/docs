### 어트리뷰션 윈도우 변경

어트리뷰션 윈도우는 글로벌 계정 수준이나 우선 순위를 갖는 링크 수준 윈도우가 있는 각 링크에서 지정할 수 있습니다. 설정 방법은 다음 지침을 info하세요.

고객 경험과 데이터 정확도를 위해 딥링킹 윈도우를 기타 어트리뷰션 윈도우보다 길게 설정하지 않는 것이 좋습니다.

#### 계정 수준 어트리뷰션 윈도우

Link Settings > Attribution Windows에서 어트리뷰션 윈도우를 편집할 수 있습니다.

![image](/_assets/img/pages/dashboard/people-based-attribution/attribution-windows.png)

계정 수준 어트리뷰션 윈도우에 대한 자세한 내용은 [사용자 중심 어트리뷰션](/dashboard/people-based-attribution/#attribution-windows)을 참조하세요.

#### 광고 네트워크 어트리뷰션 윈도우

광고 네트워크에서 어트리뷰션 윈도우를 사용해야 한다면 광고 네트워크 수준에서 어트리뷰션 윈도우를 편집할 수 있습니다. 이 방법은 인스톨에 대해 다른 어트리뷰션 윈도우를 두는 Facebook 및 Google과 같은 네트워크를 사용할 때 권장됩니다. 이렇게 하면 계정별로 설정된 어트리뷰션 윈도우도 유지할 수 있습니다.

![image](/_assets/img/pages/deep-linked-ads/branch-universal-ads/anaw_clear.png)

#### 링크 수준 어트리뷰션 윈도우

어트리뷰션 윈도우를 링크 수준에서 설정하려면 다음의 매개변수를 생성한 Branch 링크에 덧붙일 수 있습니다.

|                       키                       |                                                                                  예시 링크                                                                                   |
|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| $click\_install\_window\_days              | [https://branchster.app.link/hpNVE52gxE?$click\_install\_window\_days=3](https://branchster.app.link/hpNVE52gxE?$click_install_window_days=3)                         |
| $click\_session\_start\_window\_days      | [https://branchster.app.link/hpNVE52gxE?$click\_session\_start\_window\_days=7](https://branchster.app.link/hpNVE52gxE?$click_session_start_window_days=7)           |
| $click\_conversion\_window\_days           | [https://branchster.app.link/hpNVE52gxE?$click\_session\_start\_window\_days=30](https://branchster.app.link/hpNVE52gxE?$click_session_start_window_days=30)         |
| $impression\_install\_window\_days         | [https://branchster.app.link/hpNVE52gxE?$impression\_install\_window\_days=3](https://branchster.app.link/hpNVE52gxE?$impression_install_window_days=3)               |
| $impression\_session\_start\_window\_days | [https://branchster.app.link/hpNVE52gxE?$impression\_session\_start\_window\_days=1](https://branchster.app.link/hpNVE52gxE?$impression_session_start_window_days=1) |
| $impression\_conversion\_window\_days      | [https://branchster.app.link/hpNVE52gxE?$impression\_session\_start\_window\_days=7](https://branchster.app.link/hpNVE52gxE?$impression_session_start_window_days=7) |

!!! info "표준 Branch 링크용 링크 수준 어트리뷰션 지원"
	2017년 7월부로, 표준 Branch 링크의 경우에만 링크 수준 어트리뷰션 윈도우 설정이 가능합니다. Branch 링크 ID 매개변수와 함께 Google의 유니버설 앱 캠페인이나 Play 스토어 링크에서 사용되는 특수 Branch 링크는 현재 지원되지 않습니다.
