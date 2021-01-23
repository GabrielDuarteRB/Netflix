import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow.js'
import FeaturedMovie from './components/FeaturedMovie.js'
import Header from './components/Header.js'

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)
  
  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      //Pegando filme destaque
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].item.results.length -1))
      let chosen = originals[0].item.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }
  
    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])
  
  return(
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData && 
      <FeaturedMovie item={featuredData} />
      }
      
      <section className="lists">
        {movieList.map((item, key)=> (
            <MovieRow key={key} title={item.title} items={item.item}/>
            ))
          
        }
      </section>

      <footer>
        Feito por Gabriel Duarte!<br />
        Direitos de imagem para Netflix <br/>
        Dados pegos do site themoviedb.org
      </footer>

      {
        movieList.length <= 0 &&
        <div className="loading">
          <img src="https://i.pinimg.com/originals/f9/0f/76/f90f7689233948005f465d98ead56d44.gif" />
        </div>
      }
    </div>
  )
}