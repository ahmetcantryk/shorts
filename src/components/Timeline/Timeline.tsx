import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface TimelineProps {
  audioUrl: string | null;
  videoUrl: string | null;
  onTimeChange: (time: number) => void;
  currentTime: number;
  duration: number;
  trimStart: number;
  trimEnd: number;
  onTrimChange: (start: number, end: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  audioUrl,
  videoUrl,
  onTimeChange,
  currentTime,
  duration,
  trimStart,
  trimEnd,
  isPlaying,
  onPlayPause,
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!waveformRef.current) return;

    // Initialize WaveSurfer
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#4a5568',
      progressColor: '#3b82f6',
      cursorColor: '#ef4444',
      barWidth: 2,
      barGap: 1,
      height: 80,
      normalize: true,
      backend: 'WebAudio',
    });

    wavesurferRef.current = wavesurfer;

    // Load audio/video
    const mediaUrl = audioUrl || videoUrl;
    if (mediaUrl) {
      wavesurfer.load(mediaUrl);
    }

    wavesurfer.on('interaction', (newTime) => {
      onTimeChange(newTime);
    });

    wavesurfer.on('seeking', (newTime) => {
      onTimeChange(newTime);
    });

    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl, videoUrl]);

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setTime(currentTime);
    }
  }, [currentTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSkipBackward = () => {
    const newTime = Math.max(0, currentTime - 5);
    onTimeChange(newTime);
  };

  const handleSkipForward = () => {
    const newTime = Math.min(duration, currentTime + 5);
    onTimeChange(newTime);
  };

  const trimStartPercent = (trimStart / duration) * 100;
  const trimEndPercent = (trimEnd / duration) * 100;

  return (
    <div className="bg-editor-panel rounded-lg p-4 space-y-4">
      {/* Timeline Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSkipBackward}
            className="p-2 hover:bg-gray-700 rounded transition"
            title="5s Geri"
          >
            <SkipBack size={20} />
          </button>
          <button
            onClick={onPlayPause}
            className="p-3 bg-editor-accent hover:bg-blue-600 rounded-full transition"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={handleSkipForward}
            className="p-2 hover:bg-gray-700 rounded transition"
            title="5s İleri"
          >
            <SkipForward size={20} />
          </button>
        </div>

        <div className="text-sm text-gray-400">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Waveform */}
      <div className="relative">
        <div ref={waveformRef} className="w-full" />

        {/* Trim Markers */}
        {duration > 0 && (
          <div className="relative h-2 mt-2 bg-gray-700 rounded">
            {/* Selected Region */}
            <div
              className="absolute h-full bg-editor-accent opacity-30"
              style={{
                left: `${trimStartPercent}%`,
                width: `${trimEndPercent - trimStartPercent}%`,
              }}
            />

            {/* Start Marker */}
            <div
              className="absolute top-0 w-1 h-full bg-green-500"
              style={{ left: `${trimStartPercent}%` }}
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500 rounded-full" />
            </div>

            {/* End Marker */}
            <div
              className="absolute top-0 w-1 h-full bg-red-500"
              style={{ left: `${trimEndPercent}%` }}
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Trim Info */}
      <div className="flex justify-between text-xs text-gray-400">
        <span>Başlangıç: {formatTime(trimStart)}</span>
        <span>Bitiş: {formatTime(trimEnd)}</span>
        <span>Süre: {formatTime(trimEnd - trimStart)}</span>
      </div>
    </div>
  );
};
