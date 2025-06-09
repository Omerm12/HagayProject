// backend/admin.bundle.config.js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const componentBundlerConfig = {
  components: {
    CustomUploadEditComponent: path.join(__dirname, 'components/UploadEdit.jsx'),
    CustomUploadShowComponent: path.join(__dirname, 'components/UploadShow.jsx'),
    CustomUploadListComponent: path.join(__dirname, 'components/UploadList.jsx'),
  },
  outDir: path.join(__dirname, 'public/adminjs'),
};
