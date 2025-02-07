import React from 'react';
import '../assets/css/Home.css';
import '../assets/css/nav.css';
import '../assets/css/page.css';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';

// Import assets
import Heading from '../assets/heading.png';
import Heading2 from '../assets/heading2.png';
import Heading3 from '../assets/heading3.png';
import stroke1 from '../assets/stroke1.png';
import i1 from '../assets/i1.png';
import i2 from '../assets/i2.png';
import i3 from '../assets/i3.png';
import i4 from '../assets/i4.png';
import i5 from '../assets/i5.png';
import stroke2 from '../assets/stroke2.png';
import i6 from '../assets/i6.png';
import i7 from '../assets/i7.png';
import i8 from '../assets/i8.png';
import Examplecard from '../assets/Examplecard.png';
import i10 from '../assets/i10.png';
import i11 from '../assets/i11.png';
import i12 from '../assets/i12.png';
import i13 from '../assets/i13.png';

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
          <div className="heading">
            <img src={Heading} alt="" />
          </div>
          <div className="heading2">
            <img src={Heading2} alt="" />
          </div>
          <div className="heading3">
            <img src={Heading3} alt="" />
          </div>
          <div className="btn1">
            <button id="1" onClick={() => navigate('/login')}><b>Slay here</b></button>
          </div>
        </div>
      </div>

      {/* Page 2 */}
      <div className="page2">
        <img className="i1" src={i1} alt="i1" />
        <div className="Displaycard">
          <div><img className="i2" src={i2} alt="" /></div>
          <div><img className="i3" src={i3} alt="" /></div>
          <div><img className="i4" src={i4} alt="" /></div>
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
        <div><img className="i5" src={i5} alt="" /></div>
      </div>

      {/* Page 4 */}
      <div className="page4">
        <div className="displaycard2">
          <div><img className="i6" src={i6} alt="" /></div>
          <div><img className="i7" src={i7} alt="" /></div>
          <div><img className="i8" src={i8} alt="" /></div>
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
          <div><img className="i11" src={i11} alt="" /></div>
          <div><img className="i12" src={i12} alt="" /></div>
          <div><img className="i13" src={i13} alt="" /></div>
          <div className="btn2">
            <button id="2" onClick={() => navigate('/login')}><b>Just click Bruh!</b></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;