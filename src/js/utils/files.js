import axios from 'axios';
import { BOOK_DOWNLOAD_TOKEN } from './apiEndpoints';

export const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
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

export default toBase64;
