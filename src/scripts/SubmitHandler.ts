import { RequestURLs } from "./utils/RequestURLs";

/**
 *  This class is used to submit graph clicks to backend.
 */
export class SubmitHandler {
    private _form: HTMLFormElement;
    private _callback: any;
    private _requestURLs: RequestURLs;

    constructor(requestURLs: RequestURLs, submitCallback: any) {
        this._form = <HTMLFormElement>document.getElementById("form");
        this._callback = submitCallback;
        this._requestURLs = requestURLs;
    }

    submit() {
        const formData = new FormData(this._form);

        this.submitWithBody(formData);
    }

    submitWithCustomXY(x: number, y: number) {
        const formData = new FormData(this._form);
        const r: number = parseFloat(formData.get("r")!.toString());

        const body = new FormData();
        body.append("x", x.toString());
        body.append("y", y.toString());
        body.append("r", r.toString());

        this.submitWithBody(body);
    }

    private submitWithBody(body: BodyInit) {
        fetch(this._requestURLs.submitClick, {
            method: "POST",
            body: body,
        }).then(() => {
            this._callback();
        });
    }
}
