/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * Click the map to set a new location for the Street View camera.
 */
const app = document.getElementById("app");
// 2. Create a new <p></p> element programmatically
const p = document.createElement("p");

const iframy = document.getElementById("wikipedia") as HTMLSourceElement;

// Get the button from html for the random button
const button = document.getElementById('btn');

const friend = document.getElementById('friend');
const showfriend = document.getElementById('showfriend');






let map: google.maps.Map;

let panorama: google.maps.StreetViewPanorama;

function initMap(): void {
  const berkeley = { lat: 48.859632, lng: 2.292467 };
  const sv = new google.maps.StreetViewService();

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano") as HTMLElement
  );

  // Set up the map.
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: berkeley,
    zoom: 16,
    streetViewControl: false,
  });

  


  // Set the initial Street View camera to the center of the map
  sv.getPanorama({ location: berkeley, radius: 50 }).then(processSVData);

  // Look for a nearby Street View panorama when the map is clicked.
  // getPanorama will return the nearest pano when the given
  // radius is 50 meters or less.
  map.addListener("click", (event) => {
    sv.getPanorama({ location: event.latLng, radius: 50 })
      .then(processSVData)
      .catch((e) =>
        console.error("Street View data not found for this location.")
      );
      //window.open('http://localhost:7000');
      // Show the latitude and longitude
      //p.textContent = event.latLng;
      // 4. Append the p element to the div element
      //app?.appendChild(p);
      //console.log(event.latLng.toJSON());
    });

}

function processSVData({ data }: google.maps.StreetViewResponse) {
  const location = data.location!;

  const marker = new google.maps.Marker({
    position: location.latLng,
    map,
    title: "me at: " + location.description,
    icon: "https://i.imgur.com/g7wuAYS.png"
  });

  

  const Panomarker = new google.maps.Marker({
    position: location.latLng,
    map: panorama,
    icon: "https://i.imgur.com/g7wuAYS.png",
    title: "Me",
  });
  //icon in the map
  Panomarker.addListener("click", () => {
    
      // 3. Add the text content
      //p.textContent = "yo";
      // 4. Append the p element to the div element
      //app?.appendChild(p);
      friend.textContent = "Now a friend"
    
      
      
      //console.log(event.latLng.toJSON());
    });

    
  //bentley pe harta?
  /*const image =
    "https://maastricht.bentleymotors.com/picserver1/userdata/1/31595/3FAdVwEMPE/dws%20600x300%20sequin%20blue%20flying%20spur%20azure.png";
  const beachMarker = new google.maps.Marker({
    position: { lat: -33.89, lng: 151.274 },
    map,
    icon: image,
  });
  */

  panorama.setPano(location.pano as string);
  panorama.setPov({
    heading: 270,
    pitch: 0,
  });
  console.log(location.pano);
  console.log(location.description);
  

  //random location
  button?.addEventListener('click', function handleClick() {
    
    
    panorama.setPano("qTNlPwxTS9KGh2ztqTQWLA");

  
  });

 
  
  showfriend.addEventListener('click', function handleClick() {

    const Panomarkerf = new google.maps.Marker({
      position: { lat: 48.8593989, lng: 2.2940444 },
      map,
      icon: "https://i.imgur.com/ZkeieGK.png",
      title: "@TimDillon",
    });

    const Panomarkerf2 = new google.maps.Marker({
      position: { lat: 48.8593989, lng: 2.2940444 },
      map: panorama,
      icon: "https://i.imgur.com/ZkeieGK.png",
      title: "@TimDillon",
    });


  });



  

  panorama.setVisible(true);

  if (iframy != null) {
    // 👉️ image has type HTMLLinkElement
    const myArray = location.description.split(" ");
    let word = myArray.slice(-4,-2);
    iframy.src = 'https://www.bing.com/search?q=' + word +'';
  }
  

  marker.addListener("click", () => {
    const markerPanoID = location.pano;

    // Set the Pano to use the passed panoID.
    panorama.setPano(markerPanoID as string);
    panorama.setPov({
      heading: 270,
      pitch: 0,
    });
    panorama.setVisible(true);
  });
}




declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;

export {};