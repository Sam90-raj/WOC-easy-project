const searchplaces = () => {
  document.getElementById("hidedata").style.visibility = "visible";
  document.getElementById("set").style.display = "none";
  const apiKey = "5ae2e3f221c38a28845f05b65fa4509e28104bdb26f5d29d0ec9ce35";

  function apiGet(method, query) {
    return new Promise(function (resolve) {
      var url =
        "https://api.opentripmap.com/0.1/en/places/" +
        method +
        "?apikey=" +
        apiKey;
      if (query !== undefined) {
        url += "&" + query;
      }
      fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch(function (err) {
          console.log(err);
        });
    });
  }

  const pageLength = 5;
  let lon;
  let lat;
  let count;
  let offset = 0;

  let name = document.getElementById("city").value;
  apiGet("geoname", "name=" + name).then(function (data) {
    let message = "Name not found";
    if (data.status == "OK") {
      message = data.name;
      lon = data.lon;
      lat = data.lat;
      firstLoad();
    }
    document.getElementById("info").innerHTML = `${message}`;
  });

  function firstLoad() {
    apiGet(
      "radius",
      `radius=10000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
    ).then(function (data) {
      count = data.count;
      offset = 0;
      document.getElementById(
        "info"
      ).innerHTML += `<p>${count} objects with description in a 10km radius</p>`;
      loadList();
    });
  }

  function loadList() {
    apiGet(
      "radius",
      `radius=10000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
    ).then(function (data) {
      let list = document.getElementById("list");
      list.innerHTML = "";
      data.forEach((item) => list.appendChild(createListItem(item)));
      let nextBtn = document.getElementById("next_button");
      if (count < offset + pageLength) {
        nextBtn.style.visibility = "hidden";
      } else {
        nextBtn.style.visibility = "visible";
        nextBtn.innerText = `Next (${offset + pageLength} of ${count})`;
      }
    });
  }
  function createListItem(item) {
    let a = document.createElement("a");

    a.className = "listitem";
    a.setAttribute("dataid", item.xid);
    a.innerHTML = `<h3 class="itemname">${item.name}</h3>
              <p class="itemdescribe">${item.kinds}</p>`;

    a.addEventListener("click", function () {
      let xid = a.getAttribute("dataid");
      apiGet("xid/" + xid).then((data) => showpoi(data));
    });
    return a;
  }
  function showpoi(data) {
    let poi = document.getElementById("points");

    poi.innerHTML = `<img src="${data.preview.source}">`;

    poi.innerHTML += data.wikipedia_extracts
      ? data.wikipedia_extracts.html
      : data.info
      ? data.info.descr
      : "No description";
  }
  document.getElementById("next_button").addEventListener("click", function () {
    offset += pageLength;
    loadList();
  });
};
