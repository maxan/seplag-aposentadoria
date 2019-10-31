package br.gov.ceara.aposentadoria.dominio;

import javax.persistence.*;

import br.gov.ceara.aposentadoria.enumerador.Orgao;

@Entity
public class Servidor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cpf;
    @Column(unique = true)
    private String matricula;
    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Orgao orgao;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return this.cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getMatricula() {
        return this.matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public Orgao getOrgao() {
        return this.orgao;
    }

    public void setOrgao(Orgao orgao) {
        this.orgao = orgao;
    }
}
