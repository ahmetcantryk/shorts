import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

export const loadFFmpeg = async () => {
  if (ffmpeg) return ffmpeg;

  ffmpeg = new FFmpeg();

  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  return ffmpeg;
};

export const exportVideo = async (
  videoFile: File,
  trimStart: number,
  trimEnd: number,
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  const ffmpegInstance = await loadFFmpeg();

  if (!ffmpegInstance) {
    throw new Error('FFmpeg yüklenemedi');
  }

  // Write input file
  await ffmpegInstance.writeFile('input.mp4', await fetchFile(videoFile));

  // Set up progress handler
  if (onProgress) {
    ffmpegInstance.on('progress', ({ progress }) => {
      onProgress(progress * 100);
    });
  }

  // Trim and convert to Shorts format (1080x1920)
  const duration = trimEnd - trimStart;
  await ffmpegInstance.exec([
    '-i', 'input.mp4',
    '-ss', trimStart.toString(),
    '-t', duration.toString(),
    '-vf', 'scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920',
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '23',
    '-c:a', 'aac',
    '-b:a', '128k',
    'output.mp4',
  ]);

  // Read output file
  const data = await ffmpegInstance.readFile('output.mp4');

  // Cleanup
  await ffmpegInstance.deleteFile('input.mp4');
  await ffmpegInstance.deleteFile('output.mp4');

  // Convert to Blob
  const uint8Array = typeof data === 'string' ? new TextEncoder().encode(data) : new Uint8Array(data);
  return new Blob([uint8Array], { type: 'video/mp4' });
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
