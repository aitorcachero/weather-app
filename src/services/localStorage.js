function getItemLS() {
  const items = JSON.stringify(localStorage.getItem('lastsearchs'));
  return items ? JSON.parse(items) : [];
}

function setItemLS(data) {
  localStorage.setItem('lastsearchs', data.reverse());
}

export { setItemLS, getItemLS };
