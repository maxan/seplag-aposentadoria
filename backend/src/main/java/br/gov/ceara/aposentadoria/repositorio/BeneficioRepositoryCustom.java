package br.gov.ceara.aposentadoria.repositorio;

import java.util.List;

import br.gov.ceara.aposentadoria.dominio.Beneficio;
import br.gov.ceara.aposentadoria.dominio.Servidor;

public interface BeneficioRepositoryCustom {
    List<Beneficio> listarBeneficiosPorMatriculaServidor(String matriculeServidor);

    List<Servidor> listarServidoresComBeneficio();
}
