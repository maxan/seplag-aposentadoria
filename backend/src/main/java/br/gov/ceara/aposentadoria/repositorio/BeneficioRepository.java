package br.gov.ceara.aposentadoria.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.gov.ceara.aposentadoria.dominio.Beneficio;

/**
 * Classe de repositório usada para acesso direto aos dados de benefícios no banco de dados. Não possui regras de
 * negócio.
 * 
 * @since 1.0.0
 * @see BeneficioRepositoryCustom
 * @see Beneficio
 */
@Repository
public interface BeneficioRepository extends JpaRepository<Beneficio, Long>, BeneficioRepositoryCustom {

}
