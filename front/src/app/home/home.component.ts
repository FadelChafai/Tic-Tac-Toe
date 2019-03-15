import {Component} from '@angular/core';

@Component({
    moduleId : module.id,
    templateUrl : 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {

    pageTitle : string = 'API';
    subTitle : string = 'Show data';

}
