import axios from 'axios';

import $api from '@/http';
import { API_URL } from '@/settings';

export default class SurveyService {
    static async create(dates, expiresIn) {
        return $api.post('/createsurvey', {
            dates,
            expiresIn,
        });
    }

    static async getByLink(link) {
        return axios.get(`${API_URL}/survey/${link}`);
    }
}
