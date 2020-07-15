import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExplorePostPage } from './explore-post.page';

describe('ExplorePostPage', () => {
  let component: ExplorePostPage;
  let fixture: ComponentFixture<ExplorePostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorePostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExplorePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
