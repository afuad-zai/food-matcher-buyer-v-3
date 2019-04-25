import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ComponentsModule } from '../components/components.module';

import { PipesModule } from '../pipes/pipes.module';

import { StoreProvider } from '../providers/store/store';
import { MenuProvider } from '../providers/menu/menu';
import { RatingProvider } from '../providers/rating/rating';
import { AccountProvider } from '../providers/account/account';
import { OrderProvider } from '../providers/order/order';
import { CameraProvider } from '../providers/camera/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { QrcodeProvider } from '../providers/qrcode/qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    PipesModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StoreProvider,
    MenuProvider,
    RatingProvider,
    AccountProvider,
    OrderProvider,
    CameraProvider,
    FileTransfer,
    QrcodeProvider,
    BarcodeScanner
  ]
})
export class AppModule { }
