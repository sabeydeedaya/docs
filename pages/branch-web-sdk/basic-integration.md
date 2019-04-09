title: Web SDK Basic Integration

<div class="page-ul">
  <div class="page-li">
    <div class="page-active">
      <a href="/branch-web-sdk/basic-integration/">Basic Integration</a>
    </div>
  </div>
  <div class="page-li"><a href="/branch-web-sdk/advanced-features">Advanced Features</a></div>
  <div class="page-li"><a href="/branch-web-sdk/testing">Testing</a></div>
  <div class="page-li"><a href="/branch-web-sdk/troubleshooting">Troubleshooting</a></div>
  <div class="page-li"><a href="/branch-web-sdk/version-history">Version History</a></div>
  <div class="page-li"><a href="/branch-web-sdk/full-reference">Full Reference</a></div>
</div>

!!! info "Current SDK Version 2.49.0"
    Please see the [Web SDK Version History](/branch-web-sdk/version-history) to view change log.

## Requirements

This SDK requires native browser Javascript and has been tested in all modern browsers with sessionStorage capability. No 3rd party libraries are needed to make use of the SDK as is it 100% native Javascript.

### Browser Specific Support
| Chrome | Firefox | Safari |     IE     |
| ------ | ------- | ------ | ---------- |
|    &#10004;   |    &#10004;    |   &#10004;    |  9, 10, 11 |


## Integrate Branch

### Configure Branch

- [Configure the default link settings](/links/default-link-behavior/) for your app

    ![image](/_assets/img/pages/dashboard/fallback.png)

### Integrate Your Mobile App

- Complete the **Basic Integration** for the [appropriate app platform](/hero/#deep-linking).

## Initialize Branch

```html hl_lines="4 8 9 10 11 12 13"
<!doctype html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <script>
    // load Branch
    (function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking".split(" "), 0);
    // init Branch
    branch.init('key_live_YOUR_KEY_GOES_HERE');
  </script>
</head>
<body>
</body>
</html>
```

- Change `key_live_YOUR_KEY_GOES_HERE` to match your [Branch Dashboard](https://dashboard.branch.io/account-settings/app)
- If you'd like to use a specific version of the SDK, point to https://cdn.branch.io/branch-x.xx.x.min.js (e.g. https://cdn.branch.io/branch-2.47.1.min.js) rather than https://cdn.branch.io/branch-latest.min.js when initializing.
