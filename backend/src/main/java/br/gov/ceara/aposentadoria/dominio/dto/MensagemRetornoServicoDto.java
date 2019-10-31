package br.gov.ceara.aposentadoria.dominio.dto;

/**
 * Classe que representa uma mensagem de retorno padrão do serviço.
 */
public class MensagemRetornoServicoDto {
    // Atributos obrigatórios.
    private final boolean sucesso;
    private final String mensagem;

    // Atributos opcionais.
    private Object retorno;

    private MensagemRetornoServicoDto(Builder builder) {
        this.sucesso = builder.sucesso;
        this.mensagem = builder.mensagem;
        this.retorno = builder.retorno;
    }

    /**
     * Obtém a indicação de ocorrência de erro durante a solicitação feita ao serviço.
     *
     * @return Caso retorne <code>TRUE</code>, o serviço executou a operação com sucesso. Retornando <code>FALSE</code>,
     * algum problema ocorreu durante a solicitação junto ao serviço.
     */
    public boolean isSucesso() {
        return this.sucesso;
    }

    /**
     * Obtém a mensagem que descreve o resultado da requisição feita junto ao serviço.
     *
     * @return Mensagem que descreve o resultado da requisição.
     */
    public String getMensagem() {
        return this.mensagem;
    }

    /**
     * Obtém o conteúdo do retorno proveniente da requisição feita junto ao serviço.
     *
     * @return Objeto de retorno da requisição.
     */
    public Object getRetorno() {
        return this.retorno;
    }

    public static class Builder {

        // Atributos obrigatórios.
        private final boolean sucesso;
        private final String mensagem;

        // Atributos opcionais.
        private Object retorno;

        public Builder(boolean sucesso, String mensagem) {
            this.sucesso = sucesso;
            this.mensagem = mensagem;
        }

        public Builder retorno(Object valor) {
            this.retorno = valor;
            return this;
        }

        public MensagemRetornoServicoDto build() {
            return new MensagemRetornoServicoDto(this);
        }

    }

}
