package br.gov.ceara.aposentadoria.dominio;

import java.time.ZonedDateTime;

import javax.persistence.*;

import br.gov.ceara.aposentadoria.enumerador.SetorTramitacao;

@Entity
public class TramitacaoMovimento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "beneficioId", nullable = false)
    private Beneficio beneficio;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private SetorTramitacao setorOrigem;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private SetorTramitacao setorDestino;
    private ZonedDateTime dataMovimentacao;

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

    public SetorTramitacao getSetorOrigem() {
        return this.setorOrigem;
    }

    public void setSetorOrigem(SetorTramitacao setorOrigem) {
        this.setorOrigem = setorOrigem;
    }

    public SetorTramitacao getSetorDestino() {
        return this.setorDestino;
    }

    public void setSetorDestino(SetorTramitacao setorDestino) {
        this.setorDestino = setorDestino;
    }

    public ZonedDateTime getDataMovimentacao() {
        return this.dataMovimentacao;
    }

    public void setDataMovimentacao(ZonedDateTime dataMovimentacao) {
        this.dataMovimentacao = dataMovimentacao;
    }
}
