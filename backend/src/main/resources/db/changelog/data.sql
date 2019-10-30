DROP TABLE IF EXISTS servidor;

CREATE TABLE servidor (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  nome VARCHAR(250) NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  matricula VARCHAR(20) UNIQUE NOT NULL,
  orgao VARCHAR(250) NOT NULL
);

INSERT INTO servidor (nome, cpf, matricula, orgao)  VALUES
('José da Siva', '92792208023', 'CB10102', 'Seplag'),
('Marcos Pinheiro', '71132403057', 'CB10103', 'Seplag'),
('Marta Soares', '50995969086', 'CB10107', 'Sefin'),
('Jennifen Gomes', '84785399058', 'CB10199', 'Sefin');