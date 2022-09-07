import { GraphManager } from "./GraphManager";
import { SubmitHandler } from "../SubmitHandler";
import { Vector } from "./Vector";

function getCssColor(name: string): string {
    return window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(name);
}

function bindDrawingAllCoursorsByHistory(
    nCoursors: number,
    coursorsLagIntervalMills: number,
    mouseMoveHistory: Vector[],
    canvas: HTMLCanvasElement
) {
    function drawAllCoursorsByHistory(event: MouseEvent) {
        for (let i = 0; i < nCoursors; i++) {
            setTimeout(() => {
                mouseMoveHistory[i] = new Vector(event.offsetX, event.offsetY);
            }, i * coursorsLagIntervalMills);
        }
    }

    canvas.onmousemove = (event) => {
        drawAllCoursorsByHistory(event);
    };

    canvas.onmouseleave = (event) => {
        drawAllCoursorsByHistory(event);
    };
}

function bindOnGraphClick(
    canvas: HTMLCanvasElement,
    graphManager: GraphManager,
    submitHandler: SubmitHandler
) {
    canvas.onmousedown = function (event: MouseEvent) {
        const form = <HTMLFormElement>document.getElementById("form");
        const formData = new FormData(form);

        const r: number = parseFloat(formData.get("r")!.toString());
        const x: number = graphManager.convertXToRadiusOf(event.offsetX, r);
        const y: number = graphManager.convertYToRadiusOf(event.offsetY, r);

        submitHandler.submitWithCustomXY(x, y);
    };
}

export function setupGraph(
    submitHandler: SubmitHandler,
    nCoursors = 10,
    coursorsLagIntervalMills = 100,
    coursorSizeCoeff = 0.8
) {
    const canvas = <HTMLCanvasElement>(
        document.getElementById(DocumentIDs.GRAPH_CLICK_SUBMIT_FORM)!
    );
    const ctx = canvas.getContext("2d")!;

    const width = canvas.width;
    const height = canvas.height;
    let mouseMoveHistory: Vector[] = [];

    for (let i = 0; i < nCoursors; i++) {
        mouseMoveHistory.push(new Vector(-1, -1));
    }

    const graphManager: GraphManager = new GraphManager(
        ctx,
        width,
        height,
        getCssColor("--secondary-background"),
        getCssColor("--secondary-text"),
        getCssColor("--secondary-text"),
        getCssColor("--primary-text"),
        getCssColor("--areas-color")
    );

    bindDrawingAllCoursorsByHistory(
        nCoursors,
        coursorsLagIntervalMills,
        mouseMoveHistory,
        canvas
    );

    bindOnGraphClick(canvas, graphManager, submitHandler);

    function animateCursor() {
        graphManager.drawGraph();

        for (let i = 0; i < nCoursors; i++) {
            graphManager.drawCursor(
                mouseMoveHistory[i].x,
                mouseMoveHistory[i].y,
                coursorSizeCoeff ** i
            );
        }

        requestAnimationFrame(animateCursor);
    }

    graphManager.drawGraph();
    requestAnimationFrame(animateCursor);
}
