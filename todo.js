const listEl = document.querySelector("#list");

const createBtnEl = document.querySelector(".create");

let todos = [];

createBtnEl.addEventListener("click", createNewTodo);

function createNewTodo() {
	const item = {
		id: new Date().getTime(),
		text: "",
		complete: false
	}

	todos.unshift(item);

	const { itemEl, inputEl } = createTodoElement(item);

	listEl.prepend(itemEl);

	inputEl.removeAttribute("disabled");

	inputEl.focus();

	save();
}

function createTodoElement(item) {
	const itemEl = document.createElement("div");

	itemEl.classList.add("item");

	const checkbox = document.createElement("input");

	checkbox.type = "checkbox";

	checkbox.checked = item.complete;

	if (item.complete) {
		itemEl.classList.add("complete");
	}

	const inputEl = document.createElement("input");

	inputEl.type = "text";

	inputEl.value = item.text;

	inputEl.setAttribute("disabled", "");

	const actionEl = document.createElement("div");

	actionEl.classList.add("actions");

	const editBtnEl = document.createElement("button");

	editBtnEl.classList.add("material-icons");

	editBtnEl.innerText = "edit";
	
	const removeBtnEl = document.createElement("button");

	removeBtnEl.classList.add("material-icons", "remove-btn");

	removeBtnEl.innerText = "remove_circle";

	actionEl.append(editBtnEl);

	actionEl.append(removeBtnEl);

	itemEl.append(checkbox);

	itemEl.append(inputEl);
	
	itemEl.append(actionEl);

	//EVENTS
	checkbox.addEventListener("change", () => {
		item.complete = checkbox.checked;

		if (item.complete) {
			itemEl.classList.add("complete");
		} else {
			itemEl.classList.remove("complete");
		}

		save();
	});

	inputEl.addEventListener("input", () => {
		item.text = inputEl.value;
	});

	inputEl.addEventListener("blur", () => {
		inputEl.setAttribute("disabled", "");
		save();
	});

	editBtnEl.addEventListener("click", () => {
		inputEl.removeAttribute("disabled");
		inputEl.focus();
	});

	removeBtnEl.addEventListener("click", () => {
		todos = todos.filter(t => t.id != item.id);

		itemEl.remove();

		save();
	});

	return { itemEl, inputEl, editBtnEl, removeBtnEl };
}

function displayTodos() {
	load();

	for (let i = 0; i < todos.length; i++) {
		const item = todos[i];

		const { itemEl } = createTodoElement(item);

		listEl.append(itemEl);
	}
}

displayTodos();

function save() {
	const saveEl = JSON.stringify(todos);

	localStorage.setItem("todo_list", saveEl);
}

function load() {
	const data = localStorage.getItem("todo_list");

	if (data) {
		todos = JSON.parse(data);
	}
}