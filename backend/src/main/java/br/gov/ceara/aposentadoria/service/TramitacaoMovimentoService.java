package br.gov.ceara.aposentadoria.service;

import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.Comparator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.gov.ceara.aposentadoria.dominio.TramitacaoMovimento;
import br.gov.ceara.aposentadoria.enumerador.SetorTramitacao;
import br.gov.ceara.aposentadoria.repositorio.TramitacaoMovimentoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TramitacaoMovimentoService {
    @Autowired
    private TramitacaoMovimentoRepository tramitacaoMovimentoRepository;

    public Flux<TramitacaoMovimento> obterTramitacoesPorBeneficio(Long beneficioId) {
        return Flux.fromStream(
                () -> this.tramitacaoMovimentoRepository.obterTramitacoesPorBeneficio(beneficioId).stream());
    }

    public Mono<TramitacaoMovimento> tramitarProcessoBeneficio(Long beneficioId, SetorTramitacao setorDestino) {
        return this.obterTramitacoesPorBeneficio(beneficioId).collectList()
                .defaultIfEmpty(Collections.<TramitacaoMovimento>emptyList()).map(tramitacoes -> {
                    return tramitacoes.stream().max(Comparator.comparing(TramitacaoMovimento::getDataMovimentacao))
                            .map(movimento -> {
                                if (movimento.getSetorDestino().equals(setorDestino)) {
                                    throw new RuntimeException(
                                            String.format("O processo já está no setor %s.", setorDestino));
                                }

                                return new TramitacaoMovimento(beneficioId, movimento.getSetorDestino(), setorDestino,
                                        ZonedDateTime.now());
                            }).orElse(new TramitacaoMovimento(beneficioId, setorDestino, ZonedDateTime.now()));
                }).flatMap(movimento -> Mono.fromCallable(() -> {
                    return this.tramitacaoMovimentoRepository.save(movimento);
                }));
    }
}
