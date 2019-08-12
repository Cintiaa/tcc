import { Injectable } from '@angular/core';
import { Curso } from './curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  // Salvo aqui por enquanto, mas depois vamos receber essa lista do servidor
  // backend a partir do que estiver armazenado no banco.
  cursosArray: Array<Curso> = [ new Curso('ES', 'Bacharelado em Engenharia de Software'),
                                new Curso('EC', 'Engenharia da Computação'),
                                new Curso('ECA', 'Engenharia de Controle e Automação'),
                                new Curso('EEL', 'Engenharia Elétrica'),
                                new Curso('EELT', 'Engenharia Eletrônica'),
                                new Curso('EM', 'Engenharia Mecânica'),
                                new Curso('LM', 'Licenciatura em Matemática'),
                                new Curso('AS', 'Tecnologia em Análise e Desenvolvimento de Sistemas')];
  constructor() { }

  fetchCursos() {
    return this.cursosArray.slice();
  }
}
