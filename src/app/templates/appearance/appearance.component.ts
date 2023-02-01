import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-appearance',
  template: `
  <!-- <span *ngIf="dataSource.iconCss" class="e-menu-icon {{dataSource.iconCss}}"></span>
  {{dataSource.header}} {{dataSource.text}}
  <span *ngIf="dataSource.templateHeader" class="e-login-content">
    <button ejs-button cssClass="e-info">Sign In</button>
  </span> -->



  <form [formGroup]="dataSource.form">
        <mat-divider [ngStyle]="{'border-color': dataSource.form.value['border-color']}" style="border-width: 3px;"></mat-divider>
        <mat-expansion-panel hideToggle
            [ngStyle]="{'color': dataSource.form.value['color'], 'background-color': dataSource.form.value['background-color']}">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    <div class="header" [ngStyle]="{'color': dataSource.form.value['color']}">Appearance</div>
                </mat-panel-title>
                <mat-panel-description [ngStyle]="{'color': dataSource.form.value['color']}">
                    Configure your branding colors.
                </mat-panel-description>
            </mat-expansion-panel-header>
            <mat-form-field class="form-fit-33">
                <mat-label>Font Color</mat-label>
                <input type="color" matInput name="color-font" formControlName="color" />
            </mat-form-field>
            <mat-form-field class="form-fit-33">
                <mat-label>Background Color</mat-label>
                <input type="color" matInput name="color-background" formControlName="background-color" />
            </mat-form-field>
            <mat-form-field class="form-fit-33">
                <mat-label>Border Color</mat-label>
                <input type="color" matInput name="color-borders" formControlName="border-color">
            </mat-form-field>
            <mat-divider class="card-divider"></mat-divider>
            <div style="text-align: left; margin: 10px;">
                <button mat-raised-button [disabled]="!dataSource.form.valid"
                    color="accent">Randomize</button>

                <button mat-raised-button [disabled]="!dataSource.form.valid" color="primary"
                    style="float: right;">Reset</button>

                <button mat-raised-button type="submit" [disabled]="!dataSource.form.valid" 
                    color="primary" style="float: right;">Update</button>
            </div>
        </mat-expansion-panel>
        <mat-divider [ngStyle]="{'border-color': dataSource.form.value['border-color']}" style="border-width: 3px;"></mat-divider>
    </form>
`,
  styleUrls: ['./appearance.component.scss']
})
export class AppearanceComponent {
    @Input() dataSource: any;
}
