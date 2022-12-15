import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('Español');
    this.translateService.addLangs(['Español', 'Ingles', 'Frances']);
  }
}
