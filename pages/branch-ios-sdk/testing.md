title: iOS SDK Testing

<div class="page-ul">
  <div class="page-li"><a href="/branch-ios-sdk/basic-integration/">Basic Integration</a></div>
  <div class="page-li"><a href="/branch-ios-sdk/advanced-features">Advanced Features</a></div>
  <div class="page-li">
    <div class="page-active">
      <a href="/branch-ios-sdk/testing">Testing</a>
    </div>
  </div>
  <div class="page-li"><a href="/branch-ios-sdk/troubleshooting">Troubleshooting</a></div>
  <div class="page-li"><a href="/branch-ios-sdk/version-history">Version History</a></div>
  <div class="page-li"><a href="/branch-ios-sdk/full-reference">Full Reference</a></div>
</div>

### Enable logging

- Use the Branch test key instead of the live key

- Add before `initSession` [Initialize Branch](#initialize-branch)

- Remove before releasing to production

- *Swift*

    ```swift
    Branch.getInstance().setDebug()
    ```

- *Objective C*

    ```objc
    [[Branch getInstance] setDebug];
    ```

- Make sure `OS_ACTIVITY_MODE` is not disabled ([link](https://stackoverflow.com/a/39503602/2690774))

### Use test key

- Use the Branch `test key` instead of the `live key`

- Add before `initSession` [Initialize Branch](#initialize-branch)

- Update `branch_key` in your `Info.plist` to a dictionary ([example](https://github.com/BranchMetrics/ios-branch-deep-linking/blob/master/Branch-TestBed/Branch-TestBed/Branch-TestBed-Info.plist#L58-L63))

- The `test key` of your app must match the `test key` of your deep link

- Remove before releasing to production

- *Swift*

    ```swift
    Branch.setUseTestBranchKey(true)
    ```

- *Objective C*

    ```objc
    [Branch setUseTestBranchKey:YES];
    ```

### Sample testing apps

- [Branchsters](https://github.com/BranchMetrics/Branch-Example-Deep-Linking-Branchster-iOS)

- [Testbed](https://github.com/BranchMetrics/ios-branch-deep-linking/tree/master/Branch-SDK-TestBed)

### Simulate an install

- Delete your app

- iPhone Device -> Settings -> Privacy -> Advertising -> Reset Advertising Identifier -> Reset Identifier

- Add `Branch.setDebug(true)` before `initSession` ([Initialize Branch Features](#initialize-branch-features))

- Click on a deep link to navigate to your `$fallback_url` because your app is not installed

- Install your app

- Open your app

- Read from `params` within `initSession` for `+is_first_session = true`
