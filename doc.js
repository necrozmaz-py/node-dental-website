
function updateTimeSlots() {
  const selectedDate = document.getElementById('date').value;

  fetch(`/api/availableTimeSlots?date=${selectedDate}`)
      .then(response => response.json())
      .then(data => {
          const timeSelect = document.getElementById('time');
          timeSelect.innerHTML = '';

          data.availableTimeSlots.forEach(slot => {
              const option = document.createElement('option');
              option.value = slot;
              option.text = slot;
              timeSelect.appendChild(option);
          });
      })
      .catch(error => console.error('Error fetching time slots:', error));
}


function generateTimeSlots() {
  const startTime = 7;
  const endTime = 17;
  const interval = 2;

  const availableTimeSlots = [];
  for (let i = startTime; i < endTime; i += interval) {
      const formattedTime = `${String(i).padStart(2, '0')}:00`;
      availableTimeSlots.push(formattedTime);
  }

  const timeSelect = document.getElementById('time');
  timeSelect.innerHTML = '';

  availableTimeSlots.forEach(slot => {
      const option = document.createElement('option');
      option.value = slot;
      option.text = slot;
      timeSelect.appendChild(option);
  });
}


generateTimeSlots();


document.getElementById('date').addEventListener('change', updateTimeSlots);