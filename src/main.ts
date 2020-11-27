namespace main {
    export function ini(): void {
        data.getPeliculas("marvel", () => {
            joinVideos();
        });

        let _iconoSearch = d3.select(".iconoSearch");
        let _inputSearch = d3.select(".inputSearch");

        _iconoSearch.on("click", () => {
            let txtValue: string = _inputSearch.property("value");
            txtValue = txtValue.trim();
            if (txtValue.length > 0) {
                data.getPeliculas(txtValue, () => {
                    joinVideos();
                });
            } else {
                alert("Ingrese un titulo");
            }

        })
    }

    function joinVideos(): void {
        let arrayVideos = Array.from(data.collPeliculas.values());
        let joinVideos = d3.select(".paint").selectAll(".videoOMDB").data(arrayVideos, (d: data.iVideo) => d.imdbID);
        joinVideos.exit().remove();

        let divVideoOMDB = joinVideos.enter().append("div")
            .classed("videoOMDB", true);

        divVideoOMDB.append("text")
            .classed("videoOMDBTitle", true);

        divVideoOMDB.append("img")
            .classed("videoOMDBImagen", true);

        let mergeVideoOMDB = divVideoOMDB.merge(<any>joinVideos);

        mergeVideoOMDB.each(function (d: data.iVideo, i: number) {
            let _divVideo = d3.select(this);

            _divVideo.style("left", (i * 400) + "px");

            _divVideo.select(".videoOMDBImagen").attr("src", d.Poster);
            _divVideo.select(".videoOMDBTitle").text(d.Title);
        });
    }
}

let _main = main.ini();