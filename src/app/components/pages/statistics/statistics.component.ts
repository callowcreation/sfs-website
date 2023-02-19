import { Component, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { User } from 'src/app/interfaces/user';
import { BackendService } from 'src/app/services/backend.service';
import { StorageService } from 'src/app/services/storage.service';
import { TwitchApiService } from 'src/app/services/twitch-api.service';

export interface Dessert {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

interface Statistics extends Record<string, any> {
    streamers: any[];
    posters: any[];
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

    length = 0;
    pageSize = 0;
    pageIndex = 0;
    pageSizeOptions = [5, 10, 25, 50];

    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;

    pageEvent: PageEvent = PageEvent.prototype;

    color: ThemePalette = 'primary';
    requesting: boolean = true;
    users: User[] = [];

    constructor(private storage: StorageService, private backend: BackendService, private twitchApi: TwitchApiService) {

        this.statistics = { streamers: [], posters: [], firsts: [], recents: [] };
        this.sorted = { streamers: [], posters: [], firsts: [], recents: [] };
        this.users = [];

        this.backend.get<any>(`/v3/api/common/${this.storage.user?.id}`, {
            statistics: true, // or object defining what parts of the [streamers or any property, ie. features...] to return
        })
            .subscribe(({ statistics }) => {
                this.statistics = statistics;
                console.log({ statistics });

                this.length = this.statistics.streamers.length;
                this.pageSize = this.pageSizeOptions[1];

                new Promise<void>((resolve) => {
                    const ids = removeDuplicates([
                        ...this.statistics.streamers.map(x => x.streamer_id),
                        ...this.statistics.posters.map(x => x.poster_id),
                        ...this.statistics.firsts.map(x => x.streamer_id),
                        ...this.statistics.firsts.map(x => x.poster_id),
                        ...this.statistics.recents.map(x => x.streamer_id),
                        ...this.statistics.recents.map(x => x.poster_id),
                    ]);
    
                    const chunkSize = 100;
                    for (let i = 0; i < ids.length; i += chunkSize) {
                        const chunk = ids.slice(i, i + chunkSize);
                        twitchApi.usersById(chunk)
                            .subscribe(result => {
                                this.users.push(...result);
                                if(this.users.length === ids.length) {
                                    resolve();
                                }
                            });
                    }
                })
                .then(() => {
                    this.sorted = {
                        streamers: this.statistics.streamers.slice(0, this.pageSize),
                        posters: this.statistics.posters.slice(0, this.pageSize),
                        firsts: this.statistics.firsts.slice(0, this.pageSize),
                        recents: this.statistics.recents.slice(0, this.pageSize)
                    };
                    this.requesting = false;
                });
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
        this.sorted[key] = this.pageSlice(this.statistics[key])

    }

    setPageSizeOptions(setPageSizeOptionsInput: string): void {
        if (setPageSizeOptionsInput) {
            this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
        }
    }
}

function removeDuplicates(arr: any[]) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
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
