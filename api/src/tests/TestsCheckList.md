# Checklist de Testes

## Cenários de sucesso

    [x] Criar aula única.
    [ ] Criar aula recorrente.
    [ ] Criar evento pessoal.
    [ ] Criar evento externo.
    [ ] Criar avaliação.
    [ ] Criar feedback.
    [ ] Editar evento.
    [ ] Cancelar evento.
    [ ] Excluir evento.
    [ ] Reservar sala para um evento.

## Conflitos de horário

    [ ] Aulas com horários conflitantes na mesma sala.
    [ ] Instrutor ocupado no mesmo horário.
    [ ] Turma ocupada no mesmo horário.
    [ ] Usuário com evento pessoal no mesmo horário.
    [ ] Evento iniciando exatamente quando outro termina.
    [ ] Evento terminando exatamente quando outro inicia.
    [ ] Evento completamente contido dentro de outro.
    [ ] Evento abrangendo completamente outro evento.

## Regras de recorrência

    [ ] Série semanal sem conflitos.
    [ ] Série semanal com um conflito em uma ocorrência.
    [ ] Série com apenas uma ocorrência.
    [ ] Série limitada por quantidade de ocorrências.
    [ ] Série limitada por data final.
    [ ] Cancelar apenas uma ocorrência da série.
    [ ] Cancelar a série inteira.

## Salas

    [ ] Sala disponível.
    [ ] Sala ocupada.
    [ ] Alterar sala para uma disponível.
    [ ] Alterar sala para uma ocupada.
    [ ] Excluir reserva.
    [ ] Atualizar reserva.

## Participantes

    [x] Confirmar participação.
    [x] Recusar participação.
    [x] Mesmo usuário participando duas vezes do mesmo evento (deve falhar).

## Permissões

    [ ] Aprendiz criando evento permitido.
    [ ] Aprendiz tentando criar evento restrito.
    [ ] Instrutor criando aulas.
    [ ] Administrador criando qualquer evento.
    [ ] Usuário alterando evento de outro usuário.
    [ ] Usuário excluindo evento de outro usuário.

## Casos de validação

    [ ] Data inicial maior que a final.
    [ ] Data inicial igual à final.
    [ ] Sala inexistente.
    [ ] Matéria inexistente.
    [ ] Instrutor inexistente.
    [ ] SubjectInstructor inexistente.
    [ ] Usuário criador inexistente.
    [ ] Evento sem título.
    [ ] Evento sem horário.
    [ ] Evento com duração muito longa (se houver limite).

## Fluxos gerais

    [x] Login.
    [ ] CRUD de Usuários.
    [ ] CRUD de Turmas.
    [ ] CRUD de Matérias.
    [ ] CRUD de Salas.
    [ ] CRUD de Eventos.
    [ ] CRUD de Reservas.
    [ ] Feed do calendário.
    [ ] Busca por período.
    [ ] Busca por sala.
    [ ] Busca por instrutor.
    [ ] Busca por turma.
    [ ] Busca por matéria.