### Integrating the SDKs and tracking in-app events

The Branch SDKs for iOS and Android allow you to get up and running quickly. 

If you haven't already integrated Branch SDK into your application, please follow our integration guide to integrate Branch SDK into your application:

1. Documentation for [Android](/pages/apps/android/)

1. Documentation for [iOS](/pages/apps/ios/)

!!! warning "Limitations with setDebug and seeing data in Branch"
	When integrating the SDKs, it's often useful to use setDebug to verify that your app is able to communicate with Branch servers, and is receiving deep link data. However, our upstream systems don't register test events sent using setDebug, so events will not appear in Liveview or Analytics, nor will they fire postbacks. You should disable setDebug when looking at Liveview or testing postbacks.
