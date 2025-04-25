import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: "images/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const fileName = `${file.originalname.split('.')[0]}-${Date.now()}${ext}`;
        cb(null, fileName)
    }
})

const upload = multer({storage})

export default upload