export function chooseTemplate(templates, locale){
  if (templates) {
    let template = templates.find(t => {
      return t.locale === locale
    })
    return template.url
  } else {
    return "https://raw.githubusercontent.com/co-demos/structure/master/pages-html/tools-fr.html"
  }
}