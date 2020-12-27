const parameters = {
  height: 0,
  width: 0,
  deep: 0,
}

initForm();

function initForm() {
  setFormValues();
}

function setFormValues() {
  initFormElement("height");
  initFormElement("width");
  initFormElement("deep");

}

function initFormElement(id) {
  const el = document.querySelector("#" + id);
  el.value = parameters[id];
  el.addEventListener("change", updateParameters);
}

function updateParameters() {
  const el = event.currentTarget;
  parameters[el.id] = +el.value < 0 ? 0 : +el.value;
  setFormValues();
  //  console.log(parameters);
  makeRequest();
}

function makeRequest() {
  fetch("./server/triangle.php?par=" + JSON.stringify(parameters))
    .then(function (res) {
      return res.text();
    })
    .then(function (res) {
      console.log(res);
      const source = JSON.parse(res);
      if (Object.keys(cube).length === 0) {
        createFigure(source);
      }else{
        updateFigure(source);
      }
    })
    .catch(function (err) {
      console.log('Error ' + err)
    })
}
