# 聯成電腦 職涯課程招生網站（打樣 v1）

Vite + React + Tailwind CSS v4 + Motion（Framer Motion），使用 HashRouter，可直接部署到 GitHub Pages。

## 本機預覽

```bash
npm install
npm run dev        # 開發模式 http://localhost:5173
npm run build      # 產出 dist/
npm run preview    # 預覽 dist/
```

## 字型（辰宇落雁體 2.0）

原始字型放在 `fonts-src/`（9MB，不直接上線）。`npm run font` 會掃描 `src/` 用到的字，
產生子集 `public/fonts/chenyuluoyan-subset.woff2`（約 330KB），由 `@font-face` 載入。
**新增或修改文案後要重跑 `npm run font`**，新字才會套用手寫體。（需要 `pip install fonttools brotli`）

## 新增一門課程

1. 在 `src/data/courses.js` 的 `courseIndex` 把該課程改成 `ready: true` 並補上圖片、標語。
2. 在同檔的 `courses` 物件新增一份與 `infosec` 相同結構的資料。
3. 圖片放在 `src/assets/<課程代號>/`。
4. 重跑 `npm run font`。

課程內頁（`src/pages/CoursePage.jsx`）完全由資料產生，不需要改版面程式。

## GitHub Pages

- `vite.config.js` 的 `base` 預設為相對路徑 `./`，任何 repo 名稱都能用；若要改絕對路徑，建置時設定 `BASE_PATH=/repo名稱/`。
- `.github/workflows/deploy.yml` 已設定好：推到 `main` 後自動建置並部署（需在 repo 設定 Pages 來源為 GitHub Actions）。

## 結構

```
src/
  data/courses.js      課程資料（首頁卡片＋課程內頁）
  data/centers.js      全台認證中心
  pages/Home.jsx       首頁（Hero、Bento 課程牆、就業服務）
  pages/CoursePage.jsx 課程內頁樣板
  components/          游標、動態元件、導覽列、報名表單、圖示
  styles.css           Sketch Cream 設計 Token 與元件樣式
```
