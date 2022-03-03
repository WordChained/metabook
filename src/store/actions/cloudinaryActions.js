import { httpService } from '../../services/httpService';
// export const deleteMedia = async (userId,url) => {
//     try {
//         const res = await
//         // return res.data;
//     } catch (err) {
//         console.log('Error on img upload service =>', err)
//     }
// }
export const getAllUserMedia = (userId) => {
    return async dispatch => {
        try {
            const media = await httpService.get(`cloudinary/${userId}`)
            dispatch({ type: 'GET_MEDIA', media, userId })
        } catch (err) {
            console.log('Error on img-upload-service, getAllUsersImages =>', err)
        }
    }
}
// export const addMedia = (userId, media) => {
//     return async dispatch => {
//         try {
//             const res = await httpService.post(`cloudinary`, { media })
//             console.log(' addMedia res:', res);
//             // return res.data;
//             dispatch({ type: 'ADD_MEDIA', res, userId })
//         } catch (err) {
//             console.log('Error on img-upload-service, getAllUsersImages =>', err)
//         }
//     }
// }