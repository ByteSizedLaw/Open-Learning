window.onload = function() {
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
  
    // Replace emphasis (e.g., *italic*) with HTML <em> tags
    markdownText = markdownText.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Replace ordered list items (e.g., "1. Item") with <li> tags
    markdownText = markdownText.replace(/^(\d+\.)\s+(.+)/gm, '<li>$2</li>');
  
    return markdownText;
  }