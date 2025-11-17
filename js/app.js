// Register helper for role comparison
Handlebars.registerHelper("eq", function (a, b) {
    return a === b;
});

// Load partial
fetch("templates/userCard.hbs")
  .then(res => res.text())
  .then(partial => {
      Handlebars.registerPartial("userCard", partial);
  });

// Load main template + data
Promise.all([
    fetch("templates/userList.hbs").then(r => r.text()),
    fetch("js/users.json").then(r => r.json())
]).then(([templateSource, userData]) => {
    
    const template = Handlebars.compile(templateSource);
    const html = template({ users: userData });

    document.getElementById("userContainer").innerHTML = html;
});

