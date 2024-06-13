import axios from "axios";
import  { useState } from "react";
import {Navigate} from "react-router-dom"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function CreatePost() {
  const[title,setTitle]=useState('')
  const[summery,setSummery]=useState('')
  const[content,setContent]=useState('')
  const[files,setFile]=useState('')
  const[redirect,setRedirect]=useState(false)
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

const  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
 async function createPost(ev)
  {
    ev.preventDefault();
    const data=new FormData()
    data.set('title',title)
    data.set('summery',summery)
    data.set('content',content)
    data.set('file',files[0])
   const response=await axios.post("http://localhost:5000/api/createPost",data,{
    withCredentials:true,
    Credentials:"include"
   })
  if(response.statusText=="OK")
  {
    setRedirect(true)
  }

  }
  if(redirect)
    {
      return <Navigate to="/" />
    }
  return (
    <form onSubmit={createPost} className="flex flex-col gap-[15px] max-w-[700px] max-h-[800px] my-0 mx-auto">
      <input
        type="text"
        placeholder="title"
        className="block mb-[5px] w-[100%] py-[5px] px-[7px]"
        value={title}
        onChange={ev=>setTitle(ev.target.value)}
      />
      <input
        type="text"
        placeholder="summery"
        className="block mb-[5px] w-[100%] p-[5px]"
        value={summery}
        onChange={ev=>setSummery(ev.target.value)}
      />
      <input
        type="file"
        className="block mb-[5px] w-[100%] py-[5px] px-[7px]"
       
        onChange={ev=>setFile(ev.target.files)}
      />
      <ReactQuill className="mb-[5px] w-[100%]  py-[5px] px-[7px]"
      value={content}
      modules={modules}
      formats={formats}
      onChange={newValue=>setContent(newValue)}
      
      />
      <button className="w-[100%]  mt-[10px] block bg-[#555] text-[#FFF] rounded-[5px] py-[7px]">
        Create Post
      </button>
    </form>
  );
}

export default CreatePost;
