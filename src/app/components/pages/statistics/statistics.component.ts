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

interface Statistics extends Record<string, any> {
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
    sorted: Statistics;

    @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

    length = 50;
    pageSize = 10;
    pageIndex = 0;
    pageSizeOptions = [5, 10, 25, 50];

    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;

    pageEvent: PageEvent = PageEvent.prototype;

    constructor(private storage: StorageService, private backend: BackendService) {

        this.statistics = { guests: [], posted_bys: [], firsts: [], recents: [] };
        this.sorted = { guests: [], posted_bys: [], firsts: [], recents: [] };

        this.backend.get<any>(`/v3/api/common/${this.storage.user?.id}`, {
            statistics: true, // or object defining what parts of the [guests or any property, ie. features...] to return
        })
            .subscribe(({ statistics }) => {
                this.statistics = statistics;
                console.log({ statistics });

                this.length = this.statistics.guests.length;
                this.sorted = { 
                    guests: this.statistics.guests.slice(0, this.pageSize), 
                    posted_bys: this.statistics.posted_bys.slice(0, this.pageSize), 
                    firsts: this.statistics.firsts.slice(0, this.pageSize), 
                    recents: this.statistics.recents.slice(0, this.pageSize) 
                };
            });
    }

    sortTab(sort: any, key: string): void {
        const data = this.statistics[key].slice();

        if (firstInit(this.sorted[key], sort, data)) return;

        this.statistics[key] = data.sort((a: any, b: any) => {
            return compare(a[sort.active], b[sort.active], sort.direction === 'asc');
        });

        this.sorted[key] = this.pageSlice(this.statistics[key]);
    }

    tabChanged(tabChangeEvent: MatTabChangeEvent): void {
        const keys = Object.keys(this.statistics);
        const key = keys[tabChangeEvent.index];
        this.sorted[key] = this.tabSortedReset(this.statistics[key]);
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

        const keys = Object.keys(this.statistics);   
        const key = keys[this.tabGroup.selectedIndex || 0];
        this.sorted[key] = this.pageSlice(this.statistics[key]);
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
