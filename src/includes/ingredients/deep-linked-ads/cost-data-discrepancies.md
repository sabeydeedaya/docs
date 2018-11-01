#### Branch Cost data not matching the Ad Partner dashboard

Please ensure that you've selected the same time zone in your Ad Partner's dashboard and your Branch dashboard.

#### CPI metric doesn't match between Ad Partner and Branch, although cost metric does

Branch's last-click attribution model can lead to differences in install counts for Branch vs self-attributing networks (SANs) that in turn cause differences in CPI metrics. Verify whether your cost and install metrics match the Ad Partner's dashboard. If there is an install discrepancy, it is likely legitimate and due to differences in install counts, where Branch's number is more accurate. If the discrepancy is very large, investigate causes of install discrepancies through the usual troubleshooting steps.

#### Cost, click and impression data is all missing

Cost, click and impression data for SANs are generally sourced from Partner APIs (unless Branch impression pixels or links are being intentionally used for attribution, for example, in web campaigns). When you enable a SAN, you authenticate with your provider. Branch uses this authentication to retrieve click, cost and impression data. If the authentication token expires (for example, if you reset your password, or the partner force resets your token), then you may not see click, impression or cost data. In this case, simply reauthenticate and that will refresh your token.

#### Cost data is missing or incorrect for certain "compare by" breakdowns

Downstream events, such as _installs_, should always have the full range of compare by options in the dashboard. However, _clicks, impressions and cost_ data for SAN are often imported via Partner APIs. These APIs do not necessarily provide the same breakdowns for cost data that Branch supports with raw install events, so there may be cases where the Branch Dashboard cannot compare by the same dimensions for cost data vs install data.

