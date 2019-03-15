<?php

namespace App\Controllers;

use App\Services\Move\MoveService;
use \Slim\Http\Request as Request;
use \Slim\Http\Response as Response;

class IndexController
{

    /**
     * @var MoveService $moveService
     */
    private $moveService;

    protected $container;

    /**
     * IndexController constructor.
     * @param $container
     * @param $moveService
     */
    public function __construct($container, $moveService)
    {
        $this->moveService = $moveService;
        $this->container = $container;
    }

    /**
     *
     * @param Request $request
     * @param Response $response
     *
     * @return Response
     */
    public function indexAction(Request $request, Response $response)
    {

        $data = [];

        if ($request->isGet()) {

            try {

                $data = $this->moveService->getData();

                $this->container->logger->info(json_encode($data)); //

            } catch (\Exception $e) {

                $this->container->logger->error('Erro : ' . $e->getMessage());
            }
        }

        return $response->withJson($data);
    }


}