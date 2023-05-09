import { useState, useEffect } from "react"
import { BrowserRouter as Router,  Link, Outlet, useNavigate } from "react-router-dom";


function Item() {

// достаем из url id новости 
  const currentUrl = window.location.href;
  const localhost3000 = "http://localhost:3000/Item/"
  const itemId = currentUrl.replace(localhost3000, "")
  let by = "";

  
  const [itemGet, setItem] = useState([])

  const [comments, setCooments] = useState([])

  
  // const [itemm, setItemm] = useState([])
  const [queryy, setQueryy] = useState("programming")
  const [isLoading, setIsLoadingg] = useState(true) // loading state
  // const useNavigate = ReactRouterDOM.useNavigate;
  const navigate = useNavigate();

  // const useNavigate = ReactRouterDOM.useNavigate;
  // const navigate = useNavigate();

  useEffect(() => {
    setIsLoadingg(true)
    const fetchStory = async () => {
      const api_story_id = await 
      fetch (`https://hacker-news.firebaseio.com/v0/item/${itemId}.json?print=pretty`)
      const storyInfo = await api_story_id.json()

      setItem(storyInfo)
      
      var step;
      
      for (step = 0; step < storyInfo.descendants; step++) {
        const api_story_id = await 
        fetch (`https://hacker-news.firebaseio.com/v0/item/${storyInfo.kids[step]}.json?print=pretty`)
        const commentInfo = await api_story_id.json()
        if (commentInfo != null){
          console.log(commentInfo)
          setCooments(commentInfo)
        }
      }
      
    }

    fetchStory()
    // setItemm(itemGett)
    // setCoomentss(comments)
    setIsLoadingg(false)
  }, [queryy]);

  const author = itemGet.by; 
  const id = itemGet.id; 
  const descendants = itemGet.descendants; 
  const title = itemGet.title; 
  const url = itemGet.url; 
  const time = itemGet.time; 
  
  const commentId = comments.id;
  const commentBy = comments.by; 
  const commentText = comments.text; 

  // конвертируем дату из long в date
  let date = new Date(time*1000);
  let options = { weekday: 'long', day: 'numeric', year: 'numeric', month: 'long' };
  
  return <div>
                    <article
                          key={id}
                          className="bg-gray-800 rounded p-3 transition-all duration-150">
                        <Link to="/">
                          <h3 className="border-b font-bolder text-white text-xl mb-3">Home</h3>
                        </Link>
                        <Outlet />
                      
                        <h3 className="font-bold text-white text-lg mb-3">
                          {title}
                        </h3> 
        
                        <article className="flex items-center justify-between">
                          <p className="text-gray-600">
                            By <em>{author}</em>
                          </p>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopenner noreferrer"
                            className="border-b border-gray-700 text-gray-600 text-lg hover:text-gray-400 hover:border-gray-400"
                          >
                            Link
                          </a>
                    
                    </article>
                    <p className="text-gray-400 mt-10">
                      {date.toLocaleDateString("en-US", options)}
                    </p>
                    <p className="text-gray-400 mt-10">
                      Comments: {descendants}
                    </p>
                  </article> 
                  {
                      commentId &&
                        (
                              <div className=" gap-5 p-5 md:grid-cols-2 container mx-auto lg:max-w-4xl">
                              
                              <article
                                key={commentId}
                                className="bg-gray-800 rounded p-3 transition-all duration-150"
                              >
                              <h4 className="font-bold text-white  mb-3">
                                {commentText}
                              </h4>      
                              <article className="flex items-center justify-between">
                                <p className="text-gray-600">
                                  By <em>{commentBy}</em>
                                </p>
                              </article>
                                
                              <p className="text-gray-400 mt-10">
                                {date.toLocaleDateString("en-US", options)}
                              </p>
                              </article>
                            </div>
                        )
                  }
    </div>   
}

export default Item;
































// 