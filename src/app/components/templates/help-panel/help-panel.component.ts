import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-help-panel',
  template: `
          <mat-expansion-panel (opened)="state = true" (closed)="state = false">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    {{title}}
                </mat-panel-title>
                <mat-panel-description *ngIf="state === true">
                    {{descriptionOpened}}
                </mat-panel-description>
                <mat-panel-description *ngIf="state === false">
                    {{descriptionClosed}}
                </mat-panel-description>
            </mat-expansion-panel-header>
            <ng-content></ng-content>
        </mat-expansion-panel>
    `,
  styleUrls: ['./help-panel.component.scss']
})
export class HelpPanelComponent {
    @Input() title: string = '';
    @Input() descriptionOpened: string = '';
    @Input() descriptionClosed: string = '';
    state: boolean = false;
}
