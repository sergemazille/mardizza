<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ProfileController extends Controller
{
    public function loginAction()
    {
        return $this->render('@App/profile/login.html.twig');
    }
}
