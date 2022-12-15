import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regulation',
  templateUrl: './regulation.page.html',
  styleUrls: ['./regulation.page.scss'],
})
export class RegulationPage implements OnInit {

  langs: string [] = [];
  constructor(private translateService: TranslateService) {
    this.langs = this.translateService.getLangs();
  }

  ngOnInit() {
  }
  changeLang(event: any){
    this.translateService.use(event.detail.value);
    console.log(event.detail.value);
  }

}
