function updateBodyText(input) {
    var fileDisplayArea = document.getElementById('pageText');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', input);
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
    //markdownText = markdownText.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Handle code blocks/snippets
    markdownText = markdownText.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');

    // Handle inline code
    markdownText = markdownText.replace(/`([^`]+)`/g, '<code>$1</code>');

    return markdownText;
}