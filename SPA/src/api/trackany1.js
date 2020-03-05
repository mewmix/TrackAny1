import axios from 'axios';

const ROOT_URL = 'https://api.trackany1.com';

export default {
    loginWithFacebook() {
        window.location = `${ROOT_URL}/auth/facebook`
    },
    loginWithGoogle() {
        window.location = `${ROOT_URL}/auth/google`
    },
    fetchMyProfile(token, userID) {
        return axios.get(`${ROOT_URL}/api/v1/users/${userID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    // login() {
    //     const queryString = {
    //         client_id: CLIENT_ID,
    //         response_type: 'token'
    //     };

    //     window.location = `${ROOT_URL}/oauth2/authorize?${qs.stringify(queryString)}`;
    // },
    // fetchImages(token) {
    //     return axios.get(`${ROOT_URL}/3/account/me/images`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    // },
    // uploadImages(images, token) {
    //     const promises = Array.from(images).map(image => {
    //         const formData = new FormData();
    //         formData.append('image', image);

    //         return axios.post(`${ROOT_URL}/3/image`, formData, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //     });

    //     return Promise.all(promises);
    // }
}