import { Routes } from '@angular/router';
import { CustomerList } from './customer-list/customer-list';
import { CustomerEditor } from './customer-editor/customer-editor';
import { VideoList } from './video-list/video-list';
import { VideoEditor } from './video-editor/video-editor';
import { RentList } from './rent-list/rent-list';
import { RentEditor } from './rent-editor/rent-editor';


export const routes: Routes = [

     {
        path: '',
        component: CustomerList
    },

    {
        path: 'videos',
        component: VideoList
    },
    {
        path: 'customers',
        component: CustomerList
    },
    {
        path: 'create-customer',
        component: CustomerEditor
    },
    {
        path: 'create-video',
        component: VideoEditor
    },
    {
        path: 'edit-customer/:id',
        component: CustomerEditor
    }
    ,
    {
        path: 'edit-video/:id',
        component: VideoEditor
    }
     ,
    {
        path: 'rents',
        component: RentList
    }
     ,
    {
        path: 'create-rent',
        component: RentEditor
    }


];
