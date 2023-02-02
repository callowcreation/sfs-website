import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faq-panel',
  template: `
          <mat-expansion-panel (opened)="state = true" (closed)="state = false">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    {{title}}
                </mat-panel-title>
                <mat-panel-description>
                    {{description}}
                </mat-panel-description>
            </mat-expansion-panel-header>
            <ng-content></ng-content>
        </mat-expansion-panel>
    `,
  styleUrls: ['./faq-panel.component.scss']
})
export class FAQPanel {
    @Input() title: string = '';
    @Input() description: string = '';
    state: boolean = false;
}
