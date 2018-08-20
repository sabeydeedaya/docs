### Flag your deep links

In order for your email service provider to know that the email link should open the app, add `deeplink="true"` to the HTML, for example:

```html
<a href="http://example.com" deeplink="true">Link to your app!</a>
```

### Track web-only clicks in Branch

While not required, if you'd also like to track how many non-Branch links are clicked in Branch's dashboard, you can append `$web_only=true` to your links as a query parameter.  Please make sure you do NOT add `deeplink="true"` to the HTML for these links.

```html
<a href="http://example.com?$web_only=true" >Link to website</a>
```
