#!/bin/bash
# ==========================================================================
# Skill Library — AVIF Image Generation Script
# Run this script to generate AVIF variants of all WebP images.
# Requires: avifenc (from libavif) or sharp-cli (npm install -g sharp-cli)
#
# Usage: bash build-images.sh
# ==========================================================================

echo "🔄 Generating AVIF variants of all shelf images..."

# Check if avifenc is available
if command -v avifenc &> /dev/null; then
  TOOL="avifenc"
  echo "Using avifenc..."
  
  for file in *.webp; do
    outfile="${file%.webp}.avif"
    if [ ! -f "$outfile" ]; then
      echo "  Converting: $file → $outfile"
      avifenc --min 20 --max 35 --speed 4 "$file" "$outfile"
    else
      echo "  Skipping (exists): $outfile"
    fi
  done

elif command -v sharp &> /dev/null; then
  TOOL="sharp"
  echo "Using sharp-cli..."
  
  for file in *.webp; do
    outfile="${file%.webp}.avif"
    if [ ! -f "$outfile" ]; then
      echo "  Converting: $file → $outfile"
      sharp -i "$file" -o "$outfile" --format avif --quality 40
    else
      echo "  Skipping (exists): $outfile"
    fi
  done

else
  echo "❌ Neither avifenc nor sharp-cli found."
  echo ""
  echo "Install one of:"
  echo "  • libavif:    brew install libavif   (macOS)"
  echo "                apt install libavif-bin (Ubuntu/Debian)"
  echo "  • sharp-cli:  npm install -g sharp-cli"
  echo ""
  echo "Then re-run this script."
  exit 1
fi

echo ""
echo "✅ AVIF generation complete!"
echo ""
echo "File sizes:"
ls -lh *.avif 2>/dev/null || echo "  No AVIF files found."
echo ""
echo "Once generated, the HTML <picture> elements will automatically"
echo "serve AVIF to supporting browsers with WebP as fallback."
