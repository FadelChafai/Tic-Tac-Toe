<?php

namespace App\Services\Validator;

use App\Exception\InvalidBoardException;
use App\Services\Move\MoveService;

class BoardService
{
    /**
     * @param $data
     * @return void
     */
    public static function validateBoradParams($data)
    {
        if (empty($data['board']) || empty($data['unit']) || !in_array($data['unit'], [MoveService::MOVE_X, MoveService::MOVE_O])) {
            throw new InvalidBoardException('Invalid board information, board and unit required');
        }

        return true;
    }
}