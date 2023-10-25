import  AppError  from './services/AppError.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import cloudinary from './cloudinary.js';

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

export const addPhoto = async (req,res,next) =>{

  console.log(req.file,"test");
  if (!req.file) {
    return res.status(400).json({message:"invalid file"})
  } 
  let {secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:"photos"});
  // let {createdBy} = req.body;
  
  res.json({message:"success",secure_url})
}

export const uploadMixFilesCloud = (arrayFileds,folderName) => {

  const storage = multer.diskStorage({})
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
  
