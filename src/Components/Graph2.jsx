import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported
import Select from 'react-select';

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
                labels: [
                    'January', 'February', 'March', 'April', 'May', 'June', 'July', 
                    'August', 'September', 'October', 'November', 'December'
                ],
                datasets: [
                    {
                        label: 'Petrol',
                        data: [car.petrol, car.petrol + 15, car.petrol + 30, car.petrol + 10, car.petrol + 20, car.petrol + 25, car.petrol + 5, car.petrol + 18, car.petrol + 23, car.petrol + 10, car.petrol + 12, car.petrol + 17],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Service',
                        data: [car.service, car.service + 5, car.service + 10, car.service + 20, car.service + 15, car.service + 5, car.service + 10, car.service + 12, car.service + 19, car.service + 21, car.service + 16, car.service + 13],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Other',
                        data: [car.other, car.other + 10, car.other + 5, car.other + 15, car.other + 10, car.other + 20, car.other + 5, car.other + 12, car.other + 22, car.other + 11, car.other + 14, car.other + 18],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1,
                    },
                ],
            };
            setData(fetchedData);
        }
    };

    const options = carData.map(car => ({
        value: car.plateNumber,
        label: car.plateNumber,
    }));

    return (
        <div className="container mx-auto my-12 px-4">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-4">Select Car Plate Number to See Graph</h2>
                <div className="flex justify-center items-center space-x-4">
                    <Select
                        options={options}
                        onChange={(selectedOption) => setSelectedCar(selectedOption ? selectedOption.value : '')}
                        placeholder="Select Car Plate Number"
                        isClearable
                        className="w-1/2"
                    />
                    <button 
                        onClick={handleSearch} 
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        Show Graph
                    </button>
                </div>
            </div>

            {data && (
                <div className="flex justify-center">
                    <div className="w-full max-w-4xl">
                        <Bar 
                            data={data} 
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: 'top' },
                                    title: { display: true, text: 'Monthly Data Overview' },
                                },
                                layout: {
                                    padding: 10,
                                },
                                scales: {
                                    x: {
                                        stack: true,
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            autoSkip: false,
                                        },
                                        barPercentage: 0.6,
                                        categoryPercentage: 0.8,
                                    },
                                    y: {
                                        beginAtZero: true,
                                    },
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
