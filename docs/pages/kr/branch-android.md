
- ### Branch 설정

    - [Configure your dashboard](/dashboard/integrate/) 내에서 Basic Integration 을 완료합니다.

    - `Always try to open app` 와 `I have an Android App` 이 활성화되도록 합니다.

        ![image](/_assets/img/pages/dashboard/android.png)

- ### Branch 설치

    - Branch SDK 를 `build.gradle` 에 임포팅합니다.

        ```java hl_lines="30 31 33 34 35 36"
        apply plugin: 'com.android.application'

        android {
            compileSdkVersion 25
            buildToolsVersion "25.0.2"
            defaultConfig {
                applicationId "com.eneff.branch.example.android"
                minSdkVersion 16
                targetSdkVersion 25
                versionCode 1
                versionName "1.0"
                testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
            }
            buildTypes {
                release {
                    minifyEnabled false
                    proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
                }
            }
        }

        dependencies {
            implementation fileTree(dir: 'libs', include: ['*.jar'])
            androidTestImplementation ('com.android.support.test.espresso:espresso-core:2.2.2', {
                exclude group: 'com.android.support', module: 'support-annotations'
            })
            implementation 'com.android.support:appcompat-v7:25.2.0'
            implementation 'com.android.support:design:25.2.0'

            // required
            implementation 'io.branch.sdk.android:library:3.+'

            // optional
            implementation 'com.android.support:customtabs:23.3.0' // Chrome Tab matching
            implementation 'com.google.android.gms:play-services-ads:9+' // GAID matching
            implementation 'com.google.android.gms:play-services-appindexing:9.+' // App indexing

            testImplementation 'junit:junit:4.12'
        }
        ```

