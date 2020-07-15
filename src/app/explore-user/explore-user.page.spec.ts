import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreUserPage } from './explore-user.page';

describe('ExploreUserPage', () => {
  let component: ExploreUserPage;
  let fixture: ComponentFixture<ExploreUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
