document.addEventListener('DOMContentLoaded', function () {
    // Retrieve form data from sessionStorage
    const formData = JSON.parse(sessionStorage.getItem("formData"));
  
    // If formData is found, populate the page with the data
    if (formData) {
        console.log("Stored Form Data:", formData);
  
       
        document.getElementById('first-name').textContent = formData['firstName'] || formData['first-name'] || 'Not provided';
        document.getElementById('last-name').textContent = formData['lastName'] || formData['last-name'] || 'Not provided';
        document.getElementById('dob').textContent = formData['dob'] || 'Not provided';
        document.getElementById('email').textContent = formData['email'] || 'Not provided';
        document.getElementById('phone').textContent = formData['phoneNumber'] || formData['phone'] || 'Not provided';
        document.getElementById('address').textContent = formData['address'] || 'Not provided';
  
      
        let income = formData['income'];
        if (income && income.includes('_')) {
            let incomeRange = income.split('_');
            document.getElementById('income').textContent = `$${incomeRange[0]} - $${incomeRange[1] || 'Above'}`;
        } else {
            document.getElementById('income').textContent = income || 'Not provided';
        }
  
        // Display health conditions
        const healthConditions = formData['healthConditions'] || formData['health-conditions'];
        if (Array.isArray(healthConditions) && healthConditions.length > 0) {
            document.getElementById('health-conditions').textContent = healthConditions.join(', ');
        } else if (healthConditions) {
            document.getElementById('health-conditions').textContent = healthConditions;
        } else {
            document.getElementById('health-conditions').textContent = "No health conditions listed.";
        }
  
        // Display insurance plan and coverage
        document.getElementById('health-plan').textContent = formData['health-plan'] || formData['healthPlan'] || 'Not provided';
        document.getElementById('coverage').textContent = formData['coverage'] || 'Not provided';
  
        // Display recommendations based on household income
        const incomeValue = parseInt(formData['income']?.split('_')[0], 10) || 0;
        let recommendations = '';
        let companies = [];
  
        if (incomeValue <= 30000) {
            recommendations = 'We recommend looking into low-cost plans such as Healthcare Marketplace, Affordable Care, and others tailored for lower-income households.';
            companies = [
                { name: 'Healthcare Marketplace', description: 'Affordable plans for lower-income households', logo: 'images/Healthcare Marketplace.png', url: 'https://www.healthcaremarketplace-florida.com' },
                { name: 'Affordable Care', description: 'Providing low-cost health coverage', logo: 'images/Affordable Care.png', url: 'https://www.affordablecare.com' },
                { name: 'Aetna', description: 'Low-cost health coverage for families', logo: 'images/Aetna.png', url: 'https://www.aetna.com/' },
                { name: 'Health Partners', description: 'Affordable healthcare for low-income families', logo: 'images/Health Partners.png', url: 'https://www.healthpartners.com' },
                { name: 'Ambetter Health', description: 'Affordable plans to ensure basic healthcare coverage', logo: 'images/Ambetter Health.png', url: 'https://www.ambetterhealth.com' },
                { name: 'Easy Health', description: 'Simple health coverage for those who need it', logo: 'images/Easy Health.png', url: 'https://www.easyhealth.com' }
            ];
        } else if (incomeValue > 30000 && incomeValue <= 80000) {
            recommendations = 'We recommend exploring plans like Premium Health, WellCare, and others that balance cost and coverage.';
            companies = [
                { name: 'Just Direct', description: 'Balanced plans for medium-income households', logo: 'images/JustDirect.png', url: 'https://www.justdirectfl.com/?gad_source=1&gclid=CjwKCAiAxqC6BhBcEiwAlXp45xaFysCj73zEu2az2P2LNP90ucIsQZc7D05BaSIdrV3vQ4lAc-jq6BoCekwQAvD_BwE' },
                { name: 'WellCare', description: 'Plans focused on your healthcare needs', logo: 'images/WellCare.png', url: 'https://www.wellcare.com' },
                { name: 'CareChoice', description: 'Affordable care with coverage flexibility', logo: 'images/CareChoice.png', url: 'https://www.carechoice.com' },
                { name: 'Vocodo', description: 'Comprehensive health coverage for families', logo: 'images/Vocodo.png', url: 'https://vocodoinsurance.com/apply?gad_source=1&gclid=CjwKCAiAxqC6BhBcEiwAlXp455oILO0-WafEt6oWC640FaCzA9VlTnjhjH2jclTuMPJ654KEoOG3QhoC_ngQAvD_BwE' },
                { name: 'SmartPractice', description: 'Affordable coverage with advanced healthcare features', logo: 'images/SmartPractice.png', url: 'https://www.smarthealth.com' },
                { name: 'FlexCare', description: 'Flexible plans to fit your lifestyle', logo: 'images/FlexCare.png', url: 'https://www.flexcare.com' }
            ];
        } else {
            recommendations = 'You may be eligible for top-tier plans such as Elite Health, Optimum Coverage, and more premium providers.';
            companies = [
                {
                    name: 'Blue Cross Blue Shield',
                    description: 'Offers a variety of health insurance plans tailored to different income levels.',
                    logo: 'images/BlueCrossBlueShield.png',
                    url: 'https://www.bcbs.com'
                },
                {
                    name: 'UnitedHealthcare',
                    description: 'Provides comprehensive health coverage options suitable for individuals and families.',
                    logo: 'images/UnitedHealthCare.png',
                    url: 'https://www.uhc.com'
                },
                {
                    name: 'Aetna',
                    description: 'Delivers affordable health insurance plans with a wide network of healthcare providers.',
                    logo: 'images/Aetna.png',
                    url: 'https://www.aetna.com'
                },
                {
                    name: 'Cigna',
                    description: 'Offers health insurance plans with various coverage options to meet diverse needs.',
                    logo: 'images/Cigna.png',
                    url: 'https://www.cigna.com'
                },
                {
                    name: 'Humana',
                    description: 'Provides health insurance plans focusing on wellness and preventive care.',
                    logo: 'images/Humana.png',
                    url: 'https://www.humana.com'
                },
                {
                    name: 'Molina Healthcare',
                    description: 'Specializes in offering affordable health insurance plans for low-income individuals and families.',
                    logo: 'images/Molina.png',
                    url: 'https://www.molinahealthcare.com'
                }
            ];
        }
  
        // Display recommendations
        const recommendationsElement = document.getElementById('recommendations');
        recommendationsElement.innerHTML = ''; // Clear any existing content
        
        const recommendationText = document.createElement('p');
        recommendationText.textContent = recommendations;
        recommendationsElement.appendChild(recommendationText);
  
        // Create a grid of recommended companies
        const gridContainer = document.createElement('div');
        gridContainer.classList.add('company-grid');
        
        companies.forEach(company => {
            const companyDiv = document.createElement('div');
            companyDiv.classList.add('company');
            
            const companyLogo = document.createElement('img');
            companyLogo.src = company.logo;
            companyLogo.alt = company.name;
            companyLogo.classList.add('company-logo');
            
            const companyName = document.createElement('h4');
            companyName.textContent = company.name;
            
            const companyDesc = document.createElement('p');
            companyDesc.textContent = company.description;
            
            const companyLink = document.createElement('a');
            companyLink.href = company.url;
            companyLink.textContent = 'Visit Website';
            companyLink.target = '_blank';
            
            companyDiv.appendChild(companyLogo);
            companyDiv.appendChild(companyName);
            companyDiv.appendChild(companyDesc);
            companyDiv.appendChild(companyLink);
            
            gridContainer.appendChild(companyDiv);
        });
  
        recommendationsElement.appendChild(gridContainer);
    } else {
        alert('No form data found! Please complete the quote request form.');
        
        window.location.href = 'quote-request.html';
    }
  });