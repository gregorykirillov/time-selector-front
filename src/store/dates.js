import { makeAutoObservable, toJS } from 'mobx';

import { SurveyService } from '@/services';

class Dates {
    dates = []
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setNewDates(dates) {
        this.dates.length = 0;
        this.dates.push(...dates);
    }

    addDate(date) {
        this.dates.push(date);
    }

    removeDate(date) {
        const filtered = this.get().filter((d) => d !== date);

        this.dates.length = 0;
        this.dates.push(...filtered);
    }

    clearDates() {
        this.dates.length = 0;
    }

    get() {
        return toJS(this.dates);
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async loadDates(link) {
        this.setLoading(true);

        const { data } = await SurveyService.getByLink(link);
        if (!data) return [];

        const formattedDates = [];

        Object.entries(data.dates).map((day) => {
            return day[1].map((time) => {
                formattedDates.push(`${day[0]} ${time}`);
            });
        });

        this.setLoading(false);
        return toJS(formattedDates);
    }
}

export default new Dates();
