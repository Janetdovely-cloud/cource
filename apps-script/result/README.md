# 測驗結果專用頁（Google Apps Script）

學員掃描測驗結果的 QR Code 後，只會看到自己的結果圖片，沒有招生網站的其他內容。

- 產生 index.html：`node scripts/build-result-page.mjs`（課程或推薦規則改了要重跑並重新部署）
- 部署：`clasp push -f` 後 `clasp deploy -i <deploymentId>`，維持同一個 /exec 網址
- 網址參數：`t=disc&r=D-I-S-C` 或 `t=interest&r=R-I-A-S-E-C`
