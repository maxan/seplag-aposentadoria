package br.gov.ceara.aposentadoria.service;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.gov.ceara.aposentadoria.dominio.DocumentoBeneficio;
import br.gov.ceara.aposentadoria.enumerador.TipoDocumentoBeneficio;
import br.gov.ceara.aposentadoria.repositorio.DocumentoBeneficioRepository;
import reactor.core.publisher.Mono;

@Service
public class DocumentoBeneficioService {
    @Autowired
    private DocumentoBeneficioRepository documentoBeneficioRepository;

    public Mono<DocumentoBeneficio> salvarDocumentoBeneficio(MultipartFile arquivo, Long beneficioId,
            TipoDocumentoBeneficio tipoDocumentoBeneficio) {
        return Mono.fromCallable(() -> {
            try {
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

    public Mono<Optional<DocumentoBeneficio>> obterDocumentoBeneficio(Long documentoId) {
        return Mono.fromCallable(() -> {
            return this.documentoBeneficioRepository.findById(documentoId);
        });
    }
}
