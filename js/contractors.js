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

    // Display text prefixed with "##" in large headers
    markdownText = markdownText.replace(/##([^#\n]+)/g, '<h2>$1</h2>');

    // Display text prefixed with "###" in smaller headers
    markdownText = markdownText.replace(/###([^#\n]+)/g, '<h3>$1</h3>');

    // Replace emphasis (e.g., *italic*) with HTML <em> tags
    markdownText = markdownText.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Replace ordered list items (e.g., "1. Item, 2. Another_Item") with <li> tags
    markdownText = markdownText.replace(/^(\d+\.)\s+(.+)/gm, '<li>$2</li>');

    // Add line breaks for <br>
    markdownText = markdownText.replace(/<br>/g, '<br />');

    // Convert Markdown links to HTML anchor tags
    markdownText = markdownText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Handle unordered list items (asterisk at the start of the line)
    markdownText = markdownText.replace(/^\*\s+(.+)/gm, '<ul><li>$1</li></ul>');

    // Handle nested unordered list items (asterisk at the start with optional spaces)
    markdownText = markdownText.replace(/^\s*\*\s+(.+)/gm, '<ul><li>$1</li></ul>');

    // Handle double-asterisks for bold text
    markdownText = markdownText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    return markdownText;
}