- ### 앱 설정

    - Branch 를 `AndroidManifest.xml` 파일에 추가합니다.

        ```xml hl_lines="9 17 26 27 28 29 30 31 32 34 35 36 37 38 39 40 44 45 46 47 49 50 51 52 53 54"
        <?xml version="1.0" encoding="utf-8"?>
        <manifest xmlns:android="http://schemas.android.com/apk/res/android"
            package="com.eneff.branch.example.android">

            <uses-permission android:name="android.permission.INTERNET" />

            <application
                android:allowBackup="true"
                android:name="com.eneff.branch.example.android.CustomApplicationClass"
                android:icon="@mipmap/ic_launcher"
                android:label="@string/app_name"
                android:supportsRtl="true"
                android:theme="@style/AppTheme">

                <activity
                    android:name=".MainActivity"
                    android:launchMode="singleTask"
                    android:label="@string/app_name"
                    android:theme="@style/AppTheme.NoActionBar">

                    <intent-filter>
                        <action android:name="android.intent.action.MAIN" />
                        <category android:name="android.intent.category.LAUNCHER" />
                    </intent-filter>

                    <!-- Branch URI Scheme -->
                    <intent-filter>
                        <data android:scheme="androidexample" />
                        <action android:name="android.intent.action.VIEW" />
                        <category android:name="android.intent.category.DEFAULT" />
                        <category android:name="android.intent.category.BROWSABLE" />
                    </intent-filter>

                    <!-- Branch App Links (optional) -->
                    <intent-filter android:autoVerify="true">
                        <action android:name="android.intent.action.VIEW" />
                        <category android:name="android.intent.category.DEFAULT" />
                        <category android:name="android.intent.category.BROWSABLE" />
                        <data android:scheme="https" android:host="example.app.link" />
                        <data android:scheme="https" android:host="example-alternate.app.link" />
                    </intent-filter>
                </activity>

                <!-- Branch init -->
                <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Sw" />
                <meta-data android:name="io.branch.sdk.BranchKey.test" android:value="key_test_hlxrWC5Zx16DkYmWu4AHiimdqugRYMr" />
                <meta-data android:name="io.branch.sdk.TestMode" android:value="false" /> <!-- Set to true to use Branch_Test_Key -->

                <!-- Branch install referrer tracking (optional) -->
                <receiver android:name="io.branch.referral.InstallListener" android:exported="true">
                    <intent-filter>
                        <action android:name="com.android.vending.INSTALL_REFERRER" />
                    </intent-filter>
                </receiver>

            </application>

        </manifest>
        ```

    - 아래 값들을 Branch Dashboard 의 [App settings](https://dashboard.branch.io/account-settings/app) 와 [Link settings](https://dashboard.branch.io/link-settings) 로부터 얻은 실제 값으로 대체합니다.
        - `androidexample`
        - `example.app.link`
        - `example-alternate.app.link`
        - `key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Sw`
        - `key_test_hlxrWC5Zx16DkYmWu4AHiimdqugRYMr`

    !!! warning "Single Task launch mode required"
        만약 아직 시스템에 Single task Activity 인스턴스가 없다면 새로 생성하고 동일 Task 의 stack 의 최상위에 위치시킵니다. 만약 Single Task 모드를 사용하고 있다면 앱 전체를 다시 시작하지 말아야 합니다. Single Task 모드는 오직 Main/Splash Activity 가 Actiivty Stack에 존재하지 않을 때만 인스턴스화합니다. 만약 Activity가 백그라운드에서 존재하고 있다면 해당 Activity를 향한 Intent가 있을 때마다 이는 다시 포그라운드로 돌아옵니다. Single Task 모드에 관한 더 상세한 내용은 본 [링크]https://developer.android.com/guide/components/activities/tasks-and-back-stack.html#TaskLaunchModes)를 참고하시기 바랍니다.

- ### Branch SDK 초기화

    - Branch 를 `MainActivity.java` 에 추가합니다.

    - *Java*

        ```java hl_lines="3 9 14 16 17 31 32 33 34 35 36 37 38 39 40 41 44 45 46 47"
        package com.eneff.branch.example.android;

        import android.content.Intent;
        import android.os.Bundle;
        import android.support.design.widget.FloatingActionButton;
        import android.support.design.widget.Snackbar;
        import android.support.v7.app.AppCompatActivity;
        import android.support.v7.widget.Toolbar;
        import android.util.Log;
        import android.view.View;
        import android.view.Menu;
        import android.view.MenuItem;

        import org.json.JSONObject;

        import io.branch.referral.Branch;
        import io.branch.referral.BranchError;

        public class MainActivity extends AppCompatActivity {

            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.activity_main);
            }

            @Override
            public void onStart() {
                super.onStart();

                // Branch init
                Branch.getInstance().initSession(new Branch.BranchReferralInitListener() {
                    @Override
                    public void onInitFinished(JSONObject referringParams, BranchError error) {
                        if (error == null) {
                            Log.i("BRANCH SDK", referringParams.toString());
                        } else {
                            Log.i("BRANCH SDK", error.getMessage());
                        }
                    }
                }, this.getIntent().getData(), this);
            }

            @Override
            public void onNewIntent(Intent intent) {
                this.setIntent(intent);
            }
        }
        ```

    - *Kotlin*

        ```java hl_lines="3 9 14 16 17 29 30 31 32 33 34 35 36 37 38 41 42 43"
        package com.eneff.branch.example.android

        import android.content.Intent
        import android.os.Bundle
        import android.support.design.widget.FloatingActionButton
        import android.support.design.widget.Snackbar
        import android.support.v7.app.AppCompatActivity
        import android.support.v7.widget.Toolbar
        import android.util.Log
        import android.view.View
        import android.view.Menu
        import android.view.MenuItem

        import org.json.JSONObject

        import io.branch.referral.Branch
        import io.branch.referral.BranchError

        class MainActivity : AppCompatActivity() {

            override fun onCreate(savedInstanceState: Bundle?) {
                super.onCreate(savedInstanceState)
                setContentView(R.layout.activity_main)
            }

            override fun onStart() {
                super.onStart()

                // Branch init
                Branch.getInstance().initSession(object : BranchReferralInitListener {
                    override fun onInitFinished(referringParams: JSONObject, error: BranchError?) {
                        if (error == null) {
                            Log.e("BRANCH SDK", referringParams.toString)
                        } else {
                            Log.e("BRANCH SDK", error.message)
                        }
                    }
                }, this.intent.data, this)
            }

            public override fun onNewIntent(intent: Intent) {
                this.intent = intent
            }
        }
        ```

    !!! warning "오직 Launcher Activity 에서 Branch를 초기화합니다."
        앱은 Launcher Activity 를 통해 실행될 것이고 그곳에서 Branch 가 초기화되고 클릭된 링크에 포함된 딥링크 데이터를 가져올 것입니다.

    !!! warning "항상 `onStart()` 에서 Branch 를 초기화합니다."
        Branch 를 다른 Android 라이프사이클에서 초기화(예. `onResume()`하면 의도치 않은 액션이 발생할 수 있습니다. `onStart()` 는 Activity 가 사용자에게 보이게 하고 앱이 Activity 를 포그라운드에 진입시키도록 준비하는 단계입니다. 상세한 정보는 본 [링크](https://developer.android.com/guide/components/activities/activity-lifecycle.html)를 참고하시기 바랍니다.

- ### Branch 로딩

    - Branch 를 `CustomApplicationClass.java` 에 추가합니다.

    - *Java*

        ```java hl_lines="4 11 12 14 15"
        package com.eneff.branch.example.android;

        import android.app.Application;
        import io.branch.referral.Branch;

        public class CustomApplicationClass extends Application {
            @Override
            public void onCreate() {
                super.onCreate();

                // Branch logging for debugging
                Branch.enableLogging();

                // Branch object initialization
                Branch.getAutoInstance(this);
            }
        }
        ```

    - *Kotlin*

        ```java hl_lines="4 10 11 13 14"
        package com.eneff.branch.example.android

        import android.app.Application
        import io.branch.referral.Branch

        class CustomApplicationClass : Application() {
            override fun onCreate() {
                super.onCreate()

                // Branch logging for debugging
                Branch.enableLogging()

                // Branch object initialization
                Branch.getAutoInstance(this)
            }
        }
        ```

- ### 딥링크 테스트

    - [Branch Dashboard](https://dashboard.branch.io/marketing) 로부터 딥링크 생성합니다.

    - 앱을 디바이스에서 삭제합니다.

		- 앱을 컴파일하여 디바이스에 설치합니다.

		- 딥링크를 `Google Hangouts` 에 복사합니다.

		- 딥링크를 클릭하여 앱을 실행합니다.

    !!! tip "디퍼드 딥링킹 테스트(Deferred Deep Linking)"
    	디퍼드 딥링킹은 디바이스에 설처되지 않은 앱으로 딥링킹하는 간편한 방법입니다. 앱이 설치되면 사용자의 최초 앱 실행 때 클릭한 Branch Link 로부터 딥링크 데이터를 얻을 수 있습니다. 이것을 테스트하려면 앱을 디바이스에서 제거하고 Branch Link 를 클릭해야 하며 AndroidStudio 를 통해 앱을 수동으로 설치합니다. 정확히 구현되었다면 앱을 실행할 때 앱 내에서 정확한 컨텐츠로 라우팅 될 것입니다.

## 기능구현

- ### Content reference 생성

    - `Branch Universal Object` 는 공유하고자는 컨텐츠를 포장할 수 있습니다.

    - [Universal Object Properties](#/links/integrate/#universal-object) 를 사용합니다.

    - *Java*

        ```java
        BranchUniversalObject buo = new BranchUniversalObject()
            .setCanonicalIdentifier("content/12345")
            .setTitle("My Content Title")
            .setContentDescription("My Content Description")
            .setContentImageUrl("https://lorempixel.com/400/400")
            .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
            .setLocalIndexMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
            .setContentMetadata(new ContentMetadata().addCustomMetadata("key1", "value1"));
        ```

    - *Kotlin*

        ```java
        val buo = BranchUniversalObject()
            .setCanonicalIdentifier("content/12345")
            .setTitle("My Content Title")
            .setContentDescription("My Content Description")
            .setContentImageUrl("https://lorempixel.com/400/400")
            .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
            .setLocalIndexMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
            .setContentMetadata(ContentMetadata().addCustomMetadata("key1", "value1"))
        ```

- ### 딥링크 생성

    - 캡슐화된 데이터로 딥링크를 생성합니다.

    - [Branch Universal Object](#create-content-reference) 가 필요합니다.

    - [Deep Link Properties](/links/integrate/) 를 사용합니다. (딥링크에 추가될 데이터)

    - [Branch Dashboard](https://dashboard.branch.io/liveview/links) 와 검증합니다.

    - *Java*

        ```java
        LinkProperties lp = new LinkProperties()
            .setChannel("facebook")
            .setFeature("sharing")
            .setCampaign("content 123 launch")
            .setStage("new user")
            .addControlParameter("$desktop_url", "http://example.com/home")
            .addControlParameter("custom", "data")
            .addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()));

        buo.generateShortUrl(this, lp, new Branch.BranchLinkCreateListener() {
            @Override
            public void onLinkCreate(String url, BranchError error) {
                if (error == null) {
                    Log.i("BRANCH SDK", "got my Branch link to share: " + url);
                }
            }
        });
        ```

    - *Kotlin*

        ```java
        val lp = LinkProperties()
            .setChannel("facebook")
            .setFeature("sharing")
            .setCampaign("content 123 launch")
            .setStage("new user")
            .addControlParameter("$desktop_url", "http://example.com/home")
            .addControlParameter("custom", "data")
            .addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()))

        buo.generateShortUrl(this, lp, BranchLinkCreateListener { url, error ->
            if (error == null) {
                Log.i("BRANCH SDK", "got my Branch link to share: " + url)
            }
        })
        ```

- ### 딥링크 공유

    - Branch Deep Link 를 생성하고 사용자가 선택한 채널로 태깅합니다.

    - [Branch Universal Object](#create-content-reference) 가 필요합니다.

    - [Deep Link Properties](/links/integrate/) 를 사용합니다.

    - *Java*

        ```java
        LinkProperties lp = new LinkProperties()
            .setChannel("facebook")
            .setFeature("sharing")
            .setCampaign("content 123 launch")
            .setStage("new user")
            .addControlParameter("$desktop_url", "http://example.com/home")
            .addControlParameter("custom", "data")
            .addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()));

        ShareSheetStyle ss = new ShareSheetStyle(MainActivity.this, "Check this out!", "This stuff is awesome: ")
            .setCopyUrlStyle(ContextCompat.getDrawable(this, android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
            .setMoreOptionStyle(ContextCompat.getDrawable(this, android.R.drawable.ic_menu_search), "Show more")
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL)
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.MESSAGE)
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.HANGOUT)
            .setAsFullWidthStyle(true)
            .setSharingTitle("Share With");

        buo.showShareSheet(this, lp,  ss,  new Branch.BranchLinkShareListener() {
            @Override
            public void onShareLinkDialogLaunched() {
            }
            @Override
            public void onShareLinkDialogDismissed() {
            }
            @Override
            public void onLinkShareResponse(String sharedLink, String sharedChannel, BranchError error) {
            }
            @Override
            public void onChannelSelected(String channelName) {
            }
        });
        ```

    - *Kotlin*

        ```java
        var lp = LinkProperties()
            .setChannel("facebook")
            .setFeature("sharing")
            .setCampaign("content 123 launch")
            .setStage("new user")
            .addControlParameter("$desktop_url", "http://example.com/home")
            .addControlParameter("custom", "data")
            .addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()))

        val ss = ShareSheetStyle(this@MainActivity, "Check this out!", "This stuff is awesome: ")
            .setCopyUrlStyle(resources.getDrawable(this, android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
            .setMoreOptionStyle(resources.getDrawable(this, android.R.drawable.ic_menu_search), "Show more")
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL)
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.MESSAGE)
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.HANGOUT)
            .setAsFullWidthStyle(true)
            .setSharingTitle("Share With")

        buo.showShareSheet(this, lp, ss, object : Branch.BranchLinkShareListener {
            override fun onShareLinkDialogLaunched() {}
            override fun onShareLinkDialogDismissed() {}
            override fun onLinkShareResponse(sharedLink: String, sharedChannel: String, error: BranchError) {}
            override fun onChannelSelected(channelName: String) {}
        })
        ```

- ### 딥링크 읽어오기

    - 딥링크로부터 Branch 데이터를 가져옵니다.

    - `Listener` 로부터 데이터를 전달 받을 때의 Best Practice 는 Race Condition 을 피하는 것입니다.

    - [Deep link properties](/links/integrate/#read-deep-links) 를 반환합니다.

    - *Java*

        ```java
        // listener (within Main Activity's onStart)
        Branch.getInstance().initSession(new Branch.BranchReferralInitListener() {
            @Override
            public void onInitFinished(JSONObject referringParams, BranchError error) {
                if (error == null) {
                    Log.i("BRANCH SDK", referringParams.toString());
                } else {
                    Log.i("BRANCH SDK", error.getMessage());
                }
            }
        }, this.getIntent().getData(), this);

        // latest
        JSONObject sessionParams = Branch.getInstance().getLatestReferringParams();

        // first
        JSONObject installParams = Branch.getInstance().getFirstReferringParams();
        ```

    - *Kotlin*

        ```java
        // listener (within Main Activity's onStart)
        Branch.getInstance().initSession(object : BranchReferralInitListener {
            override fun onInitFinished(referringParams: JSONObject, error: BranchError?) {
                if (error == null) {
                    Log.e("BRANCH SDK", referringParams.toString)
                } else {
                    Log.e("BRANCH SDK", error.message)
                }
            }
        }, this.intent.data, this)

        // latest
        val sessionParams = Branch.getInstance().latestReferringParams

        // first
        val installParams = Branch.getInstance().firstReferringParams
        ```

- ### 컨텐츠로 이동

    - Branch.initSession() 내에서 Branch Deep Link 데이터를 받아와서 해당 컨텐츠로 이동하는 작업을 진행할 수 있습니다.

    - *Java*

        ```java
        // listener (within Main Activity's onStart)
        Branch.getInstance().initSession(new Branch.BranchReferralInitListener() {
            @Override
            public void onInitFinished(JSONObject referringParams, BranchError error) {
                if (error == null) {
                    // option 1: log data
                    Log.i("BRANCH SDK", referringParams.toString());

                    // option 2: save data to be used later
                    SharedPreferences preferences = .getSharedPreferences("MyPreferences", Context.MODE_PRIVATE);
                    SharedPreferences.Editor editor = preferences.edit();
                    editor.putString("branchData", referringParams.toString(2));
                    editor.commit();

                    // option 3: navigate to page
                    Intent intent = new Intent(MainActivity.this, OtherActivity.class);
                    intent.putExtra("branchData", referringParams.toString(2));
                    startActivity(intent);

                    // option 4: display data
                    Toast.makeText(this, referringParams.toString(2), Toast.LENGTH_LONG).show();
                } else {
                    Log.i("BRANCH SDK", error.getMessage());
                }
            }
        }, this.getIntent().getData(), this);
        ```

    - *Kotlin*

        ```java
        // listener (within Main Activity's onStart)
        Branch.getInstance().initSession(object : BranchReferralInitListener {
            override fun onInitFinished(referringParams: JSONObject, error: BranchError?) {
                if (error == null) {
                    // option 1: log data
                    Log.i("BRANCH SDK", referringParams.toString())

                    // option 2: save data to be used later
                    val preferences =  getSharedPreferences("MyPreferences", Context.MODE_PRIVATE)
                    val editor = preferences.edit()
                    editor.putString("branchData", referringParams.toString(2))
                    editor.commit()

                    // option 3: navigate to page
                    val intent = Intent(this, MainActivity2::class.java)
                    intent.putExtra("branchData", referringParams.toString(2))
                    startActivity(intent)

                    // option 4: display data
                    Toast.makeText(this, referringParams.toString(2), Toast.LENGTH_SHORT).show()
                } else {
                    Log.e("BRANCH SDK", error.message)
                }
            }
        }, this.intent.data, this)
        ```

- ### 컨텐츠 디스플레이

    - `App Indexing` 을 통해 컨텐츠를 구글 검색에 리스팅합니다.

    - [Branch Dashboard](#https://dashboard.branch.io/search) 에서 App Indexing 을 활성화 합니다.

    - [App indexing validator](https://branch.io/resources/app-indexing/) 를 이용하여 검증합니다.

    - [Branch Universal Object](#create-content-reference) 가 필요합니다.

    - `build.gradle` 라이브러리가 필요합니다.

        ```java
        compile 'com.google.android.gms:play-services-appindexing:9.+'
        ```

    - *Java*

        ```java
        buo.listOnGoogleSearch(this);
        ```

    - *Kotlin*

        ```java
        buo.listOnGoogleSearch(this)
        ```


- ### 컨텐츠 트래킹

    - 어떤 컨텐츠가 몇번 보여졌는지를 트래킹합니다.

    - [Branch Universal Object](#create-content-reference) 가 필요합니다.

    - [Track content properties](#track-content-properties) 를 사용합니다.

    - [Branch Dashboard](https://dashboard.branch.io/liveview/content) 와 인증합니다.

    - *Java*

        ```java
        new BranchEvent(BRANCH_STANDARD_EVENT.VIEW_ITEM).addContentItems(buo).logEvent(context);
        ```

    - *Kotlin*

        ```java
        BranchEvent(BRANCH_STANDARD_EVENT.VIEW_ITEM).addContentItems(buo).logEvent(context)
        ```

- ### 사용자 트래킹(사용자 아이디 설정)

    - 이벤트, 딥링크, 추천(Referrals) 를 위해 사용자 식별자(이메일, 아이디, UUID 등)을 설정합니다.

    - 사용자 아이디는 `127` 캐릭터를 초과할 수 없습니다.

    - [Branch Dashboard](https://dashboard.branch.io/liveview/identities) 와 검증합니다.

    - *Java*

        ```java
        // login
        Branch.getInstance().setIdentity("your_user_id");

        // logout
        Branch.getInstance().logout();
        ```

    - *Kotlin*

        ```java
        // login
        Branch.getInstance().setIdentity("your_user_id")

        // logout
        Branch.getInstance().logout()
        ```

- ### 이벤트 트래킹
    - 커스텀 이벤트 하나를 등록합니다.

		- `open`, `install`, `referred session` 은 Branch 에서 사용하고 있는 이벤트명이므로 사용하실 수 없습니다.

		- 이벤트명은 최대 `63` 캐릭터를 초과할 수 없습니다.

		- 사용자의 커스텀 이벤트를 트래킹하기 전에 해당 사용자의 식별자를 먼저 설정하는 것이 좋습니다.

    - [Branch Dashboard](https://dashboard.branch.io/liveview/events) 와 검증합니다.


    {! ingredients/sdk/v2-events.md !}


- ### 추천(Referrals) 핸들링

    - Referral 포인트는 [Branch Dashboard](https://dashboard.branch.io/referrals/rules) 에 설정한 Rule 에 의해 얻어집니다.

    - [Branch Dashboard](https://dashboard.branch.io/referrals/analytics) 와 검증합니다.

    - Reward credits

        -  [Referral guide](/dashboard/analytics/#referrals)

    - Credits 보상

        - *Java*

            ```java
            Branch.getInstance().redeemRewards(5);
            ```

        - *Kotlin*

            ```java
            Branch.getInstance().redeemRewards(5)
            ```

    - Credits 로딩

        - *Java*

            ```java
            Branch.getInstance().loadRewards(new BranchReferralStateChangedListener() {
                @Override
                public void onStateChanged(boolean changed, Branch.BranchError error) {
                    int credits = branch.getCredits();
                }
            });
            ```

        - *Kotlin*

            ```java
            Branch.getInstance().loadRewards { changed, error ->
                if (error != null) {
                    Log.i("BRANCH SDK", "branch load rewards failed. Caused by -" + error.message)
                } else {
                    Log.i("BRANCH SDK", "changed = " + changed)
                    Log.i("BRANCH SDK", "rewards = " + branch.credits)
                }
            }
            ```

    - 과거 이력 로딩

        - *Java*

            ```java
            Branch.getInstance().getCreditHistory(new BranchListResponseListener() {
                public void onReceivingResponse(JSONArray list, Branch.BranchError error) {
                    if (error != null) {
                        Log.i("BRANCH SDK", "branch load rewards failed. Caused by -" + error.message)
                    } else {
                        Log.i("BRANCH SDK", list);
                    }
                }
            });
            ```

        - *Kotlin*

            ```java
            Branch.getInstance().getCreditHistory { history, error ->
                if (error != null) {
                    Log.i("BRANCH SDK", "branch load credit history failed. Caused by -" + error.message)
                } else {
                    if (history.length() > 0) {
                        Log.i("BRANCH SDK", history.toString(2))
                    } else {
                        Log.i("BRANCH SDK", "no history found")
                    }
                }
            }
            ```

- ### 푸시 알림 핸들링

    - Branch Link 를 푸시의 result intent 에 추가하는 방법을 통해 푸시 알림을 통한 컨텐츠 딥링킹이 가능합니다.

    - *Java*

        ```java
        Intent resultIntent = new Intent(this, TargetClass.class);
        intent.putExtra("branch","http://xxxx.app.link/testlink");
        intent.putExtra("branch_force_new_session",true);
        PendingIntent resultPendingIntent =  PendingIntent.getActivity(this, 0, resultIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        ```

    - *Kotlin*

        ```java
        val resultIntent = Intent(this, TargetClass::class.java)
        intent.putExtra("branch", "http://xxxx.app.link/testlink")
        val resultPendingIntent = PendingIntent.getActivity(this, 0, resultIntent, PendingIntent.FLAG_UPDATE_CURRENT)
        intent.putExtra("branch_force_new_session", true)
        ```

- ### 앱 내 다른 화면으로 딥링크

    - Chrome Intent 를 통해 귀사의 앱 내의 한 컨텐츠에서 다른 컨텐츠로 딥링크할 수 있습니다. (귀사 앱->귀사 앱)

    - *Java*

        ```java
        Intent intent = new Intent(this, ActivityToLaunch.class);
        intent.putExtra("branch","http://xxxx.app.link/testlink");
        intent.putExtra("branch_force_new_session",true);
        startActivity(intent);
        ```

    - *Kotlin*

        ```java
        val intent = Intent(this, ActivityToLaunch::class.java)
        intent.putExtra("branch", "http://xxxx.app.link/testlink")
        intent.putExtra("branch_force_new_session", true)
        startActivity(intent)
        ```

    - `"http://xxxx.app.link/testlink"` 를 귀사의 Branch Link URL 로 대체합니다.

!!! warning
    앱 내에서 새로운 딥링킹을 핸들링 했을 때 앱은 현재 세션 데이터를 모두 지울 것이고 새로운 Referred open으로 귀속될 것입니다.

- ### 100% 매칭 활성화

    - `Chrome Tabs` 를 이용하여 Attribution(귀속매칭)의 성공율을 향상시킵니다.

    - `compile ‘com.android.support:customtabs:23.3.0’` 을 `build.gradle` 에 추가합니다.

- ### 사용자 트래킹을 활성화/비활성화

    - I만약 귀사에서 GDPR 준수목적에 의해 사용자가 트래킹 금지요청을 처리하거나 기타 규정 또는 목적에 의해 사용자를 트래킹하려면 본 필드를 이용하여 Branch 가 네트워크 요청을더 이상 보내는 않도록 설정할 수 있습니다. 본 세팅은 특정 링크를 위한 모든 사용자 또는 귀사의 모든 Branch Links 에 활성화할 수 있습니다.

    ```java
    Branch.getInstance().disableTracking(true);
    ```

    - 귀사는 본 함수를 앱의 라이프사이클을 통해 호출하도록 선택할 수 있습니다. 호출되는 동시에 더 이상 Branch 를 통해 전송되는 네트워크 요청은 없을 것입니다. 링크 설정은 여전히 작동하지만 사용자 식별정보가 포함되지 않습니다. 추가로 딥링킹은 여전히 작동하지만 분석을 위한 정보가 트래킹되지 않습니다.


## Troubleshoot issues

- ### 로깅 활성화

    - *Java*

        ```java
        Branch.enableLogging();
        ```

- ### Branch 연동 테스트

    - MainActivity 의 onStart() 메서드 내에서 IntegraionValidator.validate 메서드를 호출하여 Branch 연동을 테스트할 수 있습니다. ADB Logcat 을 체크하면서 모든 SDK 연동 테스트가 통과했는지 확인합니다. Product 빌드에서는 IntegrationValidator.validate 를 반드시 코멘트 처리 또는 제거해야 합니다.

    - *Java*

        ```java
        IntegrationValidator.validate(MainActivity.this);
        ```


- ### 샘플 테스트 앱

    - [Branchsters](https://github.com/BranchMetrics/Branch-Example-Deep-Linking-Branchster-Android)

    - [Testbed](https://github.com/BranchMetrics/android-branch-deep-linking/tree/master/Branch-SDK-TestBed)

- ### Install 시뮬레이트

    - 디바이스의 Hardware ID 를 피해야 합니다

        - `AndroidManifest.xml` 에서 다음 항목을 `true` 로 설정합니다.

            ```xml
            <meta-data android:name="io.branch.sdk.TestMode" android:value="true" />
            ```
        - 또는 `Branch.enableTestMode();` 를 `Branch.getInstance().initSession()` 이전에 추가해야 합니다.

        - `Test Mode` 를 제품 또는 Google Play 버전에 사용하지 말아야 합니다.

    - 앱을 디바이스에서 제거합니다.

    - 임의의 Branch Link 를 클릭합니다. (앱이 설치되지 않았기 때문에 fallback URL로 이동될 것입니다.)

    - 앱을 재설치합니다.

    - `Branch.getInstance().initSession` 을 얻어오고 `+is_first_session=true` 인지 확인합니다.

- ### Track content properties

    - 컨텐츠 트래킹에 사용됩니다.

        | Key | Value
        | --- | ---
        | BNCRegisterViewEvent | 사용자가 오브젝트를 봤음
        | BNCAddToWishlistEvent | 사용자가 오브젝트를 Wishlist 에 추가함
        | BNCAddToCartEvent | 사용자가 오브젝트를 장바구니에 추가함
        | BNCPurchaseInitiatedEvent | 사용자가 체크아웃을 시작함
        | BNCPurchasedEvent | 사용자가 해당 아이템을 구매함
        | BNCShareInitiatedEvent | 사용자가 해당 오브젝트 공유 시작함
        | BNCShareCompletedEvent | 사용자가 공유를 완료했음

- ### bnc.lt 또는 커스텀 링크 도메인을 사용

    - *bnc.lt 링크 도메인*

        ```xml
        <activity android:name="com.yourapp.your_activity">
            <!-- App Link your activity to Branch links-->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                 <data android:scheme="https" android:host="bnc.lt" />
                 <data android:scheme="https" android:host="bnc.lt" />
            </intent-filter>
        </activity>
        ```

    - *커스텀 링크 도메인*

        ```xml
        <activity android:name="com.yourapp.your_activity">
            <!-- App Link your activity to Branch links-->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                 <data android:scheme="https" android:host="your.app.com" />
                 <data android:scheme="https" android:host="your.app.com" />
            </intent-filter>
        </activity>
        ```

    - 아래 값을 [Branch Dashboard](https://dashboard.branch.io/settings/link) 에 설정한 것과 동일한 값으로 대체합니다.

        - `your.app.com`

 - ### Branch 와 Fabric Answers
`
    - 만약 `answers-shim` 을 임포팅하고 싶지 않다면 다음과 같이 처리합니다.

        ```
        compile ('io.branch.sdk.android:library:2.+') {
          exclude module: 'answers-shim'
        }
        ```

- ### 딥링크 라우팅

    - 특정 URI Scheme Path 를 로딩합니다. 예를 들면 다음과 같습니다.
        - `$deeplink_path="content/123"`
        - `$android_deeplink_path="content/123"`

    - 컨텐츠로 이동([Navigate to content](#navigate-to-content)) 로 대체할 것을 추천합니다.

        ```xml
        <meta-data android:name="io.branch.sdk.auto_link_path" android:value="content/123/, another/path/, another/path/*" />
        ```

- ### 앱에서 딥링크 라우팅

    - 앱 내에서 HTML 을 보여줄 때는 일반적으로 `WebView` 와 `ChromeTab` 을 사용합니다.

    - 다른 컨텐츠는 외부 라우팅이 가능한 것에 반하여 `WebView` 에 있는  Branch Link 는 귀사 앱 내에서 라우팅 됩니다.

    - `WebView` 에서 Branch Deep Link 를 실행시키는 방법은 다음과 같습니다.

        - *Java*

            ```java
            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.activity_main);
                WebView webView = (WebView) findViewById(R.id.webView);
                webView.setWebViewClient(new BranchWebViewController(YOUR_DOMAIN, MainActivity.class)); //YOUR_DOMAIN example: appname.app.link
                webView.loadUrl(URL_TO_LOAD);
            }

            public class BranchWebViewController extends WebViewClient {

                private String myDomain_;
                private Class activityToLaunch_;

                BranchWebViewController(@NonNull String myDomain, Class activityToLaunch) {
                    myDomain_ = myDomain;
                    activityToLaunch_ = activityToLaunch;
                }

                @Override
                public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                    String url = request.getUrl().toString();

                    if (url.contains(myDomain_)) {
                        Intent i = new Intent(view.getContext(), activityToLaunch_);
                        i.putExtra("branch", url);
                        i.putExtra("branch_force_new_session", true);
                        startActivity(i);
                        //finish(); if launching same activity
                    } else {
                        view.loadUrl(url);
                    }

                    return true;
                }
            }
            ```

        - *Kotlin*

            ```java
            override fun onCreate(savedInstanceState: Bundle?) {
                super.onCreate(savedInstanceState)
                setContentView(R.layout.activity_main)
                val webView = findViewById(R.id.webView) as WebView
                webView!!.webViewClient = BranchWebViewController("appname.app.link", MainActivity2::class.java)
                webView!!.loadUrl(URL_TO_LOAD)
            }

            inner class BranchWebViewController internal constructor(private val myDomain_: String, private val activityToLaunch_: Class<*>) : WebViewClient() {

                override fun onLoadResource(view: WebView, url: String) {
                    super.onLoadResource(view, url)
                }

                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                    val url = request.url.toString()

                    if (url.contains(myDomain_)) {
                        val i = Intent(view.context, activityToLaunch_)
                        i.putExtra("branch", url)
                        i.putExtra("branch_force_new_session", true)
                  //finish(); if launching same activity
                        startActivity(i)
                    } else {
                        view.loadUrl(url)
                    }

                    return true
                }
            }
            ```

    - `Chrome Tab` 에서 딥링크 구동

        - *Java*

            ```java
            CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
            CustomTabsIntent customTabsIntent = builder.build();
            customTabsIntent.intent.putExtra("branch", BRANCH_LINK_TO_LOAD);
            customTabsIntent.intent.putExtra("branch_force_new_session", true);
            customTabsIntent.launchUrl(MainActivity.this, Uri.parse(BRANCH_LINK_TO_LOAD));
            //finish(); if launching same activity
            ```

        - *Kotlin*

            ```java
            val builder = CustomTabsIntent.Builder()
            val customTabsIntent = builder.build()
            customTabsIntent.intent.putExtra("branch", BRANCH_LINK_TO_LOAD)
            customTabsIntent.intent.putExtra("branch_force_new_session", true)
            customTabsIntent.launchUrl(this@MainActivity2, Uri.parse(BRANCH_LINK_TO_LOAD))
            //finish() if launching same activity
            ```

- ### 딥링크 Activity 완료

    - 딥링크 Activity 가 끝날 때 알림을 받습니다.

        ```xml
        <meta-data android:name="io.branch.sdk.auto_link_request_code" android:value="@integer/AutoDeeplinkRequestCode" />
        ```

    - *Java*

        ```java
        @Override
        protected void onActivityResult(int requestCode, int resultCode, Intent data) {
            super.onActivityResult(requestCode, resultCode, data);

            // Checking if the previous activity is launched on branch Auto deep link.
            if(requestCode == getResources().getInteger(R.integer.AutoDeeplinkRequestCode)){
                //Decide here where  to navigate  when an auto deep linked activity finishes.
                //For e.g. Go to HomeActivity or a  SignUp Activity.
                Intent i = new Intent(getApplicationContext(), CreditHistoryActivity.class);
                startActivity(i);
            }
        }
        ```

    - *Kotlin*

        ```java
        override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
            super.onActivityResult(requestCode, resultCode, data)

            // Checking if the previous activity is launched on branch Auto deep link.
            if (requestCode == resources.getInteger(R.integer.AutoDeeplinkRequestCode)) {
                //Decide here where  to navigate  when an auto deep linked activity finishes.
                //For e.g. Go to HomeActivity or a  SignUp Activity.
                val i = Intent(applicationContext, CreditHistoryActivity::class.java)
                startActivity(i)
            }
        }
        ```

- ### Branch Link 의 딥링크 라우팅 테스트

    테스트하고자는 Branch Link에 `?bnc_validate=true` 을 추가한다음 모바일 디바이스(시뮬레이터가 아님)에서 클릭하여 테스트를 시작합니다. 예를 들면 `"https://<yourapp\>.app.link/NdJ6nFzRbK"` 을 검증하기 위해 `"https://<yourapp\>.app.link/NdJ6nFzRbK?bnc_validate=true"`를 클릭합니다.


- ### Pre Android 15 서포트

    - `Branch SDK 1.14.5` 를 사용합니다.

    - `onStart()` 와 `onStop()` 에 다음과 같이 코드를 삽입합니다.

    - *Java*

        ```java
        @Override
        protected void onStart() {
            super.onStart();
            Branch.getInstance(getApplicationContext()).initSession();
        }

        @Override
        protected void onStop() {
            super.onStop();
            branch.closeSession();
        }
        ```

    - *Kotlin*

        ```java
        override fun onStart() {
            super.onStart()
            Branch.getInstance().initSession()
        }

        override fun onStop() {
            super.onStop()
            Branch.getInstance().closeSession()
        }
        ```

- ### 디폴트 Application 클래스의 사용

    - 만약 귀사의 앱에 Application 클래스가 구현되어 있지 않다면 다음과 `AndroidManifest.xml` 에 다음과 같은 코드를 삽입합니다.

        ```xml
        <application android:name="io.branch.referral.BranchApp">
        ```

- ### 커스텀 Install Referrer 클래스
`
    - Google 에서는 앱당 하나의 `BroadcastReceiver` 만 허락합니다.

    - 다음 코드를 `AndroidManifest.xml` 파일에 추가합니다.

        ```xml
        <receiver android:name="com.BRANCH SDK.CustomInstallListener" android:exported="true">
          <intent-filter>
            <action android:name="com.android.vending.INSTALL_REFERRER" />
          </intent-filter>
        </receiver>
        ```

    - `onReceive()` 에서 `io.branch.referral.InstallListener` 의 객체를 생성합니다.

    - *Java*

        ```java
        InstallListener listener = new InstallListener();
        listener.onReceive(context, intent);
        ```

    - *Kotlin*

        ```java
        val listener = InstallListener()
        listener.onReceive(context, intent)
        ```

- ### Signing certificate 생성

    - Android `App Link` 딥링킹에 사용합니다.

    - 앱의 keystore 파일로 이동합니다.

    - `keytool -list -v -keystore my-release-key.keystore` 를 실행합니다.

    - 다음과 같은 유형의 값이 생성될 것입니다. `AA:C9:D9:A5:E9:76:3E:51:1B:FB:35:00:06:9B:56:AC:FB:A6:28:CE:F3:D6:65:38:18:E3:9C:63:94:FB:D2:C1`

    - 해당 값을 [Branch Dashboard](https://dashboard.branch.io/link-settings) 에 복사합니다.

- ### Install listener 을 통해 매칭

    - Google Play 로부터 `link_click_id` 를 Branch 로 전달할 수 있게 합니다.

    - 이는 Attribution(귀속매칭)과 디퍼드 딥링킹의 정확도를 향상시켜줍니다.

    - Branch 는 디폴트로 Google Play analytics 를 위해 `1.5`초 동안 기다립니다.

    - 수요에 기반하여 퍼포먼스를 최적화 할수도 있습니다. (예. `0`, `5000`, `10000`)

    - 다음 코드를 `getAutoInstance` ([Load Branch](#load-branch) 이전에 Application 클래스에 추가합니다.

    - *Java*

        ```java
        Branch.setPlayStoreReferrerCheckTimeout(5000);
        ```

    - *Kotlin*

        ```java
        Branch.setPlayStoreReferrerCheckTimeout(5_000)
        ```

    - 테스트

        ```sh
        adb shell am broadcast -a com.android.vending.INSTALL_REFERRER -n io.branch.androidexampledemo/io.branch.referral.InstallListener --es "referrer" "link_click_id=123"
        ```

- ### Multidexing 활성화

    - 부가적인 dependency 들을 추가하면서 dex limit 이 초과될 수 있고 `NoClassDefFoundError` 또는 `ClassNotFoundException` 을 초래할 수 있습니다.

    - 다음 코드를 `build.gradle` 에 추가합니다.

        ```java
        defaultConfig {
            multiDexEnabled true
        }
        ```

    - 다음 코드를 `Application` 클래스에 추가하고 `MultiDexApplication` 을 상속하도록 합니다.

    - *Java*

        ```java
        @Override
        protected void attachBaseContext(Context base) {
            super.attachBaseContext(base);
            MultiDex.install(this);
        }
        ```

    - *Kotlin*

        ```java
        override fun attachBaseContext(base: Context?) {
            super.attachBaseContext(base)
            MultiDex.install(this)
        }
        ```

- ### InvalidClassException, ClassLoadingError 또는 VerificationError

    - 이는 일반적으로 `Proguard` 버그에 의해 발생합니다. 최신 버전의 Proguard 버전을 시도해 보거나 `-dontoptimize` 설정을 통해 Proguard 최적화를 비활성화 합니다.

- ### Answers-shim 모듈에 의한 Proguard 경고 또는 에러

    - 일반적으로 `Answers-shim` 을 제외시킬 때 발생합니다. `Proguard` 파일에 `-dontwarn com.crashlytics.android.answers.shim.`**  를 추가해봅니다.

- ### AppIndexing 모듈에 의한 Proguard 경고 또는 에러

    - Branch SDK 에서는 Firebase 의 컨텐츠 리스팅 기능과 새로운 Android install referrer 라이브러리 지원을 위해 Firebase AppIndexing과 Android install referrer 클래스에 관한 Dependency 를 선택적으로 추가하고 있습니다. 이는 앱의 Proguard 설정에 따라 Proguard 경고를 발생시킬 수 있습니다. 다음 코드를 Proguard 파일에 추가하여 해당 이슈를 해결합니다.
    `-dontwarn com.google.firebase.appindexing.**`  `-dontwarn com.android.installreferrer.api.**`

- ### Play Services Ads 모듈을 포함하지 않는 Proguard Rule

    - TGAID 를 통한 매칭을 위해 Branch SDK 에서는 Play Services Ads 를 선택적으로 추가하고 있습니다. Proguard 에서 해당 라이브러리의 사용을 제외하면 Branch Session 과 이벤트 전송 때 GAID 를 함께 포함시키면 이슈가 발생할 수 있습니다. 다음 코드를 Proguard 파일에 추가하여 해당 이슈를 해결합니다.
    `-keep class
		com.google.android.gms.ads.identifier.AdvertisingIdClient {
    com.google.android.gms.ads.identifier.AdvertisingIdClient$Info getAdvertisingIdInfo(android.content.Context);
    }`
    `-keep class com.google.android.gms.ads.identifier.AdvertisingIdClient$Info
		java.lang.String getId();
    boolean isLimitAdTrackingEnabled();
    }`

- ### Unable to open this link error

    - URI 스키마 리다이렉션 실패일 때 발생합니다.
    - 링크에 `$deeplink_path` 가 없도록 하거나 `AndroidManifest.xml` 파일에서 받아들일 수 있는 `$deeplink_path` 를 지정해야 합니다.

- ### initState == SESSION_STATE.INITIALISING 에 걸려서 지나가지 못하는 경우

    - Branch 가 Activity 로부터 정확한 Context 를 전달받지 못했을 때 발생하는 이슈입니다. 해결하기 위해 Branch 인스턴스를 액세스할 때 singleton 클래스를 전달합니다.

    ```java
    Branch.getInstance(getApplicationContext());
    ```

- ### Minimum versions
    Android에서 최소 버전을 API 9까지 지원하려면 Branch 1.14.5 로 연동하시기 바랍니다. 만약 API 15 이상을 지원한다면 Branch 2.x 을 연동하시기 바랍니다. Branch 3.x 를 연동하려면 최소 API 16 이상이어야 합니다.
