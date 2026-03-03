/**
 * Image Conversion Script for Performance Optimization
 *
 * This script converts large PNG images to modern formats (WebP and AVIF)
 * Usage: node scripts/convert-images.js
 *
 * Prerequisites:
 * npm install -D sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');

// Configuration
const config = {
  webp: {
    quality: 80,
    effort: 6, // 0-6, higher = better compression but slower
  },
  avif: {
    quality: 70,
    effort: 6,
  },
  // Only convert images larger than this size (in KB)
  minSize: 100,
};

/**
 * Get file size in KB
 */
function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size / 1024;
}

/**
 * Convert a single image to WebP and AVIF
 */
async function convertImage(inputPath) {
  const sizeKB = getFileSizeInKB(inputPath);

  if (sizeKB < config.minSize) {
    console.log(`⏭️  Skipping ${inputPath} (${sizeKB.toFixed(0)}KB - below threshold)`);
    return;
  }

  console.log(`🔄 Converting ${inputPath} (${sizeKB.toFixed(0)}KB)...`);

  const { dir, name } = path.parse(inputPath);
  const webpPath = path.join(dir, `${name}.webp`);
  const avifPath = path.join(dir, `${name}.avif`);

  try {
    // Convert to WebP
    await sharp(inputPath)
      .webp(config.webp)
      .toFile(webpPath);

    const webpSize = getFileSizeInKB(webpPath);
    console.log(`  ✅ WebP: ${webpSize.toFixed(0)}KB (${((webpSize/sizeKB)*100).toFixed(0)}% of original)`);

    // Convert to AVIF
    await sharp(inputPath)
      .avif(config.avif)
      .toFile(avifPath);

    const avifSize = getFileSizeInKB(avifPath);
    console.log(`  ✅ AVIF: ${avifSize.toFixed(0)}KB (${((avifSize/sizeKB)*100).toFixed(0)}% of original)`);

  } catch (error) {
    console.error(`  ❌ Error converting ${inputPath}:`, error.message);
  }
}

/**
 * Find all PNG and JPG images recursively
 */
function findImages(dir, images = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findImages(filePath, images);
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      images.push(filePath);
    }
  });

  return images;
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 Image Conversion Tool\n');
  console.log(`Scanning ${UPLOADS_DIR} for images...\n`);

  if (!fs.existsSync(UPLOADS_DIR)) {
    console.error(`❌ Directory not found: ${UPLOADS_DIR}`);
    process.exit(1);
  }

  const images = findImages(UPLOADS_DIR);

  console.log(`Found ${images.length} images\n`);
  console.log('━'.repeat(60) + '\n');

  let totalOriginalSize = 0;
  let totalWebpSize = 0;
  let totalAvifSize = 0;
  let convertedCount = 0;

  for (const image of images) {
    const originalSize = getFileSizeInKB(image);
    totalOriginalSize += originalSize;

    if (originalSize >= config.minSize) {
      await convertImage(image);

      const { dir, name } = path.parse(image);
      const webpPath = path.join(dir, `${name}.webp`);
      const avifPath = path.join(dir, `${name}.avif`);

      if (fs.existsSync(webpPath)) {
        totalWebpSize += getFileSizeInKB(webpPath);
      }
      if (fs.existsSync(avifPath)) {
        totalAvifSize += getFileSizeInKB(avifPath);
      }

      convertedCount++;
      console.log('');
    }
  }

  console.log('━'.repeat(60));
  console.log('\n📊 Conversion Summary\n');
  console.log(`Converted: ${convertedCount}/${images.length} images`);
  console.log(`Original total: ${(totalOriginalSize/1024).toFixed(2)}MB`);
  console.log(`WebP total: ${(totalWebpSize/1024).toFixed(2)}MB (${((totalWebpSize/totalOriginalSize)*100).toFixed(0)}% of original)`);
  console.log(`AVIF total: ${(totalAvifSize/1024).toFixed(2)}MB (${((totalAvifSize/totalOriginalSize)*100).toFixed(0)}% of original)`);
  console.log(`\n💾 Potential savings with WebP: ${((totalOriginalSize-totalWebpSize)/1024).toFixed(2)}MB`);
  console.log(`💾 Potential savings with AVIF: ${((totalOriginalSize-totalAvifSize)/1024).toFixed(2)}MB`);
  console.log('\n✨ Done!\n');
}

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.error('❌ Error: sharp is not installed');
  console.error('Please install it with: npm install -D sharp');
  process.exit(1);
}

main().catch(console.error);
