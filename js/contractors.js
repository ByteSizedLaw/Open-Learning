window.onload = function() {
    var fileDisplayArea = document.getElementById('pageText');

    // Read the file -> we do this to keep our HTML files small, we dont want massive walls of text. It also makes "making changes" easier and simpler for non-technical people
    fetch('../Text/Contractors/Contractors.txt')
        .then(response => response.text())
        .then(fileContent => {
            // Handle the file content here
            //console.log(fileContent);
            fileDisplayArea.text = fileContent;
        })
        .catch(error => {
            console.error('Error fetching the file:', error);
            fileDisplayArea.textContent = 'Error displaying the info';
        });
 };