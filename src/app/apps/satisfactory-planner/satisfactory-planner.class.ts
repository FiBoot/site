import { Canvas } from 'src/app/classes/canvas.class';
import { Coord } from 'src/app/classes/coord.class';
import { Building, BUILDING_LIST } from './building.class';

const enum COLOR {
	GRID = '#444',
	GRID_LINE = '#999',
	BUILDING = '#099',
	BUILDING_OUTLINE = '#FFF',
	MOUSEOVER = '#990',
}

const MAP_SIZE = 80;
const SQUARE_SIZE = 8;

class PlacedBuilding {
	constructor(public building: Building, public pos: Coord) {}
}

export class SatisfactoryPlanner extends Canvas {
	private _mousePos: Coord = new Coord();

	private _selectedBuilding: Building | null = null;
	private _buildings: Array<PlacedBuilding> = [];

	constructor(wrapper: HTMLDivElement) {
		super({ wrapper, name: 'satisfactory-planner', unitsPerLine: MAP_SIZE, looperOption: { timespan: 30 } });

		this.start();
	}

	override loopCB(): void {
		this.clear();
		this.drawGrid();
		this.drawBuildings();
		this.drawSelectedBuilding();
	}

	override onMouseMove(x: number, y: number): void {
		const gap = new Coord(x % this.us, y % this.us);
		this._mousePos.set(x - gap.x, y + (this.us - gap.y));
	}

	override onClick(x: number, y: number): void {
		if (this._selectedBuilding) {
			this._buildings.push(new PlacedBuilding(this._selectedBuilding, this._mousePos.clone()));
		}
	}

	private drawGrid(): void {
		for (let i = 0; i < this.upl; i++) {
			const u = i * this.us;
			this.render.strokeStyle = i % SQUARE_SIZE ? COLOR.GRID : COLOR.GRID_LINE;
			this.render.lineWidth = 1;
			this.render.beginPath();
			this.render.moveTo(u, 0);
			this.render.lineTo(u, this.size);
			this.render.stroke();
			this.render.moveTo(0, u);
			this.render.lineTo(this.size, u);
			this.render.stroke();
		}
	}

	private drawBuildings(): void {
		for (let placedBuilding of this._buildings) {
			this.drawBuilding(placedBuilding.building, placedBuilding.pos);
		}
	}

	private drawSelectedBuilding(): void {
		if (this._selectedBuilding) {
			this.render.strokeStyle = COLOR.MOUSEOVER;
			const pos = new Coord(this._mousePos.x + (this._selectedBuilding.isOffset ? this.hus : 0), this._mousePos.y);
			this.drawBuilding(this._selectedBuilding, pos, COLOR.MOUSEOVER);
		}
	}

	private drawBuilding(building: Building, pos: Coord, color: string = COLOR.BUILDING): void {
		this.render.beginPath();
        this.render.strokeStyle = '#fff'
		this.render.fillStyle = color;
		// TODO orientation
		this.render.fillRect(pos.x, pos.y, building.size.x * this.us, building.size.y * -this.us);
		this.render.strokeRect(pos.x, pos.y, building.size.x * this.us, building.size.y * -this.us);
		this.render.closePath();
	}

	public selectBuilding(buildingId: number): void {
		this._selectedBuilding = BUILDING_LIST.find((b) => b.id === buildingId) ?? null;
		console.log(this._selectedBuilding);
	}
}
