const iconsFolder = "resources/icons/";
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

function getParameters() {
	const params = new URLSearchParams(window.location.search);
	let tableObj = undefined;

	for (const [name, value] of params) {
		if (name == "data") {
			const b64String = base64UrlTobase64(value);
			const jsonString = atob(b64String);
			tableObj = JSON.parse(jsonString);
			break;
		}
	}

	return tableObj;
}


function createCardsFromParameters(templateID, destinationID) {
	let tabelObj = getParameters();

	let items = tabelObj.tContent;
	let titles = tabelObj.tHeader;

	let dest = document.getElementById(destinationID);


	for (let i = 1; i < items.length; i++) {
		let card = createCard(titles, items[i], templateID);
		dest.appendChild(card);
	}

}

function createCard(titles, data, tempateID) {
	let template = document.getElementById(tempateID).innerHTML;

	let img = getImagePath(data[0]);

	let card_style = ""

	if (data[2] > 6) {
		card_style = "border-danger";
	} else if (data[2] > 4) {
		card_style = "border-warning";
	}

	replacements = {
		"%allergy_name%": data[1],
		"%allergy_severity%": data[2],
		"%allergy_symptoms%": data[3],
		"%allergy_icon%": img,
		"%title_severity%": titles[1],
		"%title_symptoms%": titles[2],
		"%card_style%": card_style
	}

	// Do replacements here
	for (let [key, value] of Object.entries(replacements)) {
		template = template.replaceAll(key, value);
	}

	const card = document.createElement("div");
	card.innerHTML = template

	return card
}



function createTableFromParamters() {

	let tableObj = getParameters();

	const table = document.createElement("table");
	table.classList = "table";

	const thead = createTableHead(tableObj.tHeader, 1);
	table.appendChild(thead);

	const tbody = createTableBody(tableObj.tContent);
	table.appendChild(tbody);

	const bodys = document.getElementById('table_dest');


	bodys.appendChild(table);
}

function createTableHead(headers, xOffset) {
	const thead = document.createElement("thead");
	const tr = document.createElement("tr");
	thead.appendChild(tr);

	if (xOffset !== undefined) {
		for (let i = 0; i < xOffset; i++) {
			const th = document.createElement("th");
			th.appendChild(document.createTextNode(""));
			tr.appendChild(th);
		}
	}

	for (const header of headers) {
		const th = document.createElement("th");
		const text = document.createTextNode(header);

		th.appendChild(text);
		tr.appendChild(th);
	}

	return thead;
}

function createTableBody(contents) {
	const tbody = document.createElement("tbody");
	for (const row of contents) {
		const tr = createTableRowWithImage(row);
		tbody.appendChild(tr);
	}

	return tbody;
}

function createTableRowWithImage(items) {
	const tr = document.createElement("tr");

	if (items.length > 0) {
		const img = document.createElement("img");
		img.src = getImagePath(items[0]);

		tr.appendChild(img);

		for (let i = 1; i < items.length; i++) {
			const td = document.createElement("td");

			let output = "";

			if (items[i] != "null") {
				output = items[i];
			}

			td.appendChild(document.createTextNode(output));
			tr.appendChild(td);
		}
	}

	return tr;
}

function getImagePath(allergyId) {
	if (allergyId >= 0 && allergyId < allergyIconPaths.length) {
		return allergyIconPaths[allergyId];
	}

	return "";
}

function base64UrlTobase64(bString) { // See https://stackoverflow.com/questions/5234581/base64url-decoding-via-javascript
	bString = bString
		.replace(/-/g, '+')
		.replace(/_/g, '/');

	const pad = bString.length % 4;
	if (pad) {
		if (pad === 1) {
			throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
		}

		bString += new Array(5 - pad).join('=');
	}

	return bString;
}