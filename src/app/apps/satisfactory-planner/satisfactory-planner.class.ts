import { Canvas } from 'src/app/classes/canvas.class';
import { Coord } from 'src/app/classes/coord.class';
import { Utils } from 'src/app/classes/utils/utils.class';
import { Building, BUILDING_LIST } from './building.class';

const MAP_SIZE = 80;
const SQUARE_SIZE = 8;
// v we multiply grid drawing by 2 to access inter-tiles
const INTER_TILE_FACTOR = 2;

// TODO rgba
const enum COLOR {
	GRID = '#444',
	GRID_LINE = '#999',
	BUILDING = '#099',
	BUILDING_OUTLINE = '#FFF',
	MOUSEOVER = '#990',
	UNIT = '#090',
	DELETE = '#900',
}

class PlacedBuilding {
	private _id: string;
	constructor(public ref: Building, public pos: Coord) {
		this._id = Utils.generateId();
	}
	get id(): string {
		return this._id;
	}
}

export class SatisfactoryPlanner extends Canvas {
	private _mousePos: Coord = new Coord();

	private _selectedBuilding: Building | null = null;
	private _buildings: Array<PlacedBuilding> = [];

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
		const unitPos = this.convertPointToUnit(this._mousePos);
		if (this._selectedBuilding) {
			this._buildings.push(new PlacedBuilding(this._selectedBuilding, unitPos));
		} else {
			this.deleteBuilding(unitPos);
		}
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
		for (let placedBuilding of this._buildings) {
			this.drawBuilding(placedBuilding.ref, placedBuilding.pos);
		}
	}

	private drawSelectedBuilding(): void {
		if (this._selectedBuilding) {
			const unitPos = this.convertPointToUnit(this._mousePos);
			this.drawBuilding(this._selectedBuilding, unitPos, COLOR.MOUSEOVER);
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

	private deleteBuilding(pos: Coord): boolean {
		// reverse the array to check the last one placed in first
		// slice to duplicate the array cause reverse is mutable
		for (let building of this._buildings.slice().reverse()) {
			if (
				pos.x >= building.pos.x - building.ref.size.x &&
				pos.x < building.pos.x + building.ref.size.x &&
				pos.y >= building.pos.y - building.ref.size.y &&
				pos.y < building.pos.y + building.ref.size.y
			) {
				const removed = this._buildings.splice(
					this._buildings.findIndex((b) => b.id === building.id),
					1
				);
				return removed !== [];
			}
		}
		return false;
	}

	public selectBuilding(building: Building | null): void {
		this._selectedBuilding = building;
	}
}
