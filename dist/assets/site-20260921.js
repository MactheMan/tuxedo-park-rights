"use strict";
let videoPage=0,recordPage=0;
function filterVideos(reset=true){if(reset)videoPage=0;const month=document.querySelector('#meeting-filter')?.value||'',q=(document.querySelector('#video-query')?.value||'').toLowerCase().trim();const els=[...document.querySelectorAll('.meeting-item')];const found=els.filter(el=>(!month||el.dataset.month===month)&&(!q||el.dataset.search.includes(q)));els.forEach(el=>el.hidden=true);found.slice(videoPage*6,videoPage*6+6).forEach(el=>el.hidden=false);document.querySelector('#video-count').textContent=found.length?'Showing '+(videoPage*6+1)+'–'+Math.min(videoPage*6+6,found.length)+' of '+found.length+' clips':'0 clips';document.querySelector('#video-empty').hidden=found.length!==0;document.querySelector('#video-prev').disabled=videoPage===0;document.querySelector('#video-next').disabled=(videoPage+1)*6>=found.length;resize()}
function filterRecords(reset=true){if(reset)recordPage=0;const topic=document.querySelector('#topic-filter')?.value||'',type=document.querySelector('#type-filter')?.value||'',q=(document.querySelector('#record-query')?.value||'').toLowerCase().trim();const els=[...document.querySelectorAll('.record-item')];const found=els.filter(el=>(!topic||el.dataset.topic===topic)&&(!type||el.dataset.type===type)&&(!q||el.dataset.search.includes(q)));els.forEach(el=>el.hidden=true);found.slice(recordPage*12,recordPage*12+12).forEach(el=>el.hidden=false);document.querySelector('#record-count').textContent=found.length?'Showing '+(recordPage*12+1)+'–'+Math.min(recordPage*12+12,found.length)+' of '+found.length+' records':'0 records';document.querySelector('#record-empty').hidden=found.length!==0;document.querySelector('#record-prev').disabled=recordPage===0;document.querySelector('#record-next').disabled=(recordPage+1)*12>=found.length;resize()}
for(const [id,action] of [['video-prev',()=>{videoPage--;filterVideos(false)}],['video-next',()=>{videoPage++;filterVideos(false)}],['record-prev',()=>{recordPage--;filterRecords(false)}],['record-next',()=>{recordPage++;filterRecords(false)}]])document.querySelector('#'+id)?.addEventListener('click',action);

document.querySelectorAll("#topic-filter,#type-filter,#record-query").forEach(el=>el.addEventListener("input",()=>filterRecords()));function resize(){};if(document.querySelector("#record-count"))filterRecords();

    function trackEvent(name, data) {
      if (typeof window.va === 'function') {
        window.va('event', { name: name, data: data || {} });
      }
    }

    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      const label = (link.querySelector('strong')?.textContent || link.textContent || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 200);

      const resolvedUrl = new URL(href, window.location.href);
      const isSiteDocument = resolvedUrl.origin === window.location.origin
        && resolvedUrl.pathname.startsWith('/documents/');
      const isContactBoardLink = resolvedUrl.origin === window.location.origin
        && resolvedUrl.pathname === '/participate'
        && resolvedUrl.hash === '#contact-board';

      if (isSiteDocument) {
        trackEvent('Document Open', {
          document: decodeURIComponent(resolvedUrl.pathname.split('/').pop()),
          label: label
        });
      } else if (isContactBoardLink) {
        trackEvent('Contact Board Click', { label: label });
      } else if (/^https?:\/\//.test(href) && !href.includes('tuxedoparkrights.org')) {
        trackEvent('External Link Click', {
          destination: new URL(href).hostname,
          label: label
        });
      }
    });

    document.getElementById('resident-email-form')?.addEventListener('submit', function (event) {
      event.preventDefault();

      const recipients = [
        'mcitrin@tuxedopark-ny.gov',
        'mlindsay@tuxedopark-ny.gov',
        'jscherer@tuxedopark-ny.gov',
        'mtinari@tuxedopark-ny.gov',
        'jturner@tuxedopark-ny.gov',
        'clerk@tuxedopark-ny.gov'
      ].join(',');
      const bccRecipient = 'mac4tux@gmail.com';

      const name = document.getElementById('resident-name').value.trim();
      const address = document.getElementById('resident-address').value.trim();
      const email = document.getElementById('resident-email').value.trim();
      const message = document.getElementById('resident-message').value.trim();
      const subject = 'Tuxedo Park resident comment concerning Chapter 51';
      const body = [
        message,
        '',
        'Respectfully,',
        name,
        address,
        email
      ].join('\n');

      trackEvent('Board Email Prepared', { destination: 'Village officials' });

      document.getElementById('email-status').textContent='Your email draft is opening. Review it and press Send in your email application. Nothing has been sent by this website.';
      window.location.href = 'mailto:' + recipients
        + '?bcc=' + encodeURIComponent(bccRecipient)
        + '&subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
    });
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
  frame.tabIndex=0;
  frame.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
  frame.title = link.getAttribute('aria-label');
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  frame.allowFullscreen = true;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  link.replaceWith(frame);
  frame.focus();
});

const legacyFragments={"/": {"august-meeting-videos": "/meetings/august-2026#videos", "september-17-meeting-record": "/meetings/september-2026#documents", "latest": "/updates", "archive": "/records", "september-16-police-response": "/records/police-foil-response-september-2026", "record": "/records/foil-appeal-september-15-2026", "september-13-record": "/records", "contact": "/participate#contact-board", "impact": "/#background", "action": "/participate#contact-board", "mailing-list": "/participate#mailing-list"}, "/meetings/september-2026": {"september-meeting-videos": "/meetings/september-2026#videos", "findings": "/meetings/september-2026#taxes", "mailing-list": "/participate#mailing-list"}};
const legacyTarget=legacyFragments[location.pathname]?.[location.hash.slice(1)];if(legacyTarget)location.replace(legacyTarget);
document.querySelectorAll(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>a.closest("details").removeAttribute("open")));
