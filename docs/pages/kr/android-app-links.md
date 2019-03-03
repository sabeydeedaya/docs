## 개요

Branch 항상 딥링크 링크 관련 기술을 향상시켜오면서 Android App Link 를 고객사가 아주 쉽게 도입할 수 있게 하고 있습니다. Branch 의 Android App Links 는 온전한 attribution(귀속매칭)을 지원하고 Android App Link가 실패한 edge cases 에서 대안을 제공하며 앱 미설치자가 링크 클릭 및 앱 설치후 최초 실행했을 때 지정한 페이지로 딥링크 하는 것도 지원하고 있습니다. Android App Link 는 오직 Android 6+ 에서만 작동합니다. 하지만 Branch 에서 모든 기타 Edge cases 를 지원할 것이기 때문에 근심하실 필요는 없습니다.

## 설정

### Signing certificate fingerprint 를 생성합니다.

앱의 Signing certificate 의 SHA256 fingerprint 를 생성하는 것을 시작으로 합니다.

1. Keystore file 로 이동합니다. 이 파일은 디버그와 프로덕트 버전의 APK 파일을 빌드하는데 사용할 파일입니다.
1. 아래 command 를 실행하여 fingerprint 를 생성합니다. `keytool -list -v -keystore my-release-key.keystore`
1. 아래와 같은 형식의 값을 얻을 수 있을 것입니다. 복사합니다. `14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5`

### Branch Dashboard 에서 App Link 를 활성화합니다.

1. Branch Dashboard 에서 [Link Settings page](https://dashboard.branch.io/link-settings) page 로 이동합니다.
1. Android 섹션에서 **Enable App Links** 체크박스를 체크합니다.
1. 위에서 복사한 fingerprint 값을 **SHA256 Cert Fingerprints** 필드에 붙여넣습니다. ![image](/_assets/img/pages/deep-linking/universal-links/enable_app_links.png)
1. `Save` 를 눌러서 저장합니다.

!!! tip "여러 개의 Fingerprint 를 사용하기"
	테스트를 위해 Debug 와 Production fingerprint 모두를 입력할 수 있습니다. 컴마(,) 로 서로 다른 fingerprint 를 나누어 구분하면 됩니다.

### Intent Filter 를 AndroidManifest 에 추가합니다.

1. Branch Dashboard 에서 [Link Settings page](https://dashboard.branch.io/link-settings) page 로 이동합니다.
1. `Link Domain` 영역으로 스크롤 다운합니다.
1. Domain Name 을 복사합니다. ![image](/_assets/img/pages/deep-linking/universal-links/subdomain-setting.png)
1. Branch Link 가 클릭되었을 때 실행할 `Activity` 를 선택합니다. 이는 일반적으로 다른 `Activity`에서 상속하고 있는 `SplashActivity` 또는 `BaseActivity`입니다. ([SDK 연동 가이드](/apps/android/#configure-app)에서 선택한 것과 동일한 것으로 하는 것이 좋습니다. )
1. `AndroidManifest.xml` 파일에서 위에서 선택한 `Activity` 의 정의영역으로 이동합니다.
1. `Activity` 정의 내에서 아래에서 제공한 intent filter 를 입력합니다. (`xxxx` 가 귀사에서 선택하거나 지정한 subdomain 의 prefix 와 매칭되도록해야 합니다.) 이는 별도의 intent filter 로 나누어 추가해야 합니다.

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="xxxx.app.link" />
    <data android:scheme="https" android:host="xxxx-alternate.app.link" />
    <data android:scheme="https" android:host="xxxx.test-app.link" />
    <data android:scheme="https" android:host="xxxx-alternate.test-app.link" />
</intent-filter>
```

!!! tip "커스텀 도메인 또는 서브 도메인을 사용하기"
	만약 귀사에서 Branch Link 를 위해 [커스텀 도메인 또는 서브 도메인을 사](/dashboard/integrate/#change-link-domain)용하고 있다면 아래 코드도 추가해야 합니다.

	```xml
	<data android:scheme="https" android:host="mycustomdomainorsubdomain" />
	```

### APK SHA256 fingerprint 를 얻어오기

APK 파일에서 다음 코드를 실행합니다. `keytool -printcert -jarfile my_app.apk`
