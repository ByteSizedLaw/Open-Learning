//doing this so that we can run onload from multiple files without the callbacks overwiting each other
window.addEventListener('load', function() {
    updateBodyText();
});

function updateBodyText() {
    var fileDisplayArea = document.getElementById('pageText');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://raw.githubusercontent.com/Cyber-Finn/Blog/main/text/Contractors/Contractors.txt');
        xhr.setRequestHeader("Accept", "application/vnd.github.3.raw");
        xhr.send();

        xhr.onload = function(e){
            fileDisplayArea.innerHTML = parseMarkdown(xhr.response)
        }
 };

 function parseMarkdown(markdownText) {
    // Replace Markdown headings (e.g., # Heading) with HTML <h1> tags
    markdownText = markdownText.replace(/^# (.+)/gm, '<h1>$1</h1>');

    // Display text prefixed with "##" in large headers
    markdownText = markdownText.replace(/##([^#\n]+)/g, '<h2>$1</h2>');

    // Display text prefixed with "###" in smaller headers
    markdownText = markdownText.replace(/###([^#\n]+)/g, '<h3>$1</h3>');

    //decided to do this in the actual txt file because of the limitations on the js side
    // // Replace ordered list items (e.g., "1. Item, 2. Another_Item") with <ol> tags
    // let orderedListCounter = 0;
    // markdownText = markdownText.replace(/^(\d+\.)\s+(.+)/gm, (strline, numberPortion, lineData) => {
    //     if (numberPortion === '1.') {
    //         // Start a new ordered list
    //         orderedListCounter += 1;
    //         return `</ol><ol><li>${lineData}</li>`;
    //     } else {
    //         // Continue the existing ordered list
    //         return `<li>${lineData}</li>`;
    //     }
    // });
    
    // // Close the last ordered list (if any)
    // if(orderedListCounter > 0)
    // {
    //     markdownText += `</ol>`;
    // }


    // Add line breaks for <br>
    markdownText = markdownText.replace(/<br>/g, '<br />');

    // Convert Markdown links to HTML anchor tags
    markdownText = markdownText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Handle unordered list items (asterisk at the start of the line)
    markdownText = markdownText.replace(/^\*\s+(.+)/gm, '<ul><li>$1</li></ul>');

    // Handle nested unordered list items (asterisk at the start with optional spaces)
    markdownText = markdownText.replace(/^\s*\*\s+(.+)/gm, '<ul><li>$1</li></ul>');

    // Handle asterisks for bold text
    markdownText = markdownText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Handle underscores for italic text
    markdownText = markdownText.replace(/_([^_]+)_/g, '<em>$1</em>');

    return markdownText;
}