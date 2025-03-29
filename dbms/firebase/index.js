const auth = firebase.auth();

// Elements
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const logoutBtn = document.getElementById('logout');

registerBtn.addEventListener('click', () => {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert('Registered!'))
    .catch(err => alert(err.message));
});

loginBtn.addEventListener('click', () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert('Logged in!'))
    .catch(err => alert(err.message));
});

logoutBtn.addEventListener('click', () => {
  auth.signOut();
});

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('auth-forms').style.display = 'none';
  } else {
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('auth-forms').style.display = 'block';
  }
});
