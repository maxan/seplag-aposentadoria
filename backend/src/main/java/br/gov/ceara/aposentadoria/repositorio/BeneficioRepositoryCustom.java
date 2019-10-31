package br.gov.ceara.aposentadoria.repositorio;

import java.util.List;

import br.gov.ceara.aposentadoria.dominio.Beneficio;
import br.gov.ceara.aposentadoria.dominio.Servidor;
import br.gov.ceara.aposentadoria.enumerador.TipoBeneficio;

public interface BeneficioRepositoryCustom {
    List<Beneficio> listarBeneficiosPorMatriculaServidor(String matriculeServidor, TipoBeneficio tipoBeneficio);

    List<Servidor> listarServidoresComBeneficio();
}
