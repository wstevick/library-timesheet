Date.prototype.incDays = function(days) {
    this.setDate(this.getDate() + days);
}

document.getElementById('employees').value = 'Wes\nAndrew\nTricia';

document.getElementById('print').onclick = function(e) {
    if (!document.getElementById('start-date').value) return;

    const names = document.getElementById('employees').value.trim().split('\n');

    const date = new Date(document.getElementById('start-date').valueAsDate.valueOf());
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    
    if (date.getDay() !== 5 && !confirm(`You entered a ${date.toLocaleDateString('en-US', { weekday: 'long' })}. Are you sure you want this?`)) {
        document.getElementById('start-date').reset();
        return;
    }

    const newwin = window.open('./timesheet-template.html');
    if (newwin === null) {
        alert('Please allow popups for this website.');
        return;
    }
    newwin.onload = function() {
        newwin.makeTimesheets(date, names);
        if (document.getElementById('auto-close').checked) newwin.onblur = newwin.close;
        newwin.print();
    };
}
