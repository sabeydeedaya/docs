To accurately measure and attribute interactions (installs and in-app events) that users take with your app, Branch uses several different types of attribution. The attribution method Branch applies depends on a combination of factors, like platform/app store, engagement type, and conversion type.  Branch’s attribution methods are “stack-ranked” to ensure the highest level of accuracy.

## Key takeaways

*   Clicks take precedence over impressions.
*   Methods using deterministic 1:1 attribution (via unique identifiers/IDs) take precedence over methods using probabilistic (not 1:1) attribution, such as device fingerprint matching.
*   By ensuring Branch receives the necessary information (i.e. unique identifiers) to implement deterministic click attribution, we ensure not only accurate attribution for our clients but give the appropriate level of priority to all incoming clicks/impressions.

## Attribution Methods in Order of Operation

**1. Deterministic Click Attribution**

*   Google Play Install Referrer
*   Identifier Matching
    *   Google Advertising Identifier (GAID)
    *   Apple’s Identifier for Advertisers (IDFA)
*   Open URL (deep link) with Click ID

**2. Probabilistic Click Attribution**

*   Fingerprint Matching

**4. Deterministic View Attribution**

*   Identifier Matching Only


## Attribution Settings

An attribution window simply defines the window of time for when an eligible attribution or deep link can occur. Attribution windows enable you to control when events should be attributed, when deep links should occur, and when an event should be classified as a re-engagement for cohort analysis. You can define your window of time for as little as 0.001 of a day or as long as 90 days.

To access your attribution settings, navigate to the [Link Settings](https://dashboard.branch.io/link-settings) page, and click on the Attribution Windows tab.


### Default Attribution Window Settings

Each attribution window has its own default measured in days. Please refer to the image below for these defaults.

![image](/_assets/img/pages/dashboard/people-based-attribution/attribution-windows.png)

*   **Click to x** refers to events - session start/install/conversion event -  that occur after someone clicks a Branch link. If someone clicks and installs from a link, and comes back 10 days later to purchase, we would count that as a conversion, and it would surface in our dashboard. Measured in days.
*   **Impression to x** refers to events - session start/install/conversion event - that occur after someone views a Branch impression link. Measured in days.
*   **Deep Linking Duration** refers to the duration of time someone is eligible to receive deep link data. This includes anyone clicking a Branch link, or being automatically redirected to the app through a Branch Web SDK call. Measured in minutes.
    *   **Note**: This setting also covers the maximum length of time allowed for fingerprint matching. Hence changing this value will also change the length of time allowed to use a fingerprint for attribution.
*   **Re-engagement Inactivity** defines the period between two events that a user must be inactive in order to define the later event as a re-engagement. Used in re-engagement cohort analysis but not activity analysis.


### App-level vs Ad Network-level Settings

Your default attribution window settings - as described above - are applied at the app-level of your account and therefore apply to every Universal Ad partner you’re working with.

You can, however, override these defaults on a per ad partner basis by enabling the use of Ad Partner Attribution Windows for any given ad partner.

To access ad partner attribution settings, navigate to the [Partner Management](https://branch.dashboard.branch.io/ads/partner-management) page, search for and select the corresponding Ad Partner, and click on the Attribution Windows tab.

![image](/_assets/img/pages/dashboard/people-based-attribution/ad-partner-attribution-window.png)

!!! tip "Using Ad Partner Attribution Windows"
	When you enable Use Ad Partner Attribution Windows, the defaults from the app-level are auto-loaded. Please contact your Ad Partner if they require different settings to ensure you input the correct attribution window lengths.

## Attribution Logic Nomenclature

Branch and Tune have different terminology for Attribution windowing, but the logic is very similar. This section covers the automatic mapping from your Tune windows to your Branch Windows, as well as the differences you can expect to see on Branch.

### Deterministic Attribution Windows

![image](/_assets/img/pages/dashboard/people-based-attribution/deterministic-attribution-windows.png)

Differences:

*   While Tune had multiple windows for different types of deterministic attribution, Branch has a single simplified window for click to install.
*   Tune supported an indefinite Post-Install Event Attribution Window. Branch supports a maximum of 90 days for click and 7 days for impression.


### Fingerprint Attribution Windows

![image](/_assets/img/pages/dashboard/people-based-attribution/fingerprint-attribution-windows.png)

Differences:

*   Branch does not currently support fingerprint impression attribution.
*   Branch’s fingerprint window is stored at the app level, not the ad network level. We used our default of 2 hours because an IP match beyond this time window is not accurate.
*   You can configure Deep linking Duration Window in Link Settings > Attribution Windows.
*   Setting Deep linking Duration Window to 0 will block fingerprint attributions, but will prevent deferred deep linking (deep linking through install) in some cases. Normal direct deep linking will work.
*   We have beta support for blocking fingerprint attributions as fraudulent for specific campaigns or ad networks. Please reach out to your CSM if you are interested in participating.


## Attribution FAQs

**How does Limit Ad Tracking impact Branch attribution?**

If a user of your app has Limit Ad Tracking enabled on their device, Branch will not perform attribution of said user.  We will, however, still complete deep linking and deferred deep linking when applicable.
