import {login} from "@/services/LoginRequest.js"

const KEY_TOKEN = 'token';
const KEY_EMAIL ='email';
const KEY_NAME = 'name';

const auth={
    state:{
        token: localStorage.getItem( KEY_TOKEN ) || '',
        email: localStorage.getItem( KEY_EMAIL ) || '',
        name: localStorage.getItem( KEY_NAME ) || '',

    },
    mutations: {
        setToken( state, token ) {
            state.token = token;
        },
        setEmail( state, email ) {
            state.email = email;
        },
        setName( state, name ) {
            state.name = name;
        }
    },
    getters:{
        isAuthenticated(state){
            return !!state.token
        }
    },
    actions:{
        login(context,credentials){
            return login(credentials)
                .then(data=>{
                    const{token,email,name}=data
                    localStorage.setItem(KEY_TOKEN, token);
                    localStorage.setItem(KEY_EMAIL, email);
                    localStorage.setItem(KEY_NAME, name);
                    context.commit("setToken",token);
                    context.commit("setEmail",email);
                    context.commit("setName",name);
                    return email;
                });
        },
        logout( { commit } ) {
            localStorage.removeItem( KEY_TOKEN );
            localStorage.removeItem( KEY_EMAIL );
            localStorage.removeItem( KEY_NAME );
        
            commit( 'setToken', '' );
            commit( 'setEmail', '' );
            commit( 'setName', '' );

            return Promise.resolve();
        }
    }
};

export default auth