
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { fakeAsync, tick, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { SomeComponent } from './some.component';

describe('SomeComponent', () => {

    let component: SomeComponent;
    let fixture: ComponentFixture<SomeComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports : [
                RouterModule,
                 RouterModule.forRoot([])
            ],
            declarations : [
                SomeComponent,
            ],
            providers : [
                {provide: APP_BASE_HREF, useValue : '/' },
            ]
        });

        fixture = TestBed.createComponent(SomeComponent);
        component = fixture.componentInstance;
    });

    describe('Component creation', () => {

        it('should create component correctly', fakeAsync(() => {

            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            const spanElement = fixture.debugElement.query(By.css('span'));

            expect(component).toBeTruthy();
            expect(spanElement.nativeElement.innerText).toBe('Yeah, right', 'span text is incorrect');

        }));

    });



});
