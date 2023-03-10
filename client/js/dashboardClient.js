async function getMedication() {
    let res = await axios.get('http://localhost:8000/api/medication/')
    let data = res;
    console.log(data)
    }
    getMedication()
