import { GraphManager } from "./GraphManager";
import { SubmitHandler } from "./SubmitHandler";
import { Vector } from "./Vector";

export function setupGraph(
    SubmitHandler: SubmitHandler,
    n_coursors = 10,
    coursors_lag_interval_mills = 100,
    coursor_size_coeff = 0.8
) {
    console.log("graph is made!");

    const canvas = <HTMLCanvasElement>document.getElementById("graph")!;
    const ctx = canvas.getContext("2d")!;

    const docStyle = getComputedStyle(document.documentElement);

    const width = canvas.width;
    const height = canvas.height;
    let mouseMoveHistory: Vector[] = [];

    for (let i = 0; i < n_coursors; i++) {
        mouseMoveHistory.push(new Vector(-1, -1));
    }

    const graphManager: GraphManager = new GraphManager(
        ctx,
        width,
        height,
        "#161a23",
        "#a3abb1",
        "#a3abb1",
        "#bac3cb",
        "#18243c"
    );

    function registerClick(event: MouseEvent) {
        const form = <HTMLFormElement>document.getElementById("form");
        const formData = new FormData(form);

        const r: number = parseFloat(formData.get("r")!.toString());
        const x: number = graphManager.convertXToRadiusOf(event.offsetX, r);
        const y: number = graphManager.convertYToRadiusOf(event.offsetY, r);

        SubmitHandler.submitWithCustomXY(x, y);
    }

    let mouseIsOnCanvas = true;

    canvas.onmousemove = (event) => {
        mouseIsOnCanvas = true;
        for (let i = 0; i < n_coursors; i++) {
            setTimeout(() => {
                mouseMoveHistory[i] = new Vector(event.offsetX, event.offsetY);
            }, i * coursors_lag_interval_mills);
        }
    };

    canvas.onmouseleave = (event) => {
        for (let i = 0; i < n_coursors; i++) {
            setTimeout(() => {
                mouseMoveHistory[i] = new Vector(event.offsetX, event.offsetY);
            }, i * coursors_lag_interval_mills);
        }
        console.log("mouse left");
    };

    canvas.onmousedown = (event) => {
        registerClick(event);
    };

    function animateCursor() {
        graphManager.drawGraph();

        if (mouseIsOnCanvas) {
            for (let i = 0; i < n_coursors; i++) {
                graphManager.drawCursor(
                    mouseMoveHistory[i].x,
                    mouseMoveHistory[i].y,
                    coursor_size_coeff ** i
                );
            }
        }

        requestAnimationFrame(animateCursor);
    }

    graphManager.drawGraph();
    requestAnimationFrame(animateCursor);
}
