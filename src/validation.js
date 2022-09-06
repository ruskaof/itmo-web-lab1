export function includeValidation() {
    const xInputElement = document.getElementById("input_x");
    const formElement = document.getElementById("form");
    const submitButtonElement = document.getElementById("submit_button");
    const warningElement = document.getElementById("input_x_warning");

    function hideWarning() {
        warningElement.innerHTML = "";
        warningElement.hidden = true;
    }

    function enableSubmitButton() {
        submitButtonElement.disabled = false;
    }

    function showWarning() {
        warningElement.innerHTML = "X must be a number in (-3; 3)";
        warningElement.hidden = false;
    }

    function disableSubmitButton() {
        submitButtonElement.disabled = true;
    }

    function validateX(event) {
        const numberPattern = new RegExp("^[+-]?([0-9]*[.,])?[0-9]+$");

        const x = parseFloat(xInputElement.value);
        if (
            Number.isNaN(x) ||
            !numberPattern.test(xInputElement.value) ||
            x <= -3 ||
            x >= 3
        ) {
            showWarning();
            disableSubmitButton();
        } else {
            hideWarning();
            enableSubmitButton();
        }
    }

    xInputElement.addEventListener("input", validateX);
    xInputElement.dispatchEvent(new Event("input"));
}