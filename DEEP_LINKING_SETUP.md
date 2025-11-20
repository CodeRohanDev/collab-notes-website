# Deep Linking Setup Guide

## Overview

CollabNotes website now supports deep linking to open shared notes directly in the mobile app.

---

## 🔗 How It Works

When a user clicks a note sharing link like:
```
https://yourdomain.com/note?id=abc123
or
https://yourdomain.com/note/abc123  (redirects to query format)
```

The website will:
1. Detect if user is on mobile
2. Attempt to open the CollabNotes app
3. If app is not installed, show download option
4. On desktop, show instructions to open on mobile

---

## 📁 Files Created

### 1. Note Page with Query Parameters
**File**: `app/note/page.tsx`

Features:
- Auto-detects mobile devices
- Attempts to open app automatically
- Shows loading state
- Fallback to Play Store if app not installed
- Desktop-friendly UI

### 2. Metadata Layout
**File**: `app/note/layout.tsx`

Includes:
- SEO metadata
- Open Graph tags for social sharing
- Twitter card support

### 3. Android App Links
**File**: `public/.well-known/assetlinks.json`

Required for Android App Links (verified deep links)

### 4. iOS Universal Links
**File**: `public/.well-known/apple-app-site-association`

Required for iOS Universal Links (when iOS version is ready)

### 5. Vercel Configuration
**File**: `vercel.json`

Configures headers for `.well-known` files

---

## ⚙️ Configuration Required

### 1. Update Android SHA256 Fingerprint

Edit `public/.well-known/assetlinks.json`:

```json
{
  "sha256_cert_fingerprints": [
    "YOUR_ACTUAL_SHA256_FINGERPRINT"
  ]
}
```

**How to get SHA256 fingerprint:**

```bash
# For debug keystore
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# For release keystore
keytool -list -v -keystore /path/to/your/keystore.jks -alias your-alias
```

Look for the `SHA256` line in the output.

### 2. Update iOS Team ID (When iOS is Ready)

Edit `public/.well-known/apple-app-site-association`:

```json
{
  "appID": "YOUR_TEAM_ID.com.hostspica.collabnotes"
}
```

Replace `YOUR_TEAM_ID` with your Apple Developer Team ID.

### 3. Update Deep Link URLs

In `app/note/page.tsx`, update:

```typescript
const deepLink = `https://collabnotes.hostspica.com/note/${noteId}`;
const appScheme = `collabnotes://note/${noteId}`;
const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.hostspica.collabnotes';
```

---

## 🔧 Flutter App Configuration

### Android Setup

#### 1. Update AndroidManifest.xml

Add intent filters to your main activity:

```xml
<activity
    android:name=".MainActivity"
    android:launchMode="singleTask">
    
    <!-- Existing intent filter -->
    <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>

    <!-- Deep Link - Custom Scheme -->
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="collabnotes"
            android:host="note" />
    </intent-filter>

    <!-- App Links - HTTPS -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="https"
            android:host="yourdomain.com"
            android:pathPrefix="/note" />
    </intent-filter>
</activity>
```

#### 2. Handle Deep Links in Flutter

Install package:
```yaml
dependencies:
  uni_links: ^0.5.1
  # or
  app_links: ^3.4.5
```

Handle incoming links:
```dart
import 'package:uni_links/uni_links.dart';

class DeepLinkHandler {
  StreamSubscription? _sub;

  void initDeepLinks() {
    // Handle initial link (app was closed)
    getInitialUri().then((uri) {
      if (uri != null) {
        _handleDeepLink(uri);
      }
    });

    // Handle links while app is running
    _sub = uriLinkStream.listen((Uri? uri) {
      if (uri != null) {
        _handleDeepLink(uri);
      }
    });
  }

  void _handleDeepLink(Uri uri) {
    // Extract note ID from URL
    // Example: collabnotes://note/abc123
    // or: https://yourdomain.com/note/abc123
    
    if (uri.pathSegments.isNotEmpty && uri.pathSegments[0] == 'note') {
      final noteId = uri.pathSegments.length > 1 ? uri.pathSegments[1] : null;
      
      if (noteId != null) {
        // Navigate to note
        navigateToNote(noteId);
      }
    }
  }

  void navigateToNote(String noteId) {
    // Your navigation logic
    // Example: Navigator.pushNamed(context, '/note', arguments: noteId);
  }

