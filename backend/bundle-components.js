import { ComponentLoader } from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();

componentLoader.add('CustomUploadEditComponent', path.join(__dirname, 'components/UploadEdit.jsx'));
componentLoader.add('CustomUploadShowComponent', path.join(__dirname, 'components/UploadShow.jsx'));
componentLoader.add('CustomUploadListComponent', path.join(__dirname, 'components/UploadList.jsx'));

const outPath = path.join(__dirname, 'public/adminjs');
await fs.mkdir(outPath, { recursive: true });
await componentLoader.bundle(path.join(outPath, 'components.bundle.js'));

console.log("✅ components.bundle.js created!");
