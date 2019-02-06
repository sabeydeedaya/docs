Creating quick links is really simple from the Quick Links section of the Branch dashboard. You will be able to create quick links on the fly and add custom redirections, analytics information, and social media tags. These links can be used in your social media channels, blog posts, influencer networks, etc.

1. To start, from your Branch dashboard, click on the Create Link button on the top right of the dashboard.

2. On the next Define screen, fill in the following fields:

	- **Name your link**: Give your link a name so you can find it in the dashboard later. Try to stick to a naming convention if creating multiple quick links

	- **Enter a corresponding URL (OPTIONAL)**: Entering a URL to your site in this field will grab social information like Title, Description and Image when shared on social media (more on this later). It will also automatically set the provided URL as the $canonical_url which is useful if that is your routing mechanism.

	- **Where will you post this link?**: The channel this will be used in. For example, Facebook, Twitter, Instagram, Snapchat, etc. It’s important to keep the spelling of channels consistent so you can analyze the performance of these channels in aggregate.

	- **What campaign is it part of?**: Another analytics tag you can set as it relates to a campaign you are running. “Cyber Monday”, for example.

	- When finished, select the Configure Options button

3. If the link will be shared and visible to the user, you have the ability to set a vanity alias for your quick link. The vanity alias on a link cannot be changed after link creation. When left empty, random string of characters will be assigned for the vanity alias.

4. The next section contains information pertaining to the various sub-tabs you see under the vanity URL:

	- **DEEP LINKING** - Information passed from web to app to control routing, promo codes, open graph tags, etc.

		1. Routing - The mechanism in which users are routed from web to app so you can direct users to the correct content. For example, this may be via $canonical_url or $deeplink_path

			- $canonical_url will be automatically populated from step 3a if filled out

		2. Promo codes - If your app is configured to use a promo code or discount from the Branch data dictionary, you can enter that here. You’ll need to know the exact key-value syntax. Talk to your mobile app developers if you’re unfamiliar.

		3. OG Tags - Control how your links will look when shared on social media platforms. In-depth customizable options here. **You will not set title, description or image in this section of the dashboard.**

	- **REDIRECTS** - Links you create will automatically inherit redirects on iOS, Android, and Desktop per the default settings applied at your account level. Here you have the ability to override those defaults and direct users to specific locations if the app is not installed.

		1. Default Redirect - Set at the account level within Link Settings. Typically set to the relevant mobile stores

		2. Web URL - Send users to a specific web page if they don’t have to the app to avoid any unexpected flow to the app store

		3. Deepview - Send users to a specific deepview you may have created within the branch dashboard. Copy the key and paste it into the text box. Useful if you want to present the user with a preview of the content before taking them directly to the app store. Should not be set for Desktop option

	- **ANALYTICS TAGS** - Setting tags on links in order to view performance on them in the dashboard

		1. Channel - For example, Facebook, Twitter, Instagram, Snapchat, etc. Keep the spelling of names consistent

		2. Campaign -“Cyber Monday”, for example

		3. Tags - Further tagging granularity. For example, “US”, “UK”, Social influencer name, blog poster, etc.

	- **SOCIAL MEDIA** - Setting Title, Description and Image for instances when this link is shared on social platforms. This will be automatically populated from OG Tags included on the redirection URL. Use the previewer on the right side of the screen

5. When all sub-tabs are complete, select the Create Link Now button

6. You will be brought to the Validate & Share section where you can copy the link or send a text of it to yourself. Utilize these options to see how the link will act on various devices to make sure:

	- App Uninstalled: You are directed to the correct redirect page

		- If linking to the App store and routing to content, make sure you are directed to that content after install (also known as deferred deep linking)

	- App Installed: App opens and you are directed to the correct piece of content

		- Be sure to check this functionality on the channel you’ll be sharing it in

Click Close and begin using your link!
