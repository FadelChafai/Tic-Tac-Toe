"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GameComponent = (function () {
    function GameComponent() {
        this.nextMove = 'x';
        this.waitingRobot = false;
        this.boardObject = {
            'one': '',
            'two': '',
            'three': '',
            'four': '',
            'five': '',
            'six': '',
            'seven': '',
            'eight': '',
            'nine': ''
        };
        this.board = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    }
    GameComponent.prototype.move = function (elem, event) {
        if (this.waitingRobot === false) {
            if (this.boardObject[elem] != '') {
                console.log('Already selected');
                return;
            }
            this.boardObject[elem] = event.target.innerText = this.nextMove;
            this.nextMove = (this.nextMove == 'x') ? 'O' : 'x';
            this.waitingRobot = true;
        }
        else {
            console.log('Waiting for Robot');
        }
    };
    GameComponent.prototype.ngOnInit = function () {
    };
    GameComponent.prototype.reset = function () {
        var _this = this;
        $(".span1").html('');
        Object.keys(this.boardObject).forEach(function (v) { return _this.boardObject[v] = ''; });
        this.nextMove = 'x';
        this.waitingRobot = false;
    };
    GameComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'game.component.html'
        })
    ], GameComponent);
    return GameComponent;
}());
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map