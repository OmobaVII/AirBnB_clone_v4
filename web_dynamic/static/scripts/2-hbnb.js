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
});

const url = 'http://0.0.0.0:5001/api/v1/status/';
$.getJSON(url, (data) => {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});
