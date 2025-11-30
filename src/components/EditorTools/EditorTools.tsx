import React, { useState } from 'react';
import { Type, Scissors, Download } from 'lucide-react';
import type { TextOverlay } from '../../types';

interface EditorToolsProps {
  onAddTextOverlay: (overlay: Omit<TextOverlay, 'id'>) => void;
  onTrim: (start: number, end: number) => void;
  onExport: () => void;
  currentTime: number;
  duration: number;
}

export const EditorTools: React.FC<EditorToolsProps> = ({
  onAddTextOverlay,
  onTrim,
  onExport,
  currentTime,
  duration,
}) => {
  const [showTextDialog, setShowTextDialog] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [fontSize, setFontSize] = useState(32);
  const [color, setColor] = useState('#ffffff');
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(5);

  const handleAddText = () => {
    if (textInput.trim()) {
      onAddTextOverlay({
        text: textInput,
        x: posX,
        y: posY,
        fontSize,
        color,
        fontFamily: 'Arial, sans-serif',
        startTime: startTime,
        endTime: Math.min(endTime, duration),
      });
      setTextInput('');
      setShowTextDialog(false);
    }
  };

  return (
    <div className="bg-editor-panel rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Düzenleme Araçları</h3>

      <div className="space-y-3">
        {/* Text Overlay Tool */}
        <button
          onClick={() => setShowTextDialog(!showTextDialog)}
          className="w-full flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
        >
          <Type size={20} />
          <span>Metin Ekle</span>
        </button>

        {showTextDialog && (
          <div className="bg-gray-800 p-4 rounded-lg space-y-3">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Metin giriniz..."
              className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-editor-accent outline-none"
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Boyut</label>
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 outline-none"
                  min="12"
                  max="72"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Renk</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 bg-gray-700 rounded border border-gray-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">X Pozisyon (%)</label>
                <input
                  type="number"
                  value={posX}
                  onChange={(e) => setPosX(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 outline-none"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Y Pozisyon (%)</label>
                <input
                  type="number"
                  value={posY}
                  onChange={(e) => setPosY(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 outline-none"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Başlangıç (s)</label>
                <input
                  type="number"
                  value={startTime}
                  onChange={(e) => setStartTime(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 outline-none"
                  min="0"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Bitiş (s)</label>
                <input
                  type="number"
                  value={endTime}
                  onChange={(e) => setEndTime(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 outline-none"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            <button
              onClick={handleAddText}
              className="w-full py-2 bg-editor-accent hover:bg-blue-600 rounded transition"
            >
              Metni Ekle
            </button>
          </div>
        )}

        {/* Trim Tool */}
        <button
          onClick={() => {
            const start = Math.max(0, currentTime - 2);
            const end = Math.min(duration, currentTime + 2);
            onTrim(start, end);
          }}
          className="w-full flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
        >
          <Scissors size={20} />
          <span>Geçerli Konumda Kes</span>
        </button>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="w-full flex items-center gap-3 p-3 bg-green-600 hover:bg-green-700 rounded-lg transition font-semibold"
        >
          <Download size={20} />
          <span>MP4 Olarak İndir</span>
        </button>
      </div>
    </div>
  );
};
