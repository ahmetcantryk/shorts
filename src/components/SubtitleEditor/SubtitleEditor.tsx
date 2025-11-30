import React, { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import type { Subtitle } from '../../types';

interface SubtitleEditorProps {
  subtitles: Subtitle[];
  onAddSubtitle: (subtitle: Omit<Subtitle, 'id'>) => void;
  onDeleteSubtitle: (id: string) => void;
  currentTime: number;
}

export const SubtitleEditor: React.FC<SubtitleEditorProps> = ({
  subtitles,
  onAddSubtitle,
  onDeleteSubtitle,
  currentTime,
}) => {
  const [newSubText, setNewSubText] = useState('');
  const [newSubStart, setNewSubStart] = useState(0);
  const [newSubEnd, setNewSubEnd] = useState(3);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSubtitle = () => {
    if (newSubText.trim()) {
      onAddSubtitle({
        text: newSubText,
        startTime: newSubStart,
        endTime: newSubEnd,
      });
      setNewSubText('');
      setNewSubStart(currentTime);
      setNewSubEnd(currentTime + 3);
      setShowAddForm(false);
    }
  };

  const parseSRT = (srtContent: string) => {
    const blocks = srtContent.trim().split('\n\n');
    const parsedSubtitles: Omit<Subtitle, 'id'>[] = [];

    blocks.forEach((block) => {
      const lines = block.split('\n');
      if (lines.length >= 3) {
        const timeLine = lines[1];
        const timeMatch = timeLine.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})/);

        if (timeMatch) {
          const startTime =
            parseInt(timeMatch[1]) * 3600 +
            parseInt(timeMatch[2]) * 60 +
            parseInt(timeMatch[3]) +
            parseInt(timeMatch[4]) / 1000;

          const endTime =
            parseInt(timeMatch[5]) * 3600 +
            parseInt(timeMatch[6]) * 60 +
            parseInt(timeMatch[7]) +
            parseInt(timeMatch[8]) / 1000;

          const text = lines.slice(2).join(' ');

          parsedSubtitles.push({ text, startTime, endTime });
        }
      }
    });

    return parsedSubtitles;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const parsed = parseSRT(content);
        parsed.forEach((sub) => onAddSubtitle(sub));
      };
      reader.readAsText(file);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return `${mins}:${secs.padStart(4, '0')}`;
  };

  return (
    <div className="bg-editor-panel rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Altyazılar</h3>

        <div className="flex gap-2">
          <label className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer transition">
            <Upload size={16} />
            <span className="text-sm">SRT Yükle</span>
            <input
              type="file"
              accept=".srt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-3 py-2 bg-editor-accent hover:bg-blue-600 rounded transition"
          >
            <Plus size={16} />
            <span className="text-sm">Ekle</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-gray-800 p-4 rounded-lg mb-4 space-y-3">
          <textarea
            value={newSubText}
            onChange={(e) => setNewSubText(e.target.value)}
            placeholder="Altyazı metni..."
            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-editor-accent outline-none resize-none"
            rows={2}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Başlangıç (s)</label>
              <input
                type="number"
                value={newSubStart}
                onChange={(e) => setNewSubStart(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 outline-none"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Bitiş (s)</label>
              <input
                type="number"
                value={newSubEnd}
                onChange={(e) => setNewSubEnd(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 outline-none"
                step="0.1"
              />
            </div>
          </div>

          <button
            onClick={handleAddSubtitle}
            className="w-full py-2 bg-editor-accent hover:bg-blue-600 rounded transition"
          >
            Altyazıyı Ekle
          </button>
        </div>
      )}

      {/* Subtitle List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {subtitles.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">Henüz altyazı eklenmedi</p>
        ) : (
          subtitles.map((subtitle) => (
            <div
              key={subtitle.id}
              className={`p-3 rounded border ${
                currentTime >= subtitle.startTime && currentTime <= subtitle.endTime
                  ? 'border-editor-accent bg-gray-700'
                  : 'border-gray-700 bg-gray-800'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm">{subtitle.text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTime(subtitle.startTime)} → {formatTime(subtitle.endTime)}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteSubtitle(subtitle.id)}
                  className="p-1 hover:bg-red-600 rounded transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
