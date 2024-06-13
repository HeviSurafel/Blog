import {formatISO9075} from "date-fns"
import "./App.css"
import { Link } from "react-router-dom"
function Post({_id,title,summery,cover,content,createdAt,author}) {
  return (
    <div className="posts">
        <div>
         <Link to={`/post/${_id}`}>
         <img
            className="max-w-[100%]  h-auto"
            src={'http://localhost:5000/'+cover}
            alt="no image"
          />
         </Link>
        </div>
        <div>
       <Link to={`/post/${_id}`}>   <h2 className="m-0 text-[1.8rem]">{title}</h2></Link>
          <p className="my-[6px] mx-0 text-[#888] text-[0.7rem] font-bold flex gap-3">
            <a href="" className="text-[#333]">{author.username}</a>
            <time>{formatISO9075(createdAt)}</time>
          </p>
          <p className="my-[10px] leading-[1.5rem]">
          {summery}
            </p>
        </div>
      </div>  
  )
}

export default Post