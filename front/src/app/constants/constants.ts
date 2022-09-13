import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Constants {
    public protocol = "http";
    public domain = "localhost:3000/api"
  }