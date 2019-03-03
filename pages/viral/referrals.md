## Overview

Branch allows you to reward users with credits, track those credits, and redeem them when appropriate. It is a unit-less currency available to your users without you having to build a system from scratch.

<p align="center">
  <a href="https://www.youtube.com/watch?v=-qyR6y0wtCM"><img class="branch-image-override" src="/_assets/img/pages/viral/referral-programs/referral-video.png" /></a>
</p>

## Guide

!!! Prerequisites
	- You need to [integrate the Branch SDK]({#dialog-code) into your app.
	- You should [identify your users](#dialog-code?ios=track-users&android=track-users&adobe=track-users&cordova=track-users&mparticleAndroid=track-users&mparticleIos=track-users&titanium=track-users&reactNative=track-users&unity=track-users&xamarin=track-users) on both log in and log out.
	- Your users should be able to [create links in your app](#dialog-code?ios=create-deep-link&android=create-deep-link&adobe=create-deep-link&cordova=create-deep-link&mparticleAndroid=create-deep-link&mparticleIos=create-deep-link&titanium=create-deep-link&reactNative=create-deep-link&unity=create-deep-link&xamarin=create-deep-link) so we can track referred-referring relationships.

With every event that is recorded in Branch, we check automatically if that event is eligible for credits based on the rules that you configured, then deposit the credits if so. Reward rules can be based on both [automatic events and custom events](/dashboard/analytics/#user-value-attribution).

!!! warning "Identify your users"
	Because we do not merge identities, you *should set rewards on custom events* and *not use* the events we automatically track (`install` and `open`), and do so only *after* you have identified a user using our [identity methods](#dialog-code?ios=track-users&android=track-users&adobe=track-users&cordova=track-users&mparticleAndroid=track-users&mparticleIos=track-users&titanium=track-users&reactNative=track-users&unity=track-users&xamarin=track-users). This will help avoid duplicate rewards and missing credits.

!!! warning "Only use v1 custom events"
	Our referral system only supports our v1 custom event SDK method which is `userCompletedAction()` and `track()`. The v2 events, `BranchEvent` and `logEvent()`, are not supported at this time.

!!! warning "Promo codes has been deprecated"
	Our Promo codes feature on the dashboard has been deprecated. Please use reward rules to trigger referral rewards for your users.

## Awarding credits

!!! tip "Referral Fraud Protection"
	Branch tracks the hardware ID and IDFA of every device we detect, and ties these to our concept of a user identity. However, this means that you may run into issues if you test repeatedly with the same devices. When testing referral programs and reward rules, you should [use debug mode](#dialog-code?ios=simulate-an-install&android=simulate-an-install&cordova=simulate-an-install&mparticleAndroid=simulate-an-install&mparticleIos=simulate-an-install&titanium=simulate-an-install&reactNative=simulate-an-install&unity=simulate-an-install&xamarin=simulate-an-install).

To add a rule, go to the Dashboard Referrals page and click the [Rules tab](https://dashboard.branch.io/referrals/rules). Click the green "+ Add a new rule" button. Once there, you can add new rules to give rewards:

### Give reward

You can automatically give awards based on events taken by users.

Properties you can define:

1. Who gets a reward
1. How many credits the reward is
1. Which `bucket` the credits go to
1. Whether the reward occurs the first time or every time
1. Which event triggers the reward

!!! example
	Let's say you want to give 10 credits to each new user who signs up through a friend, and 5 credits to the friend who referred him or her. That can be done through a combination of two rules:

	### Rule 1: rewarding the referred user 10 credits

	1. Who gets a reward: **"Referred acting users"**
	1. How many credits the reward is: **10**
	1. Which bucket the credits go to: **default**
	1. Whether the reward occurs the first time or every time: **the first time**
	1. Which event triggers the reward: **install**

	![image](/_assets/img/pages/viral/referral-programs/referred_rule.png)

	### Rule 2: rewarding the referring user 5 credits

	1. Who gets a reward: **"Referring users"**
	1. How many credits the reward is: **5**
	1. Which bucket the credits go to: **default**
	1. Whether the reward occurs the first time or every time: **the first time**
	1. Which event triggers the reward: **install**

	![image](/_assets/img/pages/viral/referral-programs/referring_rule.png)

## Viewing Credits

Once users have credits, they should be able to redeem them. Checking the balance involves loading the most recent balance from the server and then reading the balance. These can be two separate steps but for the sake of simplicity we have combined them into one example:

- *iOS - Swift*

	```swift
	Branch.getInstance().loadRewards { (changed, error) in
		if (error == nil) {
			let credits = Branch.getInstance().getCredits()
			print("credit: \(credits)")
		}
	}
	```

- *iOS - Objective C*

	```obj-c
	[[Branch getInstance] loadRewardsWithCallback:^(BOOL changed, NSError *error) {
		if (!error) {
			NSLog(@"credit: %lu", [[Branch getInstance] getCredits]);
		}
	}];
	```

- *Android*

	```java
	Branch.getInstance(getApplicationContext()).loadRewards(new BranchReferralStateChangedListener() {
		@Override
		public void onStateChanged(boolean changed, Branch.BranchError error) {
			// changed boolean will indicate if the balance changed from what is currently in memory

			// will return the balance of the current user's credits
			int credits = branch.getCredits();
		}
	});
	```

If you want to see the number of credits in a custom bucket you've specified, such as `myBucket`, then you can do the following:

- *iOS - Swift*

	```swift
	Branch.getInstance().loadRewards { (changed, error) in
		if (error == nil) {
			let creditsForBucket = Branch.getInstance().getCreditsForBucket()
			print("credit for bucket: \(creditsForBucket)")
		}
	}
	```

- *iOS - Objective C*

	```obj-c
	[[Branch getInstance] loadRewardsWithCallback:^(BOOL changed, NSError *error) {
		if (!error) {
			NSString *bucket = @"myBucket";
			NSLog(@"credit for %@ bucket: %lu", bucket, [[Branch getInstance] getCreditsForBucket:bucket]);
		}
	}];
	```

- *Android*

	```java
	Branch.getInstance(getApplicationContext()).loadRewards(new BranchReferralStateChangedListener() {
		@Override
		public void onStateChanged(boolean changed, Branch.BranchError error) {
			// changed boolean will indicate if the balance changed from what is currently in memory

			if (error == null) {
				String bucket = "myBucket";
				Branch.getInstance(getApplicationContext()).getCreditsForBucket(bucket);
			}
		}
	});
	```

## Redeeming Credits

When users spend credits, you can make a simple call to redeem their credits.

- *iOS - Swift*

	```swift
	Branch.getInstance().redeemRewards(5, callback: {(success, error) in
		if success {
			print("Redeemed 5 credits!")
		}
		else {
			print("Failed to redeem credits: \(error)")
		}
	})
	```

- *iOS - Objective C*

	```obj-c
	[[Branch getInstance] redeemRewards:5 callback:^(BOOL success, NSError *error) {
		if (success) {
			NSLog(@"Redeemed 5 credits!");
		}
		else {
			NSLog(@"Failed to redeem credits: %@", error);
		}
	}];
	```

- *Android*

	```java
	Branch.getInstance(getApplicationContext()).redeemRewards(5);
	```

If you want to redeem credits in a custom bucket you've specified, such as `myBucket`, then you can do the following:

- *iOS - Swift*

	```swift
	Branch.getInstance().redeemRewards(5, forBucket: "myBucket", callback: {(success, error) in
		if success {
			print("Redeemed 5 credits for myBucket!")
		}
		else {
			print("Failed to redeem credits: \(error)")
		}
	})
	```

- *iOS - Objective C*

	```obj-c
	[[Branch getInstance] redeemRewards:5 forBucket:@"myBucket" callback:^(BOOL success, NSError *error) {
		if (success) {
			NSLog(@"Redeemed 5 credits for myBucket!");
		}
		else {
			NSLog(@"Failed to redeem credits: %@", error);
		}
	}];
	```

- *Android*

	```java
	Branch.getInstance(getApplicationContext()).redeemRewards("myBucket", 5)
	```

!!! example "Example redemption flow"

	This is a simple three-part process:

	1. Ensure credits are loaded.
	1. Call the `redeemRewards` method and show a progress dialog.
	1. Show a completion dialog and reflect updates in balance.

	- *iOS - Swift*

		```swift
			Branch.getInstance().loadRewards(withCallback: {(_ changed: Bool, _ error: Error?) -> Void in
				if !(error && Branch.getInstance().getCredits() > 5) {
					Branch.getInstance().redeemRewards(5, callback: {(_ success: Bool, _ err: Error?) -> Void in
						if err == nil {
							var newBalance: Int = Branch.getInstance().getCredits()
							var successMsg = "You redeemed 5 credits! You have \(Int(newBalance)) remaining."
							UIAlertView(title: "Success", message: successMsg, delegate: nil, cancelButtonTitle: "OK", otherButtonTitles: "").show()
						}
					})
				}
			})
		```

	- *iOS - Objective C*

		```obj-c
		[[Branch getInstance] loadRewardsWithCallback:^(BOOL changed, NSError *error) {
			if (!error && [[Branch getInstance] getCredits] > 5) {
				[[Branch getInstance] redeemRewards:5 callback:^(BOOL success, NSError *err) {
					if (!err) {
						NSInteger newBalance = [[Branch getInstance] getCredits];
						NSString *successMsg = [NSString stringWithFormat:@"You redeemed 5 credits! You have %ld remaining.", (long)newBalance];
						[[[UIAlertView alloc] initWithTitle:@"Success" message:successMsg delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil] show];
					}
				}];
			}
		}];
		```

	- *Android*

		```java
		Branch.getInstance().loadRewards(new BranchReferralStateChangedListener() {
			@Override
			public void onStateChanged(boolean changed, BranchError error) {
				if (error == null && Branch.getInstance().getCredits() > 5) {
					Branch.getInstance().redeemRewards(5);
				}
			}
		});
		```

- ### Sample app - iOS Referral TestBed
To get a better understanding of the overall referral flow, please check out our iOS Referral TestBed app [Source code](https://github.com/BranchMetrics/iOS-Testbed-Referral).
