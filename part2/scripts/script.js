localStorage.setItem('unit_id', 'unit1'); // default value

function getUnitID(button_id) {
    localStorage.setItem('unit_id', button_id);
    localStorage.setItem('is_quiz', "false");
}

const welcomeSlogan = document.getElementById('welcome-cover');
const guide = document.getElementById('guide');

welcomeSlogan.addEventListener("mouseover", ev => {
    guide.style.display = "block";
})

welcomeSlogan.addEventListener("mouseout", ev => {
    guide.style.display = "none";
})
