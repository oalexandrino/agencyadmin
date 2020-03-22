import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';

@Injectable({
    providedIn: 'root'
})
export class TeamInfoFormResolver implements Resolve<any> {

    constructor(public http: HttpClient, public mongoAgencyWebSiteService: MongoAgencyWebSiteService, ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return new Promise((resolve) => {
            this.mongoAgencyWebSiteService.getListing('team/')
                .subscribe(data => {
                    console.log(data);
                    resolve(data);
                }, err => { console.log(err); });
        });
    }
}