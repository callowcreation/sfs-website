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
}

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
    desserts: Dessert[] = [
        { name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
        { name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4 },
        { name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6 },
        { name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4 },
        { name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4 },
    ];

    sortedData: Dessert[];

    statistics: Statistics;
    sortedGuests: any[] = [];
    sortedPostedBys: any[] = [];

    constructor(private storage: StorageService, private backend: BackendService) {
        this.sortedData = this.desserts.slice();

        this.statistics = {guests: [], posted_bys: []};

        this.backend.get<any>(`/v3/api/common/${this.storage.user?.id}`, {
            statistics: true, // or object defining what parts of the [guests or any property, ie. features...] to return
        })
        .subscribe(({ statistics }) => {
            console.log({ statistics });

            this.statistics = statistics;

            this.sortedGuests = this.statistics.guests.slice();
            this.sortedPostedBys = this.statistics.posted_bys.slice();
        });
    }

    sortData(sort: any) {
        const data = this.desserts.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }

        this.sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'name':
                    return compare(a.name, b.name, isAsc);
                case 'calories':
                    return compare(a.calories, b.calories, isAsc);
                case 'fat':
                    return compare(a.fat, b.fat, isAsc);
                case 'carbs':
                    return compare(a.carbs, b.carbs, isAsc);
                case 'protein':
                    return compare(a.protein, b.protein, isAsc);
                default:
                    return 0;
            }
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
                case 'fat':
                    return compare(a.fat, b.fat, isAsc);
                case 'carbs':
                    return compare(a.carbs, b.carbs, isAsc);
                case 'protein':
                    return compare(a.protein, b.protein, isAsc);
                default:
                    return 0;
            }
        });
    }

    sortPostedBy(sort: any) {
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
                case 'fat':
                    return compare(a.fat, b.fat, isAsc);
                case 'carbs':
                    return compare(a.carbs, b.carbs, isAsc);
                case 'protein':
                    return compare(a.protein, b.protein, isAsc);
                default:
                    return 0;
            }
        });
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
