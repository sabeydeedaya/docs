## Overview

Branch’s Fraud Detection Platform uses an intelligent blacklist to block known bad actors in real time, ensuring customers don’t pay for fraudulent traffic. It includes core metrics that help identify forms of fraud such as install hijacking, click flooding and device reset fraud.

The platform leverages Branch’s persona data to give you RealScore - a model that intelligently scores the likelihood that any given install comes from a real person rather than a bot, malware or false attribution claim. RealScore depends on a variety of web and app signals to establish patterns of normal and fraudulent behavior, making it the first fraud detection product to leverage the full set of signals available on mobile.

![image](/_assets/img/pages/analytics/fraud-dashboard.png)

![image](/_assets/img/pages/analytics/cti-report.png)

## Key Fraud Indicators

### Install Hijacking / Click Injection

When a new app is installed, other apps on the phone can sometimes detect the install, even before the first open. Fraudulent publishers may fire off a click when they detect an organic install, just before the app is opened. This can be identified by suspiciously low click to install times.

### Fake Devices / Click Farms

Emulators and click farms generate clicks from suspicious IPs, as well as show abnormal behavior after installing. Check blocked clicks and your user value metrics in Ads Analytics to identify this fraud.

### Click Flooding

Publishers can generate millions of clicks with different device IDs in the hope that one of those users will install later. Generally the click and installs actions are disconnected, so you can expect to see long click to install times.

### Ad Stacking

Publishers will sometimes put dozens of ads in one ad placement, causing high numbers of impressions and clicks, with low install rates.

### Device Reset

Device reset fraud is characterized by new devices from suspicious IPs. Keep an eye on your user value metrics and suspiciously high click to install rates.

## Core Metrics

![image](/_assets/img/pages/analytics/core-metrics.png)

### % Blocked Installs

![image](/_assets/img/pages/analytics/blocked-installs.png)

The percentage of blocked installs divided by total installs.

### Click to Install %

![image](/_assets/img/pages/analytics/cti.png)

The percentage of attributed installs divided by clicks.

### Install % Over 1 Day

The percentage of unblocked installs where the time from click to install was over 1 day - an indicator of click flooding.

### Short Install Times

![image](/_assets/img/pages/analytics/short-install-times.png)

#### Install % Under 10 Seconds

The percentage of unblocked installs where the time from click to install was under 10 seconds - an indicator of click injection.

#### Install % 10-30 Seconds

The percentage of unblocked installs where the time from click to install was between 10 and 30 seconds.

#### Install % 30 Seconds +

The percentage of unblocked installs where the time from click to install was over 30 seconds.
