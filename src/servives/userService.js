export const userService = {
    async handleResponse(promise) {
        let authToken = '';
        //authToken = promise.headers.get('Authorization')
        const resJson = await promise.json();
        if (!resJson.message) {
            authToken = resJson.username;
            //document.cookie = `x-auth-token=${authToken}`;
        }
        return resJson;
    },

    async login(user) {
        let loginFormData = new FormData();
        loginFormData.append("username", user.username);
        loginFormData.append("password", user.password);

        return await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            body: loginFormData
        }).then(promise => {
            return this.handleResponse(promise);
        });
    },
    
    async register(user) {
        let registerFormData = new FormData();
        registerFormData.append("username", user.username);
        registerFormData.append("email", user.email);
        registerFormData.append("password", user.password);
        registerFormData.append("confirmPassword", user.confirmPassword);

        return await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            body: registerFormData
        }).then(promise => {
            return this.handleResponse(promise);
        });
    }
}