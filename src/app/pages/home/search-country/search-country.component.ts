import { Component } from '@angular/core';

@Component({
  selector: 'app-search-country',
  templateUrl: './search-country.component.html',
  styleUrls: ['./search-country.component.css']
})
export class SearchCountryComponent {
  config = {
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  cityData = [
    {
      image: "assets/img/real-estate/city/tunis.jpg",
      title: "Tunis",
      sale_progressbar: 40,
      sale_count: "1023",
      rent_progressbar: 70,
      rent_count: "2560",
    },
    {
      image: "assets/img/real-estate/city/sousse.jpg",
      title: "Sousse",
      sale_progressbar: 35,
      sale_count: "540",
      rent_progressbar: 65,
      rent_count: "1980",
    },
    {
      image: "assets/img/real-estate/city/sfax.jfif",
      title: "Sfax",
      sale_progressbar: 30,
      sale_count: "720",
      rent_progressbar: 80,
      rent_count: "2200",
    },
    {
      image: "assets/img/real-estate/city/nabeul.jpg",
      title: "Nabeul",
      sale_progressbar: 50,
      sale_count: "430",
      rent_progressbar: 75,
      rent_count: "1400",
    },
    {
      image: "assets/img/real-estate/city/djerba.jpg",
      title: "Djerba",
      sale_progressbar: 45,
      sale_count: "860",
      rent_progressbar: 85,
      rent_count: "3000",
    }
  ];
}
