const canvas = document.querySelector('canvas');
const buffer = canvas.cloneNode();
const master = document.createElement('img');
const output = document.createElement('img');

const workerBlob = new Blob([document.getElementById('worker').textContent]);
const workerBlobUrl = (window.URL || window.webkitURL).createObjectURL(workerBlob);
const worker = new Worker(workerBlobUrl);

const reload = () => {
  document.location.reload(true);
};

if (window !== window.top) {
  document.documentElement.className.classList.add('is-iframe');
}

worker.addEventListener('message', (e) => {
  output.setAttribute('src', e.data.result);
});

output.addEventListener('load', () => {
  canvas.getContext('2d').drawImage(output, 0, 0);

  // DANGER! DANGER!
  // worker.postMessage({ source: canvas.toDataURL('image/jpeg', 0.01) });
});

master.addEventListener('load', () => {
  buffer.getContext('2d').drawImage(master, 0, 0);

  worker.postMessage({ source: buffer.toDataURL('image/jpeg', 0.5) });
});

master.setAttribute('src', 'master.png');

document.addEventListener('click', reload);
document.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 32:
      reload();
      break;
    default:
      break;
  }
});
