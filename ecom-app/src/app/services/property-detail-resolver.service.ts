import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Property } from '../model/property';
import { HousingService } from './housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

constructor(private route:Router, private housingService:HousingService) { }

resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<Property>|Property{
  const propId = route.params['id'];
  return this.housingService.getProperty(+propId).pipe(
    catchError(error => {
      this.route.navigate(['/']);
      return of(null);
    })
  );
}

}
