title: Android SDK Testing

<div class="page-ul">
  <div class="page-li"><a href="/branch-android-sdk/basic-integration/">Basic Integration</a></div>
  <div class="page-li"><a href="/branch-android-sdk/advanced-features">Advanced Features</a></div>
  <div class="page-li">
    <div class="page-active">
      <a href="/branch-android-sdk/testing">Testing</a>
    </div>
  </div>
  <div class="page-li"><a href="/branch-android-sdk/troubleshooting">Troubleshooting</a></div>
  <div class="page-li"><a href="/branch-android-sdk/version-history">Version History</a></div>
  <div class="page-li"><a href="/branch-android-sdk/full-reference">Full Reference</a></div>
</div>

- ### Enable logging

    - *Java*

        ```java
        Branch.enableDebugMode();
        ```

- ### Test your Branch Integration

    Test your Branch Integration by calling `IntegrationValidator.validate` in your MainActivity's onStart(). Check your ADB Logcat to make sure all the SDK Integration tests pass. Make sure to comment out or remove `IntegrationValidator.validate` in your production build.

    - *Java*

        ```java
        IntegrationValidator.validate(MainActivity.this);
        ```


- ### Sample testing apps

    - [Branchsters](https://github.com/BranchMetrics/Branch-Example-Deep-Linking-Branchster-Android)

    - [Testbed](https://github.com/BranchMetrics/android-branch-deep-linking/tree/master/Branch-SDK-TestBed)

- ### Simulate an install

    - Need to bypass the device's hardware_id

        - Set `true` in your `AndroidManifest.xml`

            ```xml
            <meta-data android:name="io.branch.sdk.TestMode" android:value="true" />
            ```
            - Do not use `TestMode` in production or in the Google Play Store

        **OR**

        - add `Branch.enableSimulateInstalls()`; called before `initSession` in `onStart()`

          - Can be used on Live and Test apps

    - Uninstall your app from the device

    - Click on any Branch deep link (will navigate to the fallback URL since the app is not installed)

    - Reinstall your app

    - Read deep link data from `Branch.getInstance().initSession()` for `+is_first_session=true`
