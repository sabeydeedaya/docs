A referral program helps to create an awareness about one’s app by helping it grow in a viral, yet organic

fashion. You can see the exact k-Factor , measure conversion from referred install, and even list out

 which of your users are the top referrers . If this is how you’re thinking about tracking organic growth, then you’re on the right track.



By the end of this guide, your users will be able to:

Share referral links.

Track who your referred and influencers (referring users) are.

Provide analytics around who the most influential referrers are.

Distribute credits based on actions performed by referring users/referred users through the use of referral rules.

Allow users to redeem credit.

Audit a user’s credit history.


Definitions:
Influencer (Referring user) – Engaging advocates, ambassadors, and brand fans-- that spread the word about your product. They are the champion on your brand and are at the forefront of driving your brand growth. You’ll want to make sure that these users get taken care of by giving them the highest tier of rewards in your app. This could be money, coupons or a status upgrade, etc.e.

Referred user – A user who installs/opens the app via the influence of a influencer (referring user’s) content.

Referral rule – A rule that dictates by how much a user type should get credited when they trigger an event.

Event – An action that any user takes inside the app – such as signing up for an account.

Referred event – An action that a referred user takes inside the app.

Credits – An in-app unit or currency specific to your app.

Deep link – A route to a particular piece of content in your app.

Referral link – A deep link created by a referring user.

Onboarding flow – A set of screens that new users are greeted with the first time they install the app.



Video Overview:
https://www.youtube.com/watch?v=-qyR6y0wtCM

How-to:
Sign up and Integrate the Branch SDK.

https://docs.branch.io/pages/apps/ios/

https://docs.branch.io/pages/apps/android/



Create referral rules that target both referred user and referring users.

https:/.dashboard.branch.io/referrals/rules





Log users into Branch as soon as they log in or create an account.

Assuming that you’ve gone through our comprehensive onboarding flow which includes integrating the SDK into your app, you’ll want to add some code to identify your users via a call to setIdentity() anytime users create an account or log into your app. Most developers pass the same username that users create into the setIdentity() function. This makes it easy to map users in your app to users in Branch.



After setIdentity() has been correctly implemented, if users create a link or cause an event to fire (discussed in step 4), they will be correctly attributed to it.



https://docs.branch.io/pages/apps/ios/#track-users

https://docs.branch.io/pages/apps/android/#track-users



Track Branch custom events every time users perform actions tied to your reward rules.

To get the reward rules created in step 2 to trigger, you’ll have to fire a sign_up event from your app after users have created an account and you’ve identified them in Branch (step 3). This can be done by calling:


HTML
branch.userCompletedAction(“sign_up”)


https://docs.branch.io/pages/apps/ios/#track-events

https://docs.branch.io/pages/apps/android/#track-events



Allow users to share links.

Hands down, the easiest way to enable sharing in your app is to make a call to showShareSheet() on your Branch Universal Object (a single, self-contained object associated to each thing that you want to share). Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.




Allow users to redeem credits.

With the above steps configured correctly, referred users and referring users will get 10 and 10 credits respectively when a new user enters into the app via a Branch link and triggers the signup_completed event.



In order to redeem credits, your users will first need to know how many credits they have. For this, you would have to reserve a location in your app where users can see their balance and redeem credits.



Once you’ve figured out where you want to display a user’s credit balance, use loadRewards() to display how many credits a user has. When a user decides to spend credits in your app (for something awesome), simply call redeemRewards() for the amount that you wish to deduct from their balance.

https://docs.branch.io/pages/apps/ios/#handle-referrals

https://docs.branch.io/pages/apps/android/#handle-referrals


Analytics


Dashboard
https://.dashboard.branch.io/referrals/analytics


If you’re interested in who your top influencers are and who they’ve brought into the app, please navigate to Dashboard > Referrals > Influencers.





If you click on the number from the number of referred users column, you’ll get to see how many users a particular user has referred:





Data Feeds


If you’re subscribed to our awesome Data Feeds product, you can view the referred user and influencer in any of the exports.



If you are using our Custom Event CSV Exports, you can look at the  user_data_developer_identity for the referred user's identity. The influencer identity will be under $identity_id in the last_attributed_touch_data_custom_fields column.



If you are using a webhook, you can look at user_data.developer_identity and last_attributed_touch_data_custom_fields.$identity_id.
