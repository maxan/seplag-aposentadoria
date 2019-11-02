package br.gov.ceara.aposentadoria.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.gov.ceara.aposentadoria.dominio.TramitacaoMovimento;

/**
 * Classe de repositório usada para acesso direto aos dados de tramitações de processos de benefício no banco de dados.
 * Não possui regras de negócio.
 * 
 * @since 1.0.0
 * @see TramitacaoMovimento
 */
@Repository
public interface TramitacaoMovimentoRepository extends JpaRepository<TramitacaoMovimento, Long> {
    // Exemplo utilizando @Query annotation.
    @Query("SELECT t FROM TramitacaoMovimento t WHERE t.beneficio.id = :beneficioId")
    List<TramitacaoMovimento> obterTramitacoesPorBeneficio(@Param("beneficioId") Long beneficioId);
}
