import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

function createLogoSvg({ text = "SILICONIX", includeTagline = true, dotTagline = false }) {
  const isNineLetter = text === "SILICONIX";
  const orange = "#F47716";
  const teal = "#07565A";

  const letterH = 80;
  const stemW = 22;
  const slantDeg = -13.5;

  let curX = 30;
  const gap = 11;
  let lettersSvg = '';

  // 1. S
  const sW = 68;
  lettersSvg += `
    <!-- S -->
    <path fill="${orange}" fill-rule="evenodd" d="
      M ${curX + 16} 20
      L ${curX + sW} 20
      L ${curX + sW} 42
      L ${curX + stemW + 4} 42
      L ${curX + stemW + 4} 50
      L ${curX + sW - 12} 50
      Q ${curX + sW} 50 ${curX + sW} 62
      L ${curX + sW} 90
      Q ${curX + sW} 100 ${curX + sW - 14} 100
      L ${curX} 100
      L ${curX} 76
      L ${curX + sW - stemW - 4} 76
      L ${curX + sW - stemW - 4} 68
      L ${curX + 12} 68
      Q ${curX} 68 ${curX} 56
      L ${curX} 32
      Q ${curX} 20 ${curX + 16} 20
      Z
    " />
  `;
  curX += sW + gap;

  // 2. I (with distinctive aerodynamic cut)
  const iW = stemW;
  lettersSvg += `
    <!-- I (Custom Cut) -->
    <path fill="${orange}" d="
      M ${curX + 10} 20
      L ${curX + iW} 20
      L ${curX + iW} 100
      L ${curX} 100
      L ${curX} 32
      Z
    " />
  `;
  curX += iW + gap;

  // 3. L
  const lW = 56;
  lettersSvg += `
    <!-- L -->
    <path fill="${orange}" d="
      M ${curX} 20
      L ${curX + stemW} 20
      L ${curX + stemW} 78
      L ${curX + lW} 78
      L ${curX + lW} 100
      L ${curX} 100
      Z
    " />
  `;
  curX += lW + gap;

  // Optional 4. I (for SILICONIX)
  if (isNineLetter) {
    lettersSvg += `
      <!-- I -->
      <rect x="${curX}" y="20" width="${iW}" height="80" fill="${orange}" />
    `;
    curX += iW + gap;
  }

  // 5. C
  const cW = 68;
  lettersSvg += `
    <!-- C -->
    <path fill="${orange}" d="
      M ${curX + 14} 20
      L ${curX + cW} 20
      L ${curX + cW} 42
      L ${curX + stemW} 42
      L ${curX + stemW} 78
      L ${curX + cW} 78
      L ${curX + cW} 100
      L ${curX + 14} 100
      Q ${curX} 100 ${curX} 86
      L ${curX} 34
      Q ${curX} 20 ${curX + 14} 20
      Z
    " />
  `;
  curX += cW + gap;

  // 6. O
  const oW = 72;
  lettersSvg += `
    <!-- O -->
    <path fill="${orange}" fill-rule="evenodd" d="
      M ${curX + 14} 20
      L ${curX + oW - 14} 20
      Q ${curX + oW} 20 ${curX + oW} 34
      L ${curX + oW} 86
      Q ${curX + oW} 100 ${curX + oW - 14} 100
      L ${curX + 14} 100
      Q ${curX} 100 ${curX} 86
      L ${curX} 34
      Q ${curX} 20 ${curX + 14} 20
      Z
      M ${curX + stemW} 42
      L ${curX + oW - stemW} 42
      L ${curX + oW - stemW} 78
      L ${curX + stemW} 78
      Z
    " />
  `;
  curX += oW + gap;

  // 7. N
  const nW = 74;
  lettersSvg += `
    <!-- N -->
    <path fill="${orange}" d="
      M ${curX} 20
      L ${curX + stemW} 20
      L ${curX + nW - stemW} 72
      L ${curX + nW - stemW} 20
      L ${curX + nW} 20
      L ${curX + nW} 100
      L ${curX + nW - stemW} 100
      L ${curX + stemW} 46
      L ${curX + stemW} 100
      L ${curX} 100
      Z
    " />
  `;
  curX += nW + gap + 3;

  // 8. I (in Deep Teal)
  lettersSvg += `
    <!-- I (Deep Teal) -->
    <rect x="${curX}" y="20" width="${stemW}" height="80" fill="${teal}" />
  `;
  curX += stemW + gap;

  // 9. X (in Deep Teal with trademark diagonal gap cut)
  const xW = 78;
  const xLeft = curX;
  const xRight = curX + xW;
  const xTop = 20;
  const xBottom = 100;

  lettersSvg += `
    <!-- X (Deep Teal with Industrial Slash Gap) -->
    <g fill="${teal}">
      <!-- Diagonal 1: Top-Left to Bottom-Right -->
      <polygon points="
        ${xLeft},${xTop} 
        ${xLeft + 25},${xTop} 
        ${xRight},${xBottom} 
        ${xRight - 25},${xBottom}
      " />
      
      <!-- Diagonal 2: Top-Right Segment -->
      <polygon points="
        ${xRight - 25},${xTop} 
        ${xRight},${xTop} 
        ${xLeft + (xW/2) + 16},${xTop + (letterH/2) - 8} 
        ${xLeft + (xW/2) - 2},${xTop + (letterH/2) - 8}
      " />

      <!-- Diagonal 2: Bottom-Left Segment -->
      <polygon points="
        ${xLeft + (xW/2) + 2},${xTop + (letterH/2) + 8} 
        ${xLeft + (xW/2) - 16},${xTop + (letterH/2) + 8} 
        ${xLeft},${xBottom} 
        ${xLeft + 25},${xBottom}
      " />
    </g>
  `;
  curX += xW;

  // Exact bounds calculation
  const logoEndX = curX;
  const logoStartX = 30;
  // Account for slant shift: at top y=20, offset is ~ tan(13.5)*80 = 19.2px to the right
  const totalWidth = logoEndX + 45;
  const totalHeight = includeTagline ? 160 : 120;

  // Tagline alignment
  const taglineCenterX = (logoStartX + logoEndX) / 2 + 10;
  const taglineY = 142;
  const taglineText = dotTagline ? "SEAL. STRONG. LASTS LONG." : "SEAL STRONG. LASTS LONG.";
  const textHalfWidth = isNineLetter ? 148 : 142;
  const lineLength = 110;

  let taglineSvg = '';
  if (includeTagline) {
    taglineSvg = `
      <!-- Tagline -->
      <g>
        <!-- Left Orange Line -->
        <line 
          x1="${taglineCenterX - textHalfWidth - lineLength}" 
          y1="${taglineY - 4.5}" 
          x2="${taglineCenterX - textHalfWidth - 14}" 
          y2="${taglineY - 4.5}" 
          stroke="${orange}" 
          stroke-width="2.5" 
          stroke-linecap="round" 
        />
        
        <!-- Tagline Text -->
        <text 
          x="${taglineCenterX}" 
          y="${taglineY}" 
          font-family="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
          font-size="15" 
          font-weight="800" 
          letter-spacing="0.14em" 
          fill="${teal}" 
          text-anchor="middle"
        >
          ${taglineText}
        </text>

        <!-- Right Orange Line -->
        <line 
          x1="${taglineCenterX + textHalfWidth + 14}" 
          y1="${taglineY - 4.5}" 
          x2="${taglineCenterX + textHalfWidth + lineLength}" 
          y2="${taglineY - 4.5}" 
          stroke="${orange}" 
          stroke-width="2.5" 
          stroke-linecap="round" 
        />
      </g>
    `;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="100%" height="100%">
  <!-- Wordmark -->
  <g transform="skewX(${slantDeg}) translate(${Math.abs(slantDeg) * 2.2}, 0)">
    ${lettersSvg}
  </g>
  ${taglineSvg}
</svg>`;
}

const outDir = path.resolve('public/images');

// 1. SILICONIX (Primary Requested)
const siliconixSvg = createLogoSvg({ text: "SILICONIX", includeTagline: true, dotTagline: false });
fs.writeFileSync(path.join(outDir, 'siliconix-logo.svg'), siliconixSvg);
fs.writeFileSync('siliconix-logo.svg', siliconixSvg);

const png1 = new Resvg(siliconixSvg, { fitTo: { mode: 'width', value: 2400 } }).render().asPng();
fs.writeFileSync(path.join(outDir, 'siliconix-logo.png'), png1);
fs.writeFileSync('siliconix-logo.png', png1);

// 2. SILCONIX (Exact Reference Image Spelling)
const silconixSvg = createLogoSvg({ text: "SILCONIX", includeTagline: true, dotTagline: true });
fs.writeFileSync(path.join(outDir, 'silconix-logo.svg'), silconixSvg);
fs.writeFileSync('silconix-logo.svg', silconixSvg);

const png2 = new Resvg(silconixSvg, { fitTo: { mode: 'width', value: 2400 } }).render().asPng();
fs.writeFileSync(path.join(outDir, 'silconix-logo.png'), png2);
fs.writeFileSync('silconix-logo.png', png2);

// 3. Compact Navbar Wordmark (Horizontal, clean, without tagline for sleek headers)
const slimSvg = createLogoSvg({ text: "SILICONIX", includeTagline: false });
fs.writeFileSync(path.join(outDir, 'siliconix-navbar.svg'), slimSvg);
fs.writeFileSync('siliconix-navbar.svg', slimSvg);

const png3 = new Resvg(slimSvg, { fitTo: { mode: 'width', value: 1600 } }).render().asPng();
fs.writeFileSync(path.join(outDir, 'siliconix-navbar.png'), png3);
fs.writeFileSync('siliconix-navbar.png', png3);

console.log("Refined and generated all logos perfectly!");
