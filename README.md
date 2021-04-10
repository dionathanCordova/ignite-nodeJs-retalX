# CADASTRO DE CARROS

**RF** # requisito funcional
Deve ser possível cadastrar um novo carro
Deve ser possível listar todas as categorias

**RNF**

**RN** # Regra de negocio
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsável pelo cadastro deve ser um usuario admin

# LISTAGEM DE CARRO

**RF**
Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pelo nome da categoria
Deve ser possível listar todos os carros disponíveis pelo nome da marca
Deve ser possível listar todos os carros disponíveis pelo nome da carro

**RN**
Não é necessario estar logado para que o usuario possa listar os carros


# CADASTRO DE ESPECIFICAÇÃO NO CARRO

**RF**
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**RN**
Não deve ser possível cadastrar especidifação para carro não cadastrado
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuario admin


# CADASTRO DE IMAGENS

**RF**
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload da imagem

**RN**
Deve ser possível cadastrar mais de uma imagem para o mesmo carro
O responsável pelo cadastro deve ter previlégio de admin


# ALUGUEL DE CARRO

**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração minima de 24 horas
Não deve ser possível cadastrar alugueis simutãneos para o mesmo cliente
Não deve ser possível cadastrar aluguel já existe em aberto para o mesmo carro