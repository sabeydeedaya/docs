概述
---

每天 Google 搜索都会推动 **更多应用程序安装** ，其安装数量要比所有 Facebook 付费安装产品总和还多。将您的移动网站访客转为原生应用程序用户是最有效的获取渠道之一，且利用 Branch 的 Journeys App Banners（路径图谱应用程序条幅广告）平台，您可以轻松实现此目标。

![图像](/_assets/img/pages/journeys/journeys-examples.png)

* **可定制化展示。** 专门针对智能条幅广告或全页插屏广告的所见即所得 \(WYSIWYG\) 设计编辑器，以及更多即将推出的新功能。
* **强大的定位规则。** 想要仅向尚未安装您的应用程序的访客显示您的路径？向所有日本的 iOS 用户显示？向只是查看了您的结帐页面的用户显示？向曾两次访问过您的网站并使用您的应用程序进行购买的 Android 用户显示？有无限种可能。
* **与 AMP 兼容。** [通过在 AMP 页面上显示 Journeys（路径图谱）](/web/amp-journeys/)，您可以将移动搜索流量转化到您的应用程序。
* **运行 A/B 测试。** 设计多个市场活动版本，便于查看哪些转化最有效。
* **优化的用户体验。** 如果已安装，您的应用程序将会打开，且用户可以直接路由到他们所期望的内容。否则，App Store/Play Store 将打开，用户仍可在安装后直接路由到他们所期望的内容。
* **全面的分析。** 衡量每次 Journeys（路径图谱）市场活动的下游成效和用户保留率。

