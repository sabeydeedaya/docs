### 트래킹 링크 매개변수

Branch 트래킹 링크를 통해 광고 캠페인 및 개별 광고의 성과에 대한 다양한 매개변수를 트래킹할 수 있습니다. 심층 분석을 위해 '?' 또는 '&' 문자 뒤에 별도의 매개변수를 링크에 덧붙여 추가적인 정보를 트래킹할 수도 있습니다.

!!! info "추가 매개변수를 포함한 트래킹 링크 예시"
	에이전시 및 하위 퍼블리셔 정보 전송을 위해 추가적인 매개변수를 포함한 Branch 링크 예시:`https://tracking.app.link?%243p=a_partner&~agency=myAgency&~secondary_publisher=best_publisher`

사전 생성된 트래킹 링크에는 다음의 매개변수를 사용할 수 있습니다.

#### 캠페인 정보

|      Branch 매개변수       |     설명      |
|------------------------|-------------|
| ~agency                | 에이전시 이름     |
| ~secondary\_publisher | 하위 퍼블리셔     |
| ~campaign              | 캠페인 이름      |
| ~campaign\_id         | Campaign ID |
| ~channel               | 채널          |
| ~feature               | 기능          |
| ~stage                 | 단계          |
| ~tags                  | 태그          |
| ~creative\_name       | 크리에이티브 이름   |
| ~creative\_id         | 크리에이티브 ID   |
| ~ad\_set\_name       | 광고 세트 이름    |
| ~ad\_set\_id         | 광고 세트 ID    |
| ~ad\_name             | 광고 단위 이름    |
| ~ad\_id               | 광고 단위 ID    |
| ~banner\_dimensions   | 배너 크기       |
| ~placement             | placement   |
| ~keyword\_id          | 키워드 ID      |
| ~keyword\_text        | 키워드 문구      |

#### 기기 정보

| Branch 매개변수 |     설명      |
|-------------|-------------|
| %24aaid     | Google AAID |
| %24idfa     | Apple IDFA  |

#### 지출 측정

!!! info "비용 데이터 활용"
	이러한 매크로를 통해 전달받은 비용 데이터는 내보내기는 가능하지만, Branch 대시보드에서는 조회되지 않습니다.

|   Branch 매개변수    |  설명   |
|------------------|-------|
| ~cost\_model    | 비용 모델 |
| ~cost\_value    | 비용 값  |
| ~cost\_currency | 비용 통화 |
