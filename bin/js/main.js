var main;
(function (main) {
    function ini() {
        data.getPeliculas("marvel", () => {
            joinVideos();
        });
        let _iconoSearch = d3.select(".iconoSearch");
        let _inputSearch = d3.select(".inputSearch");
        _iconoSearch.on("click", () => {
            let txtValue = _inputSearch.property("value");
            txtValue = txtValue.trim();
            if (txtValue.length > 0) {
                data.getPeliculas(txtValue, () => {
                    joinVideos();
                });
            }
            else {
                alert("Ingrese un titulo");
            }
        });
    }
    main.ini = ini;
    function joinVideos() {
        let arrayVideos = Array.from(data.collPeliculas.values());
        let joinVideos = d3.select(".paint").selectAll(".videoOMDB").data(arrayVideos, (d) => d.imdbID);
        joinVideos.exit().remove();
        let divVideoOMDB = joinVideos.enter().append("div")
            .classed("videoOMDB", true);
        divVideoOMDB.append("text")
            .classed("videoOMDBTitle", true);
        divVideoOMDB.append("img")
            .classed("videoOMDBImagen", true);
        let mergeVideoOMDB = divVideoOMDB.merge(joinVideos);
        mergeVideoOMDB.each(function (d, i) {
            let _divVideo = d3.select(this);
            _divVideo.style("left", (i * 400) + "px");
            _divVideo.select(".videoOMDBImagen").attr("src", d.Poster);
            _divVideo.select(".videoOMDBTitle").text(d.Title);
        });
    }
})(main || (main = {}));
let _main = main.ini();
