import React, { useState, useRef } from 'react';
import { Upload, Film } from 'lucide-react';
import { VideoPreview } from './components/VideoPreview/VideoPreview';
import { Timeline } from './components/Timeline/Timeline';
import { EditorTools } from './components/EditorTools/EditorTools';
import { SubtitleEditor } from './components/SubtitleEditor/SubtitleEditor';
import type { VideoProject, Subtitle, TextOverlay } from './types';
import { exportVideo, downloadBlob } from './utils/export';

function App() {
  const [project, setProject] = useState<VideoProject>({
    id: '1',
    name: 'Yeni Proje',
    videoFile: null,
    audioFile: null,
    duration: 0,
    trimStart: 0,
    trimEnd: 0,
    subtitles: [],
    textOverlays: [],
  });

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setProject((prev) => ({
        ...prev,
        videoFile: file,
      }));
    }
  };

  const handleDuration = (duration: number) => {
    setProject((prev) => ({
      ...prev,
      duration,
      trimEnd: duration,
    }));
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    setCurrentTime(progress.playedSeconds);
  };

  const handleAddSubtitle = (subtitle: Omit<Subtitle, 'id'>) => {
    const newSubtitle: Subtitle = {
      ...subtitle,
      id: Date.now().toString(),
    };
    setProject((prev) => ({
      ...prev,
      subtitles: [...prev.subtitles, newSubtitle],
    }));
  };

  const handleDeleteSubtitle = (id: string) => {
    setProject((prev) => ({
      ...prev,
      subtitles: prev.subtitles.filter((sub) => sub.id !== id),
    }));
  };

  const handleAddTextOverlay = (overlay: Omit<TextOverlay, 'id'>) => {
    const newOverlay: TextOverlay = {
      ...overlay,
      id: Date.now().toString(),
    };
    setProject((prev) => ({
      ...prev,
      textOverlays: [...prev.textOverlays, newOverlay],
    }));
  };

  const handleTrim = (start: number, end: number) => {
    setProject((prev) => ({
      ...prev,
      trimStart: start,
      trimEnd: end,
    }));
  };

  const handleExport = async () => {
    if (!project.videoFile) {
      alert('Lütfen önce bir video yükleyin!');
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    try {
      const blob = await exportVideo(
        project.videoFile,
        project.trimStart,
        project.trimEnd,
        setExportProgress
      );

      downloadBlob(blob, `shorts-${Date.now()}.mp4`);
      alert('Video başarıyla export edildi!');
    } catch (error) {
      console.error('Export hatası:', error);
      alert('Video export edilirken bir hata oluştu: ' + (error as Error).message);
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-editor-bg text-white">
      {/* Header */}
      <header className="bg-editor-panel border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Film size={32} className="text-editor-accent" />
            <h1 className="text-2xl font-bold">YouTube Shorts Editor</h1>
          </div>
          <div className="text-sm text-gray-400">
            {project.name}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {!videoUrl ? (
          /* Upload Screen */
          <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <div className="text-center">
              <div className="mb-6">
                <Film size={64} className="mx-auto text-gray-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Video Yükleyin</h2>
              <p className="text-gray-400 mb-6">
                Düzenlemek için bir video dosyası seçin
              </p>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
              <button
                onClick={() => videoInputRef.current?.click()}
                className="flex items-center gap-2 px-6 py-3 bg-editor-accent hover:bg-blue-600 rounded-lg transition mx-auto"
              >
                <Upload size={20} />
                <span>Video Seç</span>
              </button>
            </div>
          </div>
        ) : (
          /* Editor Screen */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Preview */}
            <div className="lg:col-span-2 space-y-6">
              <VideoPreview
                videoUrl={videoUrl}
                currentTime={currentTime}
                isPlaying={isPlaying}
                onProgress={handleProgress}
                onDuration={handleDuration}
                textOverlays={project.textOverlays}
                subtitles={project.subtitles}
              />

              <Timeline
                videoUrl={videoUrl}
                audioUrl={null}
                onTimeChange={setCurrentTime}
                currentTime={currentTime}
                duration={project.duration}
                trimStart={project.trimStart}
                trimEnd={project.trimEnd}
                onTrimChange={handleTrim}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
              />
            </div>

            {/* Right Panel - Tools */}
            <div className="space-y-6">
              <EditorTools
                onAddTextOverlay={handleAddTextOverlay}
                onTrim={handleTrim}
                onExport={handleExport}
                currentTime={currentTime}
                duration={project.duration}
              />

              <SubtitleEditor
                subtitles={project.subtitles}
                onAddSubtitle={handleAddSubtitle}
                onDeleteSubtitle={handleDeleteSubtitle}
                currentTime={currentTime}
              />
            </div>
          </div>
        )}

        {/* Export Progress Modal */}
        {isExporting && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-editor-panel p-8 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Video Export Ediliyor...</h3>
              <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                <div
                  className="bg-editor-accent h-4 rounded-full transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
              <p className="text-center text-gray-400">{Math.round(exportProgress)}%</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
