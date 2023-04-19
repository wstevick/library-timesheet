Date.prototype.incDays = function(days) {
    this.setDate(this.getDate() + days);
}

document.getElementById('employees').value = 'Wes\nAndrew\nTricia';

document.getElementById('print').onclick = function(e) {
    if (!document.getElementById('start-date').value) return;

    const names = document.getElementById('employees').value.trim().split('\n');

    const date = new Date(document.getElementById('start-date').valueAsDate.valueOf());
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const template = document.getElementById('table-template').content;

    const newwin = window.open('./timesheet-template.html');
    newwin.onload = function() {
        for (let period = 1; period <= 2; period++) {
            const row = newwin.document.getElementById(`period-${period}`);

            for (let i = 0; i < names.length; i++) {
                const newelm = template.cloneNode(true);
                newelm.querySelector('.employee-name').textContent = names[i];
                row.appendChild(newelm);
            }

            for (let i = 0; i < 7; i++) {
                const tables = row.querySelectorAll('.hours-body');
                for (let j = 0; j < tables.length; j++) {
                    const newelm = document.createElement('tr');
                    newelm.innerHTML = `<td>${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.toLocaleDateString('en-US')}</td><td></td>`
                    tables[j].appendChild(newelm);
                }
                date.incDays(1);
            }
        }
    };
}
