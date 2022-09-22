// import axios from 'axios';
// import store from '@/stores';

// // @todo Logic can be bettered to prevent hard-coding authenticated requests
// axios.interceptors.request.use(
//     request => {
//         if( request.url.includes( 'meeting' ) || request.url.includes( 'teams' ) ) {
//             // 'Bearer <token>' is just the requirement for workshops app
//             // In meetings app only token is sent (no 'Bearer ' prefix should be passed)
//             request.headers['Authorization'] = `${store.state.auth.token}`;
//         }
//         return request;
//     },
//     error => Promise.reject( error )
// );