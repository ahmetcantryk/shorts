import { Composition } from 'remotion';
import { VideoComposition } from './VideoComposition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ShortsVideo"
        component={VideoComposition as any}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          videoSrc: '',
          audioSrc: '',
          subtitles: [],
          textOverlays: [],
          trimStart: 0,
          trimEnd: 10,
        }}
      />
    </>
  );
};
