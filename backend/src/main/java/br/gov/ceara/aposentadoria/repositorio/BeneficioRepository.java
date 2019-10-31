package br.gov.ceara.aposentadoria.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.gov.ceara.aposentadoria.dominio.Beneficio;

@Repository
public interface BeneficioRepository extends JpaRepository<Beneficio, Long>, BeneficioRepositoryCustom {

}
