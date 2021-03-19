import React, { useState, useEffect } from "react";
import { Item } from "./item";

//create your first component

export function Home() {
	// const [color, setColor] = useState("red");

	// let redExtraClass = "";
	// if (color == "red") redExtraClass = "choice";
	// let yellowExtraClass = "";
	// if (color == "yellow") yellowExtraClass = "choice";
	// let greenExtraClass = "";
	// if (color == "green") greenExtraClass = "choice";
	return (
		<div>
			<Item />
		</div>
	);
}
