export const downloadWebsiteHtml = async () => {
  const html = document.documentElement.outerHTML;
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'urnperiodic-studytools-website.html';
  link.rel = 'noopener';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
