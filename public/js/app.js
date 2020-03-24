
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


const form = document.querySelector('form')

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    // console.log('TESTING')
    const url = '/weather?address='+form.elements['loc'].value
    // console.log(url)
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                document.getElementById('place').innerText=data.error
                document.getElementById('weather').innerText=''
            }
            else
            {
                document.getElementById('place').innerText=data.place
                document.getElementById('weather').innerText=data.weather
            }
        })
    })
})