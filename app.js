$(document).ready((e) => {
  $(".button").on("click", (e) => {
    const dia = $("#dia").val();
    const mes = $("#mes").val();
    const anio = $("#anio").val();

    let fecha = new Date(anio + "/" + mes + "/" + dia);
    fecha = new Date(day(fecha));
    fecha = new Date(month(fecha));
    fecha = new Date(year(fecha));

    mensaje(fecha);

    e.preventDefault();
  });
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
          FECHA ESTIMADO DEL PARTO
        </div>
        <div class="card-title">
          ${fecha.toLocaleDateString("default", options)}
        </div>
        </div>`;

  $("#mensaje").html(template);
};
