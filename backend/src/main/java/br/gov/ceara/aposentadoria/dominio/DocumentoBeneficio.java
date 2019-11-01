package br.gov.ceara.aposentadoria.dominio;

import java.time.ZonedDateTime;

import javax.persistence.*;

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
    private ZonedDateTime dataCadastro;
    private String tipoConteudo;
    private String nomeOriginalArquivo;

    public DocumentoBeneficio() {

    }

    public DocumentoBeneficio(Long beneficioId, byte[] conteudo, ZonedDateTime dataCadastro, String tipoConteudo,
            String nomeOriginalArquivo) {
        this.beneficio = new Beneficio(beneficioId);
        this.conteudo = conteudo;
        this.dataCadastro = dataCadastro;
        this.tipoConteudo = tipoConteudo;
        this.nomeOriginalArquivo = nomeOriginalArquivo;
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
