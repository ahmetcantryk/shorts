# YouTube Shorts Video Editor - MVP

Modern bir YouTube Shorts video düzenleme uygulaması. React, TypeScript ve güçlü video işleme kütüphaneleri ile geliştirilmiştir.

## 🎯 Özellikler

### Video Düzenleme
- ✅ Video yükleme ve önizleme (9:16 Shorts formatı)
- ✅ Timeline ile dalga formu görselleştirmesi (wavesurfer.js)
- ✅ Video kesme ve trim işlemleri
- ✅ Metin overlay ekleme (özelleştirilebilir pozisyon, boyut, renk)
- ✅ Altyazı düzenleyici
- ✅ SRT dosyası import desteği
- ✅ Manuel altyazı oluşturma
- ✅ MP4 export (ffmpeg.wasm ile browser'da işleme)

### UI/UX
- Modern karanlık tema
- Responsive tasarım
- İki panel layout (önizleme + düzenleme araçları)
- Gerçek zamanlı video önizleme
- İlerleme göstergesi ile export

## 🛠️ Teknoloji Stack

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Video Playback:** react-player
- **Audio Timeline:** wavesurfer.js
- **Video Processing:** ffmpeg.wasm
- **Video Composition:** Remotion
- **Icons:** lucide-react
- **File Handling:** Native File API

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev

# Production build
npm run build

# Build preview
npm run preview
```

## 🚀 Kullanım

1. **Video Yükleme**: Ana ekranda "Video Seç" butonuna tıklayarak video dosyası yükleyin
2. **Önizleme**: Video otomatik olarak 9:16 formatında önizlenir
3. **Timeline**: Video dalga formu üzerinde gezinip istediğiniz konuma gidebilirsiniz
4. **Metin Ekleme**: "Metin Ekle" aracı ile videoya dinamik text overlay ekleyebilirsiniz
5. **Altyazı**: Manuel altyazı oluşturabilir veya SRT dosyası yükleyebilirsiniz
6. **Trim**: "Geçerli Konumda Kes" ile videoyu kırpabilirsiniz
7. **Export**: "MP4 Olarak İndir" ile final videonuzu export edin

## 📂 Proje Yapısı

```
shorts/
├── src/
│   ├── components/
│   │   ├── VideoPreview/      # Video önizleme component'i
│   │   ├── Timeline/           # Timeline ve playback kontrolleri
│   │   ├── EditorTools/        # Düzenleme araçları
│   │   └── SubtitleEditor/     # Altyazı yönetimi
│   ├── remotion/               # Remotion video composition
│   ├── utils/                  # Export ve yardımcı fonksiyonlar
│   ├── types/                  # TypeScript type tanımlamaları
│   └── App.tsx                 # Ana uygulama component'i
├── public/                     # Static assets
└── dist/                       # Build output
```

## 🎨 Özelleştirme

### Tailwind Config
`tailwind.config.js` dosyasında özel renkler ve tema ayarları bulunur:
- `editor-bg`: Ana arka plan rengi
- `editor-panel`: Panel arka plan rengi
- `editor-accent`: Vurgu rengi

### Video Export Ayarları
`src/utils/export.ts` dosyasında FFmpeg export parametreleri özelleştirilebilir:
- Resolution: 1080x1920 (Shorts format)
- FPS: 30
- Video codec: H.264
- Audio codec: AAC

## 🔧 Geliştirme

### Yeni Component Ekleme
```tsx
// src/components/YourComponent/YourComponent.tsx
import React from 'react';

export const YourComponent: React.FC<Props> = (props) => {
  return <div>Your component</div>;
};

// src/components/YourComponent/index.ts
export { YourComponent } from './YourComponent';
```

### Type Tanımlamaları
Tüm type tanımlamaları `src/types/index.ts` içinde merkezi olarak yönetilir.

## 📝 TODO / İyileştirmeler

- [ ] Drag & drop ile video upload
- [ ] Daha gelişmiş timeline marker sistemi
- [ ] Undo/Redo fonksiyonalitesi
- [ ] Proje kaydetme/yükleme
- [ ] Ses tanıma ile otomatik altyazı (Whisper API)
- [ ] Video filtreleri ve efektleri
- [ ] Çoklu video track desteği
- [ ] Template sistem

## 🐛 Bilinen Sorunlar

- FFmpeg.wasm ilk yüklemede biraz zaman alabilir
- Çok büyük video dosyaları browser memory limitine takılabilir
- Safari'de bazı video formatları desteklenmeyebilir

## 📄 Lisans

MIT

## 🤝 Katkıda Bulunma

Pull request'ler kabul edilir. Büyük değişiklikler için önce bir issue açarak neyi değiştirmek istediğinizi tartışın.
