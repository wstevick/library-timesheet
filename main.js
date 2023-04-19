Date.prototype.incDays = function(days) {
    this.setDate(this.getDate() + days);
}

document.getElementById('employees').value = 'Wes\nAndrew\nTricia';

document.getElementById('print').onclick = function(e) {
    if (!document.getElementById('start-date').value) return;

    const names = document.getElementById('employees').value.trim().split('\n');

    const date = new Date(document.getElementById('start-date').valueAsDate.valueOf());
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const newwin = window.open('./timesheet-template.html');
    if (newwin === null) {
        alert('Please allow popups for this website.');
        return;
    }
    newwin.onload = function() {
        newwin.makeTimesheets(date, names);
        newwin.print();
    };
}
