import React, { useState, useEffect, Fragment } from "react";
import Cards from "./card";
import { heroCharacters, searchCharacter } from "../../services/services";
import MyTeam from "./myTeam";
import SearchBar from "./searchBar";
import Header from "../header/header";
import Loader from "../loader/loader";

const MainPage = () => {
  const [heroes, setHeroes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [query, setQuery] = useState("");

  const addSelectedHero = (name, img, heroId) => {
    const newSelectedHero = { name, img, heroId };

    let exist = selectedHeroes.filter((e) => e.heroId === heroId);
    if (exist && exist.length > 0) {
      alert("You have already added a selected hero");
    } else {
      setSelectedHeroes([...selectedHeroes, newSelectedHero]);
      localStorage.setItem(
        "myTeam",
        JSON.stringify([...selectedHeroes, newSelectedHero])
      );
    }
  };

  const deleteSelectedHero = (url) => {
    localStorage.removeItem("myTeam");
    let arr = selectedHeroes.filter((e) => e.img !== url);
    setSelectedHeroes(arr);
    localStorage.setItem("myTeam", JSON.stringify(arr));
  };

  useEffect(() => {
    if (query === "") {
      heroCharacters().then((res) => {
        setHeroes(res.data.results);
        setLoading(false);
        if (!!localStorage.getItem("myTeam")) {
          setSelectedHeroes(JSON.parse(localStorage.getItem("myTeam")));
        }
      });
    } else {
      searchCharacter(query).then((result) => {
        setHeroes(result.data.results);
        setLoading(false);
      });
    }
  }, [query]);

  if (heroes.length > 0) {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">
                  <SearchBar search={(q) => setQuery(q)} />
                </div>
              </div>
              <div className="row">
                <Cards items={heroes} onSelect={addSelectedHero} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-12 text-center">
                  <h3>MY TEAM</h3>
                </div>
              </div>
              {selectedHeroes.map((hero, index) => {
                return (
                  <MyTeam
                    key={index}
                    img={hero.img}
                    name={hero.name}
                    deleted={deleteSelectedHero}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Header />
        <SearchBar search={(q) => setQuery(q)} />
        <Loader />
      </Fragment>
    );
  }
};
export default MainPage;
