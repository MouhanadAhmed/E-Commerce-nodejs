import { AppError } from './AppError.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dylxc3c5f', 
  api_key: '141687174381899', 
  api_secret: 'pSXROsOeJYbCj4JkXhRnqbUW1Uc' 
});

export const uploadSingleFileCloud = (fieldName) => {

const storage = multer.diskStorage({})
  function fileFilter (req, file, cb) {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new AppError('images only',401),false)
    }
  }
  const upload = multer({ storage, fileFilter })
  return upload.single(fieldName);
}


