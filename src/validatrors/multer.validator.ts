import { extname } from "path";

//class with a bunch of multer middleware 'dressed' as static methods, used to validate files
export class MulterValidators {

    static imageFileFilter(req, file, callback) {//validate based on file types
        if (!file.originalname.toLowerCase().match(/\.(jpe?g|png|gif)$/)) {
           return callback(new Error('Only Image files are allowed!'), false);
        }
        if(file.size > 3000000){
            return callback(new Error("File size exceeds 3mb!"), false); 
        }
        callback(null, true);
    }

    static editFileName(req, file, callback) {
        const name = file.originalname.split('.')[0];
        const randomName = Array(4)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        callback(null, `${name}-${randomName}.${extname(file.originalname)}`);
    }
}