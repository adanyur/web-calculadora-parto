$(document).ready((e) => {
  const listaDias = () => {
    for (let i = 1; i <= 31; i++) {
      template = `<option value=${i}>${i}</option`;
      $("#dia").append(template);
    }
  };
  listaDias();

  const listaMeses = () => {
    $.getJSON("json/meses.json", (data) => {
      for (let meses in data) {
        template = `<option value=${data[meses].value}>${data[meses].descripcion}</option>`;
        $("#mes").append(template);
      }
    });
  };

  listaMeses();

  $(".button").on("click", (e) => {
    const dia = $("#dia").val();
    const mes = $("#mes").val();
    const anio = $("#anio").val();

    let fecha = new Date(anio + "/" + mes + "/" + dia.padStart(2, "0"));

    fecha = new Date(day(fecha));
    fecha = new Date(month(fecha));
    fecha = new Date(year(fecha));

    mensaje(fecha);

    e.preventDefault();
  });

  const day = (fecha) => {
    return fecha.setDate(fecha.getDate() + 7);
  };
  const month = (fecha) => {
    return fecha.setMonth(fecha.getMonth() - 3);
  };
  const year = (fecha) => {
    return fecha.setYear(fecha.getFullYear() + 1);
  };

  const mensaje = (fecha) => {
    let options = { year: "numeric", month: "long", day: "numeric" };

    let template = `<div class="card">
          <div class="card-title">
            Tu bebé nacerá aproximadamente el…
          </div>
          <div class="card-text-ma">
            ${fecha.toLocaleDateString("default", options)}
          </div>
          </div>`;

    $("#mensaje").html(template);
  };
});
