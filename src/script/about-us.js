document.addEventListener("DOMContentLoaded", function () {
  createNavbar();
  aboutUs();
  addFooterText("© Levan Abashidze, 2024");

  function aboutUs() {
    const aboutDivs = document.getElementById("aboutDivs");
    const aboutDiv1 = document.createElement("div");
    const aboutDiv2 = document.createElement("div");
    const aboutDiv3 = document.createElement("div");
    const aboutDiv4 = document.createElement("div");
    const aboutDiv5 = document.createElement("div");

    aboutDiv1.classList.add("about-div", "left-div");
    aboutDiv2.classList.add("about-div", "right-div");
    aboutDiv3.classList.add("about-div", "left-div");
    aboutDiv4.classList.add("about-div", "right-div");
    aboutDiv5.classList.add("about-div", "left-div");

    const aboutTitle1 = document.createElement("h3");
    const aboutText1 = document.createElement("p");
    const aboutLink1 = document.createElement("a");
    const aboutTitle2 = document.createElement("h3");
    const aboutText2 = document.createElement("p");
    const aboutTitle3 = document.createElement("h3");
    const aboutText3 = document.createElement("p");
    const aboutTitle4 = document.createElement("h3");
    const aboutText4 = document.createElement("p");
    const aboutTitle5 = document.createElement("h3");
    const aboutText5 = document.createElement("p");

    aboutTitle1.classList.add("about-title");
    aboutTitle2.classList.add("about-title");
    aboutTitle3.classList.add("about-title");
    aboutTitle4.classList.add("about-title");
    aboutTitle5.classList.add("about-title");

    aboutText1.classList.add("about-text");
    aboutText2.classList.add("about-text");
    aboutText3.classList.add("about-text");
    aboutText4.classList.add("about-text");
    aboutText5.classList.add("about-text");

    aboutTitle1.textContent = "GitHub Repository of Jobia";
    aboutTitle2.textContent = "Bridging Aspirations to Achievements";
    aboutTitle3.textContent = "Navigating the Path to Success";
    aboutTitle4.textContent = "Staying Ahead in a Dynamic World";
    aboutTitle5.textContent = "Your Success, Our Mission";
    aboutLink1.href = "https://github.com/levanabashidze02/Job-Search-February";

    aboutLink1.href = "https://github.com/levanabashidze02/Job-Search-February";
    aboutLink1.textContent = "Here you can see the GitHub repository for Jobia";
    aboutText2.textContent =
      "At the heart of our mission lies the aspiration to bridge the aspirations of job seekers with the achievements of employers. We understand that finding the right job or the right talent can be a transformative experience, influencing not only careers but entire lives. Our platform is designed to facilitate this transformative journey, providing a dynamic space where dreams are nurtured, and goals are achieved.";
    aboutText3.textContent =
      "For job seekers, Jobia is more than just a platform; it's a supportive partner in navigating the path to success. Our user-friendly interface, advanced search algorithms, and comprehensive job listings empower individuals to explore opportunities that align with their skills, passions, and career goals. From entry-level positions to executive roles, we cater to diverse needs, ensuring that every user finds a space to thrive.";
    aboutText4.textContent =
      "In the fast-paced world of employment, innovation and adaptability are paramount. At Jobia, we stay ahead of the curve, incorporating the latest technologies and trends to enhance the user experience. Our continuous commitment to improvement means that our platform evolves alongside the ever-changing job market, providing our users with the tools they need to stay competitive.";
    aboutText5.textContent =
      "Whether you are a job seeker embarking on a new career chapter or an employer seeking exceptional talent, Jobia invites you to join us on this journey. Your success is our mission, and we are committed to creating a future where every individual finds their dream job, and every organization discovers their ideal team.";

    aboutText1.appendChild(aboutLink1);
    aboutDiv1.appendChild(aboutTitle1);
    aboutDiv1.appendChild(aboutText1);
    aboutDiv2.appendChild(aboutTitle2);
    aboutDiv2.appendChild(aboutText2);
    aboutDiv3.appendChild(aboutTitle3);
    aboutDiv3.appendChild(aboutText3);
    aboutDiv4.appendChild(aboutTitle4);
    aboutDiv4.appendChild(aboutText4);
    aboutDiv5.appendChild(aboutTitle5);
    aboutDiv5.appendChild(aboutText5);

    aboutDivs.appendChild(aboutDiv1);
    aboutDivs.appendChild(arrowSVG("small"));
    aboutDivs.appendChild(aboutDiv2);
    aboutDivs.appendChild(arrowSVG("small"));
    aboutDivs.appendChild(aboutDiv3);
    aboutDivs.appendChild(arrowSVG("small"));
    aboutDivs.appendChild(aboutDiv4);
    aboutDivs.appendChild(arrowSVG("small"));
    aboutDivs.appendChild(aboutDiv5);
    aboutDivs.appendChild(arrowSVG("hidden"));
  }

  function createNavbar() {
    //Main Elements Creation
    const globalNavbarContainer = document.getElementById(
      "global-navbar-container"
    );
    const privateNavbarContainer = document.getElementById(
      "private-navbar-container"
    );

    // Creation of global navbar elements
    globalNavbarContainer.classList.add("left");
    const globalNav = document.createElement("nav");
    const globalUl = document.createElement("ul");

    // Global navbar buttons
    const globalNavbarItems = ["Home", "Jobs"];

    // Creation of list items & list append for global navbar
    globalNavbarItems.forEach((itemName) => {
      const li = document.createElement("li");
      const liA = document.createElement("a");
      liA.textContent = itemName;
      if (itemName == "Home") {
        liA.href = `/index.html`;
      } else {
        liA.href = `/${itemName.toLowerCase().replace(/\s+/g, "-")}.html`;
      }
      li.classList.add("hover-background");
      li.appendChild(liA);
      globalUl.appendChild(li);
    });

    // Append global ul to global nav, and global nav to the global container
    globalNav.appendChild(globalUl);
    globalNavbarContainer.appendChild(globalNav);

    // Creation of private navbar elements
    privateNavbarContainer.classList.add("right");
    const privateNav = document.createElement("nav");
    const privateUl = document.createElement("ul");

    // Private navbar buttons
    const privateNavbarItems = ["About Us"];

    // Creation of list items & list append for private navbar
    privateNavbarItems.forEach((itemName) => {
      const li = document.createElement("li");
      const liA = document.createElement("a");
      liA.textContent = itemName;
      liA.href = `/${itemName.toLowerCase().replace(/\s+/g, "-")}.html`; //Replace spaces (/\s+/g) with dashes, in case the itemName contains it
      li.appendChild(liA);
      privateUl.appendChild(li);
    });

    // Append private ul to private nav, and private nav to the private container
    privateNav.appendChild(privateUl);
    privateNavbarContainer.appendChild(privateNav);
  }

  function addFooterText(text) {
    const footerDiv = document.getElementById("footer");
    const footerText = document.createElement("h5");
    footerText.textContent = text;
    footerDiv.appendChild(footerText);
  }

  function arrowSVG(className) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("data-name", "Layer 1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 16 16");

    const path1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path1.setAttribute("d", "M2.38 7h12l-6 7-6-7");

    const path2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path2.setAttribute("d", "M10.37 8.11h-4v-6h4");

    svg.appendChild(path1);
    svg.appendChild(path2);

    svg.classList.add(className);

    return svg;
  }
});
