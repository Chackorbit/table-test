const table = document.querySelector(".table");
const th = document.querySelectorAll("th");
const tr = document.querySelectorAll("tr");
const tabStrin = document.querySelectorAll(".table__string");

document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("sortable");
  const headers = table.querySelectorAll("th");
  const tableBody = table.querySelector("tbody");
  const rows = tableBody.querySelectorAll("tr");

  // Направление сортировки
  const directions = Array.from(headers).map(function (header) {
    return "";
  });

  // Преобразовать содержимое данной ячейки в заданном столбце
  const transform = function (index, content) {
    // Получить тип данных столбца
    const type = headers[index].getAttribute("data-type");
    switch (type) {
      case "number":
        return parseFloat(content);
      case "string":
      default:
        return content;
    }
  };

  const sortColumn = function (index) {
    // Получить текущее направление
    const direction = directions[index] || "asc";

    // Фактор по направлению
    const multiplier = direction === "asc" ? 1 : -1;

    const newRows = Array.from(rows);

    newRows.sort(function (rowA, rowB) {
      const cellA = rowA.querySelectorAll("td")[index].innerHTML;
      const cellB = rowB.querySelectorAll("td")[index].innerHTML;

      const a = transform(index, cellA);
      const b = transform(index, cellB);

      switch (true) {
        case a > b:
          return 1 * multiplier;
        case a < b:
          return -1 * multiplier;
        case a === b:
          return 0;
      }
    });

    // Удалить старые строки
    [].forEach.call(rows, function (row) {
      tableBody.removeChild(row);
    });

    // Поменять направление
    directions[index] = direction === "asc" ? "desc" : "asc";

    // Добавить новую строку
    newRows.forEach(function (newRow) {
      tableBody.appendChild(newRow);
    });
  };

  [].forEach.call(headers, function (header, index) {
    header.addEventListener("click", function () {
      sortColumn(index);
    });
  });
});
function valuePlus() {
  const array = tabStrin;

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const changeUan = element.children[5];
    const changePercent = element.children[6];

    const value = element.children[5].innerText;

    if (value > 0) {
      changeUan.classList.add("table__value-more");
      changePercent.classList.add("table__value-more");
    } else if (value < 0) {
      changeUan.classList.add("table__value-less");
      changePercent.classList.add("table__value-less");
    }
    element.children[1].classList.add("tab-centre");
    element.children[2].classList.add("tab-end");
  }
}
valuePlus();
