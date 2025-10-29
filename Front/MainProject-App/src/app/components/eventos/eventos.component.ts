import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  public eventos: any = [];
  public eventosFiltred: any = [];
  widthImg: number = 150;
  marginImg: number = 2;
  showImage: boolean = true;
  private _filterList: string = '';

  public get filterList(): string {
    return this._filterList;
  }

  public set filterList(value: string) {
    this._filterList = value;
    this.eventosFiltred = this.filterList
      ? this.filtredEvents(this.filterList)
      : this.eventos;
  }

  filtredEvents(filterFor: string): any {
    filterFor = filterFor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) =>
        evento.tema.toLocaleLowerCase().indexOf(filterFor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filterFor) !== -1
    );
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEventos();
  }

  eventImage() {
    this.showImage = !this.showImage;
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      (response) => {
        this.eventos = response;
        this.eventosFiltred = this.eventos;
      },
      (error) => console.log(error)
    );
  }
}
