#### Handle links for web-only content

If you have links to content that exists only on web, and not in the app (for example, a temporary marketing webpage that isn't in the app) then this code snippet will ensure all links that have not had the deep linking script applied will open in a browser.

You should add this code snippet inside the deep link handler code block. Note that this uses query parameter `$web_only=true`. This should match the [query parameter on the web URL](#flag-your-web-only-links) you enter in the email.

```
[branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
  // params are the deep linked params associated with the link that the user clicked before showing up.
  if (params[@"$3p"] && params[@"$web_only"]) {
            NSURL *url = [NSURL URLWithString:params[@"$original_url"]];
            if (url) {
                [application openURL:url]; // check to make sure your existing deep linking logic, if any, is not executed, perhaps by returning early
            }
  } else { 
    // it is a deep link
    GDLog(@"branch deep link: %@", [params description]); 
    [self handleBranchDeeplink:params];
  }
}];
```
