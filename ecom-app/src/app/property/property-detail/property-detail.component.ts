import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { Property } from 'src/app/model/property';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
public propertyId: number;
property = new Property();
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService) { }

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Property) =>{
        this.property = data['prp'];
      }
    );

    // this.route.params.subscribe(
    //   (params) => {
    //     this.propertyId = +params['id'];
    //     this.housingService.getProperty(this.propertyId).subscribe(
    //       (data: Property) => {
    //         this.property = data;
    //       }
    //     );
    //   }
    // );

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/images/prop1.jpg',
        medium: 'assets/images/prop1.jpg',
        big: 'assets/images/prop1.jpg'
      },
      {
        small: 'assets/images/prop2.jpg',
        medium: 'assets/images/prop2.jpg',
        big: 'assets/images/prop2.jpg'
      },
      {
        small: 'assets/images/prop3.jpg',
        medium: 'assets/images/prop3.jpg',
        big: 'assets/images/prop3.jpg'
      },{
        small: 'assets/images/prop4.jpg',
        medium: 'assets/images/prop4.jpg',
        big: 'assets/images/prop4.jpg'
      },
      {
        small: 'assets/images/prop5.jpg',
        medium: 'assets/images/prop5.jpg',
        big: 'assets/images/prop5.jpg'
      }
    ];
  }
}
