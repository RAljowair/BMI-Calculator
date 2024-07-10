document.addEventListener('DOMContentLoaded', function() {
            const imperialInputs = document.querySelectorAll('.imperial');
            const metricInputs = document.querySelectorAll('.metric');

            document.getElementById('imperial').addEventListener('change', function() {
                imperialInputs.forEach(el => el.style.display = 'block');
                metricInputs.forEach(el => el.style.display = 'none');
                calculateBMI();
            });

            document.getElementById('metric').addEventListener('change', function() {
                imperialInputs.forEach(el => el.style.display = 'none');
                metricInputs.forEach(el => el.style.display = 'block');
                calculateBMI();
            });

            // Initialize display
            document.getElementById('metric').checked = true;
            metricInputs.forEach(el => el.style.display = 'block');
            imperialInputs.forEach(el => el.style.display = 'none');

            // Add event listeners to inputs for real-time BMI calculation
            document.querySelectorAll('input[type="number"]').forEach(input => {
                input.addEventListener('input', calculateBMI);
            });

            // Toggle welcome and result messages
             document.getElementById('bmiForm').addEventListener('input', function() {
                document.getElementById('welcome-msg').classList.add('d-none');
                document.getElementById('result-msg').classList.remove('d-none');
            });
        });

        function calculateBMI() {
            document.getElementById('result-msg').classList.add('d-flex');
            const units = document.querySelector('input[name="units"]:checked').value;
            let bmi;
            let heightMetric;

            if (units === 'imperial' ) {
                const weightStone = parseFloat(document.getElementById('weightStone').value) || 0;
                const weightPounds = parseFloat(document.getElementById('weightPounds').value) || 0;
                const heightFeet = parseFloat(document.getElementById('heightFeet').value) || 0;
                const heightInches = parseFloat(document.getElementById('heightInches').value) || 0;

                const totalWeightPounds = (weightStone * 14) + weightPounds;
                const totalHeightInches = (heightFeet * 12) + heightInches;

                heightMetric = totalHeightInches * 2.54; // Convert height to cm

                if (totalWeightPounds > 0 && totalHeightInches > 0) {
                    bmi = (totalWeightPounds / (totalHeightInches * totalHeightInches)) * 703;
                } else {
                    document.getElementById('bmiResult2').textContent = 'Please enter valid weight and height values.';
                    document.getElementById('bmi-msg').textContent = '';
                    document.getElementById('bmiResult').textContent =''
                    return;
                }
            } else {
                const weightMetric = parseFloat(document.getElementById('weightMetric').value);
                heightMetric = parseFloat(document.getElementById('heightMetric').value);

                if (weightMetric > 0 && heightMetric > 0) {
                    bmi = weightMetric / ((heightMetric / 100) * (heightMetric / 100));
                } else {
                    document.getElementById('bmiResult2').textContent = 'Please enter valid weight and height values.';
                    document.getElementById('bmiResult').textContent =''
                    document.getElementById('bmi-msg').textContent = '';
                    return;
                }
            }
            document.getElementById('bmiResult2').textContent =''
            document.getElementById('bmiResult').textContent = bmi.toFixed(1);
            document.getElementById('bmi-msg').textContent = generateBMIMessage(bmi, heightMetric);
        }

        function generateBMIMessage(bmi, heightCm) {
            let message = '';

            if (bmi < 18.5) {
                message = 'Your BMI suggests you are underweight.';
            } else if (bmi >= 18.5 && bmi < 25) {
                const minIdealWeight = (18.5 * ((heightCm / 100) * (heightCm / 100))).toFixed(1);
                const maxIdealWeight = (24.9 * ((heightCm / 100) * (heightCm / 100))).toFixed(1);
                message = `Your BMI suggests you’re a healthy weight. Your ideal weight is between ${minIdealWeight}kg - ${maxIdealWeight}kg.`;
            } else if (bmi >= 25 && bmi < 30) {
                message = 'Your BMI suggests you are overweight.';
            } else {
                message = 'Your BMI suggests you are obese.';
            }

            return message;
        }