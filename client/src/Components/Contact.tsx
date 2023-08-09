import React, { useEffect, useState } from 'react'
import { getDocs } from 'firebase/firestore';
import { about } from '../firebase';
import Aos from 'aos';
import { About } from '../models';
import connect_to_database from '../mongodb';

interface Post{
  id : string;
  content: About;
}

const Contact = () => {

  const [contacts, setContacts] = useState<any[]>([]);
  const getPost = async () => {
    try {
      connect_to_database({collection:'about', setResponse:setContacts});
    } catch (error) {
      alert("there is an error");
    }
  };
  getPost();
  useEffect(() => {
    Aos.init();

  }, []);

  return (
    <form action="">
      <div className="flex flex-col p-1 items-center bg-white  w-full h-fit ">
        <span className="pt-24 text-5xl font-varela_round font-bold" >Contacts</span>
        <span className="h-1.5 w-24 mt-3 rounded bg-orange self-center"></span>
        <div className="flex flex-row flex-wrap mt-4 
            w-full h-fit  justify-between">
            
            <div className="flex flex-col bg-gray h-fit items-start 
            text-black w-full sm:w-1/2  p-2">
              <span className='text-3xl text-white'>Contact me</span>
              <span className="w-14 h-1 bg-orange my-2"></span>
              <div className="flex flex-row flex-wrap justify-between w-full ">
                <input type="text" placeholder='Name' className='w-full h-10 
                outline outline-1 outline-black hover:outline-yellow mb-5 p-3'
                />
                <input type="Email" placeholder='Email' className='w-full  h-10 
                outline outline-1 outline-black hover:outline-yellow mb-5 p-3'
                />
              </div>
              <input type="text" placeholder='Subject' className='w-full h-10 
                outline outline-1 outline-black hover:outline-yellow mb-5 p-3'
                />
              <textarea rows={10} placeholder='Enter your message' className='w-full h-10 
              outline outline-1 outline-black hover:outline-yellow mb-5 p-3'
              />
              <button type="button" className="bg-orange p-3 mb-3" disabled>
                Send message
                </button>
            </div>
            <div className=" text-black w-full sm:w-1/2 p-4 bg-orange-clair self-top ">
                {
                  contacts.map((contact:any)=>(
                    <div className="flex flex-col   w-full p-3 mt-3">
                    <div className="mb-10">📞 : {contact.phone}</div>
                    <div className="mb-10">✉️ : {contact.email}</div>
                    <div className="flex flex-row justify-around ">                      
                      {contact.network.map((item:any)=>(
                      <a href={item.link}> {item.name}
                        {/* <img src={item.src.src} className='w-12 h-12 rounded-full' alt=""/> */}
                      </a>
                    ))}
                    </div>
                    </div>
                  ))
                }
              
            </div>
        </div>        
      </div>
    </form>  
  )
}

export default Contact
