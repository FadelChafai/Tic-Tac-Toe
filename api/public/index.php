<?php

error_reporting(E_ALL);
ini_set('display_errors',1);

require 'bootstrap.php';

use App\Controllers\IndexController;

$app->any('/', IndexController::class.':indexAction');

$app->get('/move', IndexController::class.':moveAction');

$app->add(new App\Middleware\TrailingSlashMiddleware());

$app->run();