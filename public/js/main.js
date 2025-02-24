document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('flightSearchForm');
    const resultsDiv = document.getElementById('flightResults');
    const modeToggle = document.getElementById('modeToggle');
    const planeAnimation = document.getElementById('planeAnimation');

    // Enable Dark/Light Mode Toggle
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');
        modeToggle.innerHTML = document.body.classList.contains('light-mode')
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
    });

    // Handle Flight Search
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        animatePlane();

        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const date = document.getElementById('date').value;

        try {
            const response = await fetch('/api/flights');
            const flights = await response.json();

            resultsDiv.innerHTML = flights.map(flight => `
                <div class="flight-card">
                    <h3>${flight.airlines}</h3>
                    <p>From: ${flight.departure}</p>
                    <p>To: ${flight.destination}</p>
                    <p>Time: ${flight.time}</p>
                    <p>Price: $${flight.price}</p>
                    <button onclick="bookFlight(${flight.flight_id})">Book Now</button>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching flights:', error);
            resultsDiv.innerHTML = '❌ Error fetching flights!';
        }
    });

    // Plane Animation Effect
    function animatePlane() {
        gsap.fromTo(
            planeAnimation,
            { x: '-100%', y: '-100%', opacity: 1 },
            { x: '110vw', y: '110vh', opacity: 0, duration: 2 }
        );
    }
});

// Book Flight Alert
function bookFlight(flightId) {
    Swal.fire({
        title: '✅ Booking Confirmed!',
        text: `Your flight ID ${flightId} has been successfully booked.`,
        icon: 'success',
        confirmButtonText: 'OK',
    });
}