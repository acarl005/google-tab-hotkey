const TAB_KEY = 9

let searchResults
let activeIndex = -1

$(document).ready(() => {
  $(document).on('keydown', e => {
    // do nothing if this isn't the TAB key being pressed
    if (e.keyCode !== TAB_KEY) {
      return
    }

    e.preventDefault()

    // get the search result items from the DOM if we haven't already
    searchResults = searchResults || $('#links .result.results_links_deep').not('[id^=rrd]')

    // see if we are going forward or backward
    if (e.shiftKey) {
      activeIndex = Math.max(activeIndex - 1, -1)
    } else {
      activeIndex = Math.min(activeIndex + 1, searchResults.length)
    }

    // find the next search result to focus
    // focus the search query input bar if we go all the way back to the very beginning
    if (activeIndex === -1) {
      const queryInput = $('input#search_form_input')
      queryInput.focus()
    } else if (activeIndex === searchResults.length) {
      const nextButton = $('a.result--more__btn')
      nextButton.focus()
    } else {
      const targetElement = searchResults[activeIndex]
      const targetLink = $(targetElement).find('a.result__a')
      targetLink.focus()
    }
  })
})

