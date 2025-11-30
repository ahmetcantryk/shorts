import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import type { TextOverlay, Subtitle } from '../../types';

const Player: any = ReactPlayer;

interface VideoPreviewProps {
  videoUrl: string | null;
  currentTime: number;
  isPlaying: boolean;
  onProgress: (progress: { playedSeconds: number }) => void;
  onDuration: (duration: number) => void;
  textOverlays: TextOverlay[];
  subtitles: Subtitle[];
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoUrl,
  currentTime,
  isPlaying,
  onProgress,
  onDuration,
  textOverlays,
  subtitles,
}) => {
  const playerRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (playerRef.current && currentTime !== undefined) {
      playerRef.current.seekTo(currentTime, 'seconds');
    }
  }, [currentTime]);

  // Find active subtitle
  const activeSubtitle = subtitles.find(
    (sub) => currentTime >= sub.startTime && currentTime <= sub.endTime
  );

  // Find active text overlays
  const activeOverlays = textOverlays.filter(
    (overlay) => currentTime >= overlay.startTime && currentTime <= overlay.endTime
  );

  const handleProgress = (state: any) => {
    onProgress(state);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-editor-panel rounded-lg p-4">
      <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '9/16', width: '100%', maxWidth: '360px' }}>
        {videoUrl ? (
          <>
            <Player
              ref={playerRef}
              url={videoUrl}
              playing={isPlaying}
              onProgress={handleProgress}
              onDuration={onDuration}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
              progressInterval={100}
            />

            {/* Subtitle Overlay */}
            {activeSubtitle && (
              <div className="absolute bottom-20 left-0 right-0 text-center px-4">
                <div className="inline-block bg-black bg-opacity-75 px-4 py-2 rounded">
                  <p className="text-white text-lg font-bold">{activeSubtitle.text}</p>
                </div>
              </div>
            )}

            {/* Text Overlays */}
            {activeOverlays.map((overlay) => (
              <div
                key={overlay.id}
                className="absolute"
                style={{
                  left: `${overlay.x}%`,
                  top: `${overlay.y}%`,
                  fontSize: `${overlay.fontSize}px`,
                  color: overlay.color,
                  fontFamily: overlay.fontFamily,
                  transform: 'translate(-50%, -50%)',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                }}
              >
                {overlay.text}
              </div>
            ))}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Video yükleyin</p>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
