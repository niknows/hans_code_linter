document.getElementById('lint-button').addEventListener('click', () => {
    const code = document.getElementById('code-input').value;
    const results = lintCode(code);
    displayResults(results, code);
    displayScore(results);
});

document.getElementById('export-button').addEventListener('click', () => {
    exportReport();
});

function lintCode(code) {
    const errors = [];
    const lines = code.split('\n');
    const usedVariables = new Set();
    const definedVariables = new Set();

    lines.forEach((line, index) => {
        // Check for variable naming (camelCase)
        const varPattern = /\bvar\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\b/g;
        const letPattern = /\blet\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\b/g;
        const constPattern = /\bconst\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\b/g;

        [varPattern, letPattern, constPattern].forEach(pattern => {
            let match;
            while ((match = pattern.exec(line)) !== null) {
                const varName = match[1];
                definedVariables.add(varName);
                if (!/^[a-z][a-zA-Z0-9]*$/.test(varName)) {
                    errors.push(`Line ${index + 1}: Variable name '${varName}' should be in camelCase.`);
                }
            }
        });

        // Check for line length
        if (line.length > 80) {
            errors.push(`Line ${index + 1}: Line exceeds 80 characters.`);
        }

        // Check for trailing whitespace
        if (/\s$/.test(line)) {
            errors.push(`Line ${index + 1}: Trailing whitespace detected.`);
        }

        // Check for comment without text
        if (/^\s*\/\//.test(line) && !/\S/.test(line.replace(/^\s*\/\//, ''))) {
            errors.push(`Line ${index + 1}: Comment without any text.`);
        }

        // Track variable usage
        const usagePattern = /\b([a-zA-Z_$][0-9a-zA-Z_$]*)\b/g;
        let usageMatch;
        while ((usageMatch = usagePattern.exec(line)) !== null) {
            const varUsage = usageMatch[1];
            usedVariables.add(varUsage);
        }
    });

    // Check for unused variables
    definedVariables.forEach(varName => {
        if (!usedVariables.has(varName)) {
            errors.push(`Variable '${varName}' is defined but never used.`);
        }
    });

    // Check for class naming (PascalCase)
    const classPattern = /\bclass\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\b/g;
    lines.forEach((line, index) => {
        let match;
        while ((match = classPattern.exec(line)) !== null) {
            const className = match[1];
            if (!/^[A-Z][a-zA-Z0-9]*$/.test(className)) {
                errors.push(`Line ${index + 1}: Class name '${className}' should be in PascalCase.`);
            }
        }
    });

    return errors;
}

function displayResults(results, code) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="success">No issues found!</p>';
    } else {
        const lines = code.split('\n');
        results.forEach(error => {
            const errorElement = document.createElement('div');
            errorElement.classList.add('error-item');

            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error');

            const errorText = document.createElement('p');
            errorText.textContent = error;

            const toggleIcon = document.createElement('span');
            toggleIcon.textContent = '▼';
            toggleIcon.classList.add('toggle-icon');
            toggleIcon.addEventListener('click', () => {
                const details = errorElement.querySelector('.error-details');
                if (details.style.display === 'block') {
                    details.style.display = 'none';
                    toggleIcon.textContent = '▼';
                } else {
                    details.style.display = 'block';
                    toggleIcon.textContent = '▲';
                }
            });

            errorMessage.appendChild(errorText);
            errorMessage.appendChild(toggleIcon);

            const errorLine = parseInt(error.match(/Line (\d+):/)[1]);
            const errorDetails = document.createElement('div');
            errorDetails.classList.add('error-details');
            errorDetails.textContent = lines[errorLine - 1];

            errorElement.appendChild(errorMessage);
            errorElement.appendChild(errorDetails);
            resultsContainer.appendChild(errorElement);
        });
    }
}

function exportReport() {
    const results = document.getElementById('results').innerText;
    const blob = new Blob([results], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'lint_report.txt';
    link.click();
}

function displayScore(results) {
    const resultsContainer = document.getElementById('results');
    const scoreElement = document.createElement('p');
    const numErrors = results.length;
    
    if (numErrors === 0) {
        scoreElement.textContent = 'Amazing code!';
        scoreElement.classList.add('score-amazing');
    } else if (numErrors <= 5) {
        scoreElement.textContent = 'Nice code, but there are a few issues.';
        scoreElement.classList.add('score-nice');
    } else if (numErrors <= 10) {
        scoreElement.textContent = 'Not amazing. There are several issues to fix.';
        scoreElement.classList.add('score-not-amazing');
    } else {
        scoreElement.textContent = 'Ewww, this is not amazing at all.';
        scoreElement.classList.add('score-ewww');
    }

    resultsContainer.appendChild(scoreElement);
}
