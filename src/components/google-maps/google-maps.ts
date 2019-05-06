import { Component, Input, Renderer2, ElementRef, Inject, ViewChild } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { DOCUMENT } from '@angular/platform-browser';
import { Plugins } from '@capacitor/core';
import { } from '@types/googlemaps';

import { StoreInfo } from '../../interfaces/store'

const { Geolocation, Network } = Plugins;

//declare var google;
/**
 * Generated class for the GoogleMapsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-maps',
  templateUrl: 'google-maps.html'
})
export class GoogleMapsComponent {

  @Input('apiKey') apiKey: string;
  @ViewChild('mapContainer') mapContainer: ElementRef;

  public map: any;
  public markers: any[] = [];
  private mapsLoaded: boolean = false;
  private networkHandler = null;
  private currentLocation;
  private latitude: number;
  private longitude: number;
  private infoWindows: any;

  constructor(private renderer: Renderer2, private element: ElementRef, @Inject(DOCUMENT) private _document, public events: Events, public navCtrl: NavController) {
    this.infoWindows = [];
  }

  ngOnInit() {

    this.init().then((res) => {
      console.log("Google Maps ready.")
      this.events.publish('map:loaded');
    }, (err) => {
      console.log(err);
    });

  }

  private init(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.loadSDK().then((res) => {

        this.initMap().then((res) => {
          resolve(true);
        }, (err) => {
          reject(err);
        });

      }, (err) => {

        reject(err);

      });

    });

  }

  private loadSDK(): Promise<any> {

    console.log("Loading Google Maps SDK");

    return new Promise((resolve, reject) => {

      if (!this.mapsLoaded) {

        Network.getStatus().then((status) => {

          if (status.connected) {

            this.injectSDK().then((res) => {
              resolve(true);
            }, (err) => {
              reject(err);
            });

          } else {

            if (this.networkHandler == null) {

              this.networkHandler = Network.addListener('networkStatusChange', (status) => {

                if (status.connected) {

                  this.networkHandler.remove();

                  this.init().then((res) => {
                    console.log("Google Maps ready.")
                  }, (err) => {
                    console.log(err);
                  });

                }

              });

            }

            reject('Not online');
          }

        }, (err) => {

          // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
          if (navigator.onLine) {

            this.injectSDK().then((res) => {
              resolve(true);
            }, (err) => {
              reject(err);
            });

          } else {
            reject('Not online');
          }

        });

      } else {
        reject('SDK already loaded');
      }

    });


  }

  private injectSDK(): Promise<any> {

    return new Promise((resolve, reject) => {

      window['mapInit'] = () => {
        this.mapsLoaded = true;
        resolve(true);
      }

      let script = this.renderer.createElement('script');
      script.id = 'googleMaps';

      if (this.apiKey) {
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
      }

      this.renderer.appendChild(this._document.body, script);

    });

  }

  private initMap(): Promise<any> {

    return new Promise((resolve, reject) => {

      Geolocation.getCurrentPosition().then((position) => {

        console.log(position);

        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: this.currentLocation,
          zoom: 15
        };

        this.map = new google.maps.Map(this.element.nativeElement, mapOptions);

        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.currentLocation,
          title: "My Location",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        });

        marker.addListener('click', () => {
          this.resetCamera()
        })

        resolve(true);

      }, (err) => {

        reject('Could not initialise map');

      });

    });

  }

  public resetCamera() {
    this.map.panTo(this.currentLocation)
  }

  public getCurrentLocation() {
    return { lat: this.latitude, lon: this.longitude };
  }

  public addMarker(store: StoreInfo): void {
    //console.log(store)
    let latLng = new google.maps.LatLng(store.location.lat, store.location.lon);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      title: store.name,
    });

    let infoWindowContent = '<div id="content"><p id="firstHeading" class="firstHeading">' + store.name + '</p></div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    infoWindow.open(this.map, marker);

    marker.addListener('click', event => {
      this.navCtrl.push('StorePage', { storeInfo: store });
    })

    this.markers.push(marker);

  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  public removeMarker(): void {
    if (this.markers && this.markers.length) {
      this.markers.forEach(marker => {
        if (marker && marker.setMap) {
          marker.setMap(null);
        }
      });

      this.markers = [];
      this.infoWindows = [];
    }

  }

}
