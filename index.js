const group = [
    'Alex',
    'Amir',
    'Dominic',
    'Eddy',
    'Gary',
    'Gulmina',
    'Hyeongwook',
    'Kapil',
    'Mehedi',
    'Muhammad',
    'Anna',
    'Nikolay',
    'Vladimir',
    'Yohannes',
];

const gList = document.querySelector('#g-list')
group.forEach(g => {
    const li = document.createElement('li');
    li.innerText = g;
    gList.appendChild(li);
});

const teams = [4, 4, 3, 3];

const shuffle = (arr) => {
    let i = arr.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const shaffled_group = shuffle(group);

const teamsList = [];
let i = 0;
teams.forEach((n , i) => {
    teamsList.push(shaffled_group.splice(0, n));
});

console.log(teamsList);

const tTable = document.querySelector('#t-table');

const tr = document.createElement('tr');
teamsList.forEach((_, i) => {
    const td = document.createElement('th');
    td.innerText = `Team ${i + 1}`;
    tr.appendChild(td);
});
tTable.appendChild(tr);

for (let i = 0; i < teamsList[0].length; i++) {
    const tr = document.createElement('tr');
    teamsList.forEach(t => {
        const td = document.createElement('td');
        if (t[i] !== undefined) {
            td.innerText = t[i];
        }
        tr.appendChild(td);
    });
    tTable.appendChild(tr);
}