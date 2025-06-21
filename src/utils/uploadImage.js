import axiosInstance from "./axiosInstance";
import { API_PATH } from "./apiPath";

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await axiosInstance.post(API_PATH.AUTH.UPLOAD_IMAGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.imageUrl;
};
