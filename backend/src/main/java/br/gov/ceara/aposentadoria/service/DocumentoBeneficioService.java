package br.gov.ceara.aposentadoria.service;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.gov.ceara.aposentadoria.dominio.DocumentoBeneficio;
import br.gov.ceara.aposentadoria.dominio.projecao.DocumentoBeneficioProjection;
import br.gov.ceara.aposentadoria.enumerador.TipoDocumentoBeneficio;
import br.gov.ceara.aposentadoria.repositorio.DocumentoBeneficioRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Classe de serviço utilizada para obter informaçõesde relacionadas a documentos de benefícios.
 * 
 * @since 1.0.0
 * @see DocumentoBeneficioRepository
 * @see DocumentoBeneficio
 */
@Service
public class DocumentoBeneficioService {
    @Autowired
    private DocumentoBeneficioRepository documentoBeneficioRepository;

    /**
     * Salva um determinado documento de benefício na base de dados. Esse é sempre associado a um benefício.
     * 
     * @param arquivo
     *            Metadados e conteúdo do arquivo a ser salvo.
     * @param beneficioId
     *            Identificação única do benefício ao qual o arquivo será associado.
     * @param tipoDocumentoBeneficio
     *            Tipo do documento do benefício.
     * @return
     * @throws RuntimeException
     */
    public Mono<DocumentoBeneficio> salvarDocumentoBeneficio(MultipartFile arquivo, Long beneficioId,
            TipoDocumentoBeneficio tipoDocumentoBeneficio) {
        return Mono.fromCallable(() -> {
            try {
                if (beneficioId == null) {
                    throw new RuntimeException(
                            "Não foi possível identificar o benefício ao qual o documento será associado.");
                }

                if (tipoDocumentoBeneficio == null) {
                    throw new RuntimeException("Não foi possível identificar o tipo do documento do benefício.");
                }

                DocumentoBeneficio documentoBeneficio = new DocumentoBeneficio(beneficioId, arquivo.getBytes(),
                        tipoDocumentoBeneficio, arquivo.getContentType(), arquivo.getOriginalFilename(),
                        ZonedDateTime.now());
                DocumentoBeneficio documentoSalvo = this.documentoBeneficioRepository.save(documentoBeneficio);

                documentoSalvo.setConteudo(null);

                return documentoSalvo;
            } catch (IOException exception) {
                throw new RuntimeException(
                        "Não foi possível salvar as informações do arquivo devido há problema na leitura do mesmo.");
            }
        });
    }

    /**
     * Obtém todas as informações de um determinado documento de benefício, incluindo seu conteúdo.
     * 
     * @param documentoId
     *            Identificação única do documento.
     * @return Informações do documento.
     * @throws RuntimeException
     */
    public Mono<Optional<DocumentoBeneficio>> obterDocumentoBeneficio(Long documentoId) {
        return Mono.fromCallable(() -> {
            if (documentoId == null) {
                throw new RuntimeException("Não foi possível identificar o documento de benefício desejado.");
            }

            return this.documentoBeneficioRepository.findById(documentoId);
        });
    }

    /**
     * Lista todos os documentos relacionados a um benefício.
     * 
     * @param beneficioId
     *            Identificação única do benefício.
     * @return Lista de documentos (sem o conteúdo).
     * @throws RuntimeException
     */
    public Flux<DocumentoBeneficioProjection> listarDocumentosPorBeneficio(Long beneficioId) {
        return Flux.from(subscriber -> {
            if (beneficioId == null) {
                throw new RuntimeException("Não foi possível identificar o benefício dos documentos desejados.");
            }

            this.documentoBeneficioRepository.obterDocumentosBeneficio(beneficioId).stream()
                    .forEach(documento -> subscriber.onNext(documento));
            subscriber.onComplete();
        });
    }
}
