import "jquery";
import "./style/main.scss";
import { setupGraph } from "./graph";
import { SubmitHandler } from "./SubmitHandler";
import { includeValidation } from "./validation";

function updateTable() {
    fetch("../php/table.php")
        .then((response) => {
            return response.text();
        })
        .then((response_text) => {
            $(function () {
                $("#my_table").html(response_text);
            });
        });
}

function bindSubmitButton(sh: SubmitHandler) {
    console.log("bind submit button click");
    $("#submit_button").on("click", () => {
        sh.submit();
        console.log("submit button click");
        updateTable();
    });
}

function bindResetButton() {
    console.log("bind reset button click");

    $("#reset_button").on("click", () => {
        fetch("../php/clear_table.php");
        console.log("reset button click");
        updateTable();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const sh = new SubmitHandler(updateTable);

    updateTable();
    setupGraph(sh, 4);
    bindSubmitButton(sh);
    bindResetButton();
    includeValidation();
});
