$(document).ready(function () {
  const base_url = 'https://www.carqueryapi.com/api/0.3/';

  function displayModelDetails(make, modelName, year) {
    $('#model-details').hide();
    $('.note').hide();

    if (make && modelName) {
      let urlParams = { cmd: 'getTrims', make: make, model: modelName };
      if (year) {
        urlParams.year = year;
      }

      $.getJSON(base_url + '?callback=?', urlParams, function (data) {
        if (data.Trims.length === 0) {
          $('#model-details-content').html(
            '<p class="error">Please check that you spelled the make and model correctly.</p>'
          );
          $('#model-details').show();
        } else {
          data.Trims.sort((a, b) => b.model_year - a.model_year);

          let modelDetails = '<table class="tablee">';

          data.Trims.forEach((model) => {
            modelDetails += `<tr><td class="year" colspan="2">${model.model_year}</td></tr>`;

            for (const key in model) {
              if (model.hasOwnProperty(key) && model[key]) {
                modelDetails += `<tr><td class="key">${key.replace(
                  /_/g,
                  ' '
                )}</td><td class="value">${model[key]}</td></tr>`;
              }
            }
          });

          modelDetails += '</table>';
          $('#model-details-content').html(modelDetails);
          $('#model-details').show();
        }
      });
    }
  }

  $('#search-button').on('click', function () {
    const make = $('#car-make').val();
    const modelName = $('#car-model').val();
    const year = $('#car-year').val();
    displayModelDetails(make, modelName, year);
  });
});

// $(document).ready(function () {
//   const base_url = 'https://www.carqueryapi.com/api/0.3/';

//   function displayModelDetails(make, modelName) {
//     $('#model-details').hide();

//     if (make && modelName) {
//       $.getJSON(
//         base_url + '?callback=?',
//         { cmd: 'getTrims', make: make, model: modelName },
//         function (data) {
//           if (data.Trims.length === 0) {
//             $('#model-details-content').html(
//               '<p>Please check that you spelled the make and model correctly.</p>'
//             );
//             $('#model-details').show();
//           } else {
//             let modelDetails = '<table>';

//             data.Trims.forEach((model) => {
//               modelDetails += `<tr><td class="year" colspan="2">${model.model_year}</td></tr>`;

//               for (const key in model) {
//                 if (model.hasOwnProperty(key) && model[key]) {
//                   modelDetails += `<tr><td class="key">${key.replace(
//                     /_/g,
//                     ' '
//                   )}</td><td class="value">${model[key]}</td></tr>`;
//                 }
//               }
//             });

//             modelDetails += '</table>';
//             $('#model-details-content').html(modelDetails);
//             $('#model-details').show();
//           }
//         }
//       );
//     }
//   }

//   $('#search-button').on('click', function () {
//     const make = $('#car-make').val();
//     const modelName = $('#car-model').val();
//     displayModelDetails(make, modelName);
//   });
// });

// // --------------cea buna mai sus
