namespace data {

    export interface iResponse {
        Response: string;
        Search: Array<iVideo>;
        totalResults: string;
    }

    export interface iVideo {
        Title: string;
        Year: string;
        imdbID: string;
        Type: string;
        Poster: string;
    }

    export var collPeliculas: Map<string, iVideo> = new Map();

    export function getPeliculas(titulo: string, _callBack: () => void) {
        collPeliculas = new Map();

        fetch("http://www.omdbapi.com/?s=" + titulo + "&apikey=5a586005")
            .then((response) => {
                response.json().then((value: iResponse) => {
                    if (value.Search.length > 0) {

                        for (let i = 0; i < value.Search.length; i++) {
                            let _video: iVideo = <iVideo>{};
                            _video.Poster = value.Search[i]["Poster"];
                            _video.Title = value.Search[i]["Title"];
                            _video.Type = value.Search[i]["Type"];
                            _video.Year = value.Search[i]["Year"];
                            _video.imdbID = value.Search[i]["imdbID"];

                            if (_video.Poster !== "N/A") {
                                collPeliculas.set(_video.imdbID, _video);
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

}