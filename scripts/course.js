const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Programming Building Blocks",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development I",
    credits: 2,
    completed: false,
  },
];

const courseContainer = document.querySelector("#courseContainer");
const totalCredits = document.querySelector("#totalCredits");

function displayCourses(courseList) {
  courseContainer.innerHTML = "";

  courseList.forEach((course) => {
    const card = document.createElement("div");
    card.classList.add("course-card");

    if (course.completed) {
      card.classList.add("completed");
    }

    card.textContent = `${course.subject} ${course.number}`;
    courseContainer.appendChild(card);
  });

  const credits = courseList.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = `Total Credits: ${credits}`;
}

document.querySelector("#allCourses").addEventListener("click", () => {
  displayCourses(courses);
});

document.querySelector("#wddCourses").addEventListener("click", () => {
  const wddCourses = courses.filter((course) => course.subject === "WDD");
  displayCourses(wddCourses);
});

document.querySelector("#cseCourses").addEventListener("click", () => {
  const cseCourses = courses.filter((course) => course.subject === "CSE");
  displayCourses(cseCourses);
});

displayCourses(courses);
