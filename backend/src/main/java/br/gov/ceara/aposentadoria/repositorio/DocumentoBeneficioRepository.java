package br.gov.ceara.aposentadoria.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.gov.ceara.aposentadoria.dominio.DocumentoBeneficio;
import br.gov.ceara.aposentadoria.dominio.projecao.DocumentoBeneficioProjection;

/**
 * Classe de repositório usada para acesso direto aos dados de documentos de benefício no banco de dados. Não possui
 * regras de negócio.
 * 
 * @since 1.0.0
 * @see DocumentoBeneficio
 */
@Repository
public interface DocumentoBeneficioRepository extends JpaRepository<DocumentoBeneficio, Long> {
    // Exemplo utilizando @Query annotation.

    /**
     * Retorna a lista de documentos relacionados a um determinado benefício.
     * 
     * @param beneficioId
     *            Identificação única do benefício.
     * @return Lista de documentos.
     * @see DocumentoBeneficioProjection
     */
    @Query("SELECT d FROM DocumentoBeneficio d WHERE d.beneficio.id = :beneficioId")
    List<DocumentoBeneficioProjection> obterDocumentosBeneficio(@Param("beneficioId") Long beneficioId);
}
