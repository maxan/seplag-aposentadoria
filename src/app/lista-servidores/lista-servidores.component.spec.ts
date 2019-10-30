import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaServidoresComponent } from './lista-servidores.component';

describe('ListaServidoresComponent', () => {
    let component: ListaServidoresComponent;
    let fixture: ComponentFixture<ListaServidoresComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListaServidoresComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListaServidoresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
