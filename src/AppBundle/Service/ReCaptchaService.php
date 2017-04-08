<?php

namespace AppBundle\Service;

use ReCaptcha\ReCaptcha;

class ReCaptchaService
{
    private $secret;

    function __construct(String $secret)
    {
        $this->secret = $secret;
    }

    public function isValid(String $token) : bool
    {
        $recaptcha = new ReCaptcha($this->secret);
        $response = $recaptcha->verify($token);

        return $response->isSuccess();
    }
}
