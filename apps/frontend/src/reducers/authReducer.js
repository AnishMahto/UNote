export default function authReducer (state = {}, action) {
    switch (action.type) {
        case "LOADING_USER":
            return {
                ...state,
                isLoading:true,
            }
        case "LOADED_USER":
            sessionStorage.clear()
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                isLoading:false,
                isAuthenticated:true,
                user:action.payload.user,
                token:action.payload.token,
            }
        case "LOGOUT_USER":
            localStorage.removeItem("token");
            sessionStorage.clear()
            return {
                ...state,
                token:null,
                isLoading:false,
                isAuthenticated:false,
                user:null,
            }
        case "AUTH_ERROR":
            localStorage.removeItem("token");
            sessionStorage.clear()
            return {
                ...state,
                token:null,
                isLoading:false,
                isAuthenticated:false,
                user:null,
            }
        default:
            return state;
    }
}