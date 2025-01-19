const multer = require("multer");
const { getDownloadURL, ref, uploadBytes, deleteObject } = require("firebase/storage");
const { fireBaseStorage } = require("../config/FireBase");



const uploadToFirebase = async (file, fileType, id, userId) => {
  try {
    const folderPath =
      fileType === "img"
        ? `private/users/${userId}/receipts/${id}`
        : fileType === "profile_image"
          ? `private/users/${userId}/profile`
          : `other`;

    const timestamp = Date.now() + Math.floor(Math.random() * 1000);
    const originalname = file.originalname;
    const filename = `${originalname}-${timestamp}`

    const storageRef = ref(fireBaseStorage, `MonoApp/${folderPath}/${filename}`);

    await uploadBytes(storageRef, file.buffer);

    const downloadURL = await getDownloadURL(storageRef);

    if(fileType === "profile_image") {
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

