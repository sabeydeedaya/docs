#### Enable Facebook as an Ad Partner (for measurement)

!!! Note
    Completing this section -- "Enable Facebook as an Ad Partner" -- will result in Branch sending app events to Facebook in order to attribute them back to ad campaigns. **This does not enable deep linking for the ad**. Further work below is required for deep linking.

If you haven't enabled Facebook as an Ad Partner on the Branch dashboard follow this section to do so. Advanced options for sending events can be found [here](/pages/deep-linked-ads/facebook-ads-faq/#facebook-mmp-event-options).

1. Navigate to the [Partner Management tab](https://dashboard.branch.io/ads/partner-management).

    ![Ads Partner Management](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/ads-partner-management.png)

1. Search for **Facebook**.

1. Click `Connect With Facebook`

    ![Connect with Facebook](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/1-connect.png)

1. Login to Facebook if you are not logged in

    ![Login](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/2-login.png)

1. Confirm that Branch can receive your public profile

    ![Public profile](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/3-profile.png)

1. Confirm that Branch can have permissions `ads_read`

    ![OAuth scopes](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/4-scopes.png)

 	`ads_read` is used to surface impressions and clicks on the Branch Dashboard.

1. Select the ad accounts for which you want to run app install ads or app engagement ads

    ![Choose ad accounts](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/5-adaccounts.png)

    !!! Note
        If you are having trouble finding or selecting the ad account(s) for which you want to run ads, please visit our [FAQ](/pages/deep-linked-ads/facebook-ads-faq/#im-having-problems-finding-or-choosing-the-correct-ad-accounts).

1. Click to select a Facebook app id for which you want to run Facebook ads

    ![enter app id](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/6-app-1.png)

1. Copy the app id

    ![find app id](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/7-app-2.png)

1. Paste the app id and press `Save`

    ![paste app id](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/8-app-3.png)

1. Facebook is now enabled as an ad partner!

	Note that if you have different attribution windows between Facebook and Branch, those will be highlighted. The warning has a link to the docs on how to align these attribution windows.

    ![complete](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/9-complete.png)

1. Finally, to create a Facebook Ads link click the `Create Facebook Link` button in the top right hand corner.

    ![Create Facebook Ad Link](/_assets/img/ingredients/deep-linked-ads/enable-facebook-ad-partner/create-facebook-link.png)
