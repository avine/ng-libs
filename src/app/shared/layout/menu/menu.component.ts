import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive, MatIconModule, MatListModule],
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {}
