import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';

@Injectable()
export class ReservaService{
    constructor(public afDB: AngularFireDatabase) {}

    getReservas() {
        return this.afDB.list('reservas/');
    }
}