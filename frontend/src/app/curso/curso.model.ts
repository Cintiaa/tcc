export class Curso {
  constructor(public IdCurso: number,
              public Sigla: string,
              public Nome: string,
              public IsDeleted: boolean,
              public createdAt: Date,
              public updatedAt: Date) {}
}
