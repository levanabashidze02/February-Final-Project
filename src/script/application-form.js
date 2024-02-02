import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

document.addEventListener("DOMContentLoaded", function () {
  fetch("/src/Fake API/db.json")
    .then((res) => res.json())
    .then((data) => {
      const jobs = data.jobs;

      const urlParams = new URLSearchParams(window.location.search);
      const jobID = urlParams.get("jobID");

      var selectedJob = jobs.find((job) => job.id == jobID);

      if (selectedJob) {
        const formDiv = document.createElement("div");
        formDiv.classList.add("application-form");

        const preTextDiv = document.createElement("div");
        preTextDiv.classList.add("pre-text-div");
        const preText = document.createElement("h4");
        preText.classList.add("pre-text");
        preText.textContent =
          "Please, fill in all the fields. Otherwise, we won't be able to review your application.";
        preTextDiv.appendChild(preText);

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("name-div");
        const jobNameInput = createFormInput(
          "Job Name",
          `${selectedJob.title} in ${selectedJob.location} [Job Code ${selectedJob.id}]`,
          true
        );
        var nameInput = createFormInput("Name");
        var surnameInput = createFormInput("Surname");
        var emailInput = createFormInput("Email", "", false, "email");
        emailInput.autocomplete = "on";
        var birthDateInput = createFormInput("Birth Date", "", false, "date");
        var resumeInput = createFormInput(
          "Upload Your Resume",
          "",
          false,
          "file"
        );

        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit Form";
        submitButton.classList.add("apply-button");
        submitButton.addEventListener("click", () =>
          submitForm(
            selectedJob,
            nameInput,
            surnameInput,
            emailInput,
            birthDateInput,
            resumeInput
          )
        );

        nameDiv.appendChild(nameInput);
        nameDiv.appendChild(surnameInput);
        nameDiv.appendChild(emailInput);
        nameDiv.appendChild(birthDateInput);
        formDiv.appendChild(preTextDiv);
        formDiv.appendChild(jobNameInput);
        formDiv.appendChild(nameDiv);
        formDiv.appendChild(resumeInput);
        formDiv.appendChild(submitButton);

        document.body.appendChild(formDiv);
      } else {
        alert("Job not found!");
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  createNavbar();

  const firebaseConfig = {
    apiKey: "AIzaSyDDochm0r7pkYtN0iwOirgNyJkJ4GZptuQ",

    authDomain: "jobia-gita.firebaseapp.com",

    databaseURL:
      "https://jobia-gita-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "jobia-gita",

    storageBucket: "jobia-gita.appspot.com",

    messagingSenderId: "566134335172",

    appId: "1:566134335172:web:a5954b088e4136787c0b91",

    measurementId: "G-TLBE2FJDE5",
  };

  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  const database = getDatabase(app);

  function createFormInput(label, value = "", disabled = false, type = "text") {
    const labelElement = document.createElement("label");
    labelElement.textContent = `${label}:`;

    const inputElement = document.createElement("input");
    inputElement.type = type;
    inputElement.value = value;
    inputElement.disabled = disabled;

    const formElement = document.createElement("div");
    formElement.appendChild(labelElement);
    formElement.appendChild(inputElement);

    return formElement;
  }

  function submitForm(
    selectedJob,
    nameInput,
    surnameInput,
    emailInput,
    birthDateInput,
    resumeInput
  ) {
    const applicationsRef = ref(database, "applications");

    const formData = {
      jobId: selectedJob.id,
      name: nameInput.querySelector("input").value,
      surname: surnameInput.querySelector("input").value,
      email: emailInput.querySelector("input").value,
      birthDate: birthDateInput.querySelector("input").value,
      resume: resumeInput.querySelector("input").value,
    };

    // Push the form data to the database
    push(applicationsRef, formData)
      .then(() => {
        alert("Form submitted!");
        window.location.href = "/index.html";
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
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
});
