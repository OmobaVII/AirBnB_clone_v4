$(document).ready(function () {
  const CheckedAmenities = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      CheckedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete CheckedAmenities[$(this).data('id')];
    }
    const obj = Object.values(CheckedAmenities);
    if (obj > 0) {
      $('div.amenities > h4').text(Object.values(CheckedAmenities).join(','));
    } else {
      $('div.amenities > h4').html('&nbsp;');
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
		      <article>
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
		      </article>
	      )
	    );
  ),
  dataType: 'json',
	  });
  });
});

