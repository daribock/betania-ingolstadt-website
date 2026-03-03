# Scripts Directory

This directory contains utility scripts for maintaining and optimizing the Betania Ingolstadt website.

## Available Scripts

### `convert-images.js`

Converts large PNG and JPEG images to modern formats (WebP and AVIF) for better performance.

**Prerequisites:**
```bash
npm install -D sharp
```

**Usage:**
```bash
node scripts/convert-images.js
```

**What it does:**
- Scans `/public/uploads/` directory for PNG and JPEG images
- Converts images larger than 100KB to WebP and AVIF formats
- Keeps original files as fallback
- Shows compression statistics

**Configuration:**
Edit the `config` object in the script to adjust:
- Quality settings for WebP and AVIF
- Minimum file size threshold
- Compression effort (0-6)

**Example output:**
```
🎨 Image Conversion Tool

Scanning /public/uploads for images...

Found 20 images

🔄 Converting worship-1.png (3800KB)...
  ✅ WebP: 450KB (12% of original)
  ✅ AVIF: 320KB (8% of original)

📊 Conversion Summary

Converted: 7/20 images
Original total: 26.50MB
WebP total: 3.2MB (12% of original)
AVIF total: 2.1MB (8% of original)

💾 Potential savings with WebP: 23.3MB
💾 Potential savings with AVIF: 24.4MB

✨ Done!
```

## Future Scripts

Consider adding:
- `optimize-fonts.js` - Subset fonts to include only used characters
- `analyze-bundle.js` - Analyze bundle size and dependencies
- `check-performance.js` - Run Lighthouse audits automatically
- `validate-images.js` - Check all images have proper alt text and dimensions
