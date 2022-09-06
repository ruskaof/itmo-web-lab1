export class GraphManager {
    private _ctx: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;
    private _rValue: number;
    private _markLen: number;
    private _arrowDifference: number;
    private _bgColor: string;
    private _labelsColor: string;
    private _cursorColor: string;
    private _axisColor: string;
    private _areasColor: string;

    constructor(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        bgColor: string,
        labelsColor: string,
        cursorColor: string,
        axisColor: string,
        areasColor: string,
        markLen: number = 20,
        arrowDifference: number = 20
    ) {
        this._ctx = ctx;

        this._width = width;
        this._height = height;

        this._bgColor = bgColor;
        this._labelsColor = labelsColor;
        this._cursorColor = cursorColor;
        this._axisColor = axisColor;
        this._areasColor = areasColor;

        this._rValue = width / 2.5;

        this._markLen = markLen;
        this._arrowDifference = arrowDifference;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
    }

    private drawHorisontalMarks() {
        this._ctx.strokeStyle = this._axisColor;
        this._ctx.beginPath();

        this._ctx.fillStyle = this._labelsColor;

        this._ctx.fillText(
            "R/2",
            this._width / 2 + this._rValue / 2,
            this._height / 2 - this._markLen - this._markLen / 2
        );
        this._ctx.moveTo(
            this._width / 2 + this._rValue / 2,
            this._height / 2 + this._markLen
        );
        this._ctx.lineTo(
            this._width / 2 + this._rValue / 2,
            this._height / 2 - this._markLen
        );

        this._ctx.fillText(
            "-R/2",
            this._width / 2 - this._rValue / 2,
            this._height / 2 - this._markLen - this._markLen / 2
        );
        this._ctx.moveTo(
            this._width / 2 - this._rValue / 2,
            this._height / 2 + this._markLen
        );
        this._ctx.lineTo(
            this._width / 2 - this._rValue / 2,
            this._height / 2 - this._markLen
        );

        this._ctx.fillText(
            "R",
            this._width / 2 + this._rValue,
            this._height / 2 - this._markLen - this._markLen / 2
        );
        this._ctx.moveTo(
            this._width / 2 + this._rValue,
            this._height / 2 + this._markLen
        );
        this._ctx.lineTo(
            this._width / 2 + this._rValue,
            this._height / 2 - this._markLen
        );

        this._ctx.fillText(
            "-R",
            this._width / 2 - this._rValue,
            this._height / 2 - this._markLen - this._markLen / 2
        );
        this._ctx.moveTo(
            this._width / 2 - this._rValue,
            this._height / 2 + this._markLen
        );
        this._ctx.lineTo(
            this._width / 2 - this._rValue,
            this._height / 2 - this._markLen
        );

        this._ctx.stroke();
    }

    private drawVerticalMarks() {
        this._ctx.strokeStyle = this._axisColor;
        this._ctx.beginPath();

        this._ctx.fillStyle = this._labelsColor;

        this._ctx.fillText(
            "-R/2",
            this._width / 2 + this._markLen + this._markLen / 2,
            this._height / 2 + this._rValue / 2
        );
        this._ctx.moveTo(
            this._width / 2 + this._markLen,
            this._height / 2 + this._rValue / 2
        );
        this._ctx.lineTo(
            this._width / 2 - this._markLen,
            this._height / 2 + this._rValue / 2
        );

        this._ctx.fillText(
            "R/2",
            this._width / 2 + this._markLen + this._markLen / 2,
            this._height / 2 - this._rValue / 2
        );
        this._ctx.moveTo(
            this._width / 2 + this._markLen,
            this._height / 2 - this._rValue / 2
        );
        this._ctx.lineTo(
            this._width / 2 - this._markLen,
            this._height / 2 - this._rValue / 2
        );

        this._ctx.fillText(
            "-R",
            this._width / 2 + this._markLen + this._markLen / 2,
            this._height / 2 + this._rValue
        );
        this._ctx.moveTo(
            this._width / 2 + this._markLen,
            this._height / 2 + this._rValue
        );
        this._ctx.lineTo(
            this._width / 2 - this._markLen,
            this._height / 2 + this._rValue
        );

        this._ctx.fillText(
            "R",
            this._width / 2 + this._markLen + this._markLen / 2,
            this._height / 2 - this._rValue
        );
        this._ctx.moveTo(
            this._width / 2 + this._markLen,
            this._height / 2 - this._rValue
        );
        this._ctx.lineTo(
            this._width / 2 - this._markLen,
            this._height / 2 - this._rValue
        );

        this._ctx.stroke();
    }

    private drawTriangle() {
        this._ctx.beginPath();
        this._ctx.moveTo(this._width / 2, this._height / 2);
        this._ctx.lineTo(this._width / 2, this._height / 2 - this._rValue / 2);
        this._ctx.lineTo(this._width / 2 - this._rValue, this._height / 2);
        this._ctx.fill();
    }

    private drawSector() {
        this._ctx.beginPath();
        this._ctx.arc(
            this._width / 2,
            this._height / 2,
            this._rValue / 2,
            -Math.PI / 2,
            0,
            false
        );
        this._ctx.lineTo(this._width / 2, this._height / 2);
        this._ctx.fill();
    }

    private drawRectangle() {
        this._ctx.beginPath();
        this._ctx.fillRect(
            this._width / 2,
            this._height / 2,
            this._rValue / 2,
            this._rValue
        );
        this._ctx.fill();
    }

    private drawAreas() {
        this._ctx.fillStyle = this._areasColor;
        this.drawTriangle();
        this.drawSector();
        this.drawRectangle();
    }

    private drawHorisontalAxis() {
        this._ctx.strokeStyle = this._axisColor;
        this._ctx.beginPath();
        this._ctx.moveTo(0, this._height / 2);
        this._ctx.lineTo(this._width, this._height / 2);
        this._ctx.lineTo(
            this._width - this._arrowDifference,
            this._height / 2 - this._arrowDifference
        );
        this._ctx.moveTo(this._width, this._height / 2);
        this._ctx.lineTo(
            this._width - this._arrowDifference,
            this._height / 2 + this._arrowDifference
        );
        this._ctx.stroke();
    }

    private drawVerticalAxis() {
        this._ctx.strokeStyle = this._axisColor;
        this._ctx.beginPath();
        this._ctx.moveTo(this._width / 2, this._height);
        this._ctx.lineTo(this._width / 2, 0);
        this._ctx.lineTo(
            this._width / 2 - this._arrowDifference,
            this._arrowDifference
        );
        this._ctx.moveTo(this._width / 2, 0);
        this._ctx.lineTo(
            this._width / 2 + this._arrowDifference,
            this._arrowDifference
        );
        this._ctx.stroke();
    }

    drawGraph() {
        this._ctx.fillStyle = this._bgColor;
        this._ctx.clearRect(0, 0, this._width, this._height);
        this._ctx.fillRect(0, 0, this._width, this._height);

        this.drawAreas();

        this.drawHorisontalMarks();
        this.drawVerticalMarks();

        this.drawHorisontalAxis();
        this.drawVerticalAxis();
    }

    drawCursor(x: number, y: number, sizeCoeff: number = 1) {
        this._ctx.fillStyle = this._cursorColor;
        this._ctx.beginPath();
        this._ctx.arc(x, y, 5 * sizeCoeff, 0, Math.PI * 2);
        this._ctx.fill();
    }

    convertXToRadiusOf(x: number, r: number): number {
        return ((x - this._width / 2) / this._rValue) * r;
    }

    convertYToRadiusOf(y: number, r: number): number {
        return ((this._height - y - this._height / 2) / this._rValue) * r;
    }
}
