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
        // TODO : redirect user if she tries to display login page while she's already logged in
        // if($user) => redirect

        return $this->render('@App/profile/login.html.twig');
    }

    public function registerAction(Request $request) : Response
    {
        // gather request data
        $email = $request->get('email');
        $username = $request->get('username');
        $password = $request->get('password');
        $reCaptchaToken = $request->get('recaptcha-token');

        // check email is unique
        if(! $this->isUnique($email)) {
            $this->addFlash('error', 'Cette adresse email est déjà utilisée');
            return $this->redirectToRoute('login');
        }

        // check email is well formatted
        if(! $this->isValid($email)) {
            $this->addFlash('error', 'L\'adresse email doit être valide');
            return $this->redirectToRoute('login');
        }

        // password validation
        if(strlen($password) < self::PASSWORD_MIN_CHARACTERS) {
            $this->addFlash('error', "Le mot de passe doit comporter au moins " . self::PASSWORD_MIN_CHARACTERS . " caractères");
            return $this->redirectToRoute('login');
        }

        // reCaptcha validation
        $reCaptchaService = $this->get('mardizza.recaptcha_service');
        if(! $reCaptchaService->isValid($reCaptchaToken)) {
            $this->addFlash('error', "Échec du test anti bots, veuillez réessayer");
            return $this->redirectToRoute('login');
        }

        // user creation
        $user = $this->get('mardizza.user');
        $user->setEmail($email);
        $user->setUsername($username);
        $user->setPassword($password);
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        // welcome message
        $this->addFlash("success", "Bienvenue sur Mardizza !!!");

        // log newly created user in
        return $this->get('security.authentication.guard_handler')
            ->authenticateUserAndHandleSuccess(
                $user,
                $request,
                $this->get('mardizza.security.login_form_authenticator'),
                'main'
            );
    }

    public function isUniqueAction(Request $request) : Response
    {
        $email = $request->get('email');
        return $this->json($this->isUnique($email));
    }

    private function isUnique($email) : bool
    {
        $em = $this->getDoctrine()->getManager();
        $userRepository = $em->getRepository('AppBundle:User');
        return ! $userRepository->findOneBy(["email" => $email]);
    }

    private function isValid($email) : bool
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    // needed to avoid 404 error but do nothing
    public function logoutAction() {}
}
