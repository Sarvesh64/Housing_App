import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Observable } from 'rxjs';
import { IProperty } from '../model/iproperty';
import { IPropertyBase } from '../model/ipropertybase';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getAllProperties(SellRent?: number): Observable<IPropertyBase[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
      const propertiesArray: Array<IPropertyBase> = [];
      const localProperties = JSON.parse(localStorage.getItem('newProp'));

      if (localProperties) {
        for (const id in localProperties) {
          if (SellRent) {
          if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
            propertiesArray.push(localProperties[id]);
          }
        } else {
          propertiesArray.push(localProperties[id]);
        }
        }
      }

      for (const id in data) {
        if (SellRent) {
          if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            propertiesArray.push(data[id]);
          }
          } else {
            propertiesArray.push(data[id]);
        }
      }
      return propertiesArray;
      })
    );

    return this.http.get<IProperty[]>('data/properties.json');
  }
  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        return propertiesArray.find(p => p.Id === id);
      })
    );
  }

  addProperty(property: Property) {
    let newProp = [property];

    // Add new property in array if newProp alreay exists in local storage
    if (localStorage.getItem('newProp')) {
      newProp = [property,
                  ...JSON.parse(localStorage.getItem('newProp'))];
    }

    localStorage.setItem('newProp', JSON.stringify(newProp));
  }


  newPropID() {
        if (localStorage.getItem('PID')) {
          localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
          return +localStorage.getItem('PID');
        } else {
          localStorage.setItem('PID', '101');
          return 101;
        }
      }

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5000/api/city');
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { IProperty } from '../property/IProperty.interface';
// import { Observable } from 'rxjs';
// import { Property } from '../model/property';


// @Injectable({
//   providedIn: 'root'
// })
// export class HousingService {

//   constructor(private http:HttpClient) { }

//   getAllCities(): Observable<string[]> {
//     return this.http.get<string[]>('http://localhost:5000/api/city');
//   }

//   getAllProperties(SellRent : number): Observable<IProperty[]>{
//     return this.http.get('data/properties.json').pipe(
//       map(data=>{
//         const propertiesArray: Array<IProperty> = [];
//         for(const id in data){
//           if(data.hasOwnProperty(id) && data[id].SellRent === SellRent){
//             propertiesArray.push(data[id]);
//           }
//         }
//         return propertiesArray;
//       })
//     );
//   }

//   addProperty(property: Property) {
//     let newProp = [property];

//     // Add new property in array if newProp alreay exists in local storage
//     if (localStorage.getItem('newProp')) {
//       newProp = [property,
//                   ...JSON.parse(localStorage.getItem('newProp'))];
//     }

//     localStorage.setItem('newProp', JSON.stringify(newProp));
//   }

//   newPropID() {
//     if (localStorage.getItem('PID')) {
//       localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
//       return +localStorage.getItem('PID');
//     } else {
//       localStorage.setItem('PID', '101');
//       return 101;
//     }
//   }

// }
