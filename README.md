# 💭 心情日記 - React + Vite + Shadcn/ui

這是一個現代化的心情日記分享平台，使用 React + Vite + Shadcn/ui + Supabase + Vercel 技術棧。

## 🚀 技術棧

- **前端**: React 18 + TypeScript + Vite
- **UI 庫**: Shadcn/ui + Tailwind CSS
- **後端**: Vercel Functions (Node.js)
- **資料庫**: Supabase (PostgreSQL)
- **部署**: Vercel

## 📁 專案結構

```
├── src/
│   ├── components/          # React 組件
│   │   ├── ui/             # Shadcn UI 組件
│   │   ├── MoodForm.tsx    # 心情表單組件
│   │   └── MoodFeed.tsx    # 心情列表組件
│   ├── hooks/              # 自定義 Hooks
│   │   └── useMoods.ts     # 心情資料管理
│   ├── lib/                # 工具函數
│   │   ├── api.ts          # API 請求
│   │   ├── constants.ts    # 常數定義
│   │   └── utils.ts        # 通用工具
│   ├── types/              # TypeScript 類型定義
│   ├── App.tsx             # 主應用程式
│   ├── main.tsx            # 應用程式入口
│   └── index.css           # 全域樣式
├── api/
│   └── moods.js            # Vercel Functions API
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── components.json         # Shadcn/ui 配置
└── vercel.json             # Vercel 部署配置
```

## 🛠️ 本地開發

### 1. 安裝依賴

```bash
npm install
```

### 2. 設置環境變數

複製 `.env.example` 到 `.env.local`：

```bash
cp .env.example .env.local
```

在 `.env.local` 中填入你的 Supabase 資訊：

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 啟動開發伺服器

```bash
npm run dev
```

專案將在 http://localhost:5173 啟動。

## 🗄️ 資料庫設置

### Supabase 設置

1. 前往 [Supabase](https://supabase.com/) 創建新專案
2. 在 SQL Editor 中執行以下語句：

```sql
-- 創建心情資料表
CREATE TABLE moods (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    mood_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 啟用 Row Level Security
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;

-- 創建政策：允許所有人讀取和插入
CREATE POLICY "Allow public read access" ON moods FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON moods FOR INSERT WITH CHECK (true);
```

3. 從專案設置中獲取 Project URL 和 Anon Key

## 🚀 部署到 Vercel

### 1. 安裝 Vercel CLI

```bash
npm install -g vercel
```

### 2. 登入並部署

```bash
vercel login
vercel
```

### 3. 設置環境變數

在 Vercel Dashboard 中設置以下環境變數：
- `SUPABASE_URL`: 你的 Supabase 專案 URL
- `SUPABASE_ANON_KEY`: 你的 Supabase Anon Key

## 🎯 功能特色

- ✅ 現代化 UI 設計（Shadcn/ui + Tailwind CSS）
- ✅ TypeScript 全面支援
- ✅ 響應式設計
- ✅ 心情記錄與分享
- ✅ 多種心情類型選擇
- ✅ 即時資料更新
- ✅ 漸層背景與毛玻璃效果
- ✅ 載入狀態與錯誤處理

## 📝 可用的心情類型

- 😊 開心
- 😢 難過
- 🎉 興奮
- 😌 平靜
- 😰 焦慮
- 🙏 感謝
- 🤔 困惑
- ❤️ 愛

## 🛠️ 開發指令

```bash
# 開發模式
npm run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview

# 程式碼檢查
npm run lint
```

## 📧 支援

如有問題，請檢查：
1. Node.js 版本是否 >= 16
2. Supabase 連線是否正常
3. 環境變數是否正確設置
4. Vercel Functions 是否正常運行

開發愉快！🎉