<?php

/** DI for Controllers
 * @param $container
 * @return \App\Controllers\IndexController
 */
$container[App\Controllers\IndexController::class] = function ($container) {

    $moveService = new \App\Services\Move\MoveService();

    return new \App\Controllers\IndexController($container, $moveService);
};


