window.onload = function() {
    var fileDisplayArea = document.getElementById('pageText');

    // Read the file -> we do this to keep our HTML files small, we dont want massive walls of text. It also makes "making changes" easier and simpler for non-technical people
    fetch('https://raw.githubusercontent.com/Cyber-Finn/Blog/main/text/Contractors/Contractors.txt') //This link has CORS, but the original doesnt https://github.com/Cyber-Finn/Blog/blob/main/text/Contractors/Contractors.txt lol
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