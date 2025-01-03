const multer = require("multer");
const { getDownloadURL, ref, uploadBytes, deleteObject } = require("firebase/storage");
const { fireBaseStorage } = require("../config/FireBase");



const uploadToFirebase = async (file, fileType, id, userId) => {
  try {
    const folderPath =
      fileType === "img"
        ? `private/users/${userId}/receipts/${id}`
        : fileType === "userImg"
          ? `private/users/${userId}/profile`
          : `other`;

    const timestamp = Date.now() + Math.floor(Math.random() * 1000);
    const originalname = file.originalname;
    const filename = `${originalname}-${timestamp}`

    const storageRef = ref(fireBaseStorage, `MonoApp/${folderPath}/${filename}`);

    await uploadBytes(storageRef, file.buffer);

    const downloadURL = await getDownloadURL(storageRef);

    if(fileType === "userImg") {
      return downloadURL;
    }

    return {
      url: downloadURL,
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };
  } catch (error) {
    console.error("Error uploading to Firebase:", error);
    throw error;
  }
};

 const deleteFromFirebase = async (fileUrl) => {
  try {
    // URL'den dosya yolunu çıkar
    const decodedPath = decodeURIComponent(fileUrl.split("/o/")[1].split("?")[0]);

    // Firebase Storage referansı oluştur
    const storageRef = ref(fireBaseStorage, decodedPath);

    // Dosyayı sil
    await deleteObject(storageRef);

    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting from Firebase:", error);
    throw error;
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

module.exports = {
  uploadToFirebase,
  upload,
  deleteFromFirebase,
};

// const storage = multer.diskStorage({

//   destination: function (req, file, cb) {
//     // const authHeader = req.headers["authorization"];
//     // const token = authHeader && authHeader.split(" ")[1];
//     // const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // const userId = decoded?.id ?? 12345;
//     const fileType = file.fieldname;
//     let pathUrl = `storage/uploads`;
//     const id = req.originalUrl.split('/').pop()?.split('?')[0];

//     if (fileType === "productImages") {
//       pathUrl = pathUrl + `/product/${id}`;
//     } else if (fileType === "profile_image") {
//       // Ticket editlerde endpoint yapısı support/ticketId/sessionId şeklinde yani diğerlerinden farklı
//       // O yüzden ticketId yi farklı aldırmak durumundayız.
//       pathUrl = pathUrl + `/profile`;
//     } else {
//       const error = new Error('Invalid file type.');
//       return cb(error, "error");
//     }

//     fs.mkdirSync(pathUrl, { recursive: true });

//     cb(null, pathUrl);
//   },

//   filename: function (req, file, cb) {
//     const timestamp = Date.now() + Math.floor(Math.random() * 1000);
//     const originalname = file.originalname;
//     const extension = path.extname(originalname);
//     const filename = `${timestamp}${extension}`;
//     cb(null, filename);
//   },
// });

// const fileFilter = (req, file, cb) => {

//   const fileType = file.fieldname;
//   const ext = path.extname(file.originalname).toLowerCase();
//   const mimetype = "." + file.mimetype.split('/')[1];

//   // Dosya kontrolü
//   if (fileType === 'productImages' || fileType === "profile_image" || fileType === "company_logo") {
//     const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
//     if (ext !== mimetype && !allowedFileTypes.includes(ext)) {
//       const error = new Error('Invalid file type. Only JPG, JPEG, PNG, GIF, and WEBP files are allowed.');
//       return cb(error, false);
//     };
//   } else if (fileType === 'product_guides') {
//     const allowedFileTypes = ['.pdf'];
//     if (ext !== mimetype && !allowedFileTypes.includes(ext)) {
//       const error = new Error('Invalid file type. Only PDF files are allowed.');
//       return cb(error, false);
//     };
//   } else {
//     const error = new Error('Invalid file type.');
//     return cb(error, false);
//   }

//   // istekten gelen max img count kontrolü
//   let maxFile = 0;
//   if (fileType === "productImages") {
//     maxFile = 10;
//   } else if (fileType === "ticket_images") {
//     maxFile = 4;
//   } else if (fileType === "product_guides") {
//     maxFile = 2;
//   } else if (fileType === "profile_image") {
//     maxFile = 1;
//   }

//   const fileCount = Array.isArray(req.files) ? req.files.length : 1;
//   if (fileCount > maxFile) {
//     const error = new Error(`Maximum ${maxFile} img can be loaded.`);
//     return cb(error, false);
//   };
//   cb(null, true);
// }

// export const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 10,
//   },
//   fileFilter: fileFilter,

// });
