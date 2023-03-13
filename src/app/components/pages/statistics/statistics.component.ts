import { Component, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { BackendService } from 'src/app/services/backend.service';
import { StorageService } from 'src/app/services/storage.service';
import { TwitchUsersService } from 'src/app/services/twitch-users.service';

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

    length: number = 0;
    pageSize: number = 0;
    pageIndex: number = 0;
    pageSizeOptions: number[] = [5, 10, 25, 50];

    hidePageSize: boolean = false;
    showPageSizeOptions: boolean = true;
    showFirstLastButtons: boolean = true;
    disabled: boolean = false;

    pageEvent: PageEvent = PageEvent.prototype;

    color: ThemePalette = 'primary';
    requesting: boolean = true;

    constructor(private storage: StorageService, private backend: BackendService, twitchUsers: TwitchUsersService) {

        this.statistics = { streamers: [], posters: [], firsts: [], recents: [] };
        this.sorted = { streamers: [], posters: [], firsts: [], recents: [] };

        this.backend.get<any>(`/stats/${this.storage.user?.id}`, {
            statistics: true, // or object defining what parts of the [streamers or any property, ie. features...] to return
        })
            .subscribe(({ statistics }) => {
                this.statistics = statistics;
                console.log({ statistics });

                this.length = this.statistics.streamers.length;
                this.pageSize = this.pageSizeOptions[1];

                const ids: string[] = removeDuplicates([
                    ...this.statistics.streamers.map(x => ({ legacy: x.legacy, id: x.streamer_id })),
                    ...this.statistics.posters.map(x => ({ legacy: x.legacy, id: x.poster_id })),
                    ...this.statistics.firsts.map(x => ({ legacy: x.legacy, id: x.streamer_id })),
                    ...this.statistics.firsts.map(x => ({ legacy: x.legacy, id: x.poster_id })),
                    ...this.statistics.recents.map(x => ({ legacy: x.legacy, id: x.streamer_id })),
                    ...this.statistics.recents.map(x => ({ legacy: x.legacy, id: x.poster_id })),
                ]);

                const pred = (value: any): string => {
                    return value.legacy === true ? `login=${value.id}` : `id=${value.id}`;
                };
                twitchUsers.append(ids.map(pred))
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
