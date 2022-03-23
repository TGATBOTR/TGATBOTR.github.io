const iconsFolder = "/resources/icons/";
const allergyIconPaths = 
[
	"celery",
	"cereals",
	"crustaceans",
	"eggs",
	"fish",
	"lupin",
	"milk",
	"molluscs",
	"mustard",
	"tree_nuts",
	"peanuts",
	"sesame",
	"soya",
	"sulphites",
].map(path => iconsFolder + path + ".png");

function createTableFromParamters()
{
	const params = new URLSearchParams(window.location.search);
	let tableObj = undefined;

	for (const [name, value] of params)
	{
		if (name == "data")
		{
			const b64String = base64UrlTobase64(value);
			const jsonString = atob(b64String);
			tableObj = JSON.parse(jsonString);
			break;
		}
	}

	const table = document.createElement("table");
	table.classList = "table";

	const thead = createTableHead(tableObj.tHeader, 1);
	table.appendChild(thead);

	const tbody = createTableBody(tableObj.tContent);
	table.appendChild(tbody);

	const bodys = document.getElementsByTagName("body");
	if (bodys.length > 0)
	{
		bodys[0].appendChild(table);
	}
}

function createTableHead(headers, xOffset)
{
	const thead = document.createElement("thead");
	const tr = document.createElement("tr");
	thead.appendChild(tr);

	if (xOffset !== undefined)
	{
		for (let i = 0; i < xOffset; i++)
		{
			const th = document.createElement("th");
			th.appendChild(document.createTextNode(""));
			tr.appendChild(th);
		}
	}

	for (const header of headers)
	{
		const th = document.createElement("th");
		const text = document.createTextNode(header);

		th.appendChild(text);
		tr.appendChild(th);
	}

	return thead;
}

function createTableBody(contents)
{
	const tbody = document.createElement("tbody");
	for (const row of contents)
	{
		const tr = createTableRowWithImage(row);
		tbody.appendChild(tr);
	}

	return tbody;
}

function createTableRowWithImage(items)
{
	const tr = document.createElement("tr");

	if (items.length > 0)
	{
		const img = document.createElement("img");
		img.src = getImagePath(items[0]);
		
		tr.appendChild(img);
	
		for (let i = 1; i < items.length; i++)
		{
			const td = document.createElement("td");
			td.appendChild(document.createTextNode(items[i]));
			tr.appendChild(td);
		}
	}

	return tr;
}

function getImagePath(allergyId)
{
	if (allergyId >= 0 && allergyId < allergyIconPaths.length)
	{
		return allergyIconPaths[allergyId];
	}

	return "";
}

function base64UrlTobase64(bString)
{ // See https://stackoverflow.com/questions/5234581/base64url-decoding-via-javascript
	bString = bString
		.replace(/-/g, '+')
		.replace(/_/g, '/');

	const pad = bString.length % 4;
	if (pad)
	{
		if (pad === 1)
		{
			throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
		}

		bString += new Array(5 - pad).join('=');
	}

	return bString;
}