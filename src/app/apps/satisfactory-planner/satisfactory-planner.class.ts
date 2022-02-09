import { Canvas } from "src/app/classes/canvas.class";
import { Coord } from "src/app/classes/coord.class";
import { Building } from "./building.class";

enum COLOR {
    GRID = '#555',
    BUILDING = '#999'
}

export const BUILDING_LIST: Array<Building> = [
    new Building('Constructor', [5,8]),
    new Building('Assembler', [6, 10]),
    new Building('Spliter', [3,3]),
    new Building('Merger', [3,3]),
]

export class SatisfactoryPlanner extends Canvas {
    private _selectedBuilding: Building | null = null;
    private _mousePos: Coord = new Coord();

    constructor(wrapper: HTMLDivElement) {
        super({ wrapper, name: 'satisfactory-planner', unitsPerLine: 100, looperOption: { timespan: 30 } });
    
        this.start();
    }

  override loopCB(): void {
    this.clear();
    this.drawGrid();
    // this.drawBuildings();
    this.drawSelectedBuilding();
  }

  override onMouseMove(x: number, y: number): void {
      this._mousePos.set(x, y);
  }

  private drawGrid(): void {
        for(let i = 0; i < this.upl; i++) {
            const u = i * this.us;
            this.render.strokeStyle = COLOR.GRID; 
            this.render.lineWidth = 1;
            this.render.beginPath();
            this.render.moveTo(u, 0)
            this.render.lineTo(u, this.size);
            this.render.stroke();
            this.render.moveTo(0, u)
            this.render.lineTo(this.size, u);
            this.render.stroke();
        }
    }

    private drawBuildings(): void {
    }

    private drawSelectedBuilding(): void {
        if (this._selectedBuilding) {
            console.log(this.us)
            this.render.beginPath();
            this.render.strokeStyle = COLOR.BUILDING;
            this.render.strokeRect(
                this._mousePos.x,
                this._mousePos.y,
                this._selectedBuilding.size.x * this.us,
                this._selectedBuilding.size.y * -this.us
            )
        }
    }

    public selectBuilding(buildingId: number): void {
        this._selectedBuilding = BUILDING_LIST.find(b => b.id === buildingId) ?? null;
        console.log(this._selectedBuilding)
    }
}