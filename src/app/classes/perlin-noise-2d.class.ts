import { Logger } from "./logger.class";
import { Timer } from "./timer.class";
import { Utils } from "./utils/utils.class";

const DEFAULT_SIZE = 10 ** 2;
const NOISE_DECIMAL = 10; // do not touch (set x=1 to x=0.1 for noise generation)

// from Joe Iddon
export class PerlinNoise2d {

    private _gradients: Array<{ x: number, y: number }>;
    private _memory: Array<number>;
    private _timer: Timer = new Timer('PerlinNoise2d');

    constructor(private _size: number = DEFAULT_SIZE) {
        this._gradients = new Array<{ x: number, y: number }>();
        this._memory = new Array<number>();
    }

    public generate(): Array<number> {
        Logger.log(`[PerlinNoise2d] Generating noise [${this._size}*${this._size}]..`);
        this._timer.start();

        this._memory = new Array<number>();

        for (let y = 0; y < this._size; y++) {
            for (let x = 0; x < this._size; x++) {
                this.val(x / NOISE_DECIMAL, y / NOISE_DECIMAL);
            }
        }

        this._timer.stop();
        Logger.log(this._timer.toString());

        return this._memory;
    }

    public regenerate(): Array<number> {
        return this.generate();
    }

    public get(x: number, y: number): number {
        return this._memory[x + y * this._size];
    }

    private rand_vect(): { x: number, y: number } {
        let theta = Math.random() * 2 * Math.PI;
        return { x: Math.cos(theta), y: Math.sin(theta) };
    }

    private dot_prod_grid(x: number, y: number, vx: number, vy: number): number {
        let g_vect;
        let d_vect = { x: x - vx, y: y - vy };
        const index = vx + vy * this._size / NOISE_DECIMAL
        if (this._gradients[index]) {
            g_vect = this._gradients[index];
        } else {
            g_vect = this.rand_vect();
            this._gradients[index] = g_vect;
        }
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    }

    private smootherstep(x: number): number {
        // ease fn: 6x^5 - 15x^4 + 10x^3
        return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
    }

    private interp(x: number, a: number, b: number): number {
        return a + this.smootherstep(x) * (b - a);
    }

    private val(x: number, y: number): number {
        const index = Math.round((x + y * this._size) * NOISE_DECIMAL); // js float correction
        if (this._memory[index]) {
            return this._memory[index];
        }

        let xf = Math.floor(x);
        let yf = Math.floor(y);

        // interpolate
        let tl = this.dot_prod_grid(x, y, xf, yf);
        let tr = this.dot_prod_grid(x, y, xf + 1, yf);
        let bl = this.dot_prod_grid(x, y, xf, yf + 1);
        let br = this.dot_prod_grid(x, y, xf + 1, yf + 1);
        let xt = this.interp(x - xf, tl, tr);
        let xb = this.interp(x - xf, bl, br);
        let v = this.interp(y - yf, xt, xb);
        
        // set v from [-0.5, 0.5] to [0, 1]
        return this._memory[index] = (v + 1) / 2;;
    }
}