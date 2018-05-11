import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  apiURlauth = 'http://localhost:3000/auth'
  title = 'app';
  

  ngOnInit() {

  }
}


