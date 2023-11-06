document.addEventListener("DOMContentLoaded", function () {
  const base_url = "https://www.carqueryapi.com/api/0.3/";

  function showLoading() {
    document.getElementById("loading-icon").style.display = "block";
    document.getElementById("search-button").style.display = "none";
  }

  function hideLoading() {
    document.getElementById("loading-icon").style.display = "none";
    document.getElementById("search-button").style.display = "block";
  }

  function displayError(message) {
    document.getElementById(
      "model-details-content"
    ).innerHTML = `<p class="error">${message}</p>`;
    document.getElementById("model-details").style.display = "block";
  }

  function displayModelDetails(make, modelName, year) {
    if (!make || !modelName) {
      displayError("input field is empty.");
      return;
    }

    showLoading();

    let url = new URL(base_url);
    let params = {
      cmd: "getTrims",
      make: make,
      model: modelName,
      format: "jsonp", // JSONP format
      callback: "handleData",
    };
    if (year) {
      params.year = year;
    }
    url.search = new URLSearchParams(params).toString();

    // global callback function
    window.handleData = function (data) {
      if (data.Trims.length === 0) {
        displayError(
          "Please check that you spelled the make and model correctly."
        );
      } else {
        data.Trims.sort(function (a, b) {
          return b.model_year - a.model_year;
        });

        let modelDetails = '<table class="tablee">';

        data.Trims.forEach(function (model) {
          modelDetails += `<tr><td class="year" colspan="2">${model.model_year}</td></tr>`;

          for (const key in model) {
            if (model.hasOwnProperty(key) && model[key]) {
              modelDetails += `<tr><td class="key">${key.replace(
                /_/g,
                " "
              )}</td><td class="value">${model[key]}</td></tr>`;
            }
          }
        });

        modelDetails += "</table>";
        document.getElementById("model-details-content").innerHTML =
          modelDetails;
        document.getElementById("model-details").style.display = "block";
      }

      hideLoading();

      // Remove the callback function from the global scope
      delete window.handleData;
    };

    // Make the JSONP request
    const script = document.createElement("script");
    script.src = url.toString();
    document.body.appendChild(script);
  }

  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      const make = document.getElementById("car-make").value;
      const modelName = document.getElementById("car-model").value;
      const year = document.getElementById("car-year").value;
      displayModelDetails(make, modelName, year);
    });
});
