### Flag your web-only links

With your email service provider, all email links will open the app by default. In order for your app to know that the email link should bounce to web after opening the app, add `$web_only=true` to your links as a query parameter, for example:

```html
<a href="links.example.com?$web_only=true" >Link to your app!</a>
```

!!! caution "Handle links for web-only content"
    Make sure you have completed the [technical setup steps](#handle-links-for-web-only-content) to handle web-only links within your app.
