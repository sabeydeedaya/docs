### View-Through Attribution with Impression Pixels

_If you'd like to try our view-through attribution beta, please contact integrations@branch.io._

View-through attribution allows you to track installs, session starts and conversion events back to an ad impression, even if the ad was never clicked on. Our view-through attribution logic is currently as follows for any given event:

- If there's a click within a valid attribution window, give credit to the click.
- If there's no click within a valid attribution window, give credit to the last impression that was within a valid attribution window.

Currently, impression pixels are only supported with server to server tracking, so server to server macros and device IDs are required when using impression pixels. To create a pixel, simply [create an ad link](#create-an-ad-link), and grab the pixel from the final step of link creation.

!!! tip "Impression Pixel Formatting"

        Make sure the impression pixel returned by Branch's dashboard has `%24s2s=true` and an `%24idfa` or `%24aaid` macro. If you have questions, just contact integrations@branch.io.