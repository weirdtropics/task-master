function initialiseLocalStorage() {
  window.localStorage.setItem("id", "1");
  window.localStorage.setItem("toDoListData", new Array());
}

function getItems() {
  const result = window.localStorage.getItem("toDoListData");
  if (result === null || result.length === 0) { return result; }
  else { return JSON.parse(result); }
}

function getNewId() {
  const id = parseInt(window.localStorage.getItem("id"));
  window.localStorage.setItem("id", ("" + (id + 1)));
  return id;
}

function setItems(data) {
  window.localStorage.setItem("toDoListData", JSON.stringify(data));
}

function addItem(item) {
  // window.localStorage.clear();
  if (window.localStorage.getItem("id") === null) { initialiseLocalStorage(); }
  item.id = getNewId();
  let list = getItems();

  if (list.length === 0) { list = [item]; }
  else { list.push(item); }
  setItems(list);
  return list;
}

function findArrayId(id, list) {
  let i = 0;
  for (i; i < list.length; i++) { if (list[i].id === id) { break; } }
  return i;
}

function deleteItem(id) {
  let list = getItems();
  const i = findArrayId(id, list);
  list.splice(i, 1); // remove list[i] from list
  setItems(list);
  return list;
}

function markItemAsTodoDone(id) {
  let list = getItems();
  const i = findArrayId(id, list);
  list[i].isDone = !list[i].isDone;
  setItems(list);
  return list;
}

function editItem(item) {
  let list = getItems();
  const i = findArrayId(item.id, list);

  if (item.title) { list[i].title = item.title; }
  if (item.description) { list[i].description = item.description; }
  if (item.deadline) { list[i].deadline = item.deadline; }
  if (item.priority) { list[i].priority = item.priority; }

  setItems(list);
  return list;
}

function sortByIsDone(data) {
  return data.sort ((a, b) => { return (a.isDone === b.isDone) ? 0 : a.isDone ? -1 : 1; });
}

function sortByPriority(data) {
  return data.sort ((a, b) => {
    if (a.priority === "high") { return -1; }
    else if (a.priority === "middle") {
      if (b.priority === "high") { return 1; }
      else if (b.priority === "middle") { return 0; }
      else if (b.priority === "low") { return -1; }
    }
    else if (a.priority === "low") { return 1; }
  });
}

function sortItems(list) {
  if (list.length != 0) {
    let donePrioritisedList = sortByPriority(list.filter(item => item.isDone === true));
    let todoPrioritisedList = sortByPriority(list.filter(item => item.isDone === false));
    return todoPrioritisedList.concat(donePrioritisedList);
  }
  return null;
}

function searchItems(data, list) {
  if (list.length != 0) {
    return list.filter(item => (
      (item.title.toLowerCase().indexOf(data.toLowerCase()) > -1) ||
      (item.description.toLowerCase().indexOf(data.toLowerCase()) > -1) ||
      (item.priority.toLowerCase().indexOf(data.toLowerCase()) > -1) ||
      (item.deadline.toLowerCase().indexOf(data.toLowerCase()) > -1)
    ));
  }
  return null;
}

function deadlineValidation(deadline) {
  if (deadline) {
    let date = deadline.split('-');
    let today = new Date();
    if (date[0] < today.getFullYear()) { date[0] = today.getFullYear(); }
    return ("" + date[0] + "-" + date[1] + "-" + date[2]);
  } else { return deadline; }
}

export { getItems, addItem, editItem, deleteItem, markItemAsTodoDone,
         sortItems, searchItems, deadlineValidation };
