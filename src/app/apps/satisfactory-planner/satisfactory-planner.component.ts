import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Building, BUILDING_LIST } from './building.class';
import { SatisfactoryPlanner } from './satisfactory-planner.class';

@Component({
	selector: 'satisfactory-planner',
	templateUrl: './satisfactory-planner.component.html',
	styleUrls: ['./satisfactory-planner.component.scss'],
})
export class SatisfactoryPlannerComponent implements AfterViewInit, OnDestroy {
	@ViewChild('satisfactoryPlannerWrapper') wrapper: ElementRef | undefined;
	public app: SatisfactoryPlanner | undefined;

	public buildingList: Array<Building> = BUILDING_LIST;
	public selectedBuilding: Building | null = null;

	ngAfterViewInit(): void {
		this.app = new SatisfactoryPlanner(this.wrapper!.nativeElement);
	}

	ngOnDestroy(): void {
		this.app!.destroy();
	}

	selectBuilding(building: Building | null): void {
		this.selectedBuilding = building;
		this.app!.selectBuilding(building);
	}
}
