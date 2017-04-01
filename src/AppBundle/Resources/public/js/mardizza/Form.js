const PASSWORD_MIN_CHARACTERS = 4;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let errors = new Set();
let errorMessages = {
    REQUIRED: "Ce champ est requis",
    EMAIL: "L'adresse email doit être valide",
    EMAIL_UNIQUE: "Cette adresse email est déjà utilisée",
    PASSWORD_LENGTH: `Le mot de passe doit comporter au moins ${PASSWORD_MIN_CHARACTERS} caractères`,
};

export class Form {

    static init() {
        this.modalFormOnSubmit();
    }

    // form submission from modal windows
    static modalFormOnSubmit() {
        let $submitButtons = $(".dialogs").find("button[type='submit']");
        $submitButtons.on("click", function(e) {
            e.preventDefault();

            // clean start
            Form.resetErrors();

            let form = $(this).closest('form');

            if(Form.isValid(form)) {
                form.submit();
            } else {
                Form.showErrors();
            }
        });
    }

    // form validation
    // ===============
    static isValid($formElement) {
        let formIsValid = true;

        // check required fields
        let $requiredInputs = $formElement.find('input:required');
        $requiredInputs.each(function() {
            if( '' === $(this).val() ) {
                formIsValid = false;

                errors.add({
                    element: $(this),
                    message: errorMessages.REQUIRED
                });
            }
        });

        // check password length
        let $passwordInput = $formElement.find('input[type="password"]');
        $passwordInput.each(function() {
            if( $(this).val().length < PASSWORD_MIN_CHARACTERS ) {
                formIsValid = false;

                errors.add({
                    element: $(this),
                    message: errorMessages.PASSWORD_LENGTH
                });
            }
        });

        // email validation
        // ================

        let $emailInputs = $formElement.find('input[type="email"]');

        // check email is valid (regexp)
        $emailInputs.each(function() {
            if(! EMAIL_REGEX.test($(this).val()) ) {
                formIsValid = false;

                errors.add({
                    element: $(this),
                    message: errorMessages.EMAIL
                });
            }
        });

        return formIsValid;
    }

    // form feedback
    // =============
    static showErrors() {
        errors.forEach(function(error) {
            let $inputGroup = $(error.element).closest('.input-group');
            let $feedbackElement = $inputGroup.find('.feedback');

            // add style
            $inputGroup.addClass('error-feedback');

            // add error message
            $feedbackElement.text(`${error.message}`);
        });
    }

    static resetErrors() {
        // start clean
        errors = new Set();

        // reset DOM error elements
        $('input').each(function() {
            let $inputGroup = $(this).closest('.input-group');
            let $feedbackElement = $inputGroup.find('.feedback');

            // remove style
            $inputGroup.removeClass('error-feedback');

            // remove error message
            $feedbackElement.text('');
        });
    }

    static resetInputs() {
        $('input').val('');
        this.resetErrors();
    }
}
