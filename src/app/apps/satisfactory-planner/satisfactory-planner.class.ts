import { Canvas } from 'src/app/classes/canvas.class';
import { Coord } from 'src/app/classes/coord.class';
import { Utils } from 'src/app/classes/utils/utils.class';
import { Building } from './building.class';

const MAP_SIZE = 80;
const SQUARE_SIZE = 8;
// v we multiply grid drawing by 2 to access inter-tiles
const INTER_TILE_FACTOR = 2;

// TODO rgba
const enum COLOR {
	GRID = '#444',
	GRID_LINE = '#999',
	BUILDING = '#099',
	INVALID = '#900',
	BUILDING_OUTLINE = '#FFF',
	MOUSEOVER = '#990',
	UNIT = '#090',
	DELETE = '#900',
}

const enum ORIENTATION {
	NORTH,
	EAST,
	SOUTH,
	WEST
}

class PlacedBuilding {
	private _id: string;
	constructor(public ref: Building, public pos: Coord, public orientation: ORIENTATION = ORIENTATION.NORTH) {
		this._id = Utils.generateId();
	}
	get id(): string {
		return this._id;
	}
}

export class SatisfactoryPlanner extends Canvas {
	private _mousePos: Coord = new Coord();
	private _orientation: ORIENTATION = ORIENTATION.NORTH;

	private _selectedBuilding: Building | null = null;
	private _placedBuildings: Array<PlacedBuilding> = [];

	constructor(wrapper: HTMLDivElement) {
		super({
			wrapper,
			name: 'satisfactory-planner',
			unitsPerLine: MAP_SIZE * INTER_TILE_FACTOR,
			maxWidth: 1000,
			looperOption: { timespan: 30 },
		});

		this.start();
	}

	override loopCB(): void {
		this.clear();
		this.drawGrid();
		this.drawBuildings();
		this.drawSelectedBuilding();
		// this.drawUnit();
	}

	override onMouseMove(x: number, y: number): void {
		this._mousePos.set(x, y);
	}

	override onClick(x: number, y: number): void {
		const pos = this.convertPointToEventUnit(this._mousePos);
		if (this._selectedBuilding) {
			if (!this.isBuildingOverlapping(pos, this._selectedBuilding)) {
				this._placedBuildings.push(new PlacedBuilding(this._selectedBuilding, pos, this._orientation));
			}
		} else {
			this.deleteTopBuilding(pos);
		}
	}

	override onRightClick(x: number, y: number): void {
		this._orientation = ++this._orientation % 4;
	}

	private convertPointToEventUnit(point: Coord): Coord {
		const unitPos = this.convertPointToUnit(this._mousePos);
		unitPos.x = Utils.fixed(unitPos.x / 2) * 2;
		unitPos.y = Utils.fixed(unitPos.y / 2) * 2;
		return unitPos;
	}

	private drawGrid(): void {
		for (let i = 0; i < this.upl; i++) {
			const u = i * this.us * INTER_TILE_FACTOR;
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
		for (let placedBuilding of this._placedBuildings) {
			this.drawBuilding(placedBuilding.ref, placedBuilding.pos);
		}
	}

	private drawSelectedBuilding(): void {
		if (this._selectedBuilding) {
			const unitPos = this.convertPointToEventUnit(this._mousePos);
			const color = this.isBuildingOverlapping(unitPos, this._selectedBuilding) ? COLOR.INVALID : COLOR.MOUSEOVER;
			this.drawBuilding(this._selectedBuilding, unitPos, color);
		}
	}

	private drawBuilding(building: Building, pos: Coord, color: string = COLOR.BUILDING): void {
		this.render.beginPath();
		this.render.strokeStyle = COLOR.BUILDING_OUTLINE;
		this.render.fillStyle = color;
		this.render.fillRect(
			(pos.x - building.size.x) * this.us,
			(pos.y - building.size.y) * this.us,
			building.size.x * INTER_TILE_FACTOR * this.us,
			building.size.y * INTER_TILE_FACTOR * this.us
		);
		this.render.strokeRect(
			(pos.x - building.size.x) * this.us,
			(pos.y - building.size.y) * this.us,
			building.size.x * INTER_TILE_FACTOR * this.us,
			building.size.y * INTER_TILE_FACTOR * this.us
		);
		this.render.closePath();
	}

	override drawUnit(): void {
		const unitPos = this.convertPointToUnit(this._mousePos);
		this.render.beginPath();
		this.render.fillStyle = this._selectedBuilding ? COLOR.UNIT : COLOR.DELETE;
		this.render.fillRect(unitPos.x * this.us, unitPos.y * this.us, this.us, this.us);
		this.render.closePath();
	}

	private deleteTopBuilding(pos: Coord): void {
		const placedBuilding = this.isPosOverlapping(pos);
		if (placedBuilding) {
			this._placedBuildings.splice(
				this._placedBuildings.findIndex((b) => b.id === placedBuilding.id),
				1
			);
		}
	}

	private isBuildingOverlapping(pos: Coord, building: Building): PlacedBuilding | null {
		for (let placedBuilding of this._placedBuildings) {
			if (
				pos.x - building.size.x < placedBuilding.pos.x + placedBuilding.ref.size.x &&
				pos.x + building.size.x > placedBuilding.pos.x - placedBuilding.ref.size.x &&
				pos.y - building.size.y < placedBuilding.pos.y + placedBuilding.ref.size.y &&
				pos.y + building.size.y > placedBuilding.pos.y - placedBuilding.ref.size.y
			) {
				return placedBuilding;
			}
		}
		return null;
	}

	private isPosOverlapping(pos: Coord): PlacedBuilding | null {
		// reverse the array to check the last one placed in first
		// slice to duplicate the array cause reverse is mutable
		for (let placedBuilding of this._placedBuildings.slice().reverse()) {
			if (
				pos.x >= placedBuilding.pos.x - placedBuilding.ref.size.x &&
				pos.x < placedBuilding.pos.x + placedBuilding.ref.size.x &&
				pos.y >= placedBuilding.pos.y - placedBuilding.ref.size.y &&
				pos.y < placedBuilding.pos.y + placedBuilding.ref.size.y
			) {
				return placedBuilding;
			}
		}
		return null;
	}

	public selectBuilding(building: Building | null): void {
		this._selectedBuilding = building;
	}
}
