import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { StorageService } from 'src/app/services/storage.service';

export interface Dessert {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

interface Statistics {
    guests: any[];
    posted_bys: any[];
    firsts: any[];
    recents: any[];
}

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

    statistics: Statistics;
    sortedGuests: any[] = [];
    sortedPostedBys: any[] = [];
    sortedFirsts: any[] = [];
    sortedRecents: any[] = [];

    constructor(private storage: StorageService, private backend: BackendService) {

        this.statistics = { guests: [], posted_bys: [], firsts: [], recents: [] };

        this.backend.get<any>(`/v3/api/common/${this.storage.user?.id}`, {
            statistics: true, // or object defining what parts of the [guests or any property, ie. features...] to return
        })
            .subscribe(({ statistics }) => {
                console.log({ statistics });

                this.statistics = statistics;

                this.sortedGuests = this.statistics.guests.slice().sort((a, b) => compare(a.total, b.total, false));
                this.sortedPostedBys = this.statistics.posted_bys.slice().sort((a, b) => compare(a.total, b.total, false));
                this.sortedFirsts = this.statistics.firsts.slice().sort((a, b) => compare(a.timestamp, b.timestamp, true));
                this.sortedRecents = this.statistics.recents.slice().sort((a, b) => compare(a.timestamp, b.timestamp, false));
            });
    }

    sortShoutouts(sort: any) {
        const data = this.statistics.guests.slice();

        if (firstInit(this.sortedGuests, sort, data)) return;

        this.sortedGuests = data.sort((a, b) => {
            return compare(a[sort.active], b[sort.active], sort.direction === 'asc');
        });
    }

    sortPostedBys(sort: any) {
        const data = this.statistics.posted_bys.slice();

        if (firstInit(this.sortedPostedBys, sort, data)) return;

        this.sortedPostedBys = data.sort((a, b) => {
            return compare(a[sort.active], b[sort.active], sort.direction === 'asc');
        });
    }

    sortFirsts(sort: any) {
        const data = this.statistics.firsts.slice();

        if (firstInit(this.sortedFirsts, sort, data)) return;

        this.sortedFirsts = data.sort((a, b) => {
            return compare(a[sort.active], b[sort.active], sort.direction === 'asc');
        });
    }

    sortRecents(sort: any) {
        const data = this.statistics.recents.slice();

        if (firstInit(this.sortedRecents, sort, data)) return;

        this.sortedRecents = data.sort((a, b) => {
            return compare(a[sort.active], b[sort.active], sort.direction === 'asc');
        });
    }
}

function firstInit(sorted: any[], sort: any, data: any): boolean {
    if (!sort.active || sort.direction === '') {
        sorted = data;
        return true;
    }
    return false;
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
