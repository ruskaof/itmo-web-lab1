export class SubmitHandler {
    private form: HTMLFormElement;
    private callback: any;

    constructor(submitCallback: any) {
        this.form = <HTMLFormElement>document.getElementById("form");
        this.callback = submitCallback;
    }

    submit() {
        const formData = new FormData(this.form);

        fetch("../php/onclick.php", {
            method: "POST",
            body: formData,
        }).then((response) => {
            this.callback();
        });
    }

    submitWithCustomXY(x: number, y: number) {
        const formData = new FormData(this.form);
        const r: number = parseFloat(formData.get("r")!.toString());

        const body = new FormData();
        body.append("x", x.toString());
        body.append("y", y.toString());
        body.append("r", r.toString());

        fetch("../php/onclick.php", {
            method: "POST",
            body: body,
        }).then((response) => {
            this.callback();
        });
    }
}
