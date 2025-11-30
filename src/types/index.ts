export interface VideoProject {
  id: string;
  name: string;
  videoFile: File | null;
  audioFile: File | null;
  duration: number;
  trimStart: number;
  trimEnd: number;
  subtitles: Subtitle[];
  textOverlays: TextOverlay[];
}

export interface Subtitle {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}

export interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  startTime: number;
  endTime: number;
}

export interface TimelineSegment {
  id: string;
  type: 'video' | 'audio' | 'subtitle' | 'text';
  startTime: number;
  endTime: number;
  data: any;
}

export interface ExportSettings {
  width: number;
  height: number;
  fps: number;
  format: 'mp4';
  quality: 'low' | 'medium' | 'high';
}
