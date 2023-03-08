import React, { useEffect, useState } from 'react'
import p1 from "./p2.png"
import p2 from "./p4.jpg"
import "./App.css"

const App = () => {

  const [image, setImage] = useState("");
  const [allImage, setAllImage] = useState([]);
  
  function covertToBase64(e) {
    //console.log(e.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
       // console.log(reader.result); //base64encoded string  
        setImage(reader.result);
    };
    reader.onerror = error => {
        console.log("Error: ", error);
    };
}


useEffect(()=>{
  getImage()
},[allImage])
function getImage() {
 // console.log("called");
  fetch("http://localhost:3000/get-image", {
    method: "GET",
  })
    .then((res) => {
      //console.log("response headers:", res.headers);
      return res.json();
    })
    .then((data) => {
     // console.log("getImage data:", data);
      setAllImage(data.data);
    })
    .catch((error) => {
      console.error(error);
    });
}


function uploadImage() {


  console.log("clicked")
  fetch("http://localhost:3000/upload-image", {
      method: "POST",
      crossDomain: true,
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
          base64: image
      })
  }).then((res) => {//console.log("p1") ;  
    if(image!=null)
  res.json();
  setImage("")
}).then((data) => {console.log(data);})
}
  return (
    
    <div className="wrapper container  text-center" >
            <div className="inner text-center">
               <h1 style={{color:'white',padding:'10px'}}>Our Students Gallery</h1> <br />
               
              { image!="" ? <button  type="button" class="btn btn-outline-info" onClick={uploadImage}>Upload</button>:"" }
                <br />
                <br />
              
                
<br/>    
<div className="imge container" style={{height:'300px',width:'300px'}}>
{image ==="" || image == null ? 
  
  <div className="preview">
    <img src={p2} style={{height:'300px',width:'300px',padding:'30px'}}/>
  </div>



: <img style={{height:'300px',width:'300px',padding:'30px'}} src={image} />}
</div>
<center style={{position:'center',padding:'10px'}}>
<input
                   
                   type="file"
                   onChange={covertToBase64}
                   
               /> </center>

<div className="container text-center load" >
<div className="row">
                {allImage.map(data=>{
                  
                    return(
                          
                             <div className="col-md-4">
                             { data.image!="" ? <img  style={{width:'300px',height:'300px',padding:'20px',display:'flex',flexDirection:'column' }}src={data.image} alt="Nopic"/> :""}
                       
                         
                        </div>
                        
                       
                    )
                })}
                </div>
                 </div>

            </div>

        </div>
  
  )
}


export default App
