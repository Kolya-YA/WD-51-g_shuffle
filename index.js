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
    cBtn.addEventListener('click', () => {
        const longestName = Math.max(...groupList.map(name => name.length));
        const columnWidth = longestName + 2;
        // const tRows = tTable.querySelectorAll('tr');
        // const tData = [...tRows].map(tr => [...tr.children].map(td => td.innerText));
        // const tData = [...tRows][0].map(tr => [...tr.children]);
        // console.log(tData);
        // navigator.clipboard.writeText(JSON.stringify(tData));
        alert('In progress! \nPlease check back later.')
    })
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
    const tr = document.createElement('tr');
    teamsList.forEach((_, i) => {
        const td = document.createElement('th');
        td.innerText = `Team ${i + 1}`;
        tr.appendChild(td);
    });
    table.appendChild(tr);
}
