package br.gov.ceara.aposentadoria.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.gov.ceara.aposentadoria.dominio.Servidor;

/**
 * Classe de repositório usada para acesso direto aos dados de servidores no banco de dados. Não possui regras de
 * negócio.
 * 
 * @since 1.0.0
 * @see Servidor
 */
@Repository
public interface ServidorRepository extends JpaRepository<Servidor, Long> {
}
