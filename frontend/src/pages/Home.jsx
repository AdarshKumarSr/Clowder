import React from 'react';
import '../assets/css/Home.css';
import '../assets/css/nav.css';
import '../assets/css/page.css';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';

// Import assets
import stroke1 from '../assets/stroke1.png';
import i1 from '../assets/i1.png';
import stroke2 from '../assets/stroke2.png';
import Examplecard from '../assets/Examplecard.png';
import i10 from '../assets/i10.png';
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
    
      {/* Page 1 */}
      <div className="page">
        <div className="stroke">
          <img src={stroke1} alt="" />
        </div>
        <div className="page1">
          <div className="heading">Welcome to Clowder</div>
          <div className="heading2">Your Ultimate Learning Playground <p>Slay them bugs</p></div>
          <div className="heading3">Step into the coolest e-learning hub and join our community of curious minds. At Clowder, learning is fun, interactive, and tailored just for you!</div>
          <div className="btn1">
            <button id="1" onClick={() => navigate('/register')}><b>Slay here</b></button>
          </div>
        </div>
      </div>

      {/* Page 2 */}
      <div className="page2">
        <img className="i1" src={i1} alt="i1" />
        <div className="Displaycard">
          <div className='i2'>Discover Your Path 🎓</div>
          <div className='i3'>Personalized Learning Experience with AI</div>
          <div className='i4'>Find the perfect courses that match your vibe and goals. From coding to creative arts, we've got something for everyone!</div>
          <button id="c1" onClick={() => navigate('/courses')}><b>Courses</b></button>
        </div>
      </div>

      {/* Page 3 */}
      <div className="page3">
        <div className="Displayvideo">
          <img className="stroke2" src={stroke2} alt="" />
          <video className="v1" width="100%" height="auto" controls>
            <source src="path_to_your_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className='i5'>Code Visualization to understand how code works under the hood.</div>
      </div>

      {/* Page 4 */}
      <div className="page4">
        <div className="displaycard2">
          <div className='i6'>Join Our Community 🌟</div>
          <div className='i7'>Connect, Collaborate and Ask.</div>
          <div className='i8'>Team up with fellow learners, share your progress, and work on projects together. At Clowder, you're part of a vibrant and supportive crew.</div>
          <button id="c2" onClick={() => navigate('/community')}><b>Community</b></button>
        </div>
        <div className="examplecard">
          <img className="eci" src={Examplecard} alt="" />
        </div>
      </div>

      {/* Page 5 */}
      <div className="page5">
        <div className="displaycard3">
          <div><img className="i10" src={i10} alt="" /></div>
          <div className='i11'>Interactive and Engaging 📚</div>
          <div className='i12'>Hands-On Learning with interactive problems.</div>
          <div className='i13'>Dive into hands-on projects, interactive quizzes, and fun challenges. Learning at Clowder is never boring—it's an adventure!</div>
          <div className="btn2">
            <button id="2" onClick={() => navigate('/register')}><b>Just click Bruh!</b></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;