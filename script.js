// Код розроблено студенткою Ашурковою Іриною, група ФІТ2-11

document.addEventListener('DOMContentLoaded', function() {

    if (document.getElementById('calculate-btn')) {
        initCalculator();
    }
    

    if (document.getElementById('contact-form')) {
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.');
            this.reset();
        });
    }
});

function initCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsSection = document.getElementById('results');
    
    calculateBtn.addEventListener('click', calculateLoan);
    

    document.getElementById('loan-amount').addEventListener('input', calculateLoan);
    document.getElementById('loan-term').addEventListener('input', calculateLoan);
    document.getElementById('interest-rate').addEventListener('input', calculateLoan);
    
    function calculateLoan() {
        const loanAmount = parseFloat(document.getElementById('loan-amount').value);
        const loanTerm = parseInt(document.getElementById('loan-term').value);
        const annualInterestRate = parseFloat(document.getElementById('interest-rate').value);
        
        if (isNaN(loanAmount) || isNaN(loanTerm) || isNaN(annualInterestRate)) {
            return;
        }
        
    
        const monthlyInterestRate = annualInterestRate / 100 / 12;
        const monthlyPayment = (loanAmount * monthlyInterestRate) / 
                              (1 - Math.pow(1 + monthlyInterestRate, -loanTerm));
        
    
        const totalPayment = monthlyPayment * loanTerm;
        const totalInterest = totalPayment - loanAmount;
        
    
        document.getElementById('monthly-payment').textContent = monthlyPayment.toFixed(2) + ' ₴';
        document.getElementById('total-payment').textContent = totalPayment.toFixed(2) + ' ₴';
        document.getElementById('total-interest').textContent = totalInterest.toFixed(2) + ' ₴';
        
    
        resultsSection.style.display = 'block';
        
    
        updateChart(loanAmount, totalInterest);
    }
    
    function updateChart(principal, interest) {
        const ctx = document.getElementById('loan-chart').getContext('2d');
        
    
        if (window.loanChart) {
            window.loanChart.destroy();
        }
        
        window.loanChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Основна сума', 'Відсотки'],
                datasets: [{
                    data: [principal, interest],
                    backgroundColor: [
                        '#3498db',
                        '#e74c3c'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.raw.toFixed(2) + ' ₴';
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    
    calculateLoan();
}