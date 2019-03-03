## Submitting to the App Store

After integrating the Branch SDK, you need to let Apple know that you use the IDFA. To follow proper protocol when submitting your next release to the App Store, you should:

1. Answer `Yes` to the question **Does this app use the Advertising Identifier (IDFA)?**
2. Check the two boxes for:
	1. **Attribute this app installation to a previously served advertisement**
	2. **Attribute an action taken within this app to a previously served advertisement**

![image](/_assets/img/pages/apps/idfa.png)

!!! note "Why does Branch use the IDFA?"
    Branch uses the IDFA to identify users across our entire partner network, greatly increasing match accuracy rate. You can read more about this on the [matching accuracy page](/resources/matching/). You do not need to perform these steps if you installed the Branch framework manually and elected **not** to import `AdSupport.framework` or via Cocoapods and chose the Branch/without-IDFA subspec.
