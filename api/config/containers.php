<?php
/**
 * Containers config file
 */

/** Logger **/
$container['logger'] = function() {

    $logger = new \Monolog\Logger('api_logger');
    $file_handler = new \Monolog\Handler\StreamHandler(APPLICATION_PATH . '/var/log/app.log');
    $logger->pushHandler($file_handler);

    return $logger;
};




