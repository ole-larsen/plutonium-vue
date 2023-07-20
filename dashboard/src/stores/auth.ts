import {getCurrentInstance} from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    provider:   getCurrentInstance()?.appContext.config.globalProperties.$rpc,
    _user: JSON.parse(localStorage.getItem("user") as string),
  }),
  getters: {
    user:  (state) => state._user,
  },
  actions: {
    getBodyString(credentials: { [property: string]: string }): string {
      const formData = new FormData();
      if (credentials.username) {
        formData.append("username", credentials.username);
      }
      if (credentials.password) {
        formData.append("password", credentials.password);
      }

      // data to be sent to the POST request
      let body = "";
      for (let prop in credentials) {
        if (credentials.hasOwnProperty(prop)) {
          body += prop + "=" + (credentials as {
            [property: string]: string
          })[prop] + "&";
        }
      }
      return body.slice(0, -1);
    },
    signup(credentials: {
      username: string;
      email: string;
      password: string;
      repeat: string;
    }) {
      if (!credentials.email || !credentials.password) {
        throw new Error("invalid credentials");
      }
      if (credentials.password !== credentials.repeat) {
        throw new Error("password not match");
      }
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/auth/signup`, {
        method: "POST", // or "PUT"
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          return response.status !== 200 ? response.json() : response.text();
        })
        .then(response => {
          return response;
        })
        .catch(e => {
          console.error(e);
          throw e;
        })

    },
    login(credentials: {username: string, password: string } ) {
      if (!credentials.username || !credentials.password) {
        throw new Error("invalid credentials");
      }
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/auth/login`, {
        method: "POST", // or "PUT"
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(response => {
          if (response.code && response.message) {
            localStorage.removeItem("user")
            return response;
          }
          if (response.id) {
            localStorage.setItem("user", JSON.stringify(response));
            this._user = JSON.parse(localStorage.getItem("user") as string);
          }
          return response;
        })
        .catch(e => {
          console.error(e);
          throw e;
        })
    },
    restore(credentials: { username: string } ) {
      if (!credentials.username) {
        throw new Error("invalid credentials");
      }
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/auth/forgot-password`, {
        method: "POST", // or "PUT"
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(response => {
          if (response.code && response.message) {
            return response;
          }
          return response;
        })
        .catch(e => {
          console.log(e);
          throw e;
        })
    },
    check2fa(user2fa: {
      code: string;
      otp:  string;
    }) {
      const user = this._user;
      if (!user || !user.username) {
        throw new Error("invalid credentials");
      }
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/auth/2fa`, {
        method: "POST", // or "PUT"
        body: JSON.stringify({ id: user.id, username: user.username, otp: user2fa.otp, code: user2fa.code, token: user.token }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(response => {
          if (response.code && response.message) {
            return response;
          }
          if (response.id) {
            // add token to user
            localStorage.setItem("user", JSON.stringify(response));
            this._user = JSON.parse(localStorage.getItem("user") as string)
          }
          return response;
        })
        .catch(e => {
          throw e;
        })
    },
    get2fa() {
      const user = this._user;
      if (!user || !user.username) {
        throw new Error("invalid credentials");
      }
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/auth/2fa`, {
        method: "POST", // or "PUT"
        body: JSON.stringify({id: user.id}),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          return response;
        })
        .catch(e => {
          throw e;
        })
    },
    validate() {
      const user = this._user;
      if (!user || !user.username) {
        throw new Error("invalid credentials");
      }
      const headers = {
        "Authorization": `Bearer ${user?.token}`,
      }
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/validate-token?email=${user.email}`, {
        method: "GET",
        headers
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          if (response.code && response.message) {
            return response;
          }
          return response;
        })
        .catch(e => {
          throw e;
        })
    },
    logout() {
      this._user = null;
      localStorage.removeItem("user");
    }
  }
})