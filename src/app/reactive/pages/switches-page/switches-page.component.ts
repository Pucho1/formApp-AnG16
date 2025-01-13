import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-switches-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './switches-page.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchesPageComponent implements OnInit {

    ngOnInit(): void { }

}
