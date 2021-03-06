import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';

@Injectable({
    providedIn: 'root'
})
export class ServiceFormResolver implements Resolve<any> {

    constructor(public http: HttpClient, public mongoAgencyWebSiteService: MongoAgencyWebSiteService, ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return new Promise((resolve) => {
            const serviceId = route.paramMap.get('id');
            this.mongoAgencyWebSiteService.getCollectionItem('service', serviceId)
                .subscribe(data => {
                    resolve(data);
                }, err => { console.log(err); });
        });
    }
}
