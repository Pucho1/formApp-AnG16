import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface MenuItem {
  title: string,
  router: string
}

@Component({
    selector: 'shared-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {

  public reactiveMenu: MenuItem[] = [
    { title: 'Basicos', router: './reactive/basics'},
    { title: 'Dinamicos', router: './reactive/dynamic'},
    { title: 'Switches', router: './reactive/switches'},
    { title: 'Selectors', router: './reactive/selector'},
  ];


  public authMenu: MenuItem[] = [
    { title: 'Registro', router: './auth'},
  ];

}
