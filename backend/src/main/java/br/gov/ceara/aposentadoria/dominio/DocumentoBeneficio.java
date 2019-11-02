package br.gov.ceara.aposentadoria.dominio;

import java.time.ZonedDateTime;

import javax.persistence.*;

import br.gov.ceara.aposentadoria.enumerador.TipoDocumentoBeneficio;

@Entity
public class DocumentoBeneficio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "beneficioId", nullable = false)
    private Beneficio beneficio;
    @Lob
    @Column(length = 900000)
    private byte[] conteudo;
    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private TipoDocumentoBeneficio tipoDocumentoBeneficio;
    private ZonedDateTime dataCadastro;
    private String tipoConteudo;
    private String nomeOriginalArquivo;

    public DocumentoBeneficio() {

    }

    public DocumentoBeneficio(Long beneficioId, byte[] conteudo, TipoDocumentoBeneficio tipoDocumentoBeneficio,
            String tipoConteudo, String nomeOriginalArquivo, ZonedDateTime dataCadastro) {
        this.beneficio = new Beneficio(beneficioId);
        this.conteudo = conteudo;
        this.dataCadastro = dataCadastro;
        this.tipoConteudo = tipoConteudo;
        this.nomeOriginalArquivo = nomeOriginalArquivo;
        this.tipoDocumentoBeneficio = tipoDocumentoBeneficio;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Beneficio getBeneficio() {
        return this.beneficio;
    }

    public void setBeneficio(Beneficio beneficio) {
        this.beneficio = beneficio;
    }

    public byte[] getConteudo() {
        return this.conteudo;
    }

    public void setConteudo(byte[] conteudo) {
        this.conteudo = conteudo;
    }

    public TipoDocumentoBeneficio getTipoDocumentoBeneficio() {
        return this.tipoDocumentoBeneficio;
    }

    public void setTipoDocumentoBeneficio(TipoDocumentoBeneficio tipoDocumentoBeneficio) {
        this.tipoDocumentoBeneficio = tipoDocumentoBeneficio;
    }

    public ZonedDateTime getDataCadastro() {
        return this.dataCadastro;
    }

    public void setDataCadastro(ZonedDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getTipoConteudo() {
        return this.tipoConteudo;
    }

    public void setTipoConteudo(String tipoConteudo) {
        this.tipoConteudo = tipoConteudo;
    }

    public String getNomeOriginalArquivo() {
        return this.nomeOriginalArquivo;
    }

    public void setNomeOriginalArquivo(String nomeOriginalArquivo) {
        this.nomeOriginalArquivo = nomeOriginalArquivo;
    }
}
