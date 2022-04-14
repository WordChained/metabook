import axios from 'axios';
import { secrets } from '../secrets';
//cloudinary-service
// AXIOS

export const uploadImg = async (file, userId = 'unknown') => {
  let sec
  try {
    sec = await secrets
  } catch (err) {
    console.log("couldnt grab secrets");
  }
  // Defining our variables
  const UPLOAD_PRESET = sec.CLOUDINARY_UPLOAD_PRESET // Insert yours
  const CLOUD_NAME = 'wordchained' // Insert yours
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData();
  // Building the request body
  FORM_DATA.append('file', file)
  FORM_DATA.append('folder', userId);
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)
  // Sending a post method request to Cloudniarys' API
  try {
    const res = await axios.post(UPLOAD_URL, FORM_DATA)
    return res.data;
  } catch (err) {
    console.log('Error on img upload service =>', err)
  }
}
export const uploadImageToSubFolder = async (file, userId = 'unknown', targetSubFolder) => {
  // Defining our variables
  const UPLOAD_PRESET = 'gxmzvuyc' // Insert yours
  const CLOUD_NAME = 'wordchained' // Insert yours
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData();
  // Building the request body
  FORM_DATA.append('file', file)
  FORM_DATA.append('folder', `${userId}/${targetSubFolder}`);
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)
  // Sending a post method request to Cloudniarys' API
  // console.log('FORM_DATA:', FORM_DATA);
  try {
    const res = await axios.post(UPLOAD_URL, FORM_DATA)
    return res.data;
  } catch (err) {
    console.log('Error on img upload service =>', err)
  }
}
