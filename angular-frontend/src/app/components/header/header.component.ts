import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  setTheme(themeName:string) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
  }

  toggleTheme(): void{
    if (localStorage.getItem('theme') === 'theme-dark'){
      this.setTheme('theme-light');
    } else {
      this.setTheme('theme-dark');
    }
  }

}
