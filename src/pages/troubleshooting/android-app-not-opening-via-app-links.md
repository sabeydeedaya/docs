What are Android App Links?
When you click a Branch link, you have an option to directly launch the Android app rather than taking the user to the Google Chrome browser(any other browser) and then open the app. Google calls them as the App Links and inside Branch dashboard, you can configure them. You can also read about them on our official blog here: https://blog.branch.io/what-are-app-links/



This troubleshooting guide will help you solve the issues related to App Links setup.



Everything about the opening of the Android App Links is configured via the following 3 components:
1. Branch link
2. App's Android Manifest file
3. App Link settings on Dashboard->Link settings->Android redirects


Step 1: Make sure you have followed our documentation to set up the App Links
a. Generate the SHA256 fingerprint for your app
b. Enable App Links on the Dashboard->Link settings->Android redirects.
c. Add Branch link in the Intent-Filter of the Launcher Activity.
(You can copy the exact same code and replace the xxxx with your Branch link domain. If you do not what your domain is, please refer to Step 2.)

Step 2: Branch link verification
Please make sure that the link you are testing with belongs to your app. This can easily be verified from the link domain that is present on your Dashboard-> Link settings->Link Domain. The Branch link domain resembles like "xxxx.app.link".

Step 3: Platform Behavior Verification
Clicking the Branch link from different apps such as Facebook, Twitter etc. can produce different redirection behaviors. Please make sure you go-through the expected behaviors of the various known platforms as mentioned in our documentation.

Step 4: Advanced Branch link verification(These verifications may vary for different link behaviors and are only for advanced use-cases)
If you are using the $android_deeplink_path Branch link property, instead of using the custom key-value Branch link property, you would need to make sure you have set the URI scheme path in the Manifest file to handle those incoming link data.

Step 8: Still unable to open app on Android?
Feel free to submit a ticket here with
a. Your app Branch key,
b. Branch link you are testing with,
c. Your test build of the Android app.

Please note that without the above information, it will be difficult for us to provide a speedy resolution.
