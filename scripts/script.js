function getAllUrlParams() 
{
	const params = new URLSearchParams(window.location.search);
	for (const [key, value] of params)
	{
		console.log(key, " = ", value);
	}
}

function createTableFromParamters()
{
	let tableBody = document.createElement("tbody");
	for (let rowI = 0; rowI < 2; rowI++)
	{
		let row = document.createElement("tr");
		for (let colI = 0; colI < 2; colI++)
		{
			let cell = document.createElement("td");
			let cellText = document.createTextNode("col" + colI);

			cell.appendChild(cellText);
			row.appendChild(cell);
		}

		tableBody.appendChild(row);
	}

	let table = document.createElement("table");
	table.setAttribute("border", "2");
	table.appendChild(tableBody);

	console.log(document.getElementsByTagName("body").length);
	let body = document.getElementsByTagName("body")[0];
	console.log(body);
	body.appendChild(table);
}

function listAllTags()
{
	let tags = document.getElementsByTagName("*");
	for (const tag of tags)
	{
		console.log(tag);
	}
}