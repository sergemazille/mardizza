<?php
declare(strict_types = 1);

namespace AppBundle\Security;

use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManager;
use Symfony\Component\Security\Guard\Authenticator\AbstractFormLoginAuthenticator;

class LoginFormAuthenticator extends AbstractFormLoginAuthenticator
{
    private $em;
    private $router;
    private $csrfValidator;

    public function __construct(EntityManager $em, RouterInterface $router, CsrfTokenManager $csrfValidator)
    {
        $this->em = $em;
        $this->router = $router;
        $this->csrfValidator = $csrfValidator;
    }

    // this method is called on each and every request, but we are just interested by a login form submission
    public function getCredentials(Request $request)
    {
        $isLoginSubmit = ($request->getPathInfo() == '/login') && ($request->isMethod('POST'));

        if (!$isLoginSubmit) {
            return null;
        }

        // check csrf_token
        $submittedToken = $request->get("csrf");
        if(! $this->csrfValidator->isTokenValid(new CsrfToken('login_token', $submittedToken))){
            return null;
        }

        // return credentials
        return array('email' => $request->get('email'), 'password' => $request->get('password'));
    }

    // check if we actually can find a user with provided credentials
    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        $email = $credentials['email'];
        $user = $this->em->getRepository('AppBundle:User')->findOneBy(['email' => $email]);

        if($user) {
            return $user;
        }

        return null;
    }

    // and finally check password
    public function checkCredentials($credentials, UserInterface $user)
    {
        $password = $credentials['password'];

        if (password_verify($password, $user->getPassword())) {
            return true;
        }

        return false;
    }

    // user is redirected if he fails authentication
    protected function getLoginUrl()
    {
        return $this->router->generate('login');
    }

    // default redirection for successful authentication
    protected function getDefaultSuccessRedirectUrl()
    {
        return $this->router->generate('home');
    }
}
