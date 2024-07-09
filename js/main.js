document.addEventListener('DOMContentLoaded', function() {
            const imperialInputs = document.querySelectorAll('.imperial');
            const metricInputs = document.querySelectorAll('.metric');

            document.getElementById('imperial').addEventListener('change', function() {
                imperialInputs.forEach(el => el.style.display = 'block');
                metricInputs.forEach(el => el.style.display = 'none');
            });

            document.getElementById('metric').addEventListener('change', function() {
                imperialInputs.forEach(el => el.style.display = 'none');
                metricInputs.forEach(el => el.style.display = 'block');
            });

            // Initialize display
            document.getElementById('metric').checked = true;
            metricInputs.forEach(el => el.style.display = 'block');
        });

        document.getElementById('bmiForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const units = document.querySelector('input[name="units"]:checked').value;
            let bmi;

            if (units === 'imperial') {
                const weightStone = parseFloat(document.getElementById('weightStone').value) || 0;
                const weightPounds = parseFloat(document.getElementById('weightPounds').value) || 0;
                const heightFeet = parseFloat(document.getElementById('heightFeet').value) || 0;
                const heightInches = parseFloat(document.getElementById('heightInches').value) || 0;

                const totalWeightPounds = (weightStone * 14) + weightPounds;
                const totalHeightInches = (heightFeet * 12) + heightInches;

                if (totalWeightPounds > 0 && totalHeightInches > 0) {
                    bmi = (totalWeightPounds / (totalHeightInches * totalHeightInches)) * 703;
                } else {
                    document.getElementById('bmiResult').textContent = 'Please enter valid weight and height values.';
                    return;
                }
            } else {
                const weightMetric = parseFloat(document.getElementById('weightMetric').value);
                const heightMetric = parseFloat(document.getElementById('heightMetric').value);

                if (weightMetric > 0 && heightMetric > 0) {
                    bmi = weightMetric / ((heightMetric / 100) * (heightMetric / 100));
                } else {
                    document.getElementById('bmiResult').textContent = 'Please enter valid weight and height values.';
                    return;
                }
            }

            document.getElementById('bmiResult').textContent = bmi.toFixed(1);
            // document.getElementById('bmiResult').appendChild(()=> <p>hello</p>);
        });