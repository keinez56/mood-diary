# 心情日記 - 部署指引

## 📋 專案概述
這是一個心情日記分享平台，用戶可以記錄並分享他們的日常心情和感受。

## 🚀 部署步驟

### 1. Supabase 設置

1. 前往 [Supabase](https://supabase.com/) 註冊並創建新專案
2. 在 SQL Editor 中執行以下 SQL 語句創建資料表：

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

3. 從 Supabase 專案設置中獲取：
   - Project URL
   - Anon Key

### 2. Vercel 部署

1. 安裝 Vercel CLI（如果尚未安裝）：
```bash
npm install -g vercel
```

2. 在專案根目錄登入 Vercel：
```bash
vercel login
```

3. 部署專案：
```bash
vercel
```

4. 在 Vercel 專案設置中添加環境變數：
   - `SUPABASE_URL`: 你的 Supabase 專案 URL
   - `SUPABASE_ANON_KEY`: 你的 Supabase Anon Key

### 3. 本地開發

1. 安裝依賴：
```bash
npm install
```

2. 創建 `.env.local` 檔案並添加環境變數：
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. 啟動開發伺服器：
```bash
vercel dev
```

## 📁 專案結構

```
├── api/
│   └── moods.js          # Vercel Functions API
├── index.html            # 主頁面
├── style.css             # 樣式檔案
├── script.js             # 前端邏輯
├── package.json          # 專案配置
├── vercel.json           # Vercel 配置
└── .env.example          # 環境變數範例
```

## 🎯 功能特色

- 📝 記錄心情日記
- 😊 選擇心情類型（開心、難過、興奮等）
- 📱 響應式設計，支援手機和電腦
- 🔄 即時載入和顯示其他用戶的心情
- 🎨 美觀的漸層背景和現代化界面

## 🛠️ 技術堆疊

- **前端**: HTML, CSS, JavaScript
- **後端**: Vercel Functions (Node.js)
- **資料庫**: Supabase (PostgreSQL)
- **部署**: Vercel

## 📝 API 端點

- `GET /api/moods` - 獲取所有心情記錄
- `POST /api/moods` - 創建新的心情記錄

## 🔒 安全注意事項

- 使用 Supabase Row Level Security 保護資料
- 所有 API 請求都經過適當的驗證
- 環境變數安全存儲在 Vercel 中

## 📧 支援

如有問題，請檢查：
1. Supabase 連線是否正常
2. 環境變數是否正確設置
3. Vercel Functions 是否正常運行