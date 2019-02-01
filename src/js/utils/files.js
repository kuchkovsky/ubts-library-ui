import axios from 'axios';
import { BOOK_DOWNLOAD_TOKEN } from './apiEndpoints';

export const toDataUrl = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const downloadFile = url => {
  axios.get(BOOK_DOWNLOAD_TOKEN)
    .then(response => {
      const link = document.createElement('a');
      link.href = `${url}?token=${response.data.token}`;
      document.body.appendChild(link);
      link.click();
    });
};

export default toDataUrl;
