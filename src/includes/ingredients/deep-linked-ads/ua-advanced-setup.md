## Advanced

### Add more postbacks

When you enable an ad partner, your ad partner postbacks can be found under the **Postbacks** tab for that ad partner. It's easy to add additional postbacks.

![image](/img/pages/deep-linked-ads/branch-universal-ads/postbacks-tab.png)

1. Click the **Add New Postback** button at the bottom of the screen.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/add-new-postback-button.png)

1. A modal will appear with Branch default events, as well as any commerce or custom events you've set up. Select an event, enter a postback URL if you're asked to, and click **Save**. This will be the event that triggers your new postback.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/add-new-postback-modal.png)

### Edit postbacks

For advanced integrations, you may want to provide additional information in your postback that isn't there by default. You can edit postbacks by following our [postback templating instructions](/pages/exports/ua-webhooks/#templating-your-postback-url), then clicking save. The postbacks in the Universal Ads interface follow the same syntax as Webhooks in Data Feeds. When the postback is saved, it is then validated - if you enter an invalid postback, you'll get an error at the top of your screen.

!!! tip "Reset Postbacks"

    We all make mistakes from time to time. If you need to reset your postbacks and your credentials, navigate to the **Account Settings** tab and look for the **Reset all settings** button. Be careful though! This will disable the ad partner, clear out all credentials and postbacks that you've set up, and return the ad partner to its basic configuration. You can then start afresh.

### Change attribution windows

Attribution windows can be specified at the global account level or on a per link basis with the link level window taking priority. See the below instructions for setup.

For customer experience and data accuracy, please do not set your deep linking window longer than the other attribution windows.

#### Account Level Attribution Windows

You can edit your attribution windows under Link Settings > Attribution Windows.

   ![image](/img/pages/dashboard/people-based-attribution/attribution-windows.png)

Learn more about account level attribution windows in [People-Based Attribution](/pages/dashboard/people-based-attribution/#attribution-windows).

#### Ad Network Attribution Windows

You can edit your attribution windows at the ad network level, if your ad network requires it. This is recommended when you enable networks like Facebook and Google, who may have different windows for installs. With this, you can preserve your Account Level Attribution Windows, as well.

   ![image](/img/pages/deep-linked-ads/branch-universal-ads/anaw.png)

#### Link Level Attribution Windows

To set attribution windows on a link level, you can append the following parameters to your generated Branch link.

Key | Example Link
--- | ---
$click_install_window_days| https://branchster.app.link/hpNVE52gxE?$click_install_window_days=3
$click_session_start_window_days | https://branchster.app.link/hpNVE52gxE?$click_session_start_window_days=7
$click_conversion_window_days | https://branchster.app.link/hpNVE52gxE?$click_session_start_window_days=30
$impression_install_window_days| https://branchster.app.link/hpNVE52gxE?$impression_install_window_days=3
$impression_session_start_window_days | https://branchster.app.link/hpNVE52gxE?$impression_session_start_window_days=1
$impression_conversion_window_days | https://branchster.app.link/hpNVE52gxE?$impression_session_start_window_days=7

!!! warning "Link Level Attribution Support for Standard Branch links"
    As of July 2017, link level attribution window setting is only available on standard Branch links. Special Branch links such as the ones used for Google's Universal App Campaign or Play Store links with Branch link id parameters are currently not supported.

## Support

### How do I debug a discrepancy?

Navigate to the [Analytics](https://dashboard.branch.io/ads/analytics) page to see data.
