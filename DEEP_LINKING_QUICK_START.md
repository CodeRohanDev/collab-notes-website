# Deep Linking - Quick Start Guide

## 🚀 Quick Setup

### 1. Update Configuration Files

#### A. Android SHA256 Fingerprint
Edit `public/.well-known/assetlinks.json`:

```bash
# Get your SHA256 fingerprint
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Copy the SHA256 value and update the file.

#### B. Update URLs
Edit `app/note/page.tsx` and update:
- `https://collabnotes.hostspica.com` → Your domain
- `com.hostspica.collabnotes` → Your package name

---

## 📱 How to Share Notes

### URL Format

Both formats are supported:

**Query Parameter (Primary)**
```
https://yourdomain.com/note?id=NOTE_ID
```

**Path Parameter (Redirects to query)**
```
https://yourdomain.com/note/NOTE_ID
```

### Example
```
https://yourdomain.com/note?id=abc123xyz
https://yourdomain.com/note/abc123xyz  (redirects to above)
```

---

## 🔧 Flutter Implementation

### 1. Add Dependency

```yaml
dependencies:
  uni_links: ^0.5.1
```

### 2. Update AndroidManifest.xml

```xml
<activity android:name=".MainActivity">
    <!-- Custom Scheme -->
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="collabnotes" android:host="note" />
    </intent-filter>

    <!-- HTTPS Deep Links -->
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

### 3. Handle Deep Links

```dart
import 'package:uni_links/uni_links.dart';

class DeepLinkService {
  StreamSubscription? _sub;

  void init() {
    // Handle app opened from link
    getInitialUri().then((uri) {
      if (uri != null) _handleLink(uri);
    });

    // Handle links while app is running
    _sub = uriLinkStream.listen((uri) {
      if (uri != null) _handleLink(uri);
    });
  }

  void _handleLink(Uri uri) {
    // Extract note ID from query parameter
    final noteId = uri.queryParameters['id'];
    
    if (noteId != null && noteId.isNotEmpty) {
      // Navigate to note
      navigateToNote(noteId);
    }
  }

  void navigateToNote(String noteId) {
    // Your navigation logic here
    print('Opening note: $noteId');
  }

  void dispose() {
    _sub?.cancel();
  }
}
```

### 4. Initialize in main.dart

```dart
void main() {
  runApp(MyApp());
  
  // Initialize deep linking
  final deepLinkService = DeepLinkService();
  deepLinkService.init();
}
```

---

## 🧪 Testing

### Test on Android Device

```bash
# Test custom scheme
adb shell am start -W -a android.intent.action.VIEW \
  -d "collabnotes://note?id=test123" \
  com.hostspica.collabnotes

# Test HTTPS link
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://yourdomain.com/note?id=test123" \
  com.hostspica.collabnotes
```

### Test in Browser
1. Deploy your website
2. Open: `https://yourdomain.com/note?id=test123`
3. Should attempt to open app

---

## ✅ Verification Checklist

- [ ] Updated SHA256 fingerprint in assetlinks.json
- [ ] Updated domain in app/note/page.tsx
- [ ] Updated package name in assetlinks.json
- [ ] Added intent filters to AndroidManifest.xml
- [ ] Implemented deep link handler in Flutter
- [ ] Tested custom scheme (collabnotes://)
- [ ] Tested HTTPS deep links
- [ ] Verified assetlinks.json is accessible
- [ ] Tested on real Android device

---

## 📊 User Experience

### With App Installed
1. User clicks link → App opens → Shows note

### Without App
1. User clicks link → Website shows → Download button → Install app → Click link again

---

## 🔗 Important URLs

After deployment, verify these work:

```
Deep Link Page:
https://yourdomain.com/note?id=test123

Asset Links:
https://yourdomain.com/.well-known/assetlinks.json

Apple Association (future):
https://yourdomain.com/.well-known/apple-app-site-association
```

---

## 🐛 Common Issues

### App doesn't open
- Check AndroidManifest.xml intent filters
- Verify SHA256 fingerprint is correct
- Ensure assetlinks.json is accessible
- Wait 24 hours for domain verification

### assetlinks.json returns 404
- Check file is in `public/.well-known/`
- Verify vercel.json is configured
- Redeploy website

### Link opens browser instead of app
- Add `android:autoVerify="true"` to intent filter
- Verify domain in Google Play Console
- Check assetlinks.json is valid JSON

---

## 📞 Need Help?

See full documentation: `DEEP_LINKING_SETUP.md`

---

**Status**: Ready to Use ✅
**Last Updated**: November 19, 2024
