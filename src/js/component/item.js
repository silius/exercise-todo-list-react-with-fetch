import React, { useState } from "react";

export function Item() {
	const [tasks, setTasks] = useState({ lista: [], texto: "What??" });
	let myTodo = { lista: tasks.lista, texto: tasks.texto };

	const formInput = e => {
		e.preventDefault();
		myTodo.lista.push(myTodo.texto);
		setTasks(myTodo);
	};

	const createItem = e => {
		myTodo.texto = e.target.value;
		setTasks(myTodo);
	};

	const removeTask = item => {
		myTodo.lista = myTodo.lista.filter(task => task != item);
		setTasks(myTodo);
	};

	var tasksToRender = myTodo.lista.map(task => {
		return (
			<li key={Math.random() * 60}>
				<div className="item">
					<label>{task}</label>
					<button
						className="destroy"
						onClick={() => removeTask(task)}></button>
				</div>
			</li>
		);
	});

	return (
		<>
			<div className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<form onSubmit={formInput}>
						<input
							type="text"
							value={tasks.texto}
							onChange={createItem}
							className="new-todo"
						/>
					</form>
				</header>
			</div>
			<div className="main">
				<ul className="todo-list">{tasksToRender}</ul>
			</div>
			<div className="footer">
				<span className="todo-count">
					<strong>{tasks.lista.length}</strong> item left
				</span>
			</div>
		</>
	);
}
