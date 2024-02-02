document.addEventListener("DOMContentLoaded", function () {
  fetch("/src/Fake API/db.json")
    .then((res) => res.json())
    .then((data) => {
      jobDetails(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  createNavbar();
  addFooterText("© Levan Abashidze, 2024");

  function jobDetails(data) {
    const jobs = data.jobs;

    const urlParams = new URLSearchParams(window.location.search);
    const jobID = urlParams.get("jobID");

    const selectedJob = jobs.find((job) => job.id == jobID);

    if (selectedJob) {
      const jobDetailsDiv = document.getElementById("full-description");
      jobDetailsDiv.classList.add("job-details");

      const jobLogoDiv = document.createElement("div");
      jobLogoDiv.classList.add("job-logo-div");

      const topJobTextDiv = document.createElement("div");
      topJobTextDiv.classList.add("top-job-text-div");

      const jobTextDiv = document.createElement("div");
      jobTextDiv.classList.add("job-text-div");

      const jobLogo = document.createElement("img");
      jobLogo.src = selectedJob.logo;
      jobLogo.classList.add("desc-logo");

      const jobId = document.createElement("div");
      jobId.textContent = `Job Code: ${selectedJob.id}`;
      jobId.classList.add("desc-id");

      const jobDescription = document.createElement("div");
      jobDescription.textContent = `We are looking for: ${selectedJob.description}`;
      jobDescription.classList.add("desc-desc");
      jobDescription.innerHTML += `<br><br>Salary: $${selectedJob.salary} / year`;

      const jobLocation = document.createElement("div");
      jobLocation.textContent = `🌍 ${selectedJob.location}`;
      jobLocation.classList.add("desc-location");

      const jobEmploymentType = document.createElement("div");
      jobEmploymentType.textContent = `Employment Type: ${selectedJob.employment_type}`;
      jobEmploymentType.classList.add("desc-type");

      const applyButton = document.createElement("button");
      applyButton.textContent = "Apply Now";
      applyButton.classList.add("apply-button");
      applyButton.addEventListener("click", () =>
        openApplicationForm(selectedJob)
      );

      jobLogoDiv.appendChild(jobLogo);
      topJobTextDiv.appendChild(jobLocation);
      topJobTextDiv.appendChild(jobId);
      topJobTextDiv.appendChild(jobEmploymentType);
      jobTextDiv.appendChild(topJobTextDiv);
      jobTextDiv.appendChild(jobLogoDiv);
      jobTextDiv.appendChild(jobDescription);
      jobTextDiv.appendChild(applyButton);
      jobDetailsDiv.appendChild(jobLogoDiv);
      jobDetailsDiv.appendChild(jobTextDiv);
    } else {
      alert("Job not found!");
      window.location.href = "index.html";
    }
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

  function addFooterText(text) {
    const footerDiv = document.getElementById("footer");
    const footerText = document.createElement("h5");
    footerText.textContent = text;
    footerDiv.appendChild(footerText);
  }
});
