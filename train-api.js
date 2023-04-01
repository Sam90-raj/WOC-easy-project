const searchtrain = () => {
  document.getElementById("tableheading").innerHTML = "TRAINS AVAILABLE";
  document.getElementById("tablecontainer").style.display = "block";
  document.getElementById("tablecontainer").style.marginTop = "70px";
  document.getElementById("searchbox").style.display = "none";

  const fromstation = document.getElementById("startingpoint").value;
  const tostation = document.getElementById("finalpoint").value;
  const traveldate = document.getElementById("date").value;

  const URL = "https://railway-w6eh.onrender.com/proxy";
  const FullUrl = `${URL}?from=${fromstation}&to=${tostation}&date=${traveldate}`;
  fetch(FullUrl)
    .then((response) => {
      return response.json();
    })
    .then((traindata) => {
      console.log(traindata);
      let tabledata = "";
      traindata.data.map((values) => {
        tabledata += `<tr>
           <td>${values.train_base.train_no}</td>
     <td>${values.train_base.train_name}</td>
     <td>${values.train_base.from_stn_code}</td>
     <td>${values.train_base.from_time}</td>
     <td>${values.train_base.source_stn_code}</td>
     <td>${values.train_base.to_time}</td>
     <td>${values.train_base.travel_time}</td>
   </tr>`;
      });
      document.getElementById("tablebody").innerHTML = tabledata;
    });
};
