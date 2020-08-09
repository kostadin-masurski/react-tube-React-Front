export const userService = {
    getCookie(name) {
        const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return cookieValue ? cookieValue[2] : null;
    },

    async handleResponse(promise) {
        const resJson = await promise.json();
        if (!resJson.message) {
            const authToken = resJson.jwt;
            document.cookie = `x-auth-token=${authToken}`;
        }
        return resJson;
    },

    async login(user) {
        let loginFormData = new FormData();
        if (user) {
            loginFormData.append("username", user.username);
            loginFormData.append("password", user.password);
        }

        return await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { jwt: this.getCookie('x-auth-token') },
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