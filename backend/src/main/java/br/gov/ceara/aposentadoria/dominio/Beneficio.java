package br.gov.ceara.aposentadoria.dominio;


import java.time.LocalDate;

import javax.persistence.*;

import br.gov.ceara.aposentadoria.enumerador.TipoBeneficio;

@Entity
public class Beneficio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private TipoBeneficio tipoBeneficio;
    @ManyToOne
    @JoinColumn(name = "servidorId", nullable = false)
    private Servidor servidor;
    private LocalDate dataConcessao;

    public Beneficio() {
    }

    public Beneficio(Long id) {
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoBeneficio getTipoBeneficio() {
        return this.tipoBeneficio;
    }

    public void setTipoBeneficio(TipoBeneficio tipoBeneficio) {
        this.tipoBeneficio = tipoBeneficio;
    }

    public Servidor getServidor() {
        return this.servidor;
    }

    public void setServidor(Servidor servidor) {
        this.servidor = servidor;
    }

    public LocalDate getDataConcessao() {
        return this.dataConcessao;
    }

    public void setDataConcessao(LocalDate dataConcessao) {
        this.dataConcessao = dataConcessao;
    }
}
