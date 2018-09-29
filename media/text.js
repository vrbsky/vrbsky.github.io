      //set texts
 function addLoadEvent(func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
          window.onload = func;
        } else {
          window.onload = function() {
            if (oldonload) {
              oldonload();
            }
            func();
          }
        }
      }

      addLoadEvent(function() {  
      document.getElementById('aPageTop').innerHTML = '<i class="fa fa-home"></i>';
      document.getElementById('headlinePreName').innerHTML = 'My name is';
      document.getElementById('headlineName').innerHTML = 'Ladislav Vrbsky';
      document.getElementById('headlinePostName').innerHTML = 'and';
      document.getElementById('headline').innerHTML = 'I <i class="fa fa-heart"></i> AI';

      document.getElementById('contactHeading').innerHTML = 'Get In Touch!';
      document.getElementById('contactDescr').innerHTML = 'Interested to know more about me and my work? ... collaborate? ... hire?<br/>You can reach me through the following means.';
      document.getElementById('aEmail').innerHTML = 'ladislav.vrbsky@gmail.com';
      document.getElementById('aEmail').href = 'mailto:ladislav.vrbsky@gmail.com';
      document.getElementById('pPhoneNr').innerHTML = '+55 (91) 99388-7307';
      document.getElementById('aLinkedin').innerHTML = 'linkedin.com/in/vrbsky';
      document.getElementById('aLinkedin').href = 'https://www.linkedin.com/in/vrbsky';
      // document.getElementById('aGithubIO').innerHTML = 'vrbsky.github.io';
      // document.getElementById('aGithubIO').href = 'https://vrbsky.github.io';
      document.getElementById('aGithubRepo').innerHTML = 'github.com/vrbsky';
      document.getElementById('aGithubRepo').href = 'https://www.github.com/vrbsky';
      document.getElementById('aResume').innerHTML = 'Resume';
      document.getElementById('aResume').href = 'media/pdf/Vrbsky_Resume.pdf';
      document.getElementById('pSubHeadline').innerHTML = 'I am a Software Developer with passion for Artificial Intelligence<br/>and innovations through software in general.';
      document.getElementById('aHeadlineContinue').innerHTML = 'Continue';
      // document.getElementById('pSubHeadline').innerHTML = 'I am a Software Developer with passion for Artificial Intelligence and software innovations in general!';
      // document.getElementById('pSubHeadline').innerHTML = 'I am a Software Developer with passion for Artificial Intelligence and software innovations in general!';
      document.getElementById('h2DownloadResume').innerHTML = 'Download my Resume in .pdf';

      document.getElementById('aDownloadResume').innerHTML = 'Download';
      document.getElementById('aDownloadResume').href = 'media/pdf/Vrbsky_Resume.pdf';

      document.getElementById('project2category').innerHTML = 'TensorFlow.js';
      document.getElementById('project2name').innerHTML = 'Simple Linear Regression model purely in your browser';

      // document.getElementById('').innerHTML = '';

      document.getElementById('title').innerHTML = 'Ladislav Vrbsky';
        });