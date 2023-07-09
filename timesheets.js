window.makeTimesheets = function(date, names) {
    const tableTemplate = document.getElementById('table-template').innerHTML;

    const week1 = document.createElement('div');
    week1.classList.add('col');
    const week2 = week1.cloneNode(true);

    week1.innerHTML = tableTemplate + document.getElementById('week-1-things').innerHTML;
    week2.innerHTML = tableTemplate + document.getElementById('week-2-things').innerHTML;

    week1.querySelector('.week-num').textContent = '1';
    week2.querySelector('.week-num').textContent = '2';

    console.log(week1.outerHTML);

    for (let i = 1; i <= 2; i++) {
        const week = i === 1 ? week1 : week2;

        for (let j = 0; j < 7; j++) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td class="text-center">${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.getMonth()+1}/${date.getDate()}</td><td></td>`;
            week.querySelector('.hours-body').appendChild(tr);
            date.setDate(date.getDate() + 1);
        }
    }

    const groupSize = 4;
    for (let groupStart = 0; groupStart < names.length; groupStart += groupSize) {
        console.log(`Printing timesheets for people ${groupStart} - ${groupStart + groupSize}`);
        fillSheetsForPeople(names.slice(groupStart, groupStart + grupSize), week1, week2);
        console.log(`sheets for ${names.slice(groupStart, groupStart + grupSize)}`);
    }
};

function fillSheetsForPeople(names, week1, week2) {
    let container = document.getElementById('content');
    console.log(names);
    for (let j = 1; j <= 2; j++) {
        console.log(`j = ${j}`);
        let sheetRow = document.createElement('div');
        sheetRow.classList.add('row');
        sheetRow.style.pageBreakAfter = true;
        for (let i = 0; i < names.length; i++) {
            console.log(`i = ${i}`);
            const table = (j === 1 ? week1 : week2).cloneNode(true);
            table.querySelector('.employee-name').textContent = names[i];
            sheetRow.appendChild(table);
        }
        console.log(sheetRow.outerHTML);
        container.appendChild(sheetRow);
        console.log(container.outerHTML);
        names.reverse();
    }
}
