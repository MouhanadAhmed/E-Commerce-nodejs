import  AppError  from './services/AppError.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

 


export const uploadSingleFile = (fieldName,folderName) => {
    const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, `uploads/${folderName}`)
    },
    filename: function (req, file, cb) {
      cb(null,uuidv4() +'-'+  file.originalname);
    }
  })
  
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

export const uploadMixFilesCloud = (arrayFileds) => {

  const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, `uploads/${folderName}`)
    },
    filename: function (req, file, cb) {
      cb(null,uuidv4() +'-'+  file.originalname);
    }
  })
    function fileFilter (req, file, cb) {
      if(file.mimetype.startsWith('image')){
          cb(null, true)
      }else{
          cb(new AppError('images only',401),false)
      }
    }
    const upload = multer({ storage, fileFilter })
    return upload.fields(arrayFileds);
  }
  
