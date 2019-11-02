package br.gov.ceara.aposentadoria.dominio.projecao;

import java.time.LocalDate;
import java.time.ZonedDateTime;

import br.gov.ceara.aposentadoria.enumerador.TipoBeneficio;
import br.gov.ceara.aposentadoria.enumerador.TipoDocumentoBeneficio;

public interface DocumentoBeneficioProjection {
    Long getId();

    TipoDocumentoBeneficio getTipoDocumentoBeneficio();

    ZonedDateTime getDataCadastro();

    String getTipoConteudo();

    String getNomeOriginalArquivo();

    interface Beneficio {
        Long getId();

        TipoBeneficio getTipoBeneficio();

        LocalDate getDataConcessao();
    }
}
