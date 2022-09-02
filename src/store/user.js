import { makeAutoObservable, toJS } from "mobx";

import $api from "@/http";
import axios from "axios";
import { API_URL } from "@/settings";
import {AuthService, LocalStorage} from "@/services";

class Store {
    user = {}
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    getUserInfo() {
        return toJS(this.user);
    }

    async login(email, password) {
        try {
            const res = await AuthService.login(email, password);

            LocalStorage.set('token', res.data.accessToken)
            this.setAuth(true);
            this.setUser(res.data.user);
        } catch(e) {
            alert(e.response?.data?.message);
        }
    }

    async registration(firstName, lastName, email, password) {
        try {
            const res = await AuthService.registration(firstName, lastName, email, password);

            LocalStorage.set('token', res.data.accessToken)
            this.setAuth(true);
            this.setUser(res.data.user);

            return true;
        } catch(e) {
            alert(e.response?.data?.message);

            return false;
        }
    }

    async logout() {
        try {
            const res = await AuthService.logout();

            LocalStorage.remove('token')
            this.setAuth(false);
            this.setUser({});
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        
        try {
            const res = await axios.get(`${API_URL}/refresh`, {withCredentials: true}) 
            LocalStorage.set('token', res.data.accessToken);
            this.setAuth(true);
            this.setUser(res.data.user);
        } catch (e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false);
        }
    }

    async createSurvey(dates, expiresIn=Date.now() + 24 * 60 * 60 * 1000) {
        console.log('CREATING SURVEY', toJS(this.user), expiresIn)
        this.setLoading(true);

        try {
            const {data} = await $api.post(`${API_URL}/survey`, {
                id: this.user.id, dates, expiresIn
            }, {withCredentials: true})
            
            return data;
        } catch(e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false);}
    }
}

export default new Store();