import { Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
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

    @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

    length = 50;
    pageSize = 10;
    pageIndex = 0;
    pageSizeOptions = [5, 10, 25];

    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;

    pageEvent: PageEvent = PageEvent.prototype;

    constructor(private storage: StorageService, private backend: BackendService) {

        this.statistics = { guests: [], posted_bys: [], firsts: [], recents: [] };

        this.backend.get<any>(`/v3/api/common/${this.storage.user?.id}`, {
            statistics: true, // or object defining what parts of the [guests or any property, ie. features...] to return
        })
            .subscribe(({ statistics }) => {
                this.statistics = statistics;
                console.log({ statistics });
                this.sortedGuests = this.statistics.guests.slice(0, this.pageSize);//.sort((a, b) => compare(a.total, b.total, false));
                this.sortedPostedBys = this.statistics.posted_bys.slice(0, this.pageSize);//.sort((a, b) => compare(a.total, b.total, false));
                this.sortedFirsts = this.statistics.firsts.slice(0, this.pageSize);//.sort((a, b) => compare(a.timestamp, b.timestamp, true));
                this.sortedRecents = this.statistics.recents.slice(0, this.pageSize);//.sort((a, b) => compare(a.timestamp, b.timestamp, false));

                this.length = this.statistics.guests.length;

            });
    }

    sortShoutouts(sort: any): void {
        const data = this.statistics.guests.slice();

        if (firstInit(this.sortedGuests, sort, data)) return;

        this.statistics.guests = data.sort((a, b) => {
            return compare(a[sort.active], b[sort.active], sort.direction === 'asc');
        });

        this.sortedGuests = this.pageSlice(this.statistics.guests);
    }

    sortPostedBys(sort: any): void {
        const data = this.statistics.posted_bys.slice();

        if (firstInit(this.sortedPostedBys, sort, data)) return;

        this.statistics.posted_bys = data.sort((a, b) => {
            return compare(a[sort.active], b[sort.active], sort.direction === 'asc');
        });

        this.sortedPostedBys = this.pageSlice(this.statistics.posted_bys);
    }

    sortFirsts(sort: any): void {
        const data = this.statistics.firsts.slice();

        if (firstInit(this.sortedFirsts, sort, data)) return;

        this.statistics.firsts = data.sort((a, b) => {
            return compare(a[sort.active], b[sort.active], sort.direction === 'asc');
        });

        this.sortedFirsts = this.pageSlice(this.statistics.firsts);
    }

    sortRecents(sort: any): void {
        const data = this.statistics.recents.slice();

        if (firstInit(this.sortedRecents, sort, data)) return;

        this.statistics.recents = data.sort((a, b) => {
            return compare(a[sort.active], b[sort.active], sort.direction === 'asc');
        });

        this.sortedRecents = this.pageSlice(this.statistics.recents);
    }

    tabChanged(tabChangeEvent: MatTabChangeEvent): void {
        switch (tabChangeEvent.index) {
            case 0:
                this.sortedGuests = this.tabSortedReset(this.statistics.guests);
                break;
            case 1:
                this.sortedPostedBys = this.tabSortedReset(this.statistics.posted_bys);
                break;
            case 2:
                this.sortedFirsts = this.tabSortedReset(this.statistics.firsts);
                break;
            case 3:
                this.sortedRecents = this.tabSortedReset(this.statistics.recents);
                break;
            default:
                this.pageIndex = 0;
                this.length = 0;
                break;
        }
    }

    tabSortedReset(statistic: any[]): any[] {
        this.length = statistic.length;
        this.pageIndex = 0;
        this.pageEvent.length = this.length;
        this.pageEvent.pageIndex = this.pageIndex;
        this.pageEvent.pageSize = this.pageSize;
        return this.pageSlice(statistic);
    }

    pageSlice(statistic: any[]): any[] {
        const startIndex = this.pageIndex * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return statistic.slice(startIndex, endIndex);
    }

    handlePageEvent(e: PageEvent): void {
        this.pageEvent = e;
        this.length = e.length;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
        switch (this.tabGroup.selectedIndex) {
            case 0:
                this.sortedGuests = this.pageSlice(this.statistics.guests);
                break;
            case 1:
                this.sortedPostedBys = this.pageSlice(this.statistics.posted_bys);
                break;
            case 2:
                this.sortedFirsts = this.pageSlice(this.statistics.firsts);
                break;
            case 3:
                this.sortedRecents = this.pageSlice(this.statistics.recents);
                break;
            default:
                break;
        }
    }

    setPageSizeOptions(setPageSizeOptionsInput: string): void {
        if (setPageSizeOptionsInput) {
            this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
        }
    }
}

function firstInit(sorted: any[], sort: any, data: any): boolean {
    if (!sort.active || sort.direction === '') {
        sorted = data;
        return true;
    }
    return false;
}

function compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
