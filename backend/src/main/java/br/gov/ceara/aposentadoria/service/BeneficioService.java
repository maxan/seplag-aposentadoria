package br.gov.ceara.aposentadoria.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.gov.ceara.aposentadoria.dominio.Beneficio;
import br.gov.ceara.aposentadoria.dominio.Servidor;
import br.gov.ceara.aposentadoria.repositorio.BeneficioRepository;
import reactor.core.publisher.Flux;

@Service
public class BeneficioService {
    @Autowired
    private BeneficioRepository beneficioRepository;

    public Flux<Beneficio> listarTodos() {
        return Flux.from(subscriber -> {
            this.beneficioRepository.findAll().stream().forEach(beneficio -> subscriber.onNext(beneficio));
            subscriber.onComplete();
        });
    }

    public Flux<Beneficio> listarPorMatriculaServidor(String matriculaServidor) {
        return Flux.from(subscriber -> {
            this.beneficioRepository.listarBeneficiosPorMatriculaServidor(matriculaServidor).stream()
                    .forEach(beneficio -> subscriber.onNext(beneficio));
            subscriber.onComplete();
        });
    }

    public Flux<Servidor> listarServidoresComBeneficio() {
        return Flux.from(subscriber -> {
            this.beneficioRepository.listarServidoresComBeneficio().stream()
                    .forEach(servidor -> subscriber.onNext(servidor));
            subscriber.onComplete();
        });
    }
}
