import React from 'react'

const Footer = () => {
  return (
    <div className='fixed bottom-0 p-2 w-full  bg-gray-800'>
        
      <ul className="flex gap-3 justify-center">
                <li>
                    <a
                        href="https://github.com/vineet112111"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-green-400 transition-all"
                    >
                        GitHub
                    </a>
                </li>
                <li >
                    <a
                        href="https://www.linkedin.com/in/vineet-yadav-68059533a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-green-400 transition-all"
                    >
                        LinkedIn
                    </a>
                </li>
                <li >
                    <a
                        href="https://www.instagram.com/vineet___alvi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-green-400 transition-all"
                    >
                        Instagram
                    </a>
                </li>
            </ul>
    </div>
  );
};

export default Footer
