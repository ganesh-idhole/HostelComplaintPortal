import React, { useEffect, useState } from 'react';

const HomePage = () => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [collage,setCollage]=useState();
    useEffect(() => {
        const userData = localStorage.getItem('studentKey');
        const user = JSON.parse(userData);
        let collagename = user.collagename;
        setCollage(collagename);
       console.log("------>"+collagename);
        switch (collagename) {
            case 'University of Hyderabad':
                setBackgroundImage('url(/images/UOH_image.jpeg');
                break;
            case 'Jawaharlal Nehru University':
                setBackgroundImage('url(/images/JNU_image.jpeg)');
                break;
            case 'IIT Bombay':
                setBackgroundImage('url(/images/IIT-Bombay_image.jpg)');
                break;
            case 'Savitribai Phule Pune University':
                setBackgroundImage('url(/images/SPPU_image.jpg)');
                break;
            case 'Banaras Hindu University':
                setBackgroundImage('url(/images/BHU_image.jpg)');
                break;
            case 'R.A.College':
                setBackgroundImage('url(/images/R.A.Collage_image.jpg)');
                break;
            default:
                setBackgroundImage('');
        }
    }, []);

    return (
        <div
            className="home-page"
            style={{
                backgroundImage: backgroundImage,
                height: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginTop:'-22px',
                marginBottom:'80px'
            }}
        >
            <h1>Welcome to the {collage}  Portal</h1>
        </div>
    );
};

export default HomePage;
