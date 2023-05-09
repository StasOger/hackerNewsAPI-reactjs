import { useState, useEffect } from "react"
import React from "react";
import { BrowserRouter as Router, Route, Routes, ReactRouterDOM, Link, Outlet, useNavigate } from "react-router-dom";
import Item from "./Item";

export default function FetchNews() {

  
  const [stories, setStories] = useState([])
  const [storiess, setStoriess] = useState([])
  const [query, setQuery] = useState("programming")
  const [isLoading, setIsLoading] = useState(true) // loading state
  // const useNavigate = ReactRouterDOM.useNavigate;
  const navigate = useNavigate();

  // const useNavigate = ReactRouterDOM.useNavigate;
  // const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    const fetchNews = async () => {

      const api_url_newstories = await 
      fetch (
      "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
      )
      const idStories = await api_url_newstories.json();
      
      var step;
          // выбираем 100 новых новостей
          for (step = 0; step < 100; step++) {
              // Открываем страницу новости
              const api_urlStory = await
              fetch (
              `https://hacker-news.firebaseio.com/v0/item/${idStories[step]}.json?print=pretty"`
              )
              const story = await api_urlStory.json();
              if (story != null){
                stories.push(story); 
              }
              // setStories(story);
              
          } 

          setStoriess(stories);
    }

    fetchNews()
    setIsLoading(false)
  }, [query])

  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.reload();
  }

  return (
    <>
      <main>
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-white border border-gray-700 lg:text-xl py-2 px-6 rounded lg:pb-3 text-gray-700 hover:bg-transparent transition-all duration-150"
                    >
                      Reload
                    </button>
            <section className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 container mx-auto lg:max-w-4xl">
              {
                storiess.flatMap((item) => {

                const { by, id,  time, title, url, descendants } = item

                // конвертируем дату из long в date
                let date = new Date(time*1000);
                let options = { weekday: 'long', day: 'numeric', year: 'numeric', month: 'long' };
                

                return (
                  <button
                        onClick={async event => { navigate(`/Item/${id}`); }}
                          >
                     
                    
                    <article
                      key={id}
                      className="bg-gray-800 rounded p-3 transition-all duration-150"
                    >
                    <h3 className="font-bold text-white text-lg mb-3">
                      {title}
                    </h3>      
                    <article className="flex items-center justify-between">
                      <p className="text-gray-600">
                        By <em>{by}</em>
                      </p>
                      <p className="text-gray-600">
                      Comments: {descendants}
                      </p>
                    </article>
                    <p className="text-gray-400 mt-10">
                      {date.toLocaleDateString("en-US", options)}
                    </p>
                    </article>
                    <Outlet />
                  </button>
                )
              })}
            </section>
          </>
        )}
      </main>
    </>
  )
}