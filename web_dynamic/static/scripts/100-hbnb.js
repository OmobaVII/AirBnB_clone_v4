$(document).ready(function () {
  const CheckedAmenities = {};
  const CheckedCities = {};
  const CheckedStates = {};

  $('ul li input[type="checkbox"]').bind("change", (data) => {
    const tag = data.target;
    let t;
    switch (tag.id) {
      case "state_filter":
        t = CheckedStates;
        break;
      case "city_filter":
        t = CheckedCities;
        break;
      case "amenity_filter":
        t = CheckedAmenities;
        break;
    }
    if (tag.checked) {
      t[tag.dataset.name] = tag.dataset.id;
    } else {
      delete t[tag.dataset.name];
    }
    if (tag.id === 'amenity_filter') {
      $('.amenities h4').text(Object.keys(CheckedAmenities).sort().join(', '));
    } else {
      $('.locations h4').text(Object.keys(Object.assign({}, CheckedStates, CheckedCities)).sort().join(', '));
    }
  });

  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.getJSON(url, (data) => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  const SecondUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.post({
	  url: SecondUrl,
	  data: JSON.stringify({}),
	  headers: {
		  'Content-Type': 'application/json',
	  },
	  success: (data) => {
	    data.forEach((place) =>
	      $('section.places').append(
		      `<article>
	    <div class='title'>
	    <h2>${place.name}</h2>
	    <div class='price_by_night'>$${place.price_by_night}</div>
	    </div>
	    <div class='information'>
	    <div class='max_guest'>${place.max_guest} Guest ${place.max_guest !== 1? 's' : ''}</div>
	    <div class='number_rooms'>${place.number_roorms} Bedroom ${place.number_rooms !== 1 ? 's' : '' }</div>
	    <div class='number_bathrooms'>${place.number_bathrroms} Bathroom ${place.number_bathrooms !== 1 ? 's' : '' }</div>
	    </div>
	    <div class='description'>${place.description}</div>
		      </article>`
	      )
	    );
  ),
  dataType: 'json',
	  });
  });
  
  $('.filters button').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      data: JSON.stringify({ amenities: Object.keys(CheckedAmenities)}),
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      dataType: 'json',
      contentType: 'application/json',
      success: data => {
	for (const place of data) {
	  const template = `<article>
       <div class="title">
	    <h2>${place.name}</h2>
	    <div class="price_by_night">$${place.price_by_night}
	    </div>
       </div>
	  <div class="information">
	    <div class="max_guest">
	    <div class="image_guest"></div>
       <br />
       ${place.max_guest} Guests
	      </div>
	        <div class="number_rooms">
		<div class="img_room"></div>
       <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
       <br />
       ${place.number_rooms} Bedrooms
           </div>
	   <div class="number_bathrooms">
	   <div class="img_bathrooms"></div>
       <br />
       ${place.number_bathrooms} Bathroom
           </div>
	 </div>
       <!-- USER -->
       <div class="user">
       <p><b>Owner: </b>${users[place.user_id]}</p>
       </div>
         <div class="description">
	   ${place.description}
	 </div>
	</article> <!-- End 1 PLACE Article -->`;
	      $('section.places').append(template);
	}
      }
    });
  });
});

