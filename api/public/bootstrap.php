<?php

declare(strict_types=1);

define('APPLICATION_PATH', realpath(dirname(__FILE__).'/..'));

// Composer autoloading
require __DIR__ . '/../vendor/autoload.php';

// Retrieve configuration
$appConfig = require APPLICATION_PATH . '/config/application.config.php';
if (file_exists(APPLICATION_PATH . '/config/development.config.php')) {
    $appConfig = Zend\Stdlib\ArrayUtils::merge($appConfig, require APPLICATION_PATH . '/config/development.config.php');
}

$app = new \Slim\App(["settings" => $appConfig]);

$container = $app->getContainer();

require APPLICATION_PATH . '/config/containers.php';
require APPLICATION_PATH . '/config/di.php';
require APPLICATION_PATH . '/config/middleware.php';
