<?php
/**
 * Created by PhpStorm.
 * User: fadel
 * Date: 11/30/16
 * Time: 10:10 AM
 */
namespace  App\Middleware;

class ExampleMiddleware
{
    /**
     * Example middleware invokable class
     *
     * @param  \Psr\Http\Message\ServerRequestInterface $request  PSR7 request
     * @param  \Psr\Http\Message\ResponseInterface      $response PSR7 response
     * @param  callable                                 $next     Next middleware
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function __invoke($request, $response, $next)
    {
        $response->getBody()->write('Middleware BEFORE');
        $response = $next($request, $response);
        $response->getBody()->write('Middleware AFTER');

        return $response;
    }
}