window.onload = function() {
    var fileDisplayArea = document.getElementById('sidenav');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://raw.githubusercontent.com/Cyber-Finn/Blog/main/index.html'); //read our html template file and use that to update our body
        xhr.setRequestHeader("Accept", "application/vnd.github.3.raw");
        xhr.send();

        xhr.onload = function(e){
            fileDisplayArea.innerHTML = (xhr.response)
        }
 };