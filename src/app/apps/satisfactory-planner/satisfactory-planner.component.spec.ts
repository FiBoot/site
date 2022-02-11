import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SatisfactoryPlannerComponent } from './satisfactory-planner.component';

describe('SatisfactoryPlanner', () => {
	let component: SatisfactoryPlannerComponent;
	let fixture: ComponentFixture<SatisfactoryPlannerComponent>;

	beforeEach(waitForwaitForAsync()) => {
		TestBed.configureTestingModule({
			declarations: [SatisfactoryPlannerComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SatisfactoryPlannerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
