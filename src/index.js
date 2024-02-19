let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


document.addEventListener("DOMContentLoaded", function() {
  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      data.forEach(function (e) {
        let div = document.createElement("div");
        div.classList.add("card");
        let h2 = document.createElement("h2");
        h2.textContent = e.name;
        let p = document.createElement("p");
        p.textContent = `${e.likes} likes`;
        let img = document.createElement("img");
        img.src = e.image;
        img.classList.add("toy-avatar");
        let btn = document.createElement("button");
        btn.classList.add("like-btn");
        btn.id = e.id;
        btn.textContent = "Like ❤️";
        btn.addEventListener("click", likedToy);
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(img);
        div.appendChild(btn);
        document.querySelector("#toy-collection").appendChild(div);
      })

    })
})

let form = document.querySelector("form");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  let name = e.target[0].value;
  let imgURl = e.target[1].value;
  
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": imgURl,
      "likes": 0
    })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let div = document.createElement("div");
        div.classList.add("card");
        let h2 = document.createElement("h2");
        h2.textContent = data.name;
        let p = document.createElement("p");
        p.textContent = `${data.likes} likes`;
        let img = document.createElement("img");
        img.src = data.image;
        img.classList.add("toy-avatar");
        let btn = document.createElement("button");
        btn.classList.add("like-btn");
        btn.id = data.id;
        btn.textContent = "Like ❤️";
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(img);
        div.appendChild(btn);
        document.querySelector("#toy-collection").appendChild(div);
        alert("Toy Added!")
    })
    .catch(function (error) {
      alert("...something went wrong");
      console.log(error.message);
    })
    form.reset();
})

function likedToy(e) {
  let targetId = e.target.id;
  let likes = parseInt(e.target.parentNode.querySelector("p").textContent);
  likes = likes + 1;

  fetch(`http://localhost:3000/toys/${targetId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": likes
    })
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    e.target.parentNode.querySelector("p").textContent = `${data.likes} likes`;
  })
}

