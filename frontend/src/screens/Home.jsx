import React, { useContext, useState,useEffect} from 'react'
import axios from "../config/axios"
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';

const Home = () => {

const [isModalOpen,setIsModalOpen]=useState(false);
const [projectName,setProjectName]=useState("");
const [ project, setProject ] = useState([])
const navigate=useNavigate();
const {user}=useContext(UserContext)

function createProject(e){
  e.preventDefault();
  axios.post('/projects/create',{name:projectName}).then((res)=>{
    console.log(res);
    setIsModalOpen(false);
  }).catch((err)=>{
    console.log(err)
  })
}



useEffect(() => {
  axios.get('/projects/all').then((res) => {
      setProject(res.data.projects)

  }).catch(err => {
      console.log(err)
  })

  console.log(`user is ${user}`)

}, [])

  return (
    <main className='p-4'>
    <div className="projects flex flex-wrap gap-3">
        <button
            onClick={() => setIsModalOpen(true)}
            className="project p-4 border border-slate-300 rounded-md  bg-emerald-200 hover:bg-emerald-300">
            New Project
            <i className="ri-link ml-2"></i>
        </button>

        {
                    project.map((project) => (
                        <div key={project._id}
                            onClick={() => {
                                navigate(`/project`, {
                                    state: { project }
                                })
                            }}
                            className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 bg-blue-300 hover:bg-blue-400">
                            <h2
                                className='font-semibold'
                            >{project.name}</h2>

                            <div className="flex gap-2">
                                <p> <small> <i className="ri-user-line"></i> Collaborators</small> :</p>
                                {project.users.length}
                            </div>

                        </div>
                    ))
                }


    </div>

    {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                <h2 className="text-xl mb-4">Create New Project</h2>
                <form onSubmit={createProject}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Project Name</label>
                        <input
                            onChange={(e) => setProjectName(e.target.value)}
                            value={projectName}
                            type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )}


</main>
  )
}

export default Home