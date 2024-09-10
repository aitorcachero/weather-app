function getItemLS() {
  const items = JSON.stringify(localStorage.getItem('lastsearchs'));
  return items ? JSON.parse(items) : [];
}

function setItemLS(data) {
  localStorage.setItem('lastsearchs', data);
}

function removeItemLS() {
  localStorage.removeItem('lastsearchs');
}

export { setItemLS, getItemLS, removeItemLS };
