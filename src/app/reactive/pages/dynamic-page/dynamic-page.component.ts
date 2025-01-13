import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-dynamic-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './dynamic-page.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent implements OnInit {

    ngOnInit(): void { }

}