  void dispose() {
    _sub?.cancel();
  }
}
```

### iOS Setup (Future)

#### 1. Update Info.plist

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLName</key>
        <string>com.hostspica.collabnotes</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>collabnotes</string>
        </array>
    </dict>
</array>

<key>com.apple.developer.associated-domains</key>
<array>
    <string>applinks:yourdomain.com</string>
</array>
```

---

## 🧪 Testing

### Test Custom Scheme (collabnotes://)

```bash
# Android
adb shell am start -W -a android.intent.action.VIEW -d "collabnotes://note/test123" com.hostspica.collabnotes

# iOS (when ready)
xcrun simctl openurl booted "collabnotes://note/test123"
```

### Test HTTPS Deep Links

```bash
# Android
adb shell am start -W -a android.intent.action.VIEW -d "https://yourdomain.com/note/test123" com.hostspica.collabnotes
```

### Test in Browser

1. Deploy website with deep link page
2. Open: `https://yourdomain.com/note/test123`
3. Should attempt to open app or show download option

---

## 🔍 Verification

### Verify Android App Links

```bash
adb shell pm get-app-links com.hostspica.collabnotes
```

Should show verified status for your domain.

### Verify assetlinks.json

Visit: `https://yourdomain.com/.well-known/assetlinks.json`

Should return JSON with correct fingerprint.

### Test with Google's Tool

https://developers.google.com/digital-asset-links/tools/generator

---

## 📊 User Flow

### Mobile User with App Installed
1. User clicks note link
2. Website detects mobile
3. Attempts to open app automatically
4. App opens to specific note
5. User can collaborate

### Mobile User without App
1. User clicks note link
2. Website detects mobile
3. Attempts to open app (fails)
4. Shows "Download App" button
5. User downloads from Play Store
6. Can open link again after install

### Desktop User
1. User clicks note link
2. Website detects desktop
3. Shows instructions
4. Displays QR code (optional)
5. User can scan with mobile

---

## 🎯 Best Practices

1. **Always provide fallback**: Show download option if app not installed
2. **Test both schemes**: Custom scheme and HTTPS
3. **Handle errors gracefully**: Don't leave users stuck
4. **Update fingerprints**: Keep SHA256 fingerprints current
5. **Monitor analytics**: Track deep link success rate

---

## 🐛 Troubleshooting

### App doesn't open on Android

1. Check AndroidManifest.xml intent filters
2. Verify assetlinks.json is accessible
3. Confirm SHA256 fingerprint is correct
4. Test with `adb` commands
5. Check app is installed

### assetlinks.json not accessible

1. Verify file is in `public/.well-known/`
2. Check vercel.json headers configuration
3. Test URL directly in browser
4. Ensure no authentication required

### Deep link opens browser instead of app

1. Verify `android:autoVerify="true"` is set
2. Check domain verification in Play Console
3. Confirm assetlinks.json is valid JSON
4. Wait 24 hours for verification to propagate

---

## 📱 Example URLs

### Development
```
http://localhost:3000/note/abc123
```

### Production
```
https://yourdomain.com/note/abc123
```

### Custom Scheme
```
collabnotes://note/abc123
```

---

## 🔐 Security Considerations

1. **Validate note IDs**: Check format and existence
2. **Authenticate users**: Verify access permissions
3. **Rate limiting**: Prevent abuse
4. **HTTPS only**: Use secure connections
5. **Verify domains**: Only trust your domains

---

## 📚 Resources

- [Android App Links](https://developer.android.com/training/app-links)
- [iOS Universal Links](https://developer.apple.com/ios/universal-links/)
- [Flutter uni_links](https://pub.dev/packages/uni_links)
- [Digital Asset Links](https://developers.google.com/digital-asset-links)

---

## ✅ Deployment Checklist

- [ ] Update SHA256 fingerprint in assetlinks.json
- [ ] Update deep link URLs in note page
- [ ] Update Play Store URL
- [ ] Configure AndroidManifest.xml
- [ ] Implement deep link handler in Flutter
- [ ] Test custom scheme links
- [ ] Test HTTPS deep links
- [ ] Verify assetlinks.json is accessible
- [ ] Test on real devices
- [ ] Monitor deep link analytics

---

**Status**: Ready for Implementation
**Last Updated**: November 19, 2024
