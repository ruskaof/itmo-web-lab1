import "jquery";
import "./style/main.scss";
import { setupGraph } from "./scripts/graph_element/graph";
import { SubmitHandler } from "./scripts/SubmitHandler";
import { includeValidation } from "./scripts/validation";
import { RequestURLs } from "./scripts/utils/RequestURLs";
import { DocumentIDs } from "./scripts/utils/DocumentIDs";

const BASE_URL = "https://se.ifmo.ru/~s336769";
//const BASE_URL = "http://localhost:3000";

const requestURLs = new RequestURLs(BASE_URL);

function updateTable() {
    fetch(requestURLs.table)
        .then((response) => {
            return response.text();
        })
        .then((response_text) => {
            $(function () {
                $("#" + DocumentIDs.TABLE_OF_CLICKS).html(response_text);
            });
        });
}

function bindSubmitButton(sh: SubmitHandler) {
    $("#" + DocumentIDs.SUBMIT_BUTTON).on("click", () => {
        sh.submit();
        updateTable();
    });
}

function bindResetButton() {
    $("#" + DocumentIDs.RESET_BUTTON).on("click", () => {
        fetch(requestURLs.clearTable);

        updateTable();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const sh = new SubmitHandler(requestURLs, updateTable);

    /* I do not care about the following functions execution order */

    // Get table results from server and include it in HTML
    updateTable();

    // Draw graph on canvas and include all necessary bindings for it
    setupGraph(sh, 4);

    bindSubmitButton(sh);
    bindResetButton();

    // Add x-field validation
    includeValidation();
});
