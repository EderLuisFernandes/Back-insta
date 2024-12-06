import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "uploads/"); 
    },
    filename: function (request, file, callback) {
        const fileExtension = path.extname(file.originalname); // Obtém a extensão do arquivo
        callback(null, `${fileExtension}`); 
    },
});

export default storage;
