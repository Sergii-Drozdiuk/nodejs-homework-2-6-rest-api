import multer from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';

const destination = path.resolve('tmp');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const filename = `${nanoid()}_${file.originalname}`;
    callback(null, filename);
  },
});

const upload = multer({
  storage,
});

export default upload;
