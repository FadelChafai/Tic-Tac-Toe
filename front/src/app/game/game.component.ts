import {Component} from '@angular/core';
import {MoveService} from './move.service';
import {IMove} from './move';

declare let $: any;

@Component({
  moduleId: module.id,
  templateUrl: 'game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent {

  nextMoveUnit = 'X';
  nextMove: IMove;
  waitingRobot = false;
  errorMessage = '';

  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  constructor(private _moveService: MoveService) {}

  doMove(box, unit: string, prevent): boolean {

      /**
       * Check if the box is already selected
       */
      if (this.board[box[0]][box[1]] !== '') {
        $('#msg').html('').html('<div class="alert alert-warning"><strong>Warning!</strong> Already selected</div>');
        console.log('Already selected');
        return false;
      }

      /**
       * Select the box and adding css class
       * @type {string}
       */
      unit = unit.toUpperCase();

      this.board[box[0]][box[1]] = unit;

      const id = '#b_' + box[0] + '' + box[1];

      $(id).html(unit);

      if (unit === 'X') {
        $(id).addClass('x disable btn-info');
        this.nextMoveUnit = 'O';
      } else {
        $(id).addClass('o disable btn-primary');
        this.nextMoveUnit = 'X';
      }

      /**
       * Prevent playing twice
       */
      this.waitingRobot = prevent;

      return true;
  }

  move(elem): void {

    /**
     * Check if waiting for the Robot move
     */
    if (this.waitingRobot === true) {
      $('#msg').html('').html('<div class="alert alert-warning"><strong>Warning!</strong> Waiting for Robot move</div>');
      console.log('Waiting for Robot');
      return;
    }

    if (this.doMove([elem[0], elem[1]], this.nextMoveUnit, true)) {

      /**
       * Request the next move
       */

      this.getRobotMove();
    }
  }

  getRobotMove() {

    this._moveService.getNextMove(this.board, this.nextMoveUnit).subscribe(
      books => {
        this.nextMove = books;
        if (this.nextMove.hasOwnProperty('x') && this.nextMove.hasOwnProperty('y')) {
          this.doMove([this.nextMove.x, this.nextMove.y], this.nextMove.unit, false);
        }
      },
      error => this.errorMessage = <any> error
    );

  }

  reset() {
    $('.span1').html('').removeClass('x disable btn-info').removeClass('o disable btn-primary');
    Object.keys(this.board).forEach(v => {
      this.board[v][0] = '';
      this.board[v][1] = '';
      this.board[v][2] = '';
    });
    this.nextMoveUnit = 'X';
    this.waitingRobot = false;
    $('#msg').html('');
  }
}
