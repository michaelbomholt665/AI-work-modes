document.addEventListener('DOMContentLoaded', function() {
    const page = document.body.getAttribute('data-page');
    const importButton = document.querySelector('.nav-button');
    const fileInput = document.getElementById('mdFileInput');
    const contentDiv = document.querySelector('.content');

    // Load saved content from localStorage, if available
    const savedContent = localStorage.getItem(`content-${page}`);
    if (savedContent) {
        contentDiv.innerHTML = savedContent;
    }

    importButton.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const mdContent = e.target.result;
                const htmlContent = marked.parse(mdContent);
                contentDiv.innerHTML = htmlContent;
                // Save the content to localStorage
                localStorage.setItem(`content-${page}`, htmlContent);
            };
            reader.readAsText(file);
            // Reset the file input to allow re-importing the same file
            fileInput.value = '';
        }
    });
});