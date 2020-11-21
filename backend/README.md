# Recuperação de senha

**RF**
- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instrução de senha;
- O usuário deve poder resetar sua senha;

**RNF**
- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails  deve acontecer em segundo plano (background job);

**RN**
- O link  enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**
- O usuário deve poder atualizar seu perfil, nome,  email e senha;
- O usuário deve receber um e-mail com instrução de senha;
- O usuário deve poder resetar sua senha;

**RNF**


**RN**
- O usuário não pode alterar seu email para um email já utilizado;
- Para utilizar sua senha, o usuário deve informa a senha antiga;
- Para atualizar seu senha, o usuário precisa   confirmar a nova senha;

# Painel do prestados

**RF**
  - O usuário devepoder listar seus agendamentos de um dia específico;
  - O prestador deve receber uma notificação sempre que houver um novo agendamento;
  - O prestador deve poder visualizar as  notificações não lidas;

**RNF**
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações  do prestador devem ser armazenado no MongoDB;
- As notificações do prestador  devem ser enviados em tempo-real utilizando Sokert.io;

**RN**
- A notificação dever ter um status de lida ou não lida para que o prestadoror possa controlar;

# Agendamento  de serviço

**RF**
- O usuário deve poder listar todos prestadores de serviço cadastrado;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários desponivel em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestado;

**RNF**
- A listagem de prestadores deve ser armazenada em cache;
-

**RN**
- Cada agendamento deve durar 1h exatamente;
- Os  agendamentos devem estar disponíveis entre 8hs ás 18hs (Primeiro ás 8:00hs, Último ás 17:00hs)
- O usuário não pode agendar um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
