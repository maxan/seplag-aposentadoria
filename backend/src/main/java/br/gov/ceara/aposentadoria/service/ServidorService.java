package br.gov.ceara.aposentadoria.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.gov.ceara.aposentadoria.dominio.Servidor;
import br.gov.ceara.aposentadoria.repositorio.ServidorRepository;
import reactor.core.publisher.Flux;

@Service
public class ServidorService  {
    @Autowired
    private ServidorRepository servidorRepository;

    public Flux<Servidor> listarTodos() {
        return Flux.from(subscriber -> {
            this.servidorRepository.findAll().stream().forEach(servidor -> subscriber.onNext(servidor));
            subscriber.onComplete();
        });
    }
}
