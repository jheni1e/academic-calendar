# Checklist de Testes

## Cenários de sucesso

    [x] Criar aula única.
    [ ] Criar aula recorrente.
    [x] Criar evento pessoal.
    [ ] Criar evento externo.
    [ ] Criar avaliação.
    [x] Criar feedback.
    [x] Editar evento.
    [ ] Cancelar evento.
    [ ] Excluir evento.
    [x] Reservar sala para um evento.

## Conflitos de horário

    [x] Aulas com horários conflitantes na mesma sala.
    [x] Instrutor ocupado no mesmo horário.
    [x] Turma ocupada no mesmo horário.
    [x] Usuário com evento pessoal no mesmo horário.
    [x] Evento iniciando exatamente quando outro termina.
    [x] Evento terminando exatamente quando outro inicia.
    [x] Evento completamente contido dentro de outro.
    [x] Evento abrangendo completamente outro evento.

## Regras de recorrência

    [ ] Série semanal sem conflitos.
    [ ] Série semanal com um conflito em uma ocorrência.
    [ ] Série com apenas uma ocorrência.
    [ ] Série limitada por quantidade de ocorrências.
    [ ] Série limitada por data final.
    [ ] Cancelar apenas uma ocorrência da série.
    [ ] Cancelar a série inteira.

## Salas

    [x] Sala disponível.
    [x] Sala ocupada.
    [ ] Alterar sala para uma disponível.
    [ ] Alterar sala para uma ocupada.
    [ ] Excluir reserva. (Excluir Evento)
    [ ] Atualizar reserva. (Editar Evento)

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

    [x] Data inicial maior que a final.
    [x] Data inicial igual à final.
    [x] Sala inexistente.
    [x] Matéria inexistente.
    [x] Instrutor inexistente.
    [x] SubjectInstructor inexistente.
    [x] Usuário criador inexistente.
    [x] Evento sem título.
    [x] Evento sem horário.
    [x] Evento com duração muito longa (+9h).

## Fluxos gerais

    [x] Login.
    [ ] CRUD de Usuários.
    [ ] CRUD de Turmas.
    [ ] CRUD de Matérias.
    [ ] CRUD de Salas.
    [ ] CRUD de Eventos.
    [ ] CRUD de Reservas.
    [x] Feed do calendário.
    [ ] Busca por período.
    [ ] Busca por sala.
    [ ] Busca por instrutor.
    [ ] Busca por turma.
    [ ] Busca por matéria.