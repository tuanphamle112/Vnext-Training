(function pageLoadReady (pageLoadReady) {
  pageLoadReady(window.jQuery, window, window.Rx)
})(function pageLoadReady ($, window, Rx) {
  $(pageSearchLoad)

  function pageSearchLoad () {
    var $inputTerm = $('input[type="text"]')
    var $results = $('.card-text')

    var keyup = Rx.Observable.fromEvent($inputTerm, 'keyup')
      .map(function (e) {
        return e.target.value
      })
      .filter(function (text) {
        return text.length > 2
      })
      .debounce(200)
      .distinctUntilChanged()

    var searcher = keyup.flatMapLatest(searchWikipedia)

    searcher.subscribe(
      function (data) {
        $results
          .empty()
          .append(data[1].map(function (d, index) {
            var abc = `<a href="${data[3][index]}">${d}</a><br>`
            return abc
          }))
      },
      function (error) {
        $results
          .empty()
          .text(error)
      }
    )

    function searchWikipedia (term) {
      return $.ajax({
        url: 'http://en.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {
          action: 'opensearch',
          format: 'json',
          search: term
        }
      }).promise()
    }
  }
})
