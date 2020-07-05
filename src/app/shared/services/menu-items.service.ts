import { Injectable } from "@angular/core";
import { IMenu } from '../models/menu';
import { ApiInterceptorService } from '../interceptor/api-interceptor.service';

@Injectable({
    providedIn: 'root'
})

export class MenuItemsService {
    menu: IMenu;
    constructor(private api: ApiInterceptorService) { }
    getMenu() {
        const reqBody = {
            'serviceName': 'WSIOrderActivities',
            'restaurantsItemsList': {
                'areaID': '115',
                'branchId': '4967',
                'institutionNumber': '00000002',
                'processCode': '144200',
                'resturantID': '4967',
                'sourceID': '702000110001',
                'additionalData': [
                    {
                        'lang': 'EN'
                    }
                ],
                'channelInfo': {
                    'acquirerCountry': '818',
                    'merchantName': 'android|9|6953f5e7-80f1-49ea-a2f0-24e765284660|1.0.17'
                }
            }
        };
        return this.api.call('POST', reqBody);
    }
}
