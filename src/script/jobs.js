document.addEventListener("DOMContentLoaded", function () {
  fetch("/src/Fake API/db.json")
    .then((res) => res.json())
    .then(topJobSearch)
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  createNavbar();
  createTitle("Available Jobs");
  addFooterText("© Levan Abashidze, 2024");

  function topJobSearch(data) {
    const jobs = data.jobs;

    const sortedJobs = jobs.sort((a, b) => b.id - a.id);

    const jobsDiv = document.getElementById("all-jobs");

    sortedJobs.forEach((job, index) => {
      const jobDiv = document.createElement("div");
      jobDiv.classList.add("job-box");

      const jobTitle = document.createElement("h3");
      jobTitle.classList.add("job-title");
      jobTitle.textContent = job.title;

      const jobLocation = document.createElement("p");
      jobLocation.classList.add("job-location");
      jobLocation.textContent = `Location: ${job.location}`;

      const jobLogo = document.createElement("img");
      jobLogo.classList.add("job-logo");
      jobLogo.src = job.logo;

      const jobSalary = document.createElement("p");
      jobSalary.classList.add("job-salary");
      if (job.salary <= 50000) {
        jobSalary.classList.add("lowSalary");
      } else if (job.salary < 65000) {
        jobSalary.classList.add("midSalary");
      } else {
        jobSalary.classList.add("highSalary");
      }
      jobSalary.innerHTML = `Salary: $${(
        job.salary / 1000
      ).toString()}k /<span class="month"> year</span>`;

      const buttonsDiv = document.createElement("div");
      buttonsDiv.classList.add("buttons-div");

      const applyButton = document.createElement("button");
      applyButton.textContent = "Apply Now";
      applyButton.classList.add("apply-button");
      applyButton.addEventListener("click", () => openApplicationForm(job));

      const descriptionButton = document.createElement("button");
      descriptionButton.textContent = "Show Full Details";
      descriptionButton.classList.add("description-button");
      descriptionButton.addEventListener("click", () => showDescription(job));

      buttonsDiv.appendChild(applyButton);
      buttonsDiv.appendChild(descriptionButton);
      jobDiv.appendChild(jobLogo);
      jobDiv.appendChild(jobTitle);
      jobDiv.appendChild(jobLocation);
      jobDiv.appendChild(jobSalary);
      jobDiv.appendChild(buttonsDiv);

      jobsDiv.appendChild(jobDiv);
    });
  }

  function createTitle(text) {
    const jobsDiv = document.getElementById("jobs-title");
    const topJobsHeading = document.createElement("h1");
    topJobsHeading.textContent = text;
    jobsDiv.appendChild(topJobsHeading);
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

  function openApplicationForm(job) {
    const formPageUrl = `application_form.html?jobID=${job.id}`;

    window.location.href = formPageUrl;
  }

  function showDescription(job) {
    const descriptionPageUrl = `description.html?jobID=${job.id}`;

    window.location.href = descriptionPageUrl;
  }

  function addFooterText(text) {
    const footerDiv = document.getElementById("footer");
    const footerText = document.createElement("h5");
    footerText.textContent = text;
    footerDiv.appendChild(footerText);
  }
});
