### v3.1.0

**(2019-March-22)**

- Ensure that Google Aid is present in all requests
- Refactored how Debug works, including making sure all Debug messages can be turned off if not in debug mode.
- Added new standard events for parity with Tune
- Fixed a synchronization issue around the event queue saving preferences while in a synchronized block.

### v3.0.4

**(2019-January-11)**

- Fixed a TLS1.2 issue with HttpsURLConnection on API Level 16~19 devices
- Added SDK version tag to the Android SDK to aid Google Scanning APIs
- The SDK now supports deep linking with enableForcedSession() for apps which choose to finish the Launcher Activity within onStart() method
