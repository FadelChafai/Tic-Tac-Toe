<?php

namespace App\Services\Move;

class MoveService implements MoveInterface
{
    const MOVE_X = 'X';
    const MOVE_O = 'O';

    private $container;

    /**
     *  constructor.
     * @param $container
     */
    public function __construct($container)
    {
        $this->container = $container;
    }

    /**
     * Makes a move using the $boardState
     * $boardState contains 2 dimensional array of the game field
     * X represents one team, O - the other team, empty string means field is
     * not yet taken.
     *
     * Example :
     *
     * [
     *  ['X', 'O', '']
     *  ['X', 'O', 'O']
     *  ['', '', '']
     * ]
     *
     * Returns an array, containing x and y coordinates for
     * next move, and the unit that now occupies it.
     *
     * Example: [2, 0, 'O'] - upper right corner - O player
     *
     * @param array $boardState Current board state
     * @param string $playerUnit Player unit representation
     *
     * @return array
     */
    public function makeMove($boardState, $playerUnit = 'X'): array
    {

        $possibleMoves = $this->getPossibleMoves($boardState);

        if(empty($possibleMoves)) {
            return [];
        }

        $key = array_rand($possibleMoves);

        return [
            'x' => $possibleMoves[$key][0],
            'y' => $possibleMoves[$key][1],
            'unit' => $playerUnit
        ];

    }

    /**
     * Get all possible moves
     *
     * @param array $boardState
     * @return array
     */
    private function getPossibleMoves(array $boardState): array
    {
        $possibleMoves = [];

        foreach ($boardState as $line => $row) {
            foreach ($row as $key => $column) {
                if ($column == '') {
                    $possibleMoves[] = [$line, $key];
                }
            }
        }

        return $possibleMoves;
    }

    public function getData() {

        $data = '[{
  "userId": 5,
  "id": 42,
  "title": "commodi ullam sint et excepturi error explicabo praesentium voluptas",
  "body": "odio fugit voluptatum ducimus earum autem est incidunt voluptatem\nodit reiciendis aliquam sunt sequi nulla dolorem\nnon facere repellendus voluptates quia\nratione harum vitae ut"
},{
  "userId": 5,
  "id": 43,
  "title": "commodi ullam sint et excepturi error explicabo praesentium voluptas",
  "body": "odio fugit voluptatum ducimus earum autem est incidunt voluptatem\nodit reiciendis aliquam sunt sequi nulla dolorem\nnon facere repellendus voluptates quia\nratione harum vitae ut"
},{
  "userId": 5,
  "id": 5,
  "title": "moi",
  "body": "odio fugit voluptatum ducimus earum autem est incidunt voluptatem\nodit reiciendis aliquam sunt sequi nulla dolorem\nnon facere repellendus voluptates quia\nratione harum vitae ut"
},{
  "userId": 5,
  "id": 23,
  "title": "commodi ullam sint et excepturi error explicabo praesentium voluptas",
  "body": "odio fugit voluptatum ducimus earum autem est incidunt voluptatem\nodit reiciendis aliquam sunt sequi nulla dolorem\nnon facere repellendus voluptates quia\nratione harum vitae ut"
},{
  "userId": 5,
  "id": 44,
  "title": "commodi ullam sint et excepturi error explicabo praesentium voluptas",
  "body": "odio fugit voluptatum ducimus earum autem est incidunt voluptatem\nodit reiciendis aliquam sunt sequi nulla dolorem\nnon facere repellendus voluptates quia\nratione harum vitae ut"
}]';
        //$response = $this->container->http->request('GET', 'https://jsonplaceholder.typicode.com/posts/42');

        return json_decode($data); //($response->getBody());

    }


}