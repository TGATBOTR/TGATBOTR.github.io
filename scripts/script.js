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

	const table = document.createElement("table");
	table.classList = "table table-sm";

	const thead = createTableHeadFromUrlParams(urlDict);
	table.appendChild(thead);

	const tbody = createTableBodyFromUrlParams(urlDict);
	table.appendChild(tbody);

	const bodys = document.getElementsByTagName("body");
	if (bodys.length > 0)
	{
		bodys[0].appendChild(table);
	}
}

function createTableHeadFromUrlParams(urlDict)
{
	const thead = document.createElement("thead");
	const tr = document.createElement("tr");
	thead.appendChild(tr);

	for (const urlParam in urlDict)
	{
		const th = document.createElement("th");
		th.scope = "col";

		const text = document.createTextNode(urlParam);
		th.appendChild(text);

		tr.appendChild(th);
	}

	return thead;
}

function createTableBodyFromUrlParams(urlDict)
{
	const tbody = document.createElement("tbody");

	const keys = Object.keys(urlDict);
	for (let row = 0; row < keys.length; row++)
	{
		const tr = document.createElement("tr");
		tbody.appendChild(tr);

		for (let col = 0; col < keys.length; col++)
		{
			let td = undefined;
			if (col == 0)
			{
				td = document.createElement("th");
				td.scope = "row";	
			}
			else
			{
				td = document.createElement("td");
			}

			const text = document.createTextNode(urlDict[keys[col]][row]);
			td.appendChild(text);

			tr.appendChild(td);
		}	
	}

	return tbody;
}

function listAllTags()
{
	let tags = document.getElementsByTagName("*");
	for (const tag of tags)
	{
		console.log(tag);
	}
}