const groupList = [
    'Alex',
    'Amir',
    'Anna',
    'Dominic',
    'Eddy',
    'Gary',
    'Gulmina',
    'Hyeongwook',
    'Kapil',
    'Mehedi',
    'Muhammad',
    'Nikolay',
    'Vladimir',
    'Yohannes',
];

const teams = [4, 4, 3, 3];

const gList = document.querySelector('#g-list')
const tTable = document.querySelector('#t-table');
const updateBtns = document.querySelectorAll('.btn--update');
const copyBtns = document.querySelectorAll('.btn--copy');


createGroupList(groupList);
createTableHeader(tTable, teams);

updateBtns.forEach(uBtn => {
    uBtn.addEventListener('click', () => {
        const tRows = tTable.querySelectorAll('tr');
        tRows.forEach((tr, i) => i && tr.remove())
        const sGroup = shuffleGroup(groupList);
        createTableRows(tTable, fillTeamsList(sGroup));
    })
})

copyBtns.forEach(cBtn => {
    cBtn.addEventListener('click', createTextTable)
})

// Functions

function fillTeamsList(shafGroup) {
    const teamsList = [];

    teams.forEach((n) => {
        teamsList.push(shafGroup.splice(0, n));
    });
    return teamsList;
}

function createGroupList(group) {
    group.forEach(g => {
        const li = document.createElement('li');
        li.innerText = g;
        gList.appendChild(li);
    });
}

function shuffleGroup(gList) {
    const sgList = [...gList]
    let i = sgList.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [sgList[i], sgList[j]] = [sgList[j], sgList[i]];
    }
    return sgList;
}

function createTableRows(table, teamsList) {
    for (let i = 0; i < teamsList[0].length; i++) {
        const tr = document.createElement('tr');
        teamsList.forEach(t => {
            const td = document.createElement('td');
            if (t[i] !== undefined) {
                td.innerText = t[i];
            }
            tr.appendChild(td);
        });
        table.appendChild(tr);
    }
}

function createTableHeader(table, teamsList) {
    const headTr = document.createElement('tr');
    const tr = document.createElement('tr');
    teamsList.forEach((_, i) => {
        const th = document.createElement('th');
        th.innerText = `Team ${i + 1}`;
        headTr.appendChild(th);
        const td = document.createElement('td');
        td.innerText = '***';
        tr.appendChild(td);
    });
    table.appendChild(headTr);
    table.appendChild(tr);
}

function createTextTable() {
    const tRows = tTable.querySelectorAll('tr');
    const longestName = Math.max(...groupList.map(name => name.length));
    const columnWidth = longestName + 2;    
    const qtyColumns = tRows[0].children.length;
    const tableWidth = (columnWidth + 2) * qtyColumns + 1;
    const hLine = '-'.repeat(tableWidth);
    let textTable = hLine;
    textTable += [...tRows].map(tr => (
        '\n' + '|' + [...tr.children].map(td => `${trText(td.innerText, columnWidth)} |`).join('') + '\n' + hLine)
    ).join('')

    console.log(textTable)
    navigator.clipboard.writeText(textTable);
    
    alert('The table is copied to the clipboard\nand print in the console. \nYou can go to Slack and paste it as a code block.')
}

function trText(text, minLength) {
    return text.length > minLength ? text : text.padEnd(minLength, ' ');
}