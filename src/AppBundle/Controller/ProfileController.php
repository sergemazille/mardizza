<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends Controller
{
    public function loginAction(Request $request) : Response
    {
        return $this->render('@App/profile/login.html.twig');
    }

    public function registerAction(Request $request) : Response
    {
        $submittedToken = $request->get('csrf');
        if(! $this->isCsrfTokenValid('register_token', $submittedToken)) {
            throw $this->createAccessDeniedException('Jeton de sécurité expiré, veuillez réessayer');
        }

        return $this->render('@App/home.html.twig');
    }
}
