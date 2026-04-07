import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.resolve(__dirname, '../public/sequence');

async function processImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
  
  console.log(`Processing ${files.length} images...`);
  let totalSaved = 0;
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(inputDir, file.replace('.png', '.webp'));
    
    try {
      const origStat = fs.statSync(inputPath);
      
      await sharp(inputPath)
        // A slight sharpen to improve visual clarity (makes outlines crisper)
        .sharpen({ sigma: 1, m1: 0.8, m2: 0.6 })
        .webp({ 
          quality: 85, // Excellent quality to file size ratio
          effort: 6    // Maximum compression effort
        })
        .toFile(outputPath);
      
      const newStat = fs.statSync(outputPath);
      const saved = origStat.size - newStat.size;
      totalSaved += saved;
      
      console.log(`Converted: ${file} -> size reduced by ${Math.round(saved/1024)}KB`);
      
      // Delete original png
      fs.unlinkSync(inputPath);
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }
  
  console.log(`\nConversion complete! Extracted total savings: ${Math.round(totalSaved / (1024 * 1024))}MB`);
}

processImages();
