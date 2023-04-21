import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [result, setResult] = useState(0);
	const [prevInput, setPrevInput] = useState("");
	const [currentInput, setCurrentInput] = useState("");
	const [operation, setOperation] = useState("");
	const handleOp = (e) => {
		if (currentInput === "") {
			alert("Enter a value first!");
			return;
		}
		if (isNaN(parseFloat(currentInput))) {
			alert("Enter a valid numeric value");
			return;
		}
		const op = e.target.textContent;
		switch (op) {
			case "Add":
				setOperation("+");
				break;
			case "Subtract":
				setOperation("-");
				break;
			case "Divide":
				setOperation("/");
				break;
			case "Multiply":
				setOperation("*");
				break;
			default:
				alert("Choose a valid Operation!");
				return;
		}

		const btnList = document.querySelectorAll(".btn-op");
		btnList.forEach((element) => {
			if (element.classList.contains("active")) {
				element.classList.remove("active");
			}
		});
		e.target.classList.add("active");

		if (result !== 0) {
			setPrevInput(result);
			setCurrentInput("");
			setResult(0);
		} else {
			setPrevInput(currentInput);
			setCurrentInput("");
		}
	};
	useEffect(() => {
		if (operation !== "" && currentInput !== "") {
			if (isNaN(parseFloat(currentInput)) || isNaN(parseFloat(prevInput))) {
				alert("Enter a valid numeric value!");
				return;
			}
			if (operation === "+") {
				setResult(parseFloat(prevInput) + parseFloat(currentInput));
			} else if (operation === "-") {
				setResult(parseFloat(prevInput) - parseFloat(currentInput));
			} else if (operation === "/") {
				setResult(parseFloat(prevInput) / parseFloat(currentInput));
			} else if (operation === "*") {
				setResult(parseFloat(prevInput) * parseFloat(currentInput));
			}
		}
	}, [operation, currentInput, prevInput, result]);
	const handleResetInput = (e) => {
		setCurrentInput("");
	};
	const handleResetResult = (e) => {
		setResult(0);
		setOperation("");
		setCurrentInput("");
		setPrevInput("");
		const btnList = document.querySelectorAll(".btn-op");
		btnList.forEach((element) => {
			if (element.classList.contains("active")) {
				element.classList.remove("active");
			}
		});
	};
	const handleChange = (e) => {
		const { value } = e.target;
		const regex = /^[-+]?\d*\.?\d*$/;
		if (regex.test(value)) {
			setCurrentInput(value);
		}
	};

	return (
		<div className="App">
			<h1>Simplest Working Calculator</h1>
			{currentInput || prevInput !== "" ? (
				<p>{`${prevInput} ${operation} ${currentInput}`} </p>
			) : (
				<p></p>
			)}
			<h3>Result: {result !== 0 ? <p>{result}</p> : <p>0</p>}</h3>
			<div className="input-form">
				<input type="text" value={currentInput} onChange={handleChange} />
				<div className="btn-group">
					<button className="btn-op" onClick={handleOp}>
						Add
					</button>
					<button className="btn-op" onClick={handleOp}>
						Subtract
					</button>
					<button className="btn-op" onClick={handleOp}>
						Divide
					</button>
					<button className="btn-op" onClick={handleOp}>
						Multiply
					</button>
					<button onClick={handleResetInput}>Reset Input</button>
					<button onClick={handleResetResult}>Reset Result</button>
				</div>
			</div>
		</div>
	);
}

export default App;
