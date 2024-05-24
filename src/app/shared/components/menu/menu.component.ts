import { Component } from '@angular/core';
import { SubmenuComponent } from '../submenu/submenu.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SubmenuComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  activeSubMenu: string | null = null;

  toggleSubMenu(subMenu: string) {
    if (this.activeSubMenu === subMenu) {
      this.activeSubMenu = null;
    } else {
      this.activeSubMenu = subMenu;
    }
  }

}
