import {Component} from '@angular/core';

@Component({
    moduleId : module.id,
    templateUrl : 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {

    pageTitle : string = 'Tic Tac Toe';
    subTitle : string = 'Play the game';

}
