package br.gov.ceara.aposentadoria.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.gov.ceara.aposentadoria.dominio.TramitacaoMovimento;
import br.gov.ceara.aposentadoria.repositorio.TramitacaoMovimentoRepository;
import reactor.core.publisher.Flux;

@Service
public class TramitacaoMovimentoService {
    @Autowired
    private TramitacaoMovimentoRepository tramitacaoMovimentoRepository;

    public Flux<TramitacaoMovimento> obterTramitacoesPorBeneficio(Long beneficioId) {
        return Flux.from(subscriber -> {
            this.tramitacaoMovimentoRepository.obterTramitacoesPorBeneficio(beneficioId).stream().forEach(item -> {
                subscriber.onNext(item);
            });
            subscriber.onComplete();
        });
    }
}
