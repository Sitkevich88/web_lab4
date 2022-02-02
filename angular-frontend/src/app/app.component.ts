import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit{
  title = 'Web project #4';

  constructor() {
    if (localStorage.getItem('theme') === 'theme-dark') {
      this.setTheme('theme-dark');
    } else {
      this.setTheme('theme-light');
    }
  }

  ngOnInit(): void {}

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
