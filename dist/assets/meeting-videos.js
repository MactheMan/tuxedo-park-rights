// Load a YouTube player only after the visitor chooses an excerpt.
// Without JavaScript, each thumbnail opens its corresponding YouTube video.
document.addEventListener('click', function (event) {
  const link = event.target.closest('a[data-video-id]');
  if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const id = link.dataset.videoId;
  if (!/^[\w-]{11}$/.test(id)) return;
  event.preventDefault();
  const frame = document.createElement('iframe');
  frame.className = 'mv-player';
  frame.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
  frame.title = link.getAttribute('aria-label');
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  frame.allowFullscreen = true;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  link.replaceWith(frame);
  frame.focus();
});
