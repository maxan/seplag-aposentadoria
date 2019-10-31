package br.gov.ceara.aposentadoria.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.gov.ceara.aposentadoria.dominio.TramitacaoMovimento;

@Repository
public interface TramitacaoMovimentoRepository extends JpaRepository<TramitacaoMovimento, Long> {
    // Exemplo utilizando @Query annotation.
    @Query("SELECT t FROM TramitacaoMovimento t WHERE t.beneficio.id = :beneficioId")
    List<TramitacaoMovimento> obterTramitacoesPorBeneficio(@Param("beneficioId") Long beneficioId);
}
