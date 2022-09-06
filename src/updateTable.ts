export function updateTable() {
    fetch("php/table.php", {
        method: "POST",
    })
        .then((response) => {
            if (!response.ok) throw Error();
            return response.text();
        })
        .then((resp_text) => {
            document.getElementById("my_table")!.innerHTML = resp_text;
            console.log("updated table");
        });
}
