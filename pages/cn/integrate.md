## 基础集成配置

- ### 了解 Branch 密钥

	- 点击 Branch 控制面板上的[账户配置](https://dashboard.branch.io/account-settings/app)
	- `Branch 密钥`授权和Branch 的 SDK 进行数据交互，并可创建深度链接
	- 这些密钥是您的 Branch 应用所独有的, 每个app有不同组的密钥
	- 请勿泄露您的 `Branch 口令`，以防遭人恶意使用

		![image](/_assets/img/pages/dashboard/branch-keys.png)

- ### 设置默认行为

	- 在[链接设置]https://dashboard.branch.io/link-settings)中设置深度链接的默认行为

	- 这些数值会被每个深度链的[自定义链接行为](/links/integrate/#custom-link-behavior)所覆盖

	- #### iOS

		- 通过以下设置控制 iOS 上深度链的默认行为

			![image](/_assets/img/pages/dashboard/ios.png)

		- 您可在 [Apple Developer 门户网站](https://developer.apple.com/account/ios/identifier/bundle)中找到适用于您应用程序的 Apple App Prefix

	- #### Android 系统

		- 通过以下设置来控制 Android 系统上深度链接的默认行为

		- Play Store 应用商店适用于已发布的应用程序，如果您的应用程序未上架或是本地/开发版本，请使用自定义 URL 选项

			![image](/_assets/img/pages/dashboard/android.png)

		- 生成 SHA256 证书指纹

			- 导航到`密钥库文件`（用于在部署 APK 文件之前，创建其调试版本和生产版本）

			- 运行 `keytool -list -v -keystore my-release-key.keystore` 生成指纹

			- 以 `AA:C9:D9:A5:E9:76:3E:51:1B:FB:35:00:06:9B:56:AC:FB:A6:28:CE:F3:D6:65:38:18:E3:9C:63:94:FB:D2:C1`为例，添加到 [Branch 控制面板](https://dashboard.branch.io/link-settings)

	- #### Desktop

		!!! note "我们现在支持通过 URI Scheme 深度链接到 Desktop 桌面系统应用程序（如 Spotify 和 Slack)"
				我们的测试版 Mac OS Desktop SDK 可供测试，详情请咨询您的 Branch 客户经理，或发送邮件至 integrations@branch.io.

		- 通过以下设置控制 Desktop 浏览器上深度链的默认行为

			![image](/_assets/img/pages/dashboard/desktop.png)

		- 针对 Desktop 应用程序
			- 输入您的 Desktop URI Scheme（例如：spotify://)
			- 将密钥值对 `$desktop_deeplink_path 包含到链接中（例如 "$desktop_deeplink_path": "track/5D8o9tGf3Dfjz7CgMxcoeI"`）
			- 如果单击链接后无法安装应用程序，那么将按此顺序回退到 Desktop 或默认 URL
			- 此功能仍处于开发的早期阶段，因此，如果没有安装 Desktop SDK，将无法使用用该功能来归因或传递数据。

	- #### 回退
		- 通过以下设置所有平台上深度链的默认行为

			![image](/_assets/img/pages/dashboard/fallback.png)

	- #### 链接域
		- 选择一个将用于所有链接的`链接域`
		- `链接域`是托管深度链的网站
		- `链接域`本身不是深度链
			- 深度链具有`别名`，可用作内部链接数据的唯一标识
				- 例如：https://example.app.link/VZsTctoINF
				- 例如：https://example.app.link/custom-alias

					![image](/_assets/img/pages/dashboard/link-domain.png)

	- #### 社交媒体
		- 在社交媒体上分享时，为深度链设置默认图像预览
		- 这些值通常由[自定义链接行为](/links/integrate/#custom-link-behavior)覆盖，用于区分不同的深度链

			![image](/_assets/img/pages/dashboard/social-media.png)

	- #### 保存
		- 确认提交所有更改

			![image](/_assets/img/pages/dashboard/save.png)

- ### 启用 Deepview

	- 转到 Branch 控制面板上的 [Deepview 预览](https://dashboard.branch.io/web/deepviews)
	- 为 `iOS` 和 `Android` 的 `branch_default` 启用切换功能
	- 这将使您的深度链在所有[受支持的平台](/links/integrate/#expected-redirect-behavior)上以最佳方式执行
	- 有关 [Deepview](/web/deep-views/) 的更多详情

		![image](/_assets/img/pages/dashboard/deepview.png)

## 高级集成

- ### 配置用户
	- 点击 Branch 控制面板上的[账户配置](https://dashboard.branch.io/account-settings/user)
	- 您可以对 Branch 用户帐户的电子邮箱、密码和用户 ID 进行设置
	- 您可将 Github 帐户连接到 Branch 控制面板，更便于登录

- ### 配置结算
	- 点击 Branch 控制面板上的[账户配置](https://dashboard.branch.io/account-settings/user)
	- 设置 Branch 高级功能的结算信息

- ### 配置团队
	- 点击 Branch 控制面板上的[账户配置](https://dashboard.branch.io/account-settings/user)
	- 将团队成员添加并更新到 Branch 控制面板
		- 设置用户的[控制面板权限](/dashboard/access-level)

- ### 更改高级设置
	- 转到 Branch 控制面板上的[链接设置](https://dashboard.branch.io/link-settings)
	- 将`匹配类型`设置为`唯一或正常`（默认）
		- 推荐`正常`。选择`唯`一意味着，当明显的痕迹只有唯一一个的时候，Branch 才会通过安装匹配来建立一条深度链。例如，如果您和您的孪生手足都拥有相同操作系统/版本的 iPhone 5s 手机，并单击同一应用程序的不同链接，同时打开应用程序，在勾选了“唯一”选项的情况下，将无法创建深度链。因为这主要是针对非常特殊的情况，所以您可能不希望这类情况出现。
	- 将`持续时间`设置为秒
		- 持续时间是在打开应用程序或删除系统之前，`单击`在系统中停留的时间长短。修改该值将更改我们采集用户指纹的等待时间。如果在设定的持续时间内提取用户指纹，那么深度链数据将流入应用程序。默认有效时间为 2 小时（7200 秒）。
	- 设置 `UTM 标记`
		- 推荐`禁用`。如果您启用此模式，Branch 将根据 UTM 参数自动设置渠道、功能、方案、标记和 $关键字。这仅适用于动态创建的链接，而不适用于通过控制面板、API 或 SDK 生成的链接。

		| UTM 参数 | Branch 参数
		| --- | --- |
		| utm_source | 渠道
		| utm_medium | 功能
		| utm_campaign | 方案
		| utm_content | 标记
		| utm_term | 关键字（控制面板上不可见）

- ### 更改链接域
	- 转到 Branch 控制面板上的[链接设置](https://dashboard.branch.io/link-settings)

	- #### 使用 app.link 域
		- 了解[域变更提醒](#domain-change-warning)
		- 更改[链接设置](https://dashboard.branch.io/link-settings)或联系支持人员

	- #### 使用自定义子域
		- 了解[域变更提醒](#domain-change-warning)
		- 了解[自定义域提醒](#custom-domain-warning)
		- 了解[自定义域调试](#custom-domain-debugging)
		- 在[链接设置](https://dashboard.branch.io/link-settings)中，将链接域更改为自定义子域
		- 更新自定义子域中的 `CNAME` 记录
			- `CNAME` = `custom.bnc.lt`
		- 在[链接设置](https://dashboard.branch.io/link-settings)中，单击“确认”。
		- 如果您通过亚马逊云计算服务 (AWS) 的 Route 53 配置域，请确保在`注册域`选项卡下，而不是`托管区`部分编辑名称服务器

- #### 使用自定义根域
	- 了解[域变更提醒](#domain-change-warning)
	- 了解[自定义域提醒](#custom-domain-warning)
	- 了解[自定义域调试](#custom-domain-debugging)
	- 在[链接设置](https://dashboard.branch.io/link-settings)中，将链接域更改为自定义根域
	- 更新自定义根域上的 `NS` 记录
		- 这些值对每个 app 都是唯一的，例如：
			- `ns-1371.awsdns-43.org`
			- `ns-1695.awsdns-19.co.uk`
			- `ns-991.awsdns-59.net`
			- `ns-428.awsdns-53.com`
		- 单击[链接设置](https://dashboard.branch.io/link-settings)上的确认
		- 如果您通过亚马逊云计算服务 (AWS) 的 Route 53 配置域，请确保在`注册域`选项卡下，而不是`托管区`部分编辑名称服务器

## 故障排查

- ### 域变更提醒
	- 用于[更改链接域名](#change-link-domain)
	- 从 `app.link` 到 `app.link`
		- 您的旧版 `app.link` 深度链接将失效
		- 您的旧版 `app.link` 深度链接将跳转到文件未找到，应用程序无法打开。
		- [更新代码](#dialog-code?ios=configure-associated-domains&android=configure-app&adobe=configure-app&cordova=configure-app&mparticleAndroid=configure-app&mparticleIos=configure-associated-domains&titanium=configure-app&reactNative=configure-app&unity=configure-app&xamarin=configure-app)附加新的链接域后，可通过新版 `app.link` 深度链接打开您的应用程序
		- 如果您的旧版 `app.link` 仍然有效，建议您切换到`自定义链接域`
	- 从 `app.link` 到自定义链接域名
		- 您的旧版 `app.link` 深度链接仍然有效
		- [更新代码](#dialog-code?ios=configure-associated-domains&android=configure-app&adobe=configure-app&cordova=configure-app&mparticleAndroid=configure-app&mparticleIos=configure-associated-domains&titanium=configure-app&reactNative=configure-app&unity=configure-app&xamarin=configure-app)以附加新的链接域名后，可通过新版自定义链接域名深度链接打开您的应用程序
	- 从`自定义链接域名`到`自定义链接域名`
		- 您的旧版`自定义链接域名`深层链接将失效
		- [更新代码](#dialog-code?ios=configure-associated-domains&android=configure-app&adobe=configure-app&cordova=configure-app&mparticleAndroid=configure-app&mparticleIos=configure-associated-domains&titanium=configure-app&reactNative=configure-app&unity=configure-app&xamarin=configure-app)以附加新的链接域名后，可通过新版`自定义链接域名`深度链接打开您的应用程序
	- 从旧版 `bnc.lt` 到`自定义链接域名`
		- 您的 `bnc.lt` 和`自定义链接域名`深度链接均有效
		- [更新代码](#dialog-code?ios=configure-associated-domains&android=configure-app&adobe=configure-app&cordova=configure-app&mparticleAndroid=configure-app&mparticleIos=configure-associated-domains&titanium=configure-app&reactNative=configure-app&unity=configure-app&xamarin=configure-app)以附加新的链接域名后，可通过新版`自定义链接域名`深度链接打开您的应用程序

- ### 自定义域提示
	- 用于[更改链接域名](#change-link-domain)
	- 如果您要将自己的域用于深层链接，则自定义链接域的 `NS` 或 `CNAME` 记录将需要指向 Branch
	- 每当您更改域的 `NS` 或 `CNAME` 记录时，您将授权 Branch 成为您的域注册员并控制域，您将失去访问该`自定义根域或自定义子域`的权限。网页将变为空白，域的控制权将交由 Branch
	- Branch 将使用您的域来路由所有深层链接的流量。Branch 还将托管您的 AASA 文件和 SSL 证书
	- 如果您的`自定义根域中已`有在使用（例如：https://example.com/），Branch 建议使用未用过的`自定义子域`（例如 https://link.example.com/）

- ### 自定义域名调试
	- 用于[更改链接域名](#change-link-domain)
	- 您可以使用 `dig ns <domain>`  或 `dig cname <domain>` 测试域名更改记录
	- 我们建议您选择一个固定的域名或子域名用于Branch，切换可能会导致现有链接出现明显的问题
	- 如果您通过亚马逊云计算服务 (AWS) 的 Route 53 配置域名，请确保是在“注册域名”选项卡下，而不是在“托管区”部分编辑名称服务器
	- 您无法使用主网站域来托管 Branch 链接
	- 添加自定义链接域名时不要包含 `www`
	- 如果您已经为域名设置了 CAA 记录，请将 letsencrypt.org 添加到列表中

- ### 删除应用程序
	- 如果您前往`帐户设置`并选择删除应用程序，那么该操作将是永久性的更改。如果删除了 Branch 应用程序，请注意我们进行的以下操作。
		- 我们删除与该特定应用程序相关联的原始应用程序创建者的仪表板用户数据。仍然可以登录其他应用程序。
		- 您的链接将显示 404。
		- 所有（通过 SDK）对 API 的请求都将显示服务器错误。
		- 我们将不再跟踪归因和分析信息。
		- 所有数据馈送系统将停止发送数据（例如 webhook 和数据集成）。
