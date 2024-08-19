import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'tailwindcss/tailwind.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const carData = [
    { plateNumber: 'ABC123', petrol: 300, service: 200, other: 50 },
    { plateNumber: 'XYZ123', petrol: 40, service: 100, other: 20 },
    { plateNumber: 'XYZ456', petrol: 110, service: 90, other: 20 },
    { plateNumber: 'XYZ789', petrol: 50, service: 105, other: 10 },
];

const Graph1 = () => {
    const [selectedCar, setSelectedCar] = useState('');
    const [data, setData] = useState(null);

    const handleSearch = () => {
        const car = carData.find(car => car.plateNumber === selectedCar);
        if (car) {
            const fetchedData = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Petrol',
                    data: [car.petrol, car.petrol + 15, car.petrol + 30, car.petrol + 10, car.petrol + 20, car.petrol + 25, car.petrol + 5],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }, {
                    label: 'Service',
                    data: [car.service, car.service + 5, car.service + 10, car.service + 20, car.service + 15, car.service + 5, car.service + 10],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }, {
                    label: 'Other',
                    data: [car.other, car.other + 10, car.other + 5, car.other + 15, car.other + 10, car.other + 20, car.other + 5],
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                }]
            };
            setData(fetchedData);
        }
    };

    return (
        <div className="container mx-auto my-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold">Select Car Plate Number to See Graph</h2>
                <div className="flex justify-center items-center mt-4">
                    <select 
                        className="form-select w-1/2 p-2 border border-gray-300 rounded-md me-4" 
                        value={selectedCar} 
                        onChange={(e) => setSelectedCar(e.target.value)}
                    >
                        <option value="" disabled>Select Car Plate Number</option>
                        {carData.map(car => (
                            <option key={car.plateNumber} value={car.plateNumber}>
                                {car.plateNumber}
                            </option>
                        ))}
                    </select>
                    <button 
                        onClick={handleSearch} 
                        className="bg-green-500 text-white py-2 px-4 rounded-md text-sm"
                    >
                        Show Graph
                    </button>
                </div>
            </div>

            {data && (
                <div className="flex justify-center">
                    <div className="w-full md:w-2/3">
                        <Bar 
                            data={data} 
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: 'top' },
                                    title: { display: true, text: 'Monthly Data Overview' },
                                },
                            }} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Graph1;
