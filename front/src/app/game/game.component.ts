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
  gameOver = false;
  /**
   * Board dimensions
   */
  dimensions = 3;

  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  constructor(private _moveService: MoveService) {}


    move(elem): void {

        /**
         * No play after the game is over
         */
        if ( this.gameOver ) {
            return;
        }

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
       * Check winner after move
       */

      if ( this.checkWinner(box[0], box[1], unit ) ) {
          return false;
      }

      /**
       * Prevent playing twice
       */
      this.waitingRobot = prevent;

      return true;
  }

  checkWinner(x, y, unit) {

      let unitWin = false;

      /* check cols */
      for (let i = 0; i < this.dimensions; i++) {
          if (this.board[x][i] !== unit) {
              break;
          }
          if ( i === this.dimensions - 1 ) {
              unitWin = true;
          }
      }

      /* check row s*/
      for ( let i = 0; i < this.dimensions; i++) {
          if (this.board[i][y] !== unit) {
              break;
          }
          if ( i === this.dimensions - 1 ) {
              unitWin = true;
          }
      }

      /* check diag */
      if (x === y) {
          /* we're on a diagonal */
          for ( let i = 0; i < this.dimensions; i++) {
              if ( this.board[i][i] !== unit) {
                  break;
              }
              if ( i === this.dimensions - 1 ) {
                  unitWin = true;
              }
          }
      }

      /* check anti diag */
      if ( x + y === this.dimensions - 1) {
          for ( let i = 0; i < this.dimensions; i++) {
              if ( this.board[i][( this.dimensions - 1 ) - i ] !== unit) {
                  break;
              }
              if ( i === this.dimensions - 1 ) {
                  unitWin = true;
              }
          }
      }

      if ( unitWin ) {
          $('#msg').html('').html('<div class="alert alert-success"><strong>Game over!</strong> ' + unit.toUpperCase() + ' Win </div>');
          this.gameOver = true;
      }


      return unitWin;
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
    this.gameOver = false;
    $('#msg').html('');
  }
}
