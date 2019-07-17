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
      var myResumePathPorProfessor = 'media/pdf/Vrbsky_curriculo_professor.pdf';
      var myFullName = 'Ladislav Vrbsky';

      var blackColorUsed = "#212529";


      document.getElementById('title').innerHTML = myFullName;

      addLoadEvent(function() {  
      document.getElementById('aPageTop').innerHTML = '<i class="fa fa-home"></i>';
      document.getElementById('headlineName').innerHTML = myFullName;
      document.getElementById('headline').innerHTML = 'Artificial Intelligence | Data Science | Machine Learning | Big Data';
      
      document.getElementById('aboutHeading').innerHTML = "About";
      document.getElementById('about-par1').innerHTML = 'I am a Machine Learning Developer / Data Scientist and a former Software Engineer. I have a passion for Artificial Intelligence, for leveraging the power of algorithms, as well as for innovations through software in general. I cover most of my technical bio in my resume (below), as well as on my LinkedIn profile.';
      document.getElementById('about-par2').innerHTML = "What did not fit in my one page resume you ask? I was born and raised in Prague (CZE) where I received my BSc and my Master's curriculum was composed of three universities: KSU (USA), CTU (CZE), UFPA (BRA).";
      document.getElementById('about-par3').innerHTML = "I love my current position of a Data Scientist as I get to work with a good amount of data and have startUp-like responsibilites (learn fast, do all kinds of things in a rather small team, have full responsibility of projects).";
      document.getElementById('about-par4').innerHTML = "I currently have a legal permission to live and work in the EU and Brazil. Regarding languages, Czech is my native and I dominate English and Portuguese on an almost-native level. I even teach English at my current company.";
       
      document.getElementById('about-par5').innerHTML = "Below are some examples of my work or work I did in a team. Check out my portfolio and resume below, as well as the links in the contact section.";
      
      document.getElementById('contactHeading').innerHTML = 'Get In Touch!';
      document.getElementById('contactDescr').innerHTML = 'Interested to know more about me and my work? ... collaborate? ... hire?<br/>Make sure to reach out to me.';
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
      document.getElementById('h2DownloadResume').innerHTML = 'Download my Resume in .pdf | Baixa o meu currículo em .pdf';
      document.getElementById('aDownloadResumeEng').innerHTML = 'English Version';
      document.getElementById('aDownloadResumeEng').href = myResumePathEng;
      document.getElementById('aDownloadResumePor').innerHTML = 'Versão em Português';
      document.getElementById('aDownloadResumePor').href = myResumePathPor;
      document.getElementById('h4CurriculoProfessor').innerHTML = 'Em Belém sou também disponível como o professor universitário na minha área (AI/ML/DS/CS)';
      document.getElementById('aDownloadResumePorProfessor').innerHTML = 'Versão Professor';
      document.getElementById('aDownloadResumePorProfessor').href = myResumePathPorProfessor;
      aDownloadResumePorProfessor
      document.getElementById('WhatsAppLogo').href = "https://api.whatsapp.com/send?phone=5591993887307";
      //document.getElementById('WhatsAppSpan').innerHTML = 'Text me on WhatsApp';

      hoverTextCopy = 'copy';
      document.getElementById('hoverTextCopy1').innerHTML = hoverTextCopy;
      document.getElementById('hoverTextCopy2').innerHTML = hoverTextCopy;
      document.getElementById('hoverTextCopy3').innerHTML = hoverTextCopy;
      document.getElementById('hoverTextCopy4').innerHTML = hoverTextCopy;

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
      document.getElementById('aProject2').href = 'projects/TF.js-LinearRegression';
      document.getElementById('imgProject2').src = 'media/img/portfolio/thumbnails/linearRegression.png';

      document.getElementById('project3category').innerHTML = 'Games';
      document.getElementById('project3name').innerHTML = 'Platformer (source at github.com/ThaddeusT/Platformer)';
      document.getElementById('aProject3').href = 'projects/Platformer/Platformer/platformer.html';
      document.getElementById('imgProject3').src = 'media/img/portfolio/thumbnails/Platformer.png';

      document.getElementById('project4category').innerHTML = 'Games';
      document.getElementById('project4name').innerHTML = 'Heli Attack';
      document.getElementById('aProject4').href = 'projects/HeliAttack/helicopter.html';
      document.getElementById('imgProject4').src = 'media/img/portfolio/thumbnails/HeliAttack.png';

      document.getElementById('project5category').innerHTML = 'Games';
      document.getElementById('project5name').innerHTML = 'Light Cycles';
      document.getElementById('aProject5').href = 'projects/Light_Cycles/light_cycles.html';
      document.getElementById('imgProject5').src = 'media/img/portfolio/thumbnails/LightCycles.png';

      document.getElementById('project6category').innerHTML = 'Games';
      document.getElementById('project6name').innerHTML = 'Asteroids';
      document.getElementById('aProject6').href = 'projects/asteroids/asteroids.html';
      document.getElementById('imgProject6').src = 'media/img/portfolio/thumbnails/Asteroids.png';

      document.getElementById('project7category').innerHTML = 'Games';
      document.getElementById('project7name').innerHTML = '';
      document.getElementById('aProject7').href = 'projects/';
      document.getElementById('imgProject7').src = 'media/img/portfolio/thumbnails/linearRegression.png';
      // document.getElementById('').innerHTML = '';

        });