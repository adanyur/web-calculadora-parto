$(document).ready(() => {
  const listDay = () => {
    for (let i = 1; i <= 31; i++) {
      template = `<option value=${i}>${i}</option`;
      $("#day").append(template);
    }
  };

  const listMonth = () => {
    $.getJSON("json/meses.json", (data) => {
      for (let meses in data) {
        template = `<option value=${data[meses].value}>${data[meses].descripcion}</option>`;
        $("#month").append(template);
      }
    });
  };

  listDay();
  listMonth();

  const DateBirth = (date) => date.setDate(date.getDate() + 280); //FECHA ESTIMADO DEL PARTO
  const Days = (time) => Math.floor(time / (1000 * 60 * 60 * 24)); //DIAS TRANSCURRIDO
  const Weeks = (time) => Math.floor(time / (1000 * 60 * 60 * 24) / 7); //NUMERO DE SEMANAS

  const weatherGestation = (date) => {
    //CALCULA LA SEMANAS Y DIAS
    const time = new Date() - date;
    let day = Days(time);
    let week = Weeks(time);

    a = `Tienes ${week !== 0 ? week : 0} semanas y ${
      day >= 7 ? day % 7 : day
    } dias de embarazo`;
    b = `Su bebé se encuentra en sus brazos Felicidades!`;

    return `
        <div class="card-text-ma">
          ${week >= 40 ? b : a}
        </div>
    `;
  };

  const calculateDate = (date) => {
    let time = weatherGestation(date);
    let dateBirth = new Date(DateBirth(date));

    let options = { year: "numeric", month: "long", day: "numeric" };
    let template = `
        <img src="img/img2.png" class="img"> 
          <div class="card-title">
            Tu bebé nacerá aproximadamente el…
          </div>
          
          <div class="card-text-ma">
            ${dateBirth.toLocaleDateString("default", options)}
          </div>
          ${time}
          
          `;

    $("#message").html(template);
  };

  $(".button").on("click", (e) => {
    const day = $("#day").val();
    const month = $("#month").val();
    const year = $("#year").val();

    let date = new Date(year + "/" + month + "/" + day.padStart(2, "0"));
    calculateDate(date);
    e.preventDefault();
  });
});
