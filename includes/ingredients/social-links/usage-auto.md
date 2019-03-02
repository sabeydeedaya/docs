The conversion to Branch links will only work when your links are wrapped in your click tracking domain. To test links without wrapping, please generate a test link on the Verification step of email onboarding, also accessible by clicking the gear icon for your ESP on the [email page](https://dashboard.branch.io/email){:target="\_blank"}.

![image](/img/pages/email/setup-test.png)

!!! protip "What happens to your links behind the scenes?"
    This is what a link looks like within your email template:

    ```html
    http://example.com/?foo=bar
    ```

    When a user clicks your link, Branch processes the link and converts it to something like this:

    ```html
    https://vza3.app.link/3p?%243p=e_xx&%24original_url=http%3A%2F%2Fexample.com%2F%3Ffoo%3Dbar
    ```

    Where `vza3.app.link` is your Branch domain.
