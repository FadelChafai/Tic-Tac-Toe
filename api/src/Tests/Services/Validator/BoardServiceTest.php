<?php

namespace App\Tests;

use App\Services\Validator\BoardService;
use PHPUnit\Framework\TestCase;

class BoardServiceTest extends TestCase
{
    /**
     * @var $boardService BoardService
     */
    private $boardService;


    public function invokeMethod(&$object, $methodName, array $parameters = array())
    {
        $reflection = new \ReflectionClass(get_class($object));
        $method = $reflection->getMethod($methodName);
        $method->setAccessible(true);

        return $method->invokeArgs($object, $parameters);
    }

    public function setUp()
    {
        $this->boardService = new BoardService();

    }

    public function testValidateBoradParams()
    {

        $result = $this->invokeMethod($this->boardService,
            'validateBoradParams', [['board'=> [['X','X','O']], 'unit' => 'O']]);

        $this->assertTrue($result);
    }


    /**
     * @expectedException \InvalidArgumentException
     */
    public function testValidateBoradParamsException()
    {

        $result = $this->invokeMethod($this->boardService,
            'validateBoradParams', [['boardd'=> [['X','X','O']], 'unit' => 'A']]);

        $this->assertTrue($result);
    }

}