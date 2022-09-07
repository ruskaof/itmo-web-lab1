// typescript doesn't allow using constants for computed string in enum
// https://github.com/microsoft/TypeScript/issues/40793
// have to use a class instead
export class RequestURLs {
    private _baseUrl: string;

    private _tableRoute: string = "/php/get_table.php";
    get table(): string {
        return this._baseUrl + this._tableRoute;
    }

    private _clearTableRoute: string = "/php/clear_table.php";
    get clearTable(): string {
        return this._baseUrl + this._clearTableRoute;
    }

    private _submitClickRoute: string = "/php/submit_click.php";
    get submitClick(): string {
        return this._baseUrl + this._submitClickRoute;
    }

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }
}
