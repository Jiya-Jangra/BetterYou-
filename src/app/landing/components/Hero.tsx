
function Hero() {
    return (
  
      <>   
      <style>
        {
          `
          @keyframes textsAnimation {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
        }}
          .hero p{
            
            opacity: 0;
            animation:textsAnimation 2s linear forwards
            ;
            animation-delay: 5.5s;
  
  
        
          }
  
  
          .draw-line {
    stroke-dasharray: 2000;   /* Total length of line (adjust this) */
    stroke-dashoffset: 2000;  /* Hide full line at start */
    animation: draw 3s ease forwards;
  }
  
  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
            
          }
  
          `
        }
        
      </style>
      
      
      
      
       <div className='hero bg-zinc-800 h-100vh w-100vw  flex items-center justify-between '>
  
          <p className="absolute top-40 left-8 text-5xl text-white font-bold h-100vh w-100vw "> Come With Us To Find <br></br>"Better You" <br></br>Version of Your Own

                  <br></br><br></br>
                  <a href='http://localhost:3000/quiz'><button className="bg-gray-500 font-ssemibold text-2xl text-white rounded px-4 py-2 hover:bg-gray-600">Take Quiz</button></a>
                  
                  
        </p>
        <div className="cap absolute top-32  "></div>
            
     
      </div>
  
      </>
  
    )
  }
  
  export default Hero