<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PageController extends Controller
{
    public function homeAction()
    {
        // connected users are redirected to order page
        if($this->getUser()) {
            return $this->redirectToRoute('order');
        }

        return $this->render('@App/home.html.twig');
    }

    public function orderAction()
    {
        // anonymous users can't access this page
        if(! $this->getUser()) {
            return $this->redirectToRoute('home');
        }

        return $this->render('@App/order.html.twig');
    }
}
