var data;
(function (data) {
    data.collPeliculas = new Map();
    function getPeliculas(titulo, _callBack) {
        data.collPeliculas = new Map();
        fetch("http://www.omdbapi.com/?s=" + titulo + "&apikey=5a586005")
            .then((response) => {
            response.json().then((value) => {
                if (value.Search.length > 0) {
                    for (let i = 0; i < value.Search.length; i++) {
                        let _video = {};
                        _video.Poster = value.Search[i]["Poster"];
                        _video.Title = value.Search[i]["Title"];
                        _video.Type = value.Search[i]["Type"];
                        _video.Year = value.Search[i]["Year"];
                        _video.imdbID = value.Search[i]["imdbID"];
                        if (_video.Poster !== "N/A") {
                            data.collPeliculas.set(_video.imdbID, _video);
                        }
                    }
                }
                _callBack();
            }).catch((error) => {
                _callBack();
                console.log(error);
            });
        }).catch((error) => {
            _callBack();
            console.log(error);
        });
    }
    data.getPeliculas = getPeliculas;
})(data || (data = {}));
