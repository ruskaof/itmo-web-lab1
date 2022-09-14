import { DocumentIDs } from "./utils/DocumentIDs";

export function includeValidation() {
    const xInputElement = document.getElementById(DocumentIDs.INPUT_X);
    const submitButtonElement = document.getElementById(
        DocumentIDs.SUBMIT_BUTTON
    );
    const warningElement = document.getElementById(DocumentIDs.WARNING_TEXT);

    function hideWarning() {
        warningElement.innerHTML = "";
        warningElement.hidden = true;
    }

    function enableSubmitButton() {
        submitButtonElement.disabled = false;
    }

    function showLimitsWarning() {
        warningElement.innerHTML = "X must be a number in (-3; 3)";
        warningElement.hidden = false;
    }

    function showLongNumberWarning() {
        warningElement.innerHTML = "Your number is too long. We do not support long numbers :)";
        warningElement.hidden = false;
    }

    function disableSubmitButton() {
        submitButtonElement.disabled = true;
    }

    function validateX(_event) {
        const numberPattern = new RegExp("^[+-]?([0-9]*[.,])?[0-9]+$");

        const x = parseFloat(xInputElement.value);
        if (xInputElement.value.length > 14) {
            showLongNumberWarning()
            disableSubmitButton()
        } else if (
            Number.isNaN(x) ||
            !numberPattern.test(xInputElement.value) ||
            x <= -3 ||
            x >= 3
        ) {
            showLimitsWarning();
            disableSubmitButton();
        } else {
            hideWarning();
            enableSubmitButton();
        }
    }

    xInputElement.addEventListener("input", validateX);
    xInputElement.dispatchEvent(new Event("input"));
}
