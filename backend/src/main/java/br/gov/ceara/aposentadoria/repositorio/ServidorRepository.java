package br.gov.ceara.aposentadoria.repositorio;

import br.gov.ceara.aposentadoria.dominio.Servidor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServidorRepository extends JpaRepository<Servidor, Long> {
}
