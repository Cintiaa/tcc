export class Disciplina {
  constructor(public IdDisciplina: number,
              public Sigla: string,
              public Nome: string,
              public IsDeleted: boolean,
              public createdAt: Date,
              public updatedAt: Date) {}
}
