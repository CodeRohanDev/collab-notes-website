# URL Redirect Configuration

## Overview

The website supports both URL formats for note sharing:

1. **Query Parameter**: `https://yourdomain.com/note?id=NOTE_ID` (Primary)
2. **Path Parameter**: `https://yourdomain.com/note/NOTE_ID` (Redirects to query)

---

## How It Works

When a user visits:
```
https://yourdomain.com/note/abc123
```

They are automatically redirected to:
```
https://yourdomain.com/note?id=abc123
```

This ensures compatibility with both URL formats while maintaining a single page implementation.

---

## Configuration Files

### Vercel (vercel.json)

```json
{
  "redirects": [
    {
      "source": "/note/:noteId",
      "destination": "/note?id=:noteId",
      "permanent": false
    }
  ]
}
```

**Status Code**: 302 (Temporary Redirect)
- Allows flexibility to change URL structure later
- Better for SEO as it indicates the redirect is temporary

### Netlify (public/_redirects)

```
/note/:noteId  /note?id=:noteId  302
```

**Format**: `source destination status_code`

---

## Testing

### Test Redirect Locally

After deploying, test both URLs:

```bash
# Should work directly
curl -I https://yourdomain.com/note?id=test123

# Should redirect to query format
curl -I https://yourdomain.com/note/test123
```

Expected response for path format:
```
HTTP/2 302
location: /note?id=test123
```

### Test in Browser

1. Visit: `https://yourdomain.com/note/test123`
2. Should redirect to: `https://yourdomain.com/note?id=test123`
3. Page should load correctly

---

## Flutter App Integration

### Generate Share Links

You can use either format when sharing:

```dart
// Option 1: Query parameter (recommended)
String generateShareLink(String noteId) {
  return 'https://yourdomain.com/note?id=$noteId';
}

// Option 2: Path parameter (cleaner, but redirects)
String generateShareLinkClean(String noteId) {
  return 'https://yourdomain.com/note/$noteId';
}
```

### Handle Both Formats

Your deep link handler should support both:

```dart
void _handleDeepLink(Uri uri) {
  String? noteId;
  
  // Check query parameter first
  noteId = uri.queryParameters['id'];
  
  // If not found, check path segments
  if (noteId == null && uri.pathSegments.length > 1) {
    noteId = uri.pathSegments[1];
  }
  
  if (noteId != null && noteId.isNotEmpty) {
    navigateToNote(noteId);
  }
}
```

---

## AndroidManifest.xml

Update intent filters to handle both formats:

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    
    <!-- Query parameter format -->
    <data
        android:scheme="https"
        android:host="yourdomain.com"
        android:path="/note" />
    
    <!-- Path parameter format -->
    <data
        android:scheme="https"
        android:host="yourdomain.com"
        android:pathPrefix="/note/" />
</intent-filter>
```

---

## Benefits of Both Formats

### Query Parameter (`/note?id=abc123`)
✅ Works with static export
✅ No server-side redirect needed
✅ Faster (no redirect hop)
✅ Better for programmatic access

### Path Parameter (`/note/abc123`)
✅ Cleaner URLs for sharing
✅ More user-friendly
✅ Better for social media
✅ Looks more professional

---

## SEO Considerations

### Canonical URL

The query parameter format is the canonical URL. The redirect ensures:
- No duplicate content issues
- Single source of truth
- Better indexing

### Social Media Sharing

Both formats work for social media:
- Facebook, Twitter, LinkedIn will follow the redirect
- Open Graph tags are applied after redirect
- Preview cards work correctly

---

## Troubleshooting

### Redirect Not Working

**Vercel:**
1. Check `vercel.json` is in project root
2. Redeploy after changes
3. Clear browser cache
4. Test with `curl -I`

**Netlify:**
1. Check `public/_redirects` exists
2. Verify file is in `out` folder after build
3. Redeploy
4. Test with `curl -I`

### Redirect Loop

If you experience a redirect loop:
1. Check redirect destination doesn't match source
2. Verify no conflicting redirects
3. Clear browser cache and cookies

### 404 Error

If path format shows 404:
1. Verify redirect configuration is deployed
2. Check hosting platform supports redirects
3. Test redirect rule syntax
4. Check deployment logs

---

## Alternative Hosting Platforms

### GitHub Pages

Create `404.html` with redirect logic:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    const path = window.location.pathname;
    if (path.startsWith('/note/')) {
      const noteId = path.replace('/note/', '');
      window.location.replace('/note?id=' + noteId);
    }
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
```

### AWS S3 + CloudFront

Configure routing rules in S3:

```xml
<RoutingRules>
  <RoutingRule>
    <Condition>
      <KeyPrefixEquals>note/</KeyPrefixEquals>
    </Condition>
    <Redirect>
      <Protocol>https</Protocol>
      <HostName>yourdomain.com</HostName>
      <ReplaceKeyPrefixWith>note?id=</ReplaceKeyPrefixWith>
      <HttpRedirectCode>302</HttpRedirectCode>
    </Redirect>
  </RoutingRule>
</RoutingRules>
```

---

## Best Practices

1. **Use Query Format in Code**: Generate query parameter URLs in your app
2. **Support Both in Handler**: Handle both formats in deep link handler
3. **Test Both Formats**: Verify both URLs work after deployment
4. **Monitor Redirects**: Track redirect performance in analytics
5. **Document for Team**: Ensure team knows both formats work

---

## Summary

✅ **Vercel**: Configured in `vercel.json`
✅ **Netlify**: Configured in `public/_redirects`
✅ **Both Formats**: Supported and tested
✅ **SEO Friendly**: Proper redirect status codes
✅ **User Friendly**: Clean URLs for sharing

---

**Status**: Configured and Ready ✅
**Last Updated**: November 19, 2024
