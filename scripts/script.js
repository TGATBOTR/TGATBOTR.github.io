function getUrlParamsDict() 
{
	const params = new URLSearchParams(window.location.search);

	const dict = {};
	for (const [name, value] of params)
	{
		const key = name.replace(/[0-9]/g, "");
		if (dict[key] === undefined)
		{
			dict[key] = new Array(value);
		}
		else
		{
			dict[key].push(value);
		}
	}

	return dict;
}

function urlDictToObjectArray(urlDict)
{
	const objects = [];

	const keys = Object.keys(urlDict);
	for (let i = 0; i < keys.length; i++)
	{
		const object = {};
		for (const key of keys) 
		{
			if (i < urlDict[key].length)
			{
				object[key] = urlDict[key][i];	
			}
		}

		objects.push(object);
	}
	
	return objects;
}

function createTableFromParamters()
{
	const urlDict = getUrlParamsDict();
	const urlObjs = urlDictToObjectArray(urlDict);

	const table = document.createElement("table");
	const tableBody = document.createElement("tbody");

	for (const obj of urlObjs)
	{
		const row = document.createElement("tr");
		for (const key in obj) 
		{
			const cell = document.createElement("td");
	 		const cellText = document.createTextNode(obj[key]);

			cell.appendChild(cellText);
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}

	table.setAttribute("border", "2");
	table.appendChild(tableBody);

	const bodys = document.getElementsByTagName("body");
	if (bodys.length > 0)
	{
		bodys[0].appendChild(table);
	}
}

function listAllTags()
{
	let tags = document.getElementsByTagName("*");
	for (const tag of tags)
	{
		console.log(tag);
	}
}