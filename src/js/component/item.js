import React, { useState, useEffect } from "react";

export function Item() {
	const [tasks, setTasks] = useState([]);
	const [myTodo, setMyTodo] = useState("Tarea Ejemplo");

	const baseURI = "https://assets.breatheco.de/apis/fake/todos/user/aa";

	const createUser = () =>
		fetch(baseURI, {
			method: "POST",
			body: JSON.stringify([]),
			headers: { "Content-Type": "application/json" }
		})
			.then(resp => {
				console.log("POST request: ", resp.ok);
				return resp.json();
			})
			.then(response => console.log(response))
			.then(() => fetchedTodo())
			.catch(error => console.error("Error: ", error));

	const fetchedTodo = () =>
		fetch(baseURI, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				// console.log(resp.ok); // will be true if the response is successfull
				// console.log(resp.status); // the status code = 200 or code = 400 etc.
				// console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
				setTasks(data);
			})
			.catch(error => {
				//error handling
				console.log(error);
			});

	const updateList = () =>
		fetch(baseURI, {
			method: "PUT",
			body: JSON.stringify(tasks),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(response => {
				setMyTodo("");
				console.log(response);
			})
			.catch(error => console.error("Error: ", error));

	const deleteList = () => {
		fetch(baseURI, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(response => console.log("My response: ", response))
			.then(() => setTasks([]))
			.then(() => createUser())
			.catch(error => console.error("Error: ", error));
	};

	const formInput = e => {
		if (event.keyCode == 13 && myTodo !== "") {
			let buffer = { label: myTodo, done: false };
			tasks.splice(tasks.length, 0, buffer);
			setTasks([...tasks]);
			updateList();
		}
	};

	const createItem = e => {
		setMyTodo(e.target.value);
	};

	const removeTask = item => {
		tasks.splice(item, 1);
		setTasks([...tasks]);
		tasks.length > 0 ? updateList() : deleteList();
		//lista = lista.filter(task => task != item);
		//tasks.length > 0 ? updateList() : deleteList();
		//setTasks(lista);
	};

	var tasksToRender = tasks.map((task, index) => {
		return (
			<li key={index}>
				<div className="item">
					<label>{task.label}</label>
					<button
						className="destroy"
						onClick={() => removeTask(index)}></button>
				</div>
			</li>
		);
	});

	useEffect(() => {
		tasks.length > 0 ? fetchedTodo() : createUser();
	}, []);

	return (
		<>
			<div className="todoapp">
				<header className="header">
					<h1>todos</h1>
					{/* <form onSubmit={formInput}> */}
					<input
						type="text"
						value={myTodo}
						onChange={e => setMyTodo(e.target.value)}
						onKeyUp={formInput}
						className="new-todo"
					/>
					{/* </form> */}
				</header>
			</div>
			<div className="main">
				<ul className="todo-list">{tasksToRender}</ul>
			</div>
			<div className="footer">
				<span className="todo-count">
					<strong>{tasks.length}</strong> item left
				</span>
				<button
					type="button"
					className="btn btn-secondary btn-sm m-1"
					onClick={deleteList}>
					Delete All
				</button>
			</div>
		</>
	);
}
