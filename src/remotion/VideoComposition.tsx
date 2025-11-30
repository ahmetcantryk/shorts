import React from 'react';
import { AbsoluteFill, Video, Audio, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Subtitle, TextOverlay } from '../types';

interface VideoCompositionProps {
  videoSrc: string;
  audioSrc?: string;
  subtitles: Subtitle[];
  textOverlays: TextOverlay[];
  trimStart: number;
  trimEnd: number;
}

export const VideoComposition: React.FC<VideoCompositionProps> = ({
  videoSrc,
  audioSrc,
  subtitles,
  textOverlays,
  trimStart,
  trimEnd,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps + trimStart;

  // Find active subtitle
  const activeSubtitle = subtitles.find(
    (sub) => currentTime >= sub.startTime && currentTime <= sub.endTime
  );

  // Find active text overlays
  const activeOverlays = textOverlays.filter(
    (overlay) => currentTime >= overlay.startTime && currentTime <= overlay.endTime
  );

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {/* Video Layer */}
      <Video
        src={videoSrc}
        startFrom={Math.floor(trimStart * fps)}
        endAt={Math.floor(trimEnd * fps)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Audio Layer */}
      {audioSrc && (
        <Audio
          src={audioSrc}
          startFrom={Math.floor(trimStart * fps)}
          endAt={Math.floor(trimEnd * fps)}
        />
      )}

      {/* Subtitle Layer */}
      {activeSubtitle && (
        <AbsoluteFill
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: '15%',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              padding: '12px 24px',
              borderRadius: '8px',
              maxWidth: '80%',
            }}
          >
            <p
              style={{
                color: 'white',
                fontSize: '32px',
                fontWeight: 'bold',
                textAlign: 'center',
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {activeSubtitle.text}
            </p>
          </div>
        </AbsoluteFill>
      )}

      {/* Text Overlays Layer */}
      {activeOverlays.map((overlay) => (
        <AbsoluteFill key={overlay.id}>
          <div
            style={{
              position: 'absolute',
              left: `${overlay.x}%`,
              top: `${overlay.y}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: `${overlay.fontSize}px`,
              color: overlay.color,
              fontFamily: overlay.fontFamily,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              whiteSpace: 'nowrap',
            }}
          >
            {overlay.text}
          </div>
        </AbsoluteFill>
      ))}
    </AbsoluteFill>
  );
};
