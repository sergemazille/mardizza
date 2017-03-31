<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends Controller
{
    const PASSWORD_MIN_CHARACTERS = 4;

    // only render login page
    public function loginAction() : Response
    {
        return $this->render('@App/profile/login.html.twig');
    }

    public function registerAction(Request $request) : Response
    {
        // data validation
        // ===============

        // email validation
        $email = $request->get('email');

        // check email is unique
        if(! $this->isUnique($email)) {
            $this->addFlash('error', 'Cette adresse email est déjà utilisée');
            return $this->redirectToRoute('login');
        }

        // password validation
        $password = $request->get('password');
        if(! strlen($password) < self::PASSWORD_MIN_CHARACTERS) {
            $this->addFlash('error', "Le mot de passe doit comporter au moins " . self::PASSWORD_MIN_CHARACTERS . " caractères");
            return $this->redirectToRoute('login');
        }


        // user creation
        // =============

        $user = $this->get('mardizza.user');
        $user->setEmail($email);
        $user->setPassword($password);

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        return $this->render('@App/home.html.twig');
    }

    private function isValid($email)
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    private function isUnique($email)
    {
        return true;
    }
}
