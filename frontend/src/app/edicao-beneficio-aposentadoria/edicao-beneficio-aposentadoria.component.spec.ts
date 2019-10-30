import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoBeneficioAposentadoriaComponent } from './edicao-beneficio-aposentadoria.component';

describe('EdicaoBeneficioAposentadoriaComponent', () => {
    let component: EdicaoBeneficioAposentadoriaComponent;
    let fixture: ComponentFixture<EdicaoBeneficioAposentadoriaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EdicaoBeneficioAposentadoriaComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EdicaoBeneficioAposentadoriaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
