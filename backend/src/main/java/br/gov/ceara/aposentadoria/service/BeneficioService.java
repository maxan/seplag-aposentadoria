package br.gov.ceara.aposentadoria.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.gov.ceara.aposentadoria.dominio.Beneficio;
import br.gov.ceara.aposentadoria.dominio.Servidor;
import br.gov.ceara.aposentadoria.enumerador.TipoBeneficio;
import br.gov.ceara.aposentadoria.repositorio.BeneficioRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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

    public Mono<Optional<Beneficio>> listarPorMatriculaServidor(String matriculaServidor, TipoBeneficio tipoBeneficio) {
        return Mono.fromCallable(() -> {
            Optional<Beneficio> encontrado = this.beneficioRepository
                    .listarBeneficiosPorMatriculaServidor(matriculaServidor, tipoBeneficio).stream().findFirst();
            return encontrado;
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
