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

      var myEmail = 'ladislav.vrbsky@gmail.com';
      var myPhoneBR = '+55 (91) 99388-7307';
      var myResumePathEng = 'media/pdf/Vrbsky_resume.pdf';
      var myResumePathPor = 'media/pdf/Vrbsky_curriculo.pdf';
      var myFullName = 'Ladislav Vrbsky';

      var blackColorUsed = "#212529";


      document.getElementById('title').innerHTML = myFullName;

      addLoadEvent(function() {  
      document.getElementById('aPageTop').innerHTML = '<i class="fa fa-home"></i>';
      document.getElementById('headlinePreName').innerHTML = 'My name is';
      document.getElementById('headlineName').innerHTML = myFullName;
      document.getElementById('headlinePostName').innerHTML = 'and';
      document.getElementById('headline').innerHTML = 'I <i class="fa fa-heart"></i> AI';
      
      document.getElementById('aboutHeading').innerHTML = "About";
      document.getElementById('about-par1').innerHTML = 'I am a Machine Learning Developer / Data Scientist and a former Software Engineer. I have a passion for Artificial Intelligence, for leveraging the power of algorithms, as well as for innovations through software in general. I cover most of my technical bio in my resume (below), as well as on my LinkedIn profile.';
      document.getElementById('about-par2').innerHTML = "Let's get right into some examples of my work. Check out my portfolio and resume below, as well as the links in the contact section.";
      
      document.getElementById('contactHeading').innerHTML = 'Get In Touch!';
      document.getElementById('contactDescr').innerHTML = 'Interested to know more about me and my work? ... collaborate? ... hire?<br/>You can reach me through the following means.';
      document.getElementById('aEmail').innerHTML = myEmail;
      document.getElementById('aEmail').href = 'mailto:' + myEmail;
      document.getElementById('pPhoneNr').innerHTML = myPhoneBR;
      document.getElementById('aLinkedin').innerHTML = 'linkedin.com/in/vrbsky';
      document.getElementById('aLinkedin').href = 'https://www.linkedin.com/in/vrbsky';
      // document.getElementById('aGithubIO').innerHTML = 'vrbsky.github.io';
      // document.getElementById('aGithubIO').href = 'https://vrbsky.github.io';
      document.getElementById('aGithubRepo').innerHTML = 'github.com/vrbsky';
      document.getElementById('aGithubRepo').href = 'https://www.github.com/vrbsky';
      // document.getElementById('aResume').innerHTML = 'Resume';
      // document.getElementById('aResume').href = 'media/pdf/Vrbsky_Resume.pdf';
      // document.getElementById('pSubHeadline').innerHTML = 'I am a Software Developer with passion for Artificial Intelligence<br/>and innovations through software in general.';
      document.getElementById('aHeadlineContinue').innerHTML = 'Continue';
      // document.getElementById('pSubHeadline').innerHTML = 'I am a Software Developer with passion for Artificial Intelligence and software innovations in general!';
      // document.getElementById('pSubHeadline').innerHTML = 'I am a Software Developer with passion for Artificial Intelligence and software innovations in general!';
      document.getElementById('h2DownloadResume').innerHTML = 'Download my Resume in .pdf / Baixa o meu currículo em .pdf';
      document.getElementById('aDownloadResumeEng').innerHTML = 'English Version';
      document.getElementById('aDownloadResumeEng').href = myResumePathEng;
      document.getElementById('aDownloadResumePor').innerHTML = 'Versão em Português';
      document.getElementById('aDownloadResumePor').href = myResumePathPor;

      // document.getElementById('aShowHideResume').innerHTML = 'Show Here';
      // document.getElementById('aShowHideResume').style.color = blackColorUsed;
      // document.getElementById('aShowHideResume').onclick = function showHide() {
      //   var x = document.getElementById('divResumeIframe');
      //   if (x.style.display === "none") {
      //     x.style.display = "block";
      //     document.getElementById('aShowHideResume').innerHTML = 'Hide';
      //   } else {
      //     x.style.display = "none";
      //     document.getElementById('aShowHideResume').innerHTML = 'Show Here';
      //   }
      // };
      // document.getElementById('pdfObjectIframe').data = myResumePath;

      document.getElementById('project1category').innerHTML = 'Publications';
      document.getElementById('project1name').innerHTML = 'See my published work, including MS and BS thesis';
      document.getElementById('aProject1').href = 'https://scholar.google.com.br/citations?hl=en&user=vyvNl6YAAAAJ';
      document.getElementById('imgProject1').src = 'media/img/portfolio/thumbnails/publications.png';
//      document.getElementById('imgProject1').style = 'padding: 13% 33%'; // 650 x 350 vs 128 x 128
     // document.getElementById('imgProject1').style = 'display: block; margin-left: auto; margin-right: auto; margin-top: 5%; marign-bottom: 5%;';// width: 50%;';
      
      document.getElementById('project2category').innerHTML = 'TensorFlow.js';
      document.getElementById('project2name').innerHTML = 'Simple Linear Regression model purely in your browser';
      document.getElementById('aProject2').href = 'TF.js-LinearRegression';
      document.getElementById('imgProject2').src = 'media/img/portfolio/thumbnails/linearRegression.png';

      // document.getElementById('').innerHTML = '';

        });