\!\!\! 注意："付费产品"
Journeys（路径图谱）是一种按每月活跃用户定价的优质产品。[注册](https://branch.io/journeys/) Journeys（路径图谱）产品即可启用此功能。

\!\!\! 注意："先决条件"
您应该将 Branch SDK 集成到您的应用程序中，并为延迟深度链接和归因配置深度链路由后，再安装 Journeys（路径图谱）。

设置
---

\!\!\! 注意："将备用域纳入 Universal Links（通用链接）"
Journeys（路径图谱）会将备用域用于 Universal Links（通用链接）。请确保将您的 `xxxx-alternate.app.link`域纳入[关联域](/apps/ios/#configure-associated-domains)中。如果您将自定义域或子域用于 Branch 链接，则应改为对 `applinks:[mycustomdomainorsubdomain]` 和 `XXXX-alternate.app.link` 添加条目。如果不确定分配给 Branch 的 app.link 子域，请[联系支持人员](https://support.branch.io)，我们可以为您提供。

### 将 Branch 网站 SDK 添加到您的网站

在您网站上的 `<head></head>` 标签内的某个位置添加以下代码。我们建议尽早加载 SDK，以获得最佳的 Journeys（路径图谱）成效。有关此 SDK 的详细信息，请参见 [Github 自述文件](https://github.com/BranchMetrics/web-branch-deep-linking)。

```html
<script type="text/javascript">
{! partials/web-sdk-init.md!}
</script>
```

\{\! partials/replace\-branch\-key.md\!\}

\!\!\! 注意："GDPR 事项"
为了帮助我们的客户遵守 [GDPR](https://branch.io/gdpr/)，以及其他限制从特定用户收集数据的法律法规，我们已经将我们的网站 SDK 更新为[不跟踪模式](/web/integrate/#enable-do-not-track-mode)。这样，如果用户表示希望在您的网站上保持隐私性，或者您以其他方式确定不应跟踪特定用户，则可以继续使用 Branch 网站 SDK（例如，用于创建 Branch 链接），同时并不跟踪该用户。还可以在所有用户中为特定链接启用此设置，或在 Branch 链接中启用此设置。单击[此处](/web/journeys/#journeys-and-gdpr)了解有关该模式如何影响 Journeys（路径图谱）的方式的信息。

### 条幅广告或插屏广告中的深度链接

与所有 Branch 深度链一样，您可以通过在链接的[数据字典](/links/integrate/#configure-deep-links)中指定密钥来传递自定义参数。如果您在网站页面上显示具有等效应用程序内内容的智能条幅广告，这将非常有用，因为您可以在应用程序中直接路由到该内容。

本示例将在安装和打开应用程序后，将访客直接带到 ID 为 12345 的图片。

```javascript
branch.setBranchViewData({
    data: {
        '$deeplink_path': 'picture/12345',
        'picture_id': '12345',
        'user_id': '45123'
    }
});
```

或者，您可以根据加载的网站页面动态指定深度链路径。

```javascript
branch.setBranchViewData({
    data: {
        '$deeplink_path': window.location.pathname+ window.location.search+ window.location.hash,
'user_id': '45123'
    }
});
```

如果用户通过 Branch 链接被推荐到运行 Journeys（路径图谱）的页面，则推荐链接数据将在默认情况下传递到 Journeys（路径图谱）行动号召中。如果您使用 setBranchViewData\(\) 在该页面上为 Journeys（路径图谱）指定链接数据，则将会使用的来自 setBranchViewData\(\) 的唯一数据是[动态 Journeys（路径图谱）布局参数](/web/journeys/#dynamic-journeys-layout-customization)；该调用中的所有其他数据都将被忽略，除非在 `branch.init()` 中将 `make_new_link` 设置为 `true`。您可以在[此处](/web/journeys/#preserve-or-discard-referring-link-data)找到更多信息。

### 创建 Journeys 条幅广告或插屏广告

1. 前往 Branch 控制面板上的 [Journeys（路径图谱）页面](http://dashboard.branch.io/journeys)。
2. 单击 **Create New Journey（创建新路径）** 按钮即可开始。

![图像](/_assets/img/pages/journeys/create-journey-button.png)

1. 在 **Journey Name:（路径名称:）** 字段中，输入要用于内部引用的名称（这永远不会向您的用户显示）。

![图像](/_assets/img/pages/journeys/journeys-name.png)

### 选择受众

您可以通过选择目标平台和设备类型以及添加其他目标规则，来自定义将看到您的 Journey的受众。

![图像](/_assets/img/pages/journeys/journeys_select_audience.png)

|  选项   |                                    描述                                     |
|-------|---------------------------------------------------------------------------|
| 平台    | Branch 当前在 **移动网站** 这一平台上提供 Journeys（路径图谱）。这将在您的网站上向移动用户显示。 *即将提供更多选项。*   |
| 设备    | 哪些设备是您要锁定的目标？例如，如果您只有 iOS 应用程序，则可能只希望向在 iOS 上查看您的移动网站的用户显示 Journey（路径图谱）。 |
| 其他筛选器 | 请在[此处](/web/journeys/#advanced-audience-rules)阅读有关高级筛选条件的信息。              |

### 选择条幅广告或插屏广告并为其设置样式

1. 首先，单击 **Select a Template（选择模板）** 按钮。![图像](/_assets/img/pages/journeys/select-template.png)
2. 接下来，单击以选择要显示的模板类型。有三个模板选项：
   * 屏幕底部智能横幅广告。
   * 屏幕顶部智能横幅广告。
   * 全屏插播广告（对搜索引擎优化友好！）
   * *显示的第四个选项是备选预配置的全屏插播广告* ![图像](/_assets/img/pages/journeys/select-template-type.png)

3. 单击 **Customize（自定义）** ，对模板进行更改。
4. 在 **Customize Template（自定义模板）** 标题中，您可以编辑要用于内部引用的名称。
5. 单击预览中的任意对象以对其进行编辑。要查看有关所有自定义选项的文档，请[单击此处](/web/journeys/#template-customization-options)。
6. 完成后，单击 **Save & Close（保存并关闭）** 按钮继续操作。

**有关通用深度链接参数的注意事项** 如果您正在开展通用下载市场活动或网站范围的折扣优惠，则无论用户最初在您网站上的哪一个位置，都会转到应用程序内的同一个位置。您可以通过在[自定义模板选项](/web/journeys/#template-customization-options)时，为 **按钮** 元素设置 **深度链数据** 来配置此目标。

### 验证和测试

使用此屏幕，您可以预览 Journey变量，并可在发布之前对您的 Journey执行最终验证和测试。

![图像](/_assets/img/pages/journeys/validate-and-test.png)

#### 预览

使用下拉菜单在 Journey变量之间进行切换。

![图像](/_assets/img/pages/journeys/select-preview-variation.png)

要预览您的在线产品网站中的路径，请在 **Test on your mobile device（测试移动设备）** 字段中输入您的网站 URL，然后按 Copy（复制）按钮。 **您输入的 URL 必须集成了 Branch 网站 SDK，并使用了 Branch 密钥。**

![图像](/_assets/img/pages/journeys/test-on-device.png)

\!\!\! 提示"操作过程是怎样的？"
集成到网站中的 Branch SDK 可侦听由预览工具生成且唯一的一次性 URL 参数。它看起来有些像 `_branch_view_id=296449069883323397`。检测到此参数时，SDK 将加载特定路径的临时预览。此参数仅对您的 Branch 密钥有效，即使集成了 Branch SDK，也不适用于任何其他网站。

#### 验证

![图像](/_assets/img/pages/journeys/validation-messages.png)

您可能会遇到许多错误和警告。

#### 网站 SDK 错误

您必须在您的网站上安装网站 SDK，才能运行 Journey。

#### 应用程序 SDK 警告

如果您选择将 iOS 或 Android 用户锁定为目标用户，但尚未集成这些 SDK，那么您的 Journeys仍将显示在正确的设备上，且会将用户引导至您的应用程序。但是，您将无法获得 Journeys的任何安装或事件归因，并且无法将深度链用户引导至应用程序内的内容。请确保将 Branch SDK 集成到您的应用程序中。

#### 受众规则警告

如果您的受众规则加起来不到 100%，就会看到一条警告。如果小于 100%，其余的人看到的会是您网站没有Jounerys。您的 Journey仍将运行。

#### 高级帐户警告

如果您构建了包含仅限高级功能的 Journey，那么您将看到一条警告，因为某些功能仅可通过购买获得。

### 管理您的 Journeys App Banners（路径图谱应用程序条幅广告）

[Journeys Manager（路径图谱管理器）](https://dashboard.branch.io/journeys)是一个主页，可用来打造所有个性化体验。您可以打开、关闭和克隆 Journeys（路径图谱），或查看其成效。

![图像](/_assets/img/pages/journeys/journeys-manager.png)

Journey可能具有以下任意四种状态：

| 状态  |      意义       |      下一个阶段       |
|-----|---------------|------------------|
| 草稿  | 尚未发布且可编辑      | **有效**           |
| 有效  | 针对您的用户有效且可编辑  | **已停止**          |
| 已停止 | 针对您的用户无效，但可编辑 | **有效** 或 **已存档** |
| 已存档 | 针对您的用户无效，但可编辑 | *无*              |

您可以直接从创建流激活路径，也可以从 Journeys Manager（路径图谱管理器）中"Actions（操作）"菜单的 **Start（开始）** 处进行激活。

![图像](/_assets/img/pages/journeys/edit-journeys.png)

\!\!\! 提示"编辑实时 Journey（路径图谱）"

您可以编辑所有状态下的 Journeys）；但如果这样做，您的 Journeys的成效和分析结果可能会发生变化。如果您决定进行更改，我们建议您记下您所更改的内容以及进行更改的时间。

### 确定 Journeys（路径图谱）的优先级

使用 Journeys Priority View（路径图谱优先级视图），您可以在多个 Journeys（路径图谱） **重叠** 时设置其优先级。当一个人有资格看到多个 Journeys（路径图谱）时，它们会 **重叠** 。您可以为应当显示在最前面的 Journeys（路径图谱）设置高的优先级。

假设您有两个 Journeys可能会获得相同的受众。

1. 一个是在您的"鞋"类页面上推广优惠的半页插屏广告。
2. 另一个是应该向所有访客显示的智能条幅广告。

通常，您希望在"鞋"类页面上将插屏广告显示在智能条幅广告的前面（两部分受众重叠的情况下）。

要确定 Journeys的优先级，请通过单击切换按钮来切换到 Priority View（优先级视图）。

![图像](/_assets/img/pages/journeys/priority-view-toggle.png)

您现在位于 Priority View（优先级视图）。

1. 按照您所想要的显示顺序来拖放 Journeys。数字越小意味着优先级越高（即优先级为 1 的 Journey将会显示在优先级为 2 的 Journey前面）。

![图像](/_assets/img/pages/journeys/first-priority-view.png)

1. 单击 **Save（保存）** 按钮。

![图像](/_assets/img/pages/journeys/save-priority.png)

1. 您的 Journeys现在已设置好优先级。

![图像](/_assets/img/pages/journeys/final-priority-view.png)

\!\!\! 警告"注意"

    当您保存 Journeys（路径图谱）优先级时，**所有** Journeys（路径图谱）都将按照它们在表格中显示的顺序进行优先级排序。

有关更详细的 Journeys（路径图谱）优先级问题，请访问我们的 [Advanced（高级）部分](/web/journeys/#prioritization)。

### 查看 Journeys（路径图谱）成效

#### 分析和归因

Journeys（路径图谱）会映射到[标准 Branch 分析标签](/getting-started/configuring-links/#analytics-labels)：

* 所有 Journeys（路径图谱）：`功能` = `Journeys（路径图谱）`
* 每个 Journey（路径图谱）：`市场活动` = `[Journey （路径图谱）名称]`
* 单个模板：`标记` = `[模板名称]`（\+ 您在配置过程中指定的任何其他标记）

您可以通过从 Journeys Manager（路径图谱管理器）中的 actions（操作）菜单选择 **View Performance（查看成效）** ，来访问路径的成效。

![图像](/_assets/img/pages/journeys/view-performance.png)

#### 使用源分析

您还可以通过从 Branch 控制面板的 [Source Analytics（源分析）](http://dashboard.branch.io/analytics/source)页面中选择上述筛选器，来访问 Journeys（路径图谱）分析。

![图像](/_assets/img/pages/journeys/view-source-analytics.png)

##### 比较您所有的 Journeys（路径图谱）

1. 筛选依据：`功能` = `Journeys（路径图谱）`

##### 比较路径内的变量

1. 筛选依据：`功能` = `Journeys（路径图谱）`
2. 筛选依据：`市场活动` = `[路径名称]`

\!\!\! 提示"将 Journeys（路径图谱）事件归因为推荐链接"

    默认情况下，当用户通过 Branch 链接到达运行 Journeys（路径图谱）的页面时，与路径进行的任何交互（单击/安装/重新打开）便会归因于 Branch 推荐链接，而不是路径。[了解方法](/web/journeys/#preserve-or-discard-referring-link-data) 将此数据转而归因于路径。

高级
---

### 高级受众规则

您可以根据用户来自何处、他们是否已经安装了您的应用程序以及他们在您的网站或应用程序中所完成的操作等行为，在更精细的级别上定位用户。我们已在[下一个选项卡](/web/journeys/#examples)上创建了一系列极佳的示例。

![图像](/_assets/img/pages/journeys/advanced-audience-rules.png)

#### 已完成事件

如果设置了[自定义事件跟踪](/apps/ios/#track-events)，则可以根据您定义的事件定位用户。例如，您可能希望向上周内完成购买或将商品添加到购物车超过三次的用户显示路径。

#### 定位

使用此筛选器可以定位（或排除）在不同区域查看您网站的用户。按国家/地区、州/省或城市定位。

#### 查看页面 URL

您可以定义路径将会显示您网站的哪些子集。例如，可能您有页面 `yoursite.com/settings`和 `yoursite.com/products/1234`。您可以在此处填写`产品`，只有访问包含该子字符串的 URL 的用户才会看到路径。

#### 已访问网站

您可以在此处使用网站访问次数来定位目标人群。例如，您可能会决定访问过您网站五次的用户已准备好查看 Journey，并提供一些额外的奖励来激励其打开该应用程序。

#### 已访问应用程序

与访问过的网站类似，您可以按照应用程序访问次数来定位用户。例如，曾两次访问该应用程序并打开移动网站的用户可能会借由 Journey被吸引回该应用程序。

#### 已安装应用程序

您可以选择只向已安装应用程序的用户显示要求该用户打开应用程序的 Journey。

#### 已点击广告

当用户点击了[深度链传输](/deep-linked-ads/dynamic-product-feeds/)中的链接时，即会将其分组到"已点击广告"。

使用此筛选器可定位已参与广告市场活动的用户，进而提高投资回报率；如果他们还从未在应用程序中进行购买，也许特定的行动号召会激励其打开应用程序并购买。

技术定义是他们点击了链接，而此链接中包含广告网络在链接数据中的自定义 `$3p` 值，但您只需考虑链接的创建方式 \- 在这种情况下，请通过深度链传输来创建。

#### 已点击电子邮件

当用户点击了 [Universal Email（通用电子邮件）](https://dashboard.branch.io/email)中的链接时，即会将其分组到"已点击电子邮件"。

使用此筛选器可定位已参与电子邮件市场活动的用户；如果他们没有应用程序，但在移动网站上登录过，也许特定的行动号召会激励其下载应用程序。

技术定义是他们点击了链接，而此链接中包含电子邮件服务提供商在链接数据中的自定义 `$3p` 值，但您只需考虑链接的创建方式 \- 在这种情况下，请通过 Universal Email（通用电子邮件）集成。

#### 查看具有元数据键的页面

使用此筛选器可以定位查看包含某些指定元数据的网页的用户。可以在网页上的 HTML `<meta>` 标记中指定此数据，将其作为用于初始化 Branch 网站 SDK 的 `init()` 调用中的选项传递，或者在 Branch 网站 SDK 中使用 `track()` 调用传递。请注意，如果您选择使用 HTML `<meta>` 标记，则标记的格式应设置为 [Branch 承载的深度链数据](/web/hosted-data/#add-metatags-to-your-site)。

例如，您可以通过将此标记添加到页面的 HTML：`<meta name="branch:deeplink:foo" content="bar" />`，来定位那些访问包含元数据键"foo"和值"bar"的页面的用户。

或者通过使用以下选项对象，来初始化 Branch 的网站 SDK：

```javascript
branch.init( 'BRANCH_KEY',
    {
        metadata : {
            'foo' : 'bar'
        }
    }
);
```

或者，最终通过使用 track\(\) 调用[以编程方式触发要显示的路径](https://branchmetrics.github.io/docs/web/journeys/#trigger-a-journey-to-show-by-firing-an-event)：

```javascript
branch.track('pageview',
    {
        'foo' : 'bar'
    }
);
```

在页面的上述三个指定位置中的任意位置或所有位置指定元数据后，可以使用"Is viewing a page with metadata key（查看包含元数据键的页面）"受众筛选器来定位访问该页面的用户。如果在 `init()` 或 `track()` *以及* HTML `meta` 标记中指定了具有相同键的元数据，则传递到 `init()` 或 `track()` 中的元数据将具有优先级。

#### 已与路径交互

使用此筛选器可以定位以前已与特定 Journey交互的用户。选择 Journey、交互的类型以及发生交互的窗口。例如，您可以使用此筛选器仅向在过去 7 天内已解除不同 Journey（路径图谱 B）的用户显示 Journey（路径图谱 A）。

### 设置对比测试

使用此功能，您可以通过设计多个模板并为每个模板分配一定比例的受众来运行 A/B 测试。

1. 单击 **Add Variation（添加变量）** 按钮，可添加其他设计变量。![图像](/_assets/img/pages/journeys/add-variation.png)
2. 要删除不需要的变量，请单击 `-` 按钮。![图像](/_assets/img/pages/journeys/remove-variation.png)
3. 使用百分比字段来控制将看到每个变量的受众比例。![图像](/_assets/img/pages/journeys/multiple-templates.png)

\!\!\! 提示"变量显示限制"
每个路径最多可以有三个变量。您的分配百分比总计不得大于等于 **100%** 。您的分配百分比总计可能 *小于* **100%** 。在这种情况下，将会向您的其余受众显示您的标准网站，但没有路径。这样，您可以根据您的非 Journeys（路径图谱）网站体验进行 A/B 测试。

### 自动打开

您可以为已经将 Journeys 与应用程序一起安装的用户自动打开该应用程序。可以通过在模板编辑器中选择 CTA 找到此设置：

![图像](/_assets/img/pages/journeys/auto-open-find.png)

选中此框后，如果用户在您的网站上查看此 Journey变量，并且安装了应用程序，则无需单击，该应用程序即会自动打开。

![图像](/_assets/img/pages/journeys/auto-open.png)

在大多数情况下，自动打开应用程序是最佳的用户体验，因此默认情况下会对所有新模板选中此框。

\!\!\! 注意"网站 SDK 打开应用程序设置"
如果在网站 SDK 中使用 open\_app 设置，则此设置仍适用于旧的 Journeys（路径图谱）（早于 10 月 25 日）。对于所有新的 Journeys（路径图谱），模板设置将具有优先级。

\!\!\! 注意"应用程序内 Web 视图中的打开应用程序行为"
请避免在您自己的应用程序中的原生 Web 视图内，对网页使用 Branch 网站 SDK。自动打开 Branch 网站 SDK 可能会导致非预期的用户体验。

#### 在 iOS 上自动打开应用程序

模板编辑器中的自动打开设置适用于 iOS Chrome 和 Android。由于自动打开是由 URI 方案提供支持的，并且这些方案可能会导致没有安装应用程序的用户 iOS Safari 上出现错误消息，因此默认情况下并不会在 iOS 上启用。

如果您希望应用程序也能在 iOS Safari 上自动打开，则需要使用名为 `$uri_redirect_mode` 的设置。由于 Branch 具有大量与设备标识符绑定的 Cookie 池，因此当用户单击链接时，我们会知道您的应用程序是否已安装。我们使用此智能来确定何时使用 URI 方案。如果我们有用户安装您的应用程序的历史记录，我们将使用 URI 方案打开应用程序。

您可以[联系支持人员](https://support.branch.io/support/tickets/new)\{:target="\_blank"\} 以便在您的所有链接中启用此行为，也可以仅针对网站 SDK 中的 Journeys（路径图谱）进行设置：

    <script type="text/javascript">
    // load the Branch web lib
    (function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="build.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode banner closeBanner creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode".split(""), 0);
    // init Branch and pass in your preference to open the app
    branch.init('BRANCH_KEY');
    // Trigger your Journeys banner to use the correct redirect mode
    branch.setBranchViewData({
    '$uri_redirect_mode': 1
    });
    </script>

或者，通过添加深度链数据 `$uri_redirect_mode:1`，为单个模板进行设置：

![图像](/_assets/img/pages/journeys/uri-redirect-mode.png)

[阅读我们的博客](https://blog.branch.io/making-uri-schemes-great-again-uri_redirect_mode/) \{:target="\_blank"\}，了解更多有关在 iOS 上实现 URI 方案的重重挑战和 URI 重定向模式功能的信息。

### 解除设置

在某些情况下，您的用户可能希望解除您的 Journeys （通过单击 "x" 或相关 Journeys 中的解除文本），而不是简单地将其忽略。为了确保您的用户在获得最佳体验的同时，也能以最高的比率进行转化，您可以调整 Journeys 的解除设置。您可以通过导航到 Dismissal Settings（解除设置）选项卡，在设置模板时访问这些设置。在该选项卡中，您可以控制许多设置：

#### 解除行为

选择当用户解除 Journey时发生的情况。"Close Journey（关闭路径图谱）"只会导致 Journey在解除后关闭；"Redirect to a web page（重定向到网页）"将导致 Journey关闭并重定向到您选择的网页。

#### 解除时段

首先，使用下拉列表选择 Journeys 应被解除的时长。接下来，要决定解除此 Journeys 的操作只会在所选择的解除期内解除该 Journey，还是期间内的所有 Journey均会被解除。

![图像](/_assets/img/pages/journeys/dismissal_settings.png)

### 保留或放弃推荐链接数据

默认情况下，当用户通过 Branch 链接到达运行 Journeys（路径图谱）的页面，而 `make_new_link` 未设置为 `true` 时，与路径进行的任何交互（单击/安装/重新打开）便会归因于 Branch 推荐链接，而不是路径。如果 `make_new_link` 设置为 `true`，则相同的事件将改为归因于路径。

即便用户没有直接从这些链接进行安装，这也可以帮助您收集有关推荐链接如何有助于应用程序增长/参与的数据。例如，如果用户点击了 Facebook 上的 Branch 链接并登陆到您的网站上，还从 Journey（路径图谱）进行了安装，您便可以将此安装归因于 Facebook 上的链接。如果原始链接也配置为您的应用程序中的深度链，则该深度链也将予以保留。

默认情况下，Branch 会将推荐链接传递到 Journeys（路径图谱）。为了放弃推荐链接数据，在初始化过程中会将 `make_new_link` 标志连同值 `true` 一起纳入到选项中：

```javascript
branch.init( 'BRANCH_KEY',
    {
        'make_new_link' : true
    }
);
```

### 优先级

#### 我的 Journeys（路径图谱）优先级规则何时适用？

优先级仅在两个 Journeys（路径图谱）重叠时生效。如果您有一个 Journey（路径图谱）以 iOS 用户为目标，而另一个 Journey（路径图谱）以 Android 用户为目标，那么优先级并不重要。如果您将最初以 iOS 为目标的 Journey（路径图谱）更新为现在要以 iOS 和 Android 用户为目标，则更高优先级的 Journey（路径图谱）将向 Android 用户显示。

#### 如果用户解除条幅广告或插屏广告会发生什么情况？

当用户解除条幅广告或插屏广告时，该条幅广告或插屏广告将在路径的[解除设置](/web/journeys/#dismissal-settings)中指定的时间内遭到解除。

如果 Journey（路径图谱）已配置为在遭解除时解除所有 Journeys（路径图谱），则在解除期内不会向用户显示其他 Journey（路径图谱）。如果 Journey（路径图谱）已配置为在遭解除时仅解除该 Journey（路径图谱），则其他 Journeys（路径图谱）将会向用户显示（如适用）。

#### 为什么必须设置 Stopped Journeys（已停止路径图谱）和 Draft Journeys（草稿路径图谱）的优先级？

我们要求您设置所有非存档 Journeys（路径图谱）的优先级，因为 Journeys（路径图谱）可以从 *草稿* 或 *已停止* 模式设置为实时。

#### 如果我有一部分 Journeys（路径图谱）已设置优先级，而另一部分没有，会发生什么情况？

我们建议为所有 Journeys（路径图谱）设置优先级。您创建的所有新 Journeys（路径图谱）将自动拥有分配给它们的最低优先级，并且 *没有优先级* 的 *草稿* 或 *已停止* Journeys（路径图谱）会设置为实时（拥有优先级的 Journeys（路径图谱）不会更改其优先级，除非您进行明确设置）。如果您没有为所有 Journeys（路径图谱）设置优先级，则系统会随机挑选任何没有优先级的匹配路径（例如，通过您设置的受众筛选器的 Journeys（路径图谱））并加以显示。

### 计划时间

您可以设置 Journey（路径图谱）变为活动状态并对用户可见的时间，也可以设置不再显示的时间。您还可以定期计划 Journeys（路径图谱）的时间。

您可以从 **Validate & Test（验证和测试）** 步骤或直接从 Journeys（路径图谱）管理器页面上的操作菜单访问此功能。

![图像](/_assets/img/pages/journeys/schedule-action.png)

\!\!\! 示例"示例：计划路径的时间"
假设您希望在 11 月份向用户显示路径，如果用户下载了您的应用程序，将有 25% 的销售额要归因于广告。您可以将其设置为 11 月 1 日凌晨 12 点开始，在 12 月 1 日凌晨 12 点结束：

    ![image](/_assets/img/pages/journeys/schedule-modal.png)

\!\!\! 示例"示例：定期计划时间"
假设您有一个节目要在每个星期日的晚上 9 点到 10 点播出，而您想鼓励用户在这段时间内在从应用程序中观看剧集。您可以将开始时间设置为在即将到来的星期日的晚上 9 点，将停止时间设置为当天晚上 10 点，然后将其设置为每周重复一次：

    ![image](/_assets/img/pages/journeys/schedule-modal-recurring.png)

#### 计划时间常见问题解答

1. **已计划了时间的路径何时变为活动状态或停止？** 从计划的时间到您的路径变为活动状态或停止之间，最多可以有 5 分钟的延迟。
2. **如何设置具有定期计划时间的路径的结束日期？** 目前计划时间不支持此操作。要执行此操作，请为您的路径设置开始和停止时间，并添加重复规则。当您希望路径永久停止时，请从操作菜单或 Edit Schedule（编辑计划时间） > Delete（删除）停止。

### 动态 Journeys（路径图谱）布局自定义

我们现在支持使用案例，您可以根据推荐网络会话的链接自定义 Journey（路径图谱）的外观。因此，您可以创建一个 Branch 链接，其中包含一组定义的键和值，这些键和值将在用户从此链接推荐到您的网站时更改属性（例如，标题或图像）。

|                     **链接数据密钥** |          **值**           |            **示例值**             |
|-------------------------------:|--------------------------|--------------------------------|
| `$journeys_button_get_has_app` | 当前安装应用程序时的行动号召按钮         | "Open App"                     |
|  `$journeys_button_get_no_app` | 当前 **未** 安装应用程序时的行动号召按钮。 | "Install App"                  |
|              `$journeys_title` | Journey（路径图谱）的标题或主要文本    | "Download Appsolutely today"   |
|        `$journeys_description` | 这是框架中的描述或副标题             | "This app is disrupting apps"  |
|     `$journeys_icon_image_url` | 应用程序图标显示在布局中             | "https://mysite.com/image.png" |

请注意，并非所有模板都支持全部重写键。例如，浮动按钮不支持标题、描述或图标图像 URL（浮动按钮将支持下面详细介绍的自定义流标记）。如果要呈现模板，但您指定的键不存在，则我们只需要在呈现模板时忽略它。

#### 动态 Journeys（路径图谱）布局自定义的自定义标记

除了使用[预定义的键](/web/journeys/#dynamic-journeys-layout-customization)（例如，$journeys\_title）动态自定义路径的外观/内容外，还可以使用自定义流标记。在设置 Journeys（路径图谱）模板时，可以在视图编辑器和 CSS 编辑器中插入自定义标记。然后，您便可以使用 `setBranchViewData()` 动态地为这些标记提供值。您也可以在具有 [Branch 元标记](/web/hosted-data/#add-metatags-to-your-site)的页面上静态嵌入这些值。

**请注意，如果您在模板中包含自定义流标记，并在`setBranchViewData()` 中也为预定义的键（例如，$journeys\_title）设置了值，则预定义键的值将优先。**

自定义流标记的格式如下所示。请注意，必须为包含的每个自定义标记指定默认值：

    {{ key_name | default_value }}

例如，如果要在 CSS 中添加自定义流标记以动态控制其中一个 Journeys（路径图谱）标题的字体大小，则可以使用如下所示的标记：

    {{ fontSize | 12px }}

![图像](/_assets/img/pages/journeys/custom-tags-1.png)

如果要在模板文本中添加自定义流标记，则可以使用如下所示的标记：

    {{ adjective | best }}

![图像](/_assets/img/pages/journeys/custom-tags-2.png)

接下来，要动态更新"fontsize"和"adjective"变量的值，则可以使用 `setBranchViewData()` 为这些变量设置值：

    branch.setBranchViewData({
        data: {
            'fontSize': '20px',
            'adjective': 'most entertaining',
        }
    });

或者，您可以通过在页面上嵌入 Branch 元标记来设置值：

    <meta name="branch:deeplink:fontSize" content="20px" />
    <meta name="branch:deeplink:adjective" content="most entertaining" />

### 客户端 Javascript Journeys（路径图谱）控件

有许多客户端 API 可帮助您构建高质量的用户体验。请参见以下内容：

#### 使用 Javascript 阻止路径显示

您可以通过在初始化过程中将 `no_journeys`（值为 `true`）插入到选项中，从而防止 Journeys（路径图谱）显示在特定页面上。

    <script type="text/javascript">
    //加载 Branch SDK 文件
    branch.init('BRANCH_KEY',
    {
          'no_journeys': true
        }
    );
    </script>

### 以编程方式关闭路径

Journeys（路径图谱）中包含用户可以单击的关闭按钮，但您可能希望通过超时或通过与 Web 应用程序的其他用户交互来关闭 Journey（路径图谱）。在这种情况下，通过调用下列内容即可关闭 Journey（路径图谱），操作非常简单：

```javascript
branch.closeJourney(function(err) { console.log(err);});
```

### 通过触发事件来触发要显示的路径

如果您通过上述其中一个调用阻止或以编程方式关闭 Journey（路径图谱），则可以通过触发以下事件来触发要显示的 Journey（路径图谱）：

```Javascript
branch.track('pageview');
```

**注意：** 如果用户在过去已关闭路径，则触发上述事件不会覆盖用户的首选项。

### 禁用 Journeys（路径图谱）动画

当您要使用 Branch 的网站 SDK 调用 init\(\) 或 track\(\) 时，您可以通过设置 `disable_entry_animation` 和 `disable_exit_animation` 这两个标志来禁用页面上的 Journeys（路径图谱）动画。

为了减少在页面上加载路径所需的时间，您可以禁用 Journeys（路径图谱）动画。在 Journeys（路径图谱）动画可能不太和谐的情况下，为了改善单页网站应用程序上的 Journeys（路径图谱）用户体验，也可以禁用这些动画。在单页网站应用程序的多个 Journeys（路径图谱）之间切换时，请记住使用 [setBranchViewData\(\)](/web/journeys/#deep-linking-from-the-banner-or-interstitial) 来更改 CTA 后面的链接。

要在初始化过程中禁用动画，请在选项中插入 `disable_entry_animation` 和/或 `disable_exit_animation`（值均为 `true`）：

```javascript
branch.init('BRANCH_KEY',
    {
        'disable_entry_animation' : true,
        'disable_exit_animation' : true
    }
);
```

要使用 track\(\) 禁用动画，请在事件元数据中插入 `disable_entry_animation` 和/或 `disable_exit_animation`（值均为 `true`）：

```javascript
branch.track(
    'pageview',
    {},
	{
	    'disable_entry_animation' : true,
        'disable_exit_animation' : true
    }
);
```

### 侦听 Journeys（路径图谱）生命周期事件

通过注册如下所示的侦听器函数，您可以轻松侦听 Journeys（路径图谱）生命周期事件：

```javascript
var listener = function(event, data) { console.log(event,data); }

//指定要侦听的事件
branch.addListener('willShowJourney',listener);

//侦听所有事件
branch.addListener(listener);
```

|        侦听器名称         |                描述                |
|----------------------|----------------------------------|
| willShowJourney      | Journey（路径图谱）即将显示。               |
| didShowJourney       | Journey（路径图谱）的入口动画已经完成，正在向用户显示。  |
| willNotShowJourney   | Journey（路径图谱）将不会显示，也不会产生任何其他事件。  |
| didClickJourneyCTA   | 用户点击了 Journey（路径图谱）的 CTA 按钮。     |
| didClickJourneyClose | 用户点击了 Journey（路径图谱）的关闭按钮。        |
| willCloseJourney     | Journeys（路径图谱）关闭动画已开始。           |
| didCloseJourney      | Journey（路径图谱）的关闭动画已经完成，用户将无法再看到。 |

### Journeys（路径图谱）文本本地化

#### 客户端

您可以使用 `setBranchViewData` 并通过阅读浏览器的语言，轻松地动态自定义客户端路径文本。

```javascript
var lang_code;
if (navigator.languages && navigator.languages.length>0){
    lang_code = navigator.languages[0];
} else if (navigator.language) {
    lang_code = navigator.language;
}

// 如果语言为西班牙文 (ES)，则更改 Journeys（路径图谱）文本
if (lang_code == 'es') {
    branch.setBranchViewData(
{
            data: {
                 "$journeys_title": 'Mi App',
                 "$journeys_description": 'Mi descripción',
                 "$journeys_button_get_has_app": 'Avrir',
                 "$journeys_button_get_no_app": 'Ver',
             }
         }
    );
}
```

#### 服务器端

Journeys（路径图谱）现在有了一个完整的本地化框架服务器端。由于此产品的复杂性，我们不会将其直接向合作伙伴揭示。请联系您的客户经理或 [integrations@branch.io](mailto:integrations@branch.io) 以获得对此功能的访问权。

### CSS 编辑器

如果您有一个已升级的高级帐户，除了可以使用所见即所得视图编辑器 \(WYSIWYG View Editor\) 外，还可以直接修改 CSS 代码。要执行此操作，请转到 **Configure Views（配置视图）** 步骤，单击以编辑模板，然后选择 **Customize Template（自定义模板）** 屏幕上的 **CSS Editor（CSS 编辑器）** 选项卡。

![图像](/_assets/img/pages/journeys/view-css-editor.png)

#### 添加第二行文本

通过向 CSS 元素添加文本，您可以在之前或之后向路径添加第二行文本：

* 之前

    branch-banner .branch-banner-description::before

    { display: block; content: 'Chat with other Fans'; }

* 之后

    #branch-banner .branch-banner-description::after

    { display: block; content: 'Watch in Dark Mode'; }

#### 自定义 Journeys（路径图谱）的字体

1. 转到 [Google Fonts（Google 字体）](https://fonts.google.com/)并选择字体。

![图像](/_assets/img/pages/journeys/font_embedding.png)

1. 将其添加到 Journeys（路径图谱）中的 CSS 编辑器。请注意：@import 行上的拖尾分号很重要。如果 Google 字体无法加载，使用回退 Web 字体总是有备无患。

![图像](/_assets/img/pages/journeys/custom_font.png)

### 模板自定义选项

自定义选项是否可用取决于所选的模板：

* [智能条幅广告](/web/journeys/#smart-banner)
* [全屏插播广告](/web/journeys/#full-screen-interstitial)
* [半页插屏广告](/web/journeys/#full-screen-interstitial)
* 浮动按钮

#### 智能条幅广告

对于屏幕顶部和底部的条幅广告而言，可用的配置选项均相同。

##### 背景

![图像](/_assets/img/pages/journeys/customize-banner-background.png)

|  选项  |            用途             |
|------|---------------------------|
| 文本颜色 | 为没有特定设置的元素指定文本颜色。 *当前未使用* |
| 背景颜色 | 设置条幅广告的背景颜色               |

##### 标题

![图像](/_assets/img/pages/journeys/customize-banner-title.png)

|  选项  |       用途        |
|------|-----------------|
| 格式化栏 | 标题文本的所见即所得样式    |
| 标题   | 标题的文本。最多 35 个字符 |

##### 描述

![图像](/_assets/img/pages/journeys/customize-banner-description.png)

|  选项  |           用途           |
|------|------------------------|
| 格式化栏 | 描述文本的所见即所得样式           |
| 描述   | 描述的文本。最多 60 个字符，将换行为两行 |

##### 评级

![图像](/_assets/img/pages/journeys/customize-banner-rating.png)

|   选项   |                      用途                      |
|--------|----------------------------------------------|
| 格式化栏   | 星级评定的所见即所得样式。主要用于更改颜色                        |
| 星级评定计数 | 在 App Store/Play Store 上评级时平均给的星数。我们建议您如实评级！ |

##### 评论

![图像](/_assets/img/pages/journeys/customize-banner-reviews.png)

|  选项  |                    用途                     |
|------|-------------------------------------------|
| 格式化栏 | 评论计数的所见即所得样式                              |
| 评论   | App Store/Play Store 上的应用程序评论数。我们建议您如实评论！ |

##### 按钮

![图像](/_assets/img/pages/journeys/customize-banner-button.png)

|  选项   |                                        用途                                         |
|-------|-----------------------------------------------------------------------------------|
| 文本颜色  | 更改按钮文本和按钮轮廓的颜色                                                                    |
| 背景颜色  | 更改按钮背景的颜色                                                                         |
| 按钮文本  | 更改应用程序已安装和未安装时显示的文本。                                                              |
| 渠道    | 设置附加到按钮的 Branch 链接的 **[渠道](/links/integrate/#analytical-labels)** 。例如，`网站`        |
| 标记    | 设置附加到按钮的 Branch 链接的 **[标记](/links/integrate/#analytical-labels)** 。例如，`购买`和`秋季降价` |
| 深度链数据 | 插入深度链数据和高级链接控制参数。可以包含任何 [Branch 链接参数](/links/integrate/#configure-deep-links)     |

##### 解除

![图像](/_assets/img/pages/journeys/dismissal_banner.png)

|  选项  |      用途      |
|------|--------------|
| 格式化栏 | 解除按钮的所见即所得样式 |

##### 应用程序图标

![图像](/_assets/img/pages/journeys/customize-banner-icon.png)

|   选项   |         用途          |
|--------|---------------------|
| 应用程序图标 | 输入应用程序图标的 URL，或上传图像 |

#### 全屏插播广告

##### 背景

![图像](/_assets/img/pages/journeys/customize-fullpage-background.png)

|  选项  |            用途             |
|------|---------------------------|
| 文本颜色 | 为没有特定设置的元素指定文本颜色。 *当前未使用* |
| 背景颜色 | 设置插屏广告的背景颜色               |
| 背景   | 输入背景图形的 URL，或上传图像         |
| 图像位置 | 控制背景图形的垂直对齐               |
| 内容位置 | 控制内容块的垂直对齐                |

| 图像位置 |        用途         |
|------|-------------------|
| 顶部   | 固定到屏幕顶部，缩放到全屏宽度   |
| 中心   | 固定到屏幕中央，缩放到全屏宽度   |
| 底部   | 固定到屏幕底部，缩放到全屏宽度   |
| 覆盖   | 锚定到屏幕顶部，缩放以填充整个屏幕 |

内容块包含除背景图像以外的所有内容。此块 *内* 的尺寸是预设的，不能修改。

| 内容位置 |              用途               |
|------|-------------------------------|
| 顶部   | 固定到屏幕顶部                       |
| 中心   | 固定到"安全"屏幕高度的中心（考虑到浏览器控件和设备尺寸） |
| 底部   | 固定到"安全"屏幕高度的底部（考虑到浏览器控件和设备尺寸） |
| 自定义  | 按相对百分比定位。请务必测试相应的实际情况对齐       |

##### 标题

![图像](/_assets/img/pages/journeys/customize-fullpage-title.png)

|  选项  |           用途           |
|------|------------------------|
| 格式化栏 | 标题文本的所见即所得样式           |
| 标题   | 标题的文本。最多 35 个字符，将换行为多行 |

##### 描述

![图像](/_assets/img/pages/journeys/customize-fullpage-description.png)

|  选项  |           用途           |
|------|------------------------|
| 格式化栏 | 描述文本的所见即所得样式           |
| 描述   | 描述的文本。最多 60 个字符，将换行为多行 |

##### 按钮

![图像](/_assets/img/pages/journeys/customize-fullpage-button.png)

|  选项   |                                        用途                                         |
|-------|-----------------------------------------------------------------------------------|
| 文本颜色  | 更改按钮文本和按钮轮廓的颜色                                                                    |
| 背景颜色  | 更改按钮背景的颜色                                                                         |
| 按钮文本  | 更改应用程序已安装和未安装时显示的文本。                                                              |
| 渠道    | 设置附加到按钮的 Branch 链接的 **[渠道](/links/integrate/#analytical-labels)** 。例如，`网站`        |
| 标记    | 设置附加到按钮的 Branch 链接的 **[标记](/links/integrate/#analytical-labels)** 。例如，`购买`和`秋季降价` |
| 深度链数据 | 插入深度链数据和高级链接控制参数。可以包含任何 [Branch 链接参数](/links/integrate/#configure-deep-links)     |

##### 解除

![图像](/_assets/img/pages/journeys/dismissal_interstitial.png)

|         选项         |                 用途                  |
|--------------------|-------------------------------------|
| 解除 Journey（路径图谱）配置 | 选择用户是否应该能够通过按钮和/或文本解除 Journey（路径图谱） |
| 解除文本               | 显示用户希望继续访问移动网站而不是下载应用程序的文本。         |
| 格式化栏               | 解除按钮和文本的所见即所得样式                     |

### 使用免费帐户时应用程序的限制

* 可以使用所有功能在 **草稿** 模式下创建任意数量的 Journeys（路径图谱）。
* 启用仅限高级功能时，将会显示升级邀请
* 在任何时候，只有一个使用智能条幅广告模板（顶部或底部位置）的路径可以处于 **活动** 状态。
* 要启用不同的路径，必须首先将当前活动的路径置于 **已停止** 模式。
* 在应用程序升级之前，任何使用仅限高级功能的路径都不能置于 **活动** 状态。

不使用 Journeys（路径图谱）的网站到应用程序路由
----------------------------

如果您维护移动网站，Branch 可让您将移动访客直接深度链接到您的应用程序中，或者轻松地自动为他们提供下载选项。

### 打开应用程序（如果已安装）

在您的网站上 `<head></head>` 标记内的某个位置添加以下代码，并自定义[链接参数](/links/integrate/#configure-deep-links)以满足您的需求。

\!\!\! 提示
使用此脚本能够将很多 Branch 重定向逻辑移动到您自己页面上的 Javascript，从而可在页面加载时有效地"单击 Branch 链接"。

```javascript
<script type="text/javascript">
//加载 Branch SDK 文件
{! partials/web-sdk-init.md!}
// 定义 deepview 结构
branch.deepview(
{
      'channel': 'mobile_web',
      'feature': 'deepview',
      data : {
        '$deeplink_path': 'page/1234',
        'user_profile': '7890',
        'page_id': '1234',
        'custom_data': 1234
      }
    },
    {
      'open_app': true  //如果为 true，则在页面加载时，Branch 会尝试立即打开应用程序。如果为 false，用户需要按下一个按钮。默认为 true
    }
);
</script>
```

\{\! partials/replace\-branch\-key.md\!\}

### 添加安装行动号召

使用页面上的按钮或超链接，触发 `branch.deepviewCta()`函数。如果执行此函数（无论是通过按钮、链接还是其他方法），便会"单击"您使用上述 `branch.deepview()`定义的链接。

|     平台     |                                                         行动号召的结果                                                         |
|------------|-------------------------------------------------------------------------------------------------------------------------|
| 移动，已安装应用程序 | 打开应用程序，直接深度链接到内容。这是一项防故障操作，以防页面加载的"链接单击"未正确触发。                                                                          |
| 移动，未安装应用程序 | 打开应用程序的 App Store 或 Play Store 页面，下载后会直接深度链接到内容。                                                                        |
| 桌面         | 重定向到 `deepview()` 调用中指定的 `$desktop_url`，或从 [Link Settings（链接设置）](https://dashboard.branch.io/link-settings)回退到默认网站 URL。 |

下面介绍了如何添加简单的超链接行动号召：

```html
<a id='downloadapp' onclick='branch.deepviewCta()'>在应用程序中查看</a>
```

故障排查
----

### 对 \[branchsubdomain\] 的调用遭到阻止

\{\! ingredients/branchsubdomain.md\!\}

请确保将 `[branchsubdomain]` 添加到页面的 CSP 标头。因为我们发现部分浏览器试图彻底阻止它。那么您可以从 Web 服务器的 HTTP 标头中提供，也可以向网站添加一个简单的元标记，如下所示：

```html
<meta http-equiv="Content-Security-Policy" content="default-src https://[branchsubdomain]; child-src 'none'; object-src 'none'">
```

### 非移动优化网站

由于您的网站未进行移动优化，因此在您不使用移动 viewport 标记 \(`<meta name="viewport" content="width=device-width initial-scale=1, maximum-scale=1, user-scalable=no">`\) 的情况下，Journeys（路径图谱）会看起来缩小了，且有点奇怪。别担心，我们为您提供解决方案：

1. 按您希望在网站上呈现的样子来设计条幅广告
2. 转到 CSS 编辑器并滚动到 CSS 代码的底部
3. 向 \#branch\-banner 选择器添加两个属性
   * `height: 228;`
   * `zoom: 3;`

在编辑器视图中，图像将无法正常缩放。这是因为控制面板已经过移动优化。请使用验证页上的预览测试链接，确保条幅广告看起来正确无误

### 防止顶部条幅广告和固定导航栏之间的重叠

* 导航到[控制面板 Journey（路径）页面](https://branch.dashboard.branch.io/web/journeys)

* 选择 Journey \-> Edit \-> Configure Views \-> Banner \-> Page Placement（Journeys（路径图谱） \-> 编辑 \-> 配置视图 \-> 条幅广告 \-> 页面放置）

* Banner Scroll = `sticky`

* 按 `Save & Close（保存并关闭）`

* 在导航中添加以下 div

  ```html
  <div class="branch-journeys-top"></div>
  ```

  ![图像](/_assets/img/pages/journeys/sticky.png)

示例
---

### 示例受众

Journeys（路径图谱）受众工具功能非常强大，但有时几个示例可有助于启发您的创造力。这里有几个常见的受众使用案例，可帮助您入门。

1. [新用户](/web/journeys/#example-new-users)
2. [忠实用户](/web/journeys/#example-loyal-users)
3. [重新定位已执行某些操作的用户](/web/journeys/#example-retargeting-users)
4. [来自 Google 的用户（搜索引擎优化）](/web/journeys/#example-seo-friendly)
5. [来自英语国家/地区的 iOS 用户](/web/journeys/#example-english-speaking-ios-users)

所有这些示例都要求您配置高级受众规则，这是一项高级功能。您可以使用以下按钮添加任何一组复杂的规则：

![图像](/_assets/img/pages/journeys/examples/advanced_add_filter.png)

#### 新用户

在此示例中，您将配置受众，以定位历史记录中访问网站 **少于 3 次** 的用户。访问次数超过 3 次的任何用户都将被排除在外。首先，您将在"advanced（高级）"部分中为 `Has visted web（已访问网站）`添加一个新规则。

![图像](/_assets/img/pages/journeys/examples/new_users_0.png)

接下来，您将选择中间部分的 `Less than or equal to（小于或等于）`：

![图像](/_assets/img/pages/journeys/examples/new_users_1.png)

最后，您将在最后一部分输入 2，以表示您希望定位历史记录中访问少于 3 次的用户。

![图像](/_assets/img/pages/journeys/examples/new_users_2.png)

保存并继续！

#### 忠实用户

在此示例中，您将配置受众，以定位历史记录中访问网站 **超过 4 次** 的用户。访问次数少于 4 次的任何用户都将被排除在外。首先，您将在"advanced（高级）"部分中为 `Has visted web（已访问网站）`添加一个新规则。

![图像](/_assets/img/pages/journeys/examples/new_users_0.png)

接下来，您将选择中间部分的 `More than or equal to（大于或等于）`：

![图像](/_assets/img/pages/journeys/examples/loyal_users_1.png)

最后，您将在最后一部分输入 5，以表示您希望定位历史记录中访问超过 4 次的用户。

![图像](/_assets/img/pages/journeys/examples/loyal_users_2.png)

保存并继续！

#### 重新定位用户

在此示例中，您将配置受众，以定位在过去或当前会话中在您的网站上完成某些操作的用户。例如，如果用户在购物车中添加了某些商品或之前已完成购买，您可以使用要下载的自定义行动号召来重新定位这些用户。我们将在示例中使用一个名为 `MyAction` 的常规事件。首先，您将在"advanced（高级）"部分中为 `Has completed event（已完成事件）`添加一个新规则。

![图像](/_assets/img/pages/journeys/examples/retargeting_users_0.png)

在下一个下拉列表中，您将选择要重新定位的自定义事件。我们将在此处使用一个名为 `MyAction` 的常规事件，但您将选择 `Purchase（购买）`或对您的使用案例更有意义的内容。

![图像](/_assets/img/pages/journeys/examples/retargeting_users_1.png)

接下来，您将选择中间部分的 `More than or equal to（大于或等于）`：

![图像](/_assets/img/pages/journeys/examples/retargeting_users_2.png)

最后，您将在最后一部分输入 3，以表示您希望定位历史记录中已完成 `MyAction` 超过 2 次的用户。

![图像](/_assets/img/pages/journeys/examples/retargeting_users_3.png)

保存并继续！

#### 对搜索引擎优化友好

Google 最近宣布，将开始惩罚那些从搜索中获得用户时显示全页插屏广告的网站。正因为如此，您可能需要以对待任何其他来源之外流量的不同方式来处理 Google 搜索流量。在此示例中，您将设置特定于来自 Google 用户的受众。首先，您将在"advanced（高级）"部分中为 `Came directly from a url（直接来自 URL）`添加一个新规则。

![图像](/_assets/img/pages/journeys/examples/seo_friendly_0.png)

接下来，您将选择中间部分的 `starts with（开头）`，以与子字符串匹配：

![图像](/_assets/img/pages/journeys/examples/seo_friendly_1.png)

最后，您将输入 `google.com` 以定位来自 Google 搜索的用户（其中，访问来源以 google.com 开头）：

![图像](/_assets/img/pages/journeys/examples/seo_friendly_2.png)

或者，您也可以定位并非来自 Google 搜索的用户（其中，访问来源不以 google.com 开头）：

![图像](/_assets/img/pages/journeys/examples/seo_friendly_3.png)

#### 示例：讲英语的 iOS 用户

在此示例中，您将受众限制为以英语为母语的国家/地区中使用 iOS 操作系统的用户。请注意，这不是在高级受众部分，而是在顶部部分。首先，请选择移动操作系统复选框中的 `iOS`。

![图像](/_assets/img/pages/journeys/examples/ios_english_0.png)

接下来，浏览并选择以下国家/地区：`美国`、`加拿大`、`英国`和`澳大利亚`。

![图像](/_assets/img/pages/journeys/examples/ios_english_1.png)

保存并继续！

Journeys（路径图谱）和 GDPR
--------------------

为了帮助我们的客户遵守 [GDPR](https://branch.io/gdpr/)，以及其他限制从特定用户收集数据的法律法规，我们已经将我们的网站 SDK 更新为[不跟踪模式](/web/integrate/#enable-do-not-track-mode)。这样，如果用户表示希望在您的网站上保持隐私性，或者您以其他方式确定不应跟踪特定用户，则可以继续使用 Branch 网站 SDK（例如，用于创建 Branch 链接），同时并不跟踪该用户。还可以在所有用户中为特定链接启用此设置，或在 Branch 链接中启用此设置。

如果启用该模式，您仍然可以向用户显示部分 Journeys（路径图谱）。Journeys（路径图谱）是否会在"不跟踪"模式下向用户显示，取决于您为路径定义的定位条件。如果路径使用以下任何受众筛选器，则 *不会* 在"不跟踪"模式下向用户显示。否则，将会显示路径。

* 已完成事件
* 已访问网站
* 已访问应用程序
* 已点击电子邮件
* 已点击广告
* 已安装应用程序

如果路径在"不跟踪"模式下向用户显示，则与路径的显示或用户与该路径的交互相关的任何分析 *都不会发布在 Branch 控制面板中。*
