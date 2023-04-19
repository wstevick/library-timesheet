window.makeTimesheets = function(date, names) {
    const tableTemplate = document.getElementById('table-template').innerHTML;

    const week1 = document.createElement('div');
    week1.classList.add('col');
    const week2 = week1.cloneNode(true);

    week1.innerHTML = tableTemplate + document.getElementById('week-1-things').innerHTML;
    week2.innerHTML = tableTemplate + document.getElementById('week-2-things').innerHTML;

    week1.querySelector('.week-num').textContent = '1';
    week2.querySelector('.week-num').textContent = '2';

    for (let i = 1; i <= 2; i++) {
        const week = i === 1 ? week1 : week2;

        for (let j = 0; j < 7; j++) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td class="text-center">${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.getMonth()}/${date.getDate()}</td><td></td>`;
            week.querySelector('.hours-body').appendChild(tr);
            date.setDate(date.getDate() + 1);
        }
    }

    for (let i = 0; i < names.length; i++) {
        for (let j = 1; j <= 2; j++) {
            const table = (j === 1 ? week1 : week2).cloneNode(true);
            table.querySelector('.employee-name').textContent = names[i];
            document.getElementById(`week-${j}`).appendChild(table);
        }
    }
};
