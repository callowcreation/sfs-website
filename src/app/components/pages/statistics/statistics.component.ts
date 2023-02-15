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
    sortedRecents: any[] = [];

    constructor(private storage: StorageService, private backend: BackendService) {

        this.statistics = {guests: [], posted_bys: [], recents: []};

        this.backend.get<any>(`/v3/api/common/${this.storage.user?.id}`, {
            statistics: true, // or object defining what parts of the [guests or any property, ie. features...] to return
        })
        .subscribe(({ statistics }) => {
            console.log({ statistics });

            this.statistics = statistics;

            this.sortedGuests = this.statistics.guests.slice().sort((a, b) => compare(a.total, b.total, false));
            this.sortedPostedBys = this.statistics.posted_bys.slice().sort((a, b) => compare(a.total, b.total, false));
            this.sortedRecents = this.statistics.recents.slice().sort((a, b) => compare(a.timestamp, b.timestamp, false));
        });
    }

    sortShoutouts(sort: any) {
        const data = this.statistics.guests.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedGuests = data;
            return;
        }

        this.sortedGuests = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'login':
                    return compare(a.login, b.login, isAsc);
                case 'total':
                    return compare(a.total, b.total, isAsc);
                default:
                    return 0;
            }
        });
    }

    sortPostedBys(sort: any) {
        const data = this.statistics.posted_bys.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedPostedBys = data;
            return;
        }

        this.sortedPostedBys = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'login':
                    return compare(a.login, b.login, isAsc);
                case 'total':
                    return compare(a.total, b.total, isAsc);
                default:
                    return 0;
            }
        });
    }

    sortRecents(sort: any) {
        const data = this.statistics.recents.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedRecents = data;
            return;
        }

        this.sortedRecents = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'login':
                    return compare(a.login, b.login, isAsc);
                case 'guest':
                    return compare(a.guest, b.guest, isAsc);
                case 'timestamp':
                    return compare(a.timestamp, b.timestamp, isAsc);
                default:
                    return 0;
            }
        });
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
