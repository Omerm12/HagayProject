// backend/bundle-components.js
import { ComponentLoader } from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// יצירת ה-loader
const componentLoader = new ComponentLoader();

// רישום קומפוננטות מותאמות
componentLoader.add('UploadEditComponent', path.join(__dirname, 'components/UploadEdit.jsx'));
componentLoader.add('UploadShowComponent', path.join(__dirname, 'components/UploadShow.jsx'));
componentLoader.add('UploadListComponent', path.join(__dirname, 'components/UploadList.jsx'));

// נתיב לשמירת הקובץ שנוצר
const outPath = path.join(__dirname, 'public/admin/components.bundle.js');

// יצירת הקובץ בפועל
await componentLoader.bundle(outPath);
