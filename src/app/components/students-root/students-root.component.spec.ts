import { TestBed, async } from '@angular/core/testing';
import { StudentsRootComponent } from './students-root.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudentsRootComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(StudentsRootComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'students'`, () => {
    const fixture = TestBed.createComponent(StudentsRootComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('students');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(StudentsRootComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('students app is running!');
  });
});
