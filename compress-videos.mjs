import { execFileSync } from 'child_process';
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const ffmpegPath = require('ffmpeg-static');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');

const videos = [
  {
    input: 'minecraft-bg-video.mp4',
    output: 'minecraft-bg-video-opt.mp4',
  },
  {
    input: 'dark-coding.3840x2160 (1).mp4',
    output: 'dark-coding-opt.mp4',
  },
];

for (const { input, output } of videos) {
  const inputPath = path.join(publicDir, input);
  const outputPath = path.join(publicDir, output);

  if (!fs.existsSync(inputPath)) {
    console.log(`Skipping ${input} — file not found`);
    continue;
  }

  console.log(`\nProcessing: ${input}`);
  console.log(`Output:     ${output}`);

  try {
    execFileSync(ffmpegPath, [
      '-i', inputPath,
      '-vf', 'scale=1280:-2',       // Downscale to 1280px width
      '-c:v', 'libx264',
      '-crf', '28',                  // Quality (lower = better, 28 is good for bg)
      '-preset', 'fast',
      '-an',                         // Remove audio
      '-movflags', '+faststart',     // Move moov atom to start for fast streaming
      '-y',                          // Overwrite output if exists
      outputPath,
    ], { stdio: 'inherit' });

    const origSize = (fs.statSync(inputPath).size / 1024 / 1024).toFixed(2);
    const newSize = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
    console.log(`\n✅ Done: ${origSize} MB → ${newSize} MB`);
  } catch (err) {
    console.error(`❌ Failed to process ${input}:`, err.message);
  }
}

console.log('\nAll done! Replace the original files with the *-opt.mp4 versions in /public.');
