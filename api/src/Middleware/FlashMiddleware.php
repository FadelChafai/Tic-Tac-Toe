<?php
/**
 * Created by PhpStorm.
 * User: fadel
 * Date: 11/27/16
 * Time: 1:58 PM
 */

namespace App\Middleware;


use Slim\Http\Request;
use Slim\Http\Response;
use Zend\Mvc\Plugin\FlashMessenger\FlashMessenger;

class FlashMiddleware
{

    private $twig;
    private $flashMessenger;

    public function __construct(\Twig_Environment $twig, FlashMessenger $flashMessenger)
    {
        $this->twig = $twig;

        $this->flashMessenger = $flashMessenger;
    }


    public function __invoke(Request $request , Response $response, $next)
    {

        $messages = [];

        if ($this->flashMessenger->hasMessages()) {

            $messages = $this->flashMessenger->getMessages();

            $this->flashMessenger->clearMessages();
        }

        $this->twig->addGlobal('flashMessenger', $messages);

        return $next($request, $response);
    }

}