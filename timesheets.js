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
            tr.innerHTML = `<td class="text-center">${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.getMonth()+1}/${date.getDate()}</td><td></td>`;
            week.querySelector('.hours-body').appendChild(tr);
            date.setDate(date.getDate() + 1);
        }
    }

    const container = document.getElementById('content');
    const maxGroupSize = 4;
    for (let groupStart = 0; groupStart < names.length; groupStart += maxGroupSize) {
        const groupSize = Math.min(maxGroupSize, names.length - groupStart);
        for (let weekid = 1; weekid <= 2; weekid++) {
            const sheetRow = document.createElement('div');
            sheetRow.classList.add('row');
            sheetRow.classList.add(`row-cols-${maxGroupSize}`);
            sheetRow.style.pageBreakAfter = 'always';
            for (let nameid = 0; nameid < maxGroupSize; nameid++) {
                if (nameid < groupSize) {
                    const table = (weekid === 1 ? week1 : week2).cloneNode(true);
                    const id = weekid === 1 ? groupStart + nameid : groupStart + groupSize - nameid - 1; // reverse second sheet of names
                    table.querySelector('.employee-name').textContent = names[id];
                    sheetRow.appendChild(table);
                } else {
                    const blank = document.createElement('div');
                    blank.classList.add('col');
                    sheetRow.appendChild(blank);
                }
            }
            container.appendChild(sheetRow);
        }
    }
};
