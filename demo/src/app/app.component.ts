import { Component } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl:'app.component.html',
  styleUrls:['app.component.css']
})
export class AppComponent {

  // almost same logic exists in top-menu component
  public ngAfterContentInit(): any {
    setTimeout(()=>{
      if (typeof PR !== 'undefined') {
        // google code-prettify
        PR.prettyPrint();
      }
    }, 150);
  }
}
