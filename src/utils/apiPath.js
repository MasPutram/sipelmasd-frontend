const BASE_URL = "/api";

export const API_PATH = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    REGISTER_PETUGAS: `${BASE_URL}/auth/register-petugas`,
    USER_INFO: `${BASE_URL}/auth/getUser`,
    UPLOAD_IMAGE: `${BASE_URL}/auth/upload-image`,
  },

  ADMIN: {
    GET_USERS: `${BASE_URL}/admin/users`,
    DELETE_USER: (id) => `${BASE_URL}/admin/users/${id}`,
  },

  PETUGAS: {
    GET_LAPORAN: `${BASE_URL}/laporan`, // Sama seperti admin
    UPDATE_STATUS: (id) => `${BASE_URL}/laporan/update-status/${id}`,
  },

  MASYARAKAT: {
    BUAT_LAPORAN: `${BASE_URL}/laporan`,
    GET_LAPORAN_SENDIRI: `${BASE_URL}/laporan/me`,
    UPDATE_LAPORAN_SENDIRI: (id) => `${BASE_URL}/laporan/${id}`,
    DELETE_LAPORAN_SENDIRI: (id) => `${BASE_URL}/laporan/${id}`,
  },

  UMUM: {
    GET_SEMUA_LAPORAN: `${BASE_URL}/laporan`,
  }
};
