# Image Requirements

This document specifies the image dimensions, formats, file sizes, naming conventions, fallback behavior, and loading states for all images used in the All-Around Photos website.

## Image Categories

### Product Images (Shop)

**Dimensions:**
- Primary: 400×400 px (1:1 aspect ratio)
- Alternative: 600×600 px for high-resolution displays
- Thumbnail: 150×150 px for cart/gallery previews

**File Format:**
- Preferred: JPG (for photos) or PNG (for graphics with transparency)
- Modern: WebP with JPG/PNG fallback
- Maximum file size: 200 KB for 400×400, 300 KB for 600×600

**Storage Location:**
- Path: `public/products/`
- Naming: `{product-slug}-{color}.{ext}` (e.g., `tshirt-navy-blue.jpg`)

**Requirements:**
- High contrast for button/text overlays
- Consistent white or neutral background
- All SKU variations (colors, sizes) must have distinct image
- Version field in product data must reference image filename

### Custom Work Gallery Images

**Dimensions:**
- Display: 800×600 px (4:3 aspect ratio) or 600×800 px (3:4 portrait)
- Thumbnail: 200×150 px
- Full-resolution archive: 1920×1440 px (optional, for future high-res gallery)

**File Format:**
- Preferred: JPG for photography
- Maximum file size: 300 KB for display size, 500 KB for full resolution

**Storage Location:**
- Path: `public/custom-work/`
- Naming: `{project-name}-{sequence}.jpg` (e.g., `wedding-2024-01.jpg`)

**Requirements:**
- Watermark or branding optional (at designer's discretion)
- Before/after pairs should be numbered sequentially
- Exif data may be stripped for privacy (recommended)

### Drone Photography Images

**Dimensions:**
- Display: 1200×800 px (3:2 aspect ratio) landscape
- Thumbnail: 300×200 px
- Full-resolution: 2400×1600 px (optional)

**File Format:**
- Preferred: JPG for aerial photography
- Maximum file size: 400 KB for display size, 800 KB for full resolution

**Storage Location:**
- Path: `public/drone/`
- Naming: `{property-name}-{location}-{sequence}.jpg` (e.g., `johnson-estate-aerial-01.jpg`)

**Requirements:**
- GPS metadata optional but encouraged (metadata removed in public file)
- Time of day clearly distinguishable (morning/afternoon/sunset golden hour preferred)
- No aircraft shadows or visible drone body in frame

## Fallback and Error Handling

**Placeholder Image:**
- File: `public/placeholder.svg`
- Size: Scalar SVG (renders at any size without quality loss)
- Usage: Serves when requested image 404s or fails to load
- Styling: Light gray background with camera icon, responsive to container

**Loading States:**
- **Lazy Loading:** All product/gallery images use `loading="lazy"` attribute
- **Blur-Up Effect:** Load small (20×20 px) blurred version first, then fade to full resolution
- **Skeleton Shimmer:** Show animated skeleton placeholder while image loads (Tailwind animate-pulse)
- **Error Fallback:** Show placeholder.svg if image fails to load after 5 seconds

**Implementation Pattern (Next.js Image Component):**

```tsx
import Image from 'next/image';

<Image
  src={productImage}
  alt={productName}
  width={400}
  height={400}
  loading="lazy"
  onError={(e) => {
    e.currentTarget.src = '/placeholder.svg';
  }}
  placeholder="blur"
  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3C/svg%3E"
/>
```

## Image Optimization Checklist

### Before Upload

- [ ] Dimensions match category specification (use ImageMagick or similar: `convert input.jpg -resize 400x400! output.jpg`)
- [ ] Aspect ratio correct (crop if necessary)
- [ ] File size within limits (compress with TinyPNG, ImageOptim, or similar)
- [ ] File format correct (JPG for photos, PNG for graphics, WebP for modern browsers)
- [ ] Filename follows naming convention
- [ ] Alt text prepared and descriptive (e.g., "Navy blue cricut heat transfer design on white t-shirt")
- [ ] No sensitive metadata (run `exiftool -all= input.jpg` to strip EXIF)

### Web Optimization

- [ ] Generate WebP variant: `cwebp -q 80 input.jpg -o input.webp`
- [ ] Generate multiple resolutions:
  - 400×400 and 600×600 for products
  - 800×600 and 1200×800 for drone/custom work
- [ ] Validate responsive images with [Responsively App](https://responsively.app/)
- [ ] Run Google PageSpeed Insights for image optimization score

### Accessibility

- [ ] Alt text is descriptive and under 125 characters
- [ ] Alt text does not include "image of" or "picture of" (redundant for screen readers)
- [ ] Decorative images use empty alt attribute: `alt=""`
- [ ] Icon images (if any) have aria-label or hidden from accessibility tree

## Storage and CDN

**Local Storage:**
- All images stored in `public/` directory (auto-served by Next.js)
- Cloudflare Pages handles caching with HTTP headers
- No need for external CDN (Cloudflare CDN integrated)

**Caching Headers (set in next.config.ts or headers option):**

```typescript
{
  source: '/products/:filename*',
  headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
}
```

**Future Scalability (if needed):**
- Migrate to Cloudflare Images (native integration) or AWS S3
- Use image transformation service (imgix, Cloudinary) for on-the-fly resizing
- Implement srcset and WebP variants automatically

## File Naming Quick Reference

| Category | Pattern | Example | Storage |
|----------|---------|---------|---------|
| Product | `{slug}-{color}.{ext}` | `tshirt-navy-blue.jpg` | `public/products/` |
| Custom Work | `{project}-{seq}.jpg` | `wedding-2024-01.jpg` | `public/custom-work/` |
| Drone | `{property}-{location}-{seq}.jpg` | `johnson-estate-aerial-01.jpg` | `public/drone/` |
| Placeholder | `placeholder.svg` | `placeholder.svg` | `public/` |

## Support

For questions about image specifications or optimization, contact the design team. For issues with image loading on the site, check browser console for 404 errors and verify image path matches storage location.
