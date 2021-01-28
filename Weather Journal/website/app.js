  
// Personal API Key for OpenWeatherMap API
const apiKey = '3ea7893265463c43920f38658f8efea3';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction)
/* Function called by event listener */
function performAction(e){
    const zipCode= document.getElementById('zip').value
    const userEntry= document.getElementById('feelings').value
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    getTemp(apiKey,zipCode)
    .then(function(data){
        postData('/add', {temp:data.main.temp, date:newDate, userEntry:userEntry})

})
}
/* Function to GET Web API Data*/
const getTemp = async (apiKey,zipCode)=>{
    
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&zip=${zipCode}`)
    try{
        const data = await res.json()
        return data
    }
    catch(error){
        console.log("error",error)
    }
}

/* Function to POST data */
const postData= async (url='', data = {}) =>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    }
    catch(error){
        console.log("error", error)
    } 
}

/* Function to GET Project Data */
const updateUI = async =>{
    const request = await fetch('/all')
    try{
        const allData = await request.json()
            console.log(allData)
            document.getElementById('date').innerHTML=allData[0].date
            document.getElementById('temp').innerHTML=allData[0].temp
            document.getElementById('content').innerHTML=allData[0].userEntry
        
    }catch(error){
        console.log("error",error)
    }

}