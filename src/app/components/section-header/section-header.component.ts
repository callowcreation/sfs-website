import { Component } from '@angular/core';

@Component({
    selector: 'app-section-header',
    template: `
    <mat-card>
        <div class="page-section-header">
            <mat-card-title>
                <h1><ng-content></ng-content></h1>
            </mat-card-title>
        </div>
    </mat-card>
    `,
    styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {
}
