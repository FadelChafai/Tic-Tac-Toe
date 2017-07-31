<?php

namespace App\Tests;

use App\Services\Move\MoveService;
use PHPUnit\Framework\TestCase;


class MoveServiceTest extends TestCase
{
    /**
     * @var $moveService MoveService
     */
    private $moveService;

    private $boardState;

    public function invokeMethod(&$object, $methodName, array $parameters = array())
    {
        $reflection = new \ReflectionClass(get_class($object));
        $method = $reflection->getMethod($methodName);
        $method->setAccessible(true);

        return $method->invokeArgs($object, $parameters);
    }

    public function setUp()
    {
        $this->moveService = new MoveService();

        $this->boardState = [["X","X","O"],["O","X","X"],["","","O"]];
    }

    public function testPossibleMoves()
    {
        $result = $this->invokeMethod($this->moveService, 'getPossibleMoves', [$this->boardState]);

        $this->assertEquals([[2,0],[2,1]], $result);
    }

    public function testMakeMove() {

        $move = $this->moveService->makeMove($this->boardState, 'X');

        $keys = array_keys($move);

        $this->assertEquals(['x','y','unit'], $keys);
    }
}