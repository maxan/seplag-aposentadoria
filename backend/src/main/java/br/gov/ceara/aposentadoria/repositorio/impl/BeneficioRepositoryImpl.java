package br.gov.ceara.aposentadoria.repositorio.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;

import br.gov.ceara.aposentadoria.dominio.Beneficio;
import br.gov.ceara.aposentadoria.dominio.Servidor;
import br.gov.ceara.aposentadoria.enumerador.TipoBeneficio;
import br.gov.ceara.aposentadoria.repositorio.BeneficioRepositoryCustom;

public class BeneficioRepositoryImpl implements BeneficioRepositoryCustom {
    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Beneficio> listarBeneficiosPorMatriculaServidor(String matriculeServidor, TipoBeneficio tipoBeneficio) {
        return this.entityManager
                .createQuery(
                        "SELECT b FROM Beneficio b WHERE b.servidor.matricula = :matricula AND b.tipoBeneficio = :tipoBeneficio",
                        Beneficio.class)
                .setParameter("matricula", matriculeServidor).setParameter("tipoBeneficio", tipoBeneficio)
                .getResultList();
    }

    @Override
    public List<Servidor> listarServidoresComBeneficio() {
        return this.entityManager.createQuery("SELECT b.servidor FROM Beneficio b", Servidor.class).getResultList();
    }
}
