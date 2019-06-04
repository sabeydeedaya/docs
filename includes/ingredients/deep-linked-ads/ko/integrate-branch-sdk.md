### SDK 연동 및 앱 내 이벤트 트래킹

iOS와 Android용 Branch SDK를 통해 연동을 시작하고 빠르게 진행할 수 있습니다.

애플리케이션에 Branch SDK를 연동한 적이 없는 경우, 당사 연동 가이드에 따라 Branch SDK를 애플리케이션에 연동하시기 바랍니다.

1. [Android](/apps/android/)용 info 자료

2. [iOS](/apps/ios/)용 info 자료

!!! 경고 "Branch에서의 setDebug 및 데이터 조회 제한"
	SDK를 연동할 때 setDebug를 사용하면 앱이 Branch 서버와의 커뮤니케이션 가능 여부와 딥링크 데이터 수신 여부를 확인하는 데 유용할 수 있습니다. 하지만 Branch의 업스트림 시스템은 setDebug를 통해 전송된 테스트 이벤트를 등록하지 않으므로, 이벤트가 라이브뷰나 분석에 나타나지 않으며 포스트백을 실행하지도 않습니다. 따라서 라이브뷰를 조회하거나 포스트백을 테스트할 때는 setDebug를 비활성화해야 합니다.
