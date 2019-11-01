package br.gov.ceara.aposentadoria.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.gov.ceara.aposentadoria.dominio.DocumentoBeneficio;

@Repository
public interface DocumentoBeneficioRepository extends JpaRepository<DocumentoBeneficio, Long> {
